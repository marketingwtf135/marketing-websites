import { useRef, type RefObject } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLang } from '../../lib/lang'
import WBRegistrationForm from './WBRegistrationForm'

export default function WBForm() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)

  // Section's own border-radius: 16px → 64px as it enters viewport (same as WBWhyAxevil)
  const { scrollYProgress: radiusProgress } = useScroll({
    target: sectionRef as RefObject<HTMLElement>,
    offset: ['start 1', 'start 0.4'],
  })
  const sectionRadius = useTransform(radiusProgress, [0, 1], [64, 0])

  return (
    <motion.section
      id="wb-form"
      ref={sectionRef}
      className="relative w-full overflow-clip flex items-center"
      style={{
        minHeight: '100vh',
        background: 'var(--black-100)',
        borderTopLeftRadius: sectionRadius,
        borderTopRightRadius: sectionRadius,
      }}
    >
      {/* Left shine - 1000px x 100vh, contain */}
      <img
        src="/img/reg-left-shine.png"
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute top-0 left-0 pointer-events-none select-none"
        style={{ width: '62.5rem', height: '100vh', objectFit: 'fill' }}
      />
      {/* Right shine — desktop right-pinned, mobile centered (like 3rd block) */}
      <img
        src="/img/reg-right-shine.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 h-full pointer-events-none select-none left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 opacity-60 lg:opacity-100"
        style={{ width: '62.5rem', objectFit: 'cover', objectPosition: 'center center' }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] container-px padding-global" style={{ paddingTop: 'clamp(3rem, 8vw, 7.5rem)', paddingBottom: 'clamp(3rem, 8vw, 7.5rem)' }}>
        <div style={{ maxWidth: 'min(100%, 32.5rem)', marginLeft: 'auto', marginRight: 'auto' }}>

          <div className="flex flex-col items-center text-center gap-4 mb-8 sm:mb-10">
            <div className="flex items-center gap-2 font-inter-tight font-medium text-text-xs sm:text-text-l text-neutral-30">
              <span className="opacity-50">{t.form.label.split(' ')[0]}</span>
              <span className="opacity-80">{t.form.label.split(' ').slice(1).join(' ')}</span>
            </div>
            <h2
              className="font-inter-tight font-semibold text-center text-white"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontWeight: 600, lineHeight: '100%', letterSpacing: '-1.28px', overflow: 'visible' }}
            >
              {t.form.heading}
            </h2>
            <p className="font-inter-tight font-medium text-white/55" style={{ fontSize: 'var(--font-s)' }}>
              {t.form.sub}
            </p>
          </div>

          <WBRegistrationForm />
        </div>
      </div>
    </motion.section>
  )
}
