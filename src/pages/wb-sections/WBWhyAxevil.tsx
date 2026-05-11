import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLang } from '../../lib/lang'

export default function WBWhyAxevil() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Desktop: section's own border-radius animates 64 → 0 as it enters viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 1', 'start 0.4'],
  })
  const sectionRadius = useTransform(scrollYProgress, [0, 1], [64, 0])

  return (
    <motion.section
      id="wb-why-axevil"
      ref={sectionRef}
      className="relative w-full overflow-clip"
      style={{
        minHeight: '100vh',
        background: '#000000',
        borderTopLeftRadius: isMobile ? 0 : sectionRadius,
        borderTopRightRadius: isMobile ? 0 : sectionRadius,
      }}
    >
      {/* reg-right-shine: desktop right-pinned, mobile centered */}
      <img
        src="/img/reg-right-shine.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 h-full pointer-events-none select-none left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 opacity-60 lg:opacity-100"
        style={{ objectFit: 'cover', objectPosition: 'center center' }}
      />

      <div
        className="relative mx-auto w-full max-w-[1440px] flex flex-col h-full container-px padding-global"
        style={{ minHeight: '100vh', paddingTop: isMobile ? '1.5rem' : 'clamp(3rem, 8vw, 7.5rem)', paddingBottom: 'clamp(3rem, 8vw, 7.5rem)' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30">
              <span className="opacity-50">{t.whyAxevil.label.split(' ')[0]}</span>
              <span className="opacity-80">{t.whyAxevil.label.split(' ').slice(1).join(' ')}</span>
            </div>
            <h2
              className="font-inter-tight font-semibold text-transparent bg-clip-text"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #b7b7b7 99.06%)',
                maxWidth: '45rem',
                overflow: 'visible',
              }}
            >
              {t.whyAxevil.heading}
            </h2>
          </div>

          <a
            href="https://axevil.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-inter-tight font-medium text-white hover:text-white/80 transition-colors text-[14px] underline underline-offset-4 self-start lg:self-end"
          >
            {t.whyAxevil.link}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8 sm:gap-y-10 mt-auto">
          {t.whyAxevil.stats.map(s => (
            <div
              key={s.label}
              className="flex flex-col gap-3 items-start"
              style={{ borderLeft: '1px solid #202020', paddingLeft: '1.5rem' }}
            >
              <span
                className="font-inter-tight font-medium text-white"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', lineHeight: '110%', letterSpacing: '-0.165rem' }}
              >
                {s.value}
              </span>
              <span className="font-inter-tight font-medium text-white/45" style={{ fontSize: '0.875rem' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
