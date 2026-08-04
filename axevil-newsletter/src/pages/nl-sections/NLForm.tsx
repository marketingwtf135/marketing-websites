import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { analytics } from '../../lib/analytics'
import { asset } from '../../lib/asset'
import { initGeoCountry } from '../../lib/geo'
import { submitSubscription } from '../../lib/subscribe'
import OwnButton from './OwnButton'

/**
 * Social proof beside the closing form (client feedback 2026-07-23: "форма ок. Добавить
 * social proof: «1200+ wealth-менеджеров уже подписаны» + logo-band институций").
 * The count is the client's figure.
 */
const SUBSCRIBER_COUNT = '1200+ wealth-менеджеров уже подписаны'

/**
 * Institution logo band. Empty until the client supplies cleared logo files — we do not
 * put institution names on the page that we cannot evidence. Drop `{src, alt}` entries in
 * and the band renders logos instead of the audience-mix fallback below; no other change
 * is needed.
 */
const INSTITUTION_LOGOS: { src: string; alt: string }[] = []

/** What the list is made of — true, checkable, and enough of a signal without logos. */
const SUBSCRIBER_MIX = ['Family offices', 'Private banks', 'Независимые advisors', 'Инвест-бутики']

const AUM_OPTIONS = [
  { value: '<1m',     label: '< $1M' },
  { value: '1-5m',    label: '$1M — $5M' },
  { value: '5-25m',   label: '$5M — $25M' },
  { value: '25-100m', label: '$25M — $100M' },
  { value: '>100m',   label: '> $100M' },
]

interface FormData {
  email: string; name: string; position: string; company: string; aum: string
}

