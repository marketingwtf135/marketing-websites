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
    <section id="key-questions" className="relative w-full bg-page-bg">
      <div className="pt-section-y mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-5 pb-[3.75rem] sm:pb-[5rem] lg:pt-[12.5rem] lg:pb-[12.5rem]">

        {/* Heading with inner desktop padding */}
        <div className="flex flex-col gap-6 items-center mb-8 sm:mb-10 lg:px-[80px]">
          <div className="eyebrow">
            <span className="eyebrow-num">1.0</span>
            <span className="eyebrow-text">Ключевые вопросы</span>
          </div>
          <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
            style={{
              fontSize: 'clamp(2.25rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(117.65deg, rgb(162,162,162) 15.77%, rgb(255,255,255) 49.29%, rgb(162,162,162) 82.81%)',
            }}>
            Раскрываем главные вопросы<br />о private markets
          </h2>
        </div>

        {/* Cards — stacked mobile, row sm+ */}
        <div ref={ref} className="flex flex-col sm:flex-row gap-4 items-stretch overflow-hidden w-full">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: '1.5rem' }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.1 }}
              className="flex flex-col items-center overflow-hidden rounded-[1.5rem] flex-1 min-w-0"
              style={{ background: '#111111', padding: '1rem', gap: '2rem', justifyContent: 'space-between', height: 'clamp(20rem, 31.25vw, 28.125rem)' }}
            >
              <p className="font-inter-tight font-medium text-center whitespace-nowrap shrink-0 w-full"
                style={{ fontSize: '1.125rem', lineHeight: 1.35, letterSpacing: '-0.02em', color: '#303030', margin: 0 }}>
                {card.num}
              </p>
              <img src={card.icon} alt="" loading="lazy" className="shrink-0 block"
                style={{ width: 'clamp(5.5rem, 8.3vw, 7.5rem)', height: 'clamp(5.5rem, 8.3vw, 7.5rem)', objectFit: 'contain' }} />
              <div className="flex flex-col items-center w-full text-center" style={{ gap: '2rem', padding: '0 1rem' }}>
                <h3 className="font-inter-tight font-semibold text-white text-center w-full"
                  style={{ fontSize: 'clamp(1.25rem, 1.67vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
                  {card.title}
                </h3>
                <p className="font-inter-tight font-medium text-center w-full"
                  style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.3, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.02em', margin: 0 }}>
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
