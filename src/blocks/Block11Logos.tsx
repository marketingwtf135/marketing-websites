import LogoCard from '../components/LogoCard'

const TRUSTED_GRADIENT = 'linear-gradient(114.556deg, var(--neutral-00) 22.846%, var(--neutral-30) 76.471%)'
const SEEN_IN_GRADIENT  = 'linear-gradient(83.770deg, var(--neutral-00) 0.245%, var(--neutral-30) 102.17%)'

const TRUSTED_LOGOS = [
  { src: '/img/block02/spacex.svg', alt: 'SpaceX' },
  { src: '/img/block02/spacex.svg', alt: 'SpaceX' },
  { src: '/img/block02/spacex.svg', alt: 'SpaceX' },
  { src: '/img/block02/spacex.svg', alt: 'SpaceX' },
  { src: '/img/block02/spacex.svg', alt: 'SpaceX' },
]

const SEEN_IN_LOGOS = [
  { src: '/img/logos/crunchbase-logo.png',    alt: 'Crunchbase' },
  { src: '/img/logos/pithbook-logo.png',      alt: 'Pitchbook' },
  { src: '/img/logos/startups-logo.png',      alt: 'Startups' },
  { src: '/img/logos/wearefounders-logo.png', alt: 'We Are Founders' },
  { src: '/img/logos/aix-logo.png',           alt: 'AIX' },
]

function LogoRow({ title, gradient, logos }: { title: string; gradient: string; logos: { src: string; alt: string }[] }) {
  return (
    <div className="flex flex-col gap-12 items-center w-full">
      <p
        className="font-inter-tight font-medium text-h3 leading-none tracking-[-0.02em] text-transparent bg-clip-text text-center"
        style={{ backgroundImage: gradient }}
      >
        {title}
      </p>

      <div className="relative w-full flex items-center justify-between gap-logo-gap">
        {logos.map((logo, i) => (
          <div key={i} style={{ opacity: 0.6 }}>
            <LogoCard logoSrc={logo.src} logoAlt={logo.alt} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Block11Logos() {
  return (
    <section className="w-full bg-page-bg">
      <div className="mx-auto w-full max-w-content container-px flex flex-col gap-12 items-center" style={{ marginTop: '200px' }}>
        {/* Trusted by — hidden for now, keeping for future use */}
        <div style={{ display: 'none' }}>
          <LogoRow title="Trusted by" gradient={TRUSTED_GRADIENT} logos={TRUSTED_LOGOS} />
        </div>
        <LogoRow title="As seen in" gradient={SEEN_IN_GRADIENT} logos={SEEN_IN_LOGOS} />
      </div>
    </section>
  )
}
