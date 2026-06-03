# Integration playbook — porting a landing into the AXEVIL marketing stack

This file is the **orchestrator** for the three-document system. Read it first.

You are given:

1. A landing source (typically a single `index.html` + assets, sometimes with inline JS) authored by a designer / external dev.
2. Three instruction files (this one + `FORM-SPEC.md` + `MARKETING-STACK-SETUP.md`).

Your job: turn the landing into a production-ready project with the AXEVIL marketing stack (form → Google Sheet → online ads + offline qualified-lead postback) wired in, **without changing the landing's visible content**.

This document defines **what to do** and **in what order**. The other two define **how** for their respective domains.

---

## 0. How to invoke this playbook (manual attach workflow)

If you are an AI agent (Cursor / Claude / equivalent) reading this as one of three attached documents in a fresh chat, this section is for you. Follow it before anything else.

### 0.1. Expected attachments

The user must have attached:

1. **All three instruction documents** — `INTEGRATION-PLAYBOOK.md` (this file) + `FORM-SPEC.md` + `MARKETING-STACK-SETUP.md`.
2. **The source landing** — usually a single `index.html`, sometimes a folder with CSS / JS / assets.
3. *(Optional)* Figma frames, design tokens, copy decks — only if the user explicitly wants visual changes.

The three docs are self-contained: full source of the reusable lib modules is inlined in `MARKETING-STACK-SETUP.md` §2, and the form spec in `FORM-SPEC.md` is implementable without the reference repo. You should never need access to the `axevil-webinar` project itself.

### 0.2. What you do BEFORE writing any code

In this exact order:

1. **Read all three documents in full.** Do not skim, do not assume you know the rules.
2. **Inspect the source landing** — open the HTML, identify the `<form>` element(s), catalogue all visible top-level sections (each becomes a component), note any inline scripts and external assets.
3. **Output a brief "intake" message** to the user containing:
   - One-sentence restatement of the task as you understand it.
   - Migration strategy you propose (A / B / C / D from §4).
   - Number of form instances detected on the page + their approximate location.
   - List of Tier-1 placeholders still missing (from §2.2).
   - Any pre-existing form handlers / third-party form embeds detected in the source.
4. **Wait for the user's answers.** Do not scaffold a project, do not invent values, do not start refactoring the HTML.

### 0.3. Kickoff prompt

Ready-to-paste prompts for every typical situation in this workflow (kickoff, resume, switch strategy, GTM-only setup, post-deploy triage, doc maintenance, etc.) live in **`docs/PROMPT-TEMPLATES.md`** — single source of truth for all prompts.

The minimum kickoff is `PROMPT-TEMPLATES.md` §1.1. Optional add-ons (locales, multi-form, pre-decided strategy) are listed there too. The user does not need to repeat any doc content — the docs are self-contained.

### 0.4. Hard stops — refuse to proceed if any of these holds

If any of the following is true, **stop and ask the user — do not improvise**:

- Fewer than three instruction documents are attached. Ask for the missing one(s) by exact filename.
- No landing source is attached. Ask for it.
- Tier-1 placeholders from §2.2 are not all provided. List which ones are still needed.
- The user asks you to change visible copy or redesign sections "while you're at it". Confirm scope — these are out of scope by default per §6.
- The source landing uses a framework you don't recognise (e.g. exotic no-code export). Ask for clarification on Strategy C vs D before deciding.

### 0.5. After the intake message

Phase your work per §8 (Handshake protocol). Do not jump to Step 7 (form component) before the project skeleton is approved by the user.

---

## 1. Document map & precedence

| Document | Owns | Read it when |
|---|---|---|
| `INTEGRATION-PLAYBOOK.md` (this file) | Project skeleton, migration strategy, handshake with the user, what to do first | Always first |
| `FORM-SPEC.md` | Form fields, validation, submit lifecycle, modals behaviour | While implementing the form component |
| `MARKETING-STACK-SETUP.md` | Data flow, payload contract, AXEVIL `spreadsheet-form-writer` API, Sheet enrichment schema, offline postback Apps Script, GTM, Meta / Google Ads / GA4 configuration | While implementing submit handler and configuring the backend |

