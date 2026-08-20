import { analytics } from '../../lib/analytics'
import { scrollToNLForm } from './NLNav'
import NLSectionMock from './NLSectionMock'
import OwnButton from './OwnButton'

// Unified description size (matches NLAbout and whole page)
const DESC_SIZE = 'clamp(0.875rem, 1.25vw, 1.125rem)'

/** Текст под заголовком карточки — на ступень мельче общего: карточек пять, и при общем
 *  размере блок читался как сплошная стена. */
const CARD_TEXT_SIZE = 'clamp(0.8125rem, 1.05vw, 1rem)'

/**
 * Пять разделов выпуска, каждый показан схемой того, как он устроен.
 *
 * Состав и тексты — от Павла (2026-08-06). До этого здесь было четыре раздела, придуманных
 * ещё на этапе ТЗ, и один из них обещал инструменты, которых в продукте нет. Теперь разделы
 * совпадают с реальным Private Markets Pulse: индекс, карта заявок, спрос и предложение,
 * баланс сторон, новости и раунды.
 *
 * Схемы намеренно без данных — см. NLSectionMock. Прежние миниатюры показывали
 * правдоподобные, но выдуманные значения; здесь показывать нечего, кроме формы раздела.
 */
const CARDS = [
  {
    num: '1.0',
    title: 'Axevil Pre-IPO Index',
    text: (
      <>
        Собственный индекс частного рынка и его динамика в сравнении<br className="hidden md:inline" />
        {' '}с публичным. Точка отсчёта, по которой видно движение рынка целиком,<br className="hidden md:inline" />
        {' '}а не отдельной компании.
      </>
    ),
    variant: 'index' as const,
  },
  {
    num: '2.0',
    title: 'Карта заявок по секторам',
    text: 'Как распределён недельный объём заявок между секторами — где концентрируется интерес инвесторов и куда он смещается.',
    variant: 'sectors' as const,
  },
  {
    num: '3.0',
    title: 'Спрос и предложение на вторичке',
    text: 'Объём заявок недели с разбивкой на покупку и продажу и имена, которые ведут обе стороны. Видно, куда идут деньги и где нарастает навес.',
    variant: 'supply' as const,
  },
  {
    num: '4.0',
    title: 'Баланс покупателей и продавцов',
    text: 'Компании, по которым за неделю заявки шли только в одну сторону. Односторонний спрос и односторонний выход быстрее всего показывают смену отношения к имени.',
    variant: 'balance' as const,
  },
  {
    num: '5.0',
    title: 'Новости и крупнейшие раунды',
    text: 'Отчётность и выручка, новые раунды, M&A, лицензии и релизы у частных компаний. Плюс крупнейшие раунды недели по размеру чека.',
    variant: 'news' as const,
    wide: true,
  },
]

export default function NLContents() {
  return (
    <section id="nl-contents" className="relative w-full">
      <div className="absolute inset-0 bg-[#060606] sm:hidden" aria-hidden />
      <div className="absolute inset-0 bg-page-bg hidden sm:block" aria-hidden />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-0 py-[3.75rem] sm:py-[5rem] lg:py-[6.25rem]">

        {/* Heading */}
        <div className="flex flex-col gap-[1rem] sm:gap-[1.5rem] items-start sm:items-center text-left sm:text-center mb-[2rem] sm:mb-[3rem] lg:px-[5rem]">
          <div className="flex gap-[0.5rem] font-inter-tight font-medium items-center whitespace-nowrap"
            style={{ fontSize: DESC_SIZE, lineHeight: 1.35, letterSpacing: '-0.36px' }}>
            <span style={{ color: 'var(--black-800)' }}>2.0</span>
            <span style={{ color: 'var(--black-900)' }}>Состав выпуска</span>
          </div>
          <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2.25rem, 4.4vw, 4rem)',
              lineHeight: 1, letterSpacing: '-0.02em', overflow: 'visible',
              backgroundImage: 'linear-gradient(127.603deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)',
            }}>
            Что в каждом выпуске
          </h2>
          <p className="font-inter-tight font-medium"
            style={{ fontSize: DESC_SIZE, lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.02em', maxWidth: '35.625rem' }}>
            Пять разделов каждую неделю.<br />
            Ниже — фрагменты выпуска от 19 августа.
          </p>
        </div>

        {/* 2×2, пятая карточка во всю ширину */}
        <div className="flex flex-col gap-[1.5rem] items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1rem] w-full">
            {CARDS.map((card) => (
              <div key={card.num}
                className={`relative flex flex-col p-[1rem] sm:p-[1.5rem] rounded-[1.5rem] overflow-hidden${
                  card.wide ? ' sm:col-span-2 sm:flex-row sm:items-center sm:gap-8' : ''}`}
                style={{
                  background: 'var(--black-300)',
                  // Широкой карточке высота не нужна: её схема короткая, и общий минимум
                  // оставлял внизу дыру. У остальных минимум чуть снижен по той же причине.
                  minHeight: card.wide ? undefined : 'clamp(17rem, 21vw, 20rem)',
                  gap: '0.75rem',
                }}
              >
                {/* В широкой карточке текст и схема стоят рядом, иначе схема из четырёх
                    строк растягивается на 1440 px и выглядит пустой. */}
                <div className={`flex flex-col gap-[0.75rem]${card.wide ? ' sm:flex-1 sm:min-w-0' : ''}`}>
                {/* Номер стоит внутри заголовка, а не отдельной колонкой справа */}
                <h3 className="font-inter-tight font-semibold text-white w-full"
                  style={{ fontSize: 'clamp(1.25rem, 1.67vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  <span style={{ color: 'var(--black-800)', marginRight: '0.25em' }}>{card.num}</span>{' '}{card.title}
                </h3>

                {/* Body */}
                <p className="font-inter-tight font-medium w-full"
                  style={{ fontSize: CARD_TEXT_SIZE, lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.02em' }}>
                  {card.text}
                </p>

                </div>

                {/* The section as it looks in the letter */}
                <NLSectionMock
                  variant={card.variant}
                  className={card.wide ? 'w-full mt-2 sm:mt-0 sm:flex-1 sm:min-w-0' : 'w-full flex-1 mt-2'}
                />
              </div>
            ))}
          </div>

          <OwnButton onClick={() => { analytics.ctaClick('contents'); scrollToNLForm() }} />
        </div>
      </div>
    </section>
  )
}
