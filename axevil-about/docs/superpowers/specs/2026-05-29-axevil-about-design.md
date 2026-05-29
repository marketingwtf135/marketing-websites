# AXEVIL — About page (`axevil-about`) — Design Spec

**Date:** 2026-05-29
**Author:** Claude (brainstorming pass)
**Status:** Awaiting user review

## 1. Goal

Build a new, content-rich **«О компании / About Axevil»** marketing page in the
`axevil-about` project, assembled entirely from the AXEVIL design system. The page
content & section structure come from `about_axevil.html` (the brief). The brief's
own visual styling (Playfair Display serif, Space Mono, gold `#B8A570`, teal
`#4ECDC4`) is **discarded** — we render in the AXEVIL DS visual language
(Inter Tight, dark `#080808`, silver `acc-gradient`).

### Decisions locked with user (2026-05-29)
- **Approach A** — React + Vite + TS + Tailwind consuming `@axevil/design-system`,
  mirroring `axevil-newsletter` / `axevil-pdf-page`.
- **Language:** Russian content (as in the brief). Fintech terms left in English
  (pre-IPO, SPV, IRR, track record, etc.) as the brief does.
- **Deploy:** standalone page at `/about` → `vite base: '/about/'`.
- **Visuals:** drop serif/mono/gold; use DS tokens only (rec #1 ✅).
- **Hero phone / deal-feed:** reuse the existing main-site phone block/asset
  (rec #2 → user: reuse main-site block, do NOT rebuild DOM).
- **Logos:** reuse real company logos from the main site (`block02` / `is/logos`)
  (rec #3 ✅).

## 2. Stack & scaffold

Mirror `axevil-newsletter` exactly:

```
axevil-about/
  index.html                 # lang="ru", title/description from brief, favicon, og
  package.json               # deps: @axevil/design-system (github), react 18, react-dom, framer-motion 11
  vite.config.ts             # base '/about/', outDir 'dist/about', alias @ → src, dedupe react
  tailwind.config.ts         # theme.extend = require('@axevil/design-system').tokens
  postcss.config.js
  tsconfig.json / tsconfig.node.json
  public/
    fonts/                   # InterTight-Medium / Medium-Latin-ext / SemiBold (copied from sibling)
    favicon.svg, opengraph.png
    img/                     # only the assets actually referenced (see §5)
    icons/                   # only icons actually referenced
  src/
    main.tsx
    App.tsx                  # renders <About/>
    index.css                # @import '@axevil/design-system/css' + @font-face + utilities (port from newsletter)
    components/FadeIn.tsx    # or import DS FadeIn
    pages/About.tsx          # PageEntry > AboutNav > sections > Footer
    pages/about-sections/
      AboutNav.tsx
      AboutHero.tsx
      TrustStrip.tsx
      ThesisRows.tsx
      PortfolioSectors.tsx
      ExitsGrid.tsx
      WhyPillars.tsx
      LegalInfra.tsx
      FoundersLetter.tsx
      CompanyChip.tsx        # helper: name → logo svg, fallback to DS Tag text chip
```

**Token binding rule:** use the *published package* token names only —
`bg-page-bg`/`page-bg`, `max-w-content`/`max-w-container-medium`, `text-acc-gradient`,
`container-px`, `padding-section-*`, `text-h1-semi`/`text-h2`/`text-h4`, `font-inter-tight`,
status tokens, etc. Do **not** import main-site-internal tokens
(`--gradient-headline`, `text-paragraph`, `gradient-text`) — they are not in the
package. Where the main-site sections use those, map to the published equivalents
(`text-acc-gradient`, `text-text-l`/`text-xl`).

Tailwind `content` must include
`'./node_modules/@axevil/design-system/dist/**/*.{js,cjs}'` so DS component classes
aren't purged.

## 3. Page composition: brief section → DS build

| # | Brief block | Build | Main-site reference |
|---|---|---|---|
| 1 | Nav (Портфель/Выходы/Инфраструктура/Основатели + «Обсудить») | page-local `AboutNav` on `nav-bg`/`nav-border` tokens, sticky+blur, DS `BtnOwn` CTA, RU in-page anchors (`#portfolio` etc.). DS `Nav` is bound to main-site routes/dropdowns, so a thin local nav is the right reuse here. | `Nav.tsx` (visual tokens, blur, CTA) |
| 2 | Hero + phone deal-feed | `AboutHero`: `BgFeatures` bg + `HeroEyebrow` + h1 `text-acc-gradient` (`text-h1-semi`) + sub + 2× `BtnOwn` (primary «Обсудить с инвест-менеджером», secondary «Получить доступ»). Right: reuse main-site phone image (`hero-iphone-image` / `dashboard-active-deals`) as `<img>` with intrinsic w/h. | `AUHero.tsx`, `Block01HeroV2.tsx`, `RIHero.tsx` |
| 3 | Trust strip ($150M / 1000+ / 35 / 8) + compliance | `TrustStrip`: 4-col grid, numbers `text-acc-gradient`, labels uppercase `white-400`, compliance line; `section-border` top/bottom. | `RIKeyStats.tsx` / `WMKeyStats.tsx` |
| 4 | Тезис (86% / 80% / 2×) + sources | DS `SectionHeading` (eyebrow «Почему private markets» + gradient h2 + lead) + `ThesisRows` (3 rows: num+title / big stat / copy) + sources line. | `SNSThesis.tsx`, `RIInsight.tsx` |
| 5 | Портфель (6 секторов) + лид-магнит | DS `SectionHeading` + 6× sector card (count + h3 + `CompanyChip` row + note). Lead-magnet: report-cover placeholder + `DescTag` + h3 + `BtnOwn` download. | `RIPortfolio.tsx` |
| 6 | Выходы (Confluent / Circle / SpaceX / Scale AI) | DS `SectionHeading` + 2×2 `ExitCard` (company h3 + type + metric `text-acc-gradient` + copy + why-note) + footer line. | `cs-sections` cards / surface cards |
| 7 | Почему Axevil (3 пилона) | DS `SectionHeading` + `WhyPillars` (3 numbered cards). | `WMBuilt.tsx` pillars |
| 8 | Юр. инфраструктура: диаграмма + 6 партнёров | `LegalInfra`: 3-box flow (Axevil Capital → SPV Delaware → Investor) with arrows that rotate/stack on tablet; 3 message rows; 6× `PartnerCard`. DS `Tag variant="regulatory"` for SEC/FINRA/Delaware pills. Optionally `IllCards` like `AUOperate`. | `AUOperate.tsx` (IllCards), `WMSource.tsx` |
| 9 | Письмо основателей | `FoundersLetter`: 2 founder cards (real photos if found, else DS-style gradient placeholder) + `DescTag` eyebrow + gradient h2 + RU paragraphs + 2 signatures. | `AUTeam.tsx` / `AUStory.tsx` |
| 10 | Финальный CTA (Calendly + Get Access) | **DS `CtaForm`** directly (number/label eyebrow, gradient title, subtitle, primaryLabel→Calendly, secondaryLabel→quiz) + cross-link line to `how_it_works`. | `WMCta.tsx` / `RIFinalCta.tsx` (both wrap `CtaForm`) |
| 11 | Footer | **DS `Footer`** used as-is (takes no props → DS default content). A localized RU compliance line is out of scope unless requested. | `Footer.tsx` |

## 4. Responsive & motion

**rem-only law (borrowed from axevil-website CLAUDE.md, Закон №1):** NO px for
layout — every size/spacing/font/radius/gap in **rem** (1rem = 16px). px allowed
only for: 1px borders & hairline dividers, media-query breakpoint values, SVG
`viewBox` units, box-shadow/text-shadow. No raw hex in JSX (gradient strings aside).
Token first → arbitrary rem only if no token fits.

**Three breakpoints, fluid in between:**

| Name | Width | Tailwind prefix |
|------|-------|-----------------|
| Desktop | 1440 | default |
| Tablet | 768 | `md:` |
| Mobile | 360 | base / `sm:` |

- Fluid scaling via `clamp(min-rem, vw, max-rem)` everywhere a value scales —
  matches the sibling `axevil-newsletter`/`axevil-pdf-page` approach (fixed root
  `1rem=16px` + clamp), not the main-site multi-segment html scaling. Plus DS
  `container-px` / `padding-section-*` utilities and tokens.
- Horizontal rows → vertical stack on mobile (`flex-col md:flex-row`); device
  mockups reposition/scale, keep anchors; grids collapse to single column.
- No horizontal scroll, no overflow, no clipped meaningful content at any of 1440 / 768 / 360.

**Gradient pattern:** headings use the DS `text-acc-gradient` class
(`@axevil/design-system/css` → `linear-gradient(94deg,#A2A2A2 8.73%,#FFF 50.65%,#A2A2A2 92.57%)`),
not an inline hardcoded gradient.

**Motion:** DS only — `FadeIn` + `PRELOAD_IN_VIEW_MOTION` / `PRELOAD_FADE_IN_VIEW_MOTION`
(viewport amount 0.1–0.2, ~0.6–1.4s easeOut). Hover transitions subtle (translateY,
border-color, opacity). No parallax / Lottie / 3D / cursor-followers.

## 5. Assets to reuse (copy into `axevil-about/public/`)

Source: `Axevil Site/axevil-website/worktrees/dazzling-wing-c0fe6d/` (and `@axevil/design-system/assets`).

- **Fonts:** `InterTight-Medium.woff2`, `InterTight-Medium-Latin-ext.woff2`,
  `InterTight-SemiBold.woff2` → `public/fonts/`.
- **Logo:** `img/logos/footer-logo.svg`.
- **Company logos** (`dist/img/block02/*` and `dist/img/is/logos/*`): anthropic,
  xai, databricks, cursor, glean, stripe, scale, spacex, neuralink, uzum, rappi,
  toss, plaid, robinhood. → `public/img/logos/companies/`.
  - **Missing** (Figure, Klarna, Revolut, Kraken, Circle, Consensys, Blockdaemon,
    Confluent, Netskope, Tanium, Automation Anywhere, Canva, Tamara): render via
    `CompanyChip` text fallback (DS `Tag variant="regulatory"`). Documented, not invented.
- **Phone / deal-feed:** `dist/img/block01/hero-iphone-image*` and/or
  `dist/img/block06/dashboard-active-deals.*` → `public/img/`.
- **Partner logos** (lead-magnet / sources, optional): crunchbase, pitchbook,
  startups, wearefounders, aix, Preqin, S&P.
- **Founder photos:** search worktree for team/founder images; if none, DS-style
  gradient placeholder cards (matching `AUTeam`/`founder-photo` look).
- Each PNG copied with correct intrinsic dimensions; decorative imgs `aria-hidden`,
  meaningful imgs get RU `alt`.

## 6. Content source

All RU copy taken verbatim from `about_axevil.html` (decoding the mojibake to proper
UTF-8 Russian). Numbers, company names, sectors, exit metrics, founder names
(Тарас Чумаченко, Александр Иванов), compliance strings (SEC ERA #802-126907,
FINRA CRD #323970, Reg D 506(b)) preserved exactly. No invented copy.

## 7. Out of scope

- No redesign of DS components; no new tokens; no new libraries.
- No routing framework (single page; in-page anchor nav only).
- No backend / form submission beyond DS `CtaForm` / quiz dispatch behavior.
- `how_it_works.html` cross-link target is out of scope (link kept, page not built).

## 8. Validation gate (before "done")

- `npm run build` clean + `tsc --noEmit` passes.
- Visual check at **1440 / 768 / 360** (Playwright), no horizontal scroll.
- Every `<img>` has width/height in rem; fonts load (no 404); no console errors.
- Keyboard: nav anchors + buttons reachable, focus-visible present.
- Token discipline: no `px` for layout, no raw hex / arbitrary Tailwind outside
  documented exceptions. `grep` new files for `px\b` and `#[0-9a-fA-F]{3,6}` before done.
