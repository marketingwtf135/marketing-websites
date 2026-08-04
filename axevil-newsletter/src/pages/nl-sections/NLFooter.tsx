import { asset } from '../../lib/asset'

const footerLogo = asset('/img/newsletter/footer-logo.svg')

/**
 * Footer links used to be four labels on `href="#"` — they looked like a legal footer and
 * did nothing but jump the page to the top.
 *
 * The Russian legal pages already existed in the webinar project; they are copied into
 * `public/legal/` here and every path inside them rewritten relative, so they survive the
 * site's nested base (`/pdf/pre-ipo-insider/`). The hrefs below go through `asset()` for
 * the same reason. `Contacts` points at the address the legal pages themselves publish.
 */
const LINKS: { label: string; href: string }[] = [
  { label: 'Privacy',       href: asset('/legal/ru/privacy.html') },
  { label: 'Terms',         href: asset('/legal/ru/terms.html') },
  { label: 'Cookie policy', href: asset('/legal/ru/cookies.html') },
  { label: 'Contacts',      href: 'mailto:info@axevil.com' },
]

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
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="hover:text-white/50 transition-colors"
                style={{ color: 'var(--black-800)' }}
              >
                {label}
              </a>
            ))}
          </div>
          <p>© 2026 Axevil Capital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
