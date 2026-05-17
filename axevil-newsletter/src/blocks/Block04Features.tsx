/**
 * Block 04 — App & Web
 * Figma: 619:4106
 * Responsive: 1440 / 768 / 375
 */

const GRAD = 'linear-gradient(94deg, #A2A2A2 4.07%, #FFF 49.51%, #A2A2A2 94.94%)'

function Tag({ icon, label }: { icon: string; label: string }) {
  return (
    <div
      className="flex items-center justify-center shrink-0"
      style={{
        background: '#111111',
        height: '3.25rem',   /* 52px */
        padding: '12px',
        gap: '0.5rem',       /* 8px */
        borderRadius: '10rem',
      }}
    >
      <img src={icon} alt="" aria-hidden="true" width={24} height={24} style={{ flexShrink: 0, display: 'block' }} />
      <span
        className="font-inter-tight font-medium text-white whitespace-nowrap"
        style={{ fontSize: '1.0625rem', lineHeight: '1.3', letterSpacing: '-0.02em' }}
      >
        {label}
      </span>
    </div>
  )
}

export default function Block04Features() {
  return (
    <section className="w-full bg-page-bg">
      <div
        className="mx-auto w-full flex flex-col items-center"
        style={{
          maxWidth: '90rem',
          paddingTop: 'clamp(3rem, 6.25vw, 6.25rem)',
          paddingBottom: 'clamp(3rem, 6.25vw, 6.25rem)',
          paddingLeft: 'clamp(1.25rem, 4vw, 1.25rem)',
          paddingRight: 'clamp(1.25rem, 4vw, 1.25rem)',
          gap: 'clamp(2rem, 3vw, 3rem)',
        }}
      >
        {/* Heading */}
        <div className="flex flex-col items-center" style={{ gap: '2rem' }}>
          <div
            className="flex gap-2 items-center font-inter-tight font-medium"
            style={{ fontSize: '1.125rem', lineHeight: '1.35', letterSpacing: '-0.02em' }}
          >
            <span style={{ color: '#404040' }}>3.0</span>
            <span style={{ color: '#848484' }}>App &amp; Web</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
            style={{
              backgroundImage: GRAD,
              fontSize: 'clamp(2rem, 4.2vw, 4rem)',
              lineHeight: '1',
              letterSpacing: '-0.02em',
              maxWidth: '67.1875rem',
              whiteSpace: 'pre-wrap',
            }}
          >
            {'One platform. Two products.\nOne closed loop.'}
          </h2>
        </div>

        {/* Cards — stack on mobile */}
        <div
          className="flex flex-col md:flex-row w-full"
          style={{ gap: 'clamp(1rem, 1.25vw, 1.25rem)' }}
        >
          {/* LEFT — Axevil App */}
          <div
            className="relative flex flex-col overflow-hidden w-full"
            style={{
              flex: '1',
              minHeight: 'clamp(24rem, 33.75vw, 33.75rem)',
              border: '1px solid #151515',
              borderRadius: '1.5rem',
              padding: 'clamp(1.25rem, 2vw, 2rem)',
              gap: '2rem',
            }}
          >
            <div className="flex shrink-0">
              <div style={{
                background: 'rgba(77,186,121,0.1)',
                border: '1px solid rgba(77,186,121,0.25)',
                height: '2.5rem',
                padding: '0 1rem',
                borderRadius: '10rem',
                display: 'flex', alignItems: 'center',
              }}>
                <span className="font-inter-tight font-medium" style={{ fontSize: '0.875rem', color: '#4dba79', whiteSpace: 'nowrap' }}>
                  For investors
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-1 justify-between min-h-0" style={{ gap: '1.5rem' }}>
              <div className="flex flex-col" style={{ gap: '1rem' }}>
                <h3
                  className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(1.5rem, 2.25vw, 2.25rem)', lineHeight: '1.1' }}
                >
                  Axevil App
                </h3>
                <p className="font-inter-tight font-medium" style={{
                  fontSize: 'clamp(1rem, 1.125vw, 1.125rem)', lineHeight: '1.35', letterSpacing: '-0.02em',
                  color: '#9B9B9B', maxWidth: '23.8125rem',
                }}>
                  Allocate to the world's leading private technology companies - fully digital
                </p>
              </div>
              <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                <Tag icon="/icons/Key.svg"    label="Access"  />
                <Tag icon="/icons/Search.svg" label="Analyse" />
                <Tag icon="/icons/Money.svg"  label="Invest"  />
              </div>
            </div>

            <img
              alt=""
              src="/img/block05/mobile-app-image-01.png"
              className="absolute pointer-events-none hidden md:block"
              style={{ right: '0', bottom: '0', width: '14.375rem', height: 'auto' }}
              loading="lazy"
            />
          </div>

          {/* RIGHT — Axevil Pro */}
          <div
            className="relative flex flex-col overflow-hidden w-full"
            style={{
              flex: '1',
              minHeight: 'clamp(24rem, 33.75vw, 33.75rem)',
              border: '1px solid #151515',
              borderRadius: '1.5rem',
              padding: 'clamp(1.25rem, 2vw, 2rem)',
              gap: '2rem',
            }}
          >
            <div className="flex shrink-0">
              <div style={{
                background: 'rgba(84,111,239,0.1)',
                border: '1px solid rgba(84,111,239,0.25)',
                height: '2.5rem',
                padding: '0 1rem',
                borderRadius: '10rem',
                display: 'flex', alignItems: 'center',
              }}>
                <span className="font-inter-tight font-medium" style={{ fontSize: '0.875rem', color: '#546fef', whiteSpace: 'nowrap' }}>
                  For wealth managers
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-1 justify-between min-h-0" style={{ gap: '1.5rem' }}>
              <div className="flex flex-col" style={{ gap: '1rem' }}>
                <h3
                  className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(1.5rem, 2.25vw, 2.25rem)', lineHeight: '1.1' }}
                >
                  Axevil Pro
                </h3>
                <p className="font-inter-tight font-medium" style={{
                  fontSize: 'clamp(1rem, 1.125vw, 1.125rem)', lineHeight: '1.35', letterSpacing: '-0.02em',
                  color: '#9B9B9B', maxWidth: '25.125rem',
                }}>
                  Run every client's pre-IPO portfolio from one institutional-grade interface
                </p>
              </div>
              <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                <Tag icon="/icons/Source.svg" label="Source" />
                <Tag icon="/icons/Users.svg"  label="Manage" />
                <Tag icon="/icons/Track.svg"  label="Track"  />
              </div>
            </div>

            <img
              alt=""
              src="/img/block04/laptop-app-image-01.png"
              className="absolute pointer-events-none hidden md:block"
              style={{ top: '102px', left: '463px', width: 'auto', height: '436px', objectFit: 'contain' }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
