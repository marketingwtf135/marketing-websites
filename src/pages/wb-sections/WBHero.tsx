import WBCtaButton from './WBCtaButton'

const WEBINAR_DATE = 'June 5, 2026'
const WEBINAR_TIME = '11:00 CET'

// 6 brand logos — drop icon-logo-01.svg ... icon-logo-06.svg into /img/
const BRAND_LOGOS = [
  { label: 'Brand 1', src: '/img/icons-logo-01.svg' },
  { label: 'Brand 2', src: '/img/icons-logo-02.svg' },
  { label: 'Brand 3', src: '/img/icons-logo-03.svg' },
  { label: 'Brand 4', src: '/img/icons-logo-04.svg' },
  { label: 'Brand 5', src: '/img/icons-logo-05.svg' },
  { label: 'Brand 6', src: '/img/icons-logo-06.svg' },
]

export default function WBHero() {
  return (
    <section
      id="wb-hero"
      className="relative w-full bg-page-bg flex flex-col overflow-clip"
      style={{ minHeight: '100svh', paddingTop: '64px' }}
    >
      {/* Background video — drop bg-video.mp4 into /img/ */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="/bg-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        style={{ opacity: 1 }}
      />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-page-bg/60 pointer-events-none" />

      <div
        className="relative flex-1 mx-auto w-full max-w-[1440px] flex flex-col items-center justify-center text-center"
        style={{ paddingTop: '40px', paddingBottom: '120px' }}
      >
        <div className="flex flex-col items-center max-w-[1100px] w-full" style={{ gap: '24px' }}>

          {/* Date badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-inter-tight font-medium"
            style={{
              fontSize: '0.875rem',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            <span
              className="rounded-full shrink-0"
              style={{
                width: 10, height: 10, background: '#4dba79',
                boxShadow: '0 0 6px #4dba79, 0 0 12px rgba(77,186,121,0.5)',
              }}
            />
            {WEBINAR_DATE}  ·  {WEBINAR_TIME}  ·  Zoom  ·  60 minutes
          </div>

          {/* H1 + subheadline */}
          <div className="flex flex-col items-center w-full" style={{ gap: '20px' }}>
            <h1
              className="font-inter-tight font-semibold leading-[1.05] tracking-[-0.03em] text-transparent bg-clip-text w-full"
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 5.5rem)',
                backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #b7b7b7 99.06%)',
                maxWidth: 880,
                margin: '0 auto',
              }}
            >
              How to add private markets to your HNWI portfolios.
            </h1>
            <p
              className="font-inter-tight font-medium text-white/55 leading-[1.4]"
              style={{ maxWidth: '37.5rem', fontSize: 'clamp(1rem, 1.4vw, 1.125rem)' }}
            >
              A closed-door session for private banking managers, family offices and independent capital advisors.
            </p>
          </div>

          {/* CTA */}
          <div className="w-full sm:w-auto" style={{ marginTop: 8 }}>
            <WBCtaButton fullWidthMobile />
          </div>

          {/* Brand logos — 48×48 on mobile, 64×64 on sm+ */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3" style={{ marginTop: 16 }}>
            {BRAND_LOGOS.map((b, i) => (
              <div
                key={i}
                className="flex items-center justify-center shrink-0 w-12 h-12 sm:w-16 sm:h-16"
                style={{ borderRadius: 10, background: '#141414' }}
              >
                <img
                  src={b.src}
                  alt={b.label}
                  width={24}
                  height={24}
                  className="sm:w-8 sm:h-8"
                  style={{ objectFit: 'contain' }}
                  onError={e => {
                    // Fallback: show placeholder letter if SVG not yet uploaded
                    const el = e.currentTarget
                    el.style.display = 'none'
                    const parent = el.parentElement
                    if (parent && !parent.querySelector('span')) {
                      const s = document.createElement('span')
                      s.textContent = String(i + 1)
                      s.style.cssText = 'color:rgba(255,255,255,0.3);font-size:18px;font-family:Inter Tight,sans-serif;font-weight:600'
                      parent.appendChild(s)
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* No bottom border — removed per feedback */}
    </section>
  )
}
