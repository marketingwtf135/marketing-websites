import { useEffect, useState } from 'react'
import WBCtaButton from './WBCtaButton'
import { useLang } from '../../lib/lang'

const CARD_PHOTOS = [
  '/img/why-attend-01.png',
  '/img/why-attend-02.png',
  '/img/why-attend-03.png',
  '/img/why-attend-04.png',
]

export default function WBWhyAttend() {
  const { t } = useLang()
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <section id="wb-why" className="relative w-full bg-page-bg">
      <div
        className="mx-auto w-full max-w-[1440px] container-px padding-global"
        style={{ paddingTop: 'clamp(4rem, 8vw, 7.5rem)', paddingBottom: 'clamp(3rem, 8vw, 7.5rem)' }}
      >
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 gap-4">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30">
            <span className="opacity-50">3.0</span>
            <span className="opacity-80">{t.whyAttend.label.split(' ').slice(1).join(' ')}</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #b7b7b7 99.06%)',
              overflow: 'visible',
            }}
          >
            {t.whyAttend.heading}
          </h2>
        </div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 sm:mb-12">
          {t.whyAttend.cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col items-start"
              style={{
                width: '100%',
                maxWidth: '100%',
                padding: '0',
                gap: '1.5rem',
                borderRadius: '1rem',
                background: '#111111',
              }}
            >
              {/* Photo: height 280px, border-radius 16px */}
              <div
                className="relative w-full overflow-hidden flex items-center justify-center"
                style={{
                  height: isMobile ? 'clamp(15rem, 30vw, 26.25rem)' : 'clamp(10rem, 20vw, 17.5rem)',
                  alignSelf: 'stretch',
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={CARD_PHOTOS[i]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: 'blur(2px)', transform: 'scale(1.05)' }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(0,0,0,0.35)' }}
                />
                {/* Metric pill: width 260px, padding 20px, flex-col, items-center, gap 12px */}
                <div
                  className="relative flex flex-col items-center text-center"
                  style={{
                    width: '16.25rem',
                    padding: '1.25rem',
                    gap: '0.75rem',
                    borderRadius: '0.75rem',
                    background: 'rgba(18,18,18,0.75)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <span
                    className="font-inter-tight font-semibold text-center"
                    style={{ color: '#ffffff', fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontWeight: 600, lineHeight: '110%', letterSpacing: '-0.48px' }}
                  >
                    {card.metric}
                  </span>
                  <span
                    className="font-inter-tight font-medium text-center"
                    style={{ color: '#9B9B9B', fontSize: '0.875rem', lineHeight: '130%' }}
                  >
                    {card.metricSub}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div
                className="flex flex-col items-start"
                style={{ padding: '0 1.25rem', gap: '0.75rem', alignSelf: 'stretch' }}
              >
                <h3
                  className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', lineHeight: 1.25, letterSpacing: '-0.02em' }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-inter-tight font-medium text-white/55"
                  style={{ fontSize: '0.9375rem', lineHeight: 1.5 }}
                >
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <WBCtaButton label={t.whyAttend.cta} />
        </div>
      </div>
    </section>
  )
}
