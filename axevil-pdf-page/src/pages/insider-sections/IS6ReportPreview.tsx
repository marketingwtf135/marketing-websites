import InsiderCtaBtn from '../../components/InsiderCtaBtn'

const TOC = [
  'IPO Pipeline 2026 — 22 companies on the watch-list',
  'Funding Rounds Q1 2026 — SpaceX, Anthropic, Databricks deep-dives',
  'Exits & M&A — Klarna, xAI / SpaceX merger, 5 other sales',
  'Sector Deep-Dives — AI Infrastructure, Defense Tech, Energy/Nuclear, Biotech, Climate, Cybersec',
  'Top Venture Sectors',
]

export default function IS6ReportPreview() {
  return (
    <section id="insider-report-preview" className="w-full bg-page-bg px-5 md:px-10 lg:px-[15rem] py-12 md:py-16 lg:py-[7.5rem]">
      <div className="mx-auto w-full max-w-[90rem] flex flex-col gap-10 md:gap-12">

        <div className="flex flex-col gap-4 items-start">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">6.0</span>
            <span className="opacity-80">Report preview</span>
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
            Inside the next report
          </h2>
          <p className="font-inter-tight font-medium text-text-l text-white/60">
            Preview what's inside Pre-IPO Insider Q2 2026 before subscribing.
          </p>
        </div>

        {/* Report card */}
        <div
          className="flex flex-col md:flex-row gap-8"
          style={{
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '1.5rem',
            padding: '2rem 1.75rem',
          }}
        >
          {/* Left — 50% */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            <div className="flex flex-col gap-3">
              <span
                className="font-inter-tight font-semibold self-start"
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#4dba79',
                  background: 'rgba(77,186,121,0.08)',
                  border: '1px solid rgba(77,186,121,0.2)',
                  borderRadius: '0.375rem',
                  padding: '0.25rem 0.625rem',
                }}
              >
                PDF · Q2 2026
              </span>
              <h3 className="font-inter-tight font-semibold text-white" style={{ fontSize: '1.375rem', lineHeight: 1.2 }}>
                Pre-IPO Insider Q2 2026
              </h3>
              <p className="font-inter-tight font-medium text-white/40 text-text-m">
                Full private markets review for Q2 2026 — IPO pipeline, funding rounds, exits, M&A, sector analysis.
              </p>
            </div>
            <div>
              <InsiderCtaBtn style={{ height: '3.25rem', fontSize: '1rem' }}>Get PDF</InsiderCtaBtn>
            </div>
          </div>

          {/* Dividers */}
          <div className="hidden md:block w-px self-stretch" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="md:hidden h-px w-full" style={{ background: 'rgba(255,255,255,0.08)' }} />

          {/* Right TOC — 50% */}
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <p className="font-inter-tight font-medium text-white/40" style={{ letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.75rem' }}>
              Table of contents
            </p>
            <div className="flex flex-col">
              {TOC.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-4"
                  style={{ borderBottom: i < TOC.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                >
                  <span className="font-inter-tight font-medium text-white/20 shrink-0" style={{ fontSize: '0.8125rem', minWidth: '1.5rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-inter-tight font-medium text-text-m text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
