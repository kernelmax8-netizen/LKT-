import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  getDoc,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { fetchVerifiedVendors } from './catalogService'

export async function saveAddress(uid, address) {
  const ref = await addDoc(collection(db, 'users', uid, 'addresses'), {
    ...address,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function fetchAddresses(uid) {
  const snap = await getDocs(collection(db, 'users', uid, 'addresses'))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function createOrder(customerUid, orderData) {
  const payload = {
    customerUid,
    status: 'requested',
    woodTypes: orderData.woodTypes.map(({ key, label }) => ({ key, label })),
    quantity: Number(orderData.quantity),
    unit: orderData.unit,
    purpose: orderData.purpose,
    deliveryPreference: orderData.deliveryPreference,
    deliveryDate: orderData.deliveryDate || null,
    notes: orderData.notes || '',
    address: orderData.address,
    contact: orderData.contact,
    selectedVendorId: null,
    selectedQuoteId: null,
    paymentMethod: null,
    subtotal: null,
    deliveryCharge: null,
    loadingCharges: 0,
    platformFee: 0,
    grandTotal: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  const ref = await addDoc(collection(db, 'orders'), payload)
  return { id: ref.id, ...payload }
}

export async function generateQuotesForOrder(orderId, orderData) {
  const existing = await getDocs(query(collection(db, 'quotes'), where('orderId', '==', orderId)))
  if (!existing.empty) {
    return existing.docs.map((d) => ({ id: d.id, ...d.data() }))
  }

  const woodKeys = (orderData.woodTypes || []).map((w) => w.key)
  const vendors = await fetchVerifiedVendors(woodKeys)
  const quantity = Number(orderData.quantity) || 1
  const batch = writeBatch(db)
  const quotes = []

  vendors.forEach((vendor, index) => {
    const quoteRef = doc(collection(db, 'quotes'))
    const total = vendor.pricePerQuintal * quantity + vendor.deliveryCharge
    const quote = {
      orderId,
      vendorId: vendor.id,
      vendorName: vendor.name || vendor.businessName,
      status: 'pending',
      pricePerQuintal: vendor.pricePerQuintal,
      deliveryCharge: vendor.deliveryCharge,
      total,
      deliveryTime: vendor.deliveryTime,
      distance: vendor.distance,
      rating: vendor.rating,
      reviews: vendor.reviews,
      area: vendor.area,
      stock: vendor.stock,
      vehicleType: vendor.vehicleType,
      payment: vendor.payment,
      save: vendor.save || 0,
      iconType: vendor.iconType || 'tree',
      recommended: vendor.recommended || index === 0,
      verified: true,
      createdAt: serverTimestamp(),
    }
    batch.set(quoteRef, quote)
    quotes.push({ id: quoteRef.id, ...quote })
  })

  await batch.commit()
  await updateDoc(doc(db, 'orders', orderId), {
    status: 'quoted',
    updatedAt: serverTimestamp(),
  })

  return quotes
}

export function subscribeToQuotes(orderId, callback) {
  const q = query(collection(db, 'quotes'), where('orderId', '==', orderId))
  return onSnapshot(q, (snap) => {
    const quotes = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(quotes)
  })
}

export async function acceptQuote(orderId, quoteId, vendorId) {
  const quotesSnap = await getDocs(query(collection(db, 'quotes'), where('orderId', '==', orderId)))
  const batch = writeBatch(db)

  quotesSnap.docs.forEach((d) => {
    const accepted = d.id === quoteId
    batch.update(d.ref, {
      status: accepted ? 'accepted' : 'rejected',
    })
  })

  batch.update(doc(db, 'orders', orderId), {
    selectedQuoteId: quoteId,
    selectedVendorId: vendorId,
    status: 'quoted',
    updatedAt: serverTimestamp(),
  })

  await batch.commit()
}

export async function placeOrder(orderId, { paymentMethod, subtotal, deliveryCharge, grandTotal }) {
  await updateDoc(doc(db, 'orders', orderId), {
    paymentMethod,
    subtotal,
    deliveryCharge,
    loadingCharges: 0,
    platformFee: 0,
    grandTotal,
    status: 'confirmed',
    placedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function getOrder(orderId) {
  const snap = await getDoc(doc(db, 'orders', orderId))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export function quoteToVendorView(quote) {
  return {
    id: quote.vendorId,
    quoteId: quote.id,
    name: quote.vendorName,
    iconType: quote.iconType || 'tree',
    verified: quote.verified !== false,
    recommended: Boolean(quote.recommended),
    rating: quote.rating ?? 4.5,
    reviews: quote.reviews ?? 0,
    distance: quote.distance || 'Nearby',
    area: quote.area || '',
    pricePerQuintal: quote.pricePerQuintal,
    deliveryCharge: quote.deliveryCharge,
    save: quote.save || 0,
    stock: quote.stock || 'Available',
    deliveryTime: quote.deliveryTime,
    vehicleType: quote.vehicleType || 'Mini Truck',
    payment: quote.payment || 'COD',
    total: quote.total,
  }
}
