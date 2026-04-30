import LogoCard from '../components/LogoCard'

const TRUSTED_GRADIENT = 'linear-gradient(114.556deg, var(--neutral-00) 22.846%, var(--neutral-30) 76.471%)'
const SEEN_IN_GRADIENT  = 'linear-gradient(83.770deg, var(--neutral-00) 0.245%, var(--neutral-30) 102.17%)'

function LogoRow({ title, gradient }: { title: string; gradient: string }) {
  return (
    <div className="flex flex-col gap-12 items-center w-full">
      <p
        className="font-inter-tight font-medium text-h3 leading-none tracking-[-0.02em] text-transparent bg-clip-text text-center"
        style={{ backgroundImage: gradient }}
      >
        {title}
      </p>

      <div className="relative w-full flex items-center justify-between gap-logo-gap">
        {Array.from({ length: 5 }).map((_, i) => (
          <LogoCard key={i} logoSrc="/img/block02/spacex.svg" logoAlt="Company" />
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
  )
}

export default function Block11Logos() {
  return (
    <section className="w-full bg-page-bg">
      <div className="mx-auto w-full max-w-content flex flex-col gap-12 items-start" style={{ marginTop: '200px' }}>
        <LogoRow title="Trusted by" gradient={TRUSTED_GRADIENT} />
        <LogoRow title="As seen in" gradient={SEEN_IN_GRADIENT} />
      </div>
    </section>
  )
}