**Conflict resolution.** If two docs seem to contradict each other:

1. The more specific doc wins (`FORM-SPEC` over this file for form behaviour; `MARKETING-STACK-SETUP` over this file for data flow).
2. If both specs say the same thing differently, prefer the one in the doc that **owns** the topic (per the table above).
3. If this file says "ask the user", ask first — never invent a value.
4. If a doc references a section that no longer exists, flag it to the user instead of guessing.

**Frozen contracts** (do not rename / restructure under any circumstance): see `MARKETING-STACK-SETUP.md` §9 and `FORM-SPEC.md` §10.

---

## 2. Pre-flight: what to ask the user before touching code

Open the chat with **one** structured questionnaire that collects every variable the rest of the work depends on. Do not start implementation until all blockers are answered.

### 2.1. Project-level

- Project name / slug (used for folder name, package name, cookie namespace key)
- Default locale + any additional locales required
- Production domain (used in OG meta and verification steps)

### 2.2. Marketing values

All placeholders from `MARKETING-STACK-SETUP.md` §1. Ask in this order — the early ones are usually known, the later ones can come in batches:

- **Tier 1 — needed before first commit (substituted into frontend code):** `{{FORM_API_ENDPOINT}}`, `{{GTM_CONTAINER_ID}}`, `{{META_PIXEL_ID}}`, `{{FORM_ID}}`, `{{CAMPAIGN_NAME}}`, `{{PAGE_SLUG}}`, `{{LEAD_CONTENT_NAME}}`, `{{LEAD_VALUE}}` (numeric), `{{LEAD_CURRENCY}}`.
- **Tier 2 — needed before publishing (configured in GTM):** `{{META_ACCESS_TOKEN}}` (for the postback in Tier 3, but worth requesting alongside Pixel setup), `{{GTM_GADS_CONVERSION_ID}}`, `{{GTM_GADS_CONVERSION_LABEL}}`.
- **Tier 3 — needed before offline `QualifiedLead` starts firing (configured in Apps Script Script Properties):** `{{GOOGLE_CUSTOMER_ID}}`, `{{GOOGLE_LOGIN_CUSTOMER_ID}}`, `{{GOOGLE_DEVELOPER_TOKEN}}`, `{{GOOGLE_CONVERSION_ACTION_ID}}` (offline action ID, digits only), `{{GOOGLE_CLIENT_ID}}` / `{{GOOGLE_CLIENT_SECRET}}` / `{{GOOGLE_REFRESH_TOKEN}}`.
- **Tier 4 — optional:** `{{GA4_MEASUREMENT_ID}}`, `{{TELEGRAM_BOT_URL}}`, `{{TELEGRAM_START_PREFIX}}`.

If Tier 1 is incomplete, refuse to scaffold — the placeholders end up baked into too many files.

### 2.3. Landing-specific decisions

- How many form instances are visible on the page? (Hero card + bottom section is common.)
- Does the success modal need an external CTA (e.g. Telegram deeplink)? If yes — what URL + start-parameter convention?
- Should the success modal show a hero/speaker-style background image, or a neutral surface?
- Is there a cookie banner in the source HTML? (If yes, port behavior; if no, add nothing — do not introduce one unsolicited.)
- Any locale switcher visible in the source? (If yes — copy from source; if no — single locale, no switcher.)

### 2.4. Hard "do not" boundaries (confirm explicitly)

Ask the user to confirm before starting:

- "I will not change any visible copy from the source HTML except for the form / modal strings that need to map into the i18n layer."
- "I will not redesign layouts, swap fonts, or change colours beyond what's needed to wire interactivity."
- "I will not add extra form fields beyond name / email / phone unless you ask."

