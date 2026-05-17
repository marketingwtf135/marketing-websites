import { useEffect } from 'react'
import FadeIn from '../components/FadeIn'
import WBNav from './wb-sections/WBNav'
import WBHero from './wb-sections/WBHero'
import WBWhoFor from './wb-sections/WBWhoFor'
import WBWhyAttend from './wb-sections/WBWhyAttend'
import WBWhatCover from './wb-sections/WBWhatCover'
import WBSpeaker from './wb-sections/WBSpeaker'
import WBSchedule from './wb-sections/WBSchedule'
import WBSocialProof from './wb-sections/WBSocialProof'
import WBForm from './wb-sections/WBForm'
import WBFooter from './wb-sections/WBFooter'
import WBCookieBanner from './wb-sections/WBCookieBanner'
import { initScrollDepth } from '../lib/analytics'

export default function Webinar() {
  useEffect(() => {
    return initScrollDepth()
  }, [])

  return (
    <div className="bg-page-bg overflow-x-clip">
      <WBNav />
      <div style={{ height: 64 }} />
      <WBHero />
      <FadeIn><WBWhoFor /></FadeIn>
      <FadeIn><WBWhyAttend /></FadeIn>
      <FadeIn><WBWhatCover /></FadeIn>
      <FadeIn><WBSpeaker /></FadeIn>
      <FadeIn><WBSchedule /></FadeIn>
      <FadeIn><WBSocialProof /></FadeIn>
      <WBForm />
      <WBFooter />
      <WBCookieBanner />
    </div>
  )
}
