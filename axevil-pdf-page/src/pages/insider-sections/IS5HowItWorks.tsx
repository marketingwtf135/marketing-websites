const STEPS = [
  {
    n: '1.0',
    title: 'Subscribe today',
    text: 'Enter your email and name. Within minutes, you receive two documents: Pre-IPO Insider Report and the latest quarterly market review.',
    when: 'Today',
  },
  {
    n: '2.0',
    title: 'Every Monday',
    text: 'Receive a weekly digest on top private companies. 5–10 minutes to read.',
    when: 'Weekly',
  },
  {
    n: '3.0',
    title: 'Every quarter',
    text: 'Get a new quarterly market review with funding rounds, exits, sector updates, and IPO pipeline changes.',
    when: 'Quarterly',
  },
  {
    n: '4.0',
    title: 'Every January',
    text: 'Receive the annual report with market review, sector outlook, Axevil deal performance, and next-year watch-list.',
    when: 'Annually',
  },
]

export default function IS5HowItWorks() {
  return (
    <section id="insider-how-it-works" className="w-full bg-page-bg px-5 md:px-10 lg:px-[15rem] py-12 md:py-16 lg:py-[7.5rem]">
      <div className="mx-auto w-full max-w-[90rem] flex flex-col gap-10 md:gap-12">

        <div className="flex flex-col gap-4 items-start md:items-center text-left md:text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">5.0</span>
            <span className="opacity-80">How it works</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(93.581deg, #ffffff 0.176%, #b7b7b7 98.822%)',
            }}
          >
            How it works
          </h2>
          <p className="font-inter-tight font-medium text-text-l text-white/60" style={{ maxWidth: '32.5rem' }}>
            Subscribe once. Receive the first reports immediately, then stay updated every week, quarter, and year.
          </p>
        </div>

        {/* 1 col mobile → 2 col md → 4 col lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="flex flex-col gap-5"
              style={{
                background: '#141414',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.5rem',
                padding: '1.75rem 1.5rem',
              }}
            >
              {/* Step label — "1.0" style */}
              <div className="flex gap-1 items-center font-inter-tight font-medium text-text-l text-neutral-30">
                <span className="opacity-50">{step.n}</span>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <span
                  className="font-inter-tight font-medium self-start"
                  style={{
                    fontSize: '0.75rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.375rem',
                    padding: '0.25rem 0.625rem',
                  }}
                >
                  {step.when}
                </span>
                <h3 className="font-inter-tight font-semibold text-h5 text-white">{step.title}</h3>
                <p className="font-inter-tight font-medium text-text-m text-white/60">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
