import WBCtaButton from './WBCtaButton'

export default function WBSpeaker() {
  return (
    <section id="wb-speaker" className="relative w-full bg-page-bg">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[80px] py-[64px] sm:py-[80px] lg:py-[100px]">

        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30 mb-4">
            <span className="opacity-50">4.0</span>
            <span className="opacity-80">About</span>
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
            Speaker
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-start">
          {/* Speaker card вЂ” flex-1 to stretch */}
          <div
            className="flex flex-col gap-6 p-6 sm:p-8 rounded-[24px] w-full lg:flex-1"
            style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full shrink-0 flex items-center justify-center font-inter-tight font-semibold text-text-l text-white"
                style={{ background: '#1e1e1e', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                VS
              </div>
              <div>
                <div className="font-inter-tight font-semibold text-white text-text-l sm:text-text-xl">
                  Vladislav Solovyov
                </div>
                <div className="font-inter-tight font-medium text-white/50 text-text-m mt-0.5">
                  Senior Investment Analyst, Axevil Capital
                </div>
              </div>
            </div>

            <p className="font-inter-tight font-medium text-white/60 text-text-m leading-[1.55]">
              8+ years in private markets and equity research. Covers AI, Defense, and Energy sectors in Axevil's quarterly Pre-IPO Insider Report.
            </p>

            <div
              className="flex items-center gap-3 p-4 rounded-[14px]"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div
                className="w-8 h-8 rounded-[8px] shrink-0 flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                {/* Figma 249:3687 вЂ” document icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="1" width="12" height="14" rx="2" stroke="white" strokeOpacity="0.8" strokeWidth="1.2"/>
                  <path d="M5 5H11" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M5 8H11" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M5 11H9" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="font-inter-tight font-semibold text-white text-text-m">Pre-IPO Insider Report</div>
                <div className="font-inter-tight font-medium text-white/40 text-text-s-med">39 pages of institutional market analysis</div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <a href="#" className="font-inter-tight font-medium text-white/40 text-text-s-med hover:text-white/70 transition-colors underline underline-offset-2">
                Publication 1 →
              </a>
              <a href="#" className="font-inter-tight font-medium text-white/40 text-text-s-med hover:text-white/70 transition-colors underline underline-offset-2">
                Publication 2 →
              </a>
            </div>
          </div>

          {/* Expertise вЂ” flex-1 to stretch equally */}
          <div className="flex flex-col gap-4 w-full lg:flex-1">
            {[
              { label: 'Sectors covered', value: 'AI · Defense · Energy / Nuclear' },
              { label: 'Publication', value: 'Pre-IPO Insider Report — quarterly institutional analysis' },
              { label: 'Experience', value: '8+ years in private markets and equity research' },
              { label: 'Background', value: 'Ex-sell-side analyst, institutional coverage' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-1.5 p-5 rounded-[16px]"
                style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="font-inter-tight font-medium text-neutral-35 text-text-s-med uppercase tracking-wide">
                  {label}
                </span>
                <span className="font-inter-tight font-medium text-white text-text-m leading-[1.4]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 sm:mt-12 flex justify-center">
          <WBCtaButton />
        </div>
      </div>
    </section>
  )
}
