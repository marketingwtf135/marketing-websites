declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

/**
 * dataLayer event contract — shared verbatim with the newsletter landing
 * (`axevil-newsletter/src/lib/analytics.ts`), only `PAGE` differs. Both files must stay
 * identical so one GTM container and one A/B report can read either landing without a
 * per-page mapping (client feedback 2026-07-23: "аналитика на оба ленда: клик hero,
 * submit формы, скролл до финала, время до конверсии. Без этого A/B не запустим").
 *
 * Events:
 *   page_view          — once per load, carries `page`
 *   cta_click          — any CTA press, carries `location` (hero / nav / preview / …)
 *   form_view          — a form scrolled into view
 *   form_start         — first keystroke in a form
 *   form_submit        — validated submit, carries `time_to_conversion_sec`
 *   form_error         — per invalid field
 *   scroll_25/50/75/100
 *   final_section_view — the closing download block reached
 */

/** Page landing timestamp — the zero point for time-to-conversion. */
const LOADED_AT = Date.now()

/** Which landing this build is. Kept explicit so the two pages never collide in GTM. */
const PAGE = 'pdf_insider'

function push(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, page: PAGE, ...params })
}

/** Seconds since load, one decimal — the "время до конверсии" metric. */
export function secondsSinceLoad() {
  return Math.round((Date.now() - LOADED_AT) / 100) / 10
}

export const analytics = {
  pageView:   () => push('page_view'),
  ctaClick:   (location: string) => push('cta_click', { location }),
  scrollDepth: (pct: 25 | 50 | 75 | 100) => push(`scroll_${pct}`),
  finalReached: () => push('final_section_view', { time_on_page_sec: secondsSinceLoad() }),
  formView:   (location = 'final') => push('form_view', { location }),
  formStart:  (location = 'final') => push('form_start', { location, time_to_start_sec: secondsSinceLoad() }),
  formSubmit: (params?: Record<string, unknown>) =>
    push('form_submit', { location: 'final', ...params, time_to_conversion_sec: secondsSinceLoad() }),
  formError:  (field: string, location = 'final') => push('form_error', { field, location }),
}

export function initScrollDepth() {
  if (typeof window === 'undefined') return
  const fired = new Set<number>()
  const thresholds = [25, 50, 75, 100] as const

  function onScroll() {
    const scrolled = window.scrollY + window.innerHeight
    const total = document.documentElement.scrollHeight
    const pct = Math.floor((scrolled / total) * 100)
    for (const t of thresholds) {
      if (!fired.has(t) && pct >= t) {
        fired.add(t)
        analytics.scrollDepth(t)
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}
