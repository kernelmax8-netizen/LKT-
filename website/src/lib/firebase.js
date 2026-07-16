import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const REQUIRED_KEYS = ['apiKey', 'authDomain', 'projectId', 'appId']
const missingKeys = REQUIRED_KEYS.filter((key) => !firebaseConfig[key])

/**
 * True when every required Firebase config value was baked in at build
 * time. When false, `auth`/`db`/`storage` are left as `null` below instead
 * of letting Firebase throw — calling `getAuth()` with a missing/invalid
 * apiKey throws synchronously, and since this module is imported before
 * React ever renders, an uncaught throw here would crash the entire app
 * into a permanently blank page instead of just breaking sign-in.
 *
 * This happens when the VITE_FIREBASE_* environment variables aren't set
 * on a deployment (Vercel Project Settings → Environment Variables → add
 * the keys from .env.example → redeploy).
 */
export const firebaseConfigured = missingKeys.length === 0

if (!firebaseConfigured) {
  console.error(
    `[firebase] Missing required config: ${missingKeys.join(', ')}. Set the VITE_FIREBASE_* environment variables (see .env.example) on this deployment and redeploy.`,
  )
}

export const app = initializeApp(firebaseConfig)

let authInstance = null
let dbInstance = null
let storageInstance = null

if (firebaseConfigured) {
  try {
    authInstance = getAuth(app)
    dbInstance = getFirestore(app)
    storageInstance = getStorage(app)
  } catch (err) {
    console.error('[firebase] Failed to initialize Firebase services:', err)
  }
}

export const auth = authInstance
export const db = dbInstance
export const storage = storageInstance

let analytics = null

if (firebaseConfigured) {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app)
      }
    })
    .catch(() => {})
}

export { analytics }
