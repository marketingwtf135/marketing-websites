const STEPS = [
  { num: '1.0', title: 'Подписываетесь', body: 'Email + имя + AUM bracket (optional). 30 секунд на форму.' },
  { num: '2.0', title: 'Welcome-выпуск', body: 'Вы получите последний отправленный выпуск сразу после подписки.' },
  { num: '3.0', title: 'Каждый вторник — выпуск', body: 'События недели + рейтинги + sector deep-dive + инвест-идеи.' },
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
              <span style={{ color: '#404040' }}>5.0</span>
              <span style={{ color: '#848484' }}>Как это работает</span>
            </div>
            <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
              style={{ fontSize: 'clamp(2.25rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em', backgroundImage: 'linear-gradient(139.406deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)', maxWidth: 1000 }}>
              3 шага до первого выпуска
            </h2>
          </div>
          <p className="font-inter-tight font-medium text-center"
            style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: '#bcbcbc', letterSpacing: '-0.02em', maxWidth: 570 }}>
            Отправим свежий выпуск рассылки сразу после подписки. Регулярные — каждый вторник.
          </p>
        </div>

        {/* Step cards — 1 column */}
        <div className="flex flex-col gap-4 items-center w-full overflow-hidden">
          {STEPS.map((step) => (
            <div key={step.num}
              className="flex flex-col p-4 sm:p-6 rounded-[24px] overflow-hidden w-full"
              style={{ background: '#111111', maxWidth: 710, gap: 'clamp(24px, 3.3vw, 48px)' }}
            >
              <p className="font-inter-tight font-medium whitespace-nowrap shrink-0"
                style={{ fontSize: 'clamp(14px, 1.1vw, 18px)', lineHeight: 1.35, letterSpacing: '-0.02em', color: '#404040' }}>
                {step.num}
              </p>
              <div className="flex flex-col gap-4 items-start">
                <h3 className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(1.25rem, 1.67vw, 1.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', width: '100%' }}>
                  {step.title}
                </h3>
                <p className="font-inter-tight font-medium"
                  style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: '#bcbcbc', letterSpacing: '-0.02em', width: '100%' }}>
                  {step.body}
                </p>
              </div>
            </div>
          ))}
          {/* Footer note — 10px mobile, 12px desktop */}
          <p className="font-inter-tight font-medium text-center whitespace-nowrap"
            style={{ fontSize: 'clamp(10px, 0.83vw, 12px)', lineHeight: 1.3, color: '#9b9b9b' }}>
            Полный выпуск на почте каждый вторник в 9:00
          </p>
        </div>
      </div>
    </section>
  )
}