---

## 3. Target stack (baseline)

Adopt this baseline unless the user explicitly asks for something else. It is what the reference project (`axevil-webinar`) uses and what the two other specs assume.

| Layer | Choice | Why |
|---|---|---|
| Build tool | Vite 5 | Fast dev server + ES-modules, identical to reference |
| Framework | React 18 (`react-dom/client`) | Required by `FORM-SPEC.md` (portals, refs, lifecycle) |
| Language | TypeScript 5, `strict: true`, `noEmit: true` (typecheck-only) | Catches contract drift in payload keys |
| Styles | Tailwind 3 + CSS variables | Token-friendly, matches reference |
| Animations | `framer-motion` 11 | Modal `AnimatePresence`, scroll reveals if needed |
| Phone input | `react-international-phone` 4 + `libphonenumber-js` 1 | Required by `FORM-SPEC.md` §3.3 |
| Tracking | First-party modules from `src/lib/` (`tracking.ts`, `useUtm.ts`, `analytics.ts`) | Verbatim copy, see `MARKETING-STACK-SETUP.md` §2 |
| Linter / formatter | Project default (none configured in reference, do not introduce) | Avoid scope creep |

**Do not introduce a new dependency** without confirming with the user (per `CLAUDE.md` rules).

### 3.1. Reference project structure

```
<project-root>/
├── public/                       # static assets served verbatim
│   ├── favicon.svg
│   ├── opengraph.png
│   ├── img/                      # landing imagery
│   └── legal/<locale>/*.html     # legal pages if linked from disclaimer
├── src/
│   ├── main.tsx                  # entry: captureTrackingContextOnLoad() then ReactDOM.createRoot
│   ├── index.css                 # global tokens, Tailwind @layer, scrollbar styling
│   ├── components/               # cross-section primitives (FadeIn, etc.)
│   ├── lib/
│   │   ├── analytics.ts          # frozen, copy as-is
│   │   ├── tracking.ts           # frozen, copy as-is
│   │   ├── useUtm.ts             # frozen, copy as-is
│   │   ├── lang.tsx              # LangProvider + translations dict
│   │   └── cn.ts                 # className helper
│   └── pages/
│       ├── <Landing>.tsx         # composes the page from section components
│       └── <prefix>-sections/    # section components (one per landing block)
│           ├── <Prefix>Nav.tsx
│           ├── <Prefix>Hero.tsx
│           ├── ... (one component per section in source HTML)
│           ├── <Prefix>RegistrationForm.tsx    # implements FORM-SPEC.md
│           └── <Prefix>Footer.tsx
├── docs/
│   ├── INTEGRATION-PLAYBOOK.md      # this file (copy as-is)
│   ├── FORM-SPEC.md                 # copy as-is
│   └── MARKETING-STACK-SETUP.md     # copy with new Appendix A
├── index.html                    # GTM snippet (head + body), root div, entry script
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── CLAUDE.md                     # project rules (copy as-is)
└── .gitattributes / .gitignore
```

The `<prefix>` is project-specific (e.g. `WB` for webinar, `PR` for pricing). Keeps imports unambiguous when multiple landings share a monorepo.

