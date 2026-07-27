import { asset } from '../../lib/asset'

const footerLogo = asset('/img/newsletter/footer-logo.svg')

const LINKS = ['Privacy', 'Terms', 'Cookie policy', 'Contacts']

export default function NLFooter() {
  return (
    <footer
      className="relative w-full"
      style={{ background: 'var(--black-100)' }}
    >
      <div
        className="mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden"
        style={{
          maxWidth: '1440px',
          paddingTop: 'clamp(40px,4.2vw,60px)',
          paddingBottom: 'clamp(40px,4.2vw,60px)',
          paddingLeft: 'clamp(20px,5.5vw,80px)',
          paddingRight: 'clamp(20px,5.5vw,80px)',
        }}
      >
        {/* Logo */}
        <div className="relative shrink-0" style={{ width: 207, height: 32 }}>
          <img src={footerLogo} alt="AXEVIL Capital" className="absolute block inset-0 max-w-none size-full" />
        </div>

        {/* Right: links + copyright */}
        <div
          className="flex flex-col font-inter-tight font-medium gap-3 items-start sm:items-end overflow-hidden shrink-0"
          style={{ fontSize: 'var(--font-xs)', lineHeight: 1.3, color: 'var(--black-800)', whiteSpace: 'nowrap' }}
        >
          <div className="flex gap-5 items-center overflow-hidden">
            {LINKS.map(link => (
              <a
                key={link}
                href="#"
                className="hover:text-white/50 transition-colors"
                style={{ color: 'var(--black-800)' }}
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
