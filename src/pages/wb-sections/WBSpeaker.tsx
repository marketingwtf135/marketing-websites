export default function WBSpeaker() {
  return (
    <section
      id="wb-speaker"
      className="relative w-full bg-page-bg"
    >
      <div
        className="relative mx-auto w-full max-w-[1440px]"
        style={{ paddingTop: '6.25rem', paddingBottom: '6.25rem' }}
      >
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <div className="flex items-center gap-2 font-inter-tight font-medium text-[12px] sm:text-text-l text-neutral-30">
            <span className="opacity-50">4.0</span>
            <span className="opacity-80">About Speaker</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #b7b7b7 99.06%)',
              overflow: 'visible',
            }}
          >
            Speaker
          </h2>
        </div>

        <div
          className="relative w-full overflow-hidden flex flex-col items-start"
          style={{
            minHeight: 'clamp(28rem, 50vw, 46.875rem)',
            padding: '2rem',
            gap: 100,
            borderRadius: 24,
            backgroundImage: 'url(/img/bg-speaker.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#0d0d0d',
          }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            src="/bg-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            style={{ opacity: 0.5 }}
          />

          <div
            className="relative flex flex-col md:flex-row md:justify-between gap-6 md:gap-12 w-full"
            style={{ zIndex: 1 }}
          >
            <div className="flex flex-col gap-2">
              <h3
                className="font-inter-tight font-semibold text-white"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
              >
                Taras Chumachenko
              </h3>
              <p className="font-inter-tight font-medium text-white/55" style={{ fontSize: 15 }}>
                Co-founder &amp; Managing Partner, Axevil Capital
              </p>
            </div>

            <div style={{ maxWidth: 480 }}>
              <p
                className="font-inter-tight font-medium"
                style={{ color: '#E6E6E6', fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)', lineHeight: '135%', letterSpacing: '-0.36px' }}
              >
                10+ years in alternative investments. Co-founder of Axevil Capital — a digital private equity platform with $150M AUM, 1,000+ investors and 100+ wealth-management partners. Hosts the firm's quarterly research briefings and live Q&amp;A sessions on private markets strategy.
              </p>
            </div>
          </div>

          <img
            src="/img/image-speaker.png"
            alt="Taras Chumachenko"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'clamp(16rem, 45vw, 44.6875rem)',
              height: 'clamp(14rem, 40vw, 43.75rem)',
              objectFit: 'contain',
              objectPosition: 'bottom center',
            }}
          />
        </div>
      </div>
    </section>
  )
}
