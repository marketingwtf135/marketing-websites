import { scrollToNLForm } from './NLNav'
import OwnButton from './OwnButton'

// Unified description size (matches NLAbout and whole page)
const DESC_SIZE = 'clamp(0.875rem, 1.25vw, 1.125rem)'

/**
 * Desktop positions from Figma 784-14212 (converted to rem, +20%).
 * Mobile positions from Figma 811-7341 (bottom-anchored).
 */
const CARDS = [
  {
    num: '1.0',
    title: 'События недели',
    text: 'Переоценки, тендер-оферы, новые раунды, M&A. Короткий контекстный разбор: что произошло, как это меняет картину сектора.',
    img: '/img/newsletter/icon-3d-news.png',
    // Desktop: right=-2.125rem, top=8.125rem, w=14.5625rem, h=15.8125rem
    desktop: { right: '-2.125rem', top: '8.125rem', width: '14.5625rem', height: '15.8125rem' },
    // Mobile: 150×150px, 20px lower → bottom=-2.25rem (-1rem - 1.25rem)
    mobile: { right: '-1rem', bottom: '-2.25rem', width: '9.375rem', height: '9.375rem' },
  },
  {
    num: '2.0',
    title: 'Рейтинги и лидеры',
    text: 'Топ роста и топ падения на secondary за неделю. Кто переоценился вверх, кто вниз, на сколько, с каким объёмом сделок. Лидерборд в каждом выпуске.',
    img: '/img/newsletter/icon-3d-graphic.png',
    // Desktop: right=-5.4375rem, top=8.125rem, w=18.625rem, h=16.4375rem
    desktop: { right: '-5.4375rem', top: '8.125rem', width: '18.625rem', height: '16.4375rem' },
    // Mobile: 150×150px, 20px lower → bottom=-2.25rem (-1rem - 1.25rem)
    mobile: { right: '-1rem', bottom: '-2.25rem', width: '9.375rem', height: '9.375rem' },
  },
  {
    num: '3.0',
    title: 'Инструменты для управляющих капиталом',
    text: 'От трекера доходности частных компаний до составления демо-портфеля для ваших клиентов.',
    img: '/img/newsletter/icon-3d-documents.png',
    // Desktop: right=-3.6875rem, top=7.75rem, w=15rem, h=16rem
    desktop: { right: '-3.6875rem', top: '7.75rem', width: '15rem', height: '16rem' },
    // Mobile: 150×150px, 20px lower → bottom=-2.75rem (-1.5rem - 1.25rem)
    mobile: { right: '-1.5rem', bottom: '-2.75rem', width: '9.375rem', height: '9.375rem' },
  },
  {
    num: '4.0',
    title: 'Новые инвест-идеи',
    text: '2–3 идеи от команды Axevil. Что появилось в pipeline, почему сейчас, на что обратить внимание.',
    img: '/img/newsletter/icon-3d-light.png',
    // Desktop: right=-3.4375rem, top=7.9375rem, w=14.625rem, h=15.3125rem
    desktop: { right: '-3.4375rem', top: '7.9375rem', width: '14.625rem', height: '15.3125rem' },
    // Mobile: 150×150px, 20px lower → bottom=-2.78125rem (-1.53125rem - 1.25rem)
    mobile: { right: '-1.53125rem', bottom: '-2.78125rem', width: '9.375rem', height: '9.375rem' },
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
            <span style={{ color: '#404040' }}>2.0</span>
            <span style={{ color: '#848484' }}>Состав выпуска</span>
          </div>
          <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2.25rem, 4.4vw, 4rem)',
              lineHeight: 1, letterSpacing: '-0.02em', overflow: 'visible',
              backgroundImage: 'linear-gradient(127.603deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)',
            }}>
            Что в каждом выпуске
          </h2>
          <p className="font-inter-tight font-medium"
            style={{ fontSize: DESC_SIZE, lineHeight: 1.35, color: '#bcbcbc', letterSpacing: '-0.02em', maxWidth: '35.625rem' }}>
            Систематический срез по событиям недели, динамика вторичного рынка, инвестиционные идеи и полезные инструменты для управляющих капиталом.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="flex flex-col gap-[1.5rem] items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1rem] w-full">
            {CARDS.map((card) => (
              <div key={card.num}
                className="relative flex flex-col p-[1rem] sm:p-[1.5rem] rounded-[1.5rem] overflow-hidden"
                style={{ background: '#111111', minHeight: 'clamp(16.25rem, 20.8vw, 18.75rem)' }}
              >
                {/* Title */}
                <h3 className="font-inter-tight font-semibold text-white w-full z-10 relative"
                  style={{ fontSize: 'clamp(1.25rem, 1.67vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {card.title}
                </h3>

                {/* Body */}
                <p className="font-inter-tight font-medium w-full z-10 relative flex-1 mt-[0.75rem]"
                  style={{ fontSize: DESC_SIZE, lineHeight: 1.35, color: '#bcbcbc', letterSpacing: '-0.02em' }}>
                  {card.text}
                </p>

                {/* Number */}
                <p className="font-inter-tight font-medium whitespace-nowrap z-10 relative mt-[1rem] shrink-0"
                  style={{ fontSize: DESC_SIZE, lineHeight: 1.35, letterSpacing: '-0.02em', color: '#404040' }}>
                  {card.num}
                </p>

                {/* Illustration — desktop: top-based (Figma 784-14212), mobile: bottom-based (811-7341) */}
                {/* Desktop */}
                <div className="absolute pointer-events-none hidden sm:block"
                  style={{ ...card.desktop } as React.CSSProperties}>
                  <img src={card.img} alt="" className="w-full h-full object-contain" loading="lazy" />
                </div>
                {/* Mobile */}
                <div className="absolute pointer-events-none sm:hidden"
                  style={{ ...card.mobile } as React.CSSProperties}>
                  <img src={card.img} alt="" className="w-full h-full object-contain" loading="lazy" />
                </div>
              </div>
            ))}
          </div>

          <OwnButton onClick={scrollToNLForm} />
        </div>
      </div>
    </section>
  )
}
