# Webinar Responsive / Mobile-First Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Axevil webinar landing page pixel-perfect on all viewports (320px → 2560px) using mobile-first layout, rem-based typography, and tasteful framer-motion responsive animations.

**Architecture:** Convert all hardcoded px font/spacing values to a rem scale (1rem = 16px), then implement mobile-first breakpoints per section. Animations are reduced/disabled on small screens via `useReducedMotion` and CSS media queries.

**Tech Stack:** React 18, Vite, Tailwind CSS v3, framer-motion v11, TypeScript

---

## Rem Scale Reference

| px   | rem     | Usage                         |
|------|---------|-------------------------------|
| 88   | 5.5rem  | Stat numbers (Why Axevil)     |
| 72   | 4.5rem  | H2 headings desktop           |
| 64   | 4rem    | Form H2, big headline         |
| 48   | 3rem    | H2 headings tablet            |
| 40   | 2.5rem  | H2 headings mobile            |
| 36   | 2.25rem | H2 mobile min                 |
| 32   | 2rem    | H3 desktop                    |
| 24   | 1.5rem  | H3 / card titles              |
| 20   | 1.25rem | Body large / agenda text      |
| 18   | 1.125rem| Bio text / body medium        |
| 16   | 1rem    | Base body text                |
| 15   | 0.9375rem| Cards body                   |
| 14   | 0.875rem | Labels, nav, captions        |
| 13   | 0.8125rem| Captions, timestamps         |
| 12   | 0.75rem  | Legal / footnotes            |

## Breakpoints (Tailwind defaults)

| Name | Width  | Device               |
|------|--------|----------------------|
| —    | 0+     | Mobile portrait      |
| sm   | 640px  | Mobile landscape     |
| md   | 768px  | Tablet portrait      |
| lg   | 1024px | Tablet landscape     |
| xl   | 1280px | Desktop              |
| 2xl  | 1536px | Wide desktop         |

---

## Files Modified

| File | Changes |
|------|---------|
| `src/pages/wb-sections/WBNav.tsx` | px → rem, mobile hamburger menu |
| `src/pages/wb-sections/WBHero.tsx` | rem fonts, mobile stack, smaller brand logos |
| `src/pages/wb-sections/WBWhoFor.tsx` | single-col mobile, center stack, rem fonts |
| `src/pages/wb-sections/WBWhyAxevil.tsx` | stats 2-col mobile, rem stat numbers |
| `src/pages/wb-sections/WBWhyAttend.tsx` | single-col mobile, rem fonts |
| `src/pages/wb-sections/WBWhatCover.tsx` | stacked cards mobile, rem fonts |
| `src/pages/wb-sections/WBSpeaker.tsx` | condensed bio layout mobile |
| `src/pages/wb-sections/WBSchedule.tsx` | time pill below title on mobile |
| `src/pages/wb-sections/WBForm.tsx` | hidden shines on mobile, full-width inputs |
| `src/pages/wb-sections/WBFooter.tsx` | stacked layout mobile |
| `src/pages/wb-sections/WBCtaButton.tsx` | full-width on mobile |
| `src/pages/Webinar.tsx` | disable scale/radius animations on mobile |

---

## Task 1: WBNav — mobile-first navigation

**Files:**
- Modify: `src/pages/wb-sections/WBNav.tsx`

### What to implement
- Nav links hidden on `< lg`, show hamburger icon
- Mobile: only logo + "Reserve a seat" button
- CTA button: `border-radius: 0.5rem` (was 16px)
- All font sizes → rem
- Nav height: `4rem` (was 64px)

- [ ] **Step 1: Update WBNav.tsx**

