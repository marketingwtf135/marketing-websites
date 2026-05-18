import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CARDS = [
  {
    num: '1.0',
    icon: '/img/Bold/Map & Location/Global.svg',
    title: 'Есть ли венчурная жизнь вне AI? Где формируются следующие единороги?',
    desc: '7 секторов с реальной динамикой и потенциалом за пределами искусственного интеллекта.',
  },
  {
    num: '2.0',
    icon: '/img/Bold/Business, Statistic/Chat Square 2.svg',
    title: '2025 год: частный рынок +148% vs Nasdaq +20%, что ждать в 2026?',
    desc: 'Как частный рынок реагирует на макроэкономическую нестабильность, почему именно частные компании становятся приоритетом для smart money.',
  },
  {
    num: '3.0',
    icon: '/img/Bold/Astronomy/Rocket.svg',
    title: 'Календарь IPO 2026: кандидаты на размещение',
    desc: 'Pipeline из 15+ единорогов, потенциально крупнейшие IPO в истории рынка.',
  },
]

export default function PS2KeyQuestions() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <section id="key-questions" className="relative w-full padding-section-t6-b6" style={{ background: '#080808' }}>
      <div className="nl-wrapper">
        {/* Heading */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          {/* Eyebrow */}
          <div className="eyebrow">
            <span className="eyebrow-num">1.0</span>
            <span className="eyebrow-text">Ключевые вопросы</span>
          </div>
          {/* H2 */}
          <h2 style={{
            fontFamily: 'Inter Tight, sans-serif', fontWeight: 600,
            fontSize: 'clamp(1.75rem, 3.5vw, 4rem)',
            lineHeight: 1, letterSpacing: '-0.02em', textAlign: 'center',
            color: 'transparent',
            background: 'linear-gradient(117.65deg, rgb(162,162,162) 15.77%, rgb(255,255,255) 49.29%, rgb(162,162,162) 82.81%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            margin: 0,
          }}>
            Раскрываем главные вопросы<br />о private markets
          </h2>
        </div>

        {/* Cards */}
        <div ref={ref} style={{ display: 'flex', gap: '1rem', overflow: 'hidden', width: '100%' }}>
          {CARDS.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: '1.5rem' }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.1 }}
              style={{
                flex: '1 1 0', minWidth: 0,
                background: '#111111', borderRadius: '1.5rem',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'space-between',
                padding: 'clamp(1rem, 1.5vw, 1.5rem) clamp(1rem, 2vw, 2rem) clamp(1.5rem, 2vw, 2rem)',
                gap: '1.5rem',
                height: 'clamp(20rem, 31.25vw, 28.125rem)',
              }}
            >
              {/* Number top */}
              <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: '1.125rem', lineHeight: 1.35, letterSpacing: '-0.02em', color: '#303030', width: '100%', textAlign: 'center', margin: 0 }}>
                {card.num}
              </p>
              {/* Icon */}
              <img src={card.icon} alt="" aria-hidden="true"
                style={{ width: 'clamp(4rem, 7.5vw, 7.5rem)', height: 'clamp(4rem, 7.5vw, 7.5rem)', objectFit: 'contain' }}
              />
              {/* Text block */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', width: '100%' }}>
                <h3 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 600, fontSize: 'clamp(1rem, 1.67vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'white', margin: 0 }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.3, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
