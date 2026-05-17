/**
 * Block 02 — Selected portfolio companies
 * Figma: 142:29337 — pt-200px pb-100px
 * Marquee with logo cards, card 275×260px, border #151515, p-24px, rounded-32px
 */

const GRAD = 'linear-gradient(133.28deg, #A2A2A2 2.09%, #FFF 49.02%, #A2A2A2 95.95%)'

const LOGOS = [
  { src: '/img/block02/logo-1-anthropic.svg',  alt: 'Anthropic',  w: 204, h: 22 },
  { src: '/img/block02/logo-12-neuralink.svg', alt: 'Neuralink',  w: 205, h: 23 },
  { src: '/img/block02/logo-4-scale.svg',      alt: 'Scale',      w: 98,  h: 32 },
  { src: '/img/block02/logo-5-glean.svg',      alt: 'Glean',      w: 81,  h: 32 },
  { src: '/img/block02/logo-6-stripe.svg',     alt: 'Stripe',     w: 120, h: 24 },
  { src: '/img/block02/logo-7-rappi.svg',      alt: 'Rappi',      w: 121, h: 28 },
  { src: '/img/block02/logo-8-toss.svg',       alt: 'Toss',       w: 96,  h: 40 },
  { src: '/img/block02/logo-9-uzum.svg',       alt: 'Uzum',       w: 111, h: 48 },
  { src: '/img/block02/logo-10-plaid.svg',     alt: 'Plaid',      w: 140, h: 36 },
  { src: '/img/block02/logo-11-robinhood.svg', alt: 'Robinhood',  w: 140, h: 40 },
]

const LOOP = [...LOGOS, ...LOGOS, ...LOGOS]
const CARD_W = 291 // 275px + 16px gap

export default function Block02Logos() {
  return (
    <section className="w-full bg-page-bg overflow-hidden">
      <div
        className="mx-auto w-full flex flex-col"
        style={{
          maxWidth: '90rem',
          paddingTop: '6.25rem',
          paddingBottom: 0,
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
          gap: '4rem',
          overflow: 'hidden',
        }}
      >
        {/* Heading */}
        <div className="flex flex-col items-center gap-6">
          <div
            className="flex gap-2 items-center font-inter-tight font-medium"
            style={{ fontSize: '1.125rem', lineHeight: '1.35', letterSpacing: '-0.02em' }}
          >
            <span style={{ color: '#404040' }}>1.0</span>
            <span style={{ color: '#848484' }}>Companies</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text text-center whitespace-nowrap"
            style={{
              backgroundImage: GRAD,
              fontSize: 'clamp(1.75rem, 5vw, 4rem)',
              lineHeight: '1',
              letterSpacing: '-0.02em',
            }}
          >
            Selected portfolio companies
          </h2>
        </div>

        {/* Marquee with side masks */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              width: 'max-content',
              animation: `b02-marquee ${LOGOS.length * 4}s linear infinite`,
            }}
          >
            {LOOP.map((logo, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  width: 'clamp(10rem, 17.1875vw, 17.1875rem)',
                  height: '16.25rem',
                  border: '1px solid #151515',
                  borderRadius: '2rem',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.h}
                  style={{ maxWidth: '100%', maxHeight: '3rem', objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
          <style>{`
            @keyframes b02-marquee {
              from { transform: translateX(0); }
              to   { transform: translateX(-${CARD_W * LOGOS.length}px); }
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}
