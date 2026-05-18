import InsiderCtaBtn from '../../components/InsiderCtaBtn'

export default function IS1Hero() {
  return (
    <section className="relative w-full bg-page-bg overflow-hidden">
      <div className="mx-auto w-full max-w-[90rem] flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-16 px-5 md:px-10 lg:px-0 py-12 md:py-16 lg:py-[7.5rem]">

        {/* Left: text */}
        <div className="flex flex-col gap-6 md:gap-8 items-start w-full lg:max-w-[40rem]">

          {/* Eyebrow */}
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-80">Axevil Insider</span>
          </div>

          {/* H1 */}
          <h1
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(104.211deg, #ffffff 2.56%, #8f8f8f 99.06%)',
            }}
          >
            Get institutional private markets analytics every week
          </h1>

          {/* Subheadline */}
          <p className="font-inter-tight font-medium text-text-l text-white/60" style={{ maxWidth: '33.75rem' }}>
            Pre-IPO Insider Report: full 2025 market review + 2026 outlook · quarterly market review · weekly top-company digest · annual report. Built for wealth managers, family offices, and accredited HNWI.
          </p>

          {/* CTA */}
          <InsiderCtaBtn>Subscribe and get PDF</InsiderCtaBtn>

          {/* Trust line */}
          <p className="font-inter-tight font-medium text-text-m text-white/40">
            $150M AUM · 1,000+ investors · 33 portfolio companies
          </p>
        </div>

        {/* Right: PDF mockup card — tablet + desktop only */}
        <div
          className="hidden md:flex flex-col shrink-0 w-full lg:w-auto"
          style={{
            maxWidth: '22.5rem',
            borderRadius: '1.5rem',
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '2rem 1.75rem',
            gap: '1.25rem',
          }}
        >
          {/* Report header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span
                className="font-inter-tight font-semibold text-white"
                style={{ fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.4 }}
              >
                Axevil Capital
              </span>
              <p className="font-inter-tight font-semibold text-white" style={{ fontSize: '1.25rem', lineHeight: 1.2 }}>
                Pre-IPO Insider Report
              </p>
              <p className="font-inter-tight font-medium text-white/40" style={{ fontSize: '0.875rem' }}>
                Q1 2026 · Full-year review + 2026 outlook
              </p>
            </div>
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '0.75rem',
                background: 'rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="2" width="10" height="13" rx="2" stroke="white" strokeOpacity="0.6" strokeWidth="1.5"/>
                <path d="M6 6h6M6 9h6M6 12h4" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M13 2v4h4" stroke="white" strokeOpacity="0.4" strokeWidth="1.2"/>
              </svg>
            </div>
          </div>

          <div style={{ height: '0.0625rem', background: 'rgba(255,255,255,0.08)' }} />

          {/* TOC */}
          <div className="flex flex-col gap-2">
            {['IPO Pipeline 2026','Funding Rounds Q1 2026','Exits & M&A — Klarna, xAI','Sector Deep-Dives (6)','Top Venture Sectors'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div style={{ width: '0.25rem', height: '0.25rem', borderRadius: '0.125rem', background: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                <span className="font-inter-tight font-medium text-white/60" style={{ fontSize: '0.875rem' }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ height: '0.0625rem', background: 'rgba(255,255,255,0.08)' }} />

          <div className="flex items-center justify-between">
            <span className="font-inter-tight font-medium text-white/30" style={{ fontSize: '0.75rem' }}>SEC ERA · CRD #802-126907</span>
            <span className="font-inter-tight font-semibold" style={{ fontSize: '0.6875rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4dba79' }}>PDF</span>
          </div>
        </div>
      </div>
    </section>
  )
}
