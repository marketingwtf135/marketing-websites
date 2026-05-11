import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { analytics } from '../../lib/analytics'
import { getUtmParams } from '../../lib/useUtm'

interface FormData {
  name: string
  email: string
  company: string
  role: string
}

const AMOCRM_WEBHOOK = 'https://your-amocrm-webhook-url.com/webinar'

const ROLE_OPTIONS = [
  'Wealth manager / RIA',
  'Family office',
  'Independent IFA / EAM',
  'Private banker',
  'Other',
]

export default function WBForm() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', company: '', role: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [roleOpen, setRoleOpen] = useState(false)
  const hasStarted = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Section's own border-radius: 16px → 64px as it enters viewport (same as WBWhyAxevil)
  const { scrollYProgress: radiusProgress } = useScroll({
    target: sectionRef as React.RefObject<HTMLElement>,
    offset: ['start 1', 'start 0.4'],
  })
  const sectionRadius = useTransform(radiusProgress, [0, 1], [64, 0])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { analytics.formView(); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function onInput() {
    if (!hasStarted.current) { hasStarted.current = true; analytics.formStart() }
  }

  function validate() {
    const e: typeof errors = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      Object.keys(errs).forEach(f => analytics.formError(f))
      return
    }
    setErrors({})
    setLoading(true)
    const utm = getUtmParams()
    try {
      await fetch(AMOCRM_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...utm, page: 'webinar', ts: new Date().toISOString() }),
      })
      analytics.formSubmit({ email: form.email })
      setSubmitted(true)
    } catch {
      analytics.formError('submit')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section
      id="wb-form"
      ref={sectionRef}
      className="relative w-full overflow-clip flex items-center"
      style={{
        minHeight: '100vh',
        background: '#000000',
        borderTopLeftRadius: sectionRadius,
        borderTopRightRadius: sectionRadius,
      }}
    >
      {/* Left shine - 1000px x 100vh, contain */}
      <img
        src="/img/reg-left-shine.png"
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute top-0 left-0 pointer-events-none select-none"
        style={{ width: '62.5rem', height: '100vh', objectFit: 'fill' }}
      />
      {/* Right shine — desktop right-pinned, mobile centered (like 3rd block) */}
      <img
        src="/img/reg-right-shine.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 h-full pointer-events-none select-none left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 opacity-60 lg:opacity-100"
        style={{ width: '62.5rem', objectFit: 'cover', objectPosition: 'center center' }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] container-px" style={{ paddingTop: 'clamp(3rem, 8vw, 7.5rem)', paddingBottom: 'clamp(3rem, 8vw, 7.5rem)' }}>
        <div style={{ maxWidth: 'min(100%, 32.5rem)', marginLeft: 'auto', marginRight: 'auto' }}>

          <div className="flex flex-col items-center text-center gap-4 mb-8 sm:mb-10">
            <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30">
              <span className="opacity-50">7.0</span>
              <span className="opacity-80">Registration</span>
            </div>
            <h2
              className="font-inter-tight font-semibold text-center text-white"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontWeight: 600, lineHeight: '100%', letterSpacing: '-1.28px', overflow: 'visible' }}
            >
              Register for the webinar
            </h2>
            <p className="font-inter-tight font-medium text-white/55" style={{ fontSize: '0.9375rem' }}>
              200 seats &middot; By registration &middot; Recording included
            </p>
          </div>

          {submitted ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                <FieldInput
                  placeholder="Your name"
                  value={form.name}
                  error={errors.name}
                  onChange={v => { setForm(f => ({ ...f, name: v })); onInput() }}
                />
                <FieldInput
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  error={errors.email}
                  onChange={v => { setForm(f => ({ ...f, email: v })); onInput() }}
                />
                <FieldInput
                  placeholder="Company name"
                  value={form.company}
                  onChange={v => { setForm(f => ({ ...f, company: v })); onInput() }}
                />

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setRoleOpen(o => !o)}
                    className="w-full flex items-center justify-between text-left font-inter-tight font-medium text-[15px] focus:outline-none"
                    style={{
                      height: 'clamp(3rem, 4vw, 3.75rem)',
                      padding: '1.25rem 1rem',
                      borderRadius: '1rem',
                      background: '#1A1A1A',
                      border: 'none',
                      color: form.role ? '#fff' : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {form.role || 'Role'}
                    <svg
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      aria-hidden="true"
                      className={`transition-transform ${roleOpen ? 'rotate-180' : ''}`}
                    >
                      <path d="M3 6L8 11L13 6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {roleOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 right-0 top-full mt-2 z-10 rounded-[14px] overflow-hidden"
                        style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {ROLE_OPTIONS.map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => { setForm(f => ({ ...f, role: opt })); setRoleOpen(false); onInput() }}
                            className="w-full text-left px-4 py-3 font-inter-tight font-medium text-[14px] text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                          >
                            {opt}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full flex items-center justify-center gap-2 font-inter-tight font-semibold text-[15px] text-phone-bg bg-white rounded-[14px] transition-all hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-60"
                style={{ height: 'clamp(3rem, 4vw, 3.75rem)', marginTop: '0.75rem' }}
              >
                <span className="rounded-full" style={{ width: '0.5rem', height: '0.5rem', background: '#2b2b2b' }} />
                {loading ? 'Sending...' : 'Register'}
              </button>

              <p className="font-inter-tight font-medium text-white/40 text-[12px] text-center mt-4">
                By registering you agree to receive the recording and related Axevil Capital communications. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </motion.section>
  )
}

function FieldInput({
  placeholder, value, onChange, error, type = 'text',
}: {
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
}) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full font-inter-tight font-medium text-[15px] text-white placeholder:text-white/40 focus:outline-none bg-transparent"
        style={{
          display: 'flex',
          height: 'clamp(3rem, 4vw, 3.75rem)',
          padding: '1.25rem 1rem',
          borderRadius: '1rem',
          background: '#1A1A1A',
          border: error ? '1px solid rgba(239,68,68,0.5)' : 'none',
        }}
      />
      {error && <p className="font-inter-tight font-medium text-red-400 text-[12px] mt-1.5 ml-1">{error}</p>}
    </div>
  )
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(77,186,121,0.1)', border: '1px solid rgba(77,186,121,0.25)' }}
      >
        <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
          <path d="M2 9L8.5 15.5L22 2" stroke="#4dba79" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-inter-tight font-semibold text-white text-[22px]">You&#39;re in.</h3>
        <p className="font-inter-tight font-medium text-white/55 text-[15px]">
          Confirmation and calendar invite sent to your inbox.
        </p>
      </div>
    </div>
  )
}
