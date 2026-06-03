/**
 * Standalone phone-input "island" for the static /webinar/2026-06-09 page.
 *
 * It reuses the EXACT same react-international-phone widget + libphonenumber-js
 * validation as the June 4 React landing, then exposes a small imperative API on
 * `window.RIPhone` and mirrors its value into two hidden inputs (#rf-phone,
 * #rf-country) so the static page's vanilla form script can read it.
 *
 * Built separately via `vite.phone.config.ts` into public/vendor/ (committed),
 * so it ships through the normal `vite build` (public/ → dist/) without touching
 * the June 4 build.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  PhoneInput,
  defaultCountries,
  getActiveFormattingMask,
  getCountry,
  type CountryIso2,
  type PhoneInputRefType,
} from 'react-international-phone'
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js'
import 'react-international-phone/style.css'
import './prometheus-phone.css'

const DEFAULT_COUNTRY: CountryIso2 = 'ru'
const PREFERRED_COUNTRIES: CountryIso2[] = ['ru', 'kz', 'by', 'ua', 'de', 'gb', 'us']
const IP_GEO_ENDPOINT = 'https://speed.cloudflare.com/meta'
const IP_GEO_TIMEOUT_MS = 3000
const IP_GEO_CACHE_KEY = 'axevil:webinar:geo-country:v1'
const IP_GEO_CACHE_TTL_MS = 24 * 60 * 60 * 1000

export interface PhoneApi {
  ready: boolean
  /** Formatted value as react-international-phone produces it (same as June 4 `form.phone`), or '' when empty. */
  value: () => string
  /** Selected country iso2, e.g. 'ru'. */
  iso2: () => string
  /** libphonenumber-js validity for the current value. */
  isValid: () => boolean
  /** True when there are no subscriber digits beyond the dial code. */
  isEmpty: () => boolean
  /** E.164 digits without '+' for the Telegram deep-link (mirrors June 4 getTelegramPhoneToken). */
  tokenDigits: () => string
  /** Toggle the red error border. */
  setError: (v: boolean) => void
  /** Reset to the (detected) default country and clear input. */
  reset: () => void
}

declare global {
  interface Window {
    RIPhone?: PhoneApi
  }
}

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
  if (digits.length <= dialCodeLength) return ''
  try {
    const parsed = parsePhoneNumber(phone)
    if (parsed?.isValid()) return parsed.number.replace('+', '')
  } catch {
    // keep digits fallback for partially formatted numbers
  }
  return digits
}

function resolveSupportedCountry(iso2Maybe: string | undefined) {
  const iso2 = iso2Maybe?.toLowerCase() as CountryIso2 | undefined
  if (!iso2) return undefined
  return getCountry({ field: 'iso2', value: iso2, countries: defaultCountries })
}

