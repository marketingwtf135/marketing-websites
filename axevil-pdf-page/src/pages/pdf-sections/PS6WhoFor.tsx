import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* Use-cases, not audience segments — client feedback 2026-07-23: "три пункта в столбик
   читаются вяло, переписать под use-case". Each card now leads with the job the reader
   does with the report; who they are became a label above it, and the old segment quote
   stays underneath as the supporting detail. */
const CARDS = [
  {
    num: '1.0',
    icon: '/img/big-icon-persons.svg',
    role: 'Независимые финансовые советники',
    title: 'Показать клиенту, куда вкладываете',
    quote: '«Можно ли инвестировать в SpaceX в преддверии IPO, на какие компании стоит обратить внимание — готовая карта рынка для разговора с клиентами»',
  },
  {
    num: '2.0',
    icon: '/img/big-icon-portfolio.svg',
    role: 'Управляющие капиталом и инвест-банкиры',
    title: 'Подтвердить экспертизу при найме',
    quote: '«Как реальная оценка соотносится с ценами на secondary, какие сектора недооценены, как структурировать доступ к лучшим компаниям?»',
  },
  {
    num: '3.0',
    icon: '/img/big-icon-analytics.svg',
    role: 'Family offices',
    title: 'Отправить в чат Family Office',
    quote: '«Как изменилась динамика частного рынка за последний год, чего ждать от макро в 2026, в каких отраслях имеет смысл искать новые возможности?»',
  },
]

export default function PS6WhoFor() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <section id="who-for" className="relative w-full" style={{ background: '#080808', paddingTop: 'clamp(3.75rem, 8.5vw, 12.5rem)', paddingBottom: 'clamp(3.75rem, 8.5vw, 12.5rem)' }}>
      <div className="nl-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>

        {/* Heading */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
          <div className="eyebrow" style={{ fontSize: '0.875rem' }}>
            <span className="eyebrow-num">5.0</span>
            <span className="eyebrow-text">Кто пользуется Pre-IPO Insider</span>
          </div>
          <h2 style={{
            fontFamily: 'Inter Tight, sans-serif', fontWeight: 600,
            fontSize: 'clamp(2.25rem, 3.5vw, 4rem)',
            lineHeight: 1, letterSpacing: '-0.02em', textAlign: 'center',
            color: 'transparent',
            background: 'linear-gradient(97.83deg, rgb(255,255,255) 0.18%, rgb(183,183,183) 98.82%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            maxWidth: '62.5rem',
            margin: 0,
          }}>
            Аналитика для профессионалов финансового рынка
          </h2>
          <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)', lineHeight: 1.35, letterSpacing: '-0.02em', color: '#bcbcbc', maxWidth: '35rem', margin: 0 }}>
            Регулярно освещаем происходящее на рынке частных компаний, чтобы вы могли использовать эту информацию в своей работе.
          </p>
        </div>

        {/* Row cards */}
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '44rem', width: '100%' }}>
          {CARDS.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: '1.25rem' }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.1 }}
              style={{
                background: '#111', borderRadius: '1.5rem',
                padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1.25rem, 2.5vw, 1.75rem)',
                display: 'flex', flexDirection: 'column', gap: '3rem',
              }}
            >
              {/* Top row: icon + number */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <img src={card.icon} alt="" aria-hidden="true" style={{ width: '2.75rem', height: '2.75rem', objectFit: 'contain' }} />
                <span style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: '1.125rem', lineHeight: 1.35, letterSpacing: '-0.02em', color: '#404040' }}>
                  {card.num}
                </span>
              </div>
              {/* Text */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: 'clamp(0.75rem, 0.95vw, 0.875rem)', lineHeight: 1.3, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#9b9b9b' }}>
                  {card.role}
                </span>
                <h3 style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 600, fontSize: 'clamp(1.25rem, 1.67vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'white', margin: 0 }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: 'Inter Tight, sans-serif', fontWeight: 500, fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)', lineHeight: 1.35, letterSpacing: '-0.02em', color: '#bcbcbc', margin: 0 }}>
                  {card.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
