import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* Three questions the report actually answers, phrased as the reader would ask them
   (client feedback 2026-07-23: "три общих заголовка заменить на конкретные вопросы из
   отчёта"). The old titles described topics — "Есть ли венчурная жизнь вне AI?",
   "что ждать в 2026?" — which read as chapter names, not as something a visitor came
   here wanting to know. Icons follow their new question. */
// Icon paths flattened out of "Bold/<Category Name>/<File Name>.svg" — those folder/file
// names had spaces, a comma and an ampersand, which 404'd on Railway prod (URL-encoded
// request path never matched the on-disk name, even though the Vite dev server tolerated
// it fine). Same root cause as PS4Methodology's competitor logos (client 2026-07-27).
const CARDS = [
  {
    num: '1.0',
    icon: '/img/icon-rocket.svg',
    title: 'Какие компании выйдут на IPO в 2026',
    desc: 'Pipeline из 15+ единорогов с датами, оценками и статусом подготовки — потенциально крупнейшие размещения в истории рынка.',
  },
  {
    num: '2.0',
    icon: '/img/icon-chat-square.svg',
    title: 'Куда идут оценки после SpaceX',
    desc: 'Как размещение на $1,8 трлн переставило планку для всего частного рынка: переоценки, вторичка и разрыв между раундом и биржей.',
  },
  {
    num: '3.0',
    icon: '/img/icon-global.svg',
    title: 'Где ошибаются wealth-менеджеры в pre-IPO',
    desc: 'Типичные промахи при входе в частные сделки: структура доступа, ликвидность, сроки локапа и цена, которую платят за спешку.',
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
              <div className="flex flex-col items-center w-full text-center" style={{ gap: '0.75rem', padding: '0 1rem' }}>
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
