const CARDS = [
  {
    title: 'Wealth Managers / Private Banking',
    text: 'You structure client portfolios above $1M. In the webinar, we\'ll cover what private markets allocation makes sense and how to build it without common mistakes.',
    source: null,
  },
  {
    title: 'Family Offices',
    text: 'You manage capital for one or two families. Learn how 30%+ of U.S. family offices allocate into the $13T private markets ecosystem.',
    source: 'Preqin, 2025',
  },
  {
    title: 'Independent Capital Advisors',
    text: 'You need an alpha source for clients without building an internal pre-IPO research team. We\'ll show the access mechanics through U.S. SPV structures.',
    source: null,
  },
]

export default function WBWhoFor() {
  return (
    <section id="wb-who" className="relative w-full bg-page-bg">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[80px] py-[64px] sm:py-[80px] lg:py-[100px]">

        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30 mb-4">
            <span className="opacity-50">1.0</span>
            <span className="opacity-80">Audience</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(36px, 3.5vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #8f8f8f 99.06%)',
            }}
          >
            Who this webinar is for
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col gap-4 p-6 sm:p-7 rounded-[24px]"
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* h5 style: 24px / 600 / 120% / -0.48px */}
              <h3
                className="font-inter-tight font-semibold text-white"
                style={{ fontSize: '20px', lineHeight: '120%', letterSpacing: '-0.4px' }}
              >
                {card.title}
              </h3>
              <p className="font-inter-tight font-medium text-white/55 text-text-m leading-[1.5] flex-1">
                {card.text}
              </p>
              {card.source && (
                <p className="font-inter-tight font-medium text-white/25 text-text-s-med">
                  Source: {card.source}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
