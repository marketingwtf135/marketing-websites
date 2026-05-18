import InsiderCtaBtn from '../../components/InsiderCtaBtn'

const INSIGHTS = [
  {
    title: 'Private markets are a $13T market growing faster than public markets',
    text: 'With the subscription, you see key movements in one of the fastest-growing asset classes before they appear in public news cycles.',
    metric: '$4.5T → $13T → $20T',
    source: 'Preqin · McKinsey · Bain',
  },
  {
    title: 'Pre-IPO exposure has historically outperformed 60/40 portfolios',
    text: 'The subscription helps wealth professionals make better decisions about private market allocation in HNWI portfolios.',
    metric: '+10–15% annualized excess return',
    source: 'Cambridge Associates · Hamilton Lane',
  },
  {
    title: 'See market signals 12–18 months before the public cycle',
    text: 'Axevil tracks around 500 private companies so subscribers can see signals before the wider market reacts.',
    metric: '2.8× median multiple',
    source: 'Pitchbook · Bloomberg · Pre-IPO Insider Q1 2026',
  },
  {
    title: 'Access top deals through Axevil SPV structures',
    text: 'Subscribers get priority access to selected SPV rounds through Axevil App / Pro.',
    metric: '$25K–$50K minimum tickets',
    source: 'Axevil Capital · Reg D 506(b) · CRD #802-126907',
  },
  {
    title: 'Read by 1,000+ investors and WM partners',
    text: 'Join a cohort of professionals using Insider to work with HNWI clients across private markets.',
    metric: '1,000+ investors · 150+ WM partners · 6 countries',
    source: 'Axevil Capital metrics Q1 2026',
  },
]

export default function IS4WhySubscribe() {
  return (
    <section id="insider-why-subscribe" className="w-full bg-page-bg px-5 md:px-10 lg:px-[15rem] py-12 md:py-16 lg:py-[7.5rem]">
      <div className="mx-auto w-full max-w-[90rem] flex flex-col gap-10 md:gap-12">

        <div className="flex flex-col gap-4 items-start">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">4.0</span>
            <span className="opacity-80">Why subscribe</span>
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
            Why subscribe
          </h2>
          <p className="font-inter-tight font-medium text-text-l text-white/60" style={{ maxWidth: '35rem' }}>
            Get the market signals, numbers, and deal context wealth professionals need before they become public headlines.
          </p>
        </div>

        {/* Insight rows */}
        <div className="flex flex-col w-full">
          {INSIGHTS.map((ins, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-start gap-4 md:gap-0 py-6 md:py-8"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Left: metric — 50% on md+ */}
              <div className="flex flex-col gap-1 w-full md:w-1/2 md:pr-8">
                <p
                  className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.375rem)', lineHeight: 1.2 }}
                >
                  {ins.metric}
                </p>
                <p className="font-inter-tight font-medium text-white/30" style={{ fontSize: '0.75rem' }}>
                  {ins.source}
                </p>
              </div>
              {/* Right: title + text — 50% on md+ */}
              <div className="flex flex-col gap-3 w-full md:w-1/2">
                <h3 className="font-inter-tight font-semibold text-h5 text-white">{ins.title}</h3>
                <p className="font-inter-tight font-medium text-text-l text-white/60">{ins.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <InsiderCtaBtn>Subscribe</InsiderCtaBtn>
        </div>

      </div>
    </section>
  )
}
