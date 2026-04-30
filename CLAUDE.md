# AXEVIL marketing site — final grooming pass over the assembled build

The cron job has finished. The 12 blocks are merged, `phase: "done"` is committed, and the site renders end-to-end. This pass is the grooming. You are not adding features. You are walking every layer of every block, comparing the implementation against the Figma macro one element at a time, and fixing the gap between "looks right at a glance" and "matches Figma at the pixel". Treat the macro as ground truth. If the implementation deviates, the implementation loses, unless the deviation was an explicit interaction-logic addition (hover, focus, slider behavior, tag-switch state) and is documented in the per-block spec from the build prompt. Do not invent. Do not redesign. Do not "improve". The job is alignment, not creativity.

Run the full pass top-to-bottom in one sitting. Do not split across cron ticks. Use a checklist file `.grooming-report.md` you commit at the end with every finding (fixed or deferred), so the next reviewer can audit your work.

---

## Process per block

For each of blocks 1-12, in order:

1. Open the block's Figma node side-by-side with the rendered block. Use `mcp__Figma__get_screenshot` on the block node and the parent frame, save to `grooming-refs/<block>/macro-<timestamp>.png`. Take a screenshot of the live implementation at the design width and at 1440, 1280, 1024, 768, 414, 360 viewport widths and save to `grooming-refs/<block>/impl-<width>-<timestamp>.png`. The full responsive matrix is non-negotiable for this pass.
2. Walk the layer tree returned by `mcp__Figma__get_metadata` from outermost frame to innermost leaf. For every leaf (text node, vector, image, frame), confirm the implementation has a corresponding DOM node with the right tag, the right token, the right position, the right size, and the right z-order. Any leaf in Figma that is not represented in the implementation is a finding. Any DOM node in the implementation that is not in Figma is a finding.
3. For each finding, decide: fix-now (deviation is mechanical and the fix is bounded — wrong color token, wrong gap, missing border-radius, wrong font weight, missing aria attribute) or defer (deviation requires re-export of an asset, copy review, or a new component). Fix-now items get fixed in this pass. Deferred items are appended to `.grooming-report.md` with the block, the layer name, and the recommended fix.
4. Run the block-specific audits below.
5. After fixes, re-screenshot the implementation and append the diff to the report.

---

## Block-by-block audits

**Block 1 — Hero.** Audit the nav: link order matches Figma, gap between links matches the macro's auto-layout gap, the primary CTA in the nav uses the same Button component as the body CTAs (no duplicate), the logo SVG renders without rasterization at 2x. Audit the headline: font family loaded from `@font-face` (not falling back to system — open devtools Computed and confirm), font weight matches macro exactly, letter-spacing matches, line-height matches, color matches token, no orphaned widow on the last line at the design width. Audit the secondary CTA: stroke color and stroke width match the macro, hover state moves stroke opacity to 100% smoothly. Audit the hero illustration: if PNG, exported at 2x and intrinsic width/height set on the `<img>` so layout doesn't shift; if inline SVG, the SVG `viewBox` matches the Figma artboard and no clipping occurs at the hero's max-width breakpoint.

**Block 2 — Partner logos.** Confirm `gap-9` (36px) literally between logo cards via devtools, not a fudged margin. Inspect the gradient stroke: open the rendered card in devtools, confirm the `border-image` or `padding-box/border-box` background trick is in place and produces the same angle and stops as the Figma fill. Side-by-side compare the gradient against `mcp__Figma__get_screenshot` of one card — colors must match across the stroke direction. Card fill is the exact value from the node (do not assume `#080808`). Each logo is an inline SVG (not a PNG, not an `<img>` to a `.svg` file). Hover state: the stroke opacity animates over 180ms, no scale, no tilt.

