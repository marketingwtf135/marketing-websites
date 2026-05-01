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

        {/* Phone mockup — SVG frame + coded deal cards, animation-ready */}
        <div
          id="block05-phone"
          className="absolute pointer-events-none overflow-hidden"
          style={{ left: '50%', top: '180px', transform: 'translateX(-50%)', width: '390px', height: '797px' }}
        >
          {/* Screen area — #060606 background, BELOW frame */}
          <div
            id="block05-screen"
            className="absolute overflow-hidden"
            style={{
              left: '7px', top: '7px', width: '376px', height: '784px',
              borderRadius: '52px',
              background: '#060606',
              zIndex: 1,
            }}
          >
            {/* Cards list — starts below dynamic island (~58px), SVG-logo + HTML cards */}
            <div
              id="block05-cards"
              style={{ padding: '58px 16px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}
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
                    gap: '14px',
                    flexShrink: 0,
                  }}
                >
                  {/* Logo — SVG for animation */}
                  <img
                    id={`block05-${item.id}-logo`}
                    alt={item.company}
                    src="/img/block04/spacex-logo.svg"
                    style={{ width: '114px', height: '16px', objectFit: 'contain', objectPosition: 'left' }}
                  />
                  {/* Text */}
                  <div id={`block05-${item.id}-text`} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span id={`block05-${item.id}-name`} style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, fontSize: '24px', letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1.25 }}>
                      {item.company}
                    </span>
                    <span id={`block05-${item.id}-category`} style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 500, fontSize: '16px', letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.6)', lineHeight: 1.25 }}>
                      {item.category}
                    </span>
                  </div>
                  {/* Status badge */}
                  <div
                    id={`block05-${item.id}-badge`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(77,186,121,0.1)', border: '1px solid rgba(77,186,121,0.25)', borderRadius: '160px', padding: '12px 16px', alignSelf: 'flex-start' }}
                  >
                    <div id={`block05-${item.id}-dot`} style={{ width: '8px', height: '8px', borderRadius: '8px', background: '#4dba79', flexShrink: 0 }} />
                    <span style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, fontSize: '14px', color: '#ffffff', whiteSpace: 'nowrap' }}>
                      Accepting allocations
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom fade — masks card overflow */}
            <div
              id="block05-screen-fade"
              className="absolute inset-x-0 bottom-0"
              style={{ height: '160px', background: 'linear-gradient(to top, #060606 0%, transparent 100%)', pointerEvents: 'none' }}
            />
          </div>

          {/* SVG iPhone frame — on TOP of screen content, screen rect is transparent */}
          <img
            id="block05-phone-frame"
            alt=""
            src="/img/block05/iphone-frame.svg"
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 3 }}
          />
        </div>
      </section>
    </div>
  )
}
