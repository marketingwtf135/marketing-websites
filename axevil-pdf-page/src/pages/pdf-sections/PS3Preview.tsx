import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PDFCtaButton from '../../components/PDFCtaButton'

export default function PS3Preview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <section id="preview" className="relative w-full padding-section-t6-b6" style={{ background: '#060606' }}>
      <div ref={ref} className="nl-wrapper flex-responsive-col-reverse" style={{
        display: 'flex',
        gap: 'clamp(2rem, 4vw, 4rem)',
        alignItems: 'stretch',
      }}>
        {/* LEFT: text */}
        <motion.div
          initial={{ opacity: 0, x: '-1.5rem' }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2rem', minHeight: 'clamp(16rem, 25vw, 28rem)' }}
        >
          {/* Eyebrow stays at top */}
          <div className="eyebrow">
            <span className="eyebrow-num">2.0</span>
            <span className="eyebrow-text">Образец</span>
          </div>
          {/* H2 + desc push to bottom */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{
              fontFamily: 'Inter Tight, sans-serif', fontWeight: 600,
              fontSize: 'clamp(1.75rem, 3.5vw, 4rem)',
              lineHeight: 1, letterSpacing: '-0.02em',
              color: 'transparent',
              background: 'linear-gradient(112.5deg, rgb(162,162,162) 4.26%, rgb(255,255,255) 40.2%, rgb(162,162,162) 76.15%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              margin: 0,
            }}>
              Частный рынок vs Nasdaq за 2025 год
            </h2>
            <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', lineHeight: 1.35, letterSpacing: '-0.02em', color: '#bcbcbc', maxWidth: '36rem', margin: 0 }}>
              Динамика индекса топ-20 частных компаний по сравнению с NASDAQ на фоне торговых войн и конфликта Трампа с главой ФРС.
            </p>
          </div>
        </motion.div>

        {/* RIGHT: report card */}
        <motion.div
          initial={{ opacity: 0, x: '1.5rem' }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          style={{
            flex: '1 1 0', minWidth: 0,
            background: '#111',
            backgroundImage: 'url(/img/bg-image-rock.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            borderRadius: '2rem',
            position: 'relative',
            display: 'flex', flexDirection: 'column',
            minHeight: 'clamp(28rem, 45vw, 56.25rem)',
          }}
        >
          {/* Dark overlay - above bg image, below analyse img */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.3)', zIndex: 0, pointerEvents: 'none', borderRadius: '2rem' }} />

          {/* Top text inside card */}
          <div style={{ padding: '2rem', paddingBottom: '1rem', position: 'relative', zIndex: 2 }}>
            <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 600, fontSize: 'clamp(0.9375rem, 1.3vw, 1.25rem)', lineHeight: 1.3, letterSpacing: '-0.02em', color: 'white', textAlign: 'center', margin: 0 }}>
              7 секторов с реальной динамикой вне AI, и IPO-пайплайн 2026: SpaceX, Databricks, Stripe, Revolut, Canva, Kraken, Discord, тренды 2026.
            </p>
          </div>

          {/* Report screenshot - sits ON TOP of the rock */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 2 }}>
            <img
              src="/img/image-analyse.png"
              alt="Анализ частного рынка"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', position: 'relative', zIndex: 1 }}
            />
            {/* Rock overlay — separate layer above report image */}
            <img
              src="/img/bg-image-rock.png"
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '60%',
                width: '100%',
                objectFit: 'cover',
                objectPosition: 'top',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Bottom CTA */}
          <div style={{ padding: 'clamp(1rem, 2vw, 1.5rem)', position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center' }}>
            <PDFCtaButton>
              Скачать полную версию PDF
            </PDFCtaButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
