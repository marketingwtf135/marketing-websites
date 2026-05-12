declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

function push(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

export const analytics = {
  scrollDepth: (pct: 25 | 50 | 75 | 100) => push(`scroll_${pct}`),
  formView:   () => push('form_view'),
  formStart:  () => push('form_start'),
  formSubmit: (params?: Record<string, unknown>) => push('form_submit', params),
  formError:  (field: string) => push('form_error', { field }),
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
