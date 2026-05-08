import CtaButton from '../components/CtaButton'

export default function Block01Hero() {
  return (
    <section className="relative w-full bg-page-bg overflow-clip" style={{ height: '100vh', minHeight: '600px', paddingTop: '80px' }}>

      {/* shape-eclipse-left — pinned left, opacity 25% */}
      <img
        alt=""
        src="/img/shape-eclipse-left.png"
        className="absolute top-0 left-0 pointer-events-none"
        style={{ width: '40%', height: '100%', objectFit: 'cover', objectPosition: 'left center', opacity: 0.25, zIndex: 0 }}
      />

      {/* Hero illustration — 1100×997px at 1200px+, scales below, shows fully */}
      <div className="hero-illustration">
        <img
          alt=""
          src="/img/hero-image.png"
          className="block w-full h-full object-cover"
          loading="eager"
        />
        {/* Fade left + bottom edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, var(--page-bg) 0%, rgba(8,8,8,0) 35%), linear-gradient(0deg, var(--page-bg) 0%, rgba(8,8,8,0) 35%)' }}
        />
      </div>

      {/* Copy + CTA — anchored to bottom so button is always visible */}
      <div className="absolute w-full" style={{ bottom: '80px' }}>
        <div className="mx-auto w-full max-w-content">
          <div className="flex flex-col gap-12 items-start">
            <div className="flex flex-col gap-6 items-start">
              <h1
                className="font-inter-tight font-semibold text-h1-semi leading-none tracking-[-0.02em] text-transparent bg-clip-text whitespace-pre-line"
                style={{ backgroundImage: 'linear-gradient(104.211deg, var(--neutral-00) 2.5635%, var(--neutral-35) 99.06%)' }}
              >
                {'Pre-IPO \nInfrastructure'}
              </h1>
              <p className="font-inter-tight font-medium text-text-xl text-white/60" style={{ width: '604px' }}>
                A platform for investing in the world's leading private technology companies. Built for professional investors and wealth managers.
              </p>
            </div>
            <CtaButton>Request Access</CtaButton>
          </div>
        </div>
      </div>
    </section>
  )
}