### 3.2. `package.json` scripts (baseline)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview --host 0.0.0.0"
  }
}
```

---

## 4. Migration strategy — decision tree

Before writing any code, decide which path the source landing fits into. Pick exactly one. State your choice to the user and get confirmation.

### Strategy A — Re-shell as Vite + React (DEFAULT)

**When:** source is static HTML+CSS+optional vanilla/jQuery JS. ~80% of incoming landings.

**Approach:**

1. Scaffold a fresh project per §3.
2. Port the HTML structure into React components, **preserving DOM markup and class names verbatim** (Tailwind utility classes copy 1:1; custom classes are migrated to either CSS modules or kept in `index.css`).
3. The form's `<form>` element is replaced by a `<RegistrationForm />` component implementing `FORM-SPEC.md`. The form's container (parent block, surrounding decoration) is preserved.
4. Add the reusable modules + GTM + Sheet `enrichment` tab + offline postback Apps Script per `MARKETING-STACK-SETUP.md`.

This is the recommended path because it leaves the stack future-proof for additions (A/B tests, GA4, locale toggles, route additions).

### Strategy B — Integrate into an existing React / Next / Vue project

**When:** source already uses a JS framework.

**Approach:**

1. Do not rewrite the stack — keep the user's framework.
2. Copy `tracking.ts`, `useUtm.ts`, `analytics.ts` into a `lib/` folder (paths may differ).
3. Implement the form per `FORM-SPEC.md` as a component in the host stack's idiom. The behaviour spec is framework-agnostic — only the JSX syntax adapts.
4. Wire GTM snippet into the host's `_document.tsx` / `index.html` / equivalent.
5. Submit handler is identical; only its location changes.

Flag any framework version mismatches to the user (e.g. Next 12 lacks `app/` router considerations; Vue 2 doesn't have `<script setup>`).

### Strategy C — No-code export (Webflow / Framer / Tilda / Readymag)

**When:** the file is a static export from a no-code tool, often with inline scripts the tool injects.

**Approach:** Recommend **Strategy A** (re-shell). Explain why: no-code exports degrade quickly under direct edits (their scripts assume their runtime), and the form pipeline needs hard guarantees the no-code form widget cannot give. Ask the user to confirm before proceeding.

If the user insists on keeping the no-code export and only patching the form, fall back to **Strategy D**.

### Strategy D — Vanilla TS island (fallback, minimum-invasive)

**When:** the user explicitly forbids restructuring the source and only wants the form pipeline to work.

**Approach:**

1. Keep the source HTML in place.
2. Inject a `<script type="module">` that loads a bundled island.
3. The island finds the `<form>` element by selector, hides its native submit, and replaces the submit behaviour with the spec-compliant flow.
4. Tracking modules become a single bundled file. Modals are injected into the DOM dynamically and styled with inline styles or a single appended `<style>` block.
5. GTM snippet is added to `<head>` directly.

This path sacrifices i18n, type-safety, and design-system reuse. Use only when constrained.

---

## 5. Step-by-step integration (Strategy A, default)

Each step references the spec that owns its details. Do not improvise in steps that have a referenced spec.

### Step 1 — Scaffold the project

- `npm create vite@latest <project-slug> -- --template react-ts`
- Add `tailwindcss`, `postcss`, `autoprefixer`, `framer-motion`, `react-international-phone`, `libphonenumber-js`.
- Copy `tsconfig.json` / `tsconfig.node.json` / `vite.config.ts` / `tailwind.config.ts` / `postcss.config.js` from the reference project (adjust port if collision).
- Copy `CLAUDE.md` to the new project root.

### Step 2 — Copy the three docs

Copy `INTEGRATION-PLAYBOOK.md`, `FORM-SPEC.md`, `MARKETING-STACK-SETUP.md` into `<new-project>/docs/`. Update `MARKETING-STACK-SETUP.md` Appendix A with the new landing's concrete values.

### Step 3 — Drop in reusable modules

Verbatim copy:

- `src/lib/tracking.ts`
- `src/lib/useUtm.ts`
- `src/lib/analytics.ts`
- `src/lib/cn.ts` (if used by ported components)

**Do not modify these files.** Their internals are referenced by the specs.

### Step 4 — Bootstrap `main.tsx`

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './pages/<Landing>'
import { LangProvider } from './lib/lang'
import { captureTrackingContextOnLoad } from './lib/tracking'
import './index.css'

captureTrackingContextOnLoad()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LangProvider>
      <Landing />
    </LangProvider>
  </React.StrictMode>
)
```

Omit `LangProvider` if the project is single-locale.

