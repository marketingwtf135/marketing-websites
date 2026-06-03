# Lead form & modals — behavioural spec

Reusable specification for a lead-capture form and its success / error modals. This document defines **what the form does**, not how it looks — visual styling, copy, brand colours, and routing are out of scope and belong in the project's design system.

The reference implementation lives in `src/pages/wb-sections/WBRegistrationForm.tsx`. Use this spec as the source of truth when porting the form to a new landing.

For the data plumbing (Google Sheet + GTM + ads-account postback) see `MARKETING-STACK-SETUP.md`.

---

## 1. Scope

A single-page lead form with three required fields, inline validation, and two dismissable modals (success / error). Locale-aware (en / ru / any other locale you wire in via the project's i18n layer) — all user-facing strings come from i18n, never hardcoded.

Out of scope here: visual design, layout, button variants, copy, brand colours, animations beyond what's required for accessibility / scroll-lock.

---

## 2. Field set

The form MUST consist of exactly these three fields, in this order:

| # | Field | Type | Required | autoComplete | inputMode | enterKeyHint |
|---|---|---|---|---|---|---|
| 1 | `name` | text | yes | `name` | `text` (default) | `next` |
| 2 | `email` | email | yes | `email` | `email` | `next` |
| 3 | `phone` | tel (international) | yes | `tel` | `tel` | `send` |

No optional / hidden / decorative fields. If the campaign needs additional context (company, role, etc.), capture it server-side after submission (enrichment), not in the form — every extra field measurably reduces conversion.

The submit control is a real `<button type="submit">` and appears immediately after the phone field. Below the submit, a single disclaimer line is rendered (legal copy from i18n).

---

## 3. Per-field rules

### 3.1. `name`

**Normalisation (on every keystroke, before storing in state):**

1. Strip any character that is not a Unicode letter or whitespace: `value.replace(/[^\p{L}\s]/gu, '')`
2. Collapse runs of whitespace to a single space: `.replace(/\s+/g, ' ')`
3. Leading space is preserved during typing (only collapsed if more than one), trailing space is trimmed only at validation time.

The user MUST NOT be able to type digits, punctuation, or symbols into the name field — they are silently dropped at the input boundary. This is intentional: silent dropping reads as "the field doesn't accept this" without nagging an error.

**Validation:**

- Empty (after trim) → "Required" error.
- Otherwise → must match `/^\p{L}+(?:\s+\p{L}+)*$/u` (one or more letter-only words separated by single spaces). If not, "Use letters only" error.

### 3.2. `email`

**Normalisation:** none. Value is stored as typed.

**Validation:**

- Empty (after trim) → "Required" error.
- Otherwise → must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` (lenient: at least one `@`, at least one `.` after the `@`, no whitespace). If not, "Invalid email" error.

**Trim policy:** trim both ends on submit, but display the raw value in the input. The trimmed value is what gets sent to the backend.

The validator is intentionally lenient (no MX check, no full RFC 5322). Strict validators reject ~3–5% of valid corporate / cyrillic-TLD emails. Server-side enrichment + double-opt-in verifies deliverability.

### 3.3. `phone`

**Component:** an international phone input that exposes country selector + masked national-number input. The reference implementation uses `react-international-phone` with `libphonenumber-js`. Any equivalent must provide:

- `defaultCountry` prop (ISO-2 lowercase)
- `preferredCountries` array (shown at the top of the country dropdown)
- `onChange(phone, meta)` callback that gives both the E.164-ish phone and the selected country ISO-2
- `setCountry(iso2, { focusOnInput })` imperative API
- A formatting mask resolver for placeholder generation
- `disableDialCodePrefill` so the input is empty until the user types digits (the prefix shows in placeholder only)

**Default country resolution (in order of priority):**

1. If the user has manually picked a country, use that. Manual selection is sticky for the rest of the session.
2. Otherwise, IP-geo detected country (see §3.3.1) once it resolves.
3. Otherwise, the project's fallback default (e.g. `ru` for an RU-focused landing).

**Preferred countries:** a project-level constant. Reference list: `['ru', 'kz', 'by', 'ua', 'de', 'gb', 'us']`. Reorder per project.

**Placeholder:** dynamic mask derived from the currently selected country. Format: `+<dialCode> <mask-with-zeros>`. Example for `ru`: `+7 (000) 000 00 00`. Falls back to the i18n `form.fields.phone` string if no mask is available.

**Normalisation:**

- The phone value is stored exactly as the input component emits it (already formatted).
- For backend submission, the value is sent as-is (the API / Sheet stores the formatted string).
- For external link parameters (e.g. Telegram deeplink), the phone is re-parsed via `libphonenumber-js`; if valid, the E.164 form without leading `+` is used; otherwise the digits-only string is used.

**Validation:**

- Empty, or only the dial-code digits with no subscriber digits → "Required" error.
  - "Subscriber digits" check: `digits.length > dialCode.length`.
- Otherwise → `isValidPhoneNumber(value)` (libphonenumber-js). If invalid → "Invalid phone number for selected country" error.

#### 3.3.1. IP-geo country detection

Best-effort, never blocks UX. Runs once per session on mount.

**Algorithm:**

1. Read cached country code from `localStorage` under a project-namespaced key (e.g. `<project>:geo-country:v1`). If present and younger than 24h, apply immediately.
2. Otherwise, fetch a lightweight geo endpoint (the reference impl uses `https://speed.cloudflare.com/meta`) with `AbortController` + 3 s timeout.
3. If the response includes a country code that maps to a country supported by the phone library, write it to cache and apply.

**Apply rules (do not override the user):**

- Apply ONLY if all of the following hold: the user has not interacted with the phone input yet, the form's phone value is empty, and the form's stored country is still the fallback default.
- When applied, call `phoneInputRef.current?.setCountry(iso2, { focusOnInput: false })` AND update form state. Never focus the field as a side effect.

**Failure modes:** network error / timeout / unsupported country → silently keep the fallback default. No error UI.

---

## 4. Validation timing & error display

The form has two validation modes — silent and live — switched by a single boolean flag (`submitAttempted`).

### 4.1. Silent mode (initial)

- User opens the form. `submitAttempted = false`.
- No errors are rendered, regardless of field state.
- Typing in any field does NOT show / clear errors for that field (because there are none to show).

### 4.2. On first submit

- User clicks submit. The form runs `validate(form)` on all fields at once.
- If any errors → set `submitAttempted = true`, populate errors map, render error messages under each invalid field. **Do not submit.**
- Each errored field MUST also fire an analytics "form error" event with the field name.
- If no errors → proceed to the submit lifecycle (§6).

### 4.3. Live mode (after first submit)

Once `submitAttempted = true`, validation switches to live:

- Every change to any field re-validates that field only.
- If the field becomes valid → its error is cleared immediately.
- If the field becomes invalid → its error message updates immediately.
- Other fields' errors remain untouched until they themselves change.

**Implementation note:** validation in change handlers MUST read a `useRef` mirror of `submitAttempted`, not the React state — programmatic resets (e.g. `phoneInput.setCountry` after a successful submit) trigger `onChange` synchronously while the state update is still pending, and reading the stale state value re-introduces phantom "required" errors during the post-success reset.

### 4.4. Submit-level errors

A separate `errors.submit` slot holds API / network errors. It is cleared by any subsequent input change in any field. It is rendered into the error modal (§8), not inline.

### 4.5. Error messages

All messages come from i18n. Reference keys (rename to fit your i18n layer, but keep the semantic split):

| Key | Trigger |
|---|---|
| `required` | Field empty after trim (or phone with only dial code) |
| `invalidName` | Name has non-letter content after normalisation |
| `invalidEmail` | Email doesn't match the regex |
| `invalidPhone` | Phone fails `isValidPhoneNumber` for the selected country |
| `submitError` | API responded non-2xx or fetch threw |
| `loadingAria` | `aria-label` for the submit button while pending |

Error messages MUST be displayed inline directly below the offending field. The field MUST receive `aria-invalid="true"` and `aria-describedby` pointing at the error element's `id`.

---

## 5. Form-lifecycle analytics events

The form fires a small fixed event vocabulary into the analytics layer (the project's `window.dataLayer` push helper). Event names are project-frozen contracts (see `MARKETING-STACK-SETUP.md` §9). What matters here is **when** each fires, not what it's called.

| Event | Fires when |
|---|---|
| `form_view` | The form's wrapper crosses 30% viewport visibility for the first time. **Once per page**, even if multiple form instances are mounted (e.g. hero + footer). Guarded by a module-level boolean. |
| `form_start` | The user produces the first input event on any field of any form instance. Once per form instance. |
| `form_error` | After a submit attempt, for **each** field that failed validation. Payload: `{ field: '<fieldName>' }`. |
| `form_submit` | The backend returns 2xx. Payload includes the user's `email` for funnel correlation. |
| `lead_submit` | Canonical lead event for downstream tag fan-out. Same moment as `form_submit`. Payload includes `lead_event_id` (UUID), `email`, `phone`, `content_name`, `value`, `currency`. **Do not gate marketing tags on `form_submit`.** Always use `lead_submit`. |

---

## 6. Submit lifecycle

```
User clicks submit
  │
  ├─ isPending? OR submitLockRef? ───► return (no-op)
  │
  ├─ submitAttempted = true (state + ref)
  ├─ validate(form)
  │   │
  │   ├─ has errors  ──► setErrors, fire form_error per field, return
  │   └─ no errors   ──► continue
  │
  ├─ setErrors({})
  ├─ setIsPending(true); submitLockRef.current = true
  ├─ leadId = crypto.randomUUID()
  ├─ build payload (form + UTM + tracking context, see MARKETING-STACK-SETUP §3)
  │
  ├─ POST payload to FORM_API_ENDPOINT
  │   │
  │   ├─ throws or response.ok === false
  │   │     ├─ fire form_error('submit')
  │   │     ├─ setErrorModalMessage(i18n.submitError)
  │   │     └─ (do NOT reset form, do NOT open success modal)
  │   │
  │   └─ response.ok === true
  │         ├─ fire form_submit({ email })
  │         ├─ fire lead_submit({ lead_event_id, email, phone, content_name, value, currency })
  │         ├─ build success CTA target (e.g. Telegram deeplink with phone token)
  │         ├─ submitAttemptedRef.current = false   ◄── BEFORE form reset
  │         ├─ hasPhoneInteractionRef.current = false
  │         ├─ setSubmitAttempted(false)
  │         ├─ setErrors({})
  │         ├─ setForm({ empty values, phoneCountry = geo-detected default })
  │         ├─ phoneInput.setCountry(default, { focusOnInput: false })
  │         └─ setIsSuccessModalOpen(true)
  │
  └─ finally: setIsPending(false); submitLockRef.current = false
```

### 6.1. Double-submit prevention

Two layers:

1. **`isPending` state** — toggles the `fieldset[disabled]` so all inputs and the submit button become unresponsive; the submit button shows the "sending" label and an `aria-busy="true"` attribute. This is the visible layer.
2. **`submitLockRef` (useRef)** — guards against a rapid double-click that fires before React commits the `isPending=true` state. Synchronous, beats React's render cycle. Cleared in `finally`.

Both are required. Skipping either leaves a race window.

### 6.2. Post-success reset ordering

The reset MUST clear `submitAttemptedRef.current` **before** touching the phone input's `setCountry`. The phone library's `setCountry` synchronously emits a phantom `onChange` with an empty value, and live validation reading the stale `submitAttemptedRef = true` would surface a "required" error during the reset. The reference order:

```
submitAttemptedRef.current = false        // synchronous gate, must be FIRST
hasPhoneInteractionRef.current = false
setSubmitAttempted(false)                 // React state, follows
setErrors({})
setForm(emptyValues)
phoneInput.setCountry(default, ...)       // safe now
setIsSuccessModalOpen(true)
```

### 6.3. Per-instance vs per-page state

- `form_view` deduplication is **per page** (module-level flag).
- `form_start`, `submitAttempted`, `submitLockRef`, `errors`, and form values are **per instance** (component state).

A page MAY mount multiple form instances (e.g. hero card + bottom section). They are fully independent submission-wise; only the analytics-view event is deduped.

---

## 7. Success modal

Opens after `setIsSuccessModalOpen(true)` in the submit lifecycle. Mutually exclusive with the error modal — they can never be both open at the same time (different state slots, but the submit lifecycle only opens one per attempt).

### 7.1. Structure

- Heading (i18n)
- Body / subheading (i18n; supports multi-line via `whitespace-pre-line`)
- Primary CTA — links to an external URL (e.g. Telegram bot, calendar invite, lead-magnet download). MUST open in a new tab: `target="_blank"`, `rel="noopener noreferrer"`.
- Close affordance (see §7.4 — variant-dependent)

The action target URL is built in the submit lifecycle, not in the modal — the modal receives a finished `actionHref` via prop. This keeps the modal pure / reusable.

### 7.2. Mounting

Rendered through `createPortal(node, document.body)`. **Required** because the form may sit inside an ancestor that creates a containing block via `transform`, `filter`, or `backdrop-filter` (the hero form card in the reference impl uses `backdrop-filter`). Without portaling, `position: fixed` scopes to that ancestor and the modal mispositions.

Wrap in `AnimatePresence` so unmount transitions complete before the DOM node is removed.

### 7.3. Body scroll lock

While the modal is mounted:

1. Read scrollbar width: `window.innerWidth - document.documentElement.clientWidth`.
2. Set `document.body.style.overflow = 'hidden'`.
3. If scrollbar width > 0, set `document.body.style.paddingRight = '<width>px'` to compensate for the disappearing scrollbar so the page layout doesn't visibly jump.
4. On unmount, restore both styles to their previous values (captured before the effect).

This MUST be done in a `useEffect` cleanup, not a window-level handler — it must survive React StrictMode double-invocation.

### 7.4. Close affordances

The reference impl supports two visual variants:

- **Default variant:** primary external CTA + a secondary "close" button below it (both full-width).
- **Speaker / hero variant:** primary external CTA + a top-right close icon (X). No secondary close button below.

Both variants additionally close on:

- **Escape key** — global `keydown` listener installed in a `useEffect` on the modal, removed on unmount.
- **Backdrop click** — the modal's outer `motion.div` has `onClick={onClose}`; the inner content `motion.div` calls `e.stopPropagation()` to prevent backdrop clicks from inside the card.

### 7.5. Accessibility

- Outer modal: `role="dialog"`, `aria-modal="true"`.
- Close icon button: `aria-label` from i18n (`close`).
- External link: descriptive label visible in DOM, no extra `aria-label` needed.
- Focus management: when the modal opens, the next focusable element after the dialog opens is the close affordance or the CTA. The reference impl does not explicitly trap focus — improve here if the project has stricter a11y requirements.

### 7.6. Animation

Backdrop: opacity 0 → 1 on enter, 1 → 0 on exit.
Card: `y: 20, opacity: 0` → `y: 0, opacity: 1` on enter, reverse on exit.
Easing: `cubic-bezier(0.16, 1, 0.3, 1)`, duration `0.2s`.

Reduce-motion preference is not currently honoured. If the project must respect `prefers-reduced-motion`, gate the `y` translation.

---

## 8. Error modal

Opens when `errorModalMessage` becomes non-empty (set by the submit lifecycle's catch branch). Closed by `setErrorModalMessage('')`.

### 8.1. Structure

- Heading (i18n, e.g. "Submission error")
- Body — the `errorModalMessage` string (typically the i18n `submitError` for generic 5xx / network errors; specific server-validation messages can be passed through if the API returns them)
- Single close button labelled "Try again" (i18n) — acts as the only dismiss control.

No external CTA. The user is expected to close, fix whatever they can (or wait), and resubmit.

### 8.2. Behaviour

Same as the success modal regarding:

- Portal to `document.body`
- Body scroll lock + scrollbar compensation
- Escape key closes
- Backdrop click closes
- `role="dialog"`, `aria-modal="true"`

Different from the success modal:

- No external CTA branch.
- No background image / video — uses the project's neutral surface token.
- The close button is the primary visual control (same style as the success-modal primary CTA in the default variant, so the user has a single obvious action).

### 8.3. Form-state preservation on error

When the error modal opens, the form fields are NOT cleared. The user's input is preserved verbatim so they can adjust and resubmit. Errors map is also preserved. Submit lock is released in the `finally` block so the form is interactive again.

---

## 9. Accessibility checklist

- All inputs have associated `id` and a visible / placeholder label.
- Error messages have `id={fieldId + '-error'}` and the input references them via `aria-describedby`.
- Invalid inputs carry `aria-invalid="true"`.
- The submit button carries `aria-busy={isPending}` and a context-aware `aria-label` (sending vs idle).
- Modals carry `role="dialog"` + `aria-modal="true"`.
- All interactive controls are real `<button>` or `<a>` (never `div onClick`).
- All controls have visible `:focus-visible` outlines. The reference impl uses `focus-visible:outline focus-visible:outline-2`. Do not strip outlines without a custom replacement.
- Keyboard navigation works: Tab cycles through name → email → country selector → phone → submit; Enter submits from any field (`enterKeyHint` set per-field for mobile keyboards).
- Escape closes any open modal.
- Body scroll is locked while a modal is open; scrollbar width is compensated so the page doesn't shift.

---

## 10. Anti-patterns (do not do this)

- **Showing errors before first submit.** Silent until the user signals intent to submit. Eager validation feels like nagging.
- **`outline: none` without a replacement.** Breaks keyboard accessibility. Use `focus-visible` styling.
- **Strict email regex.** Will reject valid corporate / cyrillic-TLD addresses. Use the lenient regex above.
- **Allowing the form to remain unlocked between click and `setIsPending(true)` commit.** This is the classic double-submit race. Use a synchronous ref alongside the state.
- **Resetting the form before clearing `submitAttemptedRef`.** Causes phantom "required" errors during the post-success reset due to the phone library's synchronous `onChange`.
- **Rendering modals without a portal.** Breaks `position: fixed` inside any ancestor with `transform` / `filter` / `backdrop-filter`.
- **Forgetting to compensate scrollbar width on body scroll lock.** Causes a visible horizontal layout jump on desktop when the modal opens.
- **Firing marketing tags on `form_submit`.** Use `lead_submit` — it carries the canonical `lead_event_id` for deduplication with the offline `QualifiedLead` postback.
- **Skipping `noopener noreferrer` on `target="_blank"` links.** Security + performance risk (the new tab can navigate the opener via `window.opener`).
- **Capturing extra form fields "just in case"** (company, role, title, etc.). Every additional field measurably reduces conversion. Capture richer context post-submit via enrichment.
- **Treating multiple form instances as fully independent for analytics.** `form_view` MUST be deduped at module level — otherwise hero + footer forms both fire `form_view` on the same page-load and inflate the funnel top.

---

## 11. Cross-references

- `MARKETING-STACK-SETUP.md` — data flow (AXEVIL `spreadsheet-form-writer` API, Google Sheet `enrichment` schema, GTM tags, offline postback Apps Script, ads-account integration).
- `src/pages/wb-sections/WBRegistrationForm.tsx` — illustrative reference implementation in the webinar project. Path is project-specific; in a new project the component lives wherever the registration form lives (often `src/components/RegistrationForm.tsx` or similar). This spec, not the file, is the source of truth.
- `src/lib/{tracking,useUtm,analytics}.ts` — supporting modules. Source of these modules is inlined in `MARKETING-STACK-SETUP.md` §2 — copy as-is into any new project; the path may differ.
