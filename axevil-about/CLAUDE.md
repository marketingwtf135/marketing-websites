# AXEVIL — About page (`axevil-about`) — Claude Code rules

Standalone «О компании / About Axevil» marketing page. Part of the AXEVIL product
ecosystem. Built from the shared design system, deployed at `/about`.

Borrowed from `axevil-website` CLAUDE.md and adapted to the `marketing-websites`
pattern (this project **consumes** the published `@axevil/design-system` package
instead of housing the DS source).

## Stack
- React 18 + TypeScript + Vite 5
- Tailwind 3 (token-based) — `tailwind.config.ts` does `require('@axevil/design-system').tokens`
- Framer Motion 11 (animations)
- `@axevil/design-system` — tokens (`/css`, `/tailwind`) + React components (`/components`)
- Font: Inter Tight (woff2 in `public/fonts/`)
- Dark theme only — background `#080808`, no light mode

## 🚫 ЗАКОН №1 — НИКАКИХ PX для layout. Только rem.
**1rem = 16px.** Every spacing, font-size, padding, margin, gap, border-radius,
width, height → **rem**. If the user says a size in px, auto-convert to rem
(`Npx / 16`), don't ask.

**px allowed only for:** 1px borders & hairline dividers, media-query breakpoint
values, SVG `viewBox` units, `box-shadow`/`text-shadow`, scrollbar cosmetics.

**px forbidden in:** inline `style={{}}` layout values, Tailwind arbitrary
`w-[Npx]`/`text-[Npx]`/`gap-[Npx]`/`rounded-[Npx]`/`pt-[Npx]`, `clamp(Npx,…,Npx)`,
CSS files. Before done: grep new files for `px\b` and `#[0-9a-fA-F]{3,6}`.

## Fluid Responsive — always
Use `clamp(min-rem, vw, max-rem)` for everything that scales (fixed root
`1rem=16px` + clamp, like `axevil-newsletter`/`axevil-pdf-page`).

```tsx
fontSize: 'clamp(2.5rem, 8vw, 5.5rem)'        // h1
fontSize: 'clamp(1.75rem, 4vw, 4rem)'         // h2
paddingTop: 'clamp(3.75rem, 7.5vw, 7.5rem)'   // section padding
```

## Three breakpoints
| Name | Width | Tailwind prefix |
|------|-------|-----------------|
| Desktop | 1440 | default |
| Tablet | 768 | `md:` |
| Mobile | 360 | base / `sm:` |

- Horizontal rows → vertical stack on mobile (`flex-col md:flex-row`).
- Device mockups / absolute decorative layers → reposition or scale, keep anchors.
- No horizontal scroll, no overflow, no clipped meaningful content at any breakpoint.

## Design System first
- **Reuse DS components before writing anything new:** `Nav`, `Footer`, `BtnOwn`,
  `SectionHeading`, `DescTag`, `HeroEyebrow`, `IllCards`, `CtaForm`, `Tag`,
  `StatusPill`, `FAQ`, `SliderCard`, `BgFeatures`, `PageEntry`, `FadeIn`, motion presets.
- Use **published-package token names**: `bg-page-bg`, `bg-surface-0/1/2`,
  `text-neutral-30/35`, `text-white`, `border-subtle`, `text-h1-semi/h2/h3/h4/h5`,
  `text-text-l/m/s-med/s-semi`, `rounded-card/card-lg/section`, `max-w-content`,
  `max-w-container-medium`, `py-section-y`, `container-px`, `padding-section-*`.
  Do NOT use main-site-internal tokens (`--gradient-headline`, `text-paragraph`,
  `gradient-text`) — they aren't in the package; map to `text-acc-gradient` / `text-text-l`.
- Always `font-inter-tight` on all text. No hardcoded hex in JSX (gradient strings aside).
- Add `'./node_modules/@axevil/design-system/dist/**/*.{js,cjs}'` to Tailwind `content`.

## Gradient pattern
Headings use the DS `text-acc-gradient` class
(`linear-gradient(94deg,#A2A2A2 8.73%,#FFF 50.65%,#A2A2A2 92.57%)`),
not an inline hardcoded gradient.

## Animation Rules
- Page load: fade-in via DS `PageEntry`.
- Scroll reveal: DS `FadeIn` / `PRELOAD_IN_VIEW_MOTION`, `viewport={{ once: true }}`.
- Hover: `transition` on transform/opacity/border-color, subtle.
- No parallax, no cursor-followers, no Lottie, no 3D tilt.

## Content & language
- Russian content (verbatim from the brief). Fintech terms in English (pre-IPO, SPV,
  IRR, track record). Do not invent copy.

## Assets
- Reuse from siblings / main site; copy only referenced files into `public/`.
- PNGs with correct intrinsic dimensions (no layout shift). SVGs keep `viewBox`,
  never rasterized. Decorative imgs `aria-hidden`; meaningful imgs get RU `alt`.

## Validation
After changes run the smallest relevant checks: `tsc --noEmit`, `npm run build`,
visual + responsive check at 1440 / 768 / 360, keyboard check if interaction changed.

## Shortcut: "запушь дс" / "publish DS"
When the user says **"запушь дс"** (or "publish the design system"), run this full
publish-and-propagate flow so the DS updates everywhere:

1. **Edit only the source** in the main repo, never the built package:
   `Axevil Site/axevil-website/worktrees/<active-worktree>/` →
   `packages/tokens/**` (tokens) or `design-system/src/components/**` (components).
2. **Commit + push the source to `master`** (this triggers the
   `sync-design-system` GitHub Action, which builds the package and pushes it to
   `marketingwtf135/axevil-design-system`):
   ```
   cd "<main-repo-worktree>"
   git add -A && git commit -m "ds: <what changed>"
   git push origin HEAD:master
   ```
3. **If the Action can't run / package repo diverged**, sync it manually:
   `npm run build:ds` → copy `.ds-build/*` into the local `axevil-design-system`
   clone → `git pull --rebase origin master` (or `merge -X ours` if it only has
   stale built artifacts) → `git push origin master`.
4. **Re-install in every consumer** so the new package lands in node_modules:
   `axevil-about`, `axevil-newsletter`, `axevil-pdf-page`, `axevil-webinar` →
   `npm i` then `npm run build`.
5. **Restart dev with `--force`** (Vite caches the old package): `npm run dev -- --force`,
   and hard-refresh the browser (Ctrl+Shift+R). Required, else the screen shows stale CSS.
6. **Verify:** `git grep -n "text-text-"` is empty; the published `dist/index.d.ts`
   reflects the prop/type changes; the built CSS shows the new token values.

## Out of scope
- No redesign of DS components, no new tokens, no new UI libraries.
- No routing framework (single page, in-page anchor nav).
- Do not change the tech stack or regenerate the Tailwind config from scratch.
