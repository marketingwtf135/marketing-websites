interface NavProps {
  /** Active link label, e.g. "Company Stock" */
  active?: string
}

const NAV_LINKS = ['Invest', 'Company Stock', 'Product', 'Compare', 'Resources', 'Company']

function navHref(label: string) {
  if (label === 'Company Stock') return '#company-stock'
  return '#'
}

export default function Nav({ active }: NavProps) {
  return (
    <nav className="sticky top-0 left-0 w-full z-50 border-b border-nav-border bg-nav-bg" style={{ height: '80px' }}>
      <div className="mx-auto w-full max-w-content h-full flex items-center justify-between">
        <a href="#" aria-label="AXEVIL Capital" className="shrink-0">
          <img src="/img/block01/logo.svg" alt="AXEVIL" width={155} height={24} />
        </a>

        <div className="flex items-center gap-1">
          {NAV_LINKS.map((label) => {
            const isActive = label === active
            return (
              <a
                key={label}
                href={navHref(label)}
                className={[
                  'flex items-center gap-1 px-4 py-2 rounded-full font-inter-tight font-medium text-s-med transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white',
                  isActive
                    ? 'text-white bg-white/5'
                    : 'text-white/60 hover:text-white hover:bg-white/5',
                ].join(' ')}
              >
                {label}
                <img src="/img/block01/arrow-down.svg" alt="" aria-hidden="true" width={16} height={16} />
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button type="button" className="flex items-center justify-center px-4 py-2.5 rounded-full bg-white/5 font-inter-tight font-semibold text-s-semi text-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
            Sign In
          </button>
          <button type="button" className="flex items-center justify-center px-4 py-2.5 rounded-full bg-white font-inter-tight font-semibold text-s-semi text-phone-bg hover:scale-[1.02] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-phone-bg">
            Request access
          </button>
        </div>
      </div>
    </nav>
  )
}
