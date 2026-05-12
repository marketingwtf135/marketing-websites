export interface UtmParams {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
}

export function getUtmParams(): UtmParams {
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source:   p.get('utm_source')   ?? '',
    utm_medium:   p.get('utm_medium')   ?? '',
    utm_campaign: p.get('utm_campaign') ?? '',
    utm_content:  p.get('utm_content')  ?? '',
    utm_term:     p.get('utm_term')     ?? '',
  }
}
