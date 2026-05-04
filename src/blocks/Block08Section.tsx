/** Block 08 — "Best Venture Practices for Investor Capital Protection."
 *  Figma 114:466 — 2×2 grid: SPV Ownership, Delaware, SEC, Dual-Layer
 */
const CARDS = [
  {
    img: '/img/ill-legal-01.png',
    title: 'SPV-Based Ownership',
    body: 'SPV structure enables direct ownership of portfolio company shares. Each investment is isolated in a dedicated entity, protecting capital and limiting liability.',
  },
  {
    img: '/img/ill-legal-02.png',
    title: 'Delaware Jurisdiction',
    body: 'The fund and Axevil Capital are registered in Delaware, USA — the preferred jurisdiction for most U.S. startups and venture capital funds, known for its investor-friendly corporate law.',
  },
  {
    img: '/img/ill-legal-03.png',
    title: 'SEC-Compliant Structure',
    body: 'Axevil Capital LLC is registered with the SEC as an Exempt Reporting Adviser (ERA), ensuring regulatory transparency and compliance with U.S. securities law.',
  },
  {
    img: '/img/ill-legal-04.png',
    title: 'Dual-Layer Verification',
    body: 'We verify both the investment case and transaction execution — assessing company fundamentals, deal documentation, transfer mechanics, and seller legitimacy.',
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

        {/* 2×2 grid */}
        <div className="grid grid-cols-2 gap-5 w-full">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-white/10 bg-surface-1 overflow-hidden flex flex-col"
            >
              {/* Illustration: 672×225 frame */}
              <div className="w-full overflow-hidden" style={{ height: '225px' }}>
                <img
                  alt={card.title}
                  src={card.img}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Text */}
              <div className="p-8 flex flex-col gap-4">
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
