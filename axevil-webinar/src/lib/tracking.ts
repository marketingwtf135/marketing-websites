type NullableString = string | null

const COOKIE_DAYS = 90
const GOOGLE_KEYS = ['gclid', 'gbraid', 'wbraid'] as const
type GoogleKey = (typeof GOOGLE_KEYS)[number]

const googleCookieName = (key: GoogleKey) => `_ax_${key}`

function getCookie(name: string): NullableString {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`)
  )
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return
  const exp = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Lax`
}

function readUrlParam(name: string): NullableString {
  if (typeof window === 'undefined') return null
  try {
    return new URLSearchParams(window.location.search).get(name)
  } catch {
    return null
  }
}

/**
 * Capture and persist click IDs on first visit.
 * Safe and idempotent: never overwrites existing cookies.
 */
export function captureTrackingContextOnLoad(): void {
  try {
    for (const key of GOOGLE_KEYS) {
      const value = readUrlParam(key)
      if (!value) continue
      if (getCookie(googleCookieName(key))) continue
      setCookie(googleCookieName(key), value, COOKIE_DAYS)
    }

    const fbclid = readUrlParam('fbclid')
    if (fbclid && !getCookie('_fbc')) {
      setCookie('_fbc', `fb.1.${Date.now()}.${fbclid}`, COOKIE_DAYS)
    }
  } catch (error) {
    console.warn('[tracking] captureTrackingContextOnLoad failed:', error)
  }
}

export interface TrackingContext {
  gclid: NullableString
  gbraid: NullableString
  wbraid: NullableString
  fbclid: NullableString
  fbc: NullableString
  fbp: NullableString
  page_url: NullableString
  page_path: NullableString
  referrer: NullableString
  user_agent: NullableString
}

export function getTrackingContext(): TrackingContext {
  const gclid = readUrlParam('gclid') ?? getCookie(googleCookieName('gclid'))
  const gbraid = readUrlParam('gbraid') ?? getCookie(googleCookieName('gbraid'))
  const wbraid = readUrlParam('wbraid') ?? getCookie(googleCookieName('wbraid'))
  const fbclid = readUrlParam('fbclid')

  return {
    gclid,
    gbraid,
    wbraid,
    fbclid,
    fbc: getCookie('_fbc'),
    fbp: getCookie('_fbp'),
    page_url: typeof window !== 'undefined' ? window.location.href : null,
    page_path: typeof window !== 'undefined' ? window.location.pathname : null,
    referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
  }
}