**Block 3 — Four-column.** Audit each column independently. Column fills: 1-3 use `#080808` literally (or whichever value the node returns — re-confirm); column 4 uses its own fill from the node. Per-card stroke gradient: each is its own custom property, stops re-read from each node, not copy-pasted from card 1. Card 2 illustration: `transform: rotate(45deg)` on the `<img>` itself, not a wrapper, and the wrapper clips with `overflow: hidden` and the macro's radius — the rotated image must not overflow the card. Card 4 mask-image: open the rendered card in devtools, confirm `mask-image` (and `-webkit-mask-image`) are present, the mask asset loads, mask-size and mask-position match the macro. Card 4 bg-shine: present as a separate absolute layer, animates on hover from start to end position over 1200ms, single-shot, settles at end position. Card 1-3 hover lifts `translateY(-2px)` and body text fades to 100% opacity.

**Block 4 — Phone + tablet composite.** Open the composite at 1440, 1280, 1024 viewports. Phone and tablet PNGs must remain pinned to `right: 0; bottom: 0;` of their parent card across all three widths, scaling proportionally via a `max-width` clamp without breaking the anchor. The connecting illustration below the cards: confirm it sits with the macro's negative top margin and visually tucks under both cards' bottom edges; if it floats above the cards, fix the z-index ordering. PNG transparent bounds must match Figma export — no extra whitespace, no cropping. Verify all rebuilt DOM children (titles, badges, micro-icons) match Figma layer names one-to-one.

**Block 5 — Mobile + bg-shine.** Confirm the phone is a single PNG (no DOM device chrome). Confirm `bg-shine` is `position: absolute; pointer-events: none; z-index: 0;` and sits between the section background gradient and the foreground content. The section background gradient: if rebuilt in CSS, side-by-side compare with the macro export — if there is any visible banding or color mismatch, swap to a PNG export. CTA inherits the Block 1 Button (same component, not a copy).

**Block 6 — Tablet + tag switcher.** Audit the tag list: order matches the Figma node exactly, no tags missing, no extra tags. `Active Deals` paints active on first paint (open the page in a clean session, confirm). Active fill is exactly `#FFFFFF`, inactive fill is exactly `#151515`. Click each tag: active state moves, transition is `transition-colors duration-200`. Keyboard: focus a tag with Tab, arrow-left and arrow-right cycle, Enter activates. Tablet PNG includes its drop shadows baked-in — confirm by checking that no CSS `box-shadow` is applied to the `<img>`. Tablet content does not change between tags (this is correct per the macro).

**Block 7 — Web illustration.** The `bg-shine` + `web-ill` composite ships as a single PNG. Confirm there is no separate DOM `bg-shine` here (unlike Block 5). Position matches macro x/y. No animation, no parallax.

**Block 8 — Standard section.** Walk the layer tree carefully. This block is "standard" but standard often hides drift — text token mismatches, an extra `<div>` wrapper that adds spacing not in Figma, a missing border-radius on a small badge. Audit each leaf node.

**Block 9 — Slider.** Count the slides: must equal the count of cards in the Figma frame including the hidden ones stacked off-canvas inside the slider parent. If the count is short, port the missing slides now. Verify each slide's content matches its Figma source (image, title, body, CTA, badges). Behavior: scroll-snap on the track, prev/next buttons drive programmatic scroll, buttons disable at start and end (open devtools, confirm `disabled` attribute toggles correctly). Hover state on slider buttons: 150ms transition, fill alpha to 100%, icon stroke to white. Drag-to-scroll works on touch (test in device emulation). Keyboard: focus the slider, arrow keys scroll one slide, Enter on a focused button triggers its scroll. No autoplay, no infinite loop.

**Block 10 — News cards.** Hover: card scales `1.02`, cover image scales `1.04`, card lifts `translateY(-4px)`, all over 200ms ease-out. The cover image scale must be masked by the card's `overflow: hidden` and radius — confirm by hovering, no overflow leaks past the card edge. Date pill glass effect: `backdrop-filter: blur(<exact value from macro>)`, `-webkit-backdrop-filter` present, fill alpha and stroke alpha match the Figma layer. Test in Safari (desktop and iOS) — backdrop-filter behaves differently and a regression here is silent. Card click target wraps the whole card in a focusable `<a>`; tab through the page, every news card is in the tab order, focus-visible ring renders.

