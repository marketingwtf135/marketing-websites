import { analytics } from '../../lib/analytics'
import { scrollToNLForm } from './NLNav'
import NLIssuePreview from './NLIssuePreview'
import OwnButton from './OwnButton'

// Unified description size (matches NLAbout and whole page)
const DESC_SIZE = 'clamp(0.875rem, 1.25vw, 1.125rem)'

/**
 * Four sections of an issue, each shown as the section itself.
 *
 * Was: title + body + a decorative 3D icon bleeding out of the card corner. The icons
 * were abstract and interchangeable (client feedback 2026-07-23: "заменить на реальные
 * скриншоты разделов из последнего выпуска") — the card now carries a miniature of the
 * section as it arrives in the inbox. See NLIssuePreview for the swap-in-real-screenshots
 * note.
 */
const CARDS = [
  {
    num: '1.0',
    title: 'События недели',
    text: 'Переоценки, тендер-оферы, новые раунды, M&A. Короткий контекстный разбор: что произошло, как это меняет картину сектора.',
    variant: 'events' as const,
  },
  {
    num: '2.0',
    title: 'Рейтинги и лидеры',
    text: 'Топ роста и топ падения на secondary за неделю. Кто переоценился вверх, кто вниз, на сколько, с каким объёмом сделок.',
    variant: 'ratings' as const,
  },
  {
    num: '3.0',
    title: 'Инструменты для управляющих капиталом',
    text: 'От трекера доходности частных компаний до составления демо-портфеля для ваших клиентов.',
    variant: 'tools' as const,
  },
  {
    num: '4.0',
    title: 'Новые инвест-идеи',
    text: '2–3 идеи от команды Axevil. Что появилось в pipeline, почему сейчас, на что обратить внимание.',
    variant: 'ideas' as const,
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
            Что в каждом выпуске
          </h2>
          <p className="font-inter-tight font-medium"
            style={{ fontSize: DESC_SIZE, lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.02em', maxWidth: '35.625rem' }}>
            Четыре раздела, которые приходят каждую среду — ниже фрагменты из последнего выпуска.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="flex flex-col gap-[1.5rem] items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1rem] w-full">
            {CARDS.map((card) => (
              <div key={card.num}
                className="relative flex flex-col p-[1rem] sm:p-[1.5rem] rounded-[1.5rem] overflow-hidden"
                style={{ background: 'var(--black-300)', minHeight: 'clamp(18.75rem, 24vw, 22.5rem)', gap: '0.75rem' }}
              >
                {/* Title + number on one row — the preview needs the vertical space */}
                <div className="flex items-start justify-between gap-4 w-full">
                  <h3 className="font-inter-tight font-semibold text-white"
                    style={{ fontSize: 'clamp(1.25rem, 1.67vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                    {card.title}
                  </h3>
                  <p className="font-inter-tight font-medium whitespace-nowrap shrink-0"
                    style={{ fontSize: DESC_SIZE, lineHeight: 1.35, letterSpacing: '-0.02em', color: 'var(--black-800)' }}>
                    {card.num}
                  </p>
                </div>

                {/* Body */}
                <p className="font-inter-tight font-medium w-full"
                  style={{ fontSize: DESC_SIZE, lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.02em' }}>
                  {card.text}
                </p>

                {/* The section as it looks in the letter */}
                <NLIssuePreview variant={card.variant} className="mt-auto w-full" />
              </div>
            ))}
          </div>

          <OwnButton onClick={() => { analytics.ctaClick('contents'); scrollToNLForm() }} />
        </div>
      </div>
    </section>
  )
}