```tsx
// Nav height → 4rem
// Logo area stays
// Links: hidden below lg, add mobile menu toggle state
// CTA border-radius: 1rem

export default function WBNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(NAV_LINKS.map(l => l.id))

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 border-b border-nav-border bg-nav-bg"
        style={{ height: '4rem' }}
      >
        <div className="mx-auto w-full max-w-[1440px] h-full flex items-center justify-between px-5 lg:px-20">
          <a href="#" aria-label="AXEVIL Capital" className="shrink-0">
            <img src="/img/block01/logo.svg" alt="AXEVIL Capital" width={110} height={17} />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, id }) => {
              const isActive = active === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollTo(id)}
                  className={`flex items-center h-9 px-4 rounded-full font-inter-tight font-medium text-[0.8125rem] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                    isActive ? 'text-white bg-[#1a1a1a]' : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            {/* CTA — always visible */}
            <button
              type="button"
              onClick={scrollToForm}
              className="flex items-center justify-center font-inter-tight font-semibold text-[0.875rem] text-phone-bg bg-white hover:scale-[1.02] transition-transform shrink-0"
              style={{ height: '2.25rem', padding: '0 1.25rem', borderRadius: '1rem' }}
            >
              Reserve a seat
            </button>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setMenuOpen(o => !o)}
              className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8 focus-visible:outline-none"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`block h-px bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`block h-px bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden flex flex-col py-4 bg-nav-bg border-b border-nav-border"
          >
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                onClick={() => { scrollTo(id); setMenuOpen(false) }}
                className="w-full text-left px-5 py-3 font-inter-tight font-medium text-[1rem] text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Add AnimatePresence import**

Add `import { AnimatePresence, motion, ... }` and `import { useState } from 'react'` if not present.

- [ ] **Step 3: Verify no TypeScript errors**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add src/pages/wb-sections/WBNav.tsx
git commit -m "responsive: WBNav mobile hamburger + rem sizes"
```

---

## Task 2: WBHero — mobile-first hero

**Files:**
- Modify: `src/pages/wb-sections/WBHero.tsx`

### What to implement
- H1: `clamp(1.75rem, 5vw, 5.5rem)` (was clamp in px)
- Subheadline: `clamp(1rem, 1.4vw, 1.125rem)`
- Date badge: `0.875rem`
- Brand logos: wrap + smaller on mobile (48px → responsive)
- CTA: full-width on mobile
- Padding: `pt-5 pb-16` mobile → `pt-2.5 pb-20` desktop

- [ ] **Step 1: Update WBHero.tsx**

```tsx
// H1
<h1
  style={{
    fontSize: 'clamp(1.75rem, 5vw, 5.5rem)',
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #b7b7b7 99.06%)',
  }}
  className="font-inter-tight font-semibold text-transparent bg-clip-text w-full"
>

// Subheadline
<p style={{ maxWidth: '37.5rem', fontSize: 'clamp(1rem, 1.4vw, 1.125rem)' }}>

// Date badge
style={{ fontSize: '0.875rem' }}