**Block 11 — Second logos row.** Same audit as Block 2 but re-read this node's gradient — do not assume it matches Block 2. Same `gap-9`, same gradient-stroke recipe via the shared `LogoCard` component (confirm component reuse — do not let a copy-paste sneak in). If macro has a marquee animation, confirm the animation is present, runs at the macro's speed, and pauses on hover (standard accessibility courtesy even if macro doesn't show it — this is the one allowed addition).

**Block 12 — Final CTA.** Same composite audit as Block 4. Phone and tablet `position: absolute; right: 0; bottom: 0;` inside the CTA card, z-index ordering matches the Figma layer order (verify which device sits in front by inspecting layer order in metadata, do not guess). `bg-shine` is a separate PNG on the section background, right-anchored. CTA copy and primary button stay in DOM, button is the Block 1 Button component.

---

## Cross-block consistency checks

**Token discipline.** Grep `src/**/*.tsx` for `#[0-9a-fA-F]{3,8}` — only matches allowed are inside `src/lib/` or token-generating utilities. Grep for `text-\[`, `rounded-\[`, `gap-\[`, `mb-\[`, `mt-\[`, `pt-\[`, `pb-\[`, `pl-\[`, `pr-\[`, `w-\[`, `h-\[` — zero matches outside the documented allowed exceptions (mask-, transform-, backdrop- arbitraries). Open `tailwind.config.ts` and confirm every token has a Figma variable name as its key — no orphan tokens, no near-duplicate tokens that should have been one.

**Component reuse.** The Button component appears in Blocks 1, 5, 12 — diff the rendered output across the three: same fill, same radius, same hover, same focus ring. The Tag component (Block 6) and the GlassTag (Block 10 dates) are separate by design. The LogoCard (Blocks 2 and 11) is one component with a `strokeGradient` prop — open both blocks and confirm the prop is the only difference.

**Typography.** Open the page in devtools, Network tab, and confirm every font face declared in `index.css` actually loads (no 404s, no blocked font requests). Computed font-family on every text node resolves to the Figma family, never to a system fallback. Run `getComputedStyle` on a sample of headlines and body copy across blocks and confirm font-weight, line-height, and letter-spacing match the Figma node values.

**Color.** Open the page in devtools and inspect the rendered `background-color`, `color`, and `border-color` of one element per block. Cross-reference each against the Figma node fill. Any drift means the token is wrong, not the JSX — fix at the token layer.

**Spacing.** Run a visual sweep at the design width: every section's outer top and bottom padding, every card's internal padding, every gap between cards, every gap between text rows. Compare to Figma's auto-layout values. Spacing is where pixel-perfect builds quietly drift the most.

**Z-index.** Walk every block and list every `position: absolute` element with its z-index. There should be no `z-index: 9999` or other "just make it work" values. Z-stack matches Figma layer order: lower-in-tree is in front of upper-in-tree by default; only override when Figma explicitly stacks them differently.

**Asset audit.** List every file in `public/img/` and confirm each is referenced in exactly one component (or document the reuse). Confirm each PNG is 2x the rendered size — open one, check intrinsic vs. rendered width. No oversize PNGs (>1MB) without a justification (hero composites are allowed, decorative chrome is not).

**Animation discipline.** Walk every animation on the page. Confirm: scroll fade-ins use `IntersectionObserver` with `threshold: 0.15` and 400ms ease-out, no other duration. Hover transitions match the per-block specs (180ms, 200ms, 150ms, 1200ms — each block has its own number, do not normalize). No parallax, no Lottie, no cursor-followers, no 3D tilts.

---

## Responsiveness sweep

At 1440, 1280, 1024 — desktop layout, full macro. At 768 — tablet reflow, multi-column grids collapse to single column where Figma's auto-layout would. At 414 and 360 — mobile reflow, no horizontal scroll, device mockups in Blocks 4 and 12 stay right-bottom-pinned to their parent card while the card stacks above the copy. At each breakpoint, walk every block from top to bottom and confirm: no text overflows its container, no image overflows its card, no element is clipped by `overflow: hidden` in a way that breaks meaning, no CTA goes off-screen, the slider in Block 9 still works (touch-scroll on mobile), the tag switcher in Block 6 wraps cleanly. If the macro contains explicit mobile frames for any block, follow them; otherwise reflow with the same tokens.

---

## Accessibility and performance sweep

Run `axe-core` (via `@axe-core/react` or the browser extension) on the assembled page. Zero criticals, zero serious. All `serious` warnings have a fix or a documented reason in `.grooming-report.md`. Run Lighthouse: a11y ≥ 95, performance ≥ 85 on a clean run, best-practices ≥ 95, SEO ≥ 90. CLS under 0.05 (every `<img>` has explicit width and height; fonts use `font-display: swap`). LCP element identified and confirmed to be eager-loaded (Block 1 hero illustration, almost certainly).

Tab through the entire page from top to bottom. Every interactive element is reachable in macro order. Focus-visible ring is present on every focusable element (no `outline: none` without a custom replacement). The slider exposes its prev/next buttons before its track. The tag switcher cycles via arrow keys without leaving the tablist. Every `<a>` has a real href or is a `<button>` instead.

Run a screen-reader sweep (VoiceOver on macOS, one full pass). Section headings read in order. Buttons announce their label. Tags announce their selected state. Images with content announce alt text; decorative images announce nothing. The slider announces "Previous slide" / "Next slide" on its buttons.

---

## Build and deploy checks

`pnpm build` clean, no warnings beyond Tailwind safelist info. `pnpm preview` renders identical to dev. Bundle size: main JS chunk under 250KB gzipped, total page payload under 2MB on first load (rasters dominate this — if over, audit `public/img/` for oversized exports). No console errors, no console warnings (including React's hydration warnings, key warnings, and deprecation warnings) in either dev or preview.

Open the production build in three browsers (latest Chrome, latest Safari, latest Firefox) and walk all 12 blocks. Differences between browsers that exceed one pixel on layout-critical regions are findings. `backdrop-filter` quirks in Safari, scroll-snap behaviors, and font rendering deltas are the usual suspects.

---

## Deliverables

`.grooming-report.md` at the repo root with shape:

```
# Grooming report — <date>

## Summary
- Total findings: N
- Fixed in this pass: M
- Deferred: K

## Block 1
### Fixed
- <layer name>: <what was wrong> → <what was changed>
### Deferred
- <layer name>: <what is wrong> → <recommended fix>

## Block 2
... (one section per block)

## Cross-block
... (token, typography, color, spacing, z-index, asset, animation findings)

## Responsiveness
... (per-breakpoint findings)

## a11y / Performance
... (axe + Lighthouse findings)

## Browser deltas
... (Chrome / Safari / Firefox findings)
```

Commit message: `grooming: full audit and polish pass`. One commit, one diff, easy to review. If the diff is unreasonably large, split by block (`grooming: block 1`, `grooming: block 2`, etc.) but keep the report file as one final summary commit.

---

## Out of scope for grooming

Do not redesign blocks. Do not add new sections, new components, or new copy. Do not change the order of blocks. Do not change the routing (there is none). Do not change the tech stack. Do not regenerate `tailwind.config.ts` from scratch — fix individual tokens, do not re-derive. Do not re-export every PNG — only re-export an asset if a finding requires it. Do not introduce a UI library (no shadcn additions, no Radix, no Headless UI) to fix small accessibility gaps — patch the existing components in place. Do not touch the cron infrastructure (`.cron-state.json`, the cron script) — its job is done. Do not "modernize" CSS to flexbox where the build uses grid (or vice versa) unless the macro implies the swap. Do not rename components, files, or props — naming is locked. Stay in alignment mode for the entire pass.
