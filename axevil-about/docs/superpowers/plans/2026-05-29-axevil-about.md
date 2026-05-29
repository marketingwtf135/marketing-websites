# AXEVIL About page (`axevil-about`) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone Russian «О компании / About Axevil» marketing page assembled entirely from `@axevil/design-system`, deployed at `/about`.

**Architecture:** React 18 + Vite 5 + Tailwind 3 + TS single-page app mirroring `axevil-newsletter`/`axevil-pdf-page`. One `About.tsx` page composes a sticky local `AboutNav`, nine page-local sections, and DS `Footer`, each scroll-revealed with DS `FadeIn`. All visual values come from DS tokens (`@axevil/design-system` for Tailwind, `@axevil/design-system/css` for CSS vars). Content (RU) lives in one `content.ts` module so copy is reviewable in one place.

**Tech Stack:** React, TypeScript, Vite, Tailwind, framer-motion, `@axevil/design-system` (tokens + components: `BtnOwn`, `CtaForm`, `SectionHeading`, `DescTag`, `HeroEyebrow`, `IllCards`, `Tag`, `StatusPill`, `Footer`, `FadeIn`, motion presets).

**Key conventions (from `axevil-about/CLAUDE.md`):** rem-only for layout (px allowed only for 1px borders, media-query breakpoints, SVG viewBox, shadows); fluid via `clamp(min-rem, vw, max-rem)`; 3 breakpoints 1440 / 768 (`md:`) / 360; `font-inter-tight` on all text; no hardcoded hex in JSX (gradient strings aside); headings use `text-acc-gradient`.

**Decisions locked with user:**
- All buttons use DS `BtnOwn` / `CtaForm` — no local button component.
- **Quiz is NOT included.** DS `BtnOwn`/`CtaForm` always dispatch a `open-quiz` window event on click; with no `Quiz` mounted this is a harmless no-op. Every CTA is given a real `onClick` (scroll to `#cta` / open Calendly) so it functions regardless.
- RU content; fintech terms (pre-IPO, SPV, IRR, track record) stay English.
- Deploy `/about` → vite `base: '/about/'`, `build.outDir: 'dist/about'`.

**Token reference (published `@axevil/design-system`, verified in `tailwind.config.base.js` + `tokens.css`):**
- Colors: `bg-page-bg`/`bg-bg-100` (#080808), `bg-nav-bg` (#0a0a0a), `bg-surface-0` (#141414), `bg-black-400/500/600`, `border-subtle` (#1b1b1b), `section-border` (#121212), `nav-border` (#171717), `text-white`, `text-white-300/400`, `text-neutral-30/35`, status-open/closed/soon.
- Font sizes (class → var): `text-h1-semi`(64/48/36), `text-h2`(64/48/36), `text-h3`(36/27/24), `text-h4`(24/20/20), `text-xl`, `text-text-l`, `text-paragraph`, `text-text-m`, `text-text-s-med`, `text-text-xs`. All responsive via `tokens.css` media queries — **do not** wrap them in clamp.
- maxWidth: `max-w-content` (90rem), `max-w-container-medium` (90rem), `max-w-max-width-50` (50rem), `max-w-max-width-37` (37.5rem).
- radius: `rounded-card`(2rem), `rounded-card-lg`(3rem), `rounded-border-r-1`(1rem), `rounded-border-r-0.75`(0.75rem).
- CSS vars available in inline styles: `var(--bg-100)`, `var(--nav-bg)`, `var(--black-400..600)`, `var(--white-100..400)`, `var(--border-subtle)`, `var(--section-border)`, `var(--status-open)`, `var(--acc-gradient)`, `var(--gradient-headline)`, `var(--font-*)`.

**Reference files (read-only, in main-site worktree `Axevil Site/axevil-website/worktrees/dazzling-wing-c0fe6d/`):** `src/pages/AboutUs.tsx`, `src/pages/about-sections/AUHero.tsx`, `AUOperate.tsx`, `AUTeam.tsx`, `src/pages/ri-sections/RIKeyStats.tsx`, `src/blocks/Block01HeroV2.tsx`; sibling `marketing-websites/axevil-newsletter/src/pages/nl-sections/NLNav.tsx`. Asset source dir below in Task 2.

---

## File structure

```
axevil-about/
  index.html
  package.json   vite.config.ts   tailwind.config.ts   postcss.config.js
  tsconfig.json  tsconfig.node.json
  public/
    favicon.svg  opengraph.png
    fonts/InterTight-Medium.woff2  InterTight-Medium-Latin-ext.woff2  InterTight-SemiBold.woff2
    icons/Key.svg  Email.svg
    img/
      footer-logo.svg
      hero-phone.png  (deal-feed phone)
      logos/companies/*.svg
  src/
    main.tsx
    App.tsx
    index.css
    components/FadeIn.tsx          (re-export DS FadeIn)
    pages/About.tsx
    pages/about-sections/
      content.ts                  (all RU copy + data arrays + types)
      logoMap.ts                  (company name → logo path; fallback null)
      AboutNav.tsx
      AboutHero.tsx
      TrustStrip.tsx
      ThesisRows.tsx
      PortfolioSectors.tsx
      ExitsGrid.tsx
      WhyPillars.tsx
      LegalInfra.tsx
      FoundersLetter.tsx
      FinalCta.tsx
```

---

## Task 1: Scaffold project (config + entry + CSS)

**Files:**
- Create: `axevil-about/package.json`, `vite.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/components/FadeIn.tsx`, `.gitignore`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "axevil-about",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@axevil/design-system": "github:marketingwtf135/axevil-design-system",
    "framer-motion": "^11.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.40",
    "tailwindcss": "^3.4.7",
    "typescript": "^5.5.3",
    "vite": "^5.3.5"
  }
}
```

- [ ] **Step 2: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Served at axevil.com/about — physical nesting so the URL maps to a real folder.
export default defineConfig({
  base: '/about/',
  plugins: [react()],
  server: { host: '127.0.0.1' },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
    dedupe: ['react', 'react-dom'],
  },
  build: { outDir: 'dist/about', emptyOutDir: true },
})
```

- [ ] **Step 3: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'
const { tokens } = require('@axevil/design-system')

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}', './node_modules/@axevil/design-system/dist/**/*.{js,cjs}'],
  theme: { extend: { ...tokens } },
  plugins: [],
}
export default config
```

- [ ] **Step 4: Create `postcss.config.js`**

```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } }
```

- [ ] **Step 5: Create `tsconfig.json` and `tsconfig.node.json`** (copy from `axevil-newsletter`)

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020", "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"], "module": "ESNext",
    "skipLibCheck": true, "moduleResolution": "bundler",
    "allowImportingTsExtensions": true, "resolveJsonModule": true,
    "isolatedModules": true, "noEmit": true, "jsx": "react-jsx",
    "strict": true, "noUnusedLocals": true, "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".", "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

`tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "composite": true, "skipLibCheck": true, "module": "ESNext",
    "moduleResolution": "bundler", "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 6: Create `index.html`** (RU title/description from brief)

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/about/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Axevil Capital — pre-IPO платформа для аккредитованных инвесторов</title>
    <meta name="description" content="$150 млн под управлением, 35 портфельных компаний, 8 выходов. SEC ERA, FINRA member, Delaware SPV." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Create `src/main.tsx`**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 8: Create `src/components/FadeIn.tsx`** (re-export DS FadeIn so sections import locally)

```tsx
export { default } from '@axevil/design-system/components'
// NOTE: DS exports FadeIn as a named export; see Step 9 App import for the correct form.
```

> Correction: DS exports are named. Use `import { FadeIn } from '@axevil/design-system/components'` directly in `About.tsx` (Task 15) and delete this re-export file if it complicates typing. Keep this file only if a default import is needed; otherwise skip it.

- [ ] **Step 9: Create `src/App.tsx`** (no Quiz, no router — single page)

```tsx
import About from './pages/About'

export default function App() {
  return <About />
}
```

