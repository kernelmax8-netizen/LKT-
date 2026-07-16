import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, firebaseConfigured } from '../lib/firebase'

// Every exported function below that talks to Firebase calls this first, so
// a deployment missing the VITE_FIREBASE_* env vars fails with one clear,
// actionable message instead of a cryptic TypeError (auth/db are `null` in
// that case - see src/lib/firebase.js).
function assertFirebaseReady() {
  if (!firebaseConfigured || !auth || !db) {
    throw new Error(
      'Sign-in is not configured for this deployment. Add the VITE_FIREBASE_* environment variables and redeploy.',
    )
  }
}

export async function getUserProfile(uid) {
  assertFirebaseReady()
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? { uid, ...snap.data() } : null
}

// Creates a Firestore profile for a user that has authenticated (via email or
// phone) but doesn't have one yet, so both sign-in paths stay consistent.
export async function ensureUserProfile(user, defaults = {}) {
  let profile = await getUserProfile(user.uid)
  if (!profile) {
    const fallback = {
      role: 'customer',
      name: user.displayName || '',
      email: user.email || '',
      phone: user.phoneNumber || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...defaults,
    }
    await setDoc(doc(db, 'users', user.uid), fallback)
    profile = { uid: user.uid, ...fallback }
  }
  return profile
}

/**
 * Converts a locally entered mobile number into E.164 format required by
 * Firebase Phone Auth. Defaults to the India (+91) country code when the
 * user only types a 10-digit number.
 */
export function toE164PhoneNumber(rawPhone) {
  const trimmed = (rawPhone || '').trim()
  const digits = trimmed.replace(/[^\d]/g, '')
  if (trimmed.startsWith('+')) return `+${digits}`
  if (digits.length === 10) return `+91${digits}`
  if (digits.length > 10) return `+${digits}`
  return trimmed
}

/**
 * Lazily creates an invisible reCAPTCHA verifier bound to the given
 * container element id. Must be called from the browser (component render),
 * after the container node exists in the DOM.
 */
export function createRecaptchaVerifier(containerId) {
  assertFirebaseReady()
  return new RecaptchaVerifier(auth, containerId, { size: 'invisible' })
}

/**
 * Sends an OTP SMS to the given phone number. Returns a Firebase
 * ConfirmationResult that must be passed to verifyOtp() along with the code
 * the user receives.
 */
export async function sendOtp(phoneNumber, appVerifier) {
  assertFirebaseReady()
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier)
}

/**
 * Confirms the OTP code entered by the user, completes the phone sign-in,
 * and ensures a Firestore user profile exists.
 *
 * `profileDefaults` (name/email/role) are only applied the first time this
 * phone number signs in (i.e. when no Firestore profile exists yet) — used
 * by the sign-up flow to capture the name/role collected before the OTP
 * step. Signing in with a phone number that already has a profile leaves
 * the existing profile untouched.
 */
export async function verifyOtp(confirmationResult, code, profileDefaults = {}) {
  assertFirebaseReady()
  const cred = await confirmationResult.confirm(code)
  await cred.user.getIdToken(true)
  if (profileDefaults.name && !cred.user.displayName) {
    await updateProfile(cred.user, { displayName: profileDefaults.name })
  }
  const profile = await ensureUserProfile(cred.user, profileDefaults)
  return { user: cred.user, profile }
}

export async function signUp({ email, password, name, phone = '', role = 'customer' }) {
  assertFirebaseReady()
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  // Ensure Auth token is attached before Firestore rules evaluate request.auth
  await cred.user.getIdToken(true)
  await updateProfile(cred.user, { displayName: name })
  const profile = {
    role: role === 'vendor' ? 'vendor' : 'customer',
    name,
    email,
    phone: phone || '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  await setDoc(doc(db, 'users', cred.user.uid), profile)
  return { user: cred.user, profile: { uid: cred.user.uid, ...profile } }
}

export async function signIn({ email, password }) {
  assertFirebaseReady()
  const cred = await signInWithEmailAndPassword(auth, email, password)
  const profile = await ensureUserProfile(cred.user)
  return { user: cred.user, profile }
}

export async function signOut() {
  if (!auth) return
  await firebaseSignOut(auth)
}
