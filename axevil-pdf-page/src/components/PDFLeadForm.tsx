import { useRef, useState, type FormEvent } from 'react'
import { analytics } from '../lib/analytics'

/**
 * Short lead capture — email + phone on one line, submit on the end.
 *
 * Replaces the hero's "Скачать PDF" button (client feedback 2026-07-23: "вместо кнопки
 * — короткая форма email + телефон. Кнопка это лишний клик и точка отказа"). The button
 * only scrolled to PS8Form at the bottom of the page, so the visitor had to travel the
 * whole landing before they could give us anything; asking here converts the hero itself.
 *
 * PS8Form at the foot of the page stays as it is — it is the same offer for someone who
 * read the whole thing first, and it additionally collects a name and the digest opt-in.
 *
 * Submission is stubbed exactly like PS8Form's (`TODO: wire to real endpoint`) — both
 * want the same endpoint and should be wired in one pass, not one each.
 */

interface PDFLeadFormProps {
  /** Submit label — the offer, spelled out. */
  cta?: string
  /** Reassurance under the fields. Pass null to drop it. */
  note?: string | null
  className?: string
}

const INPUT_STYLE: React.CSSProperties = {
  fontFamily: 'Inter Tight, sans-serif',
  fontWeight: 500,
  fontSize: 'clamp(0.9375rem, 1.1vw, 1rem)',
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  color: 'white',
  background: '#111',
  border: '1px solid #242424',
  borderRadius: '1rem',
  height: 'clamp(3.5rem, 4.5vw, 4rem)',
  padding: '0 1.25rem',
  width: '100%',
  minWidth: 0,
  outline: 'none',
}

export default function PDFLeadForm({
  cta = 'Получить бесплатный отчёт на 51 страницу',
  note = 'Отправим один раз. Отписка одним кликом.',
  className = '',
}: PDFLeadFormProps) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const started = useRef(false)

  function onInput() {
    if (!started.current) { started.current = true; analytics.formStart('hero') }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    analytics.ctaClick('hero_submit')
    const errs: { email?: string; phone?: string } = {}
    if (!email.trim()) errs.email = 'Введите email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Неверный формат'
    // Phone is optional on purpose: every required field is another reason to leave, and
    // the email alone is enough to deliver the report.
    if (phone.trim() && !/^[+\d][\d\s()\-]{6,}$/.test(phone)) errs.phone = 'Неверный формат'
    if (Object.keys(errs).length) {
      setErrors(errs)
      Object.keys(errs).forEach(f => analytics.formError(f, 'hero'))
      return
    }
    setErrors({})
    setLoading(true)
    analytics.formSubmit({ location: 'hero', has_phone: !!phone.trim() })
    // TODO: wire to real endpoint (same one as PS8Form).
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 900)
  }

  if (submitted) {
    return (
      <div
        className={className}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          background: '#111', border: '1px solid #242424', borderRadius: '1rem',
          padding: '1.25rem 1.5rem', width: '100%', maxWidth: '38.75rem',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: '#4DBA79',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="#0b0b0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p
          style={{
            fontFamily: 'Inter Tight, sans-serif', fontWeight: 500,
            fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)', lineHeight: 1.35,
            letterSpacing: '-0.02em', color: 'white', margin: 0,
          }}
        >
          Готово — отчёт уже летит на {email}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '38.75rem' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {/* Two fields side by side from sm up, stacked on a phone. */}
        <div className="pdf-lead-fields" style={{ display: 'flex', gap: '0.625rem', width: '100%' }}>
          <label style={{ flex: '1 1 0', minWidth: 0 }}>
            <span className="sr-only">Email</span>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); onInput() }}
              aria-invalid={!!errors.email}
              style={{ ...INPUT_STYLE, borderColor: errors.email ? '#e05b5b' : '#242424' }}
            />
          </label>
          <label style={{ flex: '1 1 0', minWidth: 0 }}>
            <span className="sr-only">Телефон</span>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Телефон (необязательно)"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); onInput() }}
              aria-invalid={!!errors.phone}
              style={{ ...INPUT_STYLE, borderColor: errors.phone ? '#e05b5b' : '#242424' }}
            />
          </label>
        </div>

        {(errors.email || errors.phone) && (
          <p
            role="alert"
            style={{
              fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: '0.875rem',
              lineHeight: 1.3, letterSpacing: '-0.02em', color: '#e05b5b', margin: 0,
            }}
          >
            {errors.email ?? errors.phone}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="cta-button-glow relative flex items-center justify-center gap-2 font-inter-tight font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-60"
          style={{
            background: 'white',
            border: 'none',
            borderBottom: '3px solid #b8b8b8',
            height: 'clamp(3.5rem, 4.5vw, 4rem)',
            padding: '0.8125rem 2rem 1rem',
            borderRadius: '1rem',
            fontSize: 'clamp(0.9375rem, 1.25vw, 1.125rem)',
            fontWeight: 600,
            lineHeight: '110%',
            letterSpacing: '-0.6px',
            color: '#202020',
            fontFamily: '"Inter Tight", sans-serif',
            cursor: 'pointer',
            // Fills the form, i.e. exactly the width of the two fields above it (client
            // feedback 2026-07-28). Was capped at 30rem and centred, which left it visibly
            // narrower than the row it belongs to.
            width: '100%',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M9 2v9M5.5 7.5L9 11l3.5-3.5" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 13.5h12" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          {loading ? 'Отправляем…' : cta}
        </button>
      </div>

      {note && (
        <p
          style={{
            fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: '0.8125rem',
            lineHeight: 1.35, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.45)',
            margin: 0, textAlign: 'center',
          }}
        >
          {note}
        </p>
      )}
    </form>
  )
}
