import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Phone } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LogoIcon from '../components/LogoIcon'

const inputClass =
  'w-full bg-[#FBF8F2] border border-[#EDE2CD] rounded-lg px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-colors'

const RECAPTCHA_CONTAINER_ID = 'login-recaptcha-container'
const RESEND_COOLDOWN_SECONDS = 30

function friendlyAuthError(err) {
  const code = err.code || ''
  if (code === 'permission-denied' || /insufficient permissions/i.test(err.message || '')) {
    return 'Missing or insufficient permissions. Publish Firestore rules for project lkt-project-16064 (Firebase Console → Firestore → Rules), then try again.'
  }
  switch (code) {
    case 'auth/invalid-phone-number':
      return 'Enter a valid mobile number, e.g. 9876543210.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a while before trying again.'
    case 'auth/invalid-app-credential':
    case 'auth/app-not-authorized':
      return (
        typeof window !== 'undefined' && window.location.hostname === 'localhost'
          ? 'OTP verification does not work on "localhost". Open this app at http://127.0.0.1:<port> instead (and add 127.0.0.1 under Firebase Console → Authentication → Settings → Authorized domains), or use a test phone number configured in Firebase Console for local development.'
          : 'Verification failed. Make sure this domain is added under Firebase Console → Authentication → Settings → Authorized domains, then try again.'
      )
    case 'auth/captcha-check-failed':
    case 'auth/argument-error':
      return 'Verification failed. Please try sending the OTP again.'
    case 'auth/invalid-verification-code':
      return 'Incorrect OTP. Please check and try again.'
    case 'auth/code-expired':
      return 'This OTP has expired. Please request a new one.'
    default:
      return err.message?.replace('Firebase: ', '') || 'Authentication failed'
  }
}

