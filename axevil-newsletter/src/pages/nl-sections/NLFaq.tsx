import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

/**
 * Блок 7 из ТЗ — шесть вопросов с ответами, взятыми дословно.
 *
 * Единственный блок ТЗ, который отсутствовал целиком и при этом не требовал ничего
 * извне: формулировки заданы в самом ТЗ. Порядок и текст не меняем — правки по смыслу
 * идут через ТЗ, не через вёрстку.
 *
 * Первый вопрос раскрыт по умолчанию: цена — то, ради чего этот блок открывают, и
 * закрытый аккордеон легко пролистать мимо.
 */
const QUESTIONS = [
  {
    q: 'Какая цена?',
    a: 'По инвайту для WM, family offices и accredited HNWI. Индивидуальные условия по запросу.',
  },
  {
    q: 'Что приходит сразу?',
    a: 'Welcome-выпуск (он не публикуется в паблике) + доступ к инструментам. Первый регулярный выпуск — в ближайший вторник.',
  },
  {
    q: 'Как часто потом?',
    a: 'Минимум 1 раз в неделю (вторник). Иногда midweek-апдейт при крупном событии.',
  },
  {
    q: 'Чем отличается от PDF-лендинга?',
    a: 'PDF — разовая загрузка квартального отчёта. Дайджест — постоянный поток + инструменты.',
  },
  {
    q: 'Кто пишет?',
    a: 'Селект-тим Axevil. Среди аналитиков — ex-SocGen, ex-McKinsey профи.',
  },
  {
    q: 'Можно отписаться?',
    a: 'Да, одним кликом в любом письме.',
  },
]

/** Плюс, который поворачивается в минус — та же длительность, что у остальных анимаций страницы. */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span className="relative shrink-0 block" style={{ width: '1rem', height: '1rem' }} aria-hidden>
      <span
        className="absolute block rounded-full"
        style={{ top: '50%', left: 0, width: '1rem', height: '1.5px', marginTop: '-0.75px', background: 'var(--white-300)' }}
      />
      <motion.span
        className="absolute block rounded-full"
        style={{ top: '50%', left: 0, width: '1rem', height: '1.5px', marginTop: '-0.75px', background: 'var(--white-300)' }}
        animate={{ rotate: open ? 0 : 90 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      />
    </span>
  )
}

export default function NLFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="nl-faq" className="relative w-full bg-page-bg">
      <div className="padding-section-t6-b12 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-0 flex flex-col gap-[clamp(2rem,3.3vw,3rem)] items-center">

        {/* Heading */}
        <div className="flex flex-col gap-4 sm:gap-6 items-center">
          <div className="flex flex-col gap-4 sm:gap-8 items-center">
            <div className="flex gap-2 font-inter-tight font-medium items-center justify-center whitespace-nowrap"
              style={{ fontSize: 'clamp(14px, 1.1vw, 18px)', lineHeight: 1.35, letterSpacing: '-0.02em' }}>
              <span style={{ color: 'var(--black-800)' }}>6.0</span>
              <span style={{ color: 'var(--black-900)' }}>Вопросы и ответы</span>
            </div>
            <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
              style={{ fontSize: 'clamp(2.25rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em', backgroundImage: 'linear-gradient(139.406deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)', maxWidth: 1000 }}>
              Частые вопросы
            </h2>
          </div>
          <p className="font-inter-tight font-medium text-center"
            style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.02em', maxWidth: 570 }}>
            Если вопроса здесь нет — напишите, ответим лично.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4 items-center w-full">
          {QUESTIONS.map(({ q, a }, i) => {
            const open = openIndex === i
            return (
              <div key={q}
                className="w-full rounded-[24px] overflow-hidden"
                style={{ background: 'var(--black-300)', maxWidth: 710 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex items-center justify-between gap-4 w-full text-left p-4 sm:p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <h3 className="font-inter-tight font-semibold text-white"
                    style={{ fontSize: 'clamp(1.0625rem, 1.4vw, 1.25rem)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                    {q}
                  </h3>
                  <ToggleIcon open={open} />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="font-inter-tight font-medium px-4 sm:px-6 pb-4 sm:pb-6"
                        style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.02em' }}>
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
