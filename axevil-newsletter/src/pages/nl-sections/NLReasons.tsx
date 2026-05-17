import { scrollToNLForm } from './NLNav'
import OwnButton from './OwnButton'

const CARDS = [
  { num: '1.0', title: 'События которые меняют картину рынка — раз в неделю', body: 'Переоценки, тендер-оферы, рейтинги secondary, новые раунды — то, что не покрывается публичной прессой.', statBig: '200+ компаний', statSub: 'в систематическом покрытии · weekly update' },
  { num: '2.0', title: 'Готовый брифинг\nвместо ручной сборки', body: '5 минут чтения, и вы видите картину рынка за неделю.', statBig: '~3.5 ч / неделю', statSub: 'экономия по опросу WM-партнёров' },
  { num: '3.0', title: 'Без скрытых условий,\nотписка в 1 клик', body: 'Эта подписка — наш способ познакомить вас с экспертизой Axevil. Не понравится — одна кнопка в любом из писем.', statBig: '0 ₽ · 1 клик', statSub: 'бесплатно · отписка одной кнопкой' },
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
              <span style={{ color: '#404040' }}>4.0</span>
              <span style={{ color: '#848484' }}>Почему подписаться</span>
            </div>
            <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
              style={{ fontSize: 'clamp(2.25rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em', backgroundImage: 'linear-gradient(139.406deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)', maxWidth: 1000 }}>
              3 причины подписаться
            </h2>
          </div>
          <p className="font-inter-tight font-medium text-center"
            style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: '#bcbcbc', letterSpacing: '-0.02em', maxWidth: 570 }}>
            Без обещаний доходностей. Только польза → цифра → источник.
          </p>
        </div>

        {/* Cards + CTA */}
        <div className="flex flex-col gap-4 sm:gap-6 items-center w-full">
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-stretch justify-center w-full overflow-hidden">
            {CARDS.map((card) => (
              <div key={card.num}
                className="flex flex-col p-4 sm:p-6 rounded-[24px] overflow-hidden w-full sm:flex-1"
                style={{ background: '#111111', gap: 'clamp(24px, 2.2vw, 32px)' }}
              >
                {/* Number */}
                <p className="font-inter-tight font-medium whitespace-nowrap shrink-0"
                  style={{ fontSize: 'clamp(14px, 1.1vw, 18px)', lineHeight: 1.35, letterSpacing: '-0.02em', color: '#404040' }}>
                  {card.num}
                </p>

                {/* Content */}
                <div className="flex flex-col items-start justify-between flex-1 gap-4">
                  <div className="flex flex-col gap-2 items-start">
                    <h3 className="font-inter-tight font-semibold text-white whitespace-pre-line"
                      style={{ fontSize: 'clamp(1.25rem, 1.4vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', width: '100%' }}>
                      {card.title}
                    </h3>
                    <p className="font-inter-tight font-medium"
                      style={{ fontSize: 'clamp(0.875rem, 0.97vw, 1.125rem)', lineHeight: 1.35, color: '#bcbcbc', letterSpacing: '-0.02em', width: '100%' }}>
                      {card.body}
                    </p>
                  </div>

                  {/* Stat box — mobile: p-[16px] */}
                  <div className="flex flex-col gap-2 items-start p-4 rounded-2xl w-full shrink-0"
                    style={{ background: '#202020' }}>
                    <p className="font-inter-tight font-semibold text-white whitespace-nowrap"
                      style={{ fontSize: 'clamp(1rem, 1.25vw, 1.25rem)', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
                      {card.statBig}
                    </p>
                    <p className="font-inter-tight font-medium whitespace-nowrap"
                      style={{ fontSize: 'clamp(12px, 0.97vw, 14px)', lineHeight: 1.3, color: '#9b9b9b' }}>
                      {card.statSub}
                    </p>
                  </div>
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