// Brand logos — smaller on mobile
<div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3" style={{ marginTop: '1rem' }}>
  {BRAND_LOGOS.map((b, i) => (
    <div style={{ width: 48, height: 48, borderRadius: 10, background: '#141414' }}
         className="sm:w-16 sm:h-16 flex items-center justify-center">
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Visual check on 375px and 768px**

Load `http://localhost:5173/#webinar`, resize DevTools to 375px and 768px, confirm:
- H1 readable, no overflow
- Brand logos wrap cleanly
- CTA button doesn't overflow

- [ ] **Step 4: Commit**

```bash
git add src/pages/wb-sections/WBHero.tsx
git commit -m "responsive: WBHero rem fonts + mobile logo wrap"
```

---

## Task 3: WBWhoFor — mobile single-column

**Files:**
- Modify: `src/pages/wb-sections/WBWhoFor.tsx`

### What to implement
- Grid: `grid-cols-1 sm:grid-cols-1 md:grid-cols-3`
- Card height: `auto` on mobile (not fixed 450px)
- H2: `clamp(2.25rem, 5vw, 4.5rem)`
- Card padding: `1.25rem` mobile → `1.5rem` desktop
- Icon: `5rem` (80px) mobile → `8rem` (128px) desktop
- Heading text: `1.25rem` (20px) mobile → `1.5rem` (24px) desktop

- [ ] **Step 1: Update WBWhoFor.tsx**

```tsx
// Section wrapper
<div className="mx-auto w-full max-w-[1440px]" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>

// H2
<h2 style={{
  fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
  lineHeight: 1.05,
  letterSpacing: '-0.02em',
  backgroundImage: 'linear-gradient(95deg, #ffffff -2.56%, #b7b7b7 99.06%)',
  overflow: 'visible',
}}>

// Grid — single col mobile
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

// Card — no fixed height on mobile
<div style={{ padding: '1.25rem', borderRadius: '1.5rem', ... }}>
  // Height: only fix on md+, use class: className="md:h-[450px]"
  
// Icon — responsive size
<img src={card.icon} alt="" width={80} height={80}
  className="md:w-32 md:h-32" style={{ objectFit: 'contain' }} />

// H3
<h3 style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', ... }}>

// Body
<p style={{ fontSize: '0.9375rem', lineHeight: 1.5 }}>
```

- [ ] **Step 2: Verify layout at 375px**

No horizontal scroll. Cards stack properly.

- [ ] **Step 3: Commit**

```bash
git add src/pages/wb-sections/WBWhoFor.tsx
git commit -m "responsive: WBWhoFor mobile single-col + rem"
```

---

## Task 4: WBWhyAxevil — responsive stats

**Files:**
- Modify: `src/pages/wb-sections/WBWhyAxevil.tsx`

### What to implement
- H2: `clamp(1.75rem, 3.5vw, 3rem)`
- Stats grid: `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`
- Stat value: `clamp(2.5rem, 7vw, 5.5rem)` (was hard 88px)
- Stat label: `0.875rem`
- Padding: `5rem` mobile → `6.25rem` desktop
- Hide shine image on mobile (`hidden lg:block`)

- [ ] **Step 1: Update WBWhyAxevil.tsx**

```tsx
// Stat value
<span style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: '110%', letterSpacing: '-0.1em' }}>

// Stat label
<span className="font-inter-tight font-medium text-white/45" style={{ fontSize: '0.875rem' }}>

// H2
<h2 style={{
  fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
  ...
}}>

// Hide shine on mobile
<img className="hidden lg:block absolute top-0 right-0 ..." />

// Padding
style={{ minHeight: 'inherit', paddingTop: '5rem', paddingBottom: '5rem' }}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/wb-sections/WBWhyAxevil.tsx
git commit -m "responsive: WBWhyAxevil rem stats + hide shine mobile"
```

---

## Task 5: WBWhyAttend — single-col mobile + photo height

**Files:**
- Modify: `src/pages/wb-sections/WBWhyAttend.tsx`

### What to implement
- Grid: `grid-cols-1 md:grid-cols-2`
- Card max-width: `100%` (was `710px` — let it grow)
- Photo height: `12rem` (192px) mobile → `17.5rem` (280px) desktop
- H2: `clamp(2.25rem, 5vw, 4.5rem)`
- Metric font: `clamp(1.125rem, 2vw, 1.5rem)` (was 24px)
- Caption H3: `1.125rem` → `1.25rem` desktop
- Padding top: `8rem` mobile → `12.5rem` desktop

- [ ] **Step 1: Update WBWhyAttend.tsx**

```tsx
// Photo block
<div style={{
  height: 'clamp(12rem, 20vw, 17.5rem)',
  alignSelf: 'stretch',
  borderRadius: '1rem',
}}>

// Card container
<div style={{
  width: '100%',
  maxWidth: '100%',  // remove 710px constraint on mobile
  ...
}}>

// Metric pill
<span style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', ... }}>

// Caption H3
<h3 style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', ... }}>

// Padding-top responsive
style={{ paddingTop: 'clamp(5rem, 10vw, 12.5rem)', paddingBottom: 0 }}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/wb-sections/WBWhyAttend.tsx
git commit -m "responsive: WBWhyAttend single-col mobile + photo height"
```

---

## Task 6: WBWhatCover — mobile stack

**Files:**
- Modify: `src/pages/wb-sections/WBWhatCover.tsx`

### What to implement
- Row 1: `flex-col` on mobile (not flex-row), gap `1rem`
- Row 2: same
- Card height: `auto` on mobile (remove `height={198}` on mobile)
- Body font: `clamp(1rem, 1.5vw, 1.25rem)`
- Number: `0.875rem`
- H2: `clamp(2.25rem, 5vw, 4.5rem)`

- [ ] **Step 1: Update WBWhatCover.tsx**

```tsx
// Rows — wrap at sm
<div className="flex flex-col sm:flex-row gap-[1rem]">

// AgendaCard — height conditional
function AgendaCard({ ..., height, ... }) {
  return (
    <div style={{
      padding: '1.5rem',
      gap: '2rem',        // 48px → 2rem but smaller mobile
      flex: flex ?? '1 0 0',
      borderRadius: '1.5rem',
      background: '#0d0d0d',
      height: height ? undefined : 'auto',  // ignore fixed height on mobile
      minHeight: height ? 'auto' : undefined,
    }}
    className={height ? `sm:h-[${height}px]` : ''}
    >

// Number
<span style={{ fontSize: '0.875rem', ... }}>

// Body
<p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', ... }}>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/wb-sections/WBWhatCover.tsx
git commit -m "responsive: WBWhatCover mobile stack + rem"
```

---

## Task 7: WBSpeaker — mobile condensed layout

**Files:**
- Modify: `src/pages/wb-sections/WBSpeaker.tsx`

### What to implement
- Card: `height: auto` on mobile (not fixed 750px), `min-height: 28rem`
- Name H3: `clamp(1.25rem, 2.5vw, 1.875rem)`
- Bio: `clamp(0.875rem, 1.5vw, 1.125rem)`
- Photo: `width: clamp(18rem, 50vw, 44.6875rem)`, `height: clamp(16rem, 45vw, 43.75rem)`
- Name/bio stack vertically on mobile
- Heading H2: `clamp(2.5rem, 6vw, 5.5rem)`

- [ ] **Step 1: Update WBSpeaker.tsx**

```tsx
// Card
<div style={{
  minHeight: 'clamp(28rem, 50vw, 46.875rem)',
  height: 'auto',
  padding: '2rem',
  ...
}}>

// Name H3
<h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)', ... }}>

// Bio paragraph
<p style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)', ... }}>

// Photo
<img style={{
  width: 'clamp(16rem, 45vw, 44.6875rem)',
  height: 'clamp(14rem, 40vw, 43.75rem)',
  ...
}} />

// Top row: stack on mobile
<div className="relative flex flex-col md:flex-row md:justify-between gap-6 md:gap-12 w-full">
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/wb-sections/WBSpeaker.tsx
git commit -m "responsive: WBSpeaker mobile condensed + rem"
```

---

## Task 8: WBSchedule — time pill responsive

**Files:**
- Modify: `src/pages/wb-sections/WBSchedule.tsx`

### What to implement
- Cards: stack title+desc on top, time pill below on mobile
- Row: `flex-col` on mobile, `flex-row items-center` on `sm:`
- Title: `1rem` mobile → `1.125rem` desktop
- Desc: `0.875rem`
- H2: `clamp(2.25rem, 5vw, 4.5rem)`
- Max-width: `100%` mobile → `44.375rem` desktop

- [ ] **Step 1: Update WBSchedule.tsx**

```tsx
// Schedule card row
<div
  key={row.time}
  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 px-5 py-4 sm:px-6 sm:py-5 rounded-[1.25rem]"
  style={{ ... }}
>
  {/* Title + desc */}
  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
    <span style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', ... }}>
    <span style={{ fontSize: '0.875rem', ... }}>

  {/* Time pill */}
  <div style={{ fontSize: '0.8125rem', ... }}>

// Container max-width responsive
<div className="flex flex-col gap-3 mx-auto w-full" style={{ maxWidth: 'min(100%, 44.375rem)' }}>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/wb-sections/WBSchedule.tsx
git commit -m "responsive: WBSchedule mobile stack + rem"
```

---

## Task 9: WBForm — mobile form + hide shines

**Files:**
- Modify: `src/pages/wb-sections/WBForm.tsx`

### What to implement
- Shine images: `hidden lg:block` (invisible on mobile/tablet)
- H2: `clamp(2.25rem, 5vw, 4rem)` (was hard 64px)
- Input height: `3.5rem` (56px) mobile → `3.75rem` (60px) desktop
- Container padding: `4rem 1.25rem` mobile → centered with max-w-[520px]
- Form max-width: `100%` mobile → `32.5rem` (520px) desktop

- [ ] **Step 1: Update WBForm.tsx**

```tsx
// Shine images — hidden on mobile
<img className="hidden lg:block absolute top-0 left-0 ..." />
<img className="hidden lg:block absolute top-0 right-0 ..." />

// H2
<h2 style={{
  fontSize: 'clamp(2.25rem, 5vw, 4rem)',
  fontWeight: 600,
  lineHeight: '100%',
  letterSpacing: '-0.08em',
}}>

// Container padding
<div className="relative mx-auto w-full max-w-[1440px]"
  style={{ paddingTop: '4rem', paddingBottom: '5rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>

// Form width
<div className="mx-auto w-full" style={{ maxWidth: 'min(100%, 32.5rem)' }}>

// Input height — responsive
style={{ height: 'clamp(3rem, 4vw, 3.75rem)', padding: '1.25rem 1rem', ... }}

// Submit button
style={{ height: 'clamp(3rem, 4vw, 3.75rem)', marginTop: '1.5rem' }}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/wb-sections/WBForm.tsx
git commit -m "responsive: WBForm mobile hide shines + rem inputs"
```

---

## Task 10: WBFooter — mobile stack

**Files:**
- Modify: `src/pages/wb-sections/WBFooter.tsx`

### What to implement
- Layout: `flex-col` on mobile → `flex-row sm:justify-between` on sm+
- Stats: `grid-cols-2 sm:grid-cols-4` (was flex-wrap)
- Stat text: `1rem` mobile → `1.125rem` desktop
- Legal text: `0.75rem`

- [ ] **Step 1: Update WBFooter.tsx**

```tsx
// Stats grid
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 sm:mb-10">
  {STATS.map(s => (
    <span key={s} className="font-inter-tight font-semibold text-white"
      style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)' }}>
      {s}
    </span>
  ))}
</div>

// Bottom row
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

// Legal
<p style={{ fontSize: '0.75rem', ... }}>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/wb-sections/WBFooter.tsx
git commit -m "responsive: WBFooter mobile stack + rem"
```

---

## Task 11: WBCtaButton — full-width on mobile

**Files:**
- Modify: `src/pages/wb-sections/WBCtaButton.tsx`

### What to implement
- Width: `w-full sm:w-auto`
- Font: `0.875rem` mobile → `1.125rem` md+
- Height: `3.5rem` (56px) mobile → `4rem` (64px) md+
- Padding: `0 1.5rem` (was px-8)

- [ ] **Step 1: Update WBCtaButton.tsx**

```tsx
className={`relative flex items-center justify-center gap-2
  w-full sm:w-auto
  h-14 md:h-16
  px-6 sm:px-8
  rounded-2xl font-inter-tight font-semibold
  text-[0.875rem] md:text-[1.125rem]
  text-btn-label transition-all ...`}
```

- [ ] **Step 2: Update all usages — WBHero adds fullWidthMobile**

In `WBHero.tsx`, the button wrapper:
```tsx
<div className="w-full sm:w-auto" style={{ marginTop: '0.5rem' }}>
  <WBCtaButton />
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/wb-sections/WBCtaButton.tsx src/pages/wb-sections/WBHero.tsx
git commit -m "responsive: WBCtaButton full-width mobile + rem"
```

---

## Task 12: Webinar.tsx — disable animations on mobile

**Files:**
- Modify: `src/pages/Webinar.tsx`

### What to implement
- `useReducedMotion()` check: disable scale/radius animation on mobile
- On `< lg` viewport: set scale to `1` and radius to `0` (flat, no transform)
- This prevents layout jank on low-powered devices

- [ ] **Step 1: Add useReducedMotion + mobile check**

```tsx
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    setMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return mobile
}

function useRollingCover(ref: React.RefObject<HTMLDivElement | null>) {
  const prefersReduced = useReducedMotion()
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 1', 'start 0.4'],
  })
  const animRadius = useTransform(scrollYProgress, [0, 1], [16, 64])
  const animScale  = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  // On mobile/reduced motion: no animation
  if (prefersReduced || isMobile) {
    return {
      radius: 16 as unknown as ReturnType<typeof useTransform>,
      scale: 1 as unknown as ReturnType<typeof useTransform>,
    }
  }
  return { radius: animRadius, scale: animScale }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Webinar.tsx
git commit -m "responsive: disable rolling-cover animation on mobile"
```

---

## Task 13: QA sweep — all breakpoints

**Files:** All `wb-sections/*.tsx`

- [ ] **Step 1: 375px (iPhone 14 Pro)**

Check each section in DevTools 375px:
- No horizontal overflow (`document.body.scrollWidth === window.innerWidth`)
- All text ≥ 1rem (16px)
- CTAs: full-width
- Forms: all fields visible, no clipping
- Images: not stretched weird

- [ ] **Step 2: 768px (iPad portrait)**

- Nav links visible at `md:` (768px = md breakpoint)
- Why Attend: 2-column grid
- WhoFor: 3-column grid appears
- Stats: 3-column (5 stats → last row 2-col)

- [ ] **Step 3: 1024px (iPad landscape)**

- Rolling cover animations active
- Full desktop layout for most sections
- WBWhyAxevil stats: 5 columns

- [ ] **Step 4: 1440px (standard desktop)**

- All sections max-width 1440px centered
- Typography at max clamp values
- No layout breaks

- [ ] **Step 5: 2560px (2K/4K)**

- Content centered, no excess stretch
- Verify `max-w-[1440px]` constraint working

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "responsive: complete mobile-first QA pass"
```

---

## Animation Guidelines (framer-motion)

| Viewport | Scale animation | Radius animation | FadeIn |
|----------|----------------|------------------|--------|
| mobile (< lg) | disabled (scale = 1) | disabled (radius = 16) | enabled |
| tablet (lg) | enabled (0.8→1) | enabled (16→64) | enabled |
| desktop (xl+) | enabled (0.8→1) | enabled (16→64) | enabled |
| reduced motion | disabled | disabled | disabled |

- `FadeIn` uses `IntersectionObserver` — fine on all viewports
- Rolling cover: skip on mobile (use CSS only)
- Speaker video: `preload="none"` on mobile to save bandwidth

---

## Self-Review Checklist

- [x] All 12 section files covered
- [x] Typography: rem scale defined and applied
- [x] Breakpoints: mobile (0), sm (640), md (768), lg (1024), xl (1280)
- [x] Mobile-first: base styles mobile, override at breakpoints
- [x] framer-motion: disabled on mobile/reduced-motion
- [x] No placeholder steps — all have actual code
- [x] Commits: one per task, descriptive messages
- [x] QA task: covers 375/768/1024/1440/2560px