- [ ] **Step 10: Create `src/index.css`** (port the relevant parts from `axevil-newsletter/src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* DS tokens (CSS variables: colors, fonts, gradients, radius) */
@import '@axevil/design-system/css';

/* ── Inter Tight @font-face ── */
@font-face {
  font-family: 'Inter Tight';
  src: url('/about/fonts/InterTight-Medium.woff2') format('woff2');
  font-weight: 500; font-style: normal; font-display: swap;
}
@font-face {
  font-family: 'Inter Tight';
  src: url('/about/fonts/InterTight-Medium-Latin-ext.woff2') format('woff2');
  font-weight: 500; font-style: normal; font-display: swap;
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'Inter Tight';
  src: url('/about/fonts/InterTight-SemiBold.woff2') format('woff2');
  font-weight: 600; font-style: normal; font-display: swap;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background-color: var(--bg-100);
  color: var(--white-100);
  font-family: 'Inter Tight', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Global container horizontal padding: 1rem mobile → 1.5rem tablet → 0 desktop */
@layer utilities {
  .container-px { padding-left: 1rem; padding-right: 1rem; }
  @media (min-width: 48rem) { .container-px { padding-left: 1.5rem; padding-right: 1.5rem; } }
  @media (min-width: 90rem) { .container-px { padding-left: 0; padding-right: 0; } }
}
```

- [ ] **Step 11: Create `.gitignore`**

```
node_modules
dist
*.local
.DS_Store
```

- [ ] **Step 12: Install and verify**

Run: `cd axevil-about && npm install`
Expected: installs without error; `@axevil/design-system` resolved from GitHub.

Run: `npm run dev` (then stop it)
Expected: Vite starts on `http://127.0.0.1:xxxx/about/`; blank page (About not built yet → will error on missing `./pages/About` — that's expected until Task 15. To verify scaffold alone, temporarily set `App.tsx` to `return <div className="text-white p-8">scaffold ok</div>` then revert in Task 15).

Run: `npm run typecheck`
Expected: passes (with temporary App body).

- [ ] **Step 13: Commit**

```bash
git add axevil-about
git commit -m "feat(axevil-about): scaffold vite+react+ds project"
```

---

## Task 2: Copy reused assets into `public/`

**Files:** Create files under `axevil-about/public/` (binary copies — no edits).

Asset source roots:
- DS package: `c:/Users/singa/Desktop/Claude/axevil-design-system/assets/`
- Main-site worktree dist: `c:/Users/singa/Desktop/Claude/Axevil Site/axevil-website/worktrees/dazzling-wing-c0fe6d/dist/`
- Sibling: `c:/Users/singa/Desktop/Claude/marketing-websites/axevil-newsletter/public/`

- [ ] **Step 1: Copy fonts** (from `axevil-newsletter/public/fonts/`)

```bash
mkdir -p axevil-about/public/fonts
cp "../axevil-newsletter/public/fonts/InterTight-Medium.woff2" axevil-about/public/fonts/
cp "../axevil-newsletter/public/fonts/InterTight-Medium-Latin-ext.woff2" axevil-about/public/fonts/
cp "../axevil-newsletter/public/fonts/InterTight-SemiBold.woff2" axevil-about/public/fonts/
```

- [ ] **Step 2: Copy icons** (BtnOwn default icon is `/icons/Key.svg`; Email.svg optional)

```bash
mkdir -p axevil-about/public/icons
cp "C:/Users/singa/Desktop/Claude/axevil-design-system/assets/icons/Key.svg" axevil-about/public/icons/
cp "C:/Users/singa/Desktop/Claude/axevil-design-system/assets/icons/Email.svg" axevil-about/public/icons/
```

- [ ] **Step 3: Copy footer logo + favicon + opengraph**

```bash
mkdir -p axevil-about/public/img
cp "C:/Users/singa/Desktop/Claude/axevil-design-system/assets/img/logos/footer-logo.svg" axevil-about/public/img/
cp "../axevil-newsletter/public/favicon.svg" axevil-about/public/
cp "../axevil-newsletter/public/opengraph.png" axevil-about/public/
```

- [ ] **Step 4: Copy the deal-feed phone image**

Source: `dazzling-wing-c0fe6d/dist/img/block01/hero-iphone-image-mobile.png` (phone with deal feed). If a non-mobile variant exists (`dist/img/is/investors-iphone-image.png`), prefer the higher-res one. Copy to `public/img/hero-phone.png`.

```bash
cp "C:/Users/singa/Desktop/Claude/Axevil Site/axevil-website/worktrees/dazzling-wing-c0fe6d/dist/img/is/investors-iphone-image.png" axevil-about/public/img/hero-phone.png
```

Verify the file opens and shows a phone with a deal/portfolio feed. If it does not visually match a deal feed, fall back to `dist/img/block06/dashboard-active-deals.png`.

- [ ] **Step 5: Copy company logos** (the ones that exist) into `public/img/logos/companies/`

```bash
mkdir -p axevil-about/public/img/logos/companies
SRC="C:/Users/singa/Desktop/Claude/Axevil Site/axevil-website/worktrees/dazzling-wing-c0fe6d/dist/img"
cp "$SRC/is/logos/logo-antrophic.svg"   axevil-about/public/img/logos/companies/anthropic.svg
cp "$SRC/is/logos/logo-xai.svg"          axevil-about/public/img/logos/companies/xai.svg
cp "$SRC/is/logos/logo-databricks.svg"   axevil-about/public/img/logos/companies/databricks.svg
cp "$SRC/is/logos/logo-cursor.svg"       axevil-about/public/img/logos/companies/cursor.svg
cp "$SRC/is/logos/logo-spacex.svg"       axevil-about/public/img/logos/companies/spacex.svg
cp "$SRC/is/logos/logo-stripe.svg"       axevil-about/public/img/logos/companies/stripe.svg
cp "$SRC/block02/logo-5-glean.svg"       axevil-about/public/img/logos/companies/glean.svg
cp "$SRC/block02/logo-4-scale.svg"       axevil-about/public/img/logos/companies/scale.svg
cp "$SRC/block02/logo-7-rappi.svg"       axevil-about/public/img/logos/companies/rappi.svg
cp "$SRC/block02/logo-8-toss.svg"        axevil-about/public/img/logos/companies/toss.svg
cp "$SRC/block02/logo-9-uzum.svg"        axevil-about/public/img/logos/companies/uzum.svg
cp "$SRC/block02/logo-10-plaid.svg"      axevil-about/public/img/logos/companies/plaid.svg
cp "$SRC/block02/logo-11-robinhood.svg"  axevil-about/public/img/logos/companies/robinhood.svg
cp "$SRC/block02/logo-12-neuralink.svg"  axevil-about/public/img/logos/companies/neuralink.svg
```

Verify each file copied (some names may differ — list `$SRC/block02` and `$SRC/is/logos` first and adjust). Companies with no logo file (Figure, Klarna, Revolut, Kraken, Circle, Consensys, Blockdaemon, Confluent, Netskope, Tanium, Automation Anywhere, Canva, Tamara) will render as text chips (Task 4).

- [ ] **Step 6: Commit**

```bash
git add axevil-about/public
git commit -m "feat(axevil-about): vendor reused fonts, logos, phone, icons"
```

---

## Task 3: Content module (`content.ts`)

**Files:** Create `axevil-about/src/pages/about-sections/content.ts`

> All RU prose authored to convey the brief verbatim in meaning; ASCII facts (numbers, names, tickers, IRR, compliance, company lists) preserved exactly. The reviewer should proofread copy here in one place.

- [ ] **Step 1: Write `content.ts`**

```ts
export interface NavLink { label: string; id: string }
export interface ThesisRow { num: string; title: string; stat: string; statLabel: string; copy: string }
export interface Sector { count: string; title: string; companies: string[]; note: string }
export interface Exit { company: string; type: string; metric: string; copy: string; why: string }
export interface Pillar { num: string; title: string; copy: string }
export interface DiagramBox { kicker: string; title: string; copy: string }
export interface LegalMessage { strong: string; rest: string }
export interface Partner { type: string; title: string; copy: string }
export interface Founder { name: string; role: string }

export const NAV_LINKS: NavLink[] = [
  { label: 'Портфель',        id: 'portfolio' },
  { label: 'Выходы',          id: 'exits' },
  { label: 'Инфраструктура',  id: 'legal' },
  { label: 'Основатели',      id: 'founders' },
]

export const HERO = {
  eyebrow: 'AXEVIL CAPITAL · PRE-IPO ПЛАТФОРМА',
  title: 'Платформа pre-IPO инвестиций в глобальных технологических лидеров',
  sub: 'Строим инфраструктуру доступа к лучшим частным компаниям мира для профессиональных инвесторов и управляющих капиталом.',
  primary: 'Обсудить с инвест-менеджером →',
  secondary: 'Получить доступ →',
}

export interface Deal { ticker: string; name: string; sector: string; status: 'open' | 'soon'; statusLabel: string; score: string }
export const HERO_DEALS: Deal[] = [
  { ticker: 'SX', name: 'SpaceX', sector: 'Space · Growth equity', status: 'open', statusLabel: 'Открыта', score: '8.4 / 10' },
  { ticker: 'XA', name: 'xAI',    sector: 'AI / Infrastructure',   status: 'soon', statusLabel: 'Скоро',   score: '9.1 / 10' },
  { ticker: 'CR', name: 'Cursor', sector: 'Developer tools',       status: 'open', statusLabel: 'Открыта', score: '8.7 / 10' },
]

export const TRUST_STATS = [
  { num: '$150M',  label: 'под управлением' },
  { num: '1 000+', label: 'инвесторов' },
  { num: '35',     label: 'компаний в портфеле' },
  { num: '8',      label: 'успешных выходов' },
]
export const COMPLIANCE = 'SEC Exempt Reporting Adviser · CRD #802-126907 · FINRA Member · CRD #323970'

export const THESIS = {
  eyebrow: 'ПОЧЕМУ PRIVATE MARKETS',
  title: 'Стоимость технологических компаний сейчас создаётся до IPO — стратегия роста на частном рынке.',
  lead: 'Топ-компании остаются частными в среднем 12 лет и формируют ~80% своей стоимости до момента выхода на биржу. IPO лишь фиксирует результат, основной рост уже состоялся.',
  rows: <ThesisRow[]>[
    { num: '01', title: 'Капитал перераспределяется', stat: '86%', statLabel: 'family offices уже инвестируют в private markets',
      copy: 'Family offices, HNWI и институциональный капитал системно перераспределяют капитал из публичных рынков в частные — следуя за зрелой ликвидной инфраструктурой и доходностью.' },
    { num: '02', title: 'Стоимость создаётся до IPO', stat: '80%', statLabel: 'стоимости top-компаний создаётся на частном этапе',
      copy: 'IPO больше не начало роста — это момент, когда рынок признаёт состоявшийся рост. Топ-децильные сделки дают 60–83% IRR на стадиях Series E–H, тогда как пост-IPO доходность обычно падает до процентов.' },
    { num: '03', title: 'Структурное опережение', stat: '2×', statLabel: 'Top-50 частных компаний vs NASDAQ-100 за 5 лет',
      copy: 'Доходность топ-50 частных компаний в 2 раза выше публичных бенчмарков. Доступ открывает секторы, которых почти нет в публике: космос, blockchain, AI, deeptech.' },
  ],
  sources: 'Источники: Forbes Family Office Insights 2025 · KKR Global Wealth Allocation 2025 · Forge Global · Preqin Index 50',
}

export const PORTFOLIO = {
  eyebrow: 'ИНВЕСТИЦИОННЫЙ ФОКУС AXEVIL CAPITAL',
  title: '35 компаний в портфеле — от космоса и AI до blockchain и региональных супераппов.',
  lead: 'Инвестируем в технологических лидеров по всему миру — США, Европа, Ближний Восток, Азия.',
  sectors: <Sector[]>[
    { count: '12+', title: 'AI и инфраструктура', companies: ['Anthropic','xAI','Databricks','Cursor','Glean','Figure'],
      note: 'Включая 3 AI Fund — индексный продукт по 12–15 топ-AI-компаниям.' },
    { count: '3', title: 'Финтех-инфраструктура', companies: ['Stripe','Klarna','Revolut'],
      note: 'Платёжная инфраструктура, BNPL и цифровые финансовые сервисы.' },
    { count: '4', title: 'Blockchain и крипто', companies: ['Kraken','Circle','Consensys','Blockdaemon'],
      note: 'Биржи, стейблкоины и инфраструктура. Регулируемые игроки.' },
    { count: '5+', title: 'Enterprise tech', companies: ['Confluent','Netskope','Tanium','Automation Anywhere','Canva'],
      note: 'B2B-инфраструктура, кибербезопасность, RPA.' },
    { count: '2', title: 'Deeptech и космос', companies: ['SpaceX','Neuralink'],
      note: 'Космическая инфраструктура и нейроинтерфейсы.' },
    { count: '4', title: 'Региональные супераппы', companies: ['Uzum','Rappi','Toss','Tamara'],
      note: 'Экосистемы для e-commerce, финтеха, доставки и повседневных сервисов в развивающихся рынках.' },
  ],
  leadmagnet: {
    tag: 'PRE-IPO INSIDER · Q1 2026',
    coverTitle: 'Портфель Axevil: компании, секторы, винтажи',
    coverFoot: 'Axevil Capital · quarterly report',
    eyebrow: 'РЕЗУЛЬТАТЫ',
    title: 'Скачайте квартальный отчёт Q1 2026',
    body: 'Рассказываем, как команда Axevil провела первый квартал 2026 года: новые компании в портфеле, переоценки и выходы, текущие открытые инвестиционные возможности.',
    cta: 'Скачать отчёт →',
  },
}

export const EXITS = {
  eyebrow: 'TRACK RECORD · КЕЙСЫ ЛИКВИДНОСТИ',
  title: 'Примеры успешных выходов',
  lead: 'Для private markets ликвидность больше не сводится только к IPO. Вторичный рынок стал полноценным сценарием выхода: он повышает ликвидность класса активов и позволяет инвестору зафиксировать результат ещё до выхода компании на биржу.',
  cards: <Exit[]>[
    { company: 'Confluent', type: 'IPO · июнь 2021', metric: '256% IRR',
      copy: 'Лидер в потоковой обработке данных на базе Apache Kafka. На момент входа — $300 млн выручки и рост +60% год к году.',
      why: 'Первый exit Axevil: 6 месяцев от структурирования сделки до листинга.' },
    { company: 'Circle', type: 'IPO · июнь 2025', metric: 'IPO 2025',
      copy: 'Эмитент USDC, второго по величине стейблкоина в мире. Капитализация USDC — $62+ млрд, доля рынка выросла с 20% до 25,5%.',
      why: 'Выход менее чем через 3 месяца после структурирования сделки.' },
    { company: 'SpaceX', type: 'secondary · 2026', metric: '200% IRR',
      copy: 'Мировой лидер запусков и спутниковой инфраструктуры. Частичный выход на вторичном рынке при оценке $527 млрд до IPO.',
      why: 'Уникальный кейс раннего входа с фиксацией части прибыли на вторичном рынке до IPO.' },
    { company: 'Scale AI', type: 'спец. дивиденд · 2025', metric: 'Дивиденд + акции',
      copy: 'Платформа для подготовки данных и обучения AI-моделей. Инвесторы получили специальный дивиденд после сделки с Meta и остались акционерами компании.',
      why: 'Пример фиксации прибыли ещё до IPO без выхода из позиции полностью.' },
  ],
  foot: '8 выходов с 2021 года. Обсудить состав портфеля и его результаты →',
}

export const WHY = {
  eyebrow: 'ЧТО ДЕЛАЕТ AXEVIL ДРУГИМ',
  title: 'Меняем правила игры на рынке private equity.',
  lead: 'Private market по-прежнему остаётся закрытым и фрагментированным рынком. Миссия Axevil — упростить доступ к этому классу активов, сделав его прозрачным и удобным.',
  pillars: <Pillar[]>[
    { num: '01', title: 'Технологии вместо барьеров',
      copy: '100% цифровой процесс — от KYC и подписания SPV agreement до оплаты и трекинга позиции.' },
    { num: '02', title: 'Доступ к лучшим компаниям рынка',
      copy: 'Мы тщательно анализируем компании, которые попадают в наш пайплайн, предоставляя детальную информацию по каждому инвестиционному кейсу для принятия взвешенного решения.' },
    { num: '03', title: 'Готовая юридическая инфраструктура',
      copy: 'Управляющая компания и фонд работают в регулируемом контуре SEC и используют лучшие практики венчурного инвестирования для защиты капитала инвестора.' },
  ],
}

export const LEGAL = {
  eyebrow: 'ЛУЧШИЕ ПРАКТИКИ ВЕНЧУРНОЙ ИНДУСТРИИ',
  title: 'Как структурируется ваша инвестиция.',
  lead: 'Axevil — это технологический и операционный слой.',
  boxes: <DiagramBox[]>[
    { kicker: 'Управляющая компания', title: 'Axevil Capital', copy: 'SEC ERA #802-126907 · FINRA Member CRD #323970. Находит актив, создаёт фонд, ведёт инвестора.' },
    { kicker: 'Series SPV · Delaware', title: 'Alextar VC LLC', copy: 'SPV-ячейки под каждую сделку. Капитал каждой SPV на 100% состоит из акций портфельной компании.' },
    { kicker: 'Инвестор', title: 'Доля в SPV', copy: 'Инвестор получает долю в SPV пропорционально участию и Capital Account Statement.' },
  ],
  messages: <LegalMessage[]>[
    { strong: 'Отдельная SPV под каждую сделку.', rest: 'Акции одной портфельной компании находятся в отдельной ячейке фонда и не смешиваются с другими сделками.' },
    { strong: 'Доли инвесторов отражаются внутри SPV.', rest: 'Акции в SPV принадлежат инвесторам пропорционально их участию. Отношения регулирует SPV Agreement.' },
    { strong: 'Отчётность фиксирует право участия.', rest: 'Сделка регистрируется через Form D, а инвестор получает Capital Account Statement.' },
  ],
  partners: <Partner[]>[
    { type: 'Регулятор', title: 'SEC + FINRA', copy: 'Ежегодный reporting, Form D filing на каждую сделку, постоянный oversight.' },
    { type: 'Юридический партнёр', title: 'Buzko Krasnov', copy: 'Внешний legal counsel: SPV agreements, subscription docs, secondary transactions.' },
    { type: 'Операционное сопровождение', title: 'Документы и отчётность', copy: 'KYC, статус аккредитованного инвестора, SPV Agreement, Form D, Capital Account Statement и налоговые формы W-8BEN / W-9 / Schedule K-1.' },
    { type: 'Инвестиционный партнёр', title: 'FinSight Ventures', copy: '20+ лет на рынке, $400M инвестиций в 90 компаний, 31 выход, 41× MOIC.' },
    { type: 'Платежи', title: 'Banking Partners', copy: 'SWIFT-переводы, wire instructions, regulated payment flow.' },
    { type: 'Delaware', title: 'Registration Agents', copy: 'Регистрация SPV и поддержание юридического адреса в Делавэре.' },
  ],
}

export const FOUNDERS = {
  eyebrow: 'ПИСЬМО ОТ ОСНОВАТЕЛЕЙ',
  title: 'Почему мы делаем Axevil',
  people: <Founder[]>[
    { name: 'Тарас Чумаченко',  role: 'Co-founder · Managing Partner · Ex-Societe Generale' },
    { name: 'Александр Иванов', role: 'Co-founder · Managing Partner · Ex-Финам · Открытие · Брокеркредитсервис' },
  ],
  letter: [
    'Мы запустили Axevil в 2020 году, потому что видели разрыв между тем, как устроен частный рынок сегодня, и тем, как он должен быть устроен для частного инвестора.',
    'Раньше доступ к SpaceX, Stripe или Databricks был только у больших институциональных фондов и узкого круга family offices с прямыми связями в Кремниевой долине.',
    'Мы построили технологическую и юридическую инфраструктуру, которая убирает этот барьер. Не упрощая суть — оставляя институциональный процесс, due diligence, регулирование и custody.',
    'Спустя пять лет — $150 млн под управлением, 1 000+ инвесторов, 35 компаний в портфеле и 8 закрытых выходов. Мы по-прежнему считаем, что только начали.',
    'Если у вас есть вопросы о том, как это работает на практике — запишитесь на 30-минутный звонок. Один из нас или старший инвестиционный советник Axevil ответит лично.',
  ],
  signatures: [
    { name: 'Тарас Чумаченко',  role: 'Co-founder, Managing Partner' },
    { name: 'Александр Иванов', role: 'Co-founder, Managing Partner' },
  ],
}

export const FINAL_CTA = {
  number: '8.0',
  label: 'Готовы двигаться дальше?',
  title: 'Запишитесь на 30-минутную консультацию с инвестиционным советником Axevil.',
  subtitle: 'Zoom-встреча, на которой наш инвестиционный аналитик ответит на все ваши вопросы.',
  primary: 'Записаться на консультацию →',
  secondary: 'Получить доступ',
  calendly: 'https://calendly.com/axevil/consultation',
  crossPrefix: 'Сначала хотите понять процесс детальнее? →',
  crossLink: 'Как работает Axevil',
  crossHref: 'how_it_works.html',
}

export const FOOTER_COMPLIANCE =
  'Axevil Capital — SEC Exempt Reporting Adviser, CRD #802-126907, FINRA Member, CRD #323970. Reg D 506(b). © 2026 Axevil Capital. Все права защищены.'
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: passes (module is data-only). The `<ThesisRow[]>` cast syntax is valid TS in `.ts` files.

- [ ] **Step 3: Commit**

```bash
git add axevil-about/src/pages/about-sections/content.ts
git commit -m "feat(axevil-about): RU content module"
```

---

## Task 4: Logo map + `CompanyChip`

**Files:** Create `src/pages/about-sections/logoMap.ts`, `src/pages/about-sections/CompanyChip.tsx`

- [ ] **Step 1: Write `logoMap.ts`**

```ts
// Company name (as used in content.ts) → logo svg path under /about/img/logos/companies/.
// Names with no entry render as a text chip (DS Tag).
export const LOGO_MAP: Record<string, string> = {
  Anthropic:  '/about/img/logos/companies/anthropic.svg',
  xAI:        '/about/img/logos/companies/xai.svg',
  Databricks: '/about/img/logos/companies/databricks.svg',
  Cursor:     '/about/img/logos/companies/cursor.svg',
  SpaceX:     '/about/img/logos/companies/spacex.svg',
  Stripe:     '/about/img/logos/companies/stripe.svg',
  Glean:      '/about/img/logos/companies/glean.svg',
  Scale:      '/about/img/logos/companies/scale.svg',
  Rappi:      '/about/img/logos/companies/rappi.svg',
  Toss:       '/about/img/logos/companies/toss.svg',
  Uzum:       '/about/img/logos/companies/uzum.svg',
  Plaid:      '/about/img/logos/companies/plaid.svg',
  Robinhood:  '/about/img/logos/companies/robinhood.svg',
  Neuralink:  '/about/img/logos/companies/neuralink.svg',
}
```

- [ ] **Step 2: Write `CompanyChip.tsx`**

```tsx
import { Tag } from '@axevil/design-system/components'
import { LOGO_MAP } from './logoMap'

/** One company in a sector card: logo image if we have it, else a DS text pill. */
export default function CompanyChip({ name }: { name: string }) {
  const logo = LOGO_MAP[name]
  if (logo) {
    return (
      <span
        className="inline-flex items-center rounded-border-r-0.75 bg-black-400"
        style={{ padding: '0.5rem 0.75rem', border: '1px solid var(--border-subtle)' }}
      >
        <img src={logo} alt={name} style={{ height: '1rem', width: 'auto', display: 'block' }} />
      </span>
    )
  }
  return <Tag variant="regulatory" label={name} />
}
```

- [ ] **Step 3: Verify typecheck**

Run: `npm run typecheck`
Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add axevil-about/src/pages/about-sections/logoMap.ts axevil-about/src/pages/about-sections/CompanyChip.tsx
git commit -m "feat(axevil-about): CompanyChip with logo map + Tag fallback"
```

---

## Task 5: `AboutNav`

**Files:** Create `src/pages/about-sections/AboutNav.tsx` (modeled on `axevil-newsletter/.../NLNav.tsx`, all sizes converted to rem, DS `BtnOwn` for CTA).

- [ ] **Step 1: Write `AboutNav.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BtnOwn } from '@axevil/design-system/components'
import { NAV_LINKS } from './content'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
function scrollToCta() { scrollTo('cta') }

function useNavVisible() {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)
  const peakY = useRef(0)
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      if (y > lastY.current) { peakY.current = y; if (y > 31.25 * 16) setVisible(false) }
      else { if (peakY.current - y >= 12.5 * 16) setVisible(true) }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return visible
}

export default function AboutNav() {
  const visible = useNavVisible()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleLink(id: string) { scrollTo(id); setMenuOpen(false) }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50"
        style={{ background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(1.25rem)', WebkitBackdropFilter: 'blur(1.25rem)', borderBottom: '1px solid var(--nav-border)', height: '4.5rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: visible ? 0 : '-4.5rem' }}
        transition={{ opacity: { duration: 0.3, ease: 'easeOut' }, y: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } }}
      >
        <div className="container-px mx-auto w-full max-w-content h-full flex items-center justify-between">
          <a href="#" aria-label="AXEVIL Capital" className="shrink-0 font-inter-tight font-semibold text-white" style={{ fontSize: '1.125rem', letterSpacing: '0.09375rem' }}>
            AXEVIL
          </a>

          <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, id }) => (
              <button key={id} type="button" onClick={() => scrollTo(id)}
                className="flex items-center justify-center font-inter-tight font-medium text-white whitespace-nowrap transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                style={{ padding: '0.5rem 1rem', borderRadius: '10rem', fontSize: 'var(--font-s)', opacity: 0.8 }}>
                {label}
              </button>
            ))}
          </div>

          <div className="ml-auto hidden lg:flex">
            <BtnOwn size="XS" hideIcon onClick={scrollToCta}>Обсудить</BtnOwn>
          </div>

          <button type="button" onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative shrink-0 focus-visible:outline-none" style={{ width: '2.5rem', height: '2.5rem' }} aria-label="Меню" aria-expanded={menuOpen}>
            <motion.div className="absolute bg-white" style={{ height: '0.125rem', left: '0.625rem', width: '1.25rem' }} animate={{ top: menuOpen ? '1.1875rem' : '0.9375rem', rotate: menuOpen ? 45 : 0 }} transition={{ duration: 0.25 }} />
            <motion.div className="absolute bg-white" style={{ height: '0.125rem', left: '0.625rem', width: '1.25rem' }} animate={{ top: menuOpen ? '1.1875rem' : '1.5rem', rotate: menuOpen ? -45 : 0 }} transition={{ duration: 0.25 }} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-40 lg:hidden" style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(1rem)', WebkitBackdropFilter: 'blur(1rem)', paddingTop: '4.5rem' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
            <div className="flex flex-col px-5 sm:px-8 py-6 overflow-y-auto h-full">
              <div className="flex flex-col gap-1 flex-1">
                {NAV_LINKS.map(({ label, id }) => (
                  <button key={id} type="button" onClick={() => handleLink(id)}
                    className="flex items-center justify-between rounded-border-r-0.75 font-inter-tight font-medium text-white/70 hover:text-white hover:bg-white/5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                    style={{ minHeight: '3.5rem', padding: '1rem', fontSize: 'var(--font-l)' }}>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <BtnOwn size="L" hideIcon onClick={() => { scrollToCta(); setMenuOpen(false) }} className="w-full">Обсудить</BtnOwn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Verify** — temporarily render `<AboutNav/>` in `App.tsx`, run `npm run dev`, confirm sticky nav, hide-on-scroll, burger drawer, "Обсудить" click. Revert App after.

- [ ] **Step 3: Commit** `git commit -am "feat(axevil-about): AboutNav"`

---

## Task 6: `AboutHero`

**Files:** Create `src/pages/about-sections/AboutHero.tsx`

- [ ] **Step 1: Write `AboutHero.tsx`** — left column copy + 2 `BtnOwn`; right column phone image with deal-feed cards overlaid via `StatusPill`. Uses the reused phone image as the device; deal cards are DOM (so RU text + StatusPill render crisply) positioned over the screen area. If the chosen phone image already contains a baked-in feed, set `OVERLAY = false` to show the image alone.

```tsx
import { BtnOwn, StatusPill } from '@axevil/design-system/components'
import { HERO, HERO_DEALS } from './content'

const OVERLAY = true // set false if hero-phone.png already shows a deal feed

export default function AboutHero() {
  return (
    <section id="top" className="relative w-full overflow-clip bg-page-bg" style={{ paddingTop: '7.5rem' }}>
      <div className="relative mx-auto w-full max-w-content container-px grid items-center"
        style={{ gridTemplateColumns: '1fr', gap: 'clamp(2.5rem, 5vw, 4.375rem)', paddingBottom: 'clamp(3.75rem, 7vw, 5.5rem)' }}>
        <div className="lg:grid" style={{ gridTemplateColumns: '1.15fr 0.85fr', gap: 'clamp(2.5rem, 5vw, 4.375rem)', alignItems: 'center', display: 'grid' }}>
          {/* Left */}
          <div className="flex flex-col" style={{ gap: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            <p className="font-inter-tight font-medium text-text-s-med" style={{ color: 'var(--status-open)', letterSpacing: '0.1875rem' }}>{HERO.eyebrow}</p>
            <h1 className="font-inter-tight font-semibold text-h1-semi text-acc-gradient" style={{ maxWidth: '50rem' }}>{HERO.title}</h1>
            <p className="font-inter-tight font-medium text-paragraph text-white/60" style={{ maxWidth: '37.5rem' }}>{HERO.sub}</p>
            <div className="flex flex-wrap items-center" style={{ gap: '1.125rem' }}>
              <BtnOwn size="L" hideIcon onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>{HERO.primary}</BtnOwn>
              <BtnOwn size="L" variant="secondary" hideIcon onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>{HERO.secondary}</BtnOwn>
            </div>
          </div>
          {/* Right — phone */}
          <div className="relative mx-auto w-full" style={{ maxWidth: '20.625rem' }}>
            <img src="/about/img/hero-phone.png" alt="Axevil app — лента сделок" className="block w-full h-auto" style={{ aspectRatio: '9 / 19.5' }} />
            {OVERLAY && (
              <div className="absolute inset-0 flex flex-col" style={{ padding: '14% 9% 8%', gap: '0.625rem' }} aria-hidden>
                <p className="font-inter-tight font-medium text-text-xs text-white/50" style={{ letterSpacing: '0.09375rem' }}>DEAL FEED</p>
                <p className="font-inter-tight font-semibold text-white" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Открытые возможности</p>
                {HERO_DEALS.map((d) => (
                  <div key={d.name} className="flex flex-col rounded-border-r-0.75" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', padding: '0.625rem', gap: '0.375rem' }}>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center justify-center font-inter-tight font-semibold text-black-600" style={{ width: '1.75rem', height: '1.75rem', borderRadius: '0.4375rem', fontSize: '0.625rem', background: 'linear-gradient(135deg,#bcbcbc,#4dba79)' }}>{d.ticker}</span>
                      <StatusPill status={d.status} label={d.statusLabel} />
                    </div>
                    <span className="font-inter-tight font-semibold text-white" style={{ fontSize: '0.75rem' }}>{d.name}</span>
                    <span className="font-inter-tight font-medium text-white/40" style={{ fontSize: '0.5625rem' }}>{d.sector}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify** — render hero, check at 1440/768/360: phone scales, no overflow, deal overlay aligns to screen (tune the `padding` % if the chosen image's screen bezel differs; if misaligned, set `OVERLAY = false`).

- [ ] **Step 3: Commit** `git commit -am "feat(axevil-about): AboutHero"`

---

## Task 7: `TrustStrip`

**Files:** Create `src/pages/about-sections/TrustStrip.tsx`

- [ ] **Step 1: Write `TrustStrip.tsx`**

```tsx
import { TRUST_STATS, COMPLIANCE } from './content'

export default function TrustStrip() {
  return (
    <section className="w-full bg-page-bg" style={{ borderTop: '1px solid var(--section-border)', borderBottom: '1px solid var(--section-border)', padding: 'clamp(2.5rem, 5vw, 3.375rem) 0' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col" style={{ gap: '1.75rem' }}>
        <div className="grid text-center" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem 1rem' }}>
          {TRUST_STATS.map((s) => (
            <div key={s.label} className="md:[grid-column:auto] flex flex-col items-center" style={{ gap: '0.625rem' }}>
              <span className="font-inter-tight font-semibold text-h1-semi text-acc-gradient" style={{ lineHeight: 1 }}>{s.num}</span>
              <span className="font-inter-tight font-medium text-text-xs text-white/45" style={{ letterSpacing: '0.125rem', textTransform: 'uppercase' }}>{s.label}</span>
            </div>
          ))}
        </div>
        <p className="text-center font-inter-tight font-medium text-text-xs text-white/45">{COMPLIANCE}</p>
      </div>
    </section>
  )
}
```

> Add `md:grid-cols-4` via className: change the grid wrapper to `className="grid grid-cols-2 md:grid-cols-4 text-center"` and drop the inline `gridTemplateColumns`. (4 columns desktop/tablet, 2 columns mobile.)

- [ ] **Step 2: Verify** at 1440/768/360 — 4 cols → 2 cols on mobile, gradient numbers, compliance wraps cleanly.

- [ ] **Step 3: Commit** `git commit -am "feat(axevil-about): TrustStrip"`

---

## Task 8: `ThesisRows`

**Files:** Create `src/pages/about-sections/ThesisRows.tsx`

- [ ] **Step 1: Write `ThesisRows.tsx`** (DS `SectionHeading` + 3 rows; rows are 3-col on desktop, stacked on mobile)

```tsx
import { SectionHeading } from '@axevil/design-system/components'
import { THESIS } from './content'

export default function ThesisRows() {
  return (
    <section id="thesis" className="w-full" style={{ background: 'linear-gradient(180deg, var(--bg-100) 0%, var(--black-300) 100%)', padding: 'clamp(4rem, 8vw, 7.5rem) 0' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col" style={{ gap: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
        <SectionHeading number="1.0" label={THESIS.eyebrow} title={THESIS.title} subtitle={THESIS.lead} titleMaxWidth="42.5rem" />
        <div className="flex flex-col">
          {THESIS.rows.map((r, i) => (
            <div key={r.num} className="grid items-start md:items-center"
              style={{ gridTemplateColumns: '1fr', gap: 'clamp(1rem, 2vw, 2.75rem)', padding: 'clamp(1.5rem, 3vw, 2.25rem) 0', borderTop: '1px solid var(--section-border)', borderBottom: i === THESIS.rows.length - 1 ? '1px solid var(--section-border)' : undefined }}>
              <div className="md:grid" style={{ gridTemplateColumns: '13rem 14rem 1fr', gap: 'clamp(1rem, 2vw, 2.75rem)', display: 'grid', alignItems: 'center' }}>
                <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                  <span className="font-inter-tight font-semibold" style={{ fontSize: '1.75rem', color: 'rgba(77,186,121,0.5)' }}>{r.num}</span>
                  <span className="font-inter-tight font-semibold text-white text-xl">{r.title}</span>
                </div>
                <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                  <span className="font-inter-tight font-semibold text-h2 text-acc-gradient" style={{ lineHeight: 1 }}>{r.stat}</span>
                  <span className="font-inter-tight font-medium text-text-xs text-white/45" style={{ textTransform: 'uppercase', letterSpacing: '0.09375rem' }}>{r.statLabel}</span>
                </div>
                <p className="font-inter-tight font-medium text-paragraph text-white/70">{r.copy}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="font-inter-tight font-medium text-text-xs text-white/40" style={{ borderTop: '1px solid var(--section-border)', paddingTop: '1.125rem' }}>{THESIS.sources}</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify** at 1440/768/360 — 3-col rows stack on mobile, big stat gradient renders, no overflow.

- [ ] **Step 3: Commit** `git commit -am "feat(axevil-about): ThesisRows"`

---

## Task 9: `PortfolioSectors` (+ lead-magnet)

**Files:** Create `src/pages/about-sections/PortfolioSectors.tsx`

- [ ] **Step 1: Write `PortfolioSectors.tsx`**

```tsx
import { SectionHeading, BtnOwn, DescTag } from '@axevil/design-system/components'
import { PORTFOLIO } from './content'
import CompanyChip from './CompanyChip'

export default function PortfolioSectors() {
  const lm = PORTFOLIO.leadmagnet
  return (
    <section id="portfolio" className="w-full bg-page-bg" style={{ padding: 'clamp(4rem, 8vw, 7.5rem) 0' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col" style={{ gap: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
        <SectionHeading number="2.0" label={PORTFOLIO.eyebrow} title={PORTFOLIO.title} subtitle={PORTFOLIO.lead} titleMaxWidth="42.5rem" />

        <div className="grid" style={{ gridTemplateColumns: 'repeat(1, 1fr)', gap: '1rem' }}>
          <div className="contents md:grid" />
          {PORTFOLIO.sectors.map((s) => (
            <div key={s.title} className="flex flex-col rounded-card bg-surface-0" style={{ border: '1px solid var(--border-subtle)', padding: '1.5rem', gap: '1rem' }}>
              <span className="font-inter-tight font-semibold text-acc-gradient" style={{ fontSize: '1.875rem', lineHeight: 1 }}>{s.count}</span>
              <h3 className="font-inter-tight font-semibold text-white text-xl">{s.title}</h3>
              <div className="flex flex-wrap" style={{ gap: '0.5rem' }}>
                {s.companies.map((c) => <CompanyChip key={c} name={c} />)}
              </div>
              <p className="font-inter-tight font-medium text-text-s-med text-white/45">{s.note}</p>
            </div>
          ))}
        </div>

        {/* Lead-magnet */}
        <div className="grid rounded-card-lg bg-black-500 items-center" style={{ gridTemplateColumns: '1fr', gap: '2rem', border: '1px solid rgba(77,186,121,0.2)', padding: 'clamp(1.5rem, 3vw, 1.875rem)' }}>
          <div className="md:grid" style={{ gridTemplateColumns: '17.5rem 1fr', gap: '2rem', display: 'grid', alignItems: 'center' }}>
            <div className="flex flex-col justify-between rounded-border-r-1" style={{ minHeight: '13.75rem', padding: '1.5rem', border: '1px solid var(--border-subtle)', background: 'radial-gradient(circle at 20% 20%, rgba(77,186,121,0.18), transparent 38%), linear-gradient(135deg,#111,#1c1c1c)' }}>
              <span className="font-inter-tight font-medium text-text-xs" style={{ color: 'var(--status-open)', letterSpacing: '0.09375rem' }}>{lm.tag}</span>
              <span className="font-inter-tight font-semibold text-white text-h4">{lm.coverTitle}</span>
              <span className="font-inter-tight font-medium text-text-xs text-white/45">{lm.coverFoot}</span>
            </div>
            <div className="flex flex-col" style={{ gap: '1rem' }}>
              <DescTag number="3.0" label={lm.eyebrow} />
              <h3 className="font-inter-tight font-semibold text-white text-h4">{lm.title}</h3>
              <p className="font-inter-tight font-medium text-paragraph text-white/70" style={{ maxWidth: '42.5rem' }}>{lm.body}</p>
              <div><BtnOwn size="L" hideIcon onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>{lm.cta}</BtnOwn></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

> Sector grid responsive: change the sector grid wrapper to `className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"` with `style={{ gap: '1rem' }}` and remove the stray `<div className="contents md:grid" />` placeholder. 3 cols desktop, 2 tablet, 1 mobile.

- [ ] **Step 2: Verify** at 1440/768/360 — sector grid 3→2→1; logos render where available, text chips otherwise; lead-magnet stacks on mobile.

- [ ] **Step 3: Commit** `git commit -am "feat(axevil-about): PortfolioSectors + lead-magnet"`

---

## Task 10: `ExitsGrid`

**Files:** Create `src/pages/about-sections/ExitsGrid.tsx`

- [ ] **Step 1: Write `ExitsGrid.tsx`**

```tsx
import { SectionHeading } from '@axevil/design-system/components'
import { EXITS } from './content'

export default function ExitsGrid() {
  return (
    <section id="exits" className="w-full" style={{ background: 'linear-gradient(180deg, var(--bg-100) 0%, var(--black-300) 100%)', padding: 'clamp(4rem, 8vw, 7.5rem) 0' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col" style={{ gap: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
        <SectionHeading number="4.0" label={EXITS.eyebrow} title={EXITS.title} subtitle={EXITS.lead} titleMaxWidth="42.5rem" />
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.25rem' }}>
          {EXITS.cards.map((c) => (
            <article key={c.company} className="flex flex-col rounded-card bg-black-500" style={{ border: '1px solid var(--border-subtle)', padding: 'clamp(1.5rem, 3vw, 1.875rem)', gap: '0.75rem' }}>
              <div className="flex items-center justify-between" style={{ gap: '1.25rem', marginBottom: '0.5rem' }}>
                <h3 className="font-inter-tight font-semibold text-white text-h3">{c.company}</h3>
                <span className="font-inter-tight font-medium text-text-xs text-white/45" style={{ textTransform: 'uppercase', letterSpacing: '0.09375rem', textAlign: 'right' }}>{c.type}</span>
              </div>
              <span className="font-inter-tight font-semibold text-h3" style={{ color: 'var(--white-100)', lineHeight: 1.08 }}>{c.metric}</span>
              <p className="font-inter-tight font-medium text-text-s-med text-white/70">{c.copy}</p>
              <p className="font-inter-tight font-medium text-text-s-med" style={{ color: 'var(--white-300)', fontStyle: 'italic', borderTop: '1px solid var(--section-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>{c.why}</p>
            </article>
          ))}
        </div>
        <p className="text-center font-inter-tight font-medium text-text-s-med" style={{ color: 'var(--white-300)', fontStyle: 'italic' }}>{EXITS.foot}</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify** at 1440/768/360 — 2-col → 1-col, metric prominent, no overflow.

- [ ] **Step 3: Commit** `git commit -am "feat(axevil-about): ExitsGrid"`

---

## Task 11: `WhyPillars`

**Files:** Create `src/pages/about-sections/WhyPillars.tsx`

- [ ] **Step 1: Write `WhyPillars.tsx`**

```tsx
import { SectionHeading } from '@axevil/design-system/components'
import { WHY } from './content'

export default function WhyPillars() {
  return (
    <section id="why" className="w-full bg-page-bg" style={{ padding: 'clamp(4rem, 8vw, 7.5rem) 0' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col" style={{ gap: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
        <SectionHeading number="5.0" label={WHY.eyebrow} title={WHY.title} subtitle={WHY.lead} titleMaxWidth="42.5rem" />
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '1.25rem' }}>
          {WHY.pillars.map((p) => (
            <div key={p.num} className="flex flex-col rounded-card bg-surface-0" style={{ border: '1px solid var(--border-subtle)', padding: 'clamp(1.5rem, 3vw, 1.5rem)', gap: '1.25rem' }}>
              <span className="font-inter-tight font-semibold text-acc-gradient" style={{ fontSize: '2.375rem', lineHeight: 1 }}>{p.num}</span>
              <h3 className="font-inter-tight font-semibold text-white text-h4">{p.title}</h3>
              <p className="font-inter-tight font-medium text-text-s-med text-white/70">{p.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify** at 1440/768/360 — 3→1 col.

- [ ] **Step 3: Commit** `git commit -am "feat(axevil-about): WhyPillars"`

---

## Task 12: `LegalInfra`

**Files:** Create `src/pages/about-sections/LegalInfra.tsx`

- [ ] **Step 1: Write `LegalInfra.tsx`** (diagram 3-box flow with arrows that rotate/stack on mobile + 3 messages + 6 partner cards)

```tsx
import { SectionHeading } from '@axevil/design-system/components'
import { LEGAL } from './content'

export default function LegalInfra() {
  return (
    <section id="legal" className="w-full" style={{ background: 'linear-gradient(180deg, var(--bg-100) 0%, var(--black-300) 100%)', padding: 'clamp(4rem, 8vw, 7.5rem) 0' }}>
      <div className="mx-auto w-full max-w-content container-px flex flex-col" style={{ gap: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
        <SectionHeading number="6.0" label={LEGAL.eyebrow} title={LEGAL.title} subtitle={LEGAL.lead} titleMaxWidth="42.5rem" />

        {/* Diagram */}
        <div className="flex flex-col rounded-card-lg bg-black-500" style={{ border: '1px solid var(--border-subtle)', padding: 'clamp(1.5rem, 3vw, 1.875rem)', gap: '1.375rem' }}>
          <div className="grid items-center" style={{ gridTemplateColumns: '1fr', gap: '0.625rem' }}>
            <div className="flex flex-col lg:flex-row lg:items-center" style={{ gap: '0.625rem' }}>
              {LEGAL.boxes.map((b, i) => (
                <div key={b.title} className="contents lg:flex lg:items-center" style={{ gap: '0.625rem' }}>
                  <div className="flex flex-col rounded-border-r-1 flex-1" style={{ border: '1px solid var(--black-600)', background: 'rgba(255,255,255,0.03)', padding: '1.375rem', minHeight: '9.375rem', gap: '0.625rem' }}>
                    <span className="font-inter-tight font-medium text-text-xs" style={{ color: 'var(--status-open)', letterSpacing: '0.09375rem', textTransform: 'uppercase' }}>{b.kicker}</span>
                    <h3 className="font-inter-tight font-semibold text-white text-xl">{b.title}</h3>
                    <p className="font-inter-tight font-medium text-text-s-med text-white/55">{b.copy}</p>
                  </div>
                  {i < LEGAL.boxes.length - 1 && (
                    <span className="self-center font-inter-tight" style={{ color: 'var(--status-open)', fontSize: '1.375rem', transform: 'rotate(90deg)', display: 'inline-block' }} aria-hidden>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '1rem' }}>
            {LEGAL.messages.map((m) => (
              <p key={m.strong} className="font-inter-tight font-medium text-text-s-med text-white/70" style={{ borderTop: '1px solid var(--section-border)', paddingTop: '1rem' }}>
                <strong className="text-white font-semibold">{m.strong}</strong> {m.rest}
              </p>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '1rem' }}>
          {LEGAL.partners.map((p) => (
            <div key={p.title} className="flex flex-col rounded-card bg-surface-0" style={{ border: '1px solid var(--border-subtle)', padding: '1.5rem', gap: '0.625rem' }}>
              <span className="font-inter-tight font-medium text-text-xs text-white/45" style={{ textTransform: 'uppercase', letterSpacing: '0.09375rem' }}>{p.type}</span>
              <h3 className="font-inter-tight font-semibold text-white text-xl">{p.title}</h3>
              <p className="font-inter-tight font-medium text-text-s-med text-white/70">{p.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

> The arrow rotates 90° (vertical flow) on mobile/tablet and should be 0° on desktop. Achieve with a CSS rule in `index.css`: `@media (min-width: 64rem) { .legal-arrow { transform: rotate(0deg) !important; } }` and add `className="legal-arrow ..."` to the arrow span. Add `.legal-arrow { transform: rotate(90deg); }` base. (Keeps the rotate token-free and breakpoint-driven.)

- [ ] **Step 2: Verify** at 1440/768/360 — diagram is a horizontal 3-box flow on desktop, vertical stack with down-arrows on mobile; partners 3→2→1.

- [ ] **Step 3: Commit** `git commit -am "feat(axevil-about): LegalInfra"`

---

## Task 13: `FoundersLetter`

**Files:** Create `src/pages/about-sections/FoundersLetter.tsx`

- [ ] **Step 1: Write `FoundersLetter.tsx`** (2 founder placeholder cards + letter + signatures). Founder photos: DS-style gradient placeholder cards (no real photos available; documented in spec §5).

```tsx
import { DescTag } from '@axevil/design-system/components'
import { FOUNDERS } from './content'

export default function FoundersLetter() {
  return (
    <section id="founders" className="w-full bg-page-bg" style={{ padding: 'clamp(4rem, 8vw, 7.5rem) 0' }}>
      <div className="mx-auto w-full max-w-content container-px">
        <div className="grid rounded-card-lg bg-black-500" style={{ gridTemplateColumns: '1fr', gap: 'clamp(2rem, 4vw, 2.625rem)', border: '1px solid var(--border-subtle)', borderTop: '0.125rem solid var(--status-open)', padding: 'clamp(1.75rem, 3.5vw, 2.25rem)' }}>
          <div className="lg:grid" style={{ gridTemplateColumns: '0.85fr 1.45fr', gap: 'clamp(2rem, 4vw, 2.625rem)', display: 'grid' }}>
            {/* Photos */}
            <div className="grid content-start" style={{ gap: '1.125rem' }}>
              {FOUNDERS.people.map((f) => (
                <div key={f.name} className="flex flex-col justify-end rounded-border-r-1" style={{ minHeight: '13.75rem', border: '1px solid var(--border-subtle)', padding: '1.375rem', gap: '0.375rem', background: 'radial-gradient(circle at 30% 20%, rgba(77,186,121,0.18), transparent 35%), linear-gradient(135deg,#121212,#050505)' }}>
                  <h3 className="font-inter-tight font-semibold text-white" style={{ fontSize: '1.375rem' }}>{f.name}</h3>
                  <p className="font-inter-tight font-medium text-text-xs text-white/45" style={{ textTransform: 'uppercase', letterSpacing: '0.0625rem' }}>{f.role}</p>
                </div>
              ))}
            </div>
            {/* Letter */}
            <div className="flex flex-col" style={{ gap: '1.25rem' }}>
              <DescTag number="7.0" label={FOUNDERS.eyebrow} />
              <h2 className="font-inter-tight font-semibold text-h2 text-acc-gradient">{FOUNDERS.title}</h2>
              <div className="flex flex-col" style={{ borderLeft: '0.25rem solid var(--status-open)', paddingLeft: '1.625rem', gap: '1.125rem', marginTop: '0.5rem' }}>
                {FOUNDERS.letter.map((para, i) => (
                  <p key={i} className="font-inter-tight font-medium text-paragraph text-white/80">{para}</p>
                ))}
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1.125rem', marginTop: '1rem' }}>
                  {FOUNDERS.signatures.map((s) => (
                    <div key={s.name} className="font-inter-tight text-text-xs text-white/45">
                      <strong className="block text-white font-semibold" style={{ marginBottom: '0.3125rem' }}>{s.name}</strong>{s.role}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify** at 1440/768/360 — photos column stacks above letter on mobile, letter readable.

- [ ] **Step 3: Commit** `git commit -am "feat(axevil-about): FoundersLetter"`

---

## Task 14: `FinalCta`

**Files:** Create `src/pages/about-sections/FinalCta.tsx` (DS `CtaForm`; primary → Calendly, secondary → scroll). The `open-quiz` dispatched by CtaForm's buttons is a no-op (no Quiz mounted).

- [ ] **Step 1: Write `FinalCta.tsx`**

```tsx
import { CtaForm } from '@axevil/design-system/components'
import { FINAL_CTA } from './content'

export default function FinalCta() {
  return (
    <section id="cta" className="w-full" style={{ background: 'linear-gradient(180deg, #080808 0%, #161616 50%, #080808 100%)', borderTop: '1px solid var(--section-border)' }}>
      <CtaForm
        number={FINAL_CTA.number}
        label={FINAL_CTA.label}
        title={FINAL_CTA.title}
        subtitle={FINAL_CTA.subtitle}
        primaryLabel={FINAL_CTA.primary}
        secondaryLabel={FINAL_CTA.secondary}
        onPrimaryClick={() => window.open(FINAL_CTA.calendly, '_blank', 'noopener')}
        onSecondaryClick={() => window.open(FINAL_CTA.calendly, '_blank', 'noopener')}
      />
      <div className="mx-auto w-full max-w-content container-px" style={{ paddingBottom: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center' }}>
        <p className="font-inter-tight font-medium text-text-xs text-white/45">
          {FINAL_CTA.crossPrefix}{' '}
          <a href={FINAL_CTA.crossHref} className="underline" style={{ color: 'var(--status-open)' }}>{FINAL_CTA.crossLink}</a>
        </p>
      </div>
    </section>
  )
}
```

> Verify `CtaForm` accepts `onPrimaryClick`/`onSecondaryClick` (it does per its type). If passing a handler does NOT suppress the default `open-quiz` dispatch, that's fine — no Quiz is mounted, so Calendly still opens and the event is ignored.

- [ ] **Step 2: Verify** — primary opens Calendly in new tab; layout centered; cross-link visible.

- [ ] **Step 3: Commit** `git commit -am "feat(axevil-about): FinalCta"`

---

## Task 15: Assemble `About.tsx` + wire `App.tsx`

**Files:** Create `src/pages/About.tsx`; modify `src/App.tsx`.

- [ ] **Step 1: Write `About.tsx`**

```tsx
import { FadeIn, Footer } from '@axevil/design-system/components'
import AboutNav from './about-sections/AboutNav'
import AboutHero from './about-sections/AboutHero'
import TrustStrip from './about-sections/TrustStrip'
import ThesisRows from './about-sections/ThesisRows'
import PortfolioSectors from './about-sections/PortfolioSectors'
import ExitsGrid from './about-sections/ExitsGrid'
import WhyPillars from './about-sections/WhyPillars'
import LegalInfra from './about-sections/LegalInfra'
import FoundersLetter from './about-sections/FoundersLetter'
import FinalCta from './about-sections/FinalCta'

export default function About() {
  return (
    <main className="overflow-x-clip bg-page-bg">
      <AboutNav />
      <AboutHero />
      <FadeIn><TrustStrip /></FadeIn>
      <FadeIn><ThesisRows /></FadeIn>
      <FadeIn><PortfolioSectors /></FadeIn>
      <FadeIn><ExitsGrid /></FadeIn>
      <FadeIn><WhyPillars /></FadeIn>
      <FadeIn><LegalInfra /></FadeIn>
      <FadeIn><FoundersLetter /></FadeIn>
      <FinalCta />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2: Set `App.tsx`** to the final body (from Task 1 Step 9 — `return <About/>`), removing any temporary scaffold markup.

- [ ] **Step 3: Verify full page**

Run: `npm run dev`
Expected: full page renders top-to-bottom; nav anchors scroll to each section; no console errors; fonts load (Network tab, no 404 on `/about/fonts/*`).

Run: `npm run typecheck`
Expected: passes.

- [ ] **Step 4: Commit** `git commit -am "feat(axevil-about): assemble About page"`

---

## Task 16: Responsive QA + build + token discipline

**Files:** none (verification) — fixes applied inline to sections as needed.

- [ ] **Step 1: Build**

Run: `npm run build`
Expected: `tsc --noEmit` clean, Vite build succeeds, output in `dist/about/`.

- [ ] **Step 2: Preview + screenshot at 3 breakpoints** (Playwright MCP)

Run `npm run preview`, then navigate Playwright to the preview URL `/about/` and screenshot at viewport widths **1440, 768, 360**. For each:
- No horizontal scroll (check `document.documentElement.scrollWidth <= clientWidth`).
- No text overflow, no clipped cards, phone scales, grids collapse (3→2→1 / 2→1).
- Nav burger works at 360; "Обсудить" + Calendly CTAs work.

Fix any overflow inline in the offending section (adjust grid breakpoints / clamp mins), re-screenshot.

- [ ] **Step 3: Token / px discipline grep**

Run (PowerShell):
```powershell
Select-String -Path "axevil-about/src/**/*.tsx","axevil-about/src/**/*.ts" -Pattern '#[0-9a-fA-F]{3,8}' |
  Where-Object { $_.Line -notmatch 'gradient|rgba|radial|linear' }
```
Expected: no hardcoded hex outside gradient/rgba strings (the gradient backgrounds and the deal-logo gradient are the documented exceptions).

Run:
```powershell
Select-String -Path "axevil-about/src/**/*.tsx" -Pattern '\b\d+px\b' |
  Where-Object { $_.Line -notmatch 'solid|blur|shadow' }
```
Expected: no `Npx` layout values except 1px borders / blur / shadow.

- [ ] **Step 4: Accessibility quick pass**

- Tab through page: nav links, both hero buttons, lead-magnet button, CtaForm buttons, cross-link all reachable with visible focus ring.
- Phone deal overlay is `aria-hidden` (decorative). Founder placeholder cards convey name/role as text (announced).
- Each meaningful `<img>` (company logos, footer logo, phone) has RU/descriptive `alt`.

- [ ] **Step 5: Commit**

```bash
git commit -am "chore(axevil-about): responsive QA + token discipline pass"
```

---

## Self-review notes (gaps to watch during execution)

- **Phone asset fit:** the chosen `hero-phone.png` may already contain a baked-in feed. Step 1/Task 6 has an `OVERLAY` switch — verify visually and flip if the DOM overlay double-renders a feed.
- **Logo filenames:** Task 2 Step 5 assumes exact source filenames; list the source dirs first and adjust copy commands. Any company without a logo correctly falls back to a DS `Tag` text chip via `CompanyChip`.
- **`SectionHeading` gradient:** it defaults to the canonical AXEVIL gradient; we pass no `gradient` override so it uses the package default (correct).
- **`CtaForm` quiz dispatch:** harmless without a mounted Quiz; Calendly handlers still fire.
- **RU copy:** authored from the brief's meaning (brief was mojibaked/lossy) — reviewer should proofread `content.ts`.
