/** Footer — Figma 114:218
 *  border-top #222, max-w-content, logo + address + social icons | 6 nav columns
 */

const NAV_COLUMNS = [
  { heading: 'Invest',         items: ['Nav-01', 'Nav-01', 'Nav-01', 'Nav-01', 'Nav-01'] },
  { heading: 'Company stock',  items: ['Nav-01', 'Nav-01', 'Nav-01', 'Nav-01', 'Nav-01', 'Nav-01'] },
  { heading: 'Product',        items: ['Nav-01', 'Nav-01', 'Nav-01', 'Nav-01', 'Nav-01', 'Nav-01', 'Nav-01'] },
  { heading: 'Compare',        items: ['Nav-01', 'Nav-01', 'Nav-01'] },
  { heading: 'Resources',      items: ['Nav-01', 'Nav-01', 'Nav-01'] },
  { heading: 'Company',        items: ['Nav-01', 'Nav-01', 'Nav-01'] },
]

export default function Footer() {
  return (
    <footer className="w-full bg-page-bg" style={{ borderTop: '1px solid #222', position: 'relative', zIndex: 1 }}>
      <div
        className="mx-auto w-full max-w-content container-px flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-8"
        style={{ paddingTop: 'clamp(40px, 6vw, 60px)', paddingBottom: 'clamp(40px, 6vw, 80px)' }}
      >
        {/* ── Left: logo + address + social ── */}
        <div className="flex flex-col items-start gap-8 lg:justify-between lg:shrink-0 lg:w-[238px] lg:self-stretch">
          {/* Logo */}
          <img
            src="/img/logos/footer-logo.svg"
            alt="AXEVIL"
            style={{ width: '207px', height: '32px', objectFit: 'contain', objectPosition: 'left' }}
          />

          <div className="flex flex-col gap-6 items-start">
            {/* Address / contacts */}
            <div className="font-inter-tight font-medium text-text-m text-white/50" style={{ lineHeight: 1.3, letterSpacing: '-0.02em' }}>
              <p>Small text, adress/contacts...</p>
              <p>Small text, adress/contacts...</p>
            </div>

            {/* Social icons */}
            <div className="flex gap-2 items-center">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  type="button"
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#313131', flexShrink: 0 }}
                  aria-label="Social link"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: nav columns — 2col mobile, 3col tablet, 6col desktop ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-start gap-x-6 sm:gap-x-10 lg:gap-x-20 gap-y-8 font-inter-tight font-medium text-white w-full lg:w-auto">
          {NAV_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4 sm:gap-6 lg:gap-8 items-start shrink-0">
              <span className="text-text-l whitespace-nowrap" style={{ letterSpacing: '-0.02em' }}>
                {col.heading}
              </span>

              <div className="flex flex-col gap-3 lg:gap-4 items-start text-text-m text-white/50" style={{ letterSpacing: '-0.02em' }}>
                {col.items.map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="hover:text-white/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
