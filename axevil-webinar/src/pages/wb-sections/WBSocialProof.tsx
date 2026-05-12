const QUOTES = [
  {
    text: 'Pre-IPO Insider gives me in 2 minutes what used to take 4 hours across Bloomberg, Crunchbase, and LinkedIn.',
    caption: 'Family office · $80M AUM · Dubai',
  },
  {
    text: 'Since 2024, we added 8% private markets exposure to client portfolios — performance is now 4.2% above benchmark.',
    caption: 'Independent advisor · London',
  },
  {
    text: 'Clients used to ask about SpaceX and I had no ready answer. Now I have a prepared briefing every quarter.',
    caption: 'Private banker · Top-30 bank · UAE',
  },
]

export default function WBSocialProof() {
  return (
    <section id="wb-proof" className="relative w-full bg-page-bg">
      <div className="mx-auto w-full max-w-[1440px] py-[64px] sm:py-[80px] lg:py-[100px]">

        {/* mb-6 = 24px before cards */}
        <div className="mb-6">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30 mb-4">
            <span className="opacity-50">6.0</span>
            <span className="opacity-80">Social proof</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2.25rem, 3.5vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #8f8f8f 99.06%)',
              overflow: 'visible',
            }}
          >
            What wealth managers say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUOTES.map((q) => (
            <div
              key={q.caption}
              className="flex flex-col justify-between gap-6 p-6 sm:p-7 rounded-[24px]"
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex flex-col gap-4">
                <div className="font-inter-tight font-semibold text-[32px] leading-none text-white/20" aria-hidden="true">
                  "
                </div>
                <p className="font-inter-tight font-medium text-white text-text-m sm:text-text-l leading-[1.55]">
                  {q.text}
                </p>
              </div>
              <p className="font-inter-tight font-medium text-white/35 text-text-s-med">
                {q.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
