/** Block 08 — "Best Venture Practices" — Figma 114:466
 *  2×2 grid, gap:0, border #1A1A1A
 *  Card 1 (TL): border-top + border-left
 *  Card 2 (TR): border-top + border-left + border-right  (no bottom)
 *  Card 3 (BL): border-top + border-left + border-bottom (no right)
 *  Card 4 (BR): all 4 sides
 */

const B = '1px solid #1A1A1A'

const CARDS: {
  img: string; title: string; body: string;
  border: React.CSSProperties; imgStyle?: React.CSSProperties;
}[] = [
  {
    img: '/img/ill/ill-legal-01.png',
    title: 'SPV-Based Ownership',
    body: 'SPV structure enables direct ownership of portfolio company shares. Each investment is isolated in a dedicated entity, protecting capital and limiting liability.',
    border: { borderTop: B, borderLeft: B } satisfies React.CSSProperties,
  },
  {
    img: '/img/ill/ill-legal-02.png',
    title: 'Delaware Jurisdiction',
    body: 'The fund and Axevil Capital are registered in Delaware, USA — the preferred jurisdiction for most U.S. startups and venture capital funds, known for its investor-friendly corporate law.',
    border: { borderTop: B, borderLeft: B, borderRight: B } satisfies React.CSSProperties,
    /* Figma 142-25457: image at x=280,y=-73,w=486,h=331 within 720×400 card */
    imgStyle: { top: '-73px', right: '-46px', width: '486px', height: '331px' },
  },
  {
    img: '/img/ill/ill-legal-03.png',
    title: 'SEC-Compliant Structure',
    body: 'Axevil Capital LLC is registered with the SEC as an Exempt Reporting Adviser (ERA), ensuring regulatory transparency and compliance with U.S. securities law.',
    border: { borderTop: B, borderLeft: B, borderBottom: B } satisfies React.CSSProperties,
  },
  {
    img: '/img/ill/ill-legal-04.png',
    title: 'Dual-Layer Verification',
    body: 'We verify both the investment case and transaction execution — assessing company fundamentals, deal documentation, transfer mechanics, and seller legitimacy.',
    border: { border: B } satisfies React.CSSProperties,
  },
]

export default function Block08Section() {
  return (
    <section className="w-full bg-page-bg" style={{ paddingTop: 'clamp(3.75rem, 7.5vw, 7.5rem)', paddingBottom: 'clamp(3.75rem, 7.5vw, 7.5rem)' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col gap-16 items-center">

        {/* Heading */}
        <div className="flex flex-col gap-8 items-center text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">7.0</span>
            <span className="opacity-80">Everything is legal</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
            style={{ backgroundImage: 'linear-gradient(94deg, #A2A2A2 4.07%, #FFF 49.51%, #A2A2A2 94.94%)', fontSize: 'clamp(1.75rem, 4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
          >
            Best Venture Practices<br />for Investor Capital Protection.
          </h2>
          <p className="font-inter-tight font-medium text-text-xl text-white/60 text-center" style={{ maxWidth: '28.75rem' }}>
            A technology platform for private equity —<br />for professional investors and wealth managers.
          </p>
        </div>

        {/* 2×2 grid, gap:0 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full" style={{ gap: 0 }}>
          {CARDS.map((card) => {
            const isDelaware = card.title === 'Delaware Jurisdiction'

            if (isDelaware) {
              /* Card 2 — image position:absolute, 100% width, 400px height fills the card */
              return (
                <div
                  key={card.title}
                  className="relative overflow-hidden"
                  style={{ height: '25rem', ...card.border }}
                >
                  <img
                    alt={card.title}
                    src={card.img}
                    className="absolute top-0 left-0 object-cover"
                    style={{ width: '100%', height: '25rem' }}
                    loading="lazy"
                  />
                  <div
                    className="absolute left-0 right-0 bottom-0 flex flex-col gap-3 z-10"
                    style={{ padding: '1rem 1.5rem 1.5rem' }}
                  >
                    <h3 className="font-inter-tight font-semibold text-h5 text-white">{card.title}</h3>
                    <p className="font-inter-tight font-medium text-text-m text-white/60">{card.body}</p>
                  </div>
                </div>
              )
            }

            /* Cards 1, 3, 4 — image 100% width, 225px fixed height */
            return (
              <div
                key={card.title}
                className="flex flex-col"
                style={{ padding: '1.5rem', gap: '1.5rem', height: '25rem', ...card.border }}
              >
                <img
                  alt={card.title}
                  src={card.img}
                  className="rounded-xl object-cover w-full shrink-0"
                  style={{ height: '14.0625rem' }}
                  loading="lazy"
                />
                <div className="flex flex-col gap-3">
                  <h3 className="font-inter-tight font-semibold text-h5 text-white">{card.title}</h3>
                  <p className="font-inter-tight font-medium text-text-m text-white/60">{card.body}</p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
