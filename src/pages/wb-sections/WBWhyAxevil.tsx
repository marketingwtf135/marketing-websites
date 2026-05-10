import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const STATS = [
  { value: '$150M', label: 'AUM' },
  { value: '1,000+', label: 'Investors' },
  { value: '35',     label: 'Top-tier companies' },
  { value: '100+',   label: 'Partners' },
  { value: '7',      label: 'Exits (IPO + Secondary)' },
]

export default function WBWhyAxevil() {
  // Section's own border-radius: animates 16px → 64px as it enters viewport
  const sectionRef = useRef<HTMLDivElement>(null)
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
        borderTopLeftRadius: sectionRadius,
        borderTopRightRadius: sectionRadius,
      }}
    >
      {/* reg-right-shine pinned to right edge */}
      <img
        src="/img/reg-right-shine.png"
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute top-0 right-0 h-full pointer-events-none select-none"
        style={{ objectFit: 'cover', objectPosition: 'right center' }}
      />

      <div
        className="relative mx-auto w-full max-w-[1440px] flex flex-col h-full"
        style={{ minHeight: 'inherit', paddingTop: '5rem', paddingBottom: '5rem' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-20">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30">
              <span className="opacity-50">2.0</span>
              <span className="opacity-80">Why Axevil hosts this</span>
            </div>
            <h2
              className="font-inter-tight font-semibold text-transparent bg-clip-text"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #b7b7b7 99.06%)',
                maxWidth: 720,
                overflow: 'visible',
              }}
            >
              Built by people who run private markets — not just discuss them.
            </h2>
          </div>

          <a
            href="https://axevil.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-inter-tight font-medium text-white/70 hover:text-white transition-colors text-[14px] underline underline-offset-4 self-start lg:self-end"
            style={{ mixBlendMode: 'difference' }}
          >
            See the Axevil platform
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 sm:gap-y-12 mt-auto">
          {STATS.map(s => (
            <div
              key={s.label}
              className="flex flex-col gap-3 items-start"
              style={{ borderLeft: '1px solid #202020', paddingLeft: 24, mixBlendMode: 'difference' }}
            >
              <span
                className="font-inter-tight font-medium text-white"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: '110%', letterSpacing: '-2.64px' }}
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
