import { analytics } from '../../lib/analytics'
import { scrollToNLForm } from './NLNav'
import OwnButton from './OwnButton'

/**
 * Три причины подписаться — что читатель получает, а не что лежит внутри продукта.
 *
 * Тексты от Павла через Татьяну (2026-08-21). Прежние формулировки были из ТЗ и описывали
 * пользу вообще; новые говорят про источник данных, полноту картины и динамику.
 *
 * Плашки с цифрой и источником под каждым описанием убраны той же правкой. Заодно закрылся
 * давний вопрос: источник был только у первой карточки («Опрос Axevil, 147 WM, май 2026»),
 * для двух других его не существовало ни в ТЗ, ни где-либо ещё, а подзаголовок обещал
 * формулу «польза → цифра → источник», которую блок не держал.
 */
const CARDS = [
  {
    num: '1.0',
    title: 'Данные, а не пересказ новостей',
    body: 'Основа выпуска — поток заявок на покупку и продажу, который проходит через вторичные рынки. Объёмы, стороны сделок и имена в таком срезе не публикуются в открытых источниках.',
  },
  {
    num: '2.0',
    title: 'Весь частный рынок в одном документе',
    body: 'Индекс, распределение заявок по секторам, вторичный рынок, новости и раунды — в одном письме. Вместо ленты источников и десятка вкладок.',
  },
  {
    num: '3.0',
    title: 'Динамика от недели к неделе',
    body: '200+ компаний в покрытии. Динамику видно не в одной точке, а в тренде: где интерес нарастает, а где разворачивается.',
  },
]

export default function NLReasons() {
  return (
    <section id="nl-reasons" className="relative w-full bg-page-bg">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-0 py-[60px] sm:py-[80px] lg:py-[100px] flex flex-col gap-[clamp(32px,3.3vw,48px)] items-center">

        {/* Heading */}
        <div className="flex flex-col gap-4 sm:gap-6 items-center">
          <div className="flex flex-col gap-4 sm:gap-8 items-center">
            <div className="flex gap-2 font-inter-tight font-medium items-center justify-center whitespace-nowrap"
              style={{ fontSize: 'clamp(14px, 1.1vw, 18px)', lineHeight: 1.35, letterSpacing: '-0.02em' }}>
              <span style={{ color: 'var(--black-800)' }}>3.0</span>
              <span style={{ color: 'var(--black-900)' }}>Почему подписаться</span>
            </div>
            <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
              style={{ fontSize: 'clamp(2.25rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em', backgroundImage: 'linear-gradient(139.406deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)', maxWidth: 1000 }}>
              3 причины подписаться
            </h2>
          </div>
          <p className="font-inter-tight font-medium text-center"
            style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.02em', maxWidth: 570 }}>
            Не обзор новостей: агрегированные рыночные данные и внутренняя аналитика платформы.
          </p>
        </div>

        {/* Cards + CTA */}
        <div className="flex flex-col gap-4 sm:gap-6 items-center w-full">
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-stretch justify-center w-full overflow-hidden">
            {CARDS.map((card) => (
              <div key={card.num}
                className="flex flex-col p-4 sm:p-6 rounded-[24px] overflow-hidden w-full sm:flex-1"
                style={{ background: 'var(--black-300)', gap: 'clamp(24px, 2.2vw, 32px)' }}
              >
                {/* Number */}
                <p className="font-inter-tight font-medium whitespace-nowrap shrink-0"
                  style={{ fontSize: 'clamp(14px, 1.1vw, 18px)', lineHeight: 1.35, letterSpacing: '-0.02em', color: 'var(--black-800)' }}>
                  {card.num}
                </p>

                {/* Content */}
                <div className="flex flex-col items-start flex-1 gap-2">
                    <h3 className="font-inter-tight font-semibold text-white whitespace-pre-line"
                      style={{ fontSize: 'clamp(1.25rem, 1.4vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', width: '100%' }}>
                      {card.title}
                    </h3>
                    <p className="font-inter-tight font-medium"
                      style={{ fontSize: 'clamp(0.875rem, 0.97vw, 1.125rem)', lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.02em', width: '100%' }}>
                      {card.body}
                    </p>
                </div>
              </div>
            ))}
          </div>

          <OwnButton onClick={() => { analytics.ctaClick('reasons'); scrollToNLForm() }} />
        </div>
      </div>
    </section>
  )
}
