const LINKS = ['Privacy', 'Terms', 'Cookie policy', 'Contacts']

export default function WBFooter() {
  return (
    <footer
      className="relative w-full"
      style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="mx-auto w-full max-w-[1440px] py-[40px] sm:py-[48px]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Logo */}
          <a href="#" aria-label="AXEVIL Capital" className="shrink-0">
            <img src="/img/block01/logo.svg" alt="AXEVIL Capital" width={130} height={20} />
          </a>

          {/* Right column: links + copyright */}
          <div className="flex flex-col sm:items-end gap-3">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {LINKS.map(l => (
                <a
                  key={l}
                  href="#"
                  className="font-inter-tight font-medium text-white/40 text-[13px] hover:text-white/70 transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
            <p className="font-inter-tight font-medium text-white/30" style={{ fontSize: '0.75rem' }}>
              В© 2026 Axevil Capital. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
