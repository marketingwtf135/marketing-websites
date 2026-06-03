# Prompt templates

Ready-to-paste prompts for typical situations in the marketing-stack workflow. Copy a block, paste into Cursor chat, fill `<bracketed>` placeholders. The three instruction docs (`INTEGRATION-PLAYBOOK.md`, `FORM-SPEC.md`, `MARKETING-STACK-SETUP.md`) are assumed to be attached to the chat — these prompts do not repeat their contents, they reference them.

---

## Phase 1 — Kickoff

### 1.1. Full port (initial kickoff)

When: starting work on a new landing. Most common entry point.

```
Attached: INTEGRATION-PLAYBOOK.md, FORM-SPEC.md, MARKETING-STACK-SETUP.md, and index.html (the landing).

Port this landing into a Vite + React + TypeScript project per the attached playbook. Do not change any visible copy or layout. Follow the document precedence and the pre-flight protocol in INTEGRATION-PLAYBOOK.md §0. Stop and ask before scaffolding.
```

Optional additions (paste below the main block if relevant):

```
Locales: en + ru.
```
```
Locales: en only.
```
```
Multiple form instances expected (hero + footer).
```
```
Pre-decided: use Strategy A (re-shell as Vite + React).
```

### 1.2. Port with reference React file

When: the source includes a reference React component (e.g. the form is already in TSX), and you want the agent to consult it.

```
Attached: INTEGRATION-PLAYBOOK.md, FORM-SPEC.md, MARKETING-STACK-SETUP.md, the landing source, and a reference form component (<filename>).

The reference is illustrative only — FORM-SPEC.md is authoritative on every behavioural rule. Use the reference for visual layout and styling cues, but verify each behavioural detail against the spec. Same boundaries as §1.1: no visible copy / layout changes, stop and ask before scaffolding.
```

---

## Phase 2 — During the port

### 2.1. Resume after interruption

When: previous session was cut off; want to continue exactly where you left.

```
Continuing the port. Per INTEGRATION-PLAYBOOK.md §5, we last completed Step <N>. Resume from Step <N+1>. Do not redo earlier steps. If you need context for what was done, inspect the current repo state first — do not assume.
```

### 2.2. Switch migration strategy

When: you change your mind on strategy mid-port (e.g. A → D because the user reverted scope).

```
Change of plan: switching from Strategy <X> to Strategy <Y> per INTEGRATION-PLAYBOOK.md §4. Reason: <one-line reason>.

Revert the project state back to the point before <step / commit hash>. Re-implement only the delta between strategies. Do not touch: <list of areas to leave untouched, e.g. "/public assets, src/lib/* modules, tailwind.config.ts">.
```

### 2.3. Add a second form instance

When: source has hero card + footer form (or any other multi-instance pattern).

```
The landing has two form instances: <where instance 1 is, where instance 2 is>. Mount a second <Prefix>RegistrationForm in the <hero / other> block per FORM-SPEC.md §6.3 — the module-level formViewFired guard must dedupe the form_view event across both instances. Use submitVariant="<cta / plain>" for instance 1 and "<cta / plain>" for instance 2, matching the source design. Do not duplicate i18n strings.
```

### 2.4. Add a locale

When: extending a single-locale project to multi-locale.

```
Add the <locale code> locale to src/lib/lang.tsx. Mirror the existing locale's structure exactly. Translate all string leaves but do not change any keys, any existing locale, or any UI. Add a locale switcher only if the source landing has one — otherwise leave navigation untouched.
```

### 2.5. Update a placeholder mid-flight

When: a marketing value changes (e.g. campaign rename, new Pixel ID).

```
The {{<PLACEHOLDER_NAME>}} value has changed:
  old: <old value>
  new: <new value>

Find every occurrence across the codebase and docs/MARKETING-STACK-SETUP.md Appendix A. Show me the diff for each file before committing. Do not change anything else.
```

### 2.6. Re-port a single section

When: one section is wrong / needs to be reworked against the source.

```
Re-examine section <section name> against the source HTML. Current implementation diverges in: <list of specific issues>. Re-port to match the source verbatim — do not redesign, do not "improve". Show before/after for the affected component file. Other sections untouched.
```

### 2.7. Fix a single bug

When: a specific bug, not a re-port.

```
Bug: <one-line description>. Reproduction: <steps>. Expected: <expected>. Actual: <actual>.

Triage per the relevant spec section (FORM-SPEC.md §<...> if form-related, MARKETING-STACK-SETUP.md §<...> if data-flow). Propose the minimal fix. Do not refactor adjacent code.
```

---

## Phase 3 — Backend / GTM only (no frontend changes)

### 3.1. Configure GTM container

When: code is done; you need the GTM setup steps for `{{GTM_CONTAINER_ID}}`.

```
The frontend is complete and pushes lead_submit to dataLayer per FORM-SPEC.md §5. Walk me through configuring GTM container {{GTM_CONTAINER_ID}} per MARKETING-STACK-SETUP.md §5. Output the exact Variables / Triggers / Tags configurations to enter in the GTM UI. Include the Custom HTML snippets verbatim with placeholders filled. Do not touch any code.
```

### 3.2. Request a `spreadsheet-form-writer` endpoint

When: a new Google Sheet exists; you need the form delivery URL.

