import WBCtaButton from './WBCtaButton'

// Symbols as variables to keep file encoding clean
const SYM_ARR = '→'
const SYM_BULL = '·'
const SYM_DASH = '—'
const SYM_TIMES = '×'
const SYM_NDASH = '–'

const CARDS = [
  {
    photo: '/img/why-attend-01.png',
    metric: '$13T ' + SYM_ARR + ' $20T',
    metricSub: 'AUM 2025 ' + SYM_ARR + ' 2030F ' + SYM_BULL + ' Preqin',
    title: 'How private markets are evolving in 2026',
    body: "What's actually happening on the market " + SYM_DASH + " and what wealth managers should expect through the rest of the year.",
  },
  {
    photo: '/img/why-attend-02.png',
    metric: '89%',
    metricSub: 'of WMs learn private deals from media ' + SYM_BULL + ' Axevil survey, 2026',
    title: 'Access to private markets',
    body: 'What to watch for when entering a deal, and how competition for the best companies is reshaping who gets allocation.',
  },
  {
    photo: '/img/why-attend-03.png',
    metric: '2.4' + SYM_NDASH + '3.1' + SYM_TIMES,
    metricSub: 'Late-stage venture TVPI ' + SYM_BULL + ' vintage 2018' + SYM_NDASH + '2020 ' + SYM_BULL + ' Pitchbook NVCA',
    title: 'Sectors with hidden alpha ' + SYM_DASH + ' AI, fintech, deep tech',
    body: 'Where the real opportunities are this year, and which segments are crowded out or overpriced.',
  },
  {
    photo: '/img/why-attend-04.png',
    metric: '2' + SYM_TIMES,
    metricSub: 'Secondary volume growth 2020 ' + SYM_ARR + ' 2024 ' + SYM_BULL + ' Jefferies',
    title: 'How secondary markets make private companies liquid.',
    body: 'Why secondaries are rewriting the liquidity picture for private holdings ' + SYM_DASH + ' with real cases from the Axevil Capital portfolio.',
  },
]

export default function WBWhyAttend() {
  return (
    <section id="wb-why" className="relative w-full bg-page-bg">
      <div
        className="mx-auto w-full max-w-[1440px]"
        style={{ paddingTop: 'clamp(5rem, 10vw, 12.5rem)', paddingBottom: 0 }}
      >
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12 gap-4">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30">
            <span className="opacity-50">3.0</span>
            <span className="opacity-80">Why attend</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #b7b7b7 99.06%)',
              overflow: 'visible',
            }}
          >
            What you&#39;ll learn
          </h2>
        </div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 sm:mb-12">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="flex flex-col items-start"
              style={{
                width: '100%',
                maxWidth: '100%',
                padding: '4px 4px 24px 4px',
                gap: 24,
                borderRadius: 16,
                background: '#111111',
              }}
            >
              {/* Photo: height 280px, border-radius 16px */}
              <div
                className="relative w-full overflow-hidden flex items-center justify-center"
                style={{
                  height: 'clamp(12rem, 20vw, 17.5rem)',
                  alignSelf: 'stretch',
                  borderRadius: 16,
                }}
              >
                <img
                  src={card.photo}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: 'blur(2px)', transform: 'scale(1.05)' }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(0,0,0,0.35)' }}
                />
                {/* Metric pill: width 260px, padding 20px, flex-col, items-center, gap 12px */}
                <div
                  className="relative flex flex-col items-center text-center"
                  style={{
                    width: 260,
                    padding: 20,
                    gap: 12,
                    borderRadius: 12,
                    background: 'rgba(18,18,18,0.75)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <span
                    className="font-inter-tight font-semibold text-center"
                    style={{ color: '#ffffff', fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontWeight: 600, lineHeight: '110%', letterSpacing: '-0.48px' }}
                  >
                    {card.metric}
                  </span>
                  <span
                    className="font-inter-tight font-medium text-center"
                    style={{ color: '#9B9B9B', fontSize: '0.875rem', lineHeight: '130%' }}
                  >
                    {card.metricSub}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div
                className="flex flex-col items-start"
                style={{ padding: '0 20px', gap: 12, alignSelf: 'stretch' }}
              >
                <h3
                  className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', lineHeight: 1.25, letterSpacing: '-0.02em' }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-inter-tight font-medium text-white/55"
                  style={{ fontSize: '0.9375rem', lineHeight: 1.5 }}
                >
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pb-[80px] sm:pb-[100px]">
          <WBCtaButton label="Reserve your seat" />
        </div>
      </div>
    </section>
  )
}
