import { FadeIn, Footer } from '@axevil/design-system/components'
import AboutNav from './about-sections/AboutNav'
import AboutHero from './about-sections/AboutHero'
import TrustStrip from './about-sections/TrustStrip'
import ThesisRows from './about-sections/ThesisRows'
import PortfolioSectors from './about-sections/PortfolioSectors'
import ExitsGrid from './about-sections/ExitsGrid'
import WhyPillars from './about-sections/WhyPillars'
import LegalInfra from './about-sections/LegalInfra'
import FoundersLetter from './about-sections/FoundersLetter'
import FinalCta from './about-sections/FinalCta'

export default function About() {
  return (
    <main className="overflow-x-clip bg-page-bg">
      <AboutNav />
      <AboutHero />
      <FadeIn><TrustStrip /></FadeIn>
      <FadeIn><ThesisRows /></FadeIn>
      <FadeIn><PortfolioSectors /></FadeIn>
      <FadeIn><ExitsGrid /></FadeIn>
      <FadeIn><WhyPillars /></FadeIn>
      <FadeIn><LegalInfra /></FadeIn>
      <FadeIn><FoundersLetter /></FadeIn>
      <FinalCta />
      <Footer />
    </main>
  )
}
