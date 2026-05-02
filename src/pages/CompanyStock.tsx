import { useState } from 'react'
import Nav from '../components/Nav'

/** Hero — left copy + right price card */
function Hero() {
  return (
    <section className="relative w-full bg-page-bg" style={{ paddingTop: '160px', paddingBottom: '120px' }}>
      <div className="mx-auto w-full max-w-content flex items-start justify-between gap-12">
        {/* Left: heading + description */}
        <div className="flex flex-col gap-6 items-start" style={{ maxWidth: '604px' }}>
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">1.0</span>
            <span className="opacity-80">Invest</span>
          </div>
          <h1 className="font-inter-tight font-semibold text-h1-semi text-white whitespace-pre-line">
            {'Invest in\nAnthropic Stock'}
          </h1>
          <p className="font-inter-tight font-medium text-text-xl text-white/60">
            Anthropic is a frontier-AI company building safer, steerable AI systems. Invest in Anthropic stock to participate in the growth of one of the most important companies of the decade.
          </p>
        </div>

        {/* Right: stock price card */}
        <PriceCard />
      </div>
    </section>
  )
}

function PriceCard() {
  const [tab, setTab] = useState<'buy' | 'sell'>('buy')
  return (
    <div className="rounded-3xl border border-white/10 bg-surface-1" style={{ width: '430px', padding: '24px' }}>
      {/* Buy / Sell tabs */}
      <div className="flex gap-2 p-1 rounded-2xl bg-surface-2 mb-6">
        {(['buy', 'sell'] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={[
              'flex-1 py-3 rounded-xl font-inter-tight font-semibold text-s-semi transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white',
              tab === id ? 'bg-white text-phone-bg' : 'text-white/60 hover:text-white',
            ].join(' ')}
          >
            {id === 'buy' ? 'Buy ANTH' : 'Sell ANTH'}
          </button>
        ))}
      </div>

      {/* Big price */}
      <div className="flex flex-col gap-1 mb-6">
        <span className="font-inter-tight font-medium text-s-med text-white/50">Anthropic consensus price</span>
        <div className="flex items-baseline gap-3">
          <span className="font-inter-tight font-semibold text-h2 text-white">$262.34</span>
          <span className="font-inter-tight font-medium text-text-l text-status-open">+5.2%</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Stat label="Market cap" value="$61.5B" />
        <Stat label="Last raised" value="$3.5B" />
        <Stat label="Investors" value="350+" />
        <Stat label="Status" value="Series E (Active)" />
      </div>

      <button
        type="button"
        className="w-full h-14 rounded-2xl bg-white font-inter-tight font-semibold text-text-btn text-phone-bg hover:scale-[1.01] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        Request access
      </button>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5 p-4 rounded-2xl border border-white/10 bg-surface-2">
      <span className="font-inter-tight font-medium text-s-med text-white/50">{label}</span>
      <span className="font-inter-tight font-semibold text-text-l text-white">{value}</span>
    </div>
  )
}

/** Track stock price chart section */
function TrackPrice() {
  const ranges = ['1W', '1M', '3M', '6M', '1Y', 'All']
  const [range, setRange] = useState('1Y')
  return (
    <section className="w-full bg-page-bg" style={{ paddingBottom: '120px' }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-12 items-start">
        <div className="flex flex-col gap-6 items-start">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">2.0</span>
            <span className="opacity-80">Performance</span>
          </div>
          <h2 className="font-inter-tight font-semibold text-h2 text-white">Track Anthropic Stock Price</h2>
          <p className="font-inter-tight font-medium text-text-xl text-white/60" style={{ maxWidth: '604px' }}>
            Anthropic consensus price reflects the latest secondary-market clearing price across qualified investors and tender events.
          </p>
        </div>

        {/* Chart card */}
        <div className="w-full rounded-3xl border border-white/10 bg-surface-1 overflow-hidden" style={{ padding: '32px' }}>
          {/* Header row: price + range tabs */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex flex-col gap-1">
              <span className="font-inter-tight font-medium text-s-med text-white/50">Anthropic consensus price</span>
              <div className="flex items-baseline gap-3">
                <span className="font-inter-tight font-semibold text-h2 text-white">$262.34</span>
                <span className="font-inter-tight font-medium text-text-l text-status-open">+18.4% YoY</span>
              </div>
            </div>
            <div className="flex gap-1 p-1 rounded-full bg-surface-2">
              {ranges.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={[
                    'px-3 py-1.5 rounded-full font-inter-tight font-medium text-s-med transition-colors',
                    range === r ? 'bg-white text-phone-bg' : 'text-white/60 hover:text-white',
                  ].join(' ')}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Chart placeholder */}
          <ChartPlaceholder />

          {/* Bottom stats row */}
          <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5">
            <BottomStat label="Open" value="$258.40" />
            <BottomStat label="High" value="$264.10" />
            <BottomStat label="Low" value="$257.85" />
            <BottomStat label="Volume" value="74" />
          </div>
        </div>
      </div>
    </section>
  )
}

function BottomStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-inter-tight font-medium text-s-med text-white/50">{label}</span>
      <span className="font-inter-tight font-semibold text-text-l text-white">{value}</span>
    </div>
  )
}

