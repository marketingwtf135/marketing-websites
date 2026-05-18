import InsiderCtaBtn from '../../components/InsiderCtaBtn'

const QUOTES = [
  {
    quote: 'Pre-IPO Insider gives me in 2 minutes what used to take 4 hours across Bloomberg, Crunchbase, and LinkedIn.',
    caption: 'Family office · $80M AUM · Dubai',
  },
  {
    quote: 'Since adding 8% private markets exposure to client portfolios, performance is now 4.2% above benchmark.',
    caption: 'Independent advisor · London',
  },
  {
    quote: 'Insider gives me a ready client briefing every quarter.',
    caption: 'Private banker · Top-30 bank · UAE',
  },
]

export default function IS2SocialProof() {
  return (
    <section className="w-full bg-page-bg px-5 md:px-10 lg:px-[15rem] py-12 md:py-16 lg:py-[7.5rem]">
      <div className="mx-auto w-full max-w-[90rem] flex flex-col gap-10 md:gap-12">

        <h2
          className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
          style={{
            fontSize: 'clamp(2rem, 4vw, 4rem)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            backgroundImage: 'linear-gradient(93.581deg, #ffffff 0.176%, #b7b7b7 98.822%)',
          }}
        >
          Trusted by private markets professionals
        </h2>

        {/* Quote cards — 1 col mobile, 3 col md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUOTES.map((q) => (
            <div
              key={q.caption}
              className="flex flex-col"
              style={{
                background: '#141414',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.5rem',
                padding: '1.75rem 1.5rem',
                gap: '1.25rem',
              }}
            >
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" style={{ opacity: 0.3, flexShrink: 0 }}>
                <path d="M0 18V10.8C0 4.8 3.6 1.2 10.8 0l1.2 1.8C8.4 2.4 6 4.2 5.4 7.2H9V18H0ZM13.2 18V10.8C13.2 4.8 16.8 1.2 24 0l1.2 1.8c-3.6.6-6 2.4-6.6 5.4H22.2V18H13.2Z" fill="white"/>
              </svg>
              <p className="font-inter-tight font-medium text-text-l text-white/80 flex-1">{q.quote}</p>
              <p className="font-inter-tight font-medium text-text-m text-white/40">{q.caption}</p>
            </div>
          ))}
        </div>

        <p className="font-inter-tight font-medium text-text-m text-white/40 text-center">
          Top-30 banks · Single-family offices · Private banking groups
        </p>

        <div className="flex justify-center">
          <InsiderCtaBtn>Get Insider Report</InsiderCtaBtn>
        </div>

      </div>
    </section>
  )
}
