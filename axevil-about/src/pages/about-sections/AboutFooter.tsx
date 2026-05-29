import { NAV_LINKS, FOOTER_COMPLIANCE } from './content'

/**
 * Local footer for the standalone /about deploy. The DS <Footer> hardcodes
 * root-absolute asset paths (/img/logos/footer-logo.svg) that 404 under the
 * `/about/` base — the sibling projects use a local footer for the same reason.
 */
export default function AboutFooter() {
  return (
    <footer className="w-full bg-page-bg" style={{ borderTop: '1px solid var(--section-border)' }}>
      <div
        className="mx-auto w-full max-w-content container-px flex flex-col md:flex-row md:items-center md:justify-between"
        style={{ paddingTop: '3rem', paddingBottom: '3rem', gap: '2rem' }}
      >
        <div className="flex flex-col" style={{ gap: '1.25rem' }}>
          <img
            src="/about/img/footer-logo.svg"
            alt="Axevil Capital"
            style={{ height: '1.5rem', width: 'auto', display: 'block' }}
          />
          <p className="font-inter-tight font-medium text-text-xs text-white-400" style={{ maxWidth: '34rem' }}>
            {FOOTER_COMPLIANCE}
          </p>
        </div>

        <nav className="flex flex-wrap" style={{ gap: '1rem 1.5rem' }} aria-label="Footer">
          {NAV_LINKS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              className="font-inter-tight font-medium text-text-s-med text-white-400 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
