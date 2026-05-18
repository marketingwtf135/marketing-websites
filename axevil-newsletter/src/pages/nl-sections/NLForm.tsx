import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { analytics } from '../../lib/analytics'
import { getUtmParams } from '../../lib/useUtm'
import OwnButton from './OwnButton'

const NEWSLETTER_WEBHOOK = 'https://your-webhook-url.com/newsletter' // TODO: replace

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
        style={{ background: '#1a1a1a', height: 60, borderRadius: 16 }}
      >
        <span className="font-inter-tight font-medium text-[16px]"
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
            style={{ background: '#1a1a1a' }}
          >
            {AUM_OPTIONS.map((opt, i) => (
              <div
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className="group flex items-center px-4 cursor-pointer transition-colors hover:bg-white/5 font-inter-tight font-medium text-[16px]"
                style={{
                  height: 52,
                  borderBottom: i < AUM_OPTIONS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  color: '#9B9B9B',
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
  const hasStarted = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { analytics.formView(); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  function onInput() {
    if (!hasStarted.current) { hasStarted.current = true; analytics.formStart() }
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
    if (Object.keys(errs).length) { setErrors(errs); Object.keys(errs).forEach(f => analytics.formError(f)); return }
    setErrors({})
    setLoading(true)
    const utm = getUtmParams()
    try {
      await fetch(NEWSLETTER_WEBHOOK, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...utm, page: 'newsletter', ts: new Date().toISOString() }),
      })
      analytics.formSubmit({ email: form.email })
      setSubmitted(true)
    } catch { analytics.formError('submit') }
    finally { setLoading(false) }
  }

  return (
    <section id="nl-form" ref={sectionRef}
      className="relative w-full overflow-hidden flex items-start sm:items-center justify-center"
      style={{
        minHeight: '100svh',
        background: 'linear-gradient(to top, black 77.85%, #080808 100%)',
      }}
    >
      {/* Shine background — right-0 top-0, 100% width per Figma 784-13986 */}
      <div className="absolute right-0 top-0 w-full h-full pointer-events-none" aria-hidden>
        <img src="/img/newsletter/newsletter-shine-bg.png"
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
            <span style={{ color: '#404040' }}>7.0</span>
            <span style={{ color: '#848484' }}>Подписка на дайджест</span>
          </div>
          <div className="flex flex-col gap-4 items-center text-center">
            <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text"
              style={{ fontSize: 'clamp(2.25rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em', overflow: 'visible', backgroundImage: 'linear-gradient(103.042deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)', whiteSpace: 'pre-line' }}>
              {'Подписаться \nна дайджест'}
            </h2>
            <p className="font-inter-tight font-medium"
              style={{ fontSize: "clamp(0.875rem, 1.25vw, 1.125rem)", lineHeight: 1.35, color: "rgba(255,255,255,0.5)", letterSpacing: "-0.36px", maxWidth: "31.25rem" }}>
              Welcome-выпуск + инструменты — в почте через 60 секунд. Бесплатно. Отписка в 1 клик
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3 items-center w-full max-w-[600px]">
          {submitted ? (
            <SuccessState />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[1rem] w-full">
              <Field error={errors.email} input={
                <input type="email" required autoComplete="email" inputMode="email"
                  placeholder="your@email.com" value={form.email}
                  onChange={e => { setForm(f => ({ ...f, email: e.target.value })); onInput() }}
                  className={inputClass(!!errors.email)} />
              } />
              <Field error={errors.name} input={
                <input type="text" required autoComplete="given-name"
                  placeholder="Александр |" value={form.name}
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

              <OwnButton type="submit" disabled={loading} label={loading ? 'Отправка…' : 'Подписаться'} />

              <p className="font-inter-tight font-medium text-center w-full"
                style={{ fontSize: '0.75rem', lineHeight: 1.3, color: '#9b9b9b', mixBlendMode: 'difference' }}>
                Бесплатно. Отписаться — одной кнопкой в любом письме. Подписываясь, соглашаетесь с обработкой данных
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}

function inputClass(hasError: boolean) {
  return ['w-full bg-transparent font-inter-tight font-medium text-white placeholder:text-[rgba(255,255,255,0.35)]', 'text-[16px] focus:outline-none transition-colors', hasError ? '' : ''].join(' ')
}

function Field({ input, error, className, children }: { input?: React.ReactNode; error?: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ''}`}>
      <div className="flex items-center px-4 w-full"
        style={{ background: '#1a1a1a', height: 60, borderRadius: 16, border: error ? '1px solid rgba(239,68,68,0.5)' : 'none' }}>
        {input ?? children}
      </div>
      {error && <p className="font-inter-tight font-medium text-red-400 text-[12px]">{error}</p>}
    </div>
  )
}

function SuccessState() {
  return (
    <div className="flex flex-col items-start gap-6 py-6 w-full max-w-[600px]">
      {/* Icon */}
      <div className="flex items-center justify-center shrink-0"
        style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'rgba(77,186,121,0.1)', border: '1px solid rgba(77,186,121,0.3)' }}>
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
          <path d="M2 9L8 15.5L20 2" stroke="#4dba79" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <h3 className="font-inter-tight font-semibold text-transparent bg-clip-text"
          style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            lineHeight: 1.1, letterSpacing: '-0.02em',
            backgroundImage: 'linear-gradient(103.042deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)',
          }}>
          Вы в списке дайджеста
        </h3>
        <p className="font-inter-tight font-medium"
          style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.55, color: 'rgba(255,255,255,0.55)', maxWidth: '31.25rem' }}>
          Спасибо за подписку на Axevil Дайджест. Первый выпуск с обзором рынка частных компаний придёт вам на почту — дальше каждый вторник в 9:00.
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {['Secondary-рынок', 'Рейтинги и оценки', 'Тендер-оферы', 'Новые раунды'].map(tag => (
          <span key={tag} className="font-inter-tight font-medium"
            style={{
              fontSize: '0.75rem', lineHeight: 1.3,
              color: 'rgba(255,255,255,0.4)',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
            }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
