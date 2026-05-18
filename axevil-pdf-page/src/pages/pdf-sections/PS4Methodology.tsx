import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const AUTHOR_PHOTO = '/img/image-speaker.png'

const LOGOS = [
  { name: 'Crunchbase', src: '/img/crunchbase-logo.png' },
  { name: 'PitchBook',  src: '/img/Без названия 1.png' },
  { name: 'PREQIN',     src: '/img/Preqin-logo_1 1.png' },
  { name: 'S&P Global', src: '/img/sandp-1 1.png' },
  { name: 'NVCA',       src: '/img/logo 1.png' },
]

export default function PS4Methodology() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section
      className="relative w-full padding-section-t12-b6"
      style={{
        background: '#080808',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="nl-wrapper"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        {/* ── Eyebrow + H2 + Desc ─────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          {/* Eyebrow */}
          <div className="eyebrow">
            <span className="eyebrow-num">3.0</span>
            <span className="eyebrow-text">Методология</span>
          </div>

          {/* H2 */}
          <h2
            style={{
              fontFamily: 'Inter Tight, sans-serif',
              fontSize: 'clamp(1.75rem, 3.5vw, 4rem)',
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              background:
                'linear-gradient(122.1deg, rgb(162,162,162) 15.77%, rgb(255,255,255) 49.29%, rgb(162,162,162) 82.81%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
              margin: 0,
              maxWidth: '50rem',
            }}
          >
            Один источник вместо десятка подписок
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: 'Inter Tight, sans-serif',
              fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
              fontWeight: 500,
              lineHeight: 1.35,
              letterSpacing: '-0.02em',
              color: '#bcbcbc',
              textAlign: 'center',
              maxWidth: '44rem',
              margin: 0,
            }}
          >
            Pre-IPO Insider — это синтез аналитических материалов и внутренних данных платформы
            Axevil Capital, собранный в один документ.
          </p>
        </div>

        {/* ── Author card ──────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            background: '#151515',
            borderRadius: '1rem',
            padding: '0.25rem 1.5rem 0.25rem 0.25rem',
          }}
        >
          {/* Photo */}
          <img
            src={AUTHOR_PHOTO}
            alt="Влад Соловьёв"
            width={119}
            height={119}
            style={{
              width: '7.4375rem',
              height: '7.4375rem',
              borderRadius: '0.5rem',
              objectFit: 'cover',
              display: 'block',
              flexShrink: 0,
            }}
          />

          {/* Text */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              padding: '0.5rem 0',
            }}
          >
            <p
              style={{
                fontFamily: 'Inter Tight, sans-serif',
                fontSize: '1.25rem',
                fontWeight: 500,
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: 0,
              }}
            >
              Влад Соловьёв
            </p>
            <p
              style={{
                fontFamily: 'Inter Tight, sans-serif',
                fontSize: '1rem',
                fontWeight: 500,
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
                color: '#bcbcbc',
                margin: 0,
              }}
            >
              Senior Investment Analyst
            </p>
            {/* Status row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span
                style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '50%',
                  background: '#9B9B9B',
                  flexShrink: 0,
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'Inter Tight, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  color: '#9b9b9b',
                }}
              >
                Автор отчета
              </span>
            </div>
          </div>
        </div>

        {/* ── Data sources ─────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter Tight, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Источники данных
          </p>

          {/* Desktop: 5 boxes in a row */}
          <div className="logos-desktop-grid">
            {LOGOS.map(l => (
              <div
                key={l.name}
                style={{
                  border: '1px solid #151515',
                  borderRadius: '2rem',
                  height: 'clamp(8rem, 14vw, 16.25rem)',
                  flex: '1 1 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                }}
              >
                <img
                  src={l.src}
                  alt={l.name}
                  style={{
                    maxHeight: '2rem',
                    maxWidth: '9rem',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Mobile: infinite marquee */}
          <div className="logos-mobile-marquee">
            {/* Left fade */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4rem',
                background: 'linear-gradient(to right, #080808, transparent)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
            {/* Right fade */}
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '4rem',
                background: 'linear-gradient(to left, #080808, transparent)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
            {/* Scrolling track — duplicated for seamless loop */}
            <div className="marquee-track">
              {[...LOGOS, ...LOGOS].map((l, i) => (
                <div
                  key={i}
                  style={{
                    border: '1px solid #151515',
                    borderRadius: '1.25rem',
                    height: '5rem',
                    minWidth: '8rem',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={l.src}
                    alt={l.name}
                    style={{
                      maxHeight: '2rem',
                      maxWidth: '9rem',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
