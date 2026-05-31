import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, Lock, User } from 'lucide-react'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'admin123'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate brief network delay for UX
    await new Promise((res) => setTimeout(res, 600))

    if (form.username === ADMIN_USER && form.password === ADMIN_PASS) {
      localStorage.setItem('integrit_admin_session', 'true')
      navigate('/dashboard')
    } else {
      setError('Invalid credentials. Please try again.')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-bg-primary grid-bg flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background orbs */}
      <div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(195,255,51,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(195,255,51,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <img
            src="/logo.png"
            alt="Integrit logo"
            className="w-16 h-16 object-contain drop-shadow-[0_0_16px_rgba(195,255,51,0.7)] mb-4"
          />
          <h1 className="font-display text-3xl text-white tracking-wider">INTEGRIT</h1>
          <p className="text-text-muted text-sm mt-1 font-mono tracking-widest uppercase">
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <motion.div
          animate={shake ? { x: [-6, 6, -4, 4, -2, 2, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="glass-strong rounded-2xl p-8 neon-border"
        >
          <div className="flex items-center gap-2 mb-7">
            <Lock className="w-4 h-4 text-accent" />
            <h2 className="text-white font-semibold text-lg">Sign In</h2>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label htmlFor="admin-username" className="block text-sm font-medium text-text-muted mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  id="admin-username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="admin"
                  className="input-field w-full pl-11 pr-4 py-3.5 rounded-xl text-sm"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-text-muted mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  id="admin-password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field w-full pl-11 pr-12 py-3.5 rounded-xl text-sm"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="admin-login-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-xl text-sm flex items-center justify-center gap-2 group mt-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>SIGN IN</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        <p className="text-center text-text-muted text-xs mt-6">
          <a href="/" className="hover:text-accent transition-colors font-mono">
            ← Back to landing page
          </a>
        </p>
      </motion.div>
    </div>
  )
}
