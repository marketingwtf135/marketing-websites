/**
 * Block 11 — As seen in (section-partners)
 * Figma: 619:6656 — py-100px
 * 5 logo cards: 275×260px, border-#151515, p-24px, rounded-32px, gap-16px
 */

const GRAD = 'linear-gradient(108.34deg, #A2A2A2 15.77%, #FFF 49.29%, #A2A2A2 82.81%)'

const LOGOS = [
  { src: '/img/logos/crunchbase-logo.svg',        alt: 'Crunchbase',      w: 180, h: 26 },
  { src: '/img/logos/pitchbook-logo-new.png',     alt: 'PitchBook',       w: 180, h: 49 },
  { src: '/img/logos/startups-logo.png',          alt: 'Startups',        w: 180, h: 37 },
  { src: '/img/logos/wearefounders-logo-new.png', alt: 'We Are Founders', w: 163, h: 54 },
  { src: '/img/logos/aix-logo.png',               alt: 'AIX',             w: 155, h: 52 },
]

export default function Block11Logos() {
  return (
    <section className="w-full bg-page-bg">
      <div
        className="mx-auto w-full flex flex-col items-center"
        style={{
          maxWidth: '90rem',
          paddingTop: '6.25rem',
          paddingBottom: '6.25rem',   /* 100px — keeps gap tight with Block12 */
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
          gap: '3rem',
        }}
      >
        {/* Heading */}
        <h2
          className="font-inter-tight font-semibold text-transparent bg-clip-text text-center whitespace-nowrap"
          style={{
            backgroundImage: GRAD,
            fontSize: 'clamp(1.75rem, 5vw, 4rem)',
            lineHeight: '1',
            letterSpacing: '-0.02em',
          }}
        >
          As seen in
        </h2>

        {/* Logo cards row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:items-center md:justify-between w-full" style={{ gap: '1rem' }}>
          {LOGOS.map((logo) => (
            <div
              key={logo.alt}
              className="flex items-center justify-center md:flex-1"
              style={{
                height: '16.25rem',
                border: '1px solid #151515',
                borderRadius: '2rem',
                padding: '2.5rem',
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.w}
                height={logo.h}
                style={{
                  maxWidth: logo.alt === 'Crunchbase' ? '11.25rem' : '100%',
                  maxHeight: logo.alt === 'Crunchbase' ? '3.375rem' : '100%',
                  width: logo.alt === 'Crunchbase' ? 'auto' : '100%',
                  height: logo.alt === 'Crunchbase' ? 'auto' : '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
