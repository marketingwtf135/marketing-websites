const CARDS = [
  {
    n: '1.0',
    title: 'Wealth managers & RIAs',
    text: "You're under pressure to differentiate beyond public ETFs. We'll show you a defensible private-markets sleeve you can introduce without overhauling your allocation model.",
    icon: '/img/audience-01.svg',
  },
  {
    n: '2.0',
    title: 'Family Offices',
    text: "You already know private markets work — the question is access, vehicle selection and vintage discipline. We'll walk through the approach used by mid-sized single-family offices.",
    icon: '/img/audience-02.svg',
  },
  {
    n: '3.0',
    title: 'Independent IFAs & EAMs',
    text: 'Add institutional-grade pre-IPO and venture access to your shelf — without $5M minimums or building infrastructure in-house.',
    icon: '/img/audience-03.svg',
  },
] as const

export default function WBWhoFor() {
  return (
    <section id="wb-who" className="relative w-full bg-page-bg">
      {/* py 200px top/bottom, 0 horizontal padding removed from inner */}
      <div
        className="mx-auto w-full max-w-[1440px]"
        style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
      >
        {/* Heading — centered */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 gap-4">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30">
            <span className="opacity-50">1.0</span>
            <span className="opacity-80">Audience</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #b7b7b7 99.06%)',
              overflow: 'visible',
            }}
          >
            Who this webinar is for
          </h2>
        </div>

        {/* 3 cards — height 450px, items centered, gap auto (justify-between) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CARDS.map(card => (
            <div
              key={card.title}
              className="flex flex-col items-center text-center justify-between md:h-[450px]"
              style={{
                padding: '1.25rem',
                borderRadius: 24,
                background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Number — text-align center */}
              <span
                className="font-inter-tight font-medium tabular-nums text-center w-full"
                style={{ fontSize: '1.125rem', lineHeight: '135%', letterSpacing: '-0.36px', color: '#303030' }}
              >
                {card.n}
              </span>

              {/* Icon — 128×128 */}
              <img
                src={card.icon}
                alt=""
                width={80}
                height={80}
                className="md:w-32 md:h-32"
                style={{ objectFit: 'contain' }}
              />

              {/* Title + body — text-align center */}
              <div className="flex flex-col items-center gap-4">
                <h3
                  className="font-inter-tight font-semibold text-white text-center"
                  style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', lineHeight: 1.2, letterSpacing: '-0.02em' }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-inter-tight font-medium text-white/55 text-center"
                  style={{ fontSize: '0.9375rem', lineHeight: 1.5 }}
                >
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
