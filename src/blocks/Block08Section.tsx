/** Block 08 — "Best Venture Practices" — Figma 114:466
 *  2×2 grid, gap:0, border #1A1A1A
 *  Card 1 (TL): border-top + border-left
 *  Card 2 (TR): border-top + border-left + border-right  (no bottom)
 *  Card 3 (BL): border-top + border-left + border-bottom (no right)
 *  Card 4 (BR): all 4 sides
 */

const B = '1px solid #1A1A1A'

const CARDS = [
  {
    img: '/img/ill-legal-01.png',
    title: 'SPV-Based Ownership',
    body: 'SPV structure enables direct ownership of portfolio company shares. Each investment is isolated in a dedicated entity, protecting capital and limiting liability.',
    border: { borderTop: B, borderLeft: B } satisfies React.CSSProperties,
  },
  {
    img: '/img/ill-legal-02.png',
    title: 'Delaware Jurisdiction',
    body: 'The fund and Axevil Capital are registered in Delaware, USA — the preferred jurisdiction for most U.S. startups and venture capital funds, known for its investor-friendly corporate law.',
    border: { borderTop: B, borderLeft: B, borderRight: B } satisfies React.CSSProperties,
  },
  {
    img: '/img/ill-legal-03.png',
    title: 'SEC-Compliant Structure',
    body: 'Axevil Capital LLC is registered with the SEC as an Exempt Reporting Adviser (ERA), ensuring regulatory transparency and compliance with U.S. securities law.',
    border: { borderTop: B, borderLeft: B, borderBottom: B } satisfies React.CSSProperties,
  },
  {
    img: '/img/ill-legal-04.png',
    title: 'Dual-Layer Verification',
    body: 'We verify both the investment case and transaction execution — assessing company fundamentals, deal documentation, transfer mechanics, and seller legitimacy.',
    border: { border: B } satisfies React.CSSProperties,
  },
]

export default function Block08Section() {
  return (
    <section className="w-full bg-page-bg" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-16 items-center">

        {/* Heading */}
        <div className="flex flex-col gap-8 items-center text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">8.0</span>
            <span className="opacity-80">Everything is legal</span>
          </div>
          <h2 className="font-inter-tight font-semibold text-h2 text-white text-center">
            Best Venture Practices<br />for Investor Capital Protection.
          </h2>
          <p className="font-inter-tight font-medium text-text-xl text-white/60 text-center" style={{ maxWidth: '460px' }}>
            A technology platform for private equity —<br />for professional investors and wealth managers.
          </p>
        </div>

        {/* 2×2 grid, gap:0, no fill, per-card borders */}
        <div className="grid grid-cols-2 w-full" style={{ gap: 0 }}>
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="flex flex-col"
              style={{ padding: '24px', gap: '24px', ...card.border }}
            >
              {/* Frame — illustration, no clip */}
              <div className="w-full rounded-xl" style={{ height: '225px' }}>
                <img
                  alt={card.title}
                  src={card.img}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* Text block */}
              <div className="flex flex-col gap-3">
                <h3 className="font-inter-tight font-semibold text-h5 text-white">{card.title}</h3>
                <p className="font-inter-tight font-medium text-text-m text-white/60">{card.body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