### Step 5 — Add GTM snippet to `index.html`

Per `MARKETING-STACK-SETUP.md` §2.5. Substitute `{{GTM_CONTAINER_ID}}`.

### Step 6 — Port the landing's HTML into React components

Rules:

- **One section = one component.** A "section" is a top-level visual block in the source (hero, audience, benefits, schedule, speaker, form section, footer, etc.).
- File path: `src/pages/<prefix>-sections/<Prefix><Section>.tsx`.
- Class names from the source are copied verbatim. If the source uses Tailwind, no rewriting is needed; if it uses custom CSS, keep it in `src/index.css` under an `@layer components` block.
- **Do not refactor markup for "cleanliness".** Preserve the original DOM as faithfully as the JSX syntax allows.
- Extract repeating text into `lang.tsx` translations if multi-locale; otherwise inline as static strings — but still scoped to the section component (do not litter copy in the parent page).

### Step 7 — Extract design tokens

- Colours, spacing scales, border radii, shadows visible in the source → put into CSS variables in `src/index.css` (e.g. `--black-500`, `--bg-100`).
- Tailwind config extends the same tokens via `theme.extend.colors` etc.
- Match the source's intent (do not normalise to a generic Tailwind palette).

### Step 8 — Set up `LangProvider` if multi-locale

- Mirror the structure in `src/lib/lang.tsx` of the reference project.
- Every user-facing string the form / modal needs lives under `t.form.*` (see Step 9).
- Sections that are single-locale can still receive `t` and just not use it.

### Step 9 — Implement `<RegistrationForm />`

Implement strictly per `FORM-SPEC.md` — the spec is complete and self-contained. The submit-handler template lives in `MARKETING-STACK-SETUP.md` §3.

- File path: `src/pages/<prefix>-sections/<Prefix>RegistrationForm.tsx`
- Visual layout matches the source landing's form block (width, padding, button variant). The form's **internal markup** (fields, modals, button structure) follows the spec; the form's **outer container** matches the source.
- All copy comes from i18n (`t.form.*`)
- `FORM_API_ENDPOINT`, `LEAD_CONTENT_NAME`, `LEAD_VALUE`, `LEAD_CURRENCY`, `FORM_ID`, `CAMPAIGN_NAME`, `PAGE_SLUG` substituted from §2.2 placeholders
- Submit-handler payload matches the contract in `MARKETING-STACK-SETUP.md` §3 / §9
- If the source landing has a reference React implementation attached by the user (e.g. `WBRegistrationForm.tsx`), use it as illustrative — but the spec is authoritative on every behavioural rule.

### Step 10 — Implement success / error modals

Per `FORM-SPEC.md` §7 and §8. Either embed inside `<RegistrationForm />` (reference) or extract as standalone components if reused.

### Step 11 — Wire the form into the landing

- The source's `<form>` block is the docking point. Replace it with `<RegistrationForm />` inside the same parent container.
- If multiple form instances exist (hero card + bottom section), instantiate the component twice. The module-level `formViewFired` guard in `WBRegistrationForm.tsx` handles dedup automatically.
- The submit button visual variant may differ between instances — accept this via a `submitVariant` prop (see reference: `'plain' | 'cta'`).

### Step 12 — Configure the backend

Follow `MARKETING-STACK-SETUP.md` §4 (Google Sheet + offline postback):

- §4.1 — request a new AXEVIL `spreadsheet-form-writer` endpoint mapped to the project's Sheet from the platform team. The frontend just needs the URL; column layout written by AXEVIL backend is its responsibility.
- §4.2 — create the `enrichment` tab in the Sheet with the required headers (`target`, `json_response`, `google_postback_status`, `meta_postback_status`, `postback_sent_at`, `postback_error`). These names are frozen — the postback script reads them by header name.
- §4.3 — paste the production postback script verbatim into the Sheet's Apps Script editor. The script is identical across all AXEVIL landings; values that differ per project live in Script Properties, not in code.
- §4.4 — fill Script Properties.
- §4.5 — attach the hourly `runTargetPostbacks` trigger.

