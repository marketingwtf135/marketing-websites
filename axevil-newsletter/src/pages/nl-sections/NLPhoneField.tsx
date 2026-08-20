import { useEffect, useState } from 'react'
import {
  CountrySelector,
  FlagImage,
  defaultCountries,
  usePhoneInput,
  type CountryIso2,
} from 'react-international-phone'
import 'react-international-phone/style.css'
import { getCountryCode, initGeoCountry } from '../../lib/geo'

/**
 * Поле телефона с выбором страны — как на лендинге Pre-IPO Insider
 * (axevil.com/promo/pdf-report), чтобы формы двух лендингов выглядели одинаково.
 *
 * Взята та же библиотека и те же примитивы, что там (CountrySelector + FlagImage +
 * usePhoneInput), но разметка своя: у того проекта своя дизайн-система с классами вроде
 * `border-input` и `bg-background`, которых здесь нет. Переменные темы указывают на наши
 * токены напрямую.
 *
 * Страна по умолчанию берётся из общего определителя `lib/geo` — он уже определяет страну
 * по IP для скрытого поля формы. Второй запрос ради флага не нужен: в оригинале для этого
 * ходили в cloudflare отдельно.
 *
 * Высота берётся из CSS-переменной --nl-field-h, а не импортируется из формы: раньше
 * NLLeadForm импортировал это поле, а поле — константу из NLLeadForm, и круговой импорт
 * ронял страницу с «Cannot access before initialization».
 *
 * Библиотека добавляет к бандлу около 26 КБ. Проверено замером: без неё сборка 329 КБ,
 * с ней 355 КБ.
 */
const FALLBACK_COUNTRY: CountryIso2 = 'ru'
const PREFERRED: CountryIso2[] = ['ru', 'us', 'gb', 'de', 'ae', 'ch']

/** Переменные библиотеки — на наши цвета, чтобы список стран не выпадал белым окном. */
const THEME: React.CSSProperties = {
  '--react-international-phone-height': 'var(--nl-field-h)',
  '--react-international-phone-font-size': '1rem',
  '--react-international-phone-border-radius': '1rem',
  '--react-international-phone-flag-width': '1.25rem',
  '--react-international-phone-flag-height': '1.25rem',
  '--react-international-phone-dropdown-item-background-color': 'var(--black-400)',
  '--react-international-phone-dropdown-item-text-color': '#ffffff',
  '--react-international-phone-dropdown-item-dial-code-color': 'var(--white-400)',
  '--react-international-phone-selected-dropdown-item-background-color': 'var(--black-600)',
  '--react-international-phone-selected-dropdown-item-text-color': '#ffffff',
  '--react-international-phone-dropdown-shadow': '0 24px 48px -18px rgba(0,0,0,0.85)',
} as React.CSSProperties

interface Props {
  value: string
  onChange: (phone: string) => void
  invalid?: boolean
  /** Высота и фон берутся из формы, чтобы поле совпадало с соседними. */
  fieldStyle: React.CSSProperties
}

export default function NLPhoneField({ value, onChange, invalid, fieldStyle }: Props) {
  const [country, setCountry] = useState<CountryIso2>(
    (getCountryCode()?.toLowerCase() as CountryIso2) || FALLBACK_COUNTRY,
  )

  // страна могла ещё не определиться к моменту первого рендера
  useEffect(() => {
    let alive = true
    initGeoCountry().then(code => {
      if (alive && code) setCountry(prev => (prev === FALLBACK_COUNTRY ? (code.toLowerCase() as CountryIso2) : prev))
    })
    return () => { alive = false }
  }, [])

  const phone = usePhoneInput({
    defaultCountry: country,
    value,
    countries: defaultCountries,
    // Код страны показывает селектор, поэтому в самом поле его дублировать не надо.
    // Без этого библиотека кладёт «+7» прямо в значение, и подсказка «Телефон» не видна.
    disableDialCodeAndPrefix: true,
    onChange: data => onChange(data.phone),
  })

  const border = invalid ? 'rgba(239,68,68,0.5)' : 'transparent'

  return (
    <div className="flex w-full" style={THEME}>
      <CountrySelector
        selectedCountry={phone.country.iso2}
        onSelect={c => { setCountry(c.iso2); phone.setCountry(c.iso2) }}
        countries={defaultCountries}
        preferredCountries={PREFERRED}
        className="shrink-0"
        renderButtonWrapper={({ rootProps }) => (
          <button
            {...rootProps}
            type="button"
            className="flex shrink-0 items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            style={{
              ...fieldStyle,
              width: 'auto',
              paddingRight: '0.625rem',
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderColor: border,
            }}
          >
            <FlagImage iso2={phone.country.iso2} style={{ width: '1.25rem', height: '1.25rem', borderRadius: '999px' }} />
            <span style={{ color: 'var(--white-300)', fontVariantNumeric: 'tabular-nums' }}>+{phone.country.dialCode}</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: 'var(--white-400)' }} />
            </svg>
          </button>
        )}
        dropdownStyleProps={{ className: 'nl-phone-dropdown' }}
      />

      <input
        ref={phone.inputRef}
        type="tel" inputMode="tel" autoComplete="tel" dir="ltr"
        value={phone.inputValue}
        onChange={phone.handlePhoneValueChange}
        placeholder="Телефон (необязательно)"
        aria-label="Телефон, необязательно"
        aria-invalid={invalid}
        className="placeholder:text-[rgba(255,255,255,0.35)] min-w-0 flex-1"
        style={{
          ...fieldStyle,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          borderColor: border,
        }}
      />
    </div>
  )
}
