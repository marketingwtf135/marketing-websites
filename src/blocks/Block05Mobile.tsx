export default function Block05Mobile() {
  return (
    <div className="w-full bg-page-bg flex justify-center" style={{ marginTop: '200px' }}>
      <section
        className="relative overflow-clip w-full max-w-content"
        style={{
          height: '1080px',
          borderRadius: '64px',
          border: '3px solid #121212',
        }}
      >
        {/* Section background image */}
        <div className="absolute inset-0 rounded-section pointer-events-none overflow-hidden">
          <img alt="" src="/img/block05/gradient-section-mobile-app.png" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* Heading anchored left, info card anchored right */}
        <h2 className="absolute font-inter-tight font-semibold text-h2 text-white whitespace-pre-line" style={{ left: '60px', top: '60px' }}>
          {'Mobile app \nfor investor'}
        </h2>
        <div className="absolute bg-surface-2 border-8 border-surface-edge flex flex-col items-start p-4 rounded-3xl" style={{ right: '60px', top: '60px', width: '297px' }}>
          <div className="flex flex-col gap-12 items-start text-white w-full">
            <p className="font-inter-tight font-medium text-text-m text-white/50 whitespace-nowrap">1.0</p>
            <div className="flex flex-col gap-4 items-start w-full">
              <p className="font-inter-tight font-semibold text-h5 whitespace-nowrap">Deal Feed</p>
              <p className="font-inter-tight font-medium text-text-m text-white/50 w-full">
                Allocate to SpaceX, Anthropic, xAI
              </p>
            </div>
          </div>
        </div>

        {/* Phone mockup — bezel + coded deal cards (Figma 64:4088), centered */}
        <div
          className="absolute pointer-events-none overflow-hidden"
          style={{ left: '50%', top: '180px', transform: 'translateX(-50%)', width: '390px', height: '844px' }}
        >
          {/* iPhone bezel */}
          <img
            alt=""
            src="/img/block04/iphone-bezel.png"
            className="absolute inset-0 w-full h-full object-contain object-top"
            style={{ zIndex: 2 }}
          />
          {/* Cards — scaled 1.114 from Figma (390/350), starting below ios-items area */}
          <div
            className="absolute overflow-hidden"
            style={{ left: '18px', top: '91px', width: '358px', height: '753px', zIndex: 1 }}
          >
            {([
              { company: 'Space',     category: 'Growth Equity' },
              { company: 'Space',     category: 'Growth Equity' },
              { company: 'Space',     category: 'Growth Equity' },
            ] as const).map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#151515',
                  borderRadius: '27px',
                  padding: '18px',
                  height: '233px',
                  marginBottom: i < 2 ? '27px' : 0,
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <img
                  alt={item.company}
                  src="/img/block04/spacex-logo.svg"
                  style={{ width: '127px', height: '18px', objectFit: 'contain', objectPosition: 'left' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, fontSize: '26px', letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1.25 }}>
                    {item.company}
                  </span>
                  <span style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 500, fontSize: '18px', letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.6)', lineHeight: 1.25 }}>
                    {item.category}
                  </span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(77,186,121,0.1)', border: '1px solid rgba(77,186,121,0.25)', borderRadius: '100px', padding: '12px 16px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '3px', background: '#4dba79', flexShrink: 0 }} />
                  <span style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, fontSize: '15px', color: '#ffffff', whiteSpace: 'nowrap' }}>
                    Accepting allocations
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Bottom fade — matches Figma shadow element */}
          <div
            className="absolute inset-x-0 bottom-0"
            style={{ height: '180px', background: 'linear-gradient(to top, #151515 0%, rgba(21,21,21,0) 100%)', zIndex: 3 }}
          />
        </div>
      </section>
    </div>
  )
}