Do not invent a separate Apps Script `doPost` to receive form submissions — `spreadsheet-form-writer` does that. The Apps Script in §4.3 is for the offline postback only.

### Step 13 — Configure GTM

Follow `MARKETING-STACK-SETUP.md` §5 (variables, triggers, tags). Always publish a v1 version before smoke-testing.

### Step 14 — Verify

Follow `MARKETING-STACK-SETUP.md` §8 (smoke tests) + `FORM-SPEC.md` §9 (accessibility checklist).

### Step 15 — Hand off

Deliverable:

- Project repo with all the above.
- README with: install, dev, build, deploy commands.
- `docs/MARKETING-STACK-SETUP.md` with **Appendix A** filled in for this landing.
- Verification report: which checks passed, which (if any) deferred and why.

---

## 6. Content-preservation guarantees

Reaffirm with the user before delivery:

- Visible text is unchanged except for form / modal strings (and those are extracted to i18n unchanged from source if the source had them).
- Layouts are unchanged. Spacing, breakpoints, alignment match the source at 1440 / 1280 / 1024 / 768 / 414 / 360 — see `CLAUDE.md` responsive rules.
- Fonts are unchanged. If the source uses webfonts, keep the same `@font-face` declarations or CDN links.
- Colours are unchanged. Tokens may be renamed (`--brand-500` → `--bg-500`) but resolved values match.
- Imagery is unchanged. SVG `viewBox` and PNG intrinsic dimensions match the source.
- Behaviours not related to the form are unchanged (animations, hover states, navigation).

