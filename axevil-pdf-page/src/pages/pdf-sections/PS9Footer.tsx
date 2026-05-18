const LINKS = ['Privacy', 'Terms', 'Cookie policy', 'Contacts']

export default function PS9Footer() {
  return (
    <footer className="relative w-full" style={{ background: 'black' }}>
      <div
        className="mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden"
        style={{
          maxWidth: '1440px',
          paddingTop: 'clamp(2.5rem, 4.2vw, 3.75rem)',
          paddingBottom: 'clamp(2.5rem, 4.2vw, 3.75rem)',
          paddingLeft: 'clamp(1.25rem, 5.5vw, 5rem)',
          paddingRight: 'clamp(1.25rem, 5.5vw, 5rem)',
        }}
      >
        {/* Logo */}
        <div className="relative shrink-0" style={{ width: '12.9375rem', height: '2rem' }}>
          <img
            src="/img/footer-logo.svg"
            alt="AXEVIL Capital"
            className="absolute block inset-0 max-w-none"
            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'left' }}
            onError={e => { (e.currentTarget as HTMLImageElement).src = '/img/logo.svg' }}
          />
        </div>

        {/* Right: links + copyright */}
        <div
          className="flex flex-col font-inter-tight font-medium gap-3 items-start sm:items-end overflow-hidden shrink-0"
          style={{ fontSize: '0.75rem', lineHeight: 1.3, color: '#404040', whiteSpace: 'nowrap' }}
        >
          <div className="flex gap-5 items-center overflow-hidden flex-wrap">
            {LINKS.map(link => (
              <a
                key={link}
                href="#"
                className="hover:text-white/50 transition-colors"
                style={{ color: '#404040' }}
              >
                {link}
              </a>
            ))}
          </div>
          <p>© 2026 Axevil Capital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
