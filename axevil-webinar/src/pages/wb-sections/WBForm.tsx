import { useEffect, useMemo, useRef, useState, type HTMLAttributes, type ReactNode, type RefObject } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { PhoneInput, defaultCountries, getActiveFormattingMask, getCountry, type CountryIso2, type PhoneInputRefType } from 'react-international-phone'
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js'
import { analytics } from '../../lib/analytics'
import { getUtmParams } from '../../lib/useUtm'
import { getTrackingContext } from '../../lib/tracking'
import { useLang } from '../../lib/lang'
import 'react-international-phone/style.css'

interface FormData {
  name: string
  email: string
  phone: string
  phoneCountry: CountryIso2
}

type FormField = keyof FormData
type FormErrors = Partial<Record<FormField | 'submit', string>>

const DEFAULT_COUNTRY: CountryIso2 = 'ru'
const PREFERRED_COUNTRIES: CountryIso2[] = ['ru', 'kz', 'by', 'ua', 'de', 'gb', 'us']

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_ALLOWED_CHARS_REGEX = /[^\p{L}\s]/gu
const NAME_VALIDATION_REGEX = /^\p{L}+(?:\s+\p{L}+)*$/u

const I18N = {
  en: {
    required: 'Required',
    invalidName: 'Use letters only',
    invalidEmail: 'Invalid email',
    invalidPhone: 'Invalid phone number for selected country',
    submitError: 'Something went wrong. Please try again.',
    loadingAria: 'Submitting form',
  },
  ru: {
    required: 'Обязательное поле',
    invalidName: 'Используйте только буквы',
    invalidEmail: 'Некорректный email',
    invalidPhone: 'Некорректный номер для выбранной страны',
    submitError: 'Не удалось отправить форму. Попробуйте еще раз.',
    loadingAria: 'Отправка формы',
  },
}

const FORM_API_ENDPOINT = 'https://api.axevil.io/api/spreadsheet-form-writer/form-private-markets-webinar'
const TELEGRAM_BOT_BASE_URL = 'https://t.me/axevil_events_bot'
const TELEGRAM_START_PREFIX = 'mkt_webl_'
const IP_GEO_ENDPOINT = 'https://speed.cloudflare.com/meta'
const IP_GEO_TIMEOUT_MS = 3000
const IP_GEO_CACHE_KEY = 'axevil:webinar:geo-country:v1'
const IP_GEO_CACHE_TTL_MS = 24 * 60 * 60 * 1000

