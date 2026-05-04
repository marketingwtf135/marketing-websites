/** Section 3 — Building safer AI (Figma 89:372) */
export default function CSCompanyInfo() {
  return (
    <section className="w-full bg-page-bg" style={{ paddingBottom: 0, marginBottom: 0 }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-12 items-center">

        {/* Heading */}
        <div className="flex flex-col gap-8 items-center text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">3.0</span>
            <span className="opacity-80">About Anthropic</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-h2 pb-1 text-white text-center"
            style={{ lineHeight: 1 }}
          >
            Building safer AI,<br />one model at a time
          </h2>
          <p
            className="font-inter-tight font-medium text-text-l text-white/60 text-center"
            style={{ maxWidth: 710 }}
          >
            Anthropic builds safe, steerable, and interpretable AI. Founded in 2021 by former OpenAI
            leaders, it created the Claude models and focuses on "Constitutional AI" to keep systems
            helpful and harmless. While Anthropic is not yet public, its rapid growth makes it one of the
            most closely watched private companies.
          </p>
        </div>

        {/* Stats card */}
        <div
          className="rounded-2xl"
          style={{ background: '#101010', border: '1px solid #151515', width: 900 }}
        >
          {/* Row 1 */}
          <div
            className="grid grid-cols-2"
            style={{ borderBottom: '1px solid #1d1d1d', padding: '24px' }}
          >
            <StatCell label="Founded"        value="2021" />
            <StatCell label="HQ"             value="San Francisco, CA" border />
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-2" style={{ padding: '24px' }}>
            <StatCell label="Total Funding"  value="AI & Enterprise Software" />
            <StatCell label="Focus"          value="Reliable, ethical AI systems" border />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCell({ label, value, border }: { label: string; value: string; border?: boolean }) {
  return (
    <div
      className="flex flex-col gap-4"
      style={border ? { borderLeft: '1px solid #1d1d1d', paddingLeft: 24 } : undefined}
    >
      <span className="font-inter-tight font-medium text-text-m text-white/60">{label}</span>
      <span className="font-inter-tight font-semibold text-h5 text-white">{value}</span>
    </div>
  )
}
