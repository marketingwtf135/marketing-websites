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
              borderRadius: '52px',
              background: '#060606',
              zIndex: 1,
            }}
          >
            {/* iOS status bar */}
            <div id="block05-ios-statusbar" style={{ height: '54px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 24px 10px', flexShrink: 0 }}>
              <span style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, fontSize: '15px', color: '#ffffff', letterSpacing: '-0.02em' }}>9:41</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {/* Signal bars */}
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none"><rect x="0" y="6" width="3" height="6" rx="1" fill="white"/><rect x="4.5" y="4" width="3" height="8" rx="1" fill="white"/><rect x="9" y="2" width="3" height="10" rx="1" fill="white"/><rect x="13.5" y="0" width="3" height="12" rx="1" fill="white"/></svg>
                {/* WiFi */}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill="white"/><path d="M3.5 7C5 5.2 6.4 4.3 8 4.3s3 .9 4.5 2.7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><path d="M1 4.5C3.2 2 5.5.8 8 .8s4.8 1.2 7 3.7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                {/* Battery */}
                <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35"/><rect x="2" y="2" width="16" height="8" rx="2" fill="white"/><path d="M23 4v4a2 2 0 0 0 0-4Z" fill="white" fillOpacity="0.4"/></svg>
              </div>
            </div>

            {/* Dynamic island */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-8px', marginBottom: '8px' }}>
              <div style={{ width: '120px', height: '34px', background: '#000000', borderRadius: '20px' }} />
            </div>

            {/* Cards */}
            <div
              id="block05-cards"
              style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              {([
                { id: 'card-0', company: 'Space', category: 'Growth Equity' },
                { id: 'card-1', company: 'Space', category: 'Growth Equity' },
                { id: 'card-2', company: 'Space', category: 'Growth Equity' },
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
                  {/* Logo */}
                  <img
                    id={`block05-${item.id}-logo`}
                    alt={item.company}
                    src="/img/block04/spacex-logo.svg"
                    style={{ width: '114px', height: '16px', objectFit: 'contain', objectPosition: 'left' }}
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
