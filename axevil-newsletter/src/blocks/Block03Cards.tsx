// Each card frame uses a vertical gradient stroke that brightens at the top
const STROKE_GRADIENT =
  'linear-gradient(var(--page-bg), var(--page-bg)), linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)'
const STROKE_BORDER_STYLE: React.CSSProperties = {
  border: '1px solid transparent',
  backgroundImage: STROKE_GRADIENT,
  backgroundOrigin: 'padding-box, border-box',
  backgroundClip: 'padding-box, border-box',
}

const MOBILE_CARDS = [
  { stat: '150+',  label: 'Wealth-manager partners',     num: '1.0' },
  { stat: '5+',    label: 'Years operating in pre-IPO',  num: '2.0' },
  { stat: '35',    label: 'Portfolio companies',          num: '3.0' },
  { stat: '$150M', label: 'AUM',                          num: '4.0' },
]

export default function Block03Cards() {
  return (
    <section
      className="w-full bg-page-bg"
      style={{
        paddingTop: 'clamp(3.75rem, 12.5vw, 12.5rem)',
        paddingBottom: 'clamp(3.125rem, 6.25vw, 6.25rem)',
        paddingLeft: '1.25rem',
        paddingRight: '1.25rem',
      }}
    >
      {/* ── Mobile / tablet layout (< 768px) ── */}
      <div className="md:hidden flex flex-col w-full">
        {/* Heading */}
        <div className="flex flex-col gap-6 items-start mb-8">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">2.0</span>
            <span className="opacity-80">Our advantages</span>
          </div>
          <h2
            className="font-inter-tight font-semibold pb-2 text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(94deg, #A2A2A2 2.09%, #FFF 49.02%, #A2A2A2 95.95%)',
              fontSize: 'clamp(2rem, 8vw, 4rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            Key Stats
          </h2>
        </div>

        {/* Stacked cards */}
        {MOBILE_CARDS.map((card) => (
          <div key={card.num} className="flex flex-col bg-page-bg group" style={{ height: 'clamp(160px, 40vw, 220px)' }}>
            <div className="bg-white shrink-0 w-full" style={{ height: '10px' }} />
            <div className="flex flex-col flex-1 items-start justify-between p-5 relative overflow-hidden" style={STROKE_BORDER_STYLE}>
              <img alt="" src="/img/block03/gradient-image.png" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 pointer-events-none" style={{ transition: 'opacity 0.8s ease-in-out' }} />
              <div className="flex flex-col gap-2 items-start w-full relative">
                <p
                  className="font-inter-tight font-medium text-white"
                  style={{ fontSize: 'clamp(2.5rem, 10vw, 5.5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
                >
                  {card.stat}
                </p>
                <p className="font-inter-tight font-medium text-text-xl text-white">{card.label}</p>
              </div>
              <p className="font-inter-tight font-medium text-text-l text-white/60 relative">{card.num}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop layout (≥ 768px) ── */}
      <div className="hidden md:block relative mx-auto w-full max-w-content overflow-clip" style={{ height: '918px' }}>
        {/* Section heading — top-left */}
        <div className="absolute flex flex-col gap-8 items-start whitespace-nowrap" style={{ left: 0, top: 0 }}>
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">2.0</span>
            <span className="opacity-80">Our advantages</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-h2 pb-2 text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(94deg, #A2A2A2 2.09%, #FFF 49.02%, #A2A2A2 95.95%)' }}
          >
            Key Stats
          </h2>
        </div>

        {/* Card 01 — 150+ */}
        <div className="absolute flex flex-col bg-page-bg group" style={{ left: 0, top: '474px', width: '375px', height: '444px' }}>
          <div className="bg-white shrink-0 w-full" style={{ height: '10px' }} />
          <div className="flex flex-col flex-1 items-start justify-between p-6 relative overflow-hidden" style={STROKE_BORDER_STYLE}>
            <img alt="" src="/img/block03/gradient-image.png" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 pointer-events-none" style={{ transition: 'opacity 0.8s ease-in-out' }} />
            <div className="flex flex-col gap-4 items-start w-full relative">
              <p className="font-inter-tight font-medium text-h1-med text-white">150+</p>
              <p className="font-inter-tight font-medium text-text-xl text-white">Wealth-manager partners</p>
            </div>
            <p className="font-inter-tight font-medium text-text-l text-white/60 relative">1.0</p>
          </div>
        </div>

        {/* Card 02 — 5+ */}
        <div className="absolute flex flex-col bg-page-bg group" style={{ left: '355px', top: '283px', width: '375px', height: '635px' }}>
          <div className="bg-white shrink-0 w-full" style={{ height: '10px' }} />
          <div className="flex flex-col flex-1 items-start justify-between p-6 relative overflow-hidden" style={STROKE_BORDER_STYLE}>
            <img alt="" src="/img/block03/gradient-image.png" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 pointer-events-none" style={{ transition: 'opacity 0.8s ease-in-out' }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              maskImage: "url('/img/block03/card02-mask.svg')",
              WebkitMaskImage: "url('/img/block03/card02-mask.svg')",
              maskSize: '365px 749px', WebkitMaskSize: '365px 749px',
              maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
              opacity: 0.03, transform: 'rotate(45deg) scale(1.5)',
            }}>
              <img alt="" src="/img/block03/card02-mask-fill.png" className="absolute w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-4 items-start w-full relative">
              <p className="font-inter-tight font-medium text-h1-med text-white relative">5+</p>
              <p className="font-inter-tight font-medium text-text-xl text-white relative">Years operating in pre-IPO</p>
            </div>
            <p className="font-inter-tight font-medium text-text-l text-white/60 relative">2.0</p>
          </div>
        </div>

        {/* Card 03 — 35 */}
        <div className="absolute flex flex-col bg-page-bg group" style={{ left: '710px', top: '523px', width: '375px', height: '395px' }}>
          <div className="bg-white shrink-0 w-full" style={{ height: '10px' }} />
          <div className="flex flex-col flex-1 items-start justify-between p-6 relative overflow-hidden" style={STROKE_BORDER_STYLE}>
            <img alt="" src="/img/block03/gradient-image.png" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 pointer-events-none" style={{ transition: 'opacity 0.8s ease-in-out' }} />
            <div className="flex flex-col gap-4 items-start w-full relative">
              <p className="font-inter-tight font-medium text-h1-med text-white">35</p>
              <p className="font-inter-tight font-medium text-text-xl text-white">Portfolio companies</p>
            </div>
            <p className="font-inter-tight font-medium text-text-l text-white/60 relative">3.0</p>
          </div>
        </div>

        {/* Card 04 — $150M */}
        <div className="absolute flex flex-col bg-page-bg overflow-clip group" style={{ left: '1065px', top: '169px', width: '375px', height: '749px' }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            maskImage: "url('/img/block03/card04-mask.svg')",
            WebkitMaskImage: "url('/img/block03/card04-mask.svg')",
            maskSize: '375px 749px', WebkitMaskSize: '375px 749px',
            maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
          }}>
            <img alt="" src="/img/block03/card04-glow.png" className="absolute inset-0 w-full h-full object-bottom" />
          </div>
          <div className="absolute mix-blend-plus-lighter pointer-events-none" style={{ left: '164px', top: '-154px', width: '403px', height: '387px' }}>
            <img alt="" src="/img/block03/card04-ellipse1.svg" className="w-full h-full" style={{ transform: 'rotate(41.09deg)' }} />
          </div>
          <div className="absolute mix-blend-plus-lighter pointer-events-none" style={{ left: '-137px', top: '187px', width: '198px', height: '243px' }}>
            <img alt="" src="/img/block03/card04-ellipse2.svg" className="w-full h-full" style={{ transform: 'rotate(90deg)' }} />
          </div>
          <div className="bg-white shrink-0 w-full relative z-10" style={{ height: '10px' }} />
          <div className="flex flex-col flex-1 items-start justify-between p-6 relative z-10 overflow-clip" style={STROKE_BORDER_STYLE}>
            <img alt="" src="/img/block03/gradient-image.png" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 pointer-events-none" style={{ transition: 'opacity 0.8s ease-in-out' }} />
            <div className="flex flex-col gap-4 items-start w-full relative">
              <p className="font-inter-tight font-medium text-h1-med text-white mix-blend-hard-light">$150M</p>
              <p className="font-inter-tight font-medium text-text-xl text-white">AUM</p>
            </div>
            <p className="font-inter-tight font-medium text-text-l text-white/60">4.0</p>
          </div>
        </div>
      </div>
    </section>
  )
}
