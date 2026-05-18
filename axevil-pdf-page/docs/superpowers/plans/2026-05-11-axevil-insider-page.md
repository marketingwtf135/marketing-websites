# Axevil Insider Subscription Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive subscription landing page for "Axevil Insider" at `/#insider` by reusing existing Axevil design patterns, tokens, and components.

**Architecture:** New page follows the same pattern as `CompanyStock.tsx` — a page file assembles section components from `src/pages/insider-sections/`. One new shared component `InsiderCtaBtn` scrolls to the form instead of opening the quiz. Routing is added in `App.tsx` alongside the existing `#company-stock` route.

**Tech Stack:** Vite + React 18 + TypeScript + Tailwind CSS 3.4 + Framer Motion 11.3 (already installed)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/InsiderCtaBtn.tsx` | **Create** | White CTA button (same visual as CtaButton) that scrolls to `#insider-form` |
| `src/pages/InsiderPage.tsx` | **Create** | Page assembly + sticky mobile CTA logic |
| `src/pages/insider-sections/IS1Hero.tsx` | **Create** | Hero: eyebrow, H1, subheadline, CTA, trust line, PDF mockup card |
| `src/pages/insider-sections/IS2SocialProof.tsx` | **Create** | 3 quote cards + proof line + secondary CTA |
| `src/pages/insider-sections/IS3WhatYouGet.tsx` | **Create** | 4 product cards in 2×2 grid |
| `src/pages/insider-sections/IS4WhySubscribe.tsx` | **Create** | 5 insight rows: title, text, metric, source |
| `src/pages/insider-sections/IS5HowItWorks.tsx` | **Create** | 4 numbered step cards |
| `src/pages/insider-sections/IS6ReportPreview.tsx` | **Create** | TOC list + report mockup card |
| `src/pages/insider-sections/IS7FAQ.tsx` | **Create** | FAQ accordion (port of CSFAQ pattern) |
| `src/pages/insider-sections/IS8SubscriptionForm.tsx` | **Create** | Full form: email+name required; desktop extras; success state; UTM fields |
| `src/App.tsx` | **Modify** | Add `#insider` route |

---

## Design Tokens Reference

