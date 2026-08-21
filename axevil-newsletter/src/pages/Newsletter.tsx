import { useEffect } from 'react'
import FadeIn from '../components/FadeIn'
import { analytics, initScrollDepth } from '../lib/analytics'
import { initGeoCountry } from '../lib/geo'
import NLNav from './nl-sections/NLNav'
import NLHero from './nl-sections/NLHero'
import NLAudience from './nl-sections/NLAudience'
import NLContents from './nl-sections/NLContents'
import NLReasons from './nl-sections/NLReasons'
import NLAbout from './nl-sections/NLAbout'
import NLForm from './nl-sections/NLForm'
import NLFooter from './nl-sections/NLFooter'
import NLCookieBanner from './nl-sections/NLCookieBanner'

export default function Newsletter() {
  useEffect(() => {
    analytics.pageView()
    // Страна по IP — скрытое поле формы (ТЗ, Блок 8). Определяем один раз на загрузке,
    // чтобы submit не ждал сети; ошибка запроса подписку не блокирует.
    void initGeoCountry()
    return initScrollDepth()
  }, [])

  return (
    <main className="overflow-x-clip" style={{ background: 'var(--nav-bg)' }}>
      <NLNav />
      <NLHero />
      <FadeIn><NLAudience /></FadeIn>
      <FadeIn><NLContents /></FadeIn>
      {/* Блок «Так выглядит один выпуск» временно снят со страницы (Татьяна, 2026-08-21).
          Код секции, компонент планшета и его рамка оставлены в проекте — вернуть можно
          одной строкой: импорт NLMethodology и <FadeIn><NLMethodology /></FadeIn> здесь,
          плюс пункт «Пример выпуска» в меню и сдвиг нумерации разделов обратно. */}
      <FadeIn><NLReasons /></FadeIn>
      {/* «3 шага до первого выпуска» и «Частые вопросы» временно сняты (Татьяна,
          2026-08-21) — как и «Так выглядит один выпуск» выше. Код обеих секций на месте,
          вернуть можно импортом NLSteps / NLFaq и строкой здесь; заодно понадобится
          вернуть пункт «Как это работает» в меню и сдвинуть нумерацию разделов. */}
      <FadeIn><NLAbout /></FadeIn>
      <NLForm />
      <NLFooter />
      <NLCookieBanner />
    </main>
  )
}
