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

            {/* Phone content — 111px top, 499px left */}
            <img
              alt=""
              src="/img/mobile-app-image-01.png"
              width={226}
              height={443}
              className="absolute pointer-events-none"
              style={{ top: '111px', left: '499px' }}
              loading="lazy"
            />
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
