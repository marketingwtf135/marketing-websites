import WBCtaButton from './WBCtaButton'

const WEBINAR_DATE = 'June 5, 2026'
const WEBINAR_TIME = '11:00 CET'

export default function WBHero() {
  return (
    <section
      id="wb-hero"
      className="relative w-full bg-page-bg flex flex-col"
      style={{ minHeight: '100svh', paddingTop: '64px' }}
    >
      <div
        className="absolute top-0 left-1/2 pointer-events-none"
        style={{
          transform: 'translateX(-50%)',
          width: '900px',
          height: '500px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 65%)',
        }}
      />

      <div
        className="relative flex-1 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[80px] flex flex-col items-center justify-center text-center"
        style={{ paddingTop: '20px', paddingBottom: 'clamp(60px, 10vw, 140px)' }}
      >
        <div className="flex flex-col items-center max-w-[1100px] w-full" style={{ gap: 'clamp(16px, 2vw, 20px)' }}>

          {/* Date badge — wraps gracefully on mobile */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-inter-tight font-medium text-center"
            style={{
              fontSize: '13px',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.04)',
              flexWrap: 'wrap',
            }}
          >
            <span
              className="rounded-full shrink-0"
              style={{
                width: 10,
                height: 10,
                background: '#4dba79',
                boxShadow: '0 0 6px #4dba79, 0 0 12px rgba(77,186,121,0.5)',
              }}
            />
            <span className="whitespace-nowrap">{WEBINAR_DATE} · {WEBINAR_TIME} · 60 min</span>
          </div>

          {/* H1 + subheadline */}
          <div className="flex flex-col items-center w-full" style={{ gap: '12px' }}>
            <h1
              className="font-inter-tight font-semibold leading-[1.1] tracking-[-0.02em] text-transparent bg-clip-text w-full"
              style={{
                fontSize: 'clamp(26px, 4vw, 64px)',
                backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #8f8f8f 99.06%)',
              }}
            >
              Private markets add +10–15% alpha to client portfolios. In this webinar, we'll show how HNWI portfolios capture it.
            </h1>
            <p className="font-inter-tight font-medium text-white/55 leading-[1.4]" style={{ maxWidth: '600px', fontSize: 'clamp(16px, 2vw, 20px)' }}>
              A private webinar for private banking managers, family offices, and independent capital advisors.
            </p>
          </div>

          {/* Speaker card — smaller padding on mobile */}
          <div
            className="flex flex-col items-center gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-4 rounded-[16px]"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-inter-tight font-semibold text-text-s-med text-white"
              style={{ background: '#1f1f1f', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              VS
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-inter-tight font-semibold text-white text-text-m">Vladislav Solovyov</span>
              <span className="font-inter-tight font-medium text-white/50 text-text-s-med">Senior Investment Analyst, Axevil Capital</span>
            </div>
          </div>

          {/* CTA — full width on mobile */}
          <div className="w-full sm:w-auto" style={{ marginTop: '8px' }}>
            <WBCtaButton fullWidthMobile />
          </div>

          {/* Trust line — wraps cleanly on mobile */}
          <p
            className="font-inter-tight font-medium text-white/50 text-text-s-med sm:text-text-m tracking-wide"
            style={{ marginTop: '4px' }}
          >
            $150M AUM · 1,000+ investors · 33 portfolio companies
          </p>
        </div>
      </div>

      <div className="w-full" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
    </section>
  )
}
