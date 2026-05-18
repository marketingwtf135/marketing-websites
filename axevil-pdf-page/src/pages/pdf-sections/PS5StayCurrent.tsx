import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS = [
  {
    key: 'report',
    title: 'Pre-IPO Insider Q1 2026',
    desc: 'Квартальный отчёт с итогами по частному рынку на Q1 2026: динамика индекса, IPO-pipeline, секторы вне AI.',
    badgeIcon: '/img/Fast.svg',
    badgeText: 'Получите сразу после заполнения формы',
    mockup: '/img/image-left-card.png',
  },
  {
    key: 'digest',
    title: 'Еженедельный дайджест',
    desc: 'Каждый вторник: новости частных компаний, сигналы вторичного рынка, динамика переоценок, комментарии аналитиков.',
    badgeIcon: '/img/Security.svg',
    badgeText: 'Бесплатно. Отписка одной кнопкой',
    mockup: '/img/image-right-card.png',
  },
]

const MOCKUP_STYLES: React.CSSProperties[] = [
  {
    position: 'absolute',
    right: 'clamp(-0.0625rem, -2.8vw, -2.5rem)',
    bottom: 'clamp(-6.75rem, -7.5vw, -6.75rem)',
    width: 'clamp(15.5rem, 25.6vw, 23.0625rem)',
    height: 'auto',
    objectFit: 'contain',
    pointerEvents: 'none',
  },
  {
    position: 'absolute',
    right: 'clamp(-4.3125rem, -4.8vw, -4.3125rem)',
    bottom: 'clamp(-2.625rem, -2.9vw, -2.625rem)',
    width: 'clamp(19.125rem, 32.4vw, 29.125rem)',
    height: 'auto',
    objectFit: 'contain',
    pointerEvents: 'none',
  },
]

export default function PS5StayCurrent() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <section id="stay-current" className="relative w-full" style={{ background: '#080808', paddingTop: 'clamp(3.75rem, 6.5vw, 6.25rem)', paddingBottom: 'clamp(3.75rem, 6.5vw, 6.25rem)' }}>
      <div className="nl-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* Heading */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', textAlign: 'center' }}>
          <div className="eyebrow">
            <span className="eyebrow-num">4.0</span>
            <span className="eyebrow-text">Оставайтесь в курсе</span>
          </div>
          <h2 style={{
            fontFamily: 'Inter Tight, sans-serif', fontWeight: 600,
            fontSize: 'clamp(2.25rem, 3.5vw, 4rem)',
            lineHeight: 1, letterSpacing: '-0.02em',
            color: 'transparent',
            background: 'linear-gradient(127.9deg, rgb(162,162,162) 15.77%, rgb(255,255,255) 49.29%, rgb(162,162,162) 82.81%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            width: '100%',
            textAlign: 'center',
            maxWidth: 'none',
            margin: 0,
          }}>
            Pre-IPO Insider сегодня, ключевые события частного рынка — каждую неделю
          </h2>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.25rem',
            width: '100%',
          }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: '1.5rem' }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.12 }}
              style={{
                flex: '1 1 18rem', minWidth: 0,
                border: '1px solid #151515', borderRadius: '1.5rem',
                overflow: 'clip', position: 'relative',
                display: 'flex', flexDirection: 'column',
                minHeight: 'clamp(25rem, 37.5vw, 33.75rem)',
              }}
            >
              {/* Content top */}
              <div style={{ padding: 'clamp(1.25rem, 2vw, 2rem)', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <h3 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 600, fontSize: 'clamp(1.5rem, 2vw, 2.25rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'white', margin: 0 }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)', lineHeight: 1.35, letterSpacing: '-0.02em', color: '#bcbcbc', maxWidth: '24rem', margin: 0 }}>
                  {card.desc}
                </p>
              </div>

              {/* Mockup image — absolute bottom, badge at absolute bottom-left */}
              <div style={{ position: 'relative', minHeight: 'clamp(10rem, 16vw, 15rem)' }}>
                <img
                  src={card.mockup}
                  alt=""
                  aria-hidden="true"
                  style={MOCKUP_STYLES[i]}
                />
                {/* Badge overlay */}
                <div style={{
                  position: 'absolute', bottom: '1rem', left: '1rem',
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: '#111',
                  borderRadius: '10rem',
                  padding: '1rem',
                  zIndex: 1,
                }}>
                  <img src={card.badgeIcon} alt="" style={{ width: '1.5rem', height: '1.5rem', flexShrink: 0 }} aria-hidden="true" />
                  <span style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: 'clamp(0.75rem, 1.3vw, 1.25rem)', lineHeight: 1.3, letterSpacing: '-0.025em', color: 'white', whiteSpace: 'nowrap' }}>
                    {card.badgeText}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
