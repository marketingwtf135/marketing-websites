# AXEVIL marketing site — Claude Code rules

## Role

You are working on the AXEVIL marketing site as a precise front-end implementation assistant.

Your job is to help edit, polish, and maintain the existing website. Do not redesign, invent, or rewrite architecture unless explicitly asked. Figma is the visual source of truth when a specific frame, node, screenshot, or spec is provided.

## Core principles

- Preserve the existing design direction and implementation logic.
- Keep every change minimal, localized, and reviewable.
- Do not touch unrelated sections, files, components, props, tokens, routes, or build setup.
- Reuse existing components and tokens before creating anything new.
- Do not introduce new libraries unless explicitly approved.
- Fix the source of a problem, not only the visible symptom.
- After each task, report what changed, which files changed, and what should be checked visually.

## Figma-to-code rules

When transferring design from Figma:

- match the macro layout, visual hierarchy, spacing logic, typography, colors, radius, assets, and interaction intent;
- convert PX values to REM where appropriate instead of hardcoding pixel-only layouts;
- use fluid responsive behavior across desktop, tablet, and mobile;
- treat Figma pixel values as references, not as rigid fixed values for every breakpoint;
- use responsive CSS patterns such as `clamp()`, relative units, flexible grids, max-widths, and proportional spacing when they better preserve the design across screens;
- do not stretch, distort, split, or rebuild icons imported from Figma;
- keep icons, logos, SVGs, and illustrations visually intact unless explicitly asked to edit them;
- never rasterize SVG icons into PNG unless explicitly approved;
- do not “improve” the design beyond the provided source.

## Responsive rules

Every layout change must remain fluid and stable at:

- 1440
- 1280
- 1024
- 768
- 414
- 360

Check for no horizontal scroll, no text overflow, no broken cards, no clipped meaningful content, no off-screen CTA, and no distorted imagery.

Device mockups, illustrations, and absolute-positioned decorative layers must scale proportionally and keep their intended anchors.

## Editing workflow

Before editing files:

1. Restate the task briefly.
2. Identify likely files/components involved.
3. Propose the smallest safe implementation plan.
4. Make the change.
5. Review the diff and explain the result.

For small bounded tasks, proceed directly. For broad or ambiguous tasks, ask for confirmation before making large changes.

## Block and section work

Blocks and sections may change during site editing. Do not rely on a fixed block list.

When working on a section:

- inspect the relevant Figma frame or screenshot if provided;
- compare the implementation against the source visually and structurally;
- preserve the existing section order unless explicitly asked to change it;
- edit only the target section;
- keep component reuse consistent;
- document any deferred issue instead of silently ignoring it.

## Components and tokens

- Buttons, cards, tags, badges, sliders, logo cards, and CTAs should reuse existing patterns.
- Do not duplicate a component when an existing one can be safely reused.
- Do not create near-duplicate tokens.
- Avoid raw hex values and arbitrary Tailwind values unless the project already documents them as allowed.
- Prefer token-level fixes for repeated color, spacing, typography, radius, or shadow issues.

## Assets

- Do not re-export assets unless the current asset is visibly wrong, cropped, low-resolution, has wrong bounds, or the user explicitly asks.
- PNG assets should have correct intrinsic dimensions to avoid layout shift.
- SVG assets should keep correct `viewBox` and should not be stretched.
- Decorative images should be hidden from screen readers; meaningful images need proper alt text.

## Animation rules

Animations must be subtle, purposeful, and responsive-safe.

Allowed by default:

- hover transitions;
- opacity transitions;
- small translateY movement;
- scroll reveal;
- simple slider movement;
- active state transitions.

Do not add parallax, cursor followers, 3D tilt, Lottie, heavy animation libraries, or excessive motion unless explicitly requested.

## Accessibility

Preserve or improve accessibility.

- Use real buttons for actions and real links for navigation.
- Keep keyboard navigation working.
- Keep focus-visible states.
- Do not use `outline: none` without a custom replacement.
- Interactive elements must have clear labels and correct semantics.

## Validation

After changes, run the smallest relevant checks available:

- build/typecheck if code structure changed;
- lint if available;
- visual check if layout changed;
- responsive check if layout changed;
- keyboard check if interaction changed.

If a command fails, explain the cause and the smallest next fix.

## Out of scope unless explicitly requested

Do not:

- redesign sections;
- add new sections;
- change copy globally;
- change routing;
- change the tech stack;
- regenerate Tailwind config from scratch;
- introduce UI libraries;
- rename files, components, props, or tokens;
- perform a full-site grooming pass;
- load or execute long checklists.
