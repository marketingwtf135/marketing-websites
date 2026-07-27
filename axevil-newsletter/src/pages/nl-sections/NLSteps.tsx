/**
 * Three steps, each with the time it costs (client feedback 2026-07-23: "отличный ход,
 * оставить. Добавить время: «email (10 сек) → подтвердить (30 сек) → первый выпуск…»").
 * The cadence stays вторник, as everywhere else on the page — see the report note.
 */
const STEPS = [
  { num: '1.0', time: '10 секунд', title: 'Оставляете email', body: 'Email и — по желанию — телефон. Имя, должность и AUM можно указать позже, в форме внизу страницы.' },
  { num: '2.0', time: '30 секунд', title: 'Подтверждаете подписку', body: 'Письмо с подтверждением приходит сразу. Один клик — и адрес в списке.' },
  { num: '3.0', time: 'сразу после подтверждения', title: 'Первый выпуск', body: 'Последний вышедший выпуск приходит сразу, дальше — каждый вторник в 9:00.' },
]

export default function NLSteps() {
  return (
    <section id="nl-steps" className="relative w-full bg-page-bg">
      <div
        className="padding-section-t6-b12 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-0 flex flex-col gap-[clamp(2rem,3.3vw,3rem)] items-center"
      >
        {/* Heading */}
        <div className="flex flex-col gap-4 sm:gap-6 items-center">
          <div className="flex flex-col gap-4 sm:gap-8 items-center">
            <div className="flex gap-2 font-inter-tight font-medium items-center justify-center whitespace-nowrap"
              style={{ fontSize: 'clamp(14px, 1.1vw, 18px)', lineHeight: 1.35, letterSpacing: '-0.02em' }}>
              <span style={{ color: 'var(--black-800)' }}>5.0</span>
              <span style={{ color: 'var(--black-900)' }}>Как это работает</span>
            </div>
            <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
              style={{ fontSize: 'clamp(2.25rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em', backgroundImage: 'linear-gradient(139.406deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)', maxWidth: 1000 }}>
              3 шага до первого выпуска
            </h2>
          </div>
          <p className="font-inter-tight font-medium text-center"
            style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.02em', maxWidth: 570 }}>
            Отправим свежий выпуск рассылки сразу после подписки. Регулярные — каждый вторник.
          </p>
        </div>

        {/* Step cards — 1 column */}
        <div className="flex flex-col gap-4 items-center w-full overflow-hidden">
          {STEPS.map((step) => (
            <div key={step.num}
              className="flex flex-col p-4 sm:p-6 rounded-[24px] overflow-hidden w-full"
              style={{ background: 'var(--black-300)', maxWidth: 710, gap: 'clamp(24px, 3.3vw, 48px)' }}
            >
              {/* Number + how long this step takes */}
              <div className="flex items-center justify-between gap-3 shrink-0 w-full">
                <p className="font-inter-tight font-medium whitespace-nowrap"
                  style={{ fontSize: 'clamp(14px, 1.1vw, 18px)', lineHeight: 1.35, letterSpacing: '-0.02em', color: 'var(--black-800)' }}>
                  {step.num}
                </p>
                <p className="font-inter-tight font-semibold whitespace-nowrap rounded-full px-3 py-1"
                  style={{ fontSize: 'var(--font-xs)', lineHeight: 1.3, letterSpacing: '-0.01em', color: 'var(--status-open)', background: 'rgba(77,186,121,0.08)' }}>
                  {step.time}
                </p>
              </div>
              <div className="flex flex-col gap-4 items-start">
                <h3 className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(1.25rem, 1.67vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', width: '100%' }}>
                  {step.title}
                </h3>
                <p className="font-inter-tight font-medium"
                  style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: 'var(--white-300)', letterSpacing: '-0.02em', width: '100%' }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
          {/* Footer note — 10px mobile, 12px desktop */}
          <p className="font-inter-tight font-medium text-center whitespace-nowrap"
            style={{ fontSize: 'clamp(10px, 0.83vw, 12px)', lineHeight: 1.3, color: 'var(--white-400)' }}>
            Полный выпуск на почте каждый вторник в 9:00
          </p>
        </div>
      </div>
    </section>
  )
}
