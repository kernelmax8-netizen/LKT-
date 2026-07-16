import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      // Firebase isn't configured on this deployment (missing env vars) -
      // skip auth wiring instead of crashing so the rest of the app still
      // renders. See src/lib/firebase.js.
      setLoading(false)
      return
    }
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        try {
          const p = await authService.ensureUserProfile(firebaseUser)
          setProfile(p)
        } catch {
          setProfile({
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            phone: firebaseUser.phoneNumber || '',
            role: 'customer',
          })
        }
      } else {
        setProfile(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      isAuthenticated: Boolean(user),
      async signUp(data) {
        const result = await authService.signUp(data)
        setProfile(result.profile)
        return result
      },
      async signIn(data) {
        const result = await authService.signIn(data)
        setProfile(result.profile)
        return result
      },
      createRecaptchaVerifier(containerId) {
        return authService.createRecaptchaVerifier(containerId)
      },
      async sendOtp(phoneNumber, appVerifier) {
        return authService.sendOtp(authService.toE164PhoneNumber(phoneNumber), appVerifier)
      },
      async confirmOtp(confirmationResult, code, profileDefaults) {
        const result = await authService.verifyOtp(confirmationResult, code, profileDefaults)
        setProfile(result.profile)
        return result
      },
      async signOut() {
        await authService.signOut()
        setProfile(null)
      },
    }),
    [user, profile, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
