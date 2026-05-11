/**
 * CS — "Why invest" — Figma 142:10664
 * 4 cards in 2×2 grid (720×400 each), border #151515, gap 0.
 * Header: eyebrow "5.0 Advantages" + h2 "Why invest" + right-side paragraph.
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
    img: '/img/ill/why-invest-ill-03.png',
    title: 'Real Revenue',
    body: 'Anthropic is seeing fast growth in paid enterprise users.',
  },
]

export default function CSWhyInvest() {
  return (
    <section className="w-full bg-page-bg" style={{ paddingTop: 'clamp(60px, 10vw, 120px)', paddingBottom: 'clamp(60px, 10vw, 120px)' }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-12 items-start">

        {/* ── Header: eyebrow + h2 left, paragraph right ── */}
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
                backgroundImage: 'linear-gradient(94.84deg, #ffffff 0.176%, #b7b7b7 98.822%)',
              }}
            >
              Why invest
            </h2>
          </div>
          <p
            className="font-inter-tight font-medium text-white/60 lg:max-w-[710px] whitespace-pre-wrap"
            style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', lineHeight: 1.35, letterSpacing: '-0.02em' }}
          >
            {"Anthropic’s value has grown as more businesses adopt Claude for their daily work. \nThis table shows how the estimated price has changed over the last few years."}
          </p>
        </div>

        {/* ── 2×2 grid of cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
          {CARDS.map((card) => (
            <div
              key={card.num}
              className="relative"
              style={{
                border: '1px solid #151515',
                height: 'clamp(360px, 28vw, 400px)',
                /* Safety First (card 2) keeps overflow visible so its side icons show.
                   Cards 1, 3, 4 use overflow:hidden — image stays at fixed 720×248
                   and gets cropped by the card frame on smaller viewports. */
                overflow: card.title === 'Safety First' ? 'visible' : 'hidden',
              }}
            >
              {/* Number — top-left, above all elements */}
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

              {card.title === 'Safety First' ? (
                /* Card 2 — natural style (centered, full width) */
                <img
                  src={card.img}
                  alt=""
                  aria-hidden="true"
                  className="object-contain"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: 'auto',
                    maxHeight: 'none',
                  }}
                  loading="lazy"
                />
              ) : (
                /* Cards 1, 3, 4 — fixed 720×248px, anchored to TOP of card, position: absolute */
                <img
                  src={card.img}
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    transform: 'translateX(-50%)',
                    width: '720px',
                    height: '248px',
                    objectFit: 'fill',
                  }}
                  loading="lazy"
                />
              )}

              {/* Title + description — anchored to bottom, stretches full frame width */}
              <div
                className="absolute flex flex-col gap-3"
                style={{ left: 24, right: 24, bottom: 24 }}
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
