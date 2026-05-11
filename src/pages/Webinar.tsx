import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import WBNav from './wb-sections/WBNav'
import WBHero from './wb-sections/WBHero'
import WBWhoFor from './wb-sections/WBWhoFor'
import WBWhyAxevil from './wb-sections/WBWhyAxevil'
import WBWhyAttend from './wb-sections/WBWhyAttend'
import WBWhatCover from './wb-sections/WBWhatCover'
import WBSpeaker from './wb-sections/WBSpeaker'
import WBSchedule from './wb-sections/WBSchedule'
import WBForm from './wb-sections/WBForm'
import WBFooter from './wb-sections/WBFooter'
import WBCookieBanner from './wb-sections/WBCookieBanner'
import { initScrollDepth } from '../lib/analytics'

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    setMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return mobile
}

/** Reusable hook for rolling-cover animation.
 *  Returns { radius: 16→64, scale: 0.7→1 } driven by the ref's scroll progress.
 */
function useRollingCover(ref: React.RefObject<HTMLDivElement | null>) {
  const prefersReduced = useReducedMotion()
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 1', 'start 0.4'],
  })
  const animRadius = useTransform(scrollYProgress, [0, 1], [16, 64])
  const animScale  = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  if (prefersReduced || isMobile) {
    // On mobile/reduced motion: flat, no scale transform
    return {
      radius: animRadius,  // keep radius but set scale to static 1
      scale: 1 as unknown as ReturnType<typeof useTransform>,
    }
  }
  return { radius: animRadius, scale: animScale }
}

export default function Webinar() {
  useEffect(() => { return initScrollDepth() }, [])

  // Rolling cover 1: WBWhyAxevil ~ WBSchedule rolls over sticky WBWhoFor
  const cover1Ref = useRef<HTMLDivElement>(null)
  const { radius: radius1, scale: scale1 } = useRollingCover(cover1Ref)

  // Rolling cover 2: WBForm rolls over sticky WBSchedule
  const cover2Ref = useRef<HTMLDivElement>(null)
  const { radius: radius2, scale: scale2 } = useRollingCover(cover2Ref)

  return (
    <div style={{ background: '#080808' }} className="overflow-x-clip">
      <WBNav />
      <div style={{ height: '4rem' }} />
      <WBHero />

      {/* ── Layer 1 ─────────────────────────────────────────────
          WBWhoFor: STICKY base — stays in place while cover1 rolls over it */}
      <div className="sm:sticky" style={{ top: 240, zIndex: 0 }}>
        <FadeIn><WBWhoFor /></FadeIn>
      </div>

      {/* ── Rolling cover 1 (WBWhyAxevil → WBSchedule) ──────────
          Scales 0.7→1, border-radius 16→64, overlays WBWhoFor */}
      <motion.div
        ref={cover1Ref}
        className="relative"
        style={{
          zIndex: 10,
          background: '#080808',
          borderTopLeftRadius: radius1,
          borderTopRightRadius: radius1,
          scale: scale1,
          transformOrigin: 'top center',
        }}
      >
        <FadeIn><WBWhyAxevil /></FadeIn>
        <FadeIn><WBWhyAttend /></FadeIn>
        <FadeIn><WBWhatCover /></FadeIn>
        <FadeIn><WBSpeaker /></FadeIn>

        {/* ── Layer 2 ─────────────────────────────────────────────
            WBSchedule: STICKY base — stays in place while cover2 rolls over it */}
        <div style={{ position: 'sticky', top: 64, zIndex: 0 }}>
          <FadeIn><WBSchedule /></FadeIn>
        </div>

        {/* ── Rolling cover 2 (WBForm) ─────────────────────────────
            Scales 0.7→1, border-radius 16→64, overlays WBSchedule */}
        <motion.div
          ref={cover2Ref}
          className="relative"
          style={{
            zIndex: 20,
            background: '#080808',
            borderTopLeftRadius: radius2,
            borderTopRightRadius: radius2,
            scale: scale2,
            transformOrigin: 'top center',
          }}
        >
          <WBForm />
          <WBFooter />
        </motion.div>
      </motion.div>

      <WBCookieBanner />
    </div>
  )
}