export default function LoginPage() {
  const { createRecaptchaVerifier, sendOtp, confirmOtp } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const redirectTo = params.get('redirect') || '/book-lakdi'

  const [mode, setMode] = useState('login')
  const [role, setRole] = useState(params.get('role') === 'vendor' ? 'vendor' : 'customer')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
  })

  // Mobile number + OTP verification state (shared by sign in & sign up)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [confirmation, setConfirmation] = useState(null)
  const [resendIn, setResendIn] = useState(0)
  const verifierRef = useRef(null)
  const recaptchaWrapperRef = useRef(null)

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    if (!resendIn) return
    const t = setTimeout(() => setResendIn((s) => Math.max(0, s - 1)), 1000)
    return () => clearTimeout(t)
  }, [resendIn])

  // grecaptcha refuses to render a widget into a container it has already
  // rendered into, even after calling verifier.clear(). Swapping in a brand
  // new DOM node guarantees every fresh RecaptchaVerifier gets a clean
  // container, which avoids the "reCAPTCHA has already been rendered in
  // this element" error on retries/resends.
  const resetRecaptchaContainer = () => {
    if (recaptchaWrapperRef.current) {
      recaptchaWrapperRef.current.innerHTML = `<div id="${RECAPTCHA_CONTAINER_ID}"></div>`
    }
  }

  const discardVerifier = () => {
    try {
      verifierRef.current?.clear()
    } catch {
      // Container may already be gone (e.g. on unmount) - safe to ignore.
    }
    verifierRef.current = null
  }

  useEffect(() => {
    // Clean up the reCAPTCHA widget when leaving the page.
    return () => {
      discardVerifier()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const resetOtpFlow = () => {
    setOtpSent(false)
    setOtp('')
    setConfirmation(null)
    setResendIn(0)
    discardVerifier()
  }

  const switchMode = (next) => {
    setMode(next)
    setError('')
    resetOtpFlow()
  }

  const getVerifier = () => {
    if (!verifierRef.current) {
      resetRecaptchaContainer()
      verifierRef.current = createRecaptchaVerifier(RECAPTCHA_CONTAINER_ID)
    }
    return verifierRef.current
  }

  const handleSendOtp = async () => {
    if (!form.phone.trim()) throw new Error('Enter your mobile number')
    const verifier = getVerifier()
    const result = await sendOtp(form.phone.trim(), verifier)
    setConfirmation(result)
    setOtpSent(true)
    setResendIn(RESEND_COOLDOWN_SECONDS)
  }

  const handleVerifyOtp = async () => {
    if (!otp.trim()) throw new Error('Enter the OTP sent to your mobile')
    if (!confirmation) throw new Error('Please request a new OTP')

    const profileDefaults = { role: role === 'vendor' ? 'vendor' : 'customer' }
    if (mode === 'signup') {
      profileDefaults.name = form.name.trim()
      if (form.email.trim()) profileDefaults.email = form.email.trim()
    }

    await confirmOtp(confirmation, otp.trim(), profileDefaults)
    navigate(role === 'vendor' ? '/vendor-onboarding' : redirectTo)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      if (!otpSent) {
        if (mode === 'signup' && !form.name.trim()) throw new Error('Please enter your name')
        await handleSendOtp()
      } else {
        await handleVerifyOtp()
      }
    } catch (err) {
      setError(friendlyAuthError(err))
      // The reCAPTCHA widget can only be used once; drop it so the next
      // attempt (send or resend) creates a fresh one.
      if (!otpSent) {
        discardVerifier()
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleResendOtp = async () => {
    if (resendIn > 0 || submitting) return
    setError('')
    setSubmitting(true)
    try {
      setConfirmation(null)
      discardVerifier()
      await handleSendOtp()
    } catch (err) {
      setError(friendlyAuthError(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      <div className="max-w-md w-full mx-auto px-4 py-10 flex-1 flex flex-col justify-center">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green mb-8">
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        <div className="bg-white border border-[#F1E7D4] rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <LogoIcon size={36} />
            <span className="text-lg font-extrabold tracking-tight">
              <span className="text-brand-brown">Lakdi</span>
              <span className="text-brand-green">Ki</span>
              <span className="text-brand-orange">Taal</span>
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {mode === 'login'
              ? 'Sign in with your mobile number using OTP.'
              : 'Sign up with your mobile number using OTP.'}
          </p>

          <div className="flex gap-2 mb-5">
            {['customer', 'vendor'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 text-sm font-semibold py-2 rounded-lg border capitalize transition-colors ${
                  role === r
                    ? 'border-brand-green bg-brand-green/10 text-brand-green'
                    : 'border-[#EDE2CD] text-gray-500'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && !otpSent && (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1.5">Full Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1.5">
                    Email <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setField('email', e.target.value)}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1.5">Mobile Number</label>
              <div className="relative">
                <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  required
                  type="tel"
                  inputMode="tel"
                  disabled={otpSent}
                  value={form.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  className={`${inputClass} pl-9 disabled:opacity-60 disabled:cursor-not-allowed`}
                  placeholder="+91 9XXXXXXXXX"
                />
              </div>
            </div>

            {otpSent && (
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1.5">Enter OTP</label>
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className={`${inputClass} tracking-widest text-center text-base font-semibold`}
                  placeholder="••••••"
                />
                <div className="flex items-center justify-between mt-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setError('')
                      resetOtpFlow()
                    }}
                    className="text-gray-500 hover:text-brand-green font-semibold"
                  >
                    Change number
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendIn > 0 || submitting}
                    className="text-brand-green font-semibold disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    {resendIn > 0 ? `Resend OTP in ${resendIn}s` : 'Resend OTP'}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-green hover:bg-brand-green-dark disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors"
            >
              {submitting
                ? 'Please wait…'
                : !otpSent
                  ? 'Send OTP'
                  : mode === 'signup'
                    ? 'Verify & Create Account'
                    : 'Verify & Sign In'}
            </button>

            {/* Invisible reCAPTCHA required by Firebase Phone Auth */}
            <div ref={recaptchaWrapperRef}>
              <div id={RECAPTCHA_CONTAINER_ID} />
            </div>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            {mode === 'login' ? (
              <>
                New here?{' '}
                <button type="button" onClick={() => switchMode('signup')} className="text-brand-green font-semibold hover:underline">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button type="button" onClick={() => switchMode('login')} className="text-brand-green font-semibold hover:underline">
                  Sign in
                </button>
              </>
            )}
          </p>

          {role === 'vendor' && (
            <p className="text-center text-xs text-gray-400 mt-3">
              Prefer the full KYC form?{' '}
              <Link to="/vendor-onboarding" className="text-brand-green font-semibold hover:underline">
                Join as Vendor
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
