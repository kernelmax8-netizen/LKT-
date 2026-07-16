import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { storage, db } from '../lib/firebase'
import { signUp } from './authService'

async function uploadVendorDoc(uid, docType, file) {
  if (!file) return null
  const path = `vendors/${uid}/${docType}`
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}

const DEFAULT_PRICING = {
  pricePerQuintal: 900,
  deliveryCharge: 200,
  save: 0,
  stock: 'Available',
  deliveryTime: 'Tomorrow (By 2 PM - 4 PM)',
  vehicleType: 'Mini Truck',
  payment: 'COD',
  rating: 0,
  reviews: 0,
  recommended: false,
  iconType: 'tree',
}

export async function registerVendor(form) {
  const { user } = await signUp({
    email: form.email,
    password: form.password,
    name: form.fullName,
    phone: form.mobile,
    role: 'vendor',
  })

  const uid = user.uid

  const [shopPhoto, gst, addressProof, identityProof] = await Promise.all([
    uploadVendorDoc(uid, 'shopPhoto', form.files.shopPhoto),
    form.files.gst ? uploadVendorDoc(uid, 'gst', form.files.gst) : Promise.resolve(null),
    uploadVendorDoc(uid, 'addressProof', form.files.addressProof),
    uploadVendorDoc(uid, 'identityProof', form.files.identityProof),
  ])

  const vendorDoc = {
    ownerUid: uid,
    ownerName: form.fullName,
    phone: form.mobile,
    email: form.email,
    businessName: form.businessName,
    shopType: form.shopType,
    businessAddress: form.businessAddress,
    city: form.city,
    state: form.state,
    pincode: form.pincode,
    woodTypes: form.woodTypes,
    dailyStockCapacity: form.dailyStockCapacity,
    experience: form.experience,
    status: 'pending',
    verified: false,
    documents: {
      shopPhoto,
      ...(gst ? { gst } : {}),
      addressProof,
      identityProof,
    },
    location: {
      label: form.locationLabel || `${form.city}, ${form.state}`,
    },
    area: form.city,
    distance: 'Nearby',
    ...DEFAULT_PRICING,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  await setDoc(doc(db, 'vendors', uid), vendorDoc)
  return { uid, vendor: vendorDoc }
}