function PrometheusPhoneField() {
  const [phoneDefaultCountry, setPhoneDefaultCountry] = useState<CountryIso2>(DEFAULT_COUNTRY)
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState<CountryIso2>(DEFAULT_COUNTRY)
  const [showError, setShowError] = useState(false)
  const phoneInputRef = useRef<PhoneInputRefType>(null)
  const hasPhoneInteractionRef = useRef(false)
  // Set on real user input so the hidden-input 'input' event (which drives the
  // static form's form_start + live validation) does NOT fire on mount or during
  // programmatic country detection / reset.
  const userChangeRef = useRef(false)

  // Latest values mirror for the imperative API (registered once on mount).
  const stateRef = useRef({ phone, country, defaultCountry: phoneDefaultCountry })
  stateRef.current = { phone, country, defaultCountry: phoneDefaultCountry }

  // IP-based default-country detection — identical to the June 4 landing.
  useEffect(() => {
    let cancelled = false

    function applyDetectedCountry(iso2Maybe: string | undefined) {
      const detectedCountry = resolveSupportedCountry(iso2Maybe)
      if (!detectedCountry || cancelled) return
      setPhoneDefaultCountry(detectedCountry.iso2)
      if (!hasPhoneInteractionRef.current) {
        setCountry(prev => (prev === DEFAULT_COUNTRY && stateRef.current.phone.trim() === '' ? detectedCountry.iso2 : prev))
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
        // ignore cache write errors
      }
    }

    async function detectCountryByIp() {
      const cached = readCachedCountryCode()
      if (cached) {
        applyDetectedCountry(cached)
        return
      }
      const controller = new AbortController()
      const timeoutId = window.setTimeout(() => controller.abort(), IP_GEO_TIMEOUT_MS)
      try {
        const response = await fetch(IP_GEO_ENDPOINT, { signal: controller.signal })
        if (!response.ok) return
        const data = (await response.json()) as { country?: string }
        if (!data.country || !resolveSupportedCountry(data.country)) return
        saveCachedCountryCode(data.country)
        applyDetectedCountry(data.country)
      } catch {
        // keep fallback default country (RU)
      } finally {
        window.clearTimeout(timeoutId)
      }
    }

    detectCountryByIp()
    return () => {
      cancelled = true
    }
  }, [])

  const selectedPhoneCountry = useMemo(
    () => getCountry({ field: 'iso2', value: country, countries: defaultCountries }),
    [country],
  )

  const phoneMaskPlaceholder = useMemo(() => {
    if (!selectedPhoneCountry) return ''
    const mask = getActiveFormattingMask({ phone: '', country: selectedPhoneCountry, defaultMask: '............' })
    const numericMask = mask.replace(/\./g, '0')
    return `+${selectedPhoneCountry.dialCode} ${numericMask}`.trim()
  }, [selectedPhoneCountry])

  // Mirror the value into the hidden inputs the static form reads, and notify it
  // (bubbling 'input' event) so form_start + live error-clearing keep working.
  useEffect(() => {
    const hiddenPhone = document.getElementById('rf-phone') as HTMLInputElement | null
    const hiddenCountry = document.getElementById('rf-country') as HTMLInputElement | null
    const empty = !hasSubscriberDigits(phone, country)
    if (hiddenPhone) {
      hiddenPhone.value = empty ? '' : phone
      if (userChangeRef.current) hiddenPhone.dispatchEvent(new Event('input', { bubbles: true }))
    }
    if (hiddenCountry) hiddenCountry.value = country
    userChangeRef.current = false
  }, [phone, country])

  // Register the imperative API once; methods read the latest values via stateRef.
  useEffect(() => {
    const api: PhoneApi = {
      ready: true,
      value: () => (hasSubscriberDigits(stateRef.current.phone, stateRef.current.country) ? stateRef.current.phone : ''),
      iso2: () => stateRef.current.country,
      isValid: () =>
        hasSubscriberDigits(stateRef.current.phone, stateRef.current.country) && isValidPhoneNumber(stateRef.current.phone),
      isEmpty: () => !hasSubscriberDigits(stateRef.current.phone, stateRef.current.country),
      tokenDigits: () => getTelegramPhoneToken(stateRef.current.phone, stateRef.current.country),
      setError: (v: boolean) => setShowError(v),
      reset: () => {
        const target = stateRef.current.defaultCountry
        hasPhoneInteractionRef.current = false
        setShowError(false)
        setPhone('')
        setCountry(target)
        phoneInputRef.current?.setCountry(target, { focusOnInput: false })
      },
    }
    window.RIPhone = api
    window.dispatchEvent(new Event('riphone:ready'))
    return () => {
      if (window.RIPhone === api) delete window.RIPhone
    }
  }, [])

  return (
    <PhoneInput
      ref={phoneInputRef}
      defaultCountry={phoneDefaultCountry}
      preferredCountries={PREFERRED_COUNTRIES}
      value={phone}
      disableDialCodePrefill
      onChange={(value, meta) => {
        hasPhoneInteractionRef.current = true
        userChangeRef.current = true
        setPhone(value)
        setCountry(meta.country.iso2)
      }}
      inputClassName={`wb-form-phone-input ${showError ? 'wb-form-phone-input-error' : ''}`}
      className={`wb-form-phone ${showError ? 'wb-form-phone-error' : ''}`}
      countrySelectorStyleProps={{
        buttonClassName: 'wb-form-phone-country-btn',
        dropdownStyleProps: { className: 'wb-form-phone-country-dropdown' },
      }}
      placeholder={phoneMaskPlaceholder || 'Телефон'}
      inputProps={{
        name: 'phone_display',
        autoComplete: 'tel',
        inputMode: 'tel',
        enterKeyHint: 'send',
        'aria-label': 'Телефон',
      }}
    />
  )
}

const mountEl = document.getElementById('rf-phone-mount')
if (mountEl) {
  createRoot(mountEl).render(<PrometheusPhoneField />)
}
