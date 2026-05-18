import { useScroll, useTransform, motion } from 'framer-motion'
import { scrollToNLForm } from './NLNav'
import NLLetterPreview from './NLLetterPreview'
import OwnButton from './OwnButton'

const heroBg    = '/img/newsletter/hero-bg.png'

export default function NLHero() {
  const { scrollY } = useScroll()
  // Parallax: image moves up at 30% of scroll speed; the image is oversized so no black gap appears
  const bgY = useTransform(scrollY, [0, 800], ['0%', '-12%'])

  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#010101', paddingTop: '72px' }}>

      {/* ── Background with parallax — oversized, image shifted 150px down ── */}
      <motion.div
        className="absolute pointer-events-none"
        aria-hidden
        style={{
          top: 'calc(-15% + 150px)', left: 0, right: 0, bottom: '-15%',
          y: bgY,
        }}
      >
        {/* Mobile */}
        <img src={heroBg} alt="" className="absolute max-w-none lg:hidden"
          style={{ height: '100%', left: '-188.07%', top: '16.41%', width: '476.13%' }}
          loading="eager" />
        {/* Desktop — covers full area of the motion.div */}
        <img src={heroBg} alt="" className="absolute max-w-none hidden lg:block w-full h-full object-cover"
          style={{ inset: 0 }}
          loading="eager" />
      </motion.div>

      {/* ── MOBILE (< lg) ── */}
      <div className="lg:hidden relative w-full flex flex-col items-center overflow-hidden"
        style={{ minHeight: 'calc(100svh - 72px)', padding: '40px 16px 0' }}>
        {/* Fix #1: badge→heading 1rem, heading→CTA 2rem */}
        <div className="flex flex-col items-center w-full" style={{ gap: 0 }}>
          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-full shrink-0 mb-[1rem]"
            style={{ background: 'rgba(77,186,121,0.05)', border: '1px solid rgba(77,186,121,0.15)' }}>
            <span className="badge-pulse shrink-0 block rounded-full" style={{ width: 10, height: 10, background: "#4DBA79", display: "block" }} aria-hidden />
            <p className="font-inter-tight font-medium text-white whitespace-nowrap" style={{ fontSize: 12, lineHeight: 1.3 }}>
              Axevil дайджест · еженедельно
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center w-full text-center">
            <h1 className="font-inter-tight font-semibold text-transparent bg-clip-text w-full"
              style={{ fontSize: 36, lineHeight: 1, letterSpacing: '-0.72px', backgroundImage: 'linear-gradient(103.344deg, rgb(162,162,162) 8.73%, rgb(255,255,255) 50.65%, rgb(162,162,162) 92.57%)' }}>
              Дайджест частного рынка — раз в неделю на почту
            </h1>
            <p className="font-inter-tight font-medium w-full"
              style={{ fontSize: 14, lineHeight: 1.35, color: '#9b9b9b', letterSpacing: '-0.28px' }}>
              Крупнейшие переоценки, лидеры роста и падения на secondary, тендер-оферы, новые раунды. Каждый вторник.
            </p>
          </div>
          <div className="mt-[2rem]"><OwnButton onClick={scrollToNLForm} /></div>
        </div>

        {/* Letter preview — absolute bottom, 44px out of frame */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 453 }}>
          <NLLetterPreview scale={0.864} />
        </div>
      </div>

      {/* ── DESKTOP (lg+) ── */}
      <div className="hidden lg:flex relative mx-auto w-full flex-col items-center"
        style={{
          maxWidth: 1440, minHeight: 'calc(100svh - 72px)',
          paddingTop: 40, paddingBottom: 0,
          paddingLeft: 'clamp(40px, 5.5vw, 80px)', paddingRight: 'clamp(40px, 5.5vw, 80px)',
          gap: 64,
        }}>
        {/* Heading */}
        <div className="flex flex-col items-center gap-8 w-full">
          <div className="flex items-center gap-2 px-4 py-3 rounded-full"
            style={{ background: 'rgba(77,186,121,0.05)', border: '1px solid rgba(77,186,121,0.15)' }}>
            <span className="badge-pulse shrink-0 block rounded-full" style={{ width: 10, height: 10, background: "#4DBA79", display: "block" }} aria-hidden />
            <p className="font-inter-tight font-medium text-white whitespace-nowrap" style={{ fontSize: 14, lineHeight: 1.3 }}>
              Axevil дайджест · еженедельно
            </p>
          </div>
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="font-inter-tight font-semibold text-transparent bg-clip-text"
              style={{ fontSize: 'clamp(2.5rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em', backgroundImage: 'linear-gradient(116.594deg, rgb(162,162,162) 8.73%, rgb(255,255,255) 50.65%, rgb(162,162,162) 92.57%)', maxWidth: 858 }}>
              Дайджест частного рынка — раз в неделю на почту
            </h1>
            <p className="font-inter-tight font-medium"
              style={{ fontSize: 'clamp(1rem,1.4vw,1.25rem)', lineHeight: 1.3, color: '#9b9b9b', letterSpacing: '-0.02em', maxWidth: 600 }}>
              Крупнейшие переоценки, лидеры роста и падения на secondary, тендер-оферы, новые раунды. Каждый вторник.
            </p>
          </div>
          <OwnButton onClick={scrollToNLForm} />
        </div>

        {/* Letter preview — scale=1.188 same as Methodology, absolute bottom-44 */}
        <div className="absolute bottom-[-44px] left-1/2 -translate-x-1/2">
          <NLLetterPreview scale={1.188} />
        </div>
      </div>
    </section>
  )
}