export default function WBForm() {
  const { t, lang } = useLang()
  const [phoneDefaultCountry, setPhoneDefaultCountry] = useState<CountryIso2>(DEFAULT_COUNTRY)
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    phoneCountry: DEFAULT_COUNTRY,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [successTelegramLink, setSuccessTelegramLink] = useState(TELEGRAM_BOT_BASE_URL)
  const [errorModalMessage, setErrorModalMessage] = useState('')
  const hasStarted = useRef(false)
  const hasPhoneInteractionRef = useRef(false)
  const phoneInputRef = useRef<PhoneInputRefType>(null)
  const submitLockRef = useRef(false)
  // Mirror of submitAttempted updated synchronously so live validators in
  // handlePhoneChange/updateField don't fire on programmatic resets that race
  // ahead of React state updates (notably PhoneInput.setCountry's onChange).
  const submitAttemptedRef = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)
  const ui = I18N[lang]

  // Section's own border-radius: 16px → 64px as it enters viewport (same as WBWhyAxevil)
  const { scrollYProgress: radiusProgress } = useScroll({
    target: sectionRef as RefObject<HTMLElement>,
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

  function resolveSupportedCountry(iso2Maybe: string | undefined) {
    const iso2 = iso2Maybe?.toLowerCase() as CountryIso2 | undefined
    if (!iso2) return undefined
    return getCountry({ field: 'iso2', value: iso2, countries: defaultCountries })
  }

  useEffect(() => {
    let cancelled = false

    function applyDetectedCountry(iso2Maybe: string | undefined) {
      const detectedCountry = resolveSupportedCountry(iso2Maybe)
      if (!detectedCountry || cancelled) return

      setPhoneDefaultCountry(detectedCountry.iso2)
      setForm(prev => {
        const phoneEmpty = prev.phone.trim() === ''
        const stillDefaultCountry = prev.phoneCountry === DEFAULT_COUNTRY
        if (hasPhoneInteractionRef.current || !stillDefaultCountry || !phoneEmpty) return prev
        return {
          ...prev,
          phoneCountry: detectedCountry.iso2,
        }
      })
      if (!hasPhoneInteractionRef.current) {
        phoneInputRef.current?.setCountry(detectedCountry.iso2, { focusOnInput: false })
      }
    }

    function readCachedCountryCode() {
      try {
        const raw = localStorage.getItem(IP_GEO_CACHE_KEY)
        if (!raw) return undefined
        const parsed = JSON.parse(raw) as { countryCode?: string; cachedAt?: number }
        if (!parsed?.countryCode || !parsed?.cachedAt) return undefined
        if (Date.now() - parsed.cachedAt > IP_GEO_CACHE_TTL_MS) return undefined
        return parsed.countryCode
      } catch {
        return undefined
      }
    }

    function saveCachedCountryCode(countryCode: string) {
      try {
        localStorage.setItem(IP_GEO_CACHE_KEY, JSON.stringify({ countryCode, cachedAt: Date.now() }))
      } catch {
        // ignore cache write errors (private mode, storage disabled, etc.)
      }
    }

    async function detectCountryByIp() {
      const cachedCountryCode = readCachedCountryCode()
      if (cachedCountryCode) {
        applyDetectedCountry(cachedCountryCode)
        return
      }

      const controller = new AbortController()
      const timeoutId = window.setTimeout(() => controller.abort(), IP_GEO_TIMEOUT_MS)
      try {
        const response = await fetch(IP_GEO_ENDPOINT, { signal: controller.signal })
        if (!response.ok) return
        const data = await response.json() as { country?: string }
        if (!data.country) return

        const isSupported = Boolean(resolveSupportedCountry(data.country))
        if (!isSupported) return

        saveCachedCountryCode(data.country)
        applyDetectedCountry(data.country)
      } catch {
        // keep fallback default country (RU)
      } finally {
        window.clearTimeout(timeoutId)
      }
    }

    detectCountryByIp()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onInput() {
    if (!hasStarted.current) { hasStarted.current = true; analytics.formStart() }
  }

  const selectedPhoneCountry = useMemo(
    () => getCountry({ field: 'iso2', value: form.phoneCountry, countries: defaultCountries }),
    [form.phoneCountry]
  )

  const phoneMaskPlaceholder = useMemo(() => {
    if (!selectedPhoneCountry) return ''
    const mask = getActiveFormattingMask({ phone: '', country: selectedPhoneCountry, defaultMask: '............' })
    const numericMask = mask.replace(/\./g, '0')
    return `+${selectedPhoneCountry.dialCode} ${numericMask}`.trim()
  }, [selectedPhoneCountry])

  function hasSubscriberDigits(phone: string, phoneCountry: CountryIso2) {
    const digits = phone.replace(/\D/g, '')
    const country = getCountry({ field: 'iso2', value: phoneCountry, countries: defaultCountries })
    const dialCodeLength = country?.dialCode?.length ?? 0
    return digits.length > dialCodeLength
  }

  function getTelegramPhoneToken(phone: string, phoneCountry: CountryIso2) {
    const digits = phone.replace(/\D/g, '')
    const country = getCountry({ field: 'iso2', value: phoneCountry, countries: defaultCountries })
    const dialCodeLength = country?.dialCode?.length ?? 0
    const hasUserDigits = digits.length > dialCodeLength
    if (!hasUserDigits) return ''

    try {
      const parsed = parsePhoneNumber(phone)
      if (parsed?.isValid()) {
        return parsed.number.replace('+', '')
      }
    } catch {
      // keep digits fallback for partially formatted numbers
    }

    return digits
  }

  function validateField(field: FormField, value: string, nextForm: FormData = form) {
    if (field === 'name') {
      if (!value.trim()) return ui.required
      return NAME_VALIDATION_REGEX.test(value.trim()) ? '' : ui.invalidName
    }
    if (field === 'email') {
      if (!value.trim()) return ui.required
      return EMAIL_REGEX.test(value) ? '' : ui.invalidEmail
    }
    if (field === 'phone') {
      if (!value.trim() || !hasSubscriberDigits(value, nextForm.phoneCountry)) return ui.required
      return isValidPhoneNumber(value) ? '' : ui.invalidPhone
    }
    return ''
  }

  function validate(nextForm: FormData) {
    const e: FormErrors = {}
    const nameError = validateField('name', nextForm.name)
    if (nameError) e.name = nameError
    const emailError = validateField('email', nextForm.email)
    if (emailError) e.email = emailError
    const phoneError = validateField('phone', nextForm.phone)
    if (phoneError) e.phone = phoneError
    return e
  }

  function updateField<K extends FormField>(field: K, value: FormData[K]) {
    const normalizedValue = field === 'name'
      ? (String(value).replace(NAME_ALLOWED_CHARS_REGEX, '').replace(/\s+/g, ' '))
      : value
    setForm(prev => {
      const next = { ...prev, [field]: normalizedValue }
      if (submitAttemptedRef.current) {
        const nextError = validateField(field, String(normalizedValue), next)
        setErrors(prevErrors => {
          const clone = { ...prevErrors }
          if (nextError) clone[field] = nextError
          else delete clone[field]
          return clone
        })
      }
      return next
    })
    setErrors(prev => {
      if (!prev.submit) return prev
      const { submit: _submit, ...rest } = prev
      return rest
    })
    onInput()
  }

  function handlePhoneChange(phone: string, country: CountryIso2) {
    hasPhoneInteractionRef.current = true
    setForm(prev => {
      const next = { ...prev, phone, phoneCountry: country }
      if (submitAttemptedRef.current) {
        const phoneError = validateField('phone', phone, next)
        setErrors(prevErrors => {
          const clone = { ...prevErrors }
          if (phoneError) clone.phone = phoneError
          else delete clone.phone
          return clone
        })
      }
      return next
    })
    setErrors(prev => {
      if (!prev.submit) return prev
      const { submit: _submit, ...rest } = prev
      return rest
    })
    onInput()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isPending || submitLockRef.current) return

    submitAttemptedRef.current = true
    setSubmitAttempted(true)
    const errs = validate(form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      Object.keys(errs).forEach(f => analytics.formError(f))
      return
    }
    setErrors({})
    setIsPending(true)
    submitLockRef.current = true
    const leadId = crypto.randomUUID()
    const utm = getUtmParams()
    const tracking = getTrackingContext()
    // NOTE: API endpoint accepts only a flat `data` object (no nested objects),
    // so all tracking context fields are flattened to the top level alongside utm_*.
    const payload = {
      data: {
        id: leadId,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone,
        phone_country: form.phoneCountry,
        company: '',
        role: '',
        telegram_username: '',
        'job title': '',
        'lead profile (about)': '',
        page: 'webinar',
        ts: new Date().toISOString(),
        lead_event_id: leadId,
        source: 'landing-webinar',
        gclid: tracking.gclid,
        gbraid: tracking.gbraid,
        wbraid: tracking.wbraid,
        fbclid: tracking.fbclid,
        fbc: tracking.fbc,
        fbp: tracking.fbp,
        page_url: tracking.page_url,
        page_path: tracking.page_path,
        referrer: tracking.referrer,
        user_agent: tracking.user_agent,
        ...utm,
      },
    }
    try {
      console.log('[WBForm] spreadsheet-form-writer payload', payload)
      const response = await fetch(FORM_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const responseText = await response.text()
      console.log('[WBForm] spreadsheet-form-writer response', { status: response.status, ok: response.ok, body: responseText })
      if (!response.ok) {
        throw new Error(`Submit failed with status ${response.status}`)
      }
      analytics.formSubmit({ email: form.email })
      // Canonical lead event — GTM listens on `lead_submit` and fans out to
      // Meta Pixel (Lead), GA4 (generate_lead), Google Ads conversion, etc.
      analytics.leadSubmit({
        lead_event_id: leadId,
        email: form.email.trim(),
        phone: form.phone,
        content_name: 'Private Markets Webinar',
        value: 1,
        currency: 'USD',
      })
      const telegramPhoneToken = getTelegramPhoneToken(form.phone, form.phoneCountry)
      const telegramLink = telegramPhoneToken
        ? `${TELEGRAM_BOT_BASE_URL}?start=${TELEGRAM_START_PREFIX}${telegramPhoneToken}`
        : TELEGRAM_BOT_BASE_URL
      const resetCountry = getCountry({ field: 'iso2', value: phoneDefaultCountry, countries: defaultCountries })
        ?? getCountry({ field: 'iso2', value: DEFAULT_COUNTRY, countries: defaultCountries })
      const resetPhoneCountry = resetCountry?.iso2 ?? DEFAULT_COUNTRY
      setSuccessTelegramLink(telegramLink)
      // Clear the "submit was attempted" flag synchronously BEFORE touching the
      // PhoneInput, otherwise its setCountry triggers onChange while the ref
      // is still true and surfaces a phantom "required" error on the reset.
      submitAttemptedRef.current = false
      hasPhoneInteractionRef.current = false
      setSubmitAttempted(false)
      setErrors({})
      setForm({
        name: '',
        email: '',
        phone: '',
        phoneCountry: resetPhoneCountry,
      })
      phoneInputRef.current?.setCountry(resetPhoneCountry, { focusOnInput: false })
      setIsSuccessModalOpen(true)
    } catch {
      analytics.formError('submit')
      setErrorModalMessage(ui.submitError)
    } finally {
      setIsPending(false)
      submitLockRef.current = false
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

      <div className="relative mx-auto w-full max-w-[1440px] container-px padding-global" style={{ paddingTop: 'clamp(3rem, 8vw, 7.5rem)', paddingBottom: 'clamp(3rem, 8vw, 7.5rem)' }}>
        <div style={{ maxWidth: 'min(100%, 32.5rem)', marginLeft: 'auto', marginRight: 'auto' }}>

          <div className="flex flex-col items-center text-center gap-4 mb-8 sm:mb-10">
            <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30">
              <span className="opacity-50">{t.form.label.split(' ')[0]}</span>
              <span className="opacity-80">{t.form.label.split(' ').slice(1).join(' ')}</span>
            </div>
            <h2
              className="font-inter-tight font-semibold text-center text-white"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontWeight: 600, lineHeight: '100%', letterSpacing: '-1.28px', overflow: 'visible' }}
            >
              {t.form.heading}
            </h2>
            <p className="font-inter-tight font-medium text-white/55" style={{ fontSize: '0.9375rem' }}>
              {t.form.sub}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <fieldset disabled={isPending} className="m-0 p-0 border-0">
                <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                  <FieldInput
                    name="name"
                    placeholder={t.form.fields.name}
                    value={form.name}
                    error={errors.name}
                    autoComplete="name"
                    enterKeyHint="next"
                    onChange={v => updateField('name', v)}
                  />
                  <FieldInput
                    name="email"
                    type="email"
                    placeholder={t.form.fields.email}
                    value={form.email}
                    error={errors.email}
                    autoComplete="email"
                    inputMode="email"
                    enterKeyHint="next"
                    onChange={v => updateField('email', v)}
                  />
                  <div>
                    <PhoneInput
                      ref={phoneInputRef}
                      defaultCountry={phoneDefaultCountry}
                      preferredCountries={PREFERRED_COUNTRIES}
                      value={form.phone}
                      disableDialCodePrefill
                      onChange={(phone, meta) => {
                        handlePhoneChange(phone, meta.country.iso2)
                      }}
                      inputClassName={`wb-form-phone-input ${errors.phone ? 'wb-form-phone-input-error' : ''}`}
                      className={`wb-form-phone ${errors.phone ? 'wb-form-phone-error' : ''}`}
                      countrySelectorStyleProps={{
                        buttonClassName: 'wb-form-phone-country-btn',
                        dropdownStyleProps: {
                          className: 'wb-form-phone-country-dropdown',
                        },
                      }}
                      placeholder={phoneMaskPlaceholder || t.form.fields.phone}
                      inputProps={{
                        name: 'phone',
                        autoComplete: 'tel',
                        inputMode: 'tel',
                        enterKeyHint: 'send',
                        'aria-invalid': Boolean(errors.phone),
                        'aria-describedby': errors.phone ? 'phone-error' : undefined,
                      }}
                    />
                    {errors.phone && <p id="phone-error" className="font-inter-tight font-medium text-red-400 text-[12px] mt-1.5 ml-1">{errors.phone}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  aria-busy={isPending}
                  aria-label={isPending ? ui.loadingAria : t.form.submit}
                  className="relative w-full flex items-center justify-center gap-2 font-inter-tight font-semibold text-[15px] text-phone-bg bg-white rounded-[14px] transition-all hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ height: 'clamp(3rem, 4vw, 3.75rem)', marginTop: '0.75rem' }}
                >
                  <span
                    className={`rounded-full ${isPending ? 'animate-pulse' : ''}`}
                    style={{ width: '0.5rem', height: '0.5rem', background: '#2b2b2b' }}
                  />
                  {isPending ? t.form.sending : t.form.submit}
                </button>
            </fieldset>

            <p className="font-inter-tight font-medium text-white/40 text-[12px] text-center mt-4">
              {t.form.disclaimer}
            </p>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {isSuccessModalOpen && (
          <FormModal
            title={t.form.success.heading}
            body={
              <div className="flex flex-col" style={{ gap: '1.25rem' }}>
                <p className="font-inter-tight font-medium text-white/65 text-[15px] leading-[1.5] text-center">
                  {t.form.success.bodyEmail}
                </p>
                <div className="h-px w-full bg-white/10" />
                <div className="flex flex-col text-center" style={{ gap: '0.5rem' }}>
                  <p className="font-inter-tight font-semibold text-white text-[16px] leading-[1.35] tracking-[-0.01em]">
                    {t.form.success.highlight}
                  </p>
                  <p className="font-inter-tight font-medium text-white/65 text-[15px] leading-[1.5]">
                    {t.form.success.bodyTelegram}
                  </p>
                </div>
              </div>
            }
            onClose={() => setIsSuccessModalOpen(false)}
            closeLabel={t.form.success.close}
            actionLabel={t.form.success.primary}
            actionHref={successTelegramLink}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {Boolean(errorModalMessage) && (
          <FormModal
            title={lang === 'ru' ? 'Ошибка отправки' : 'Submission error'}
            message={errorModalMessage}
            onClose={() => setErrorModalMessage('')}
            closeLabel={lang === 'ru' ? 'Попробовать снова' : 'Try again'}
          />
        )}
      </AnimatePresence>
    </motion.section>
  )
}

function FieldInput({
  name, placeholder, value, onChange, error, type = 'text', autoComplete, inputMode, enterKeyHint,
}: {
  name: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  autoComplete?: string
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
  enterKeyHint?: HTMLAttributes<HTMLInputElement>['enterKeyHint']
}) {
  const id = `field-${name}`
  return (
    <div>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        enterKeyHint={enterKeyHint}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full font-inter-tight font-medium text-[15px] text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 transition-colors disabled:opacity-70 bg-transparent"
        style={{
          display: 'flex',
          height: 'clamp(3rem, 4vw, 3.75rem)',
          padding: '1.25rem 1rem',
          borderRadius: '1rem',
          background: '#1A1A1A',
          border: error ? '1px solid rgba(239,68,68,0.6)' : '1px solid rgba(255,255,255,0.08)',
        }}
      />
      {error && <p id={`${id}-error`} className="font-inter-tight font-medium text-red-400 text-[12px] mt-1.5 ml-1">{error}</p>}
    </div>
  )
}

function FormModal({
  title,
  message,
  body,
  closeLabel,
  actionLabel,
  actionHref,
  onClose,
}: {
  title: string
  message?: string
  body?: ReactNode
  closeLabel: string
  actionLabel?: string
  actionHref?: string
  onClose: () => void
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      <motion.div
        className="relative w-full max-w-[30rem] rounded-2xl p-6 sm:p-8"
        style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col" style={{ gap: '1.25rem' }}>
          <h3
            className="font-inter-tight font-semibold text-white text-center"
            style={{ fontSize: 'clamp(1.375rem, 2.2vw, 1.625rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
          >
            {title}
          </h3>
          {body ?? (
            message && (
              <p className="font-inter-tight font-medium text-white/70 text-[15px] whitespace-pre-line text-center leading-[1.5]">
                {message}
              </p>
            )
          )}
          <div className="flex flex-col" style={{ gap: '0.5rem', marginTop: '0.25rem' }}>
            {actionHref && actionLabel && (
              <a
                href={actionHref}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full flex items-center justify-center gap-2 font-inter-tight font-semibold text-[15px] text-phone-bg bg-white rounded-[14px] transition-all hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                style={{ height: 'clamp(3rem, 4vw, 3.75rem)' }}
              >
                <span className="rounded-full" style={{ width: '0.5rem', height: '0.5rem', background: '#2b2b2b' }} />
                {actionLabel}
              </a>
            )}
            {actionHref && actionLabel ? (
              <button
                type="button"
                onClick={onClose}
                className="relative w-full flex items-center justify-center font-inter-tight font-semibold text-[15px] text-white/80 hover:text-white bg-transparent hover:bg-white/5 rounded-[14px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40"
                style={{ height: 'clamp(3rem, 4vw, 3.75rem)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                {closeLabel}
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="relative w-full flex items-center justify-center gap-2 font-inter-tight font-semibold text-[15px] text-phone-bg bg-white rounded-[14px] transition-all hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                style={{ height: 'clamp(3rem, 4vw, 3.75rem)' }}
              >
                <span className="rounded-full" style={{ width: '0.5rem', height: '0.5rem', background: '#2b2b2b' }} />
                {closeLabel}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
