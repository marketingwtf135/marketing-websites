import { useScroll, useTransform, motion } from 'framer-motion'
import NLLetterPreview from './NLLetterPreview'
import NLLeadForm from './NLLeadForm'

const heroBg = '/img/newsletter/hero-bg.png'

/**
 * Freshness stamp under the hero form (client feedback 2026-07-23: "под формой маркер:
 * «Последний выпуск: 12 июля 2026, 8 апдейтов, 6 минут чтения»"). One constant so the
 * hero can never disagree with the issue actually sitting in the welcome email — bump it
 * with every send.
 */
export const LAST_ISSUE = {
  date: '12 июля 2026',
  updates: '8 апдейтов',
  reading: '6 минут чтения',
}

/** Reusable fade-up config for staggered hero elements */
function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] as const },
  }
}

/** Last-issue marker — dot · date · updates · reading time. */
function LastIssueMarker({ className = '' }: { className?: string }) {
  return (
    <p
      className={`font-inter-tight font-medium flex flex-wrap items-center justify-center gap-x-2 gap-y-1 ${className}`}
      style={{ fontSize: 'var(--font-xs)', lineHeight: 1.3, color: 'var(--white-400)', letterSpacing: '-0.01em' }}
    >
      <span className="shrink-0 block rounded-full" aria-hidden
        style={{ width: '0.375rem', height: '0.375rem', background: 'var(--status-open)' }} />
      <span style={{ color: 'var(--white-300)' }}>Последний выпуск: {LAST_ISSUE.date}</span>
      <span aria-hidden>·</span>
      <span>{LAST_ISSUE.updates}</span>
      <span aria-hidden>·</span>
      <span>{LAST_ISSUE.reading}</span>
    </p>
  )
}

export default function NLHero() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], ['0%', '-12%'])

  return (
    <section className="relative w-full overflow-hidden" style={{ background: 'var(--black-100)', paddingTop: '72px' }}>

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

      {/* ── MOBILE (< lg) ──
          Headline → form → marker must all sit inside the first screen at 375 (client
          feedback 2026-07-23: "hero + форма в один экран на 375px без прокрутки").
          The letter preview is no longer absolutely pinned at a fixed 453px — it takes
          whatever vertical space is left over (flex-1 + overflow hidden), so it peeks
          on a tall phone and quietly shrinks on a short one instead of pushing the form
          below the fold. */}
      <div className="lg:hidden relative w-full flex flex-col items-center overflow-hidden"
        style={{ minHeight: 'calc(100svh - 72px)', padding: '1.5rem 1rem 0' }}>

        <div className="flex flex-col items-center w-full shrink-0">
          {/* Badge */}
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-2 px-3 py-2 rounded-full shrink-0 mb-[0.75rem]"
            style={{ background: 'rgba(77,186,121,0.05)', border: '1px solid rgba(77,186,121,0.15)' }}>
            <span className="badge-pulse shrink-0 block rounded-full" style={{ width: 8, height: 8, background: 'var(--status-open)' }} aria-hidden />
            <p className="font-inter-tight font-medium text-white whitespace-nowrap" style={{ fontSize: 'var(--font-xs)', lineHeight: 1.3 }}>
              Axevil дайджест · еженедельно
            </p>
          </motion.div>

          <div className="flex flex-col gap-3 items-center w-full text-center">
            {/* Heading */}
            <motion.h1 {...fadeUp(0.15)}
              className="font-inter-tight font-semibold text-transparent bg-clip-text w-full"
              style={{ fontSize: 'clamp(1.75rem, 8vw, 2.25rem)', lineHeight: 1.05, letterSpacing: '-0.72px', backgroundImage: 'linear-gradient(103.344deg, rgb(162,162,162) 8.73%, rgb(255,255,255) 50.65%, rgb(162,162,162) 92.57%)' }}>
              Дайджест частного рынка — раз в неделю на почту
            </motion.h1>

            {/* Paragraph */}
            <motion.p {...fadeUp(0.20)}
              className="font-inter-tight font-medium w-full"
              style={{ fontSize: 'var(--font-s)', lineHeight: 1.3, color: 'var(--white-400)', letterSpacing: '-0.28px' }}>
              Крупнейшие переоценки, лидеры роста и падения на secondary, тендер-оферы, новые раунды. Каждый вторник.
            </motion.p>
          </div>

          {/* Lead form + freshness marker */}
          <motion.div {...fadeUp(0.25)} className="w-full mt-[1.25rem] flex flex-col items-center gap-2">
            <NLLeadForm source="hero" note={null} />
            <LastIssueMarker className="text-center" />
          </motion.div>
        </div>

        {/* Letter preview — fills the leftover screen, clipped and faded at the fold */}
        <motion.div
          className="w-full flex justify-center mt-4"
          style={{
            flex: '1 1 0', minHeight: 0, overflow: 'hidden',
            maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="shrink-0 self-start">
            <NLLetterPreview scale={0.864} />
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP (lg+) ── */}
      <div className="hidden lg:flex relative mx-auto w-full flex-col items-center"
        style={{
          maxWidth: 1440,
          // The hero carries a two-row form now; a short laptop viewport would otherwise
          // let the bottom-anchored letter preview run into the copy.
          minHeight: 'max(calc(100svh - 72px), 45rem)',
          paddingTop: 40, paddingBottom: 0,
          paddingLeft: 'clamp(40px, 5.5vw, 80px)', paddingRight: 'clamp(40px, 5.5vw, 80px)',
          gap: 64,
        }}>

        <div className="flex flex-col items-center gap-8 w-full">
          {/* Badge */}
          <motion.div {...fadeUp(0.1)}
            className="flex items-center gap-2 px-4 py-3 rounded-full"
            style={{ background: 'rgba(77,186,121,0.05)', border: '1px solid rgba(77,186,121,0.15)' }}>
            <span className="badge-pulse shrink-0 block rounded-full" style={{ width: 10, height: 10, background: 'var(--status-open)' }} aria-hidden />
            <p className="font-inter-tight font-medium text-white whitespace-nowrap" style={{ fontSize: 'var(--font-s)', lineHeight: 1.3 }}>
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
              style={{ fontSize: 'clamp(1rem,1.4vw,1.25rem)', lineHeight: 1.3, color: 'var(--white-400)', letterSpacing: '-0.02em', maxWidth: 600 }}>
              Крупнейшие переоценки, лидеры роста и падения на secondary, тендер-оферы, новые раунды. Каждый вторник.
            </motion.p>
          </div>

          {/* Lead form — was a button that only scrolled to the closing block, an extra
              click and a drop-off point (client feedback 2026-07-23) */}
          <motion.div {...fadeUp(0.25)} className="w-full flex flex-col items-center gap-3" style={{ maxWidth: '38.75rem' }}>
            <NLLeadForm source="hero" note={null} />
            <LastIssueMarker />
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
