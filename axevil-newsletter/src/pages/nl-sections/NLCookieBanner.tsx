import { useEffect, useState } from 'react'
import { asset } from '../../lib/asset'

const STORAGE_KEY = 'nl_cookie_consent'

/**
 * Cookie-баннер с обновлением Consent Mode v2 (ТЗ, п.8 «GDPR: Cookie banner + Consent
 * Mode v2»).
 *
 * Сделан по образцу баннера лендинга вебинара (`axevil-webinar/.../WBCookieBanner.tsx`) по
 * указанию Павла (2026-08-04) — «мы уже делали куки для основного сайта, посмотри как
 * реализовано и сделай так же»: тот же ключ выбора в localStorage, тот же набор
 * consent-флагов. Отличия два, оба намеренные:
 *
 * 1. Ссылка на политику ведёт на реальную страницу — в вебинаре там остался `href="#"`.
 * 2. Стили на токенах этого проекта, без классов дизайн-системы вебинара
 *    (`--surface-0`, `text-s-med`), которых здесь нет.
 *
 * ⚠️ Чего этот компонент НЕ делает: не выставляет начальное состояние
 * `gtag('consent', 'default', { … 'denied' })`. По GDPR оно должно стоять в `index.html`
 * ДО загрузки GTM, иначе аналитика успевает отработать без согласия. Сейчас на этом
 * лендинге GTM-контейнера нет вообще, поэтому `gtag` не существует и обновлять нечего:
 * баннер просто запоминает выбор. Начальное состояние надо добавить одним куском вместе с
 * контейнером — какой именно контейнер ставить, спрошено у Павла 2026-08-04.
 */
export default function NLCookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      // приватный режим — баннер не показываем, выбор всё равно негде запомнить
    }
  }, [])

  function remember(choice: 'accepted' | 'declined') {
    try {
      localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      // не смогли запомнить — баннер вернётся при следующем заходе, это допустимо
    }
    setVisible(false)
  }

  function accept() {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
    gtag?.('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    })
    remember('accepted')
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[60] sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-[25rem]"
      role="dialog"
      aria-label="Согласие на использование cookie"
      style={{
        background: 'var(--black-300)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '1rem 1rem 0 0',
        padding: '1.25rem',
      }}
    >
      <p
        className="font-inter-tight font-medium mb-4"
        style={{ fontSize: 'var(--font-xs)', lineHeight: 1.5, color: 'var(--white-300)', letterSpacing: '-0.01em' }}
      >
        Мы используем cookie для аналитики и корректной работы сайта. Нажимая «Принять», вы соглашаетесь с{' '}
        <a
          href={asset('/legal/ru/cookies.html')}
          className="underline underline-offset-2 transition-colors hover:text-white"
          style={{ color: 'rgba(255,255,255,0.8)' }}
        >
          Политикой cookie
        </a>
        .
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={accept}
          className="flex-1 rounded-[0.625rem] font-inter-tight font-semibold transition-transform hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          style={{ height: '2.5rem', fontSize: 'var(--font-xs)', background: 'var(--white-100)', color: '#202020' }}
        >
          Принять
        </button>
        <button
          type="button"
          onClick={() => remember('declined')}
          className="flex-1 rounded-[0.625rem] font-inter-tight font-medium transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          style={{
            height: '2.5rem',
            fontSize: 'var(--font-xs)',
            color: 'var(--white-400)',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          Отклонить
        </button>
      </div>
    </div>
  )
}
