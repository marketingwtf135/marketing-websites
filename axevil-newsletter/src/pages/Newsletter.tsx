import { useEffect } from 'react'
import FadeIn from '../components/FadeIn'
import { analytics, initScrollDepth } from '../lib/analytics'
import { initGeoCountry } from '../lib/geo'
import NLNav from './nl-sections/NLNav'
import NLHero from './nl-sections/NLHero'
import NLAudience from './nl-sections/NLAudience'
import NLContents from './nl-sections/NLContents'
import NLMethodology from './nl-sections/NLMethodology'
import NLReasons from './nl-sections/NLReasons'
import NLSteps from './nl-sections/NLSteps'
import NLFaq from './nl-sections/NLFaq'
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
      <FadeIn><NLMethodology /></FadeIn>
      <FadeIn><NLReasons /></FadeIn>
      <FadeIn><NLSteps /></FadeIn>
      <FadeIn><NLFaq /></FadeIn>
      <FadeIn><NLAbout /></FadeIn>
      <NLForm />
      <NLFooter />
      <NLCookieBanner />
    </main>
  )
}
