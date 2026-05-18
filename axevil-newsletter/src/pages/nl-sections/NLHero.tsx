import { useScroll, useTransform, motion } from 'framer-motion'
import { scrollToNLForm } from './NLNav'
import NLLetterPreview from './NLLetterPreview'
import OwnButton from './OwnButton'

const heroBg = '/img/newsletter/hero-bg.png'

/** Reusable fade-up config for staggered hero elements */
function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] as const },
  }
}

export default function NLHero() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], ['0%', '-12%'])

  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#010101', paddingTop: '72px' }}>

      {/* ── Background stone — outer wrapper animates entry, inner handles parallax ── */}
      <motion.div
        className="absolute pointer-events-none"
        aria-hidden
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{ top: 'calc(-15% + 150px)', left: 0, right: 0, bottom: '-15%' }}
      >
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          {/* Mobile */}
          <img src={heroBg} alt="" className="absolute max-w-none lg:hidden"
            style={{ height: '100%', left: '-188.07%', top: '16.41%', width: '476.13%' }}
            loading="eager" />
          {/* Desktop */}
          <img src={heroBg} alt="" className="absolute max-w-none hidden lg:block w-full h-full object-cover"
            style={{ inset: 0 }}
            loading="eager" />
        </motion.div>
      </motion.div>

      {/* ── MOBILE (< lg) ── */}
      <div className="lg:hidden relative w-full flex flex-col items-center overflow-hidden"
        style={{ minHeight: 'calc(100svh - 72px)', padding: '40px 16px 0' }}>

        <div className="flex flex-col items-center w-full" style={{ gap: 0 }}>
          {/* Badge */}
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-2 px-4 py-3 rounded-full shrink-0 mb-[1rem]"
            style={{ background: 'rgba(77,186,121,0.05)', border: '1px solid rgba(77,186,121,0.15)' }}>
            <span className="badge-pulse shrink-0 block rounded-full" style={{ width: 10, height: 10, background: '#4DBA79' }} aria-hidden />
            <p className="font-inter-tight font-medium text-white whitespace-nowrap" style={{ fontSize: 12, lineHeight: 1.3 }}>
              Axevil дайджест · еженедельно
            </p>
          </motion.div>

          <div className="flex flex-col gap-4 items-center w-full text-center">
            {/* Heading */}
            <motion.h1 {...fadeUp(0.15)}
              className="font-inter-tight font-semibold text-transparent bg-clip-text w-full"
              style={{ fontSize: 36, lineHeight: 1, letterSpacing: '-0.72px', backgroundImage: 'linear-gradient(103.344deg, rgb(162,162,162) 8.73%, rgb(255,255,255) 50.65%, rgb(162,162,162) 92.57%)' }}>
              Дайджест частного рынка — раз в неделю на почту
            </motion.h1>

            {/* Paragraph */}
            <motion.p {...fadeUp(0.20)}
              className="font-inter-tight font-medium w-full"
              style={{ fontSize: 14, lineHeight: 1.35, color: '#9b9b9b', letterSpacing: '-0.28px' }}>
              Крупнейшие переоценки, лидеры роста и падения на secondary, тендер-оферы, новые раунды. Каждый вторник.
            </motion.p>
          </div>

          {/* Button */}
          <motion.div {...fadeUp(0.25)} className="mt-[2rem]">
            <OwnButton onClick={scrollToNLForm} />
          </motion.div>
        </div>

        {/* Letter preview */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: 453 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <NLLetterPreview scale={0.864} />
        </motion.div>
      </div>

      {/* ── DESKTOP (lg+) ── */}
      <div className="hidden lg:flex relative mx-auto w-full flex-col items-center"
        style={{
          maxWidth: 1440, minHeight: 'calc(100svh - 72px)',
          paddingTop: 40, paddingBottom: 0,
          paddingLeft: 'clamp(40px, 5.5vw, 80px)', paddingRight: 'clamp(40px, 5.5vw, 80px)',
          gap: 64,
        }}>

        <div className="flex flex-col items-center gap-8 w-full">
          {/* Badge */}
          <motion.div {...fadeUp(0.1)}
            className="flex items-center gap-2 px-4 py-3 rounded-full"
            style={{ background: 'rgba(77,186,121,0.05)', border: '1px solid rgba(77,186,121,0.15)' }}>
            <span className="badge-pulse shrink-0 block rounded-full" style={{ width: 10, height: 10, background: '#4DBA79' }} aria-hidden />
            <p className="font-inter-tight font-medium text-white whitespace-nowrap" style={{ fontSize: 14, lineHeight: 1.3 }}>
              Axevil дайджест · еженедельно
            </p>
          </motion.div>

          <div className="flex flex-col items-center gap-6 text-center">
            {/* Heading */}
            <motion.h1 {...fadeUp(0.15)}
              className="font-inter-tight font-semibold text-transparent bg-clip-text"
              style={{ fontSize: 'clamp(2.5rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em', backgroundImage: 'linear-gradient(116.594deg, rgb(162,162,162) 8.73%, rgb(255,255,255) 50.65%, rgb(162,162,162) 92.57%)', maxWidth: 858 }}>
              Дайджест частного рынка — раз в неделю на почту
            </motion.h1>

            {/* Paragraph */}
            <motion.p {...fadeUp(0.20)}
              className="font-inter-tight font-medium"
              style={{ fontSize: 'clamp(1rem,1.4vw,1.25rem)', lineHeight: 1.3, color: '#9b9b9b', letterSpacing: '-0.02em', maxWidth: 600 }}>
              Крупнейшие переоценки, лидеры роста и падения на secondary, тендер-оферы, новые раунды. Каждый вторник.
            </motion.p>
          </div>

          {/* Button */}
          <motion.div {...fadeUp(0.25)}>
            <OwnButton onClick={scrollToNLForm} />
          </motion.div>
        </div>

        {/* Letter preview */}
        <motion.div
          className="absolute bottom-[-44px] left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <NLLetterPreview scale={1.188} />
        </motion.div>
      </div>
    </section>
  )
}
