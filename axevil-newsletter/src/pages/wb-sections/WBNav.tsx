export function scrollToForm() {
  document.getElementById('wb-form')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const NAV_LINKS = [
  { label: 'Audience',   id: 'wb-who'      },
  { label: 'Why attend', id: 'wb-why'      },
  { label: 'Agenda',     id: 'wb-agenda'   },
  { label: 'Speaker',    id: 'wb-speaker'  },
  { label: 'Schedule',   id: 'wb-schedule' },
]

export default function WBNav() {
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 border-b border-nav-border bg-nav-bg"
      style={{ height: '64px' }}
    >
      <div className="mx-auto w-full max-w-[1440px] h-full flex items-center justify-between px-5 sm:px-8 lg:px-[80px]">
        {/* Logo */}
        <a href="#" aria-label="AXEVIL Capital" className="shrink-0">
          <img src="/img/block01/logo.svg" alt="AXEVIL Capital" width={130} height={20} />
        </a>

        {/* Internal section links — desktop only */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              className="flex items-center h-9 px-4 rounded-full font-inter-tight font-medium text-text-s-med text-white/50 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Register CTA — visible on all breakpoints */}
        <button
          type="button"
          onClick={scrollToForm}
          className="flex items-center justify-center rounded-full font-inter-tight font-semibold text-[14px] text-phone-bg bg-white hover:scale-[1.02] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-white shrink-0"
          style={{ height: '36px', padding: '0 20px' }}
        >
          Register
        </button>
      </div>
    </nav>
  )
}
