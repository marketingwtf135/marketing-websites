# PDF Landing Page — Pre-IPO Insider
**Date:** 2026-05-17  
**Project:** axevil-pdf-page  
**Figma:** https://www.figma.com/design/NvXqEDqp86ZUo8KpZrD0fn/AXEVIL-new-site?node-id=759-3872

---

## Overview

Complete rebuild of the PDF landing page (`InsiderPage.tsx`) to match the new Figma design.  
The existing IS1–IS8 sections do not match the Figma and are replaced entirely.  
Copy stays in Russian (as in Figma). Images provided later by client — placeholders used during build.

---

## Architecture

### Tech stack
- React 18 + TypeScript + Vite
- Tailwind CSS (token-based, existing `tailwind.config.ts`)
- Framer Motion (scroll fade-in animations)
- Fluid Responsive via `clamp()` — no breakpoint-based font/padding classes

### Breakpoints
| Name | Width |
|------|-------|
| Desktop | 1440px (design width) |
| Tablet | 768px |
| Mobile | 375px |

### Fluid sizing formula
```css
clamp(min, preferred, max)
/* preferred = vw-based so it scales between breakpoints */
```

### File structure (new)
```
src/
  components/
    FadeIn.tsx              ← keep as-is
    PDFCtaButton.tsx        ← new: white CTA button (reuse InsiderCtaBtn pattern)
    PDFSectionLabel.tsx     ← new: "1.0  Ключевые вопросы" eyebrow label
  pages/
    InsiderPage.tsx         ← rebuilt: assembles all PS sections
    pdf-sections/
      PDFNav.tsx            ← Nav: logo left, sticky, transparent→blurred on scroll
      PS1Hero.tsx           ← Hero: rock bg, centered text, badge, CTA, preview card
      PS2KeyQuestions.tsx   ← 3-col card grid with 3D icons
      PS3Preview.tsx        ← Split: text left + report card right
      PS4Methodology.tsx    ← Author card + data source logos row
      PS5StayCurrent.tsx    ← 2-col cards: Report + Digest with device mockups
      PS6WhoFor.tsx         ← 3 stacked row cards (Family offices, IFA, AM)
      PS7About.tsx          ← Axevil Capital stats + dashboard screenshot
      PS8Form.tsx           ← Lead form: name + email + checkbox + CTA
      PS9Footer.tsx         ← Logo + nav links + copyright
```

---

## Design tokens (from existing tailwind.config.ts)

All tokens already present — no new tokens needed.