function ChartPlaceholder() {
  // SVG line chart with cyan glow gradient
  return (
    <svg viewBox="0 0 1080 320" className="w-full h-auto" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chart-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#175e6e" />
          <stop offset="100%" stopColor="#d7ffff" />
        </linearGradient>
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d7ffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#d7ffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Fill under line */}
      <path
        d="M0,260 C120,255 220,230 360,210 C480,195 600,180 720,140 C840,105 960,75 1080,40 L1080,320 L0,320 Z"
        fill="url(#chart-fill)"
      />
      {/* Line */}
      <path
        d="M0,260 C120,255 220,230 360,210 C480,195 600,180 720,140 C840,105 960,75 1080,40"
        fill="none"
        stroke="url(#chart-line)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Building safer AI info section */
function CompanyInfo() {
  const stats = [
    { label: 'Founded', value: '2021' },
    { label: 'HQ', value: 'San Francisco, CA' },
    { label: 'Stage', value: 'Series E' },
    { label: 'Sector', value: 'AI Enterprise Software' },
    { label: 'Industry', value: 'Scalable, ethical AI systems' },
  ]
  return (
    <section className="w-full bg-page-bg" style={{ paddingBottom: '120px' }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-8 items-center text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">3.0</span>
            <span className="opacity-80">About</span>
          </div>
          <h2 className="font-inter-tight font-semibold text-h2 text-white whitespace-pre-line text-center">
            {'Building safer AI,\none model at a time'}
          </h2>
          <p className="font-inter-tight font-medium text-text-xl text-white/60 text-center" style={{ maxWidth: '720px' }}>
            Anthropic builds AI systems that are safe, steerable, and helpful. Founded by alumni of OpenAI, the company has shipped Claude — a family of frontier models used by enterprises and developers worldwide.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-5 gap-4 w-full">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2 p-5 rounded-2xl border border-white/10 bg-surface-1">
              <span className="font-inter-tight font-medium text-s-med text-white/50">{s.label}</span>
              <span className="font-inter-tight font-semibold text-text-l text-white">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Yearly Performance table */
function YearlyPerformance() {
  const [tab, setTab] = useState<'yearly' | 'monthly'>('yearly')
  const rows = [
    { date: '2024',    name: 'Series E',  pct: '+18.4%', dir: 'up'   as const, hl: 'Anthropic' },
    { date: '2024 H1', name: 'Series D',  pct: '+12.6%', dir: 'up'   as const, hl: 'Anthropic' },
    { date: '2023',    name: 'Series C',  pct: '-3.2%',  dir: 'down' as const, hl: 'Anthropic' },
    { date: '2023 Q1', name: 'Series B',  pct: '+27.5%', dir: 'up'   as const, hl: 'Anthropic' },
    { date: '2022',    name: 'Series A',  pct: '+8.1%',  dir: 'up'   as const, hl: 'Anthropic' },
  ]
  return (
    <section className="w-full bg-page-bg" style={{ paddingBottom: '120px' }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-10 items-center">
        <div className="flex flex-col gap-8 items-center text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">4.0</span>
            <span className="opacity-80">Returns</span>
          </div>
          <h2 className="font-inter-tight font-semibold text-h2 text-white">Yearly Performance</h2>
          <p className="font-inter-tight font-medium text-text-xl text-white/60 text-center" style={{ maxWidth: '604px' }}>
            Round-by-round price growth across primary and secondary transactions.
          </p>
          <div className="flex gap-1 p-1 rounded-full bg-surface-2">
            {(['yearly', 'monthly'] as const).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={[
                  'px-5 py-2 rounded-full font-inter-tight font-medium text-s-med transition-colors',
                  tab === id ? 'bg-white text-phone-bg' : 'text-white/60 hover:text-white',
                ].join(' ')}
              >
                {id === 'yearly' ? 'Yearly Performance' : 'Monthly Performance'}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="w-full rounded-3xl border border-white/10 bg-surface-1 overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr] px-6 py-4 border-b border-white/5">
            {['Date', 'Round', 'Change', 'Issuer'].map((h) => (
              <span key={h} className="font-inter-tight font-medium text-s-med text-white/50">{h}</span>
            ))}
          </div>
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_1fr] px-6 py-4 border-b border-white/5 last:border-b-0">
              <span className="font-inter-tight font-medium text-text-m text-white">{r.date}</span>
              <span className="font-inter-tight font-medium text-text-m text-white">{r.name}</span>
              <span className={[
                'font-inter-tight font-semibold text-text-m',
                r.dir === 'up' ? 'text-status-open' : 'text-status-closed',
              ].join(' ')}>{r.pct}</span>
              <span className="font-inter-tight font-medium text-text-m text-white">{r.hl}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Why invest 2x2 grid */
function WhyInvest() {
  const cards = [
    { title: 'Leading Tool',   body: 'Claude is among the most adopted frontier-LLM products in enterprise.' },
    { title: 'Safety First',   body: 'Constitutional AI training puts alignment work at the center of the roadmap.' },
    { title: 'Big Partners',   body: 'Strategic partnerships with AWS, Google Cloud, and major enterprises.' },
    { title: 'Real Revenue',   body: 'ARR has grown faster than peers in the same series-stage cohort.' },
  ]
  return (
    <section className="w-full bg-page-bg" style={{ paddingBottom: '120px' }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-10 items-start">
        <div className="flex flex-col gap-6 items-start">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">5.0</span>
            <span className="opacity-80">Rationale</span>
          </div>
          <h2 className="font-inter-tight font-semibold text-h2 text-white">Why invest</h2>
          <p className="font-inter-tight font-medium text-text-xl text-white/60" style={{ maxWidth: '604px' }}>
            Four reasons Anthropic stands out among private AI investments accessible at this stage.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 w-full">
          {cards.map((c) => (
            <div key={c.title} className="rounded-3xl border border-white/10 bg-surface-1" style={{ padding: '32px', minHeight: '280px' }}>
              <div className="flex flex-col gap-4">
                <h3 className="font-inter-tight font-semibold text-h4 text-white">{c.title}</h3>
                <p className="font-inter-tight font-medium text-text-l text-white/60">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** FAQ accordion */
function FAQ() {
  const items = [
    { q: 'Is Anthropic publicly traded?', a: 'No. Anthropic is a private company. Shares are accessible to qualified investors via secondary tenders.' },
    { q: 'Is Anthropic profitable?', a: 'Anthropic is currently growing revenue rapidly while investing heavily in research and infrastructure.' },
    { q: 'How can I buy Anthropic stock?', a: 'Through AXEVIL — submit a request, complete onboarding, and receive an allocation in the next available tender.' },
    { q: 'What is the current Anthropic stock price?', a: 'The current consensus secondary-market price is $262.34 per share.' },
    { q: 'How did Anthropic start?', a: 'Founded in 2021 by Dario and Daniela Amodei together with several former OpenAI researchers.' },
    { q: 'Is Anthropic a public company?', a: 'No, Anthropic remains a private company.' },
    { q: 'How does Anthropic make money?', a: 'Primarily via API access to Claude, enterprise contracts, and the Claude consumer product.' },
    { q: 'What are the risks?', a: 'Pre-IPO investments are illiquid, long-duration, and carry significant risk including loss of capital.' },
  ]
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="w-full bg-page-bg" style={{ paddingBottom: '120px' }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-10 items-start">
        <div className="flex flex-col gap-6 items-start">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">6.0</span>
            <span className="opacity-80">FAQ</span>
          </div>
          <h2 className="font-inter-tight font-semibold text-h2 text-white">Frequently Asked Questions</h2>
        </div>

        <div className="w-full flex flex-col">
          {items.map((it, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  aria-expanded={isOpen}
                >
                  <span className="font-inter-tight font-semibold text-text-xl text-white">{it.q}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={['shrink-0 transition-transform', isOpen ? 'rotate-45' : ''].join(' ')}>
                    <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="pb-6 pr-12">
                    <p className="font-inter-tight font-medium text-text-l text-white/60">{it.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/** Get Updates newsletter CTA */
function GetUpdates() {
  return (
    <section className="relative w-full bg-page-bg overflow-hidden" style={{ paddingBottom: '120px' }}>
      <div className="mx-auto w-full max-w-content flex flex-col gap-10 items-center text-center">
        <div className="flex flex-col gap-6 items-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">7.0</span>
            <span className="opacity-80">Newsletter</span>
          </div>
          <h2 className="font-inter-tight font-semibold text-h2 text-white">Get Updates</h2>
          <p className="font-inter-tight font-medium text-text-xl text-white/60" style={{ maxWidth: '460px' }}>
            Be the first to know about Anthropic tenders, allocation windows, and analyst notes.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-3 w-full"
          style={{ maxWidth: '480px' }}
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 h-14 px-5 rounded-2xl bg-surface-1 border border-white/10 text-white placeholder:text-white/40 font-inter-tight font-medium text-text-l focus:outline-none focus:border-white/30"
          />
          <button
            type="submit"
            className="h-14 px-6 rounded-2xl bg-white font-inter-tight font-semibold text-text-btn text-phone-bg hover:scale-[1.02] transition-transform shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

export default function CompanyStock() {
  return (
    <main className="bg-page-bg overflow-x-clip">
      <Nav active="Company Stock" />
      <Hero />
      <TrackPrice />
      <CompanyInfo />
      <YearlyPerformance />
      <WhyInvest />
      <FAQ />
      <GetUpdates />
    </main>
  )
}
