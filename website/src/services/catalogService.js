import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { woodTypeOptions } from '../data/woodTypes'
import { vendors as staticVendors } from '../data/vendors'

export async function fetchWoodTypes() {
  try {
    const q = query(collection(db, 'woodTypes'), orderBy('sortOrder', 'asc'))
    const snap = await getDocs(q)
    if (snap.empty) {
      return woodTypeOptions.map((w, i) => ({
        key: w.key,
        label: w.label,
        sortOrder: i + 1,
        active: true,
      }))
    }
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((w) => w.active !== false)
  } catch {
    return woodTypeOptions.map((w, i) => ({
      key: w.key,
      label: w.label,
      sortOrder: i + 1,
      active: true,
    }))
  }
}

function mapVendorDoc(id, data) {
  return {
    id,
    name: data.businessName || data.name,
    businessName: data.businessName || data.name,
    iconType: data.iconType || 'tree',
    verified: data.verified !== false && data.status === 'verified',
    recommended: Boolean(data.recommended),
    rating: data.rating ?? 4.5,
    reviews: data.reviews ?? 0,
    distance: data.distance || 'Nearby',
    area: data.area || data.city || '',
    pricePerQuintal: data.pricePerQuintal ?? 900,
    deliveryCharge: data.deliveryCharge ?? 200,
    save: data.save ?? 0,
    stock: data.stock || data.dailyStockCapacity || 'Available',
    deliveryTime: data.deliveryTime || 'Tomorrow (By 2 PM - 4 PM)',
    vehicleType: data.vehicleType || 'Mini Truck',
    payment: data.payment || 'COD',
    woodTypes: data.woodTypes || [],
    status: data.status,
  }
}

export async function fetchVerifiedVendors(woodTypeKeys = []) {
  try {
    const q = query(collection(db, 'vendors'), where('status', '==', 'verified'))
    const snap = await getDocs(q)
    let list = snap.docs.map((d) => mapVendorDoc(d.id, d.data()))

    if (list.length === 0) {
      list = staticVendors.map((v) => ({
        ...v,
        businessName: v.name,
        woodTypes: woodTypeKeys.length ? woodTypeKeys : ['imli', 'neem', 'mixed'],
        status: 'verified',
      }))
    }

    if (woodTypeKeys.length > 0) {
      const filtered = list.filter(
        (v) => !v.woodTypes?.length || v.woodTypes.some((k) => woodTypeKeys.includes(k)),
      )
      if (filtered.length > 0) return filtered
    }

    return list
  } catch {
    return staticVendors.map((v) => ({
      ...v,
      businessName: v.name,
      woodTypes: woodTypeKeys.length ? woodTypeKeys : ['imli', 'neem', 'mixed'],
      status: 'verified',
    }))
  }
}

export function totalAmount(vendor, quantity) {
  return vendor.pricePerQuintal * quantity + vendor.deliveryCharge
}
