import { useEffect } from 'react'
import FadeIn from '../components/FadeIn'
import { analytics, initScrollDepth } from '../lib/analytics'
import NLNav from './nl-sections/NLNav'
import NLHero from './nl-sections/NLHero'
import NLAudience from './nl-sections/NLAudience'
import NLContents from './nl-sections/NLContents'
import NLMethodology from './nl-sections/NLMethodology'
import NLReasons from './nl-sections/NLReasons'
import NLSteps from './nl-sections/NLSteps'
import NLAbout from './nl-sections/NLAbout'
import NLForm from './nl-sections/NLForm'
import NLFooter from './nl-sections/NLFooter'

export default function Newsletter() {
  useEffect(() => {
    analytics.pageView()
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
      <FadeIn><NLAbout /></FadeIn>
      <NLForm />
      <NLFooter />
    </main>
  )
}
