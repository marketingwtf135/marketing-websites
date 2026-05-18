const STATS = [
  { value: '$150M',  label: 'AUM' },
  { value: '1,000+', label: 'Клиентов' },
  { value: '35',     label: 'Компаний в портфеле' },
  { value: '100+',   label: 'Партнёров' },
]

export default function NLAbout() {
  return (
    /*
      Section: padding-section-t0-b6 (top:0, bottom:100px)
      + padding-global for mobile/tablet horizontal spacing
    */
    <section
      id="nl-about"
      className="relative w-full bg-page-bg padding-section-t0-b6 padding-global"
    >
      {/*
        Inner wrapper: bg #0c0c0c, rounded, 16px horizontal, 100px top, 1rem bottom
        padding-section-t6-b6 gives 100px top — override bottom to 1rem
      */}
      <div
        className="about-inner-padding mx-auto w-full max-w-[1440px] flex flex-col items-center overflow-visible"
        style={{
          background: '#0c0c0c',
          borderRadius: 'clamp(1.5rem, 4.4vw, 4rem)',
          gap: 'clamp(1.5rem, 4.4vw, 4rem)',
          padding: '1.5rem 1rem 1rem',
        }}
      >
        {/* Heading */}
        <div className="flex flex-col gap-[1.5rem] items-center">
          <div className="flex gap-[0.5rem] font-inter-tight font-medium items-center justify-center whitespace-nowrap"
            style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.125rem)', lineHeight: 1.35, letterSpacing: '-0.36px' }}>
            <span style={{ color: '#404040' }}>6.0</span>
            <span style={{ color: '#848484' }}>О платформе</span>
          </div>
          <div className="flex flex-col gap-[1rem] items-center">
            <h2 className="font-inter-tight font-semibold text-transparent bg-clip-text whitespace-nowrap"
              style={{ fontSize: 'clamp(2.25rem, 4.4vw, 4rem)', lineHeight: 1, letterSpacing: '-0.02em', backgroundImage: 'linear-gradient(113.522deg, rgb(162,162,162) 15.766%, rgb(255,255,255) 49.286%, rgb(162,162,162) 82.806%)' }}>
              Axevil Capital
            </h2>
            <p className="font-inter-tight font-medium text-center"
              style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: '#bcbcbc', letterSpacing: '-0.36px', maxWidth: '35.625rem' }}>
              Axevil — технологическая платформа, предоставляющая профессиональным инвесторам и управляющим капиталом прямой доступ к лучшим инвестиционным возможностям частного рынка.
            </p>
          </div>
        </div>

        {/* Stats + platform screenshot */}
        <div className="flex flex-col gap-[1rem] w-full">
          <div className="flex flex-col sm:flex-row gap-[0.5rem] w-full">
            {STATS.map(stat => (
              <div key={stat.value}
                className="flex flex-col gap-[0.25rem] p-[1rem] rounded-[1.25rem] flex-1"
                style={{ background: '#1a1a1a' }}>
                <span className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                  {stat.value}
                </span>
                <span className="font-inter-tight font-medium"
                  style={{ fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)', lineHeight: 1.35, color: '#9b9b9b', letterSpacing: '-0.02em' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Platform screenshot — hidden on mobile */}
          <img
            src="/img/newsletter/newsletter-interface-big.png"
            alt="Axevil Capital — интерфейс платформы"
            className="hidden sm:block w-full rounded-[1.5rem]"
            loading="lazy"
            width={1180}
            height={603}
            style={{ maxWidth: '100%' }}
          />
        </div>
      </div>
    </section>
  )
}
