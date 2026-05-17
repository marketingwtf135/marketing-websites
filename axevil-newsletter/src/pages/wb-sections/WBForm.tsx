import { useEffect, useRef, useState } from 'react'
import { analytics } from '../../lib/analytics'
import { getUtmParams } from '../../lib/useUtm'

interface FormData {
  email: string
  name: string
  position: string
  company: string
  phone: string
  contactMe: boolean
}

const AMOCRM_WEBHOOK = 'https://your-amocrm-webhook-url.com/webinar' // TODO: replace with real URL

export default function WBForm() {
  const [form, setForm] = useState<FormData>({
    email: '', name: '', position: '', company: '', phone: '', contactMe: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const hasStarted = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)

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
    if (!hasStarted.current) {
      hasStarted.current = true
      analytics.formStart()
    }
  }

  function validate() {
    const e: typeof errors = {}
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.name.trim()) e.name = 'Required'
    if (form.contactMe && !form.phone.trim()) e.phone = 'Required when "Contact me" is selected'
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
    const payload = { ...form, ...utm, page: 'webinar', ts: new Date().toISOString() }
    try {
      await fetch(AMOCRM_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    <section
      id="wb-form"
      ref={sectionRef}
      className="relative w-full"
      style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Subtle white glow */}
      <div
        className="absolute top-0 left-1/2 pointer-events-none"
        style={{
          transform: 'translateX(-50%)',
          width: '700px',
          height: '300px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 65%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[80px] pt-[64px] pb-[100px] sm:pt-[80px] sm:pb-[120px] lg:pt-[100px] lg:pb-[160px]">
        <div className="max-w-[600px] mx-auto">

          <div className="mb-8 sm:mb-10 text-center">
            <div className="flex items-center justify-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30 mb-4">
              <span className="opacity-50">7.0</span>
              <span className="opacity-80">Registration</span>
            </div>
            <h2
              className="font-inter-tight font-semibold text-transparent bg-clip-text mb-4"
              style={{
                fontSize: 'clamp(36px, 3.5vw, 48px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #8f8f8f 99.06%)',
                overflow: 'visible',
              }}
            >
              Register for the webinar
            </h2>
            <p className="font-inter-tight font-medium text-white/50 text-text-m leading-[1.5]">
              Leave your details вЂ” we'll send registration confirmation and a calendar link.
            </p>
          </div>

          {submitted ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
              <Field label="Email *" error={errors.email} input={
                <input type="email" required autoComplete="email" inputMode="email" placeholder="your@email.com" value={form.email}
                  onChange={e => { setForm(f => ({ ...f, email: e.target.value })); onInput() }}
                  className={fieldClass(!!errors.email)} />
              } />

              <Field label="Name *" error={errors.name} input={
                <input type="text" required autoComplete="name" placeholder="First Last" value={form.name}
                  onChange={e => { setForm(f => ({ ...f, name: e.target.value })); onInput() }}
                  className={fieldClass(!!errors.name)} />
              } />

              <div className="flex flex-col gap-4">
                <Field label="Position" input={
                  <input type="text" autoComplete="organization-title" placeholder="e.g. Wealth Manager, Family Office Director" value={form.position}
                    onChange={e => { setForm(f => ({ ...f, position: e.target.value })); onInput() }}
                    className={fieldClass(false)} />
                } />
                <Field label="Company / Family Office" input={
                  <input type="text" autoComplete="organization" placeholder="Company name" value={form.company}
                    onChange={e => { setForm(f => ({ ...f, company: e.target.value })); onInput() }}
                    className={fieldClass(false)} />
                } />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative mt-0.5 shrink-0">
                  <input type="checkbox" checked={form.contactMe}
                    onChange={e => setForm(f => ({ ...f, contactMe: e.target.checked }))}
                    className="sr-only" />
                  <div
                    className="w-5 h-5 rounded-[5px] flex items-center justify-center transition-colors"
                    style={{
                      background: form.contactMe ? '#ffffff' : 'transparent',
                      border: form.contactMe ? '1px solid rgba(255,255,255,0.8)' : '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    {form.contactMe && (
                      <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                        <path d="M1 4L4 7L10 1" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="font-inter-tight font-medium text-white/60 text-[14px] leading-[1.4]">
                  Contact me personally to discuss investment opportunities
                </span>
              </label>

              {form.contactMe && (
                <Field label="Phone *" error={errors.phone} input={
                  <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+1 (555) 000-0000" value={form.phone}
                    onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); onInput() }}
                    className={fieldClass(!!errors.phone)} />
                } />
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center font-inter-tight font-semibold text-text-m text-phone-bg bg-white rounded-2xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white mt-2 disabled:opacity-60"
                style={{ height: '56px' }}
              >
                {loading ? 'SendingвЂ¦' : 'Register'}
              </button>

              <p className="font-inter-tight font-medium text-white/25 text-text-s-med text-center">
                By registering you agree to our Privacy Policy. No spam вЂ” only the webinar link.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function fieldClass(hasError: boolean) {
  return [
    'w-full bg-transparent font-inter-tight font-medium text-white placeholder:text-white/30',
    'text-[16px]', // 16px prevents iOS auto-zoom on focus
    'focus:outline-none transition-colors',
    hasError ? 'border-red-500/60' : 'border-white/10 focus:border-white/25',
  ].join(' ')
}

function Field({ label, error, input }: { label: string; error?: string; input: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-inter-tight font-medium text-white/50 text-text-s-med">{label}</label>
      <div
        className="rounded-[14px] px-4 transition-colors h-14 sm:h-[52px]"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {input}
      </div>
      {error && <p className="font-inter-tight font-medium text-red-400 text-text-s-med">{error}</p>}
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
        <h3 className="font-inter-tight font-semibold text-white text-text-xl">Registration confirmed</h3>
        <p className="font-inter-tight font-medium text-white/50 text-text-m">
          Add the webinar to your calendar to not miss it.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        {['Google Calendar', 'Apple Calendar', '.ics file'].map(label => (
          <a key={label} href="#"
            className="flex items-center justify-center font-inter-tight font-medium text-text-m text-white rounded-[12px] hover:bg-white/10 transition-colors"
            style={{ height: '44px', padding: '0 20px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}
