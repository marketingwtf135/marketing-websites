const PRODUCTS = [
  {
    title: 'Pre-IPO Insider Report',
    label: 'Sent immediately after subscription',
    text: 'A full-year private markets report covering 2025 results and the 2026 outlook.',
    content: 'IPO pipeline · funding rounds · valuation shifts · exits & M&A · sector deep-dives · 2026 macro thesis',
  },
  {
    title: 'Quarterly Market Review',
    label: 'Sent immediately, then every quarter',
    text: 'Institutional analysis of the previous quarter across funding rounds, exits, sectors, and IPO pipeline updates.',
    content: 'SpaceX · Anthropic · Databricks · OpenAI · sector focus · watch-list rebalance',
  },
  {
    title: 'Weekly Top-Company Digest',
    label: 'Every Monday',
    text: 'A 5–10 minute weekly briefing on top private companies, active SPVs, valuations, exits, and market signals.',
    content: 'Raised · exits · valuations · M&A · SPV updates · monthly sector deep dive',
  },
  {
    title: 'Annual Market Report',
    label: 'Every January',
    text: 'A full-year review of private markets performance, sector outlooks, Axevil deal track record, and next-year watch-list.',
    content: 'Macro thesis · 6 sector outlooks · deal performance · hit-rate · top-50 watch-list',
  },
]

export default function IS3WhatYouGet() {
  return (
    <section id="insider-what-you-get" className="w-full bg-page-bg px-5 md:px-10 lg:px-[15rem] py-12 md:py-16 lg:py-[7.5rem]">
      <div className="mx-auto w-full max-w-[90rem] flex flex-col gap-10 md:gap-12">

        <div className="flex flex-col gap-4 items-start md:items-center text-left md:text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">3.0</span>
            <span className="opacity-80">Subscription</span>
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
            What you get in one subscription
          </h2>
          <p className="font-inter-tight font-medium text-text-l text-white/60" style={{ maxWidth: '32.5rem' }}>
            Four research products covering private markets from weekly signals to annual market outlooks.
          </p>
        </div>

        {/* 2×2 grid — 1 col mobile, 2 col md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUCTS.map((p) => (
            <div
              key={p.title}
              className="flex flex-col gap-5"
              style={{
                background: '#141414',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1.5rem',
                padding: '1.75rem 1.5rem',
              }}
            >
              <span
                className="font-inter-tight font-medium self-start"
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#4dba79',
                  background: 'rgba(77,186,121,0.08)',
                  border: '1px solid rgba(77,186,121,0.2)',
                  borderRadius: '0.375rem',
                  padding: '0.25rem 0.625rem',
                }}
              >
                {p.label}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="font-inter-tight font-semibold text-h5 text-white">{p.title}</h3>
                <p className="font-inter-tight font-medium text-text-m text-white/60">{p.text}</p>
              </div>
              <p className="font-inter-tight font-medium text-text-m text-white/30">{p.content}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
