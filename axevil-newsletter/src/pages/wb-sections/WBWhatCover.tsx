const ITEMS = [
  {
    title: 'How much private markets exposure belongs in an HNWI portfolio',
    text: 'A framework adjusted for client age, liquidity needs, and tax structure.',
  },
  {
    title: 'How to evaluate a pre-IPO deal',
    text: 'A 7-point institutional checklist from an ex-SocGen analyst.',
  },
  {
    title: 'Access mechanics for top-tier deals',
    text: 'How allocations into SpaceX, Anthropic, and OpenAI are actually structured: SPVs, minimum tickets, and timing.',
  },
  {
    title: '2026 sector trends',
    text: 'AI Infrastructure, Defense, Energy/Nuclear, and Biotech: where real alpha exists and where the bubble risk is.',
  },
  {
    title: 'Client portfolio case studies',
    text: '3 breakdowns: a $50M family office, a $20M independent advisor book, and a private banker from a large bank.',
  },
]

export default function WBWhatCover() {
  return (
    <section id="wb-agenda" className="relative w-full bg-page-bg">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[80px] py-[64px] sm:py-[80px] lg:py-[100px]">

        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30 mb-4">
            <span className="opacity-50">3.0</span>
            <span className="opacity-80">Agenda</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(36px, 3.5vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #8f8f8f 99.06%)',
              overflow: 'visible',
            }}
          >
            What we'll cover
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="flex flex-col p-6 sm:p-7 rounded-[24px]"
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Number вЂ” 32px gap from content below */}
              <span className="font-inter-tight font-medium text-neutral-35 text-text-s-med tabular-nums" style={{ marginBottom: '32px' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {/* Content block */}
              <div className="flex flex-col gap-3">
                <h3
                  className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: '20px', lineHeight: '120%', letterSpacing: '-0.4px' }}
                >
                  {item.title}
                </h3>
                <p className="font-inter-tight font-medium text-white/55 text-text-m leading-[1.5]">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
