import WBCtaButton from './WBCtaButton'

const INSIGHTS = [
  {
    title: 'Private markets are the fastest-growing asset class of 2020–2030',
    benefit: 'In the webinar, you\'ll understand why capital is shifting from public markets into private markets — and how to participate in this trend rather than watch it from the sidelines.',
    metric: '$4.5T → $13T → $20T',
    description: 'Private markets AUM grew from $4.5T in 2020 to $13T in 2025. The forecast for 2030 is $20T, with a 9–11% CAGR.',
    source: 'Preqin · McKinsey · Bain',
  },
  {
    title: 'HNWI portfolios with pre-IPO exposure have historically outperformed public markets',
    benefit: 'We\'ll explain what private markets allocation makes sense for portfolios starting from $1M and how to build it step by step.',
    metric: '+10–15% annualized excess return',
    description: 'Hamilton Lane Private Markets Index shows 10–15% annualized excess return vs S&P 500. Cambridge Associates US Private Equity Index shows 14.2% net IRR vs 12.1% for the S&P 500 over 20 years.',
    source: 'Hamilton Lane · Cambridge Associates',
  },
  {
    title: '2026 mega-rounds create a window for HNWI investors',
    benefit: 'We\'ll show how HNWI investors access rounds in companies like SpaceX, Anthropic, Databricks, and OpenAI: minimum tickets, fund structures, timing, and SPV mechanics.',
    metric: 'SpaceX ~$1.25T',
    description: 'SpaceX, Anthropic, Databricks, OpenAI, and xAI are shaping a new cycle of late-stage private market opportunities.',
    source: 'Pitchbook · Bloomberg · TechCrunch',
  },
  {
    title: 'Exit events begin 12–18 months before the public news cycle',
    benefit: 'We\'ll show which signals Axevil tracks in advance — so clients can enter positions before public attention spikes instead of chasing the market after the fact.',
    metric: '2.4×–3.1× median TVPI',
    description: 'Late-stage venture funds from 2018–2020 vintages show a median TVPI of 2.4×–3.1×. In Axevil\'s watchlist, 6 out of 22 companies completed an IPO or M&A event within 12 months.',
    source: 'PitchBook · Cambridge Associates · Pre-IPO Insider',
  },
  {
    title: 'Information edge: see market movement earlier',
    benefit: '9 out of 10 wealth managers do not track private market events systematically and learn about them too late. The webinar shows how to build a 3-month research edge.',
    metric: '89%',
    description: '89% of surveyed Axevil WM partners learn about private market events from public media or clients, not from systematic research.',
    source: 'Axevil WM Survey · March 2026 · N=147',
  },
]

export default function WBWhyAttend() {
  return (
    <section id="wb-why" className="relative w-full bg-page-bg">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[80px] py-[64px] sm:py-[80px] lg:py-[100px]">

        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30 mb-4">
            <span className="opacity-50">2.0</span>
            <span className="opacity-80">Why attend</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text mb-5"
            style={{
              fontSize: 'clamp(36px, 3.5vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #8f8f8f 99.06%)',
              overflow: 'visible',
            }}
          >
            Why attend the webinar
          </h2>
          <p
            className="font-inter-tight font-medium text-white/50 text-text-m sm:text-text-l leading-[1.5]"
            style={{ maxWidth: '710px' }}
          >
            We'll break down private markets in plain language: where capital is moving, which opportunities are available to HNWI clients, and how wealth managers can avoid being late to key market events.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {INSIGHTS.map((ins) => (
            <div
              key={ins.title}
              className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8 p-6 sm:p-7 lg:p-8 rounded-[24px]"
              style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex flex-col gap-3 flex-1 min-w-0">
                <h3
                  className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: '20px', lineHeight: '120%', letterSpacing: '-0.4px', maxWidth: '600px' }}
                >
                  {ins.title}
                </h3>
                <p
                  className="font-inter-tight font-medium text-white/50 text-text-m leading-[1.55]"
                  style={{ maxWidth: '600px' }}
                >
                  {ins.benefit}
                </p>
              </div>

              {/* Metric box — 4px outer, 16px inner */}
              <div
                className="lg:w-[408px] shrink-0 rounded-[16px]"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '4px' }}
              >
                <div className="flex flex-col gap-3 rounded-[13px] h-full" style={{ padding: '16px' }}>
                  <div
                    className="font-inter-tight font-semibold leading-tight tracking-[-0.02em] text-white"
                    style={{ fontSize: 'clamp(18px, 2vw, 26px)' }}
                  >
                    {ins.metric}
                  </div>
                  <p className="font-inter-tight font-medium text-white/50 text-text-m leading-[1.5]">
                    {ins.description}
                  </p>
                  <p className="font-inter-tight font-medium text-white/25 text-text-m">
                    {ins.source}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 flex justify-center">
          <WBCtaButton />
        </div>
      </div>
    </section>
  )
}
