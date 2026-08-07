import { useState, useRef, useEffect, type FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { analytics } from '../../lib/analytics'
import PDFCtaButton from '../../components/PDFCtaButton'

interface FormState {
  name: string
  email: string
  digest: boolean
}

/** Track record shown beside the form (client figures, 2026-07-23). */
const FORM_STATS: { value: string; label: string }[] = [
  { value: '$150M', label: 'под управлением' },
  { value: '1000+', label: 'инвесторов' },
  { value: '7',     label: 'экзитов' },
]

export default function PS8Form() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [form, setForm] = useState<FormState>({ name: '', email: '', digest: false })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const hasStarted = useRef(false)

  // The funnel's last step reached ("скролл до финала") + the form in view.
  useEffect(() => {
    if (!inView) return
    analytics.finalReached()
    analytics.formView('final')
  }, [inView])

  function onInput() {
    if (!hasStarted.current) { hasStarted.current = true; analytics.formStart('final') }
  }

  function validate() {
    const e: { name?: string; email?: string } = {}
    if (!form.name.trim()) e.name = 'Введите имя'
    if (!form.email.trim()) e.email = 'Введите email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Неверный формат'
    return e
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    analytics.ctaClick('final_submit')
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      Object.keys(errs).forEach(f => analytics.formError(f, 'final'))
      return
    }
    setErrors({})
    setLoading(true)
    analytics.formSubmit({ location: 'final', digest: form.digest })
    // TODO: wire to real endpoint
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <section
      id="pdf-form"
      className="relative w-full overflow-hidden flex items-start sm:items-center justify-center"
      style={{
        minHeight: '100svh',
        background: 'linear-gradient(to top, black 77.85%, #080808 100%)',
      }}
    >
      {/* Shine background — exact NLForm pattern: right-0 top-0, full cover */}
      <div className="absolute right-0 top-0 w-full h-full pointer-events-none" aria-hidden>
        <img
          src="/img/newsletter-shine-bg.png"
          alt=""
          className="w-full h-full object-cover object-right-top"
          loading="lazy"
          onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }}
        />
      </div>

      {/* Content — NLForm wrapper */}
      <motion.div
        ref={ref}
        className="relative w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[80px] pt-[3.75rem] pb-[3.75rem] sm:py-[5rem] lg:py-[6.25rem] flex flex-col items-center"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ gap: '2.5rem' }}
      >
        {/* Header */}
        <div className="flex flex-col gap-[1rem] items-center justify-center w-full max-w-[600px]">
          <div
            className="flex gap-2 font-inter-tight font-medium items-center justify-center whitespace-nowrap"
            style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)', lineHeight: 1.35, letterSpacing: '-0.36px' }}
          >
            <span style={{ color: '#404040' }}>7.0</span>
            <span style={{ color: '#848484' }}>PDF</span>
          </div>
          <div className="flex flex-col gap-4 items-center text-center" style={{ overflow: 'visible' }}>
            <h2
              className="font-inter-tight font-semibold text-transparent bg-clip-text"
              style={{
                fontSize: 'clamp(2.25rem, 4.4vw, 4rem)', lineHeight: 1.15,
                letterSpacing: '-0.02em', overflow: 'visible', paddingBottom: '0.15em',
                backgroundImage: 'linear-gradient(94deg, #A2A2A2 15.77%, #FFF 49.29%, #A2A2A2 82.81%)',
              }}
            >
              Получить PDF
            </h2>
            <p
              className="font-inter-tight font-medium"
              style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.36px', maxWidth: '31.25rem' }}
            >
              Линк придёт на email в течение минуты.
            </p>
          </div>

          {/* Track record + the unsubscribe promise (client feedback 2026-07-23: "рядом
              цифры и «отправим один раз, отпишетесь одним кликом»"). The form was the
              last thing on the page with nothing standing behind it — these answer
              "who is asking" and "what happens to my address" at the moment of typing. */}
          <ul
            style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
              gap: 'clamp(1.25rem, 4vw, 2.75rem)', listStyle: 'none', padding: 0,
              margin: '0.5rem 0 0', width: '100%',
            }}
          >
            {FORM_STATS.map((s) => (
              <li key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.125rem' }}>
                <span
                  className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', lineHeight: 1.1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}
                >
                  {s.value}
                </span>
                <span
                  className="font-inter-tight font-medium"
                  style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)', lineHeight: 1.3, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}
                >
                  {s.label}
                </span>
              </li>
            ))}
          </ul>

          <p
            className="font-inter-tight font-medium text-center"
            style={{ fontSize: '0.8125rem', lineHeight: 1.35, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.4)', margin: 0 }}
          >
            Отправим один раз, отпишетесь одним кликом.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3 items-center w-full max-w-[600px]">
          {submitted ? (
            <div style={{ background: '#1a1a1a', borderRadius: '1rem', padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'rgba(77,186,121,0.1)', border: '1px solid rgba(77,186,121,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="18" viewBox="0 0 22 18" fill="none"><path d="M2 9L8 15.5L20 2" stroke="#4dba79" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p className="font-inter-tight font-semibold text-white" style={{ fontSize: '1.25rem' }}>Готово!</p>
              <p className="font-inter-tight font-medium" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
                Ссылка на PDF отправлена на {form.email}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[1rem] w-full">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <div
                  className="flex items-center px-4 w-full"
                  style={{ background: '#1a1a1a', height: 60, borderRadius: 16, border: errors.name ? '1px solid rgba(239,68,68,0.5)' : 'none' }}
                >
                  <input
                    type="text"
                    placeholder="Alexander"
                    value={form.name}
                    onChange={e => { setForm(f => ({ ...f, name: e.target.value })); onInput() }}
                    className="w-full bg-transparent font-inter-tight font-medium text-white placeholder:text-[rgba(255,255,255,0.35)] text-[16px] focus:outline-none"
                  />
                </div>
                {errors.name && <p className="font-inter-tight font-medium text-red-400 text-[12px]">{errors.name}</p>}
              </div>
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <div
                  className="flex items-center px-4 w-full"
                  style={{ background: '#1a1a1a', height: 60, borderRadius: 16, border: errors.email ? '1px solid rgba(239,68,68,0.5)' : 'none' }}
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); onInput() }}
                    className="w-full bg-transparent font-inter-tight font-medium text-white placeholder:text-[rgba(255,255,255,0.35)] text-[16px] focus:outline-none"
                  />
                </div>
                {errors.email && <p className="font-inter-tight font-medium text-red-400 text-[12px]">{errors.email}</p>}
              </div>
              {/* Checkbox */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <div
                  onClick={() => setForm(f => ({ ...f, digest: !f.digest }))}
                  role="checkbox"
                  aria-checked={form.digest}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault()
                      setForm(f => ({ ...f, digest: !f.digest }))
                    }
                  }}
                  style={{ width: '1.5rem', height: '1.5rem', borderRadius: '0.5rem', border: '1px solid #404040', background: form.digest ? 'white' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 150ms' }}
                >
                  {form.digest && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1.5 5L4.5 8L10.5 1.5" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="font-inter-tight font-medium" style={{ fontSize: '0.75rem', lineHeight: 1.4, color: '#9b9b9b' }}>
                  Подпишите меня на еженедельный дайджест Axevil
                </span>
              </label>
              {/* Submit */}
              <PDFCtaButton type="submit" scrollTo="" style={{ width: '100%', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Отправляем...' : 'Получить PDF'}
              </PDFCtaButton>
              {/* Legal */}
              <p
                className="font-inter-tight font-medium text-center w-full"
                style={{ fontSize: '0.75rem', lineHeight: 1.3, color: '#9b9b9b' }}
              >
                Отправляя форму, соглашаетесь с обработкой данных. Отписаться от дайджеста — одной кнопкой в любом письме.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}