| Usage | Token |
|-------|-------|
| Page bg | `bg-page-bg` (#080808) |
| Card bg | `bg-surface-0` (#141414) |
| Card border | `border-white/[0.08]` |
| Text primary | `text-white` |
| Text muted | `text-white/60`, `text-white/40` |
| Text gradient H1 | `linear-gradient(104deg, #fff 2%, #8f8f8f 99%)` |
| Card radius | `rounded-card` (2rem) |
| Section label | `text-neutral-35` + small tracking |
| Status green | `text-status-open` (#4dba79) |
| Button bg | white, label `text-btn-label` |

---

## Fluid typography scale

| Element | clamp value |
|---------|-------------|
| H1 Hero | `clamp(2.25rem, 5vw + 0.5rem, 5.5rem)` |
| H2 | `clamp(1.75rem, 3.5vw, 3.5rem)` |
| H3 card | `clamp(1.25rem, 2vw, 1.75rem)` |
| Body large | `clamp(1rem, 1.3vw, 1.125rem)` |
| Body small | `clamp(0.875rem, 1vw, 1rem)` |
| Section label | `0.875rem` fixed |

---

## Section specs

### PDFNav
- Fixed top, `bg-nav-bg/80 backdrop-blur-md` on scroll
- AXEVIL logo (SVG) left
- Right: "Скачать PDF" ghost button → scrolls to #pdf-form

### PS1Hero
- Full viewport height, dark rock background image (`/img/bg-rocks.jpg`)
- Centered content column, max-width 44rem
- Badge: green dot + "PRE-IPO INSIDER · Q4'25 — Q1'26 · 51 страница"
- H1 gradient text
- Subheadline white/60
- White CTA button "Скачать PDF" with download icon
- Below CTA: preview card (surface-0, rounded-card, 360px wide) with PDF icon + title + subtitle
- Motion: hero text fades in on mount (initial opacity 0 → 1, y 20 → 0, duration 0.7s)

### PS2KeyQuestions
- Section label "1.0  Ключевые вопросы"
- H2 centered
- 3-col grid (`grid-cols-1 sm:grid-cols-3`), gap fluid
- Each card: number top-right, 3D icon center, title + description bottom
- Card: surface-0, border white/8, rounded-card, padding ~2rem
- Motion: cards stagger fade-up (delay 0.1s each)

### PS3Preview
- Section label "2.0  Образец"
- 2-col split: left text 40%, right card 55%
- Left: H2 + description text
- Right: tall card (surface-0 border) with report screenshot image + "Скачать полную версию PDF" button at bottom
- At 768px: stacks vertically (card on top)
- Motion: left fade-left, right fade-right

### PS4Methodology
- Section label "3.0  Методология"
- H2 + subtext centered
- Author card (horizontal): avatar image + name + title + "Автор отчёта" badge
- "Источники данных" label
- 5-logo row: Crunchbase, PitchBook, PREQIN, S&P Global, NVCA — each in surface-0 box
- At 768px: logos wrap to 2-3 per row
- Motion: fade-up

### PS5StayCurrent
- Section label "4.0  Оставайтесь в курсе"
- H2 (large, ~3.5rem desktop)
- 2-col card grid
- Each card: title + description + badge chip (lightning/shield icon + text) + device mockup image (bottom-right anchored)
- At 768px: stacks
- Motion: cards fade-up stagger

### PS6WhoFor
- Section label "5.0  Кто пользуется Pre-IPO Insider"
- H2 + subtext centered
- 3 horizontal cards stacked (full width, ~600px max centered)
- Each: icon left + number right + title + quote text
- card: surface-0, border white/8, padding ~1.5rem 2rem
- At 768px: same (already single-column)
- Motion: rows fade-up stagger

### PS7About
- Section label "6.0  О платформе"
- H2 "Axevil Capital" + description centered
- 4-col stat boxes: value (large bold) + label — surface-0, border, rounded-card
- Platform dashboard screenshot (full-width card, max-width ~800px)
- At 768px: stats → 2×2 grid
- Motion: stats count-up animation on enter (Framer Motion `useMotionValue`)

### PS8Form
- id="pdf-form" (anchor for nav CTA)
- Section label "7.0  PDF"
- H2 "Получить PDF" + subtitle
- Form (controlled):
  - Name input
  - Email input
  - Checkbox: "Подпишите меня на еженедельный дайджест Axevil"
  - Submit button (white, full-width): "Получить PDF" with download icon
  - Legal text below
- White glowing radial gradient on section background (from Figma)
- On submit: show success state (no page reload)
- Motion: form fade-up

### PS9Footer
- AXEVIL logo left
- Links right: Privacy · Terms · Cookie policy · Contacts
- Copyright: "© 2026 Axevil Capital. All rights reserved."
- Border-top: `border-white/[0.06]`
- At 768px: stacks (logo top, links middle, copyright bottom)

---

## Animations (Framer Motion)

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Hero text | fade-up on mount | 0.7s | easeOut |
| Section entry | fade-up on scroll (useInView) | 0.5s | easeOut |
| Card stagger | +0.1s delay per card | 0.4s | easeOut |
| Stat count-up | 0 → value on enter | 1.2s | easeOut |
| Nav bg | opacity transition on scroll | 0.3s | linear |

Trigger: `useInView({ once: true, amount: 0.15 })`

---

## Sticky mobile CTA

- Appears after Hero scrolls out of view
- Hides when #pdf-form is near viewport
- Mobile only (`md:hidden`)
- Matches InsiderPage.tsx existing sticky pattern

---

## Images required (placeholders during build)

| File | Section | Notes |
|------|---------|-------|
| `/img/bg-rocks.jpg` | PS1 Hero bg | Full-bleed, dark rocky |
| `/img/icon-3d-globe.png` | PS2 card 1 | 3D globe icon |
| `/img/icon-3d-chart.png` | PS2 card 2 | 3D bar chart |
| `/img/icon-3d-rocket.png` | PS2 card 3 | 3D rocket |
| `/img/report-preview.png` | PS3 right card | Report page screenshot |
| `/img/author-vlad.jpg` | PS4 author | Photo of Влад Соловьёв |
| `/img/logos/crunchbase.svg` | PS4 sources | |
| `/img/logos/pitchbook.svg` | PS4 sources | |
| `/img/logos/preqin.svg` | PS4 sources | |
| `/img/logos/sp-global.svg` | PS4 sources | |
| `/img/logos/nvca.svg` | PS4 sources | |
| `/img/mockup-report.png` | PS5 card 1 | Dark report device mockup |
| `/img/mockup-envelope.png` | PS5 card 2 | 3D envelope |
| `/img/icon-3d-sphere.png` | PS6 row 1 | Abstract sphere |
| `/img/icon-3d-people.png` | PS6 row 2 | People icon |
| `/img/icon-3d-briefcase.png` | PS6 row 3 | Briefcase icon |
| `/img/platform-screenshot.png` | PS7 dashboard | Axevil Pro UI |
| `/img/axevil-logo.svg` | Nav + Footer | AXEVIL wordmark |

---

## Out of scope
- Routing (single-page app)
- Analytics events (TODO comments left)
- i18n / English version
- FAQ section (not in new Figma design)
- Real form submission backend (console.log + success state only)