/** Styled dropdown matching webinar page style */
function AUMDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = AUM_OPTIONS.find(o => o.value === value)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-4 cursor-pointer select-none"
        style={{ background: 'var(--black-500)', height: 60, borderRadius: 16 }}
      >
        <span className="font-inter-tight font-medium text-m"
          style={{ color: selected ? '#ffffff' : 'rgba(255,255,255,0.35)' }}>
          {selected ? selected.label : 'AUM bracket (опционально)'}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          width="20" height="20" viewBox="0 0 20 20" fill="none"
          style={{ flexShrink: 0, display: 'block' }}
        >
          <path d="M5 8L10 13L15 8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </div>

      {/* Dropdown list */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-0 right-0 z-[1000] mt-1 overflow-hidden rounded-[16px]"
            style={{ background: 'var(--black-500)' }}
          >
            {AUM_OPTIONS.map((opt, i) => (
              <div
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className="group flex items-center px-4 cursor-pointer transition-colors hover:bg-white/5 font-inter-tight font-medium text-m"
                style={{
                  height: 52,
                  borderBottom: i < AUM_OPTIONS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  color: 'var(--white-400)',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9B9B9B')}
              >
                {opt.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function NLForm() {
  const [form, setForm] = useState<FormData>({ email: '', name: '', position: '', company: '', aum: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  /** Скрытое поле «Страна (auto IP)» из ТЗ — заполняется само, посетитель его не видит. */
  const [country, setCountry] = useState('')
  const hasStarted = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let alive = true
    initGeoCountry().then(code => { if (alive && code) setCountry(code) })
    return () => { alive = false }
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    // Two signals, one observer: the funnel's last step reached ("скролл до финала"),
    // and the form itself in view.
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { analytics.finalReached(); analytics.formView('final'); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function onInput() {
    if (!hasStarted.current) { hasStarted.current = true; analytics.formStart('final') }
  }

  function validate() {
    const e: typeof errors = {}
    if (!form.email.trim()) e.email = 'Обязательное поле'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Неверный email'
    if (!form.name.trim()) e.name = 'Обязательное поле'
    return e
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); Object.keys(errs).forEach(f => analytics.formError(f, 'final')); return }
    setErrors({})
    setLoading(true)
    analytics.ctaClick('final_submit')
    const ok = await submitSubscription({ ...form, source: 'final' })
    if (!ok) analytics.formError('submit', 'final') // webhook may still be the placeholder
    analytics.formSubmit({ location: 'final', has_aum: !!form.aum })
    setSubmitted(true) // success either way — a placeholder endpoint is not the visitor's problem
    setLoading(false)
  }

  return (
    <section id="nl-form" ref={sectionRef}
      className="relative w-full flex items-start sm:items-center justify-center"
      style={{
        minHeight: '100svh',
        background: 'linear-gradient(to top, black 77.85%, #080808 100%)',
        zIndex: 10,
        position: 'relative',
      }}
    >
      {/* Shine background — right-0 top-0, 100% width per Figma 784-13986 */}
      <div className="absolute right-0 top-0 w-full h-full pointer-events-none" aria-hidden>
        <img src={asset('/img/newsletter/newsletter-shine-bg.png')}
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
          alt="" className="w-full h-full object-cover object-right-top" loading="lazy" />
      </div>

      <motion.div
        className="relative w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[80px] pt-0 pb-[3.75rem] sm:py-[5rem] lg:py-[6.25rem] flex flex-col items-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Header */}
        <div className="flex flex-col gap-[1rem] items-center justify-center w-full max-w-[600px] mb-10">
          <div className="flex gap-2 font-inter-tight font-medium items-center justify-center whitespace-nowrap"
            style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, letterSpacing: '-0.36px' }}>
            <span style={{ color: 'var(--black-800)' }}>8.0</span>
            <span style={{ color: 'var(--black-900)' }}>Подписка на дайджест</span>
          </div>
          <div className="flex flex-col gap-4 items-center text-center">
            <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text"
              style={{ fontSize: 'clamp(2.25rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em', overflow: 'visible', backgroundImage: 'linear-gradient(103.042deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)', whiteSpace: 'pre-line' }}>
              {'Подписаться \nна дайджест'}
            </h2>
            <p className="font-inter-tight font-medium"
              style={{ fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)", lineHeight: 1.35, color: "rgba(255,255,255,0.5)", letterSpacing: "-0.36px", maxWidth: "31.25rem" }}>
              Последний выпуск — в почте через 60 секунд. Отписка в один клик
            </p>
          </div>

          <SocialProof />
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3 items-center w-full max-w-[600px]">
          {submitted ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[0.5rem] w-full">
              <input type="hidden" name="country" value={country} readOnly />
              <Field error={errors.email} input={
                <input type="email" required autoComplete="email" inputMode="email"
                  placeholder="your@email.com" value={form.email}
                  onChange={e => { setForm(f => ({ ...f, email: e.target.value })); onInput() }}
                  className={inputClass(!!errors.email)} />
              } />
              <Field error={errors.name} input={
                <input type="text" required autoComplete="given-name"
                  placeholder="Александр" value={form.name}
                  onChange={e => { setForm(f => ({ ...f, name: e.target.value })); onInput() }}
                  className={inputClass(!!errors.name)} />
              } />
              <Field input={
                <input type="text" autoComplete="organization-title"
                  placeholder="Должность" value={form.position}
                  onChange={e => { setForm(f => ({ ...f, position: e.target.value })); onInput() }}
                  className={inputClass(false)} />
              } />
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Field className="flex-1" input={
                  <input type="text" autoComplete="organization"
                    placeholder="Компания" value={form.company}
                    onChange={e => { setForm(f => ({ ...f, company: e.target.value })); onInput() }}
                    className={inputClass(false)} />
                } />
                {/* Styled custom dropdown */}
                <div className="flex-1">
                  <AUMDropdown value={form.aum} onChange={v => { setForm(f => ({ ...f, aum: v })); onInput() }} />
                </div>
              </div>

              <OwnButton type="submit" disabled={loading} label={loading ? 'Отправка…' : 'Подписаться на дайджест'} />

              <p className="font-inter-tight font-medium text-center w-full"
                style={{ fontSize: 'var(--font-xs)', lineHeight: 1.3, color: 'var(--white-400)', mixBlendMode: 'difference' }}>
                Отписаться — одной кнопкой в любом письме. Подписываясь, соглашаетесь с обработкой данных
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}

/** Subscriber count + who they are — the reassurance that sits above the fields. */
function SocialProof() {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <p className="font-inter-tight font-semibold text-white flex items-center gap-2 text-center"
        style={{ fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
        <span className="badge-pulse shrink-0 block rounded-full" aria-hidden
          style={{ width: '0.5rem', height: '0.5rem', background: 'var(--status-open)' }} />
        {SUBSCRIBER_COUNT}
      </p>

      {INSTITUTION_LOGOS.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {INSTITUTION_LOGOS.map(logo => (
            <img key={logo.src} src={logo.src} alt={logo.alt} loading="lazy"
              className="block shrink-0 opacity-60"
              style={{ height: 'clamp(1.25rem, 1.8vw, 1.75rem)', width: 'auto' }} />
          ))}
        </div>
      ) : (
        <ul className="flex flex-wrap items-center justify-center gap-2 list-none p-0 m-0">
          {SUBSCRIBER_MIX.map(item => (
            <li key={item}
              className="font-inter-tight font-medium whitespace-nowrap rounded-full px-3 py-1.5"
              style={{ fontSize: 'var(--font-xs)', lineHeight: 1.3, color: 'var(--white-300)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return ['w-full bg-transparent font-inter-tight font-medium text-white placeholder:text-[rgba(255,255,255,0.35)]', 'text-m focus:outline-none transition-colors', hasError ? '' : ''].join(' ')
}

function Field({ input, error, className, children }: { input?: React.ReactNode; error?: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ''}`}>
      <div className="flex items-center px-4 w-full"
        style={{ background: 'var(--black-500)', height: 60, borderRadius: 16, border: error ? '1px solid rgba(239,68,68,0.5)' : 'none' }}>
        {input ?? children}
      </div>
      {error && <p className="font-inter-tight font-medium text-red-400 text-xs">{error}</p>}
    </div>
  )
}

function SuccessState() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-5 w-full py-12 px-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{ background: 'var(--black-500)', borderRadius: 20 }}
    >
      {/* Icon */}
      <div className="flex items-center justify-center"
        style={{
          width: '3.5rem', height: '3.5rem', borderRadius: '50%',
          background: 'rgba(77,186,121,0.1)',
          border: '1px solid rgba(77,186,121,0.25)',
        }}>
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <path d="M1.5 8L7 13.5L18.5 1.5" stroke="#4dba79" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="font-inter-tight font-semibold text-white"
          style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          Спасибо — мы получили ваши данные.
        </h3>
        <p className="font-inter-tight font-medium"
          style={{ fontSize: 'clamp(0.8125rem, 1vw, 0.9375rem)', lineHeight: 1.5, color: 'rgba(255,255,255,0.4)' }}>
          Последний выпуск придёт на почту в течение 60 секунд.
        </p>
      </div>
    </motion.div>
  )
}
