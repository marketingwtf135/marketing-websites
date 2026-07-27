import { asset } from '../../lib/asset'

/**
 * Three roles, one concrete job each.
 *
 * The cards used to carry a generic "какие компании растут…" quote per role — true of
 * everyone, useful to no one (client feedback 2026-07-23: "описания общие. Конкретный
 * use-case per роль"). `useCase` is the client's own phrasing; `body` says how the issue
 * delivers it.
 *
 * Card icons — analytics → wealth manager, portfolio → family office, persons → banker.
 */
const CARDS = [
  {
    num: '1.0',
    icon: asset('/img/newsletter/big-icon-analytics.svg'),
    title: 'Wealth-менеджеры',
    useCase: 'Еженедельный апдейт для клиентских звонков',
    body: 'Во вторник утром у вас на руках лидерборд secondary, открывшиеся тендер-оферы и новые раунды — готовая повестка на неделю клиентских разговоров.',
  },
  {
    num: '2.0',
    icon: asset('/img/newsletter/big-icon-portfolio.svg'),
    title: 'Family offices',
    useCase: 'Мониторинг pre-IPO без штата аналитиков',
    body: '200+ частных компаний в систематическом покрытии: переоценки, раунды, смена мультипликаторов. Слежение за рынком, под которое не нужно нанимать отдельную команду.',
  },
  {
    num: '3.0',
    icon: asset('/img/newsletter/big-icon-persons.svg'),
    title: 'Private bankers',
    useCase: 'Аргументарий для upsell-а pre-IPO обёрток',
    body: 'Цифры, сделки и контекст, на которые можно ссылаться в разговоре о структурных решениях: что изменилось за неделю и почему это повод вернуться к клиенту.',
  },
]

export default function NLAudience() {
  return (
    <section id="nl-audience" className="relative w-full bg-page-bg">
      {/* Mobile: pt-section-y 120px. Desktop: 200px top, 100px bottom (Figma). */}
      <div className="pt-section-y mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-0 pb-[3.75rem] sm:pb-[5rem] lg:pt-[12.5rem] lg:pb-[6.25rem]">

        {/* Heading — has inner padding on desktop */}
        <div className="flex flex-col gap-6 items-center mb-10 sm:mb-12 lg:px-[80px]">
          <div className="flex gap-2 font-inter-tight font-medium items-center whitespace-nowrap"
            style={{ fontSize: 'var(--font-l)', lineHeight: 1.35, letterSpacing: '-0.36px' }}>
            <span style={{ color: 'var(--black-800)' }}>1.0</span>
            <span style={{ color: 'var(--black-900)' }}>Кому полезен дайджест</span>
          </div>
          <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
            style={{
              fontSize: 'clamp(2.25rem, 4.4vw, 4rem)',
              lineHeight: 1, letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(103.344deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)',
              whiteSpace: 'pre-line',
            }}>
            {'Аналитика для тех, \nкто работает с частным рынком'}
          </h2>
          <p className="hidden md:block font-inter-tight font-medium text-center"
            style={{ fontSize: 'var(--font-l)', lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.36px', maxWidth: 580 }}>
            Один и тот же выпуск закрывает три разные задачи — в зависимости от того, с какой стороны стола вы работаете с частным рынком.
          </p>
        </div>

        {/* Cards — stacked on mobile, row on sm+, full 1440px on lg */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch overflow-hidden w-full lg:px-0">
          {CARDS.map((card) => (
            <div key={card.num}
              className="flex flex-col items-center overflow-hidden rounded-[24px] flex-1 min-w-0"
              style={{ background: 'var(--black-300)', minHeight: 'clamp(280px, 31.25vw, 450px)', paddingTop: 24, paddingBottom: 24, paddingLeft: 24, paddingRight: 24, gap: 32 }}
            >
              {/* Number — centered */}
              <p className="font-inter-tight font-medium text-center whitespace-nowrap shrink-0 w-full"
                style={{ fontSize: 'var(--font-l)', lineHeight: 1.35, letterSpacing: '-0.36px', color: 'var(--black-700)' }}>
                {card.num}
              </p>

              {/* Icon */}
              <img src={card.icon} alt="" loading="lazy" className="shrink-0 block"
                style={{ width: 'clamp(88px, 8.3vw, 120px)', height: 'clamp(88px, 8.3vw, 120px)' }} />

              {/* Role → the job it does → how it is delivered */}
              <div className="flex flex-col items-center justify-center flex-1 min-h-0 w-full gap-3">
                <h3 className="font-inter-tight font-semibold text-white text-center whitespace-pre-line w-full"
                  style={{ fontSize: 'clamp(1.25rem, 1.67vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {card.title}
                </h3>

                {/* The use-case sits in a chip so it reads as the card's promise, not as body copy */}
                <p className="font-inter-tight font-semibold text-white text-center w-full rounded-2xl px-4 py-3"
                  style={{ fontSize: 'clamp(0.9375rem, 1.1vw, 1.0625rem)', lineHeight: 1.25, letterSpacing: '-0.02em', background: 'var(--black-600)' }}>
                  {card.useCase}
                </p>

                <p className="font-inter-tight font-medium text-center w-full"
                  style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1rem)', lineHeight: 1.3, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.02em' }}>
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
