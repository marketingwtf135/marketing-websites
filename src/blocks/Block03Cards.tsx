// Each card frame uses a vertical gradient stroke that brightens at the top
// (matching Figma 64:4216 — white top bar + faint side-strokes that fade down).
const STROKE_GRADIENT =
  'linear-gradient(var(--page-bg), var(--page-bg)), linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)'
const STROKE_BORDER_STYLE: React.CSSProperties = {
  border: '1px solid transparent',
  backgroundImage: STROKE_GRADIENT,
  backgroundOrigin: 'padding-box, border-box',
  backgroundClip: 'padding-box, border-box',
}

export default function Block03Cards() {
  return (
    <section className="w-full bg-page-bg">
      <div className="relative mx-auto w-full max-w-content overflow-clip" style={{ height: '918px' }}>
        {/* Section heading — top-left of content area */}
        <div className="absolute flex flex-col gap-8 items-start whitespace-nowrap" style={{ left: 0, top: 0 }}>
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">2.0</span>
            <span className="opacity-80">Our advantages</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-h2 pb-2 text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(110.721deg, var(--neutral-00) 2.5635%, var(--neutral-40) 99.06%)' }}
          >
            Heading 2
          </h2>
        </div>

        {/* Card 01 — 150+ WM partners */}
        <div
          className="absolute flex flex-col bg-page-bg group"
          style={{ left: 0, top: '474px', width: '375px', height: '444px' }}
        >
          <div className="bg-white shrink-0 w-full" style={{ height: '10px' }} />
          <div className="flex flex-col flex-1 items-start justify-between p-6 relative overflow-hidden" style={STROKE_BORDER_STYLE}>
            <img alt="" src="/img/block03/gradient-image.png" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] pointer-events-none" />
            <div className="flex flex-col gap-4 items-start w-full relative">
              <p className="font-inter-tight font-medium text-h1-med text-white">150+</p>
              <p className="font-inter-tight font-medium text-text-xl text-white">WM partners</p>
            </div>
            <p className="font-inter-tight font-medium text-text-l text-white/60 relative">1.0</p>
          </div>
        </div>

        {/* Card 02 — 1000+ Investors */}
        <div
          className="absolute flex flex-col bg-page-bg group"
          style={{ left: '355px', top: '283px', width: '375px', height: '635px' }}
        >
          <div className="bg-white shrink-0 w-full" style={{ height: '10px' }} />
          <div className="flex flex-col flex-1 items-start justify-between p-6 relative overflow-hidden" style={STROKE_BORDER_STYLE}>
            <img alt="" src="/img/block03/gradient-image.png" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] pointer-events-none" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                maskImage: "url('/img/block03/card02-mask.svg')",
                WebkitMaskImage: "url('/img/block03/card02-mask.svg')",
                maskSize: '365px 749px',
                WebkitMaskSize: '365px 749px',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                opacity: 0.03,
                transform: 'rotate(45deg) scale(1.5)',
              }}
            >
              <img alt="" src="/img/block03/card02-mask-fill.png" className="absolute w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-4 items-start w-full relative">
              <p className="font-inter-tight font-medium text-h1-med text-white relative">1000+</p>
              <p className="font-inter-tight font-medium text-text-xl text-white relative">Investors</p>
            </div>
            <p className="font-inter-tight font-medium text-text-l text-white/60 relative">2.0</p>
          </div>
        </div>

        {/* Card 03 — 33 Portfolio companies */}
        <div
          className="absolute flex flex-col bg-page-bg group"
          style={{ left: '710px', top: '523px', width: '375px', height: '395px' }}
        >
          <div className="bg-white shrink-0 w-full" style={{ height: '10px' }} />
          <div className="flex flex-col flex-1 items-start justify-between p-6 relative overflow-hidden" style={STROKE_BORDER_STYLE}>
            <img alt="" src="/img/block03/gradient-image.png" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] pointer-events-none" />
            <div className="flex flex-col gap-4 items-start w-full relative">
              <p className="font-inter-tight font-medium text-h1-med text-white">33</p>
              <p className="font-inter-tight font-medium text-text-xl text-white">Portfolio companies</p>
            </div>
            <p className="font-inter-tight font-medium text-text-l text-white/60 relative">3.0</p>
          </div>
        </div>

        {/* Card 04 — $150M AUM (teal glow + bg-shine hover) */}
        <div
          className="absolute flex flex-col bg-page-bg overflow-clip group"
          style={{ left: '1065px', top: '169px', width: '375px', height: '749px' }}
        >
          {/* Glow background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              maskImage: "url('/img/block03/card04-mask.svg')",
              WebkitMaskImage: "url('/img/block03/card04-mask.svg')",
              maskSize: '375px 749px',
              WebkitMaskSize: '375px 749px',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          >
            <img alt="" src="/img/block03/card04-glow.png" className="absolute inset-0 w-full h-full object-bottom" />
          </div>

          {/* Ellipse glows */}
          <div
            className="absolute mix-blend-plus-lighter pointer-events-none"
            style={{ left: '164px', top: '-154px', width: '403px', height: '387px' }}
          >
            <img alt="" src="/img/block03/card04-ellipse1.svg" className="w-full h-full" style={{ transform: 'rotate(41.09deg)' }} />
          </div>
          <div
            className="absolute mix-blend-plus-lighter pointer-events-none"
            style={{ left: '-137px', top: '187px', width: '198px', height: '243px' }}
          >
            <img alt="" src="/img/block03/card04-ellipse2.svg" className="w-full h-full" style={{ transform: 'rotate(90deg)' }} />
          </div>

          <div className="bg-white shrink-0 w-full relative z-10" style={{ height: '10px' }} />
          <div className="flex flex-col flex-1 items-start justify-between p-6 relative z-10 overflow-clip" style={STROKE_BORDER_STYLE}>
            <img alt="" src="/img/block03/gradient-image.png" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-[1000ms] pointer-events-none" />
            <div className="flex flex-col gap-4 items-start w-full relative">
              <p className="font-inter-tight font-medium text-h1-med text-white mix-blend-hard-light">
                $150M
              </p>
              <p className="font-inter-tight font-medium text-text-xl text-white">
                AUM
              </p>
            </div>
            <p className="font-inter-tight font-medium text-text-l text-white/60">4.0</p>
          </div>
        </div>
      </div>
    </section>
  )
}
