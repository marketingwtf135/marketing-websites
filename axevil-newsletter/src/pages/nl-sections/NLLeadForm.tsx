import { useRef, useState, type FormEvent } from 'react'
import { analytics } from '../../lib/analytics'
import { submitSubscription } from '../../lib/subscribe'
import OwnButton from './OwnButton'

/**
 * Short subscribe form — email + phone on one row, submit underneath.
 *
 * Replaces the CTA buttons that only scrolled down to #nl-form (client feedback
 * 2026-07-23: "снова кнопка вместо формы. Заменить на email + телефон"). A button in the
 * hero costs a scroll through the whole landing before the visitor can give us anything;
 * this converts where the promise is made.
 *
 * The closing NLForm block stays as it is — it is the long version for someone who read
 * the page first and additionally collects name / position / company / AUM.
 */

interface NLLeadFormProps {
  /** Funnel label for analytics + the payload: hero | preview | … */
  source: string
  /** Submit label. */
  label?: string
  /** Reassurance under the fields. Pass null to drop it. */
  note?: string | null
  /** Centre the note and cap the width (hero) vs. left-aligned in a column (preview). */
  align?: 'center' | 'left'
  className?: string
}

const FIELD_HEIGHT = 'clamp(3.25rem, 4.5vw, 3.75rem)'

const INPUT_STYLE: React.CSSProperties = {
  fontFamily: '"Inter Tight", sans-serif',
  fontWeight: 500,
  fontSize: 'clamp(0.9375rem, 1.1vw, 1rem)',
  lineHeight: 1.2,
  letterSpacing: '-0.02em',
  color: '#ffffff',
  background: 'var(--black-500)',
  border: '1px solid transparent',
  borderRadius: '1rem',
  height: FIELD_HEIGHT,
  padding: '0 1rem',
  width: '100%',
  minWidth: 0,
  outline: 'none',
}

export default function NLLeadForm({
  source,
  label = 'Подписаться на дайджест',
  note = 'Отписка одной кнопкой в любом письме.',
  align = 'center',
  className = '',
}: NLLeadFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const started = useRef(false)

  function onInput() {
    if (!started.current) { started.current = true; analytics.formStart(source) }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    analytics.ctaClick(`${source}_submit`)

    const errs: { name?: string; email?: string; phone?: string } = {}
    if (!name.trim()) errs.name = 'Введите имя'
    if (!email.trim()) errs.email = 'Введите email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Неверный формат email'
    // Phone stays optional on purpose: every required field is another reason to leave,
    // and the address alone is enough to deliver the digest.
    if (phone.trim() && !/^[+\d][\d\s()\-]{6,}$/.test(phone)) errs.phone = 'Неверный формат телефона'
    if (Object.keys(errs).length) {
      setErrors(errs)
      Object.keys(errs).forEach(f => analytics.formError(f, source))
      return
    }

    setErrors({})
    setLoading(true)
    const ok = await submitSubscription({ email, name: name.trim(), phone: phone.trim() || undefined, source })
    if (!ok) analytics.formError('submit', source)
    analytics.formSubmit({ location: source, has_phone: !!phone.trim() })
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className={`flex items-center gap-3 w-full ${className}`}
        style={{
          background: 'var(--black-500)', borderRadius: '1rem',
          padding: '1.25rem 1.5rem', maxWidth: align === 'center' ? '38.75rem' : undefined,
        }}
      >
        <span
          aria-hidden
          className="flex items-center justify-center shrink-0 rounded-full"
          style={{ width: '1.5rem', height: '1.5rem', background: 'var(--status-open)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="#0b0b0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="font-inter-tight font-medium text-white" style={{ fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)', lineHeight: 1.35, letterSpacing: '-0.02em' }}>
          Готово — последний выпуск уже летит на {email}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`flex flex-col gap-3 w-full ${className}`}
      style={{ maxWidth: align === 'center' ? '30rem' : undefined }}
    >
      <div className="flex flex-col gap-2 w-full">
        {/* Имя → email → телефон, друг под другом. Раньше email и телефон стояли в ряд
            от sm и выше, но с добавлением имени ряд из трёх полей стал бы слишком тесным,
            а Павел (2026-08-06) просил единообразную форму из трёх строк. */}
        <label className="w-full">
          <span className="sr-only">Имя</span>
          <input
            type="text" autoComplete="given-name" placeholder="Имя"
            value={name}
            onChange={e => { setName(e.target.value); onInput() }}
            aria-invalid={!!errors.name}
            className="placeholder:text-[rgba(255,255,255,0.35)]"
            style={{ ...INPUT_STYLE, borderColor: errors.name ? 'rgba(239,68,68,0.5)' : 'transparent' }}
          />
        </label>
        <label className="w-full">
          <span className="sr-only">Email</span>
          <input
            type="email" inputMode="email" autoComplete="email" placeholder="Ваш email"
            value={email}
            onChange={e => { setEmail(e.target.value); onInput() }}
            aria-invalid={!!errors.email}
            className="placeholder:text-[rgba(255,255,255,0.35)]"
            style={{ ...INPUT_STYLE, borderColor: errors.email ? 'rgba(239,68,68,0.5)' : 'transparent' }}
          />
        </label>
        <label className="w-full">
          <span className="sr-only">Телефон</span>
          <input
            type="tel" inputMode="tel" autoComplete="tel" placeholder="Телефон (необязательно)"
            value={phone}
            onChange={e => { setPhone(e.target.value); onInput() }}
            aria-invalid={!!errors.phone}
            className="placeholder:text-[rgba(255,255,255,0.35)]"
            style={{ ...INPUT_STYLE, borderColor: errors.phone ? 'rgba(239,68,68,0.5)' : 'transparent' }}
          />
        </label>

        {(errors.name || errors.email || errors.phone) && (
          <p role="alert" className="font-inter-tight font-medium"
            style={{ fontSize: 'var(--font-s)', lineHeight: 1.3, letterSpacing: '-0.02em', color: '#ef4444' }}>
            {errors.name ?? errors.email ?? errors.phone}
          </p>
        )}

        <OwnButton type="submit" disabled={loading} fullWidth label={loading ? 'Отправляем…' : label} />
      </div>

      {note && (
        <p className="font-inter-tight font-medium"
          style={{
            fontSize: 'var(--font-xs)', lineHeight: 1.3, color: 'var(--white-400)',
            textAlign: align === 'center' ? 'center' : 'left',
          }}>
          {note}
        </p>
      )}
    </form>
  )
}