The form / modal area is the only place where behaviour changes (because that's the whole point). Even there, the visible structure should match the source's form block — only its interactivity becomes the spec-compliant flow.

---

## 7. Common landing patterns and how to handle each

### 7.1. Source has a `<form action="..." method="POST">`

Recognise it as the docking point. Capture the `action` URL — sometimes it points to a webhook (Zapier, Make, custom backend) the marketing team is already using. If so, ask whether to:
- Replace it with the AXEVIL `spreadsheet-form-writer` endpoint from `MARKETING-STACK-SETUP.md` §4.1, OR
- Keep their existing webhook and only adopt the analytics / GTM layer.

Most often: replace, because the Sheet → enrichment → offline postback pipeline is the source of truth for downstream ads postback. But ask.

### 7.2. Source has inline `<script>` form handlers

Catalogue everything they do. Typically: client-side validation, AJAX POST, alert / inline success message. All of this is replaced by `<RegistrationForm />`. No leftover scripts.

### 7.3. Source uses a third-party form embed (HubSpot, Mailchimp, Tilda)

Do not try to monkey-patch the embed. Replace it with the spec-compliant form. Inform the user that lead capture in HubSpot / Mailchimp will need to be re-established (either by adding a Google Sheet → HubSpot sync alongside the `spreadsheet-form-writer` flow, or by removing HubSpot from the pipeline). Confirm before proceeding.

### 7.4. Source has multiple visible forms (multi-step or hero + footer)

- Multi-step (one logical form split across screens): out of scope of `FORM-SPEC.md`. Flag to user; either collapse to a single screen or have a focused conversation about multi-step UX.
- Hero + footer (same fields in two places): instantiate `<RegistrationForm />` twice. `formViewFired` module-level guard handles analytics dedup.

### 7.5. Source has a confirmation page (separate URL) instead of a modal

Default to the modal per `FORM-SPEC.md` §7. If the user insists on a separate URL, scope-confirm and add a route — but flag that this complicates `lead_event_id` handoff and CAPI deduplication (the success URL must read the ID from the query string or sessionStorage).

### 7.6. Source has no GDPR / cookie banner but ads will run in EU

Inform the user. Recommend adding a cookie banner that gates GTM. Do not add unsolicited — but flag the legal risk.

---

## 8. Handshake protocol

Phase the conversation with the user. Do not dump all questions at once if you don't need to.

| Phase | Trigger | What you do |
|---|---|---|
| **0. Confirm scope** | First message | Briefly restate the task; confirm the three-doc system and the "no visual changes" boundary |
| **1. Pre-flight questionnaire** | Right after Phase 0 | Ask everything in §2 in one structured block (group Tier-1, Tier-2, Tier-3 placeholders so the user can prioritise) |
| **2. Strategy decision** | After Phase 1 answers | Inspect the source HTML; propose Strategy A/B/C/D per §4; confirm with the user |
| **3. Scaffold + skeleton port** | After strategy confirmation | Do Steps 1–6 of §5; commit; show a preview |
| **4. Form & modal implementation** | After skeleton port preview is approved | Do Steps 7–11 of §5; commit; show a preview with submitting the form against a test Sheet |
| **5. Backend wiring** | After form works locally | Do Steps 12–13 of §5; smoke-test |
| **6. Hand-off** | After §8 verification passes | Deliver per Step 15 |

If the user pushes for parallel work, you can collapse phases — but never collapse Phase 1 into Phase 3 (you must have all Tier-1 placeholders before scaffolding).

---

## 9. Things that are tempting but wrong

- **Adding shadcn / Radix / a UI library** to "improve" the form. Unnecessary; spec is implementable with native elements + Tailwind. Skip.
- **Switching to Next.js for SSR.** Form is fully client-side. SSR adds complexity without benefit. Skip unless the user already chose Next for other reasons.
- **Replacing `react-international-phone`** with a custom phone input. The phone field is the riskiest part of the form (locale detection + masking + libphonenumber-js validation). Do not rebuild.
- **Combining the three docs into one.** They have different audiences (this file = orchestration / agent, FORM-SPEC = implementer, MARKETING-STACK-SETUP = infra). Keep them separate.
- **Hardcoding placeholder values into the codebase** ("we can refactor later"). Always substitute. Hardcoded values silently leak between projects.
- **Skipping the Apps Script postback because "we'll wire it later".** The offline `QualifiedLead` postback is the highest-ROI step in the stack — Meta / Google Ads optimisation depends on it. Set it up in the same session.
- **Auto-firing `form_start`/`form_view`** on mount or on focus. Spec explicitly defines when these fire (`FORM-SPEC.md` §5).

---

## 10. Cross-references

- `FORM-SPEC.md` — form & modal behavioural spec (no copy, no design)
- `MARKETING-STACK-SETUP.md` — data flow, Sheet, GTM, ads, postback (with concrete project values in Appendix A)
- Reference implementation (illustrative — paths shown are from the webinar landing in this repo; in a new project the files live wherever makes sense, often `src/components/RegistrationForm.tsx`, etc.). When porting, prefer `FORM-SPEC.md` + `MARKETING-STACK-SETUP.md` §2/§3 over reading these files line-by-line:
  - `src/pages/wb-sections/WBRegistrationForm.tsx` — form + modals
  - `src/lib/tracking.ts`, `useUtm.ts`, `analytics.ts`, `lang.tsx` — supporting modules (source inlined in `MARKETING-STACK-SETUP.md` §2)
  - `index.html` (GTM snippet)
  - `src/main.tsx` (bootstrap)

---

## Change log

| Date       | Author | Change                                                              |
|------------|--------|---------------------------------------------------------------------|
| 2026-06-03 | vladk  | Initial orchestrator playbook for porting landings into the stack.  |
| 2026-06-03 | vladk  | Align placeholder tiers + Step 12 with `MARKETING-STACK-SETUP.md` rework: `spreadsheet-form-writer` as canonical form path; rename `GADS_*` → `GOOGLE_*` Script Property names; clarify reference-implementation paths are project-specific. |
