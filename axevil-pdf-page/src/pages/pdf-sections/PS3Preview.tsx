import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PDFCtaButton from '../../components/PDFCtaButton'

export default function PS3Preview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="preview" className="relative w-full" style={{ background: '#060606' }}>
      <div
        ref={ref}
        className="mx-auto w-full max-w-[1440px] flex-responsive-col"
        style={{
          padding: '3.75rem 1.25rem',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 'clamp(2rem, 4vw, 4rem)',
        }}
      >
        {/* LEFT: text */}
        <motion.div
          initial={{ opacity: 0, x: '-1.5rem' }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            flex: '1 1 0', minWidth: 0,
            display: 'flex', flexDirection: 'column',
            gap: '1rem',
            width: '100%', height: '100%',
          }}
        >
          {/* Eyebrow */}
          <div className="eyebrow" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)' }}>
            <span className="eyebrow-num">2.0</span>
            <span className="eyebrow-text">Образец</span>
          </div>
          {/* H2 + desc */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{
              fontFamily: 'Inter Tight, sans-serif', fontWeight: 600,
              fontSize: 'clamp(1.75rem, 3.5vw, 4rem)',
              lineHeight: 1, letterSpacing: '-0.02em', margin: 0,
              color: 'transparent',
              background: 'linear-gradient(112.5deg, rgb(162,162,162) 4.26%, rgb(255,255,255) 40.2%, rgb(162,162,162) 76.15%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
            }}>
              Частный рынок vs Nasdaq за 2025 год
            </h2>
            <p style={{
              fontFamily: 'Inter Tight, sans-serif', fontWeight: 500,
              fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
              lineHeight: 1.35, letterSpacing: '-0.02em', color: '#bcbcbc',
              maxWidth: '36.25rem', margin: 0,
            }}>
              Динамика индекса топ-20 частных компаний по сравнению с NASDAQ на фоне торговых войн и конфликта Трампа с главой ФРС.
            </p>
          </div>
        </motion.div>

        {/* RIGHT: card */}
        <motion.div
          className="preview-card"
          initial={{ opacity: 0, x: '1.5rem' }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          style={{
            flex: '1 1 0', minWidth: 0,
            background: '#111',
            borderRadius: '2rem',
            padding: '2rem',
            display: 'flex', flexDirection: 'column', gap: '1.5rem',
            minHeight: 'clamp(28rem, 56.25vw, 56.25rem)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Top text (z=2) — h6 style 18px SemiBold */}
          <p style={{
            fontFamily: 'Inter Tight, sans-serif', fontWeight: 600,
            fontSize: 'clamp(1.125rem, 1.3vw, 1.25rem)',
            lineHeight: 1.3, letterSpacing: '-0.025em',
            color: 'white', textAlign: 'center',
            maxWidth: '31.25rem', margin: '0 auto',
            position: 'relative', zIndex: 2,
          }}>
            7 секторов с реальной динамикой вне AI, и IPO-пайплайн 2026: SpaceX, Databricks, Stripe, Revolut, Canva, Kraken, Discord, тренды 2026.
          </p>

          {/* Image area (z=2) */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 2 }}>
            <img
              src="/img/image-analyse.png"
              alt="Анализ частного рынка"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>

          {/* Rock — static img, absolute bottom, z:10 */}
          <img
            src="/img/hero-bg-rock.png"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center bottom',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />

          {/* CTA button (z=11) */}
          <div style={{ position: 'relative', zIndex: 11 }}>
            <PDFCtaButton style={{ width: '100%', justifyContent: 'center' }}>
              Скачать полную версию PDF
            </PDFCtaButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
