const footerLogo = '/img/footer-logo.svg'
const LINKS = ['Privacy', 'Terms', 'Cookie policy', 'Contacts']

export default function PS9Footer() {
  return (
    <footer
      className="relative w-full"
      style={{ background: 'black', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div
        className="content-wrap"
        style={{
          paddingTop: 'clamp(2.5rem, 4vw, 3.75rem)',
          paddingBottom: 'clamp(2.5rem, 4vw, 3.75rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          {/* Logo */}
          <a href="/" aria-label="AXEVIL Capital" style={{ flexShrink: 0 }}>
            <div style={{ position: 'relative', width: '12.9375rem', height: '2rem' }}>
              <img
                src={footerLogo}
                alt="AXEVIL"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left' }}
                onError={e => { (e.currentTarget as HTMLImageElement).src = '/img/logo.svg' }}
              />
            </div>
          </a>

          {/* Right: nav + copyright */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.75rem',
            }}
          >
            <nav
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                justifyContent: 'flex-end',
              }}
            >
              {LINKS.map(l => (
                <a
                  key={l}
                  href="#"
                  style={{
                    fontFamily: 'Inter Tight, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    lineHeight: 1.3,
                    color: 'rgba(255,255,255,0.4)',
                    textDecoration: 'none',
                    transition: 'color 200ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                >
                  {l}
                </a>
              ))}
            </nav>
            <p
              style={{
                fontFamily: 'Inter Tight, sans-serif',
                fontWeight: 500,
                fontSize: '0.75rem',
                lineHeight: 1.3,
                color: 'rgba(255,255,255,0.3)',
                margin: 0,
              }}
            >
              © 2026 Axevil Capital. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
