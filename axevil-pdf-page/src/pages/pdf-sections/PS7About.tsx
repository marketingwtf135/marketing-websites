import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import PDFSectionLabel from '../../components/PDFSectionLabel'

const STATS = [
  { value: '$150M', label: 'AUM' },
  { value: '1,000+', label: 'Клиентов' },
  { value: '35', label: 'Компаний в портфеле' },
  { value: '100+', label: 'Партнёров' },
]

export default function PS7About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section
      className="relative w-full padding-section-t6-b6"
      style={{
        background: '#080808',
        padding: '0 clamp(1.25rem, 5.5vw, 5rem)',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          background: '#0c0c0c',
          borderRadius: '4rem',
          padding: 'clamp(2rem, 3.5vw, 3rem)',
          maxWidth: '90rem',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '4rem',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Heading */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '2.5rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <PDFSectionLabel>6.0&nbsp;&nbsp;О платформе</PDFSectionLabel>
            <h2
              className="font-inter-tight font-semibold text-transparent bg-clip-text"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                backgroundImage:
                  'linear-gradient(113.52deg, rgb(162,162,162) 15.77%, rgb(255,255,255) 49.29%, rgb(162,162,162) 82.81%)',
              }}
            >
              Axevil Capital
            </h2>
            <p
              className="font-inter-tight font-medium"
              style={{
                fontSize: '1.125rem',
                fontWeight: 500,
                lineHeight: 1.35,
                letterSpacing: '-0.02em',
                color: '#bcbcbc',
                textAlign: 'center',
                maxWidth: '35rem',
              }}
            >
              Axevil — технологическая платформа, предоставляющая профессиональным инвесторам и управляющим капиталом прямой доступ к лучшим инвестиционным возможностям частного рынка.
            </p>
          </div>
        </div>

        {/* Stats + screenshot in single block with gap 1rem */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            {STATS.map(s => (
              <div
                key={s.value}
                className="stat-card"
                style={{ flex: '1 1 8.75rem', minWidth: '7.5rem' }}
              >
                <p
                  className="font-inter-tight font-semibold text-white"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.value}
                </p>
                <p
                  className="font-inter-tight font-medium"
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 500,
                    lineHeight: 1.35,
                    letterSpacing: '-0.02em',
                    color: '#9b9b9b',
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Platform UI image — hidden on mobile via CSS class */}
          <img
            src="/img/pdf-interface-big.png"
            alt="Axevil Capital — интерфейс платформы"
            className="platform-screenshot"
            style={{ width: '100%', borderRadius: '1.5rem', display: 'block' }}
            width={1180}
            height={604}
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  )
}
