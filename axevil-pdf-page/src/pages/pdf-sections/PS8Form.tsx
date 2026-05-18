import { useState, useRef, type FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import PDFSectionLabel from '../../components/PDFSectionLabel'
import PDFCtaButton from '../../components/PDFCtaButton'

interface FormState {
  name: string
  email: string
  digest: boolean
}

export default function PS8Form() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [form, setForm] = useState<FormState>({ name: '', email: '', digest: false })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; digest?: string }>({})

  function validate() {
    const e: { name?: string; email?: string; digest?: string } = {}
    if (!form.name.trim()) e.name = 'Введите имя'
    if (!form.email.trim()) e.email = 'Введите email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Неверный формат'
    if (!form.digest) e.digest = 'Необходимо подтвердить'
    return e
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    // TODO: wire to real endpoint
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <section
      id="pdf-form"
      style={{
        background: 'linear-gradient(0deg, #000 77.85%, #080808 100%)',
        minHeight: '100svh',
        paddingTop: 'clamp(5rem, 8vw, 7.5rem)',
        paddingInline: '1.25rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shine background — at bottom, behind content */}
      <img
        src="/img/newsletter-shine-bg.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          pointerEvents: 'none',
          opacity: 0.9,
        }}
      />

      {/* Form wrapper */}
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          paddingInline: 'clamp(1rem, 5vw, 5rem)',
        }}
      >
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Heading */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '2rem',
            }}
          >
            <PDFSectionLabel>7.0&nbsp;&nbsp;PDF</PDFSectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', textAlign: 'center' }}>
              <h2
                className="font-inter-tight font-semibold"
                style={{
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(94deg, #A2A2A2 15.77%, #FFF 49.29%, #A2A2A2 82.81%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  overflow: 'visible',
                }}
              >
                Получить PDF
              </h2>
              <p
                className="font-inter-tight font-medium"
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  lineHeight: 1.35,
                  letterSpacing: '-0.02em',
                  color: 'rgba(255,255,255,0.5)',
                  textAlign: 'center',
                  maxWidth: '31rem',
                }}
              >
                Линк придёт на email в течение минуты.
              </p>
            </div>
          </div>

          {/* Form or success */}
          <div
            style={{
              width: '100%',
              maxWidth: 'clamp(20rem, 50vw, 37.5rem)',
            }}
          >
            {submitted ? (
              <div
                style={{
                  background: '#1a1a1a',
                  borderRadius: '1rem',
                  padding: '2rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <p
                  className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: '1.25rem' }}
                >
                  ✓ Готово!
                </p>
                <p
                  className="font-inter-tight font-medium"
                  style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9375rem', lineHeight: 1.5 }}
                >
                  Ссылка на PDF отправлена на {form.email}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                noValidate
              >
                {/* Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Alexander"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                    className="font-inter-tight font-medium text-white placeholder:text-[rgba(255,255,255,0.35)]"
                    style={{
                      background: '#1a1a1a',
                      borderRadius: '1rem',
                      height: '3.75rem',
                      padding: '1.25rem 1rem',
                      fontSize: '1rem',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      letterSpacing: '-0.02em',
                      color: 'white',
                      border: errors.name ? '1px solid rgba(239,68,68,0.5)' : 'none',
                      outline: 'none',
                      width: '100%',
                      fontFamily: 'Inter Tight, sans-serif',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.2)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  {errors.name && (
                    <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: '0.75rem', color: '#f87171', marginTop: '0.375rem', marginLeft: '0.25rem' }}>
                      {errors.name}
                    </p>
                  )}
                </div>
                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                    className="font-inter-tight font-medium text-white placeholder:text-[rgba(255,255,255,0.35)]"
                    style={{
                      background: '#1a1a1a',
                      borderRadius: '1rem',
                      height: '3.75rem',
                      padding: '1.25rem 1rem',
                      fontSize: '1rem',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      letterSpacing: '-0.02em',
                      color: 'white',
                      border: errors.email ? '1px solid rgba(239,68,68,0.5)' : 'none',
                      outline: 'none',
                      width: '100%',
                      fontFamily: 'Inter Tight, sans-serif',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.2)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  {errors.email && (
                    <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: '0.75rem', color: '#f87171', marginTop: '0.375rem', marginLeft: '0.25rem' }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Checkbox */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      required
                      checked={form.digest}
                      onChange={e => setForm(f => ({ ...f, digest: e.target.checked }))}
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        cursor: 'pointer',
                        flexShrink: 0,
                        accentColor: '#202020',
                        marginTop: '0.125rem',
                      }}
                    />
                    <span
                      className="font-inter-tight font-medium"
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        lineHeight: 1.3,
                        color: '#9b9b9b',
                      }}
                    >
                      Подпишите меня на еженедельный дайджест Axevil
                    </span>
                  </label>
                  {errors.digest && (
                    <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: '0.75rem', color: '#f87171', marginTop: '0.375rem', marginLeft: '0.25rem' }}>
                      {errors.digest}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <PDFCtaButton
                  type="submit"
                  scrollTo=""
                  style={{ width: '100%', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                >
                  {loading ? 'Отправляем...' : 'Получить PDF'}
                </PDFCtaButton>

                {/* Legal */}
                <p
                  className="font-inter-tight font-medium text-center"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: '#9b9b9b',
                    textAlign: 'center',
                    maxWidth: '25rem',
                    margin: '0 auto',
                  }}
                >
                  Отправляя форму, соглашаетесь с обработкой данных. Отписаться от дайджеста — одной кнопкой в любом письме.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
