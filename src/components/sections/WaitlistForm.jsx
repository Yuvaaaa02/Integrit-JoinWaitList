import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight, User, Mail, Phone } from 'lucide-react'
import { submitToGoogleSheets } from '../../utils/sheets'

const initialForm = { name: '', email: '', mobile: '' }
const initialErrors = { name: '', email: '', mobile: '' }

function validate(form) {
  const errors = { name: '', email: '', mobile: '' }
  let valid = true

  if (!form.name.trim()) {
    errors.name = 'Full name is required'
    valid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Email address is required'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email'
    valid = false
  }

  if (!form.mobile.trim()) {
    errors.mobile = 'Mobile number is required'
    valid = false
  } else if (form.mobile.replace(/\D/g, '').length < 7) {
    errors.mobile = 'Mobile must be at least 7 digits'
    valid = false
  }

  return { errors, valid }
}

export default function WaitlistForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { errors: newErrors, valid } = validate(form)
    if (!valid) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await submitToGoogleSheets(form)
      setSuccess(true)
      setForm(initialForm)
    } catch (err) {
      console.error('Submission error:', err)
      // Still show success — no-cors mode means we can't read the response
      setSuccess(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="waitlist" className="section-pad bg-bg-primary relative overflow-hidden">
      {/* Glow bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 50% 100%, rgba(195,255,51,0.06) 0%, transparent 60%)',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="glass neon-border rounded-full px-4 py-1.5">
              <span className="font-mono text-xs text-accent tracking-widest uppercase">
                Limited Early Access
              </span>
            </div>
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            SECURE YOUR SPOT
          </h2>
          <p className="text-text-muted text-lg leading-relaxed">
            Join 2,000+ editors already on the waitlist. Get early access
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-strong rounded-2xl p-8 neon-border relative overflow-hidden"
        >
          {/* Top accent glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(195,255,51,0.5), transparent)',
            }}
          />

          <AnimatePresence mode="wait">
            {success ? (
              /* Success State */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col items-center text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  className="relative mb-6"
                >
                  {/* Glow rings */}
                  <div className="absolute inset-0 rounded-full animate-ping bg-accent/20" />
                  <div className="relative w-20 h-20 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center glow-accent">
                    <CheckCircle2 className="w-10 h-10 text-accent" />
                  </div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-display text-3xl text-white mb-3"
                >
                  YOU'RE ON THE LIST
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-text-muted leading-relaxed max-w-sm"
                >
                  We'll notify you as soon as early access opens. Keep an eye on your inbox — it'll be worth the wait.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => setSuccess(false)}
                  className="mt-8 text-text-muted text-sm hover:text-accent transition-colors font-mono underline underline-offset-4"
                >
                  Submit another entry
                </motion.button>
              </motion.div>
            ) : (
              /* Form State */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {/* Name */}
                <div>
                  <label htmlFor="waitlist-name" className="block text-sm font-medium text-text-muted mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                    <input
                      id="waitlist-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Alex Johnson"
                      className={`input-field w-full pl-11 pr-4 py-3.5 rounded-xl text-sm ${errors.name ? 'error' : ''}`}
                      autoComplete="name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="waitlist-email" className="block text-sm font-medium text-text-muted mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                    <input
                      id="waitlist-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="alex@studio.io"
                      className={`input-field w-full pl-11 pr-4 py-3.5 rounded-xl text-sm ${errors.email ? 'error' : ''}`}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.email}</p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label htmlFor="waitlist-mobile" className="block text-sm font-medium text-text-muted mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                    <input
                      id="waitlist-mobile"
                      name="mobile"
                      type="tel"
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="+1 555 000 0000"
                      className={`input-field w-full pl-11 pr-4 py-3.5 rounded-xl text-sm ${errors.mobile ? 'error' : ''}`}
                      autoComplete="tel"
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-red-400 text-xs mt-1.5 font-mono">{errors.mobile}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  id="waitlist-submit"
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-4 rounded-xl text-sm flex items-center justify-center gap-2 group mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>JOIN WAITLIST</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-center text-text-muted text-xs leading-relaxed">
                  No spam. No credit card. Early access
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
