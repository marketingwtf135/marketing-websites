/**
 * CS — "Why invest" — Figma 142:10664
 */

const CARDS = [
  {
    num: '1.0',
    img: '/img/ill/why-invest-ill-01.png',
    title: 'Leading Tech',
    body: 'Claude often beats other models in coding and logic tests.',
  },
  {
    num: '2.0',
    img: '/img/ill/why-invest-ill-02.png',
    title: 'Safety First',
    body: 'Our "Constitutional AI" approach builds trust with big corporations.',
  },
  {
    num: '3.0',
    img: '/img/ill/why-invest-ill-03.png',
    title: 'Big Partners',
    body: 'Amazon and Google have already invested billions',
  },
  {
    num: '4.0',
    img: '/img/ill/why-invest-ill-04.png',
    title: 'Real Revenue',
    body: 'Company is seeing fast growth in paid enterprise users.',
  },
]

export default function CSWhyInvest() {
  return (
    <section className="w-full bg-page-bg" style={{ paddingTop: 'clamp(60px, 10vw, 120px)', paddingBottom: 'clamp(60px, 10vw, 120px)' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col gap-12 items-start">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8 w-full">
          <div className="flex flex-col gap-6 sm:gap-8 items-start">
            <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
              <span className="opacity-50">5.0</span>
              <span className="opacity-80">Advantages</span>
            </div>
            <h2
              className="font-inter-tight font-semibold text-transparent bg-clip-text"
              style={{
                fontSize: 'clamp(36px, 6vw, 64px)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                backgroundImage: 'linear-gradient(94deg, #A2A2A2 4.07%, #FFF 49.51%, #A2A2A2 94.94%)',
              }}
            >
              Why invest
            </h2>
          </div>
          <p
            className="font-inter-tight font-medium text-white/60 whitespace-pre-wrap"
            style={{ width: '710px', fontSize: 'clamp(16px, 1.6vw, 18px)', lineHeight: 1.35, letterSpacing: '-0.02em' }}
          >
            {"Anthropic's value has grown as more businesses adopt Claude for their daily work. \nThis table shows how the estimated price has changed over the last few years."}
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
          {CARDS.map((card) => (
            <div
              key={card.num}
              className="relative overflow-hidden"
              style={{
                border: '1px solid #151515',
                height: 'clamp(360px, 28vw, 400px)',
              }}
            >
              {/* Number */}
              <span
                className="font-inter-tight font-medium absolute"
                style={{
                  fontSize: 16,
                  lineHeight: 1.3,
                  letterSpacing: '-0.02em',
                  color: '#404040',
                  left: 23,
                  top: 23,
                  zIndex: 10,
                  pointerEvents: 'none',
                }}
              >
                {card.num}
              </span>

              {/* Illustration — absolute, 100% width, 25.625rem (410px) height */}
              <img
                src={card.img}
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
                loading="lazy"
              />

              {/* Title + description */}
              <div
                className="absolute flex flex-col gap-3"
                style={{ left: 24, right: 24, bottom: 24, zIndex: 5 }}
              >
                <h3
                  className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 24, lineHeight: 1.2, letterSpacing: '-0.02em' }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-inter-tight font-medium"
                  style={{ fontSize: 18, lineHeight: 1.35, letterSpacing: '-0.02em', color: '#9b9b9b' }}
                >
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
