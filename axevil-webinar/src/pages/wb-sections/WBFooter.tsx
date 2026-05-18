import { useLang } from '../../lib/lang'

export default function WBFooter() {
  const { t } = useLang()
  const { footer } = t

  return (
    <footer
      id="wb-footer"
      className="relative w-full"
      style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="mx-auto w-full max-w-[1440px] container-px padding-global py-10 sm:py-12">
        <div className="flex flex-col gap-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <a href="#" aria-label="AXEVIL Capital" className="shrink-0">
                <img src="/img/block01/logo.svg" alt="AXEVIL Capital" width={130} height={20} />
              </a>
              <div className="flex flex-col gap-0.5 font-inter-tight font-medium text-white/40 text-[12px]">
                <span className="text-white/60">{footer.entity}</span>
                <span>
                  {footer.contactLabel}:{' '}
                  <a
                    href={`mailto:${footer.contactEmail}`}
                    className="text-white/60 hover:text-white/90 transition-colors underline decoration-white/20 underline-offset-2"
                  >
                    {footer.contactEmail}
                  </a>
                </span>
              </div>
            </div>

            <nav
              aria-label="Legal"
              className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end"
            >
              {footer.links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  className="font-inter-tight font-medium text-white/50 text-[13px] hover:text-white/85 transition-colors"
                  rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <p
              className="font-inter-tight font-medium text-white/35 leading-[1.55]"
              style={{ fontSize: '0.75rem', maxWidth: '60rem' }}
            >
              {footer.disclaimer}
            </p>
            <p className="font-inter-tight font-medium text-white/30" style={{ fontSize: '0.75rem' }}>
              {footer.copy}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
