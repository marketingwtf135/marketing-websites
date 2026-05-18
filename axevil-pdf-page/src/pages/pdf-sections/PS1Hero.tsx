import { useScroll, useTransform, motion } from 'framer-motion'
import PDFCtaButton from '../../components/PDFCtaButton'

export default function PS1Hero() {
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 800], ['0%', '-12%'])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100svh',
        background: '#010101',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '4.25rem',
      }}
    >
      {/* Parallax rocky background — oversized so no black gap */}
      <motion.div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: 'calc(-15% + 150px)', left: 0, right: 0, bottom: '-15%',
          y: bgY,
        }}
      >
        {/* Mobile */}
        <img src="/img/hero-bg-rock.png" alt="" className="absolute max-w-none lg:hidden"
          style={{ height: '100%', left: '-50%', top: '5%', width: '200%', objectFit: 'cover' }}
        />
        {/* Desktop */}
        <img src="/img/hero-bg-rock.png" alt="" className="absolute max-w-none hidden lg:block w-full h-full object-cover"
          style={{ inset: 0 }}
        />
      </motion.div>

      {/* Content wrapper */}
      <div
        className="nl-wrapper"
        style={{
          height: 'clamp(40rem, 52vw, 62.5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 'clamp(2rem, 3vw, 2.5rem)',
          paddingBottom: 'clamp(2rem, 3vw, 2.5rem)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Top content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 2.5vw, 2rem)',
          }}
        >
          {/* Badge + headline block */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            {/* Badge */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-full shrink-0"
              style={{ background: 'rgba(77,186,121,0.05)', border: '1px solid rgba(77,186,121,0.15)' }}>
              <span
                className="badge-pulse shrink-0 block rounded-full"
                style={{ width: '0.625rem', height: '0.625rem', background: '#4DBA79' }}
                aria-hidden="true"
              />
              <p className="font-inter-tight font-medium text-white whitespace-nowrap"
                style={{ fontSize: '0.875rem', lineHeight: 1.3 }}>
                PRE-IPO INSIDER · Q4&#39;25 — Q1&#39;26 · 51 страница
              </p>
            </div>

            {/* H1 + subtitle */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
              }}
            >
              <h1
                style={{
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  color: 'transparent',
                  backgroundImage:
                    'linear-gradient(103.37deg, rgb(162,162,162) 8.73%, rgb(255,255,255) 50.65%, rgb(162,162,162) 92.57%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  maxWidth: 'clamp(20rem, 40vw, 38rem)',
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                Pre-IPO Insider.
                <br />
                Один отчёт вместо десятка источников
              </h1>

              <p
                style={{
                  fontFamily: 'Inter Tight, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(0.9375rem, 1.2vw, 1.125rem)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.02em',
                  color: '#9b9b9b',
                  maxWidth: 'clamp(18rem, 35vw, 37.5rem)',
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                Главное на рынке частных компаний по итогам Q1 2026: динамика индекса,
                крупнейшие переоценки и раунды, кандидаты на IPO и многое другое.
              </p>
            </div>
          </div>

          {/* CTA */}
          <PDFCtaButton>Скачать PDF</PDFCtaButton>
        </motion.div>

        {/* Preview card — absolute bottom 40px */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            width: 'clamp(18rem, 28vw, 22rem)',
            maxWidth: 'calc(100% - 2rem)',
          }}
        >
          <div
            style={{
              background: '#111',
              borderRadius: '3rem',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3rem',
              filter: 'drop-shadow(2rem 4rem 1.5rem rgba(0,0,0,0.8))',
            }}
          >
            {/* Image */}
            <div
              style={{
                width: '9.1875rem',
                height: '9.9375rem',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
                boxShadow: '1rem 3rem 4rem 0 rgba(0,0,0,0.9)',
              }}
            >
              <img
                src="/img/image-left-card-hero.png"
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  width: '197.54%',
                  height: '136.43%',
                  left: '-49.66%',
                  top: '-18.22%',
                  objectFit: 'fill',
                }}
              />
            </div>
            {/* Text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'center', width: '100%' }}>
              <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'white', margin: 0 }}>
                Ключевые события рынка
              </p>
              <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: '1.125rem', lineHeight: 1.35, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
                Axevil capital - квартальный брифинг инвест-команды
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
