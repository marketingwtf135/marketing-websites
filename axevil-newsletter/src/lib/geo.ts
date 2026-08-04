/**
 * Страна подписчика по IP — скрытое автозаполняемое поле формы (ТЗ, Блок 8).
 *
 * Тот же эндпоинт и та же логика кэша, что в `axevil-webinar`
 * (`WBRegistrationForm.tsx`) — не заводим второй способ определять страну в одном
 * маркетинговом репозитории.
 *
 * Запрос уходит один раз при загрузке страницы, а не в момент submit: иначе каждая
 * отправка формы ждала бы сетевой ответ. Если запрос не удался или ещё не вернулся,
 * `getCountryCode()` отдаёт `undefined`, и подписка просто уезжает без страны —
 * заявку это не блокирует.
 */
const IP_GEO_ENDPOINT = 'https://speed.cloudflare.com/meta'
const IP_GEO_TIMEOUT_MS = 3000
const IP_GEO_CACHE_KEY = 'axevil:newsletter:geo-country:v1'
const IP_GEO_CACHE_TTL_MS = 24 * 60 * 60 * 1000

let countryCode: string | undefined

/** ISO-код страны (например `AE`), если он уже известен. */
export function getCountryCode(): string | undefined {
  return countryCode
}

function readCache(): string | undefined {
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

function writeCache(code: string) {
  try {
    localStorage.setItem(IP_GEO_CACHE_KEY, JSON.stringify({ countryCode: code, cachedAt: Date.now() }))
  } catch {
    // приватный режим / переполненное хранилище — не повод ломать страницу
  }
}

/**
 * Запускает определение страны. Вызывается один раз из `Newsletter.tsx`.
 * Возвращает промис с кодом, чтобы форма могла подписаться на результат.
 */
export async function initGeoCountry(): Promise<string | undefined> {
  const cached = readCache()
  if (cached) {
    countryCode = cached
    return cached
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), IP_GEO_TIMEOUT_MS)
  try {
    const response = await fetch(IP_GEO_ENDPOINT, { signal: controller.signal })
    if (!response.ok) return undefined
    const data = await response.json() as { country?: string }
    if (!data.country) return undefined
    countryCode = data.country
    writeCache(data.country)
    return data.country
  } catch {
    return undefined
  } finally {
    clearTimeout(timer)
  }
}