```
The project Google Sheet exists. I need {{FORM_API_ENDPOINT}} — an AXEVIL spreadsheet-form-writer URL mapped to this Sheet. Per MARKETING-STACK-SETUP.md §4.1: this endpoint is provisioned on the AXEVIL backend by the platform team, not in code. Output: (1) the exact request I should send to the platform team (Sheet ID, suggested <endpoint-name>, expected JSON payload shape from §3 of MARKETING-STACK-SETUP.md so they can verify mapping), and (2) the contract the endpoint must satisfy (CORS allowing the production domain, accepts POST application/json, writes the row plus a json_response column). Do not generate any Apps Script doPost — that path does not exist in this stack.
```

### 3.3. Set up the offline postback Apps Script

When: the Sheet has its `enrichment` tab with the required columns; you need the ad-account postback running.

```
The Sheet's `enrichment` tab exists with the headers from MARKETING-STACK-SETUP.md §4.2. Now install the offline postback per §4.3: paste the production Apps Script verbatim into `Extensions → Apps Script`, fill Script Properties per §4.4 (values are in Tier 3 of INTEGRATION-PLAYBOOK.md §2.2 — request from me anything I haven't given), attach the hourly `runTargetPostbacks` trigger per §4.5. Output the exact list of Script Property names + values, the trigger configuration, and how I should verify (§8.2). Do not modify the script body — values that vary per project live in Script Properties.
```

### 3.4. Google Ads OAuth walkthrough

When: stuck on obtaining the refresh token for the postback.

```
I need to obtain {{GOOGLE_REFRESH_TOKEN}} for the offline postback (MARKETING-STACK-SETUP.md §4.3). Walk me through, step by step:
  1. Creating an OAuth2 Web client in Google Cloud Console (scope: https://www.googleapis.com/auth/adwords)
  2. Exchanging an authorization code for a refresh token
  3. Verifying the token can call googleads.googleapis.com/v21/customers/{{GOOGLE_CUSTOMER_ID}}:uploadClickConversions
Output commands / URLs I can paste, not theory. Do not write any code until I confirm the refresh token in hand.
```

### 3.5. Add a new ad platform tag to existing GTM

When: extending the stack with LinkedIn / VK / TikTok / Yandex.Metrica conversion tracking.

```
Add a <platform name> conversion tag to the existing GTM container, alongside the Meta Pixel / Google Ads tags from MARKETING-STACK-SETUP.md §5.3. The new tag must:
  - fire on the existing CE - lead_submit trigger
  - reuse the existing DLV variables ({{DLV - lead_event_id}}, {{DLV - value}}, {{DLV - currency}}, etc.) — do not create new DLVs unless required by the platform
  - pass lead_event_id as the platform's deduplication ID
Output the GTM tag configuration (type, fields, code). Do not change existing tags.
```

---

## Phase 4 — Verification & post-deploy

### 4.1. Run verification only

When: nothing should change; just run the checks.

```
Run the verification protocol — MARKETING-STACK-SETUP.md §8 (smoke + offline CAPI tests) and FORM-SPEC.md §9 (accessibility checklist). Report which checks pass, which fail, and which require manual UI clicks I'll need to do myself. Do not modify any files.
```

### 4.2. Production smoke triage

When: something is broken in production after deploy.

```
Production issue: <one-line symptom>. Repro: <how to reproduce>.

Triage per MARKETING-STACK-SETUP.md §8.3. Walk the data flow layer by layer: browser dataLayer → GTM tags → Meta Events Manager → Google Ads online conversions → AXEVIL spreadsheet-form-writer → Google Sheet `enrichment` tab → offline postback Apps Script → Meta CAPI `QualifiedLead` + Google Ads offline conversion. Identify which layer first shows the failure. Propose the minimal targeted fix. Do not refactor.
```

### 4.3. Diff against the source landing

When: someone changed the deployed site; you want to know what diverged from the original source HTML.

```
Compare the current deployed implementation against the original source HTML in <path>. Report:
  - Visible text differences (any)
  - Layout / class-name differences (any)
  - Form / modal behavior differences (any — but expected per FORM-SPEC.md)
Flag any non-form-related divergence as a regression for review.
```

---

## Phase 5 — Doc maintenance

### 5.1. Update one of the three docs

When: rare — a frozen contract changes intentionally, or a new section needs to be added.

```
Update <docs/<filename>>: <specific change>.

Then audit the other two instruction docs for every reference to the changed item — each must be updated consistently. Frozen contracts (MARKETING-STACK-SETUP.md §9, FORM-SPEC.md §10) are off-limits unless I explicitly approve in this same message. Show me the full diff before committing.
```

### 5.2. Audit placeholder consistency

When: you suspect a value drifted between files.

```
Audit the entire repo (code + docs/) for {{<PLACEHOLDER_NAME>}}. List every occurrence with file path and current value. Flag any inconsistencies. Do not edit — diagnose only.
```

### 5.3. Sync docs Appendix A with new project values

When: porting to a new landing and you want the new project's Appendix A to reflect its own concrete values.

```
This project's concrete values:
  GTM_CONTAINER_ID = <value>
  META_PIXEL_ID    = <value>
  FORM_API_ENDPOINT = <value>
  ...
  (full list from MARKETING-STACK-SETUP.md §1)

Rewrite the Appendix A of this project's docs/MARKETING-STACK-SETUP.md with these values. Leave §1 (the placeholder list itself) and all other sections untouched.
```

---

## How to extend this file

Add a new template when:

- You catch yourself rewriting the same prompt twice
- A prompt's exact wording was needed to get the agent to behave correctly
- A workflow phase you regularly hit isn't covered

Keep each template:

- **Short** — a 2–5 line prompt beats a paragraph
- **Self-contained** — reference docs by section, don't repeat their content
- **Boundary-explicit** — say what NOT to touch as much as what to do