- **Background:** `bg-page-bg` (#080808)
- **Section padding:** `py-section-y` (120px) or `padding-section-t6-b6` (100px each)
- **Container:** `mx-auto w-full max-w-content` (1440px) + `px-content-edge` (240px sides on desktop)
- **H1/H2 gradient:** `linear-gradient(93.581deg, #ffffff 0.176%, #b7b7b7 98.822%)`
- **Eyebrow label:** `font-inter-tight font-medium text-text-l text-neutral-30` with `opacity-50` number + `opacity-80` text
- **Body copy:** `font-inter-tight font-medium text-text-l text-white/60`
- **Card fill:** `bg-surface-2` (#1a1a1a)
- **Card border:** `1px solid rgba(255,255,255,0.08)`
- **Input style:** `height 56px; padding 0 20px; borderRadius 14px; background rgba(255,255,255,0.05); border 1px solid rgba(255,255,255,0.1)`
- **Section number prefix:** `<span className="opacity-50">N.0</span>`
- **Accent/success:** `text-status-open` (#4dba79)

## Responsive Strategy

Use Tailwind's **mobile-first** breakpoints:
- Base = mobile 375px
- `md:` = 768px (tablet)
- `lg:` = 1024px (desktop, full layout)

Replace `px-content-edge` on mobile with `px-5`, tablet `md:px-10`, desktop `lg:px-[240px]`.
Replace `py-section-y` with `py-16 md:py-20 lg:py-[120px]`.
Two-column grids collapse to single column with `grid-cols-1 md:grid-cols-2`.
Three-column grids: `grid-cols-1 md:grid-cols-3`.

---

## Task 1: InsiderCtaBtn component

**Files:**
- Create: `src/components/InsiderCtaBtn.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/InsiderCtaBtn.tsx
import type { ReactNode, CSSProperties } from 'react'

interface InsiderCtaBtnProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  type?: 'button' | 'submit'
  onClick?: () => void
}

export default function InsiderCtaBtn({ children, className = '', style, type = 'button', onClick }: InsiderCtaBtnProps) {
  function handleClick() {
    onClick?.()
    const el = document.getElementById('insider-form')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`relative flex items-center justify-center gap-2.5 h-16 px-8 rounded-2xl font-inter-tight font-semibold text-text-btn text-btn-label hover:scale-[1.02] transition-transform border-b-4 border-btn-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${className}`}
      style={{
        boxShadow: '32px 32px 32px rgba(255,255,255,0.25), 12px 12px 16px rgba(255,255,255,0.25), 2px 2px 8px rgba(255,255,255,0.5)',
        ...style,
      }}
    >
      <div className="absolute inset-0 rounded-2xl bg-white pointer-events-none" />
      <img
        alt=""
        src="/img/block01/btn-overlay.png"
        className="absolute inset-0 w-full h-full rounded-2xl object-bottom mix-blend-overlay pointer-events-none"
      />
      <span className="relative z-10">{children}</span>
    </button>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd "C:\Users\singa\Desktop\Claude\axevil-pdf-page\.claude\worktrees\quirky-bardeen-ae6fae" && npx tsc --noEmit`
Expected: no errors on this file

---

## Task 2: IS1Hero — Hero Section

**Files:**
- Create: `src/pages/insider-sections/IS1Hero.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/pages/insider-sections/IS1Hero.tsx
import InsiderCtaBtn from '../../components/InsiderCtaBtn'

export default function IS1Hero() {
  return (
    <section className="relative w-full bg-page-bg overflow-hidden" style={{ paddingTop: 80 }}>
      <div className="mx-auto w-full max-w-content flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 px-5 md:px-10 lg:px-[240px] py-16 md:py-20 lg:py-[120px]">

        {/* Left: text content */}
        <div className="flex flex-col gap-8 items-start lg:max-w-[640px] w-full">

          {/* Eyebrow */}
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-80">Axevil Insider</span>
          </div>

          {/* H1 */}
          <h1
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(40px, 6vw, 88px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(104.211deg, #ffffff 2.56%, #8f8f8f 99.06%)',
            }}
          >
            Get institutional private markets analytics every week
          </h1>

          {/* Subheadline */}
          <p className="font-inter-tight font-medium text-text-l text-white/60" style={{ maxWidth: 540 }}>
            Pre-IPO Insider Report: full 2025 market review + 2026 outlook · quarterly market review · weekly top-company digest · annual report. Built for wealth managers, family offices, and accredited HNWI.
          </p>

          {/* CTA */}
          <InsiderCtaBtn>Subscribe and get PDF</InsiderCtaBtn>

          {/* Trust line */}
          <p className="font-inter-tight font-medium text-text-m text-white/40">
            $150M AUM · 1,000+ investors · 33 portfolio companies
          </p>
        </div>

        {/* Right: PDF report mockup card — hidden on mobile */}
        <div
          className="hidden lg:flex flex-col shrink-0"
          style={{
            width: 360,
            borderRadius: 24,
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '32px 28px',
            gap: 20,
          }}
        >
          {/* Report header row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span
                className="font-inter-tight font-semibold text-white"
                style={{ fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.4 }}
              >
                Axevil Capital
              </span>
              <p className="font-inter-tight font-semibold text-white" style={{ fontSize: 20, lineHeight: 1.2 }}>
                Pre-IPO Insider Report
              </p>
              <p className="font-inter-tight font-medium text-white/40" style={{ fontSize: 14 }}>
                Q1 2026 · Full-year review + 2026 outlook
              </p>
            </div>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="2" width="10" height="13" rx="2" stroke="white" strokeOpacity="0.6" strokeWidth="1.5"/>
                <path d="M6 6h6M6 9h6M6 12h4" stroke="white" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M13 2v4h4" stroke="white" strokeOpacity="0.4" strokeWidth="1.2"/>
              </svg>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />

          {/* TOC preview */}
          <div className="flex flex-col gap-2">
            {[
              'IPO Pipeline 2026',
              'Funding Rounds Q1 2026',
              'Exits & M&A — Klarna, xAI',
              'Sector Deep-Dives (6)',
              'Top Venture Sectors',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div style={{ width: 4, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                <span className="font-inter-tight font-medium text-white/60" style={{ fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />

          {/* Footer meta */}
          <div className="flex items-center justify-between">
            <span className="font-inter-tight font-medium text-white/30" style={{ fontSize: 12 }}>SEC ERA · CRD #802-126907</span>
            <span
              className="font-inter-tight font-semibold"
              style={{ fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4dba79' }}
            >
              PDF
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## Task 3: IS2SocialProof — Testimonials

**Files:**
- Create: `src/pages/insider-sections/IS2SocialProof.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/pages/insider-sections/IS2SocialProof.tsx
import InsiderCtaBtn from '../../components/InsiderCtaBtn'

const QUOTES = [
  {
    quote: 'Pre-IPO Insider gives me in 2 minutes what used to take 4 hours across Bloomberg, Crunchbase, and LinkedIn.',
    caption: 'Family office · $80M AUM · Dubai',
  },
  {
    quote: 'Since adding 8% private markets exposure to client portfolios, performance is now 4.2% above benchmark.',
    caption: 'Independent advisor · London',
  },
  {
    quote: 'Insider gives me a ready client briefing every quarter.',
    caption: 'Private banker · Top-30 bank · UAE',
  },
]

export default function IS2SocialProof() {
  return (
    <section className="w-full bg-page-bg px-5 md:px-10 lg:px-[240px] py-16 md:py-20 lg:py-[120px]">
      <div className="mx-auto w-full max-w-content flex flex-col gap-12">

        {/* Heading */}
        <h2
          className="font-inter-tight font-semibold text-transparent bg-clip-text text-center"
          style={{
            fontSize: 'clamp(32px, 4vw, 64px)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            backgroundImage: 'linear-gradient(93.581deg, #ffffff 0.176%, #b7b7b7 98.822%)',
          }}
        >
          Trusted by private markets professionals
        </h2>

        {/* Quote cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUOTES.map((q) => (
            <div
              key={q.caption}
              className="flex flex-col justify-between"
              style={{
                background: '#141414',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24,
                padding: '28px 24px',
                gap: 20,
              }}
            >
              {/* Quote icon */}
              <svg width="24" height="18" viewBox="0 0 24 18" fill="none" style={{ opacity: 0.3 }}>
                <path d="M0 18V10.8C0 4.8 3.6 1.2 10.8 0l1.2 1.8C8.4 2.4 6 4.2 5.4 7.2H9V18H0ZM13.2 18V10.8C13.2 4.8 16.8 1.2 24 0l1.2 1.8c-3.6.6-6 2.4-6.6 5.4H22.2V18H13.2Z" fill="white"/>
              </svg>

              <p className="font-inter-tight font-medium text-text-l text-white/80 flex-1">{q.quote}</p>

              <p className="font-inter-tight font-medium text-text-m text-white/40">{q.caption}</p>
            </div>
          ))}
        </div>

        {/* Proof line */}
        <p className="font-inter-tight font-medium text-text-m text-white/40 text-center">
          Top-30 banks · Single-family offices · Private banking groups
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <InsiderCtaBtn>Get Insider Report</InsiderCtaBtn>
        </div>

      </div>
    </section>
  )
}
```

---

## Task 4: IS3WhatYouGet — 4 Product Cards

**Files:**
- Create: `src/pages/insider-sections/IS3WhatYouGet.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/pages/insider-sections/IS3WhatYouGet.tsx

const PRODUCTS = [
  {
    title: 'Pre-IPO Insider Report',
    label: 'Sent immediately after subscription',
    text: 'A full-year private markets report covering 2025 results and the 2026 outlook.',
    content: 'IPO pipeline · funding rounds · valuation shifts · exits & M&A · sector deep-dives · 2026 macro thesis',
  },
  {
    title: 'Quarterly Market Review',
    label: 'Sent immediately, then every quarter',
    text: 'Institutional analysis of the previous quarter across funding rounds, exits, sectors, and IPO pipeline updates.',
    content: 'SpaceX · Anthropic · Databricks · OpenAI · sector focus · watch-list rebalance',
  },
  {
    title: 'Weekly Top-Company Digest',
    label: 'Every Monday',
    text: 'A 5–10 minute weekly briefing on top private companies, active SPVs, valuations, exits, and market signals.',
    content: 'Raised · exits · valuations · M&A · SPV updates · monthly sector deep dive',
  },
  {
    title: 'Annual Market Report',
    label: 'Every January',
    text: 'A full-year review of private markets performance, sector outlooks, Axevil deal track record, and next-year watch-list.',
    content: 'Macro thesis · 6 sector outlooks · deal performance · hit-rate · top-50 watch-list',
  },
]

export default function IS3WhatYouGet() {
  return (
    <section className="w-full bg-page-bg px-5 md:px-10 lg:px-[240px] py-16 md:py-20 lg:py-[120px]">
      <div className="mx-auto w-full max-w-content flex flex-col gap-12">

        {/* Heading */}
        <div className="flex flex-col gap-4 items-start md:items-center text-left md:text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">3.0</span>
            <span className="opacity-80">Subscription</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(32px, 4vw, 64px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(93.581deg, #ffffff 0.176%, #b7b7b7 98.822%)',
            }}
          >
            What you get in one subscription
          </h2>
          <p className="font-inter-tight font-medium text-text-l text-white/60" style={{ maxWidth: 520 }}>
            Four research products covering private markets from weekly signals to annual market outlooks.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUCTS.map((p) => (
            <div
              key={p.title}
              className="flex flex-col gap-5"
              style={{
                background: '#141414',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24,
                padding: '28px 24px',
              }}
            >
              {/* Label badge */}
              <span
                className="font-inter-tight font-medium self-start"
                style={{
                  fontSize: 12,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#4dba79',
                  background: 'rgba(77,186,121,0.08)',
                  border: '1px solid rgba(77,186,121,0.2)',
                  borderRadius: 6,
                  padding: '4px 10px',
                }}
              >
                {p.label}
              </span>

              <div className="flex flex-col gap-3">
                <h3 className="font-inter-tight font-semibold text-h5 text-white">{p.title}</h3>
                <p className="font-inter-tight font-medium text-text-m text-white/60">{p.text}</p>
              </div>

              {/* Content line */}
              <p className="font-inter-tight font-medium text-text-m text-white/30">{p.content}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
```

---

## Task 5: IS4WhySubscribe — 5 Insight Rows

**Files:**
- Create: `src/pages/insider-sections/IS4WhySubscribe.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/pages/insider-sections/IS4WhySubscribe.tsx
import InsiderCtaBtn from '../../components/InsiderCtaBtn'

const INSIGHTS = [
  {
    title: 'Private markets are a $13T market growing faster than public markets',
    text: 'With the subscription, you see key movements in one of the fastest-growing asset classes before they appear in public news cycles.',
    metric: '$4.5T → $13T → $20T',
    source: 'Preqin · McKinsey · Bain',
  },
  {
    title: 'Pre-IPO exposure has historically outperformed 60/40 portfolios',
    text: 'The subscription helps wealth professionals make better decisions about private market allocation in HNWI portfolios.',
    metric: '+10–15% annualized excess return',
    source: 'Cambridge Associates · Hamilton Lane',
  },
  {
    title: 'See market signals 12–18 months before the public cycle',
    text: 'Axevil tracks around 500 private companies so subscribers can see signals before the wider market reacts.',
    metric: '2.8× median multiple',
    source: 'Pitchbook · Bloomberg · Pre-IPO Insider Q1 2026',
  },
  {
    title: 'Access top deals through Axevil SPV structures',
    text: 'Subscribers get priority access to selected SPV rounds through Axevil App / Pro.',
    metric: '$25K–$50K minimum tickets',
    source: 'Axevil Capital · Reg D 506(b) · CRD #802-126907',
  },
  {
    title: 'Read by 1,000+ investors and WM partners',
    text: 'Join a cohort of professionals using Insider to work with HNWI clients across private markets.',
    metric: '1,000+ investors · 150+ WM partners · 6 countries',
    source: 'Axevil Capital metrics Q1 2026',
  },
]

export default function IS4WhySubscribe() {
  return (
    <section className="w-full bg-page-bg px-5 md:px-10 lg:px-[240px] py-16 md:py-20 lg:py-[120px]">
      <div className="mx-auto w-full max-w-content flex flex-col gap-12">

        {/* Heading */}
        <div className="flex flex-col gap-4 items-start">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">4.0</span>
            <span className="opacity-80">Why subscribe</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(32px, 4vw, 64px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(93.581deg, #ffffff 0.176%, #b7b7b7 98.822%)',
            }}
          >
            Why subscribe
          </h2>
          <p className="font-inter-tight font-medium text-text-l text-white/60" style={{ maxWidth: 560 }}>
            Get the market signals, numbers, and deal context wealth professionals need before they become public headlines.
          </p>
        </div>

        {/* Insight rows */}
        <div className="flex flex-col w-full">
          {INSIGHTS.map((ins, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-start gap-6 md:gap-10 py-8"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Left: metric */}
              <div className="flex flex-col gap-1 md:w-48 shrink-0">
                <p
                  className="font-inter-tight font-semibold text-white"
                  style={{ fontSize: 'clamp(16px, 2vw, 22px)', lineHeight: 1.2 }}
                >
                  {ins.metric}
                </p>
                <p className="font-inter-tight font-medium text-white/30" style={{ fontSize: 12 }}>
                  {ins.source}
                </p>
              </div>

              {/* Right: title + text */}
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-inter-tight font-semibold text-h5 text-white">{ins.title}</h3>
                <p className="font-inter-tight font-medium text-text-l text-white/60">{ins.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-start">
          <InsiderCtaBtn>Subscribe</InsiderCtaBtn>
        </div>

      </div>
    </section>
  )
}
```

---

## Task 6: IS5HowItWorks — 4 Step Cards

**Files:**
- Create: `src/pages/insider-sections/IS5HowItWorks.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/pages/insider-sections/IS5HowItWorks.tsx

const STEPS = [
  {
    n: '01',
    title: 'Subscribe today',
    text: 'Enter your email and name. Within minutes, you receive two documents: Pre-IPO Insider Report and the latest quarterly market review.',
    when: 'Today',
  },
  {
    n: '02',
    title: 'Every Monday',
    text: 'Receive a weekly digest on top private companies. 5–10 minutes to read.',
    when: 'Weekly',
  },
  {
    n: '03',
    title: 'Every quarter',
    text: 'Get a new quarterly market review with funding rounds, exits, sector updates, and IPO pipeline changes.',
    when: 'Quarterly',
  },
  {
    n: '04',
    title: 'Every January',
    text: 'Receive the annual report with market review, sector outlook, Axevil deal performance, and next-year watch-list.',
    when: 'Annually',
  },
]

export default function IS5HowItWorks() {
  return (
    <section className="w-full bg-page-bg px-5 md:px-10 lg:px-[240px] py-16 md:py-20 lg:py-[120px]">
      <div className="mx-auto w-full max-w-content flex flex-col gap-12">

        {/* Heading */}
        <div className="flex flex-col gap-4 items-start md:items-center text-left md:text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">5.0</span>
            <span className="opacity-80">How it works</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(32px, 4vw, 64px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(93.581deg, #ffffff 0.176%, #b7b7b7 98.822%)',
            }}
          >
            How it works
          </h2>
          <p className="font-inter-tight font-medium text-text-l text-white/60" style={{ maxWidth: 520 }}>
            Subscribe once. Receive the first reports immediately, then stay updated every week, quarter, and year.
          </p>
        </div>

        {/* Step cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="flex flex-col gap-5"
              style={{
                background: '#141414',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24,
                padding: '28px 24px',
              }}
            >
              {/* Step number */}
              <span
                className="font-inter-tight font-semibold text-white/20"
                style={{ fontSize: 48, lineHeight: 1, letterSpacing: '-0.04em' }}
              >
                {step.n}
              </span>

              <div className="flex flex-col gap-3 flex-1">
                {/* When badge */}
                <span
                  className="font-inter-tight font-medium self-start"
                  style={{
                    fontSize: 12,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 6,
                    padding: '4px 10px',
                  }}
                >
                  {step.when}
                </span>
                <h3 className="font-inter-tight font-semibold text-h5 text-white">{step.title}</h3>
                <p className="font-inter-tight font-medium text-text-m text-white/60">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
```

---

## Task 7: IS6ReportPreview — Report Preview

**Files:**
- Create: `src/pages/insider-sections/IS6ReportPreview.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/pages/insider-sections/IS6ReportPreview.tsx
import InsiderCtaBtn from '../../components/InsiderCtaBtn'

const TOC = [
  'IPO Pipeline 2026 — 22 companies on the watch-list',
  'Funding Rounds Q1 2026 — SpaceX, Anthropic, Databricks deep-dives',
  'Exits & M&A — Klarna, xAI / SpaceX merger, 5 other sales',
  'Sector Deep-Dives — AI Infrastructure, Defense Tech, Energy/Nuclear, Biotech, Climate, Cybersec',
  'Top Venture Sectors',
]

export default function IS6ReportPreview() {
  return (
    <section className="w-full bg-page-bg px-5 md:px-10 lg:px-[240px] py-16 md:py-20 lg:py-[120px]">
      <div className="mx-auto w-full max-w-content flex flex-col gap-12">

        {/* Heading */}
        <div className="flex flex-col gap-4 items-start">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">6.0</span>
            <span className="opacity-80">Report preview</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(32px, 4vw, 64px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(93.581deg, #ffffff 0.176%, #b7b7b7 98.822%)',
            }}
          >
            Inside the next report
          </h2>
          <p className="font-inter-tight font-medium text-text-l text-white/60">
            Preview what's inside Pre-IPO Insider Q2 2026 before subscribing.
          </p>
        </div>

        {/* Report card */}
        <div
          className="flex flex-col md:flex-row gap-8"
          style={{
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24,
            padding: '40px 36px',
          }}
        >
          {/* Left: meta */}
          <div className="flex flex-col gap-6 md:w-64 shrink-0">
            {/* Report badge */}
            <div className="flex flex-col gap-3">
              <span
                className="font-inter-tight font-semibold self-start"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#4dba79',
                  background: 'rgba(77,186,121,0.08)',
                  border: '1px solid rgba(77,186,121,0.2)',
                  borderRadius: 6,
                  padding: '4px 10px',
                }}
              >
                PDF · Q2 2026
              </span>
              <h3 className="font-inter-tight font-semibold text-white" style={{ fontSize: 22, lineHeight: 1.2 }}>
                Pre-IPO Insider Q2 2026
              </h3>
              <p className="font-inter-tight font-medium text-white/40 text-text-m">
                Full private markets review for Q2 2026 — IPO pipeline, funding rounds, exits, M&A, sector analysis.
              </p>
            </div>

            <InsiderCtaBtn style={{ height: 52, fontSize: 16 }}>Get PDF</InsiderCtaBtn>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px self-stretch" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="md:hidden h-px w-full" style={{ background: 'rgba(255,255,255,0.08)' }} />

          {/* Right: TOC */}
          <div className="flex flex-col gap-4 flex-1">
            <p className="font-inter-tight font-medium text-white/40 text-text-m" style={{ letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: 12 }}>
              Table of contents
            </p>
            <div className="flex flex-col gap-0">
              {TOC.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-4"
                  style={{ borderBottom: i < TOC.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
                >
                  <span className="font-inter-tight font-medium text-white/20 shrink-0" style={{ fontSize: 13, minWidth: 24 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-inter-tight font-medium text-text-m text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
```

---

## Task 8: IS7FAQ — FAQ Accordion

**Files:**
- Create: `src/pages/insider-sections/IS7FAQ.tsx`

- [ ] **Step 1: Create the component** (port CSFAQ pattern exactly)

```tsx
// src/pages/insider-sections/IS7FAQ.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQ_ITEMS = [
  {
    q: 'What is the subscription price?',
    a: 'At launch, access is invite-based for wealth managers, family offices, and accredited HNWI. Individual terms are available on request.',
  },
  {
    q: 'What do I receive immediately?',
    a: 'Two documents in one email: the Pre-IPO Insider Report with the full 2025 market review and 2026 outlook, plus the latest quarterly market review.',
  },
  {
    q: 'How often do emails arrive?',
    a: 'The weekly digest arrives every Monday at 9:00 CET. The quarterly review arrives every 3 months. The annual report is sent in January.',
  },
  {
    q: 'Who writes the analysis?',
    a: 'The Axevil Capital select team. Analysts include ex-SocGen and ex-McKinsey professionals with 8+ years of experience.',
  },
  {
    q: 'What is the difference between Axevil Pro and the subscription?',
    a: 'Axevil Pro is a deal flow and AI CRM platform. The subscription is market analytics. Together, they provide research plus access to selected SPV deals.',
  },
  {
    q: 'Can I unsubscribe?',
    a: 'Yes, at any time. Every email includes an unsubscribe link.',
  },
]

export default function IS7FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="w-full bg-page-bg px-5 md:px-10 lg:px-[240px] py-16 md:py-20 lg:py-[120px]">
      <div className="mx-auto w-full max-w-content flex flex-col gap-12">

        {/* Heading */}
        <div className="flex flex-col gap-4 items-start">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">7.0</span>
            <span className="opacity-80">FAQ</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(32px, 4vw, 64px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(93.581deg, #ffffff 0.176%, #b7b7b7 98.822%)',
            }}
          >
            FAQ
          </h2>
        </div>

        {/* Accordion — identical to CSFAQ pattern */}
        <div className="w-full flex flex-col">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-8 text-left outline-none"
                  style={{ padding: '28px 0' }}
                >
                  <span className="font-inter-tight font-semibold text-text-xl text-white">{item.q}</span>
                  <motion.img
                    src="/icons/icon-dd-close.svg"
                    alt=""
                    width={64}
                    height={64}
                    className="shrink-0"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ paddingBottom: 28, paddingRight: 60 }}>
                        <p className="font-inter-tight font-medium text-text-l text-white/60">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
```

---

## Task 9: IS8SubscriptionForm — Form + Success State

**Files:**
- Create: `src/pages/insider-sections/IS8SubscriptionForm.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/pages/insider-sections/IS8SubscriptionForm.tsx
import { useState, useEffect } from 'react'

type FormData = {
  email: string
  name: string
  position: string
  company: string
  aum: string
  // UTM
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
}

const AUM_OPTIONS = ['<$1M', '$1–5M', '$5–20M', '$20–100M', '$100M+']

const AMOCRM_WEBHOOK_URL = '' // TODO: fill in AmoCRM webhook URL

function getUtmParams(): Partial<FormData> {
  if (typeof window === 'undefined') return {}
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source:   p.get('utm_source')   ?? '',
    utm_medium:   p.get('utm_medium')   ?? '',
    utm_campaign: p.get('utm_campaign') ?? '',
    utm_content:  p.get('utm_content')  ?? '',
    utm_term:     p.get('utm_term')     ?? '',
  }
}

export default function IS8SubscriptionForm() {
  const [data, setData] = useState<FormData>({
    email: '', name: '', position: '', company: '', aum: '',
    utm_source: '', utm_medium: '', utm_campaign: '', utm_content: '', utm_term: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setData((prev) => ({ ...prev, ...getUtmParams() }))
    // TODO: track form_view event
  }, [])

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleFocus() {
    // TODO: track form_start event (fire once)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!data.email || !data.name) { setError('Email and name are required.'); return }
    setError('')
    setLoading(true)
    try {
      if (AMOCRM_WEBHOOK_URL) {
        await fetch(AMOCRM_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      }
      // TODO: trigger Salesbot PDF sending
      // TODO: track form_submit event
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
      // TODO: track form_error event
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    height: 56, padding: '0 20px', borderRadius: 14,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    fontFamily: '"Inter Tight", sans-serif',
    fontSize: 16,
    fontWeight: 500,
    width: '100%',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontFamily: '"Inter Tight", sans-serif',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 6,
    display: 'block',
  }

  // Get next Monday date string
  const nextMonday = (() => {
    const d = new Date()
    d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7))
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  })()

  return (
    <section
      id="insider-form"
      className="w-full bg-page-bg px-5 md:px-10 lg:px-[240px] py-16 md:py-20 lg:py-[120px]"
      style={{ scrollMarginTop: 80 }}
    >
      <div className="mx-auto w-full max-w-content flex flex-col gap-12">

        {/* Heading */}
        <div className="flex flex-col gap-4 items-start md:items-center text-left md:text-center">
          <div className="flex gap-2 items-center font-inter-tight font-medium text-text-l text-neutral-30">
            <span className="opacity-50">8.0</span>
            <span className="opacity-80">Subscribe</span>
          </div>
          <h2
            className="font-inter-tight font-semibold text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(32px, 4vw, 64px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              backgroundImage: 'linear-gradient(93.581deg, #ffffff 0.176%, #b7b7b7 98.822%)',
            }}
          >
            Subscribe to Axevil Insider
          </h2>
          <p className="font-inter-tight font-medium text-text-l text-white/60" style={{ maxWidth: 480 }}>
            Get the Pre-IPO Insider Report and the latest quarterly market review delivered to your inbox.
          </p>
        </div>

        {/* Form card */}
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: 640,
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24,
            padding: '40px 36px',
          }}
        >
          {submitted ? (
            /* Success state */
            <div className="flex flex-col gap-6 items-center text-center">
              <div
                className="flex items-center justify-center"
                style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(77,186,121,0.1)', border: '1px solid rgba(77,186,121,0.25)' }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14l6 6 10-10" stroke="#4dba79" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-inter-tight font-semibold text-h5 text-white">
                  Thank you. The PDF has been sent to {data.email}.
                </p>
                <p className="font-inter-tight font-medium text-text-m text-white/50">
                  Check your inbox — the first digest arrives Monday, {nextMonday}.
                </p>
              </div>
              {/* Calendar CTAs */}
              <div className="flex flex-col gap-3 w-full">
                <p className="font-inter-tight font-medium text-text-m text-white/40">Add to calendar: next weekly digest</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Google Calendar', 'Apple Calendar', '.ics'].map((cal) => (
                    <button
                      key={cal}
                      type="button"
                      className="font-inter-tight font-medium text-text-m text-white/60 hover:text-white transition-colors"
                      style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontSize: 14,
                      }}
                      onClick={() => { /* TODO: open calendar link */ }}
                    >
                      {cal}
                    </button>
                  ))}
                </div>
              </div>
              {/* Cross-sell */}
              <p className="font-inter-tight font-medium text-text-m text-white/40">
                Already using Pro?{' '}
                <a href="#" className="text-white/70 underline hover:text-white transition-colors">Click here.</a>
              </p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Required fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label style={labelStyle}>Email *</label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={data.email}
                    onChange={set('email')}
                    onFocus={handleFocus}
                    style={{ ...inputStyle }}
                    className="placeholder:text-white/30 focus:border-white/25"
                  />
                </div>
                <div className="flex flex-col">
                  <label style={labelStyle}>Name *</label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={data.name}
                    onChange={set('name')}
                    style={{ ...inputStyle }}
                    className="placeholder:text-white/30 focus:border-white/25"
                  />
                </div>
              </div>

              {/* Desktop optional fields */}
              <div className="hidden md:grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label style={labelStyle}>Position</label>
                  <input
                    type="text"
                    autoComplete="organization-title"
                    placeholder="Wealth manager, family office..."
                    value={data.position}
                    onChange={set('position')}
                    style={{ ...inputStyle }}
                    className="placeholder:text-white/30 focus:border-white/25"
                  />
                </div>
                <div className="flex flex-col">
                  <label style={labelStyle}>Company / Family office</label>
                  <input
                    type="text"
                    autoComplete="organization"
                    placeholder="Company name"
                    value={data.company}
                    onChange={set('company')}
                    style={{ ...inputStyle }}
                    className="placeholder:text-white/30 focus:border-white/25"
                  />
                </div>
              </div>

              <div className="hidden md:flex flex-col">
                <label style={labelStyle}>AUM bracket</label>
                <select
                  value={data.aum}
                  onChange={set('aum')}
                  style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                  className="placeholder:text-white/30 focus:border-white/25"
                >
                  <option value="">Select AUM range</option>
                  {AUM_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* UTM hidden fields */}
              <input type="hidden" name="utm_source"   value={data.utm_source} />
              <input type="hidden" name="utm_medium"   value={data.utm_medium} />
              <input type="hidden" name="utm_campaign" value={data.utm_campaign} />
              <input type="hidden" name="utm_content"  value={data.utm_content} />
              <input type="hidden" name="utm_term"     value={data.utm_term} />

              {/* Error */}
              {error && (
                <p className="font-inter-tight font-medium text-text-m" style={{ color: '#ff4444' }}>{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="relative flex items-center justify-center gap-2.5 font-inter-tight font-semibold text-btn-label hover:scale-[1.02] transition-transform border-b-4 border-btn-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  height: 56,
                  borderRadius: 14,
                  fontSize: 18,
                  boxShadow: '12px 12px 16px rgba(255,255,255,0.25), 2px 2px 8px rgba(255,255,255,0.5)',
                }}
              >
                <div className="absolute inset-0 bg-white pointer-events-none" style={{ borderRadius: 14 }} />
                <img
                  alt=""
                  src="/img/block01/btn-overlay.png"
                  className="absolute inset-0 w-full h-full object-bottom mix-blend-overlay pointer-events-none"
                  style={{ borderRadius: 14 }}
                />
                <span className="relative z-10">
                  {loading ? 'Sending…' : 'Subscribe and get PDF'}
                </span>
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  )
}
```

---

## Task 10: InsiderPage — Page Assembly + Sticky Mobile CTA

**Files:**
- Create: `src/pages/InsiderPage.tsx`

- [ ] **Step 1: Create the page**

```tsx
// src/pages/InsiderPage.tsx
import { useState, useEffect, useRef } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FadeIn from '../components/FadeIn'
import IS1Hero from './insider-sections/IS1Hero'
import IS2SocialProof from './insider-sections/IS2SocialProof'
import IS3WhatYouGet from './insider-sections/IS3WhatYouGet'
import IS4WhySubscribe from './insider-sections/IS4WhySubscribe'
import IS5HowItWorks from './insider-sections/IS5HowItWorks'
import IS6ReportPreview from './insider-sections/IS6ReportPreview'
import IS7FAQ from './insider-sections/IS7FAQ'
import IS8SubscriptionForm from './insider-sections/IS8SubscriptionForm'

export default function InsiderPage() {
  const [stickyVisible, setStickyVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Scroll depth tracking
    const thresholds = [25, 50, 75, 100]
    const fired = new Set<number>()
    function onScroll() {
      const scrollPct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      thresholds.forEach((t) => {
        if (scrollPct >= t && !fired.has(t)) {
          fired.add(t)
          // TODO: track scroll_${t} event
        }
      })

      // Hero passed?
      const heroBottom = (heroRef.current?.getBoundingClientRect().bottom ?? 0) + window.scrollY
      const scrolled = window.scrollY + window.innerHeight

      // Form visible?
      formRef.current = formRef.current ?? document.getElementById('insider-form') as HTMLElement
      const formTop = formRef.current ? formRef.current.getBoundingClientRect().top + window.scrollY : Infinity
      const formBottom = formRef.current ? formRef.current.getBoundingClientRect().bottom + window.scrollY : Infinity
      const viewportBottom = window.scrollY + window.innerHeight

      const pastHero = window.scrollY > heroBottom - 100
      const formNear = viewportBottom > formTop - 100 && window.scrollY < formBottom
      setStickyVisible(pastHero && !formNear)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToForm() {
    document.getElementById('insider-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="bg-page-bg overflow-x-clip">
      <Nav active="Insider" />
      {/* Spacer for fixed nav */}
      <div style={{ height: 80 }} />

      <div ref={heroRef}>
        <IS1Hero />
      </div>
      <FadeIn><IS2SocialProof /></FadeIn>
      <FadeIn><IS3WhatYouGet /></FadeIn>
      <FadeIn><IS4WhySubscribe /></FadeIn>
      <FadeIn><IS5HowItWorks /></FadeIn>
      <FadeIn><IS6ReportPreview /></FadeIn>
      <FadeIn><IS7FAQ /></FadeIn>
      <IS8SubscriptionForm />
      <Footer />

      {/* Sticky mobile CTA — shown after Hero, hidden near form, mobile only */}
      {stickyVisible && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden"
          style={{
            padding: '12px 16px',
            background: 'rgba(8,8,8,0.95)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <button
            type="button"
            onClick={scrollToForm}
            className="relative flex items-center justify-center w-full font-inter-tight font-semibold text-btn-label border-b-4 border-btn-border hover:scale-[1.02] transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            style={{
              height: 56,
              borderRadius: 14,
              fontSize: 18,
              boxShadow: '12px 12px 16px rgba(255,255,255,0.25), 2px 2px 8px rgba(255,255,255,0.5)',
            }}
          >
            <div className="absolute inset-0 bg-white pointer-events-none" style={{ borderRadius: 14 }} />
            <img
              alt=""
              src="/img/block01/btn-overlay.png"
              className="absolute inset-0 w-full h-full object-bottom mix-blend-overlay pointer-events-none"
              style={{ borderRadius: 14 }}
            />
            <span className="relative z-10">Subscribe and get PDF</span>
          </button>
        </div>
      )}
    </main>
  )
}
```

---

## Task 11: Wire App.tsx routing

**Files:**
- Modify: `src/App.tsx` lines 19–76

- [ ] **Step 1: Add import and route**

In `src/App.tsx`, after `import CompanyStock from './pages/CompanyStock'`, add:

```tsx
import InsiderPage from './pages/InsiderPage'
```

In the router return, change:
```tsx
{hash === '#company-stock' ? <CompanyStock /> : <Home />}
```
to:
```tsx
{hash === '#company-stock'
  ? <CompanyStock />
  : hash === '#insider'
  ? <InsiderPage />
  : <Home />}
```

---

## Task 12: TypeScript check + dev server smoke test

- [ ] **Step 1: Run TypeScript check**

```bash
cd "C:\Users\singa\Desktop\Claude\axevil-pdf-page\.claude\worktrees\quirky-bardeen-ae6fae"
npx tsc --noEmit
```
Expected: 0 errors

- [ ] **Step 2: Start dev server and navigate to /#insider**

```bash
pnpm dev
```
Then open `http://localhost:5173/#insider` and confirm the page renders.

- [ ] **Step 3: Visual QA at 1440 / 768 / 375**

At each width, confirm:
- No horizontal scroll
- All text readable
- Hero renders cleanly
- Form visible
- Sticky mobile CTA appears after scrolling (mobile only)
- FAQ accordion opens/closes
- Form submit shows success state

---

## Spec Coverage Check

| TZ Requirement | Task |
|---|---|
| Section 1 — Hero | Task 2 (IS1Hero) |
| Section 2 — Social Proof | Task 3 (IS2SocialProof) |
| Section 3 — What You Get | Task 4 (IS3WhatYouGet) |
| Section 4 — Why Subscribe | Task 5 (IS4WhySubscribe) |
| Section 5 — How It Works | Task 6 (IS5HowItWorks) |
| Section 6 — Report Preview | Task 7 (IS6ReportPreview) |
| Section 7 — FAQ | Task 8 (IS7FAQ) |
| Section 8 — Subscription Form | Task 9 (IS8SubscriptionForm) |
| Section 9 — Footer | Existing Footer component |
| Sticky mobile CTA | Task 10 (InsiderPage) |
| Routing | Task 11 (App.tsx) |
| UTM fields | Task 9 |
| AmoCRM placeholder | Task 9 |
| Scroll tracking | Task 10 |
| Responsive 1440/768/375 | All tasks use mobile-first classes |
| CTA scrolls to form | Task 1 (InsiderCtaBtn) |
