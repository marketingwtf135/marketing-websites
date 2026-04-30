// Hex values used directly in backgroundColor — CSS vars are unreliable in
// inline styles in some Safari versions.
const STATUS_DOT: Record<string, string> = {
  Open:         '#4dba79',
  Closed:       '#990003',
  'Coming soon':'#a15e00',
}

const companies: { name: string; status: 'Open' | 'Closed' | 'Coming soon' }[] = [
  { name: 'Company name', status: 'Open' },
  { name: 'Company name', status: 'Closed' },
  { name: 'Company name', status: 'Coming soon' },
  { name: 'Company name', status: 'Coming soon' },
  { name: 'Company name', status: 'Open' },
]

function CompanyCard({ name, status }: { name: string; status: keyof typeof STATUS_DOT }) {
  return (
    <div className="border border-white/15 flex flex-col items-center justify-between p-6 rounded-card-lg shrink-0" style={{ width: '260px', height: '260px' }}>
      {/* Company name */}
      <p
        className="font-inter-tight font-medium text-text-m leading-[1.3] tracking-[-0.02em] text-transparent bg-clip-text text-center w-full"
        style={{ backgroundImage: 'linear-gradient(130.815deg, var(--neutral-00) 2.5635%, var(--neutral-40) 99.06%)' }}
      >
        {name}
      </p>

      {/* Logo */}
      <img
        src="/img/block02/spacex.svg"
        alt={name}
        width={212}
        height={27}
        className="object-contain"
      />

      {/* Status badge */}
      <div className="flex items-center gap-2.5 h-8 px-4 rounded-2xl border border-white/10">
        <span
          className="shrink-0 size-2 rounded-lg"
          style={{ backgroundColor: STATUS_DOT[status] }}
        />
        <span className="font-inter-tight font-semibold text-text-s-semi leading-[1.2] tracking-[-0.02em] text-white whitespace-nowrap">
          {status}
        </span>
      </div>
    </div>
  )
}

export default function Block02Logos() {
  return (
    <section className="w-full bg-page-bg" style={{ marginTop: '200px', paddingBottom: '200px' }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-16 items-center">

        {/* Section heading */}
        <div className="flex flex-col gap-6 items-center" style={{ width: '557px' }}>
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l leading-[1.35] tracking-[-0.02em] text-neutral-30 whitespace-nowrap">
            <span className="opacity-50">1.0</span>
            <span className="opacity-80">Companies</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-h2 pb-2 text-transparent bg-clip-text text-center w-full"
            style={{ backgroundImage: 'linear-gradient(126.669deg, var(--neutral-00) 2.5635%, var(--neutral-40) 99.06%)' }}
          >
            Heading 2
          </h2>
        </div>

        {/* Cards row */}
        <div className="relative w-full flex items-center justify-between gap-logo-gap">
          {companies.map((c, i) => (
            <CompanyCard key={i} name={c.name} status={c.status} />
          ))}

          {/* Edge fades */}
          <div
            className="absolute left-0 top-0 h-60 w-40 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, var(--page-bg) 0%, rgba(8,8,8,0.67) 56.25%, rgba(8,8,8,0.25) 100%)' }}
          />
          <div
            className="absolute top-0 h-60 w-40 pointer-events-none"
            style={{ right: '-5px', background: 'linear-gradient(90deg, rgba(8,8,8,0.25) 0%, rgba(8,8,8,0.67) 56.25%, var(--page-bg) 100%)' }}
          />
        </div>
      </div>
    </section>
  )
}
