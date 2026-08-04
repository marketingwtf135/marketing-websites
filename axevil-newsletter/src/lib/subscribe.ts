import { getCountryCode } from './geo'
import { getUtmParams } from './useUtm'

/**
 * One subscription endpoint for the whole landing.
 *
 * The page now asks for an address in three places — the hero lead form, the CTA beside
 * the issue preview, and the closing block — and every one of them has to land in the
 * same list with the same shape. Keeping the URL and the POST in one module means
 * wiring the real endpoint is a one-line change, not a hunt through the sections.
 */
export const NEWSLETTER_WEBHOOK = 'https://your-webhook-url.com/newsletter' // TODO: replace

export interface SubscribePayload {
  email: string
  /** Where on the page the address was given — hero / preview / final. */
  source: string
  phone?: string
  name?: string
  position?: string
  company?: string
  aum?: string
  /** ISO-код страны по IP — подставляется автоматически, посетитель его не вводит. */
  country?: string
}

/**
 * Fire-and-forget POST with a 5s abort. Resolves `false` when the request failed so the
 * caller can log it; the caller still shows success — a placeholder webhook must not
 * read to the visitor as "your subscription broke".
 */
export async function submitSubscription(payload: SubscribePayload): Promise<boolean> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 5000)
  try {
    await fetch(NEWSLETTER_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // Страна ставится здесь, а не в каждой форме: точек входа три, и все три
        // должны приезжать в список одинаковыми.
        country: getCountryCode(),
        ...payload,
        ...getUtmParams(),
        page: 'newsletter',
        ts: new Date().toISOString(),
      }),
      signal: controller.signal,
    })
    return true
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}
