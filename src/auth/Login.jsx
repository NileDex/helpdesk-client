import { useState } from 'react'
import { signIn, signUp, signInWithGoogle } from './authService'

export default function Login() {
  const [mode, setMode]       = useState('signin') // 'signin' | 'signup'
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'signup') await signUp(email, password)
      else await signIn(email, password)
    } catch (err) {
      setError(friendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setError('')
    setLoading(true)
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(friendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  function friendlyError(code) {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password.'
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.'
      case 'auth/weak-password':
        return 'Password must be at least 6 characters.'
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed. Please try again.'
      default:
        return 'Something went wrong. Please try again.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff]">
      <div className="w-[400px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5 bg-indigo-500 text-white">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-bold flex-shrink-0">
            RSU
          </div>
          <div>
            <p className="text-[15px] font-semibold">UniHelp</p>
            <p className="text-xs opacity-80">Rivers State University Assistant</p>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-7">
          <h2 className="text-[17px] font-semibold text-gray-800 mb-1">
            {mode === 'signin' ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-[13px] text-gray-400 mb-6">
            {mode === 'signin'
              ? 'Sign in to continue to UniHelp'
              : 'Sign up to get started with UniHelp'}
          </p>

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 border border-gray-200 rounded-xl py-2.5 text-[13.5px] font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 mb-5"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-[11px] text-gray-300 uppercase tracking-wide">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13.5px] outline-none text-gray-900 bg-gray-50 focus:border-indigo-500 focus:bg-white transition-colors placeholder:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-gray-600 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13.5px] outline-none text-gray-900 bg-gray-50 focus:border-indigo-500 focus:bg-white transition-colors placeholder:text-gray-300"
              />
            </div>

            {error && (
              <p className="text-[12.5px] text-red-500 bg-red-50 rounded-xl px-3.5 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white text-[13.5px] font-semibold transition-colors mt-1"
            >
              {loading
                ? 'Please wait…'
                : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-[12.5px] text-gray-400 mt-5">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError('') }}
              className="text-indigo-500 font-medium hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2045c0-.638-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9086c1.7018-1.5668 2.6836-3.874 2.6836-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.4673-.8059 5.9564-2.1818l-2.9086-2.2582c-.8059.54-1.8368.8605-3.0478.8605-2.3441 0-4.3282-1.5832-5.036-3.7105H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71c-.18-.54-.2823-1.1168-.2823-1.71s.1023-1.17.2823-1.71V4.9582H.9574A8.9965 8.9965 0 0 0 0 9c0 1.4514.3477 2.8268.9573 4.0418L3.964 10.71Z" fill="#FBBC05"/>
      <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5814-2.5814C13.4632.8918 11.4259 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795Z" fill="#EA4335"/>
    </svg>
  )
}
