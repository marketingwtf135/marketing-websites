function FeatureBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="border border-white/10 flex gap-2.5 h-13 items-center justify-center pl-1 pr-4 py-1 rounded-full shrink-0">
      <div className="bg-[#1a1a1a] rounded-full size-11 shrink-0 flex items-center justify-center">
        <img alt="" src={icon} aria-hidden="true" width={24} height={24} />
      </div>
      <span className="font-inter-tight font-medium text-text-m text-white whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}

export default function Block04Features() {
  return (
    <section className="w-full bg-page-bg flex flex-col items-center" style={{ marginTop: '200px' }}>
      <div className="w-full max-w-content flex flex-col gap-16 items-center">

        {/* Section heading */}
        <div className="flex flex-col gap-8 items-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l leading-[1.35] tracking-[-0.02em] text-neutral-30 whitespace-nowrap">
            <span className="opacity-50">3.0</span>
            <span className="opacity-80">App &amp; Desktop</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-h2 leading-none tracking-[-0.02em] text-transparent bg-clip-text text-center"
            style={{
              backgroundImage: 'linear-gradient(125.696deg, var(--neutral-00) 2.5635%, var(--neutral-40) 99.06%)',
              width: '1075px',
            }}
          >
            {'One platform. Two products. \nOne closed loop.'}
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-5 items-stretch w-full">

          {/* Left card — Axevil App (investors) */}
          <div className="border border-surface-2 flex flex-col gap-8 overflow-hidden p-8 rounded-3xl relative w-full md:shrink-0 md:w-[710px]" style={{ minHeight: '540px' }}>
            {/* Badge */}
            <div className="bg-[rgba(77,186,121,0.1)] border border-[rgba(77,186,121,0.25)] flex h-10 items-center justify-center px-4 rounded-full shrink-0 self-start">
              <span className="font-inter-tight font-medium text-s-med text-status-open whitespace-nowrap">For investors</span>
            </div>

            {/* Copy + features */}
            <div className="flex flex-col flex-1 items-start justify-between min-h-0">
              <div className="flex flex-col gap-4 items-start text-white">
                <h3 className="font-inter-tight font-semibold text-h4 leading-[1.2] whitespace-nowrap">Axevil App</h3>
                <p className="font-inter-tight font-medium text-text-m leading-[1.3] tracking-[-0.02em] text-white/60" style={{ width: '381px' }}>
                  Allocate to the world's leading private technology companies - fully digital, from $50K.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 items-center" style={{ width: '445px' }}>
                <FeatureBadge icon="/img/block04/icon-access.svg" label="Access" />
                <FeatureBadge icon="/img/block04/icon-analyse.svg" label="Analyse" />
                <FeatureBadge icon="/img/block04/icon-invest.svg" label="Invest" />
              </div>
            </div>

            {/* Phone mockup — bezel + coded cards inside (Figma 64:4088) */}
            <div className="absolute pointer-events-none overflow-hidden" style={{ left: '499px', top: '111px', width: '211px', height: '435px' }}>
              {/* iPhone bezel frame */}
              <img
                alt=""
                src="/img/block04/iphone-bezel.png"
                className="absolute inset-0 w-full h-full object-contain object-top"
                style={{ zIndex: 2 }}
              />
              {/* Cards content — positioned within screen area, scaled 0.603 from Figma */}
              <div
                className="absolute overflow-hidden"
                style={{ left: '10px', top: '46px', width: '193px', height: '385px', zIndex: 1 }}
              >
                {([
                  { company: 'SpaceX', category: 'Growth Equity' },
                  { company: 'Anthropic', category: 'Series E' },
                  { company: 'OpenAI', category: 'Late Stage' },
                ] as const).map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#151515',
                      borderRadius: '14px',
                      padding: '10px',
                      height: '126px',
                      marginBottom: i < 2 ? '14px' : 0,
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                    }}
                  >
                    {/* Company logo */}
                    <img
                      alt={item.company}
                      src="/img/block04/spacex-logo.svg"
                      style={{ width: '69px', height: '10px', objectFit: 'contain', objectPosition: 'left' }}
                    />
                    {/* Title + category */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, fontSize: '14px', letterSpacing: '-0.02em', color: '#ffffff', lineHeight: 1.25 }}>
                        {item.company}
                      </span>
                      <span style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 500, fontSize: '10px', letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.6)', lineHeight: 1.25 }}>
                        {item.category}
                      </span>
                    </div>
                    {/* Status badge */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(77,186,121,0.1)', border: '1px solid rgba(77,186,121,0.25)', borderRadius: '100px', padding: '6px 10px' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '2px', background: '#4dba79', flexShrink: 0 }} />
                      <span style={{ fontFamily: '"Inter Tight", sans-serif', fontWeight: 600, fontSize: '8px', color: '#ffffff', whiteSpace: 'nowrap' }}>
                        Accepting allocations
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Bottom fade shadow */}
              <div
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{ height: '100px', background: 'linear-gradient(to top, #151515 0%, rgba(21,21,21,0) 100%)', zIndex: 3 }}
              />
            </div>
          </div>

          {/* Right card — Axevil Pro (wealth managers) */}
          <div className="border border-surface-2 flex flex-col gap-8 overflow-hidden p-8 rounded-3xl flex-1 relative" style={{ height: '540px' }}>
            {/* Badge */}
            <div className="bg-[rgba(84,111,239,0.1)] border border-[rgba(84,111,239,0.25)] flex h-10 items-center justify-center px-4 rounded-full shrink-0 self-start">
              <span className="font-inter-tight font-medium text-s-med text-accent-blue whitespace-nowrap">For wealth managers</span>
            </div>

            {/* Copy + features */}
            <div className="flex flex-col flex-1 items-start justify-between min-h-0">
              <div className="flex flex-col gap-4 items-start">
                <h3 className="font-inter-tight font-semibold text-h4 leading-[1.2] text-white whitespace-nowrap">Axevil Pro</h3>
                <p className="font-inter-tight font-medium text-text-m leading-[1.3] tracking-[-0.02em] text-white/60" style={{ width: '402px' }}>
                  {"Run every client's pre-IPO portfolio\nfrom one institutional-\ngrade interface"}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 items-center" style={{ width: '445px' }}>
                <FeatureBadge icon="/img/block04/icon-source.svg" label="Source" />
                <FeatureBadge icon="/img/block04/icon-manage.svg" label="Manage" />
                <FeatureBadge icon="/img/block04/icon-track.svg" label="Track" />
              </div>
            </div>

            {/* Laptop/app image — 110px top, 484px left */}
            <img
              alt=""
              src="/img/laptop-app-image-01.png"
              width={235}
              height={438}
              className="absolute pointer-events-none"
              style={{ top: '110px', left: '484px' }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
