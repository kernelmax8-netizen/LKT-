/**
 * Seed woodTypes + demo verified vendors into Firestore.
 *
 * Prerequisites:
 * 1. Enable Email/Password Auth, Firestore, and Storage in Firebase Console
 * 2. Temporarily allow writes OR sign in as any auth user if rules require it
 * 3. From website/: npm run seed
 *
 * Uses the client SDK with web config from .env
 */
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env')

function loadEnv() {
  try {
    const raw = readFileSync(envPath, 'utf8')
    const env = {}
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim()
    }
    return env
  } catch {
    console.error('Missing website/.env — copy from .env.example and fill Firebase config')
    process.exit(1)
  }
}

const env = loadEnv()

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const woodTypes = [
  { key: 'imli', label: 'Imli Lakdi', sortOrder: 1, active: true },
  { key: 'neem', label: 'Neem Lakdi', sortOrder: 2, active: true },
  { key: 'nilgiri', label: 'Nilgiri Lakdi', sortOrder: 3, active: true },
  { key: 'babul', label: 'Babul Lakdi', sortOrder: 4, active: true },
  { key: 'geethi', label: 'Geethi Lakdi', sortOrder: 5, active: true },
  { key: 'paratha', label: 'Paratha Lakdi', sortOrder: 6, active: true },
  { key: 'charcoal', label: 'Charcoal', sortOrder: 7, active: true },
  { key: 'mixed', label: 'Mixed Load', sortOrder: 8, active: true },
]

const demoVendors = [
  {
    id: 'lakshmi-lakdi-taal',
    businessName: 'Lakshmi Lakdi Taal',
    ownerName: 'Demo Vendor',
    phone: '+91 9000000001',
    email: 'lakshmi@demo.lkt',
    shopType: 'Both Wholesale & Retail',
    businessAddress: 'Road No. 3, Banjara Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500034',
    woodTypes: ['imli', 'neem', 'nilgiri', 'babul', 'mixed'],
    dailyStockCapacity: '50 - 100 Quintals',
    experience: '5+ years',
    status: 'verified',
    iconType: 'tree',
    verified: true,
    recommended: true,
    rating: 4.8,
    reviews: 245,
    distance: '2.1 km away',
    area: 'Banjara Hills',
    pricePerQuintal: 900,
    deliveryCharge: 200,
    save: 300,
    stock: '10+ Quintal',
    deliveryTime: 'Tomorrow (By 2 PM - 4 PM)',
    vehicleType: 'Mini Truck',
    payment: 'COD / UPI / Card',
  },
  {
    id: 'shiva-wood-depot',
    businessName: 'Shiva Wood Depot',
    ownerName: 'Demo Vendor',
    phone: '+91 9000000002',
    email: 'shiva@demo.lkt',
    shopType: 'Wholesaler',
    businessAddress: 'Banjara Hills Main Road',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500034',
    woodTypes: ['imli', 'neem', 'charcoal', 'paratha'],
    dailyStockCapacity: '10 - 50 Quintals',
    experience: '3 - 5 years',
    status: 'verified',
    iconType: 'log',
    verified: true,
    recommended: false,
    rating: 4.6,
    reviews: 189,
    distance: '3.5 km away',
    area: 'Banjara Hills',
    pricePerQuintal: 850,
    deliveryCharge: 250,
    save: 300,
    stock: '8 Quintal',
    deliveryTime: 'Tomorrow (By 4 PM - 6 PM)',
    vehicleType: 'Mini Truck',
    payment: 'COD / UPI',
  },
  {
    id: 'green-wood-traders',
    businessName: 'Green Wood Traders',
    ownerName: 'Demo Vendor',
    phone: '+91 9000000003',
    email: 'green@demo.lkt',
    shopType: 'Retailer',
    businessAddress: 'Mehdipatnam Market',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500028',
    woodTypes: ['nilgiri', 'babul', 'geethi', 'mixed'],
    dailyStockCapacity: '50 - 100 Quintals',
    experience: '5+ years',
    status: 'verified',
    iconType: 'leaf',
    verified: true,
    recommended: false,
    rating: 4.4,
    reviews: 163,
    distance: '6.2 km away',
    area: 'Mehdipatnam',
    pricePerQuintal: 880,
    deliveryCharge: 300,
    save: 300,
    stock: '12+ Quintal',
    deliveryTime: 'Tomorrow (By 3 PM - 5 PM)',
    vehicleType: 'Mini Truck',
    payment: 'COD / UPI / Card',
  },
  {
    id: 'rahman-lakdi-store',
    businessName: 'Rahman Lakdi Store',
    ownerName: 'Demo Vendor',
    phone: '+91 9000000004',
    email: 'rahman@demo.lkt',
    shopType: 'Both Wholesale & Retail',
    businessAddress: 'Tolichowki Cross Road',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500008',
    woodTypes: ['imli', 'neem', 'charcoal'],
    dailyStockCapacity: '10 - 50 Quintals',
    experience: '1 - 3 years',
    status: 'verified',
    iconType: 'log',
    verified: true,
    recommended: false,
    rating: 4.3,
    reviews: 121,
    distance: '5.4 km away',
    area: 'Tolichowki',
    pricePerQuintal: 920,
    deliveryCharge: 150,
    save: 250,
    stock: '6 Quintal',
    deliveryTime: 'Tomorrow (By 2 PM - 5 PM)',
    vehicleType: 'Mini Truck',
    payment: 'COD',
  },
  {
    id: 'sri-venkateshwara-wood',
    businessName: 'Sri Venkateshwara Wood',
    ownerName: 'Demo Vendor',
    phone: '+91 9000000005',
    email: 'svw@demo.lkt',
    shopType: 'Wholesaler',
    businessAddress: 'Kukatpally Industrial Area',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500072',
    woodTypes: ['geethi', 'paratha', 'mixed', 'nilgiri'],
    dailyStockCapacity: 'Above 100 Quintals',
    experience: '5+ years',
    status: 'verified',
    iconType: 'sprout',
    verified: true,
    recommended: false,
    rating: 4.2,
    reviews: 98,
    distance: '7.8 km away',
    area: 'Kukatpally',
    pricePerQuintal: 950,
    deliveryCharge: 250,
    save: 0,
    stock: '10 Quintal',
    deliveryTime: 'Day After Tomorrow (By 4 PM - 6 PM)',
    vehicleType: 'Truck',
    payment: 'COD / UPI',
  },
]

async function seed() {
  console.log('Seeding woodTypes…')
  for (const w of woodTypes) {
    await setDoc(doc(db, 'woodTypes', w.key), { ...w, updatedAt: serverTimestamp() })
    console.log('  +', w.key)
  }

  console.log('Seeding demo verified vendors…')
  for (const v of demoVendors) {
    const { id, ...data } = v
    await setDoc(doc(db, 'vendors', id), {
      ...data,
      ownerUid: id,
      documents: {},
      location: { label: `${data.area}, ${data.city}` },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    console.log('  +', id)
  }

  console.log('Done. If writes failed, temporarily open Firestore rules or paste docs via Console.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
