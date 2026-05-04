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

        {/* Phone mockup — PNG bezel + iOS items + coded deal cards */}
        {/* Outer wrapper clips everything to the bezel's bottom edge */}
        <div
          id="block05-phone"
          className="absolute pointer-events-none overflow-hidden"
          style={{ left: '50%', top: '180px', transform: 'translateX(-50%)', width: '390px', height: '797px' }}
        >
          {/* Screen — #060606, fills inside of bezel, clips at bottom */}
          <div
            id="block05-screen"
            className="absolute overflow-hidden"
            style={{
              left: '7px', top: '7px', width: '376px', height: '783px',
              borderRadius: '80px',
              background: '#060606',
              zIndex: 1,
            }}
          >
            {/* iOS Navigation Bar — Figma 87:182, scaled ×1.074 (376/350) */}
            <div id="block05-ios-navbar" style={{ width: '100%', flexShrink: 0 }}>
              {/* Status Bar row: 47px × 1.074 = ~50px */}
              <div style={{ height: '50px', paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Time — left */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', paddingLeft: '15px', paddingRight: '6px' }}>
                  <span style={{ fontFamily: '"SF Pro", -apple-system, sans-serif', fontWeight: 590, fontSize: '15.9px', color: '#ffffff', lineHeight: '20.6px', whiteSpace: 'nowrap' }}>
                    9:41
                  </span>
                </div>
                {/* Dynamic Island spacer — 108px × 1.074 = ~116px */}
                <div style={{ width: '116px', height: '9px', flexShrink: 0 }} />
                {/* Icons — right */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6.5px', paddingLeft: '6px', paddingRight: '15px' }}>
                  <img alt="" src="/img/block05/ios-cellular.svg" style={{ width: '17.9px', height: '11.4px', display: 'block' }} />
                  <img alt="" src="/img/block05/ios-wifi.svg"     style={{ width: '16px',   height: '11.5px', display: 'block' }} />
                  <img alt="" src="/img/block05/ios-battery.svg"  style={{ width: '25.5px', height: '12.1px', display: 'block' }} />
                </div>
              </div>
              {/* Dynamic Island area — NOT rendered here, already visible in iphone-bezel.png */}
              {/* Spacer replaces the removed pill + nav contents row: keeps status bar but moves cards up ~60px */}
              <div style={{ height: '24px' }} />
            </div>

            {/* Cards */}
            <div
              id="block05-cards"
              style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              {([
                { id: 'card-0', company: 'Space',     category: 'Growth Equity', logo: '/img/block05/logo-spacex.svg',    logoW: '114px', logoH: '16px' },
                { id: 'card-1', company: 'Anthropic',  category: 'Growth Equity', logo: '/img/block05/logo-anthropic.svg', logoW: '23px',  logoH: '16px' },
                { id: 'card-2', company: 'Cursor',     category: 'Growth Equity', logo: '/img/block05/logo-cursor.svg',   logoW: '20px',  logoH: '20px' },
              ] as const).map((item) => (
                <div
                  id={`block05-${item.id}`}
                  key={item.id}
                  style={{
                    background: '#151515',
                    borderRadius: '24px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    flexShrink: 0,
                  }}
                >
                  {/* Logo — unique per company */}
                  <img
                    id={`block05-${item.id}-logo`}
                    alt={item.company}
                    src={item.logo}
                    style={{ width: item.logoW, height: item.logoH, objectFit: 'contain', objectPosition: 'left' }}
                  />
                  {/* Text block — 24px gap from logo */}
                  <div id={`block05-${item.id}-text`} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span id={`block05-${item.id}-name`} style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, fontSize: '24px', letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1.25 }}>
                      {item.company}
                    </span>
                    <span id={`block05-${item.id}-category`} style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 500, fontSize: '16px', letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.6)', lineHeight: 1.25 }}>
                      {item.category}
                    </span>
                  </div>
                  {/* Badge — 40px gap from text block */}
                  <div
                    id={`block05-${item.id}-badge`}
                    style={{ marginTop: '40px', display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(77,186,121,0.1)', border: '1px solid rgba(77,186,121,0.25)', borderRadius: '160px', padding: '12px 16px', alignSelf: 'flex-start' }}
                  >
                    <div id={`block05-${item.id}-dot`} style={{ width: '8px', height: '8px', borderRadius: '8px', background: '#4dba79', flexShrink: 0 }} />
                    <span style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, fontSize: '14px', color: '#ffffff', whiteSpace: 'nowrap' }}>
                      Accepting allocations
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom fade for depth */}
            <div
              id="block05-screen-fade"
              className="absolute inset-x-0 bottom-0"
              style={{ height: '200px', background: 'linear-gradient(to top, #060606 30%, transparent 100%)', pointerEvents: 'none' }}
            />
          </div>

          {/* Original PNG bezel — on top, clips/frames the screen */}
          <img
            id="block05-phone-frame"
            alt=""
            src="/img/block04/iphone-bezel.png"
            width={390}
            height={844}
            className="absolute inset-0 w-full h-full object-contain object-top pointer-events-none"
            style={{ zIndex: 2 }}
          />
        </div>
      </section>
    </div>
  )
}
