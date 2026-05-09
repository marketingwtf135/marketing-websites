import CtaButton from '../components/CtaButton'

export default function Block01Hero() {
  return (
    <section
      className="w-full overflow-clip"
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        minHeight: '600px',
        paddingTop: '80px',
        zIndex: 0,
      }}
    >

      {/* Background video — fills section, doesn't overlap right-side hero illustration */}
      <video
        src="/ostracized_remix_scene.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'left center',
          zIndex: 10,
          opacity: 0.6,
        }}
      />
      {/* Right-side fade so video doesn't overlap the hero interface on the right */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '60%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(8,8,8,0) 0%, var(--page-bg) 60%)',
          zIndex: 0,
        }}
      />

      {/* Hero illustration — 1100×997px at 1200px+, scales below, shows fully */}
      <div className="hero-illustration" style={{ zIndex: 11 }}>
        <img
          alt=""
          src="/img/hero-image.png"
          className="block w-full h-full object-contain"
          loading="eager"
        />
      </div>

      {/* Copy + CTA — anchored to bottom so button is always visible */}
      <div className="absolute w-full" style={{ bottom: '80px', zIndex: 15 }}>
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
