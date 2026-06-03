# Marketing stack setup — reusable instruction

Single source of truth for the AXEVIL marketing-site analytics + ads stack. Use this as a copy-paste blueprint for new landings: fill the placeholders in §1, follow §7 checklist, and the whole pipeline (form → Google Sheet → online ads / offline qualified-lead postback) works the same way on any site.

The webinar landing's concrete values live in the **Appendix A** at the bottom of this file.

---

## Table of contents

- §0. [Architecture](#0-architecture)
- §1. [Project-specific values to collect](#1-project-specific-values-to-collect)
- §2. [Reusable code modules](#2-reusable-code-modules-copy-as-is)
- §3. [Submit-handler template](#3-submit-handler-template)
- §4. [Google Sheet + offline postback](#4-google-sheet--offline-postback)
- §5. [GTM container](#5-gtm-container)
- §6. [Meta Custom Conversion `QualifiedLead`](#6-meta-custom-conversion-qualifiedlead)
- §7. [Per-site deployment checklist](#7-per-site-deployment-checklist)
- §8. [Verification](#8-verification)
- §9. [Frozen contracts (do not rename)](#9-frozen-contracts-do-not-rename)
- [Appendix A — webinar landing concrete values](#appendix-a--webinar-landing-concrete-values)
- [Change log](#change-log)

---

## 0. Architecture

```
┌────────────────────── BROWSER ─────────────────────────┐
│                                                        │
│   captureTrackingContextOnLoad()                       │
│     - reads gclid / gbraid / wbraid / fbclid from URL  │
│     - persists 90-day cookies                          │
│       (_ax_gclid, _ax_gbraid, _ax_wbraid, _fbc)        │
│                                                        │
│   <Form />                                             │
│     ├─ analytics.formView/Start/Error  → dataLayer     │
│     │                                                  │
│     └─ submit:                                         │
│         ├─ POST { data: {...} }                        │
│         │     ──► api.axevil.io/.../spreadsheet-form-writer/<endpoint>
│         │            (AXEVIL backend writes the row to the Google Sheet)
│         │                                              │
│         ├─ analytics.formSubmit                        │
│         └─ analytics.leadSubmit (canonical)            │
│             │                                          │
│             ▼                                          │
│         dataLayer { event: 'lead_submit', ... }        │
│                                                        │
└─────────────────┬──────────────────────────────────────┘
                  │
                  ▼
            GTM container (online tags)
                  │
       ┌──────────┼──────────┬─────────────┐
       ▼          ▼          ▼             ▼
   Meta Pixel   GA4       Google Ads   (LinkedIn / VK / TikTok / ...)
     Lead    generate_lead  conversion


ENRICHMENT (separate workflow inside the Sheet — out of scope of this doc):
   Sheet 'enrichment' tab
        │
        ▼
   `target` column is set to 'target' / 'review' / 'non-target'
   by a separate workflow (manual review, separate scoring script, etc.)


OFFLINE postback (Apps Script *inside the Sheet*, on an hourly trigger):
   `enrichment` tab, rows where target == 'target' || 'review'
        │
        ▼
   runTargetPostbacks()
        ├─► Meta CAPI            (event: QualifiedLead)
        └─► Google Ads API       (uploadClickConversions, gclid/gbraid/wbraid)
```

Three independent layers:

- **Form delivery (server-side):** the form's POST goes to AXEVIL's `spreadsheet-form-writer` API. That API writes the row to the Google Sheet. CORS, validation, retries, schema mapping are all AXEVIL backend's responsibility — the frontend treats the URL as opaque.
- **Online tags (GTM):** browser-side `Lead` (Meta) + Google Ads / GA4 conversions. Same moment as the form submit. High volume, no enrichment.
- **Offline postback (Apps Script in the Sheet):** runs on an hourly trigger inside the Google Sheet itself. Reads enriched rows, sends `QualifiedLead` (Meta CAPI) + offline conversion (Google Ads API). Lower volume, high quality. Has no connection to the site code or to the form delivery API.

The offline Apps Script is the **only** Apps Script in this stack. It does NOT receive form submissions — `spreadsheet-form-writer` does that.

---

## 1. Project-specific values to collect

Collect once per project, then substitute the `{{placeholders}}` everywhere in this doc / template files.

### 1.1. Frontend / GTM values

| Placeholder | What it is | Used in |
|---|---|---|
| `{{FORM_API_ENDPOINT}}` | Full URL of the AXEVIL `spreadsheet-form-writer` endpoint for this landing, e.g. `https://api.axevil.io/api/spreadsheet-form-writer/<endpoint-name>`. The `<endpoint-name>` is provisioned per landing on the AXEVIL backend — ask the platform team. | Form submit-handler (§3) |
| `{{GTM_CONTAINER_ID}}` | e.g. `GTM-XXXXXXX` | `index.html` (§2.5) |
| `{{META_PIXEL_ID}}` | e.g. `1276420891145739`. Also reused server-side by the offline postback (same value, no separate "dataset ID"). | GTM "Meta Pixel Base" tag (§5.3) + postback Script Properties (§4.4) |
| `{{GTM_GADS_CONVERSION_ID}}` | Online Google Ads conversion ID for GTM, e.g. `AW-987654321` (no slash, no label part). | GTM Google Ads Conversion tag (§5.3) |
| `{{GTM_GADS_CONVERSION_LABEL}}` | Online Google Ads conversion label, separate string, e.g. `AbC-D_efG-h12_34-56`. | GTM Google Ads Conversion tag (§5.3) |
| `{{GA4_MEASUREMENT_ID}}` *(optional)* | e.g. `G-XXXXXXXXXX` | GTM GA4 config tag (§5.3) |
| `{{FORM_ID}}` | e.g. `landing-webinar` | payload field `form_id` (§3) |
| `{{CAMPAIGN_NAME}}` | e.g. `webinar_04_06_2026` | payload field `campaign_name` (§3) |
| `{{PAGE_SLUG}}` | e.g. `webinar`, `pricing` | payload field `page` (§3) |
| `{{LEAD_CONTENT_NAME}}` | e.g. `Private Markets Webinar` | `analytics.leadSubmit` (§3) |
| `{{LEAD_VALUE}}` | **Numeric** (no quotes), e.g. `1`. Goes into `analytics.leadSubmit` typed as `number`. | `analytics.leadSubmit` (§3) |
| `{{LEAD_CURRENCY}}` | ISO 4217 code, e.g. `USD` | `analytics.leadSubmit` (§3) |
| `{{TELEGRAM_BOT_URL}}` *(optional)* | e.g. `https://t.me/...` | success-modal CTA |
| `{{TELEGRAM_START_PREFIX}}` *(optional)* | e.g. `mkt_webl_` | success-modal deeplink |

### 1.2. Postback (Apps Script Script Properties)

These live ONLY inside the Google Sheet's Apps Script editor (`Project Settings → Script Properties`). The frontend never sees them. The property names below match exactly what the production postback script (§4.3) reads.

| Property name | What it is |
|---|---|
| `META_PIXEL_ID` | Same value as `{{META_PIXEL_ID}}` above. Used in the CAPI endpoint path. |
| `META_ACCESS_TOKEN` | Meta system-user token with scope `ads_management`. |
| `META_TEST_EVENT_CODE` *(optional)* | Set ONLY while debugging (fills `test_event_code` in CAPI payload so events appear in Events Manager → Test Events). Remove for production. |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `GOOGLE_REFRESH_TOKEN` | OAuth2 creds for Google Ads API access. See §7 step 8 for how to obtain. |
| `GOOGLE_DEVELOPER_TOKEN` | From Google Ads API Center. |
| `GOOGLE_CUSTOMER_ID` | Google Ads account ID, **digits only, no dashes** (e.g. `1234567890`). |
| `GOOGLE_LOGIN_CUSTOMER_ID` | MCC account ID if calling under an MCC; otherwise equal to `GOOGLE_CUSTOMER_ID`. Digits only. |
| `GOOGLE_CONVERSION_ACTION_ID` | The **offline** `QualifiedLead` conversion action's numeric ID (digits only). The script composes the full resource name internally as `customers/<GOOGLE_CUSTOMER_ID>/conversionActions/<GOOGLE_CONVERSION_ACTION_ID>`. This is a different conversion action from the online one used in GTM (`{{GTM_GADS_CONVERSION_ID}}`). |

---

## 2. Reusable code modules (copy as-is)

Three modules + GTM snippet are identical across projects. Only `{{FORM_API_ENDPOINT}}` and `{{GTM_CONTAINER_ID}}` are substituted.

All three modules below are inlined verbatim. Copy each into its target path **as-is, without modifications**. Their internals are referenced by frozen contracts (§9) — renaming exports, changing event names, or altering cookie keys will silently break the stack.

### 2.1. `src/lib/tracking.ts`

What it does:

- Reads `gclid` / `gbraid` / `wbraid` / `fbclid` from URL on first visit (idempotent — never overwrites existing cookies).
- Writes 90-day cookies: `_ax_gclid`, `_ax_gbraid`, `_ax_wbraid` (project-namespaced), `_fbc` (Meta-standard format `fb.1.<ts>.<fbclid>`).
- `getTrackingContext()` collects everything needed for the form payload: cookies + URL + path + referrer + user agent + `_fbp` (set by Meta Pixel itself).

Target path: `src/lib/tracking.ts`

```typescript
type NullableString = string | null

const COOKIE_DAYS = 90
const GOOGLE_KEYS = ['gclid', 'gbraid', 'wbraid'] as const
type GoogleKey = (typeof GOOGLE_KEYS)[number]

const googleCookieName = (key: GoogleKey) => `_ax_${key}`

function getCookie(name: string): NullableString {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`)
  )
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return
  const exp = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Lax`
}

function readUrlParam(name: string): NullableString {
  if (typeof window === 'undefined') return null
  try {
    return new URLSearchParams(window.location.search).get(name)
  } catch {
    return null
  }
}

/**
 * Capture and persist click IDs on first visit.
 * Safe and idempotent: never overwrites existing cookies.
 */
export function captureTrackingContextOnLoad(): void {
  try {
    for (const key of GOOGLE_KEYS) {
      const value = readUrlParam(key)
      if (!value) continue
      if (getCookie(googleCookieName(key))) continue
      setCookie(googleCookieName(key), value, COOKIE_DAYS)
    }

    const fbclid = readUrlParam('fbclid')
    if (fbclid && !getCookie('_fbc')) {
      setCookie('_fbc', `fb.1.${Date.now()}.${fbclid}`, COOKIE_DAYS)
    }
  } catch (error) {
    console.warn('[tracking] captureTrackingContextOnLoad failed:', error)
  }
}

export interface TrackingContext {
  gclid: NullableString
  gbraid: NullableString
  wbraid: NullableString
  fbclid: NullableString
  fbc: NullableString
  fbp: NullableString
  page_url: NullableString
  page_path: NullableString
  referrer: NullableString
  user_agent: NullableString
}

export function getTrackingContext(): TrackingContext {
  const gclid = readUrlParam('gclid') ?? getCookie(googleCookieName('gclid'))
  const gbraid = readUrlParam('gbraid') ?? getCookie(googleCookieName('gbraid'))
  const wbraid = readUrlParam('wbraid') ?? getCookie(googleCookieName('wbraid'))
  const fbclid = readUrlParam('fbclid')

  return {
    gclid,
    gbraid,
    wbraid,
    fbclid,
    fbc: getCookie('_fbc'),
    fbp: getCookie('_fbp'),
    page_url: typeof window !== 'undefined' ? window.location.href : null,
    page_path: typeof window !== 'undefined' ? window.location.pathname : null,
    referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
  }
}
```

### 2.2. `src/lib/useUtm.ts`

Reads `utm_*` params from `window.location.search`. Empty string for any missing param (so the payload always has all five keys, simplifying the Sheet schema).

Target path: `src/lib/useUtm.ts`

```typescript
export interface UtmParams {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
}

export function getUtmParams(): UtmParams {
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source:   p.get('utm_source')   ?? '',
    utm_medium:   p.get('utm_medium')   ?? '',
    utm_campaign: p.get('utm_campaign') ?? '',
    utm_content:  p.get('utm_content')  ?? '',
    utm_term:     p.get('utm_term')     ?? '',
  }
}
```

### 2.3. `src/lib/analytics.ts`

Thin wrapper that pushes events to `window.dataLayer`. Five form events + scroll-depth helper. **Event names are frozen** — they are referenced by GTM triggers (§5.2).

Target path: `src/lib/analytics.ts`

```typescript
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

function push(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

export interface LeadSubmitParams {
  lead_event_id: string
  email: string
  phone: string
  content_name: string
  value: number
  currency: string
}

export const analytics = {
  scrollDepth: (pct: 25 | 50 | 75 | 100) => push(`scroll_${pct}`),
  formView:   () => push('form_view'),
  formStart:  () => push('form_start'),
  formSubmit: (params?: Record<string, unknown>) => push('form_submit', params),
  formError:  (field: string) => push('form_error', { field }),
  // Canonical lead event for GTM fan-out (Meta Lead, GA4 generate_lead, Google Ads, etc.).
  // Fires once per successful form submission (API responded 2xx).
  leadSubmit: (params: LeadSubmitParams) => push('lead_submit', { ...params }),
}

export function initScrollDepth() {
  if (typeof window === 'undefined') return
  const fired = new Set<number>()
  const thresholds = [25, 50, 75, 100] as const

  function onScroll() {
    const scrolled = window.scrollY + window.innerHeight
    const total = document.documentElement.scrollHeight
    const pct = Math.floor((scrolled / total) * 100)
    for (const t of thresholds) {
      if (!fired.has(t) && pct >= t) {
        fired.add(t)
        analytics.scrollDepth(t)
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}
```

Five form events: `form_view`, `form_start`, `form_error`, `form_submit`, **`lead_submit`** (canonical) + `scroll_25/50/75/100`. Timing of each is defined in `FORM-SPEC.md` §5.

### 2.4. Bootstrap call in `main.tsx`

Run **before** rendering React so click-IDs from `?gclid=...` get persisted on the very first paint:

```typescript
import { captureTrackingContextOnLoad } from './lib/tracking'

captureTrackingContextOnLoad()

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
```

### 2.5. GTM snippet in `index.html`

Inside `<head>`, immediately after meta tags:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','{{GTM_CONTAINER_ID}}');</script>
<!-- End Google Tag Manager -->
```

Inside `<body>`, immediately after the opening tag:

```html
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{GTM_CONTAINER_ID}}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

---

## 3. Submit-handler template

The function below is the canonical shape of the form submit. It collects the form fields + UTM + tracking context, fires the API call, then pushes the canonical `lead_submit` event. Copy and substitute placeholders.

```typescript
import { analytics } from '../lib/analytics'
import { getUtmParams } from '../lib/useUtm'
import { getTrackingContext } from '../lib/tracking'

const FORM_API_ENDPOINT = '{{FORM_API_ENDPOINT}}'

async function handleSubmit(form: FormData) {
  const leadId = crypto.randomUUID()
  const utm = getUtmParams()
  const tracking = getTrackingContext()

  const payload = {
    data: {
      id: leadId,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone,
      phone_country: form.phoneCountry,

      page: '{{PAGE_SLUG}}',
      ts: new Date().toISOString(),
      lead_event_id: leadId,
      form_id: '{{FORM_ID}}',
      lead_funnel: 'web',
      campaign_name: '{{CAMPAIGN_NAME}}',

      gclid: tracking.gclid,
      gbraid: tracking.gbraid,
      wbraid: tracking.wbraid,
      fbclid: tracking.fbclid,
      fbc: tracking.fbc,
      fbp: tracking.fbp,

      page_url: tracking.page_url,
      page_path: tracking.page_path,
      referrer: tracking.referrer,
      user_agent: tracking.user_agent,

      ...utm,
    },
  }

  const response = await fetch(FORM_API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`Submit failed: ${response.status}`)

  analytics.formSubmit({ email: form.email })
  analytics.leadSubmit({
    lead_event_id: leadId,
    email: form.email.trim(),
    phone: form.phone,
    content_name: '{{LEAD_CONTENT_NAME}}',
    value: {{LEAD_VALUE}},
    currency: '{{LEAD_CURRENCY}}',
  })
}
```

Notes on `{{LEAD_VALUE}}` substitution: the placeholder is replaced as a **bare numeric literal** (e.g. `1`, `1.0`), not a string. After substitution the code should read `value: 1,` not `value: '1',` — otherwise the typed `number` interface in `analytics.ts` will throw at runtime.

Invariants that must hold:

- `payload.data` is **flat** (no nested objects). AXEVIL's `spreadsheet-form-writer` writes the row plus stores the full JSON payload in the Sheet's `json_response` column (used downstream by the offline postback).
- `id == lead_event_id == leadId` — single UUID that ties the Sheet row, browser Meta `Lead`, and the Google Ads offline conversion (`orderId`) together. (The Meta `QualifiedLead` event, sent later by the offline postback, intentionally uses a fresh `event_id` — see §9.)
- `analytics.formView` is fired **once per page** via a module-level guard, even if multiple form instances mount (e.g. hero card + bottom section).
- Submit is locked via a ref to prevent double-click double-submit.

The reference implementation in this repo lives in `src/pages/wb-sections/WBRegistrationForm.tsx`. It is illustrative — the canonical behavioral spec for any new landing is `FORM-SPEC.md`. If `FORM-SPEC.md` and the reference file disagree, follow `FORM-SPEC.md`.

---

## 4. Google Sheet + offline postback

### 4.0. Two independent pieces

This section covers two things that often get confused:

1. **How form data reaches the Sheet** (§4.1) — handled by AXEVIL's `spreadsheet-form-writer` HTTP API, configured on the AXEVIL backend per landing. The frontend treats it as an opaque endpoint.
2. **How qualified leads reach the ad accounts** (§4.2–§4.5) — handled by an Apps Script that lives inside the Sheet itself and runs on a time-driven trigger. It has no link to the site at all.

The Apps Script here is **only** the offline postback runner. There is no Apps Script Web App receiving form submissions.

### 4.1. How the form reaches the Sheet (AXEVIL `spreadsheet-form-writer`)

The form submit handler (§3) POSTs `{ data: {...} }` to `{{FORM_API_ENDPOINT}}` — a URL of the form `https://api.axevil.io/api/spreadsheet-form-writer/<endpoint-name>`. AXEVIL's backend writes the row to the project's Google Sheet (column layout, retries, validation, CORS — all on the backend side).

For a new landing:

- Ask the AXEVIL platform team to provision a new `<endpoint-name>` mapped to the project's Google Sheet. Receive the full URL → this is `{{FORM_API_ENDPOINT}}`.
- The frontend code is unchanged from the §3 template — only the placeholder gets substituted.
- The Sheet column layout that AXEVIL writes is **the backend's responsibility**, not this doc's. What this doc cares about is only that the Sheet's `enrichment` tab has the columns described in §4.2 so the postback script can read them.

### 4.2. Sheet `enrichment` tab — schema required by the postback

The postback script (§4.3) reads from a tab literally named `enrichment`. It reads columns by **header name** (column position doesn't matter). The tab MUST contain these headers in row 1:

| Header | Filled by | Purpose |
|---|---|---|
| `target` | enrichment workflow (out of scope of this doc — see §4.6) | `'target'` / `'review'` / `'non-target'` / empty. The script processes rows where this is `'target'` or `'review'`. |
| `json_response` | AXEVIL `spreadsheet-form-writer` | The full form payload as a JSON string. The script parses this to recover every field (email, phone, gclid, fbc, user_agent, etc.). |
| `google_postback_status` | postback script | `'sent'` / `'error'` / `'skipped'` after each Google Ads attempt. |
| `meta_postback_status` | postback script | Same, for Meta CAPI. |
| `postback_sent_at` | postback script | Timestamp set once both Google and Meta postbacks are `'sent'`. |
| `postback_error` | postback script | Concatenated error messages from failed attempts, truncated to 500 chars. |

The `enrichment` tab may have additional columns (id, email, ts, raw form fields, etc.) — the postback script ignores them. The only column the script reads for lead data is `json_response`.

### 4.3. The postback script (production, copy verbatim)

`Extensions → Apps Script` inside the Google Sheet. Paste as a single `.gs` file. Do not modify — the values that differ per project live in `Script Properties` (§4.4), not in the code.

```javascript
/**
 * Axevil target postback runner for Google Sheets.
 * Reads rows from ENRICHMENT_SHEET_NAME where target == 'target',
 * sends conversions to Google Ads and Meta, and writes statuses back.
 */

const TARGET_POSTBACK_CONFIG = {
  ENRICHMENT_SHEET_NAME: 'enrichment',
  TARGET_COLUMN_NAME: 'target',
  JSON_COLUMN_NAME: 'json_response',
  GOOGLE_STATUS_COLUMN_NAME: 'google_postback_status',
  META_STATUS_COLUMN_NAME: 'meta_postback_status',
  POSTBACK_SENT_AT_COLUMN_NAME: 'postback_sent_at',
  POSTBACK_ERROR_COLUMN_NAME: 'postback_error',

  GOOGLE_CONVERSION_VALUE: 500.0,
  GOOGLE_CURRENCY_CODE: 'USD',
  META_EVENT_NAME: 'QualifiedLead',
  META_ACTION_SOURCE: 'website',
  GOOGLE_CLICK_ID_PRIORITY: ['gclid', 'gbraid', 'wbraid'],
};

function runTargetPostbacks() {
  const cfg = getConfig_();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TARGET_POSTBACK_CONFIG.ENRICHMENT_SHEET_NAME);
  if (!sheet) throw new Error('Sheet not found: ' + TARGET_POSTBACK_CONFIG.ENRICHMENT_SHEET_NAME);

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return;

  const headers = values[0].map(String);
  const idx = indexMap_(headers);
  const required = [
    TARGET_POSTBACK_CONFIG.TARGET_COLUMN_NAME,
    TARGET_POSTBACK_CONFIG.JSON_COLUMN_NAME,
    TARGET_POSTBACK_CONFIG.GOOGLE_STATUS_COLUMN_NAME,
    TARGET_POSTBACK_CONFIG.META_STATUS_COLUMN_NAME,
    TARGET_POSTBACK_CONFIG.POSTBACK_SENT_AT_COLUMN_NAME,
    TARGET_POSTBACK_CONFIG.POSTBACK_ERROR_COLUMN_NAME,
  ];
  required.forEach(name => {
    if (idx[name] == null) throw new Error('Missing column: ' + name);
  });

  for (let r = 1; r < values.length; r++) {
    const row = values[r];
    const target = normalize_(row[idx[TARGET_POSTBACK_CONFIG.TARGET_COLUMN_NAME]]);
    if (target !== 'target' && target !== 'review') continue;

    const googleStatus = normalize_(row[idx[TARGET_POSTBACK_CONFIG.GOOGLE_STATUS_COLUMN_NAME]]);
    const metaStatus = normalize_(row[idx[TARGET_POSTBACK_CONFIG.META_STATUS_COLUMN_NAME]]);
    if (googleStatus === 'sent' && metaStatus === 'sent') continue;

    const jsonRaw = row[idx[TARGET_POSTBACK_CONFIG.JSON_COLUMN_NAME]];
    const parsed = parseJsonSafe_(jsonRaw);
    if (!parsed.ok) {
      writeRowUpdates_(sheet, r + 1, idx, {
        [TARGET_POSTBACK_CONFIG.POSTBACK_ERROR_COLUMN_NAME]: truncate_('Invalid json_response: ' + parsed.error, 500),
        [TARGET_POSTBACK_CONFIG.GOOGLE_STATUS_COLUMN_NAME]: googleStatus || 'error',
        [TARGET_POSTBACK_CONFIG.META_STATUS_COLUMN_NAME]: metaStatus || 'error',
      });
      continue;
    }

    const lead = parsed.value.data || parsed.value;
    const tracking = extractTracking_(lead);
    const postbackTs = new Date();
    const errors = [];
    const updates = {};

    if (googleStatus !== 'sent') {
      const googleResult = sendGooglePostback_(tracking, lead, cfg, postbackTs);
      updates[TARGET_POSTBACK_CONFIG.GOOGLE_STATUS_COLUMN_NAME] = googleResult.status;
      if (googleResult.error) errors.push('Google: ' + googleResult.error);
    }

    if (metaStatus !== 'sent') {
      const metaResult = sendMetaPostback_(tracking, lead, cfg, postbackTs);
      updates[TARGET_POSTBACK_CONFIG.META_STATUS_COLUMN_NAME] = metaResult.status;
      if (metaResult.error) errors.push('Meta: ' + metaResult.error);
    }

    if ((updates[TARGET_POSTBACK_CONFIG.GOOGLE_STATUS_COLUMN_NAME] === 'sent' || googleStatus === 'sent') &&
        (updates[TARGET_POSTBACK_CONFIG.META_STATUS_COLUMN_NAME] === 'sent' || metaStatus === 'sent')) {
      updates[TARGET_POSTBACK_CONFIG.POSTBACK_SENT_AT_COLUMN_NAME] = postbackTs;
    }

    updates[TARGET_POSTBACK_CONFIG.POSTBACK_ERROR_COLUMN_NAME] = errors.join(' | ');
    writeRowUpdates_(sheet, r + 1, idx, updates);
  }
}

function sendGooglePostback_(tracking, lead, cfg, ts) {
  const clickId = pickGoogleClickId_(tracking);
  if (!clickId) return { status: 'skipped', error: 'No gclid/gbraid/wbraid found' };

  const token = getGoogleAccessToken_(cfg);
  const body = {
    conversions: [{
      conversionAction: 'customers/' + cfg.GOOGLE_CUSTOMER_ID + '/conversionActions/' + cfg.GOOGLE_CONVERSION_ACTION_ID,
      conversionDateTime: formatGoogleDateTime_(ts),
      consent: { adUserData: 'GRANTED', adPersonalization: 'GRANTED' }
    }],
    partialFailure: true
  };
  body.conversions[0][clickId.key] = clickId.value;
  if (lead.id) body.conversions[0].orderId = String(lead.id);

  const res = UrlFetchApp.fetch(
    'https://googleads.googleapis.com/v21/customers/' + cfg.GOOGLE_CUSTOMER_ID + ':uploadClickConversions',
    {
      method: 'post',
      contentType: 'application/json',
      muteHttpExceptions: true,
      headers: {
        Authorization: 'Bearer ' + token,
        'developer-token': cfg.GOOGLE_DEVELOPER_TOKEN,
        'login-customer-id': cfg.GOOGLE_LOGIN_CUSTOMER_ID,
      },
      payload: JSON.stringify(body),
    }
  );

  const text = res.getContentText();
  const code = res.getResponseCode();
  if (code < 200 || code >= 300) return { status: 'error', error: 'HTTP ' + code + ' ' + truncate_(text, 300) };

  const data = parseJsonSafe_(text);
  if (!data.ok) return { status: 'error', error: 'Bad JSON response from Google' };
  if (data.value.partialFailureError) return { status: 'error', error: truncate_(JSON.stringify(data.value.partialFailureError), 300) };
  return { status: 'sent' };
}

function sendMetaPostback_(tracking, lead, cfg, ts) {
  const eventId = Utilities.getUuid();
  const email = normalizeEmail_(lead.email);
  const phone = normalizePhone_(lead.phone);
  if (!tracking.fbc && !tracking.fbp && !email && !phone) {
    return { status: 'skipped', error: 'No fbc/fbp/email/phone for Meta match' };
  }

  const userData = {};
  if (tracking.fbc) userData.fbc = tracking.fbc;
  if (tracking.fbp) userData.fbp = tracking.fbp;
  if (email) userData.em = [sha256_(email)];
  if (phone) userData.ph = [sha256_(phone)];
  if (lead.name) userData.fn = [sha256_(String(lead.name).trim().toLowerCase().split(' ')[0])];
  if (lead.user_agent) userData.client_user_agent = lead.user_agent;

  const body = {
    data: [{
      event_name: TARGET_POSTBACK_CONFIG.META_EVENT_NAME,
      event_time: Math.floor(ts.getTime() / 1000),
      event_id: eventId,
      action_source: TARGET_POSTBACK_CONFIG.META_ACTION_SOURCE,
      event_source_url: lead.page_url || lead.url || undefined,
      user_data: userData,
      custom_data: {
        lead_status: 'target'
      }
    }]
  };
  if (cfg.META_TEST_EVENT_CODE) body.test_event_code = cfg.META_TEST_EVENT_CODE;

  const res = UrlFetchApp.fetch(
    'https://graph.facebook.com/v22.0/' + cfg.META_PIXEL_ID + '/events?access_token=' + encodeURIComponent(cfg.META_ACCESS_TOKEN),
    {
      method: 'post',
      contentType: 'application/json',
      muteHttpExceptions: true,
      payload: JSON.stringify(body),
    }
  );

  const text = res.getContentText();
  const code = res.getResponseCode();
  if (code < 200 || code >= 300) return { status: 'error', error: 'HTTP ' + code + ' ' + truncate_(text, 300) };

  const data = parseJsonSafe_(text);
  if (!data.ok) return { status: 'error', error: 'Bad JSON response from Meta' };
  if (data.value.error) return { status: 'error', error: truncate_(JSON.stringify(data.value.error), 300) };
  return { status: 'sent' };
}

function extractTracking_(lead) {
  const tracking = lead.tracking || {};
  return {
    gclid: firstNonEmpty_(tracking.gclid, lead.gclid),
    gbraid: firstNonEmpty_(tracking.gbraid, lead.gbraid),
    wbraid: firstNonEmpty_(tracking.wbraid, lead.wbraid),
    fbclid: firstNonEmpty_(tracking.fbclid, lead.fbclid),
    fbc: firstNonEmpty_(tracking.fbc, lead.fbc),
    fbp: firstNonEmpty_(tracking.fbp, lead.fbp),
  };
}

function pickGoogleClickId_(tracking) {
  for (var i = 0; i < TARGET_POSTBACK_CONFIG.GOOGLE_CLICK_ID_PRIORITY.length; i++) {
    var key = TARGET_POSTBACK_CONFIG.GOOGLE_CLICK_ID_PRIORITY[i];
    if (tracking[key]) return { key: key, value: tracking[key] };
  }
  return null;
}

function getGoogleAccessToken_(cfg) {
  const res = UrlFetchApp.fetch('https://oauth2.googleapis.com/token', {
    method: 'post',
    payload: {
      client_id: cfg.GOOGLE_CLIENT_ID,
      client_secret: cfg.GOOGLE_CLIENT_SECRET,
      refresh_token: cfg.GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    },
    muteHttpExceptions: true,
  });
  const text = res.getContentText();
  if (res.getResponseCode() < 200 || res.getResponseCode() >= 300) {
    throw new Error('Google token error: ' + truncate_(text, 300));
  }
  const data = JSON.parse(text);
  if (!data.access_token) throw new Error('No Google access_token in response');
  return data.access_token;
}

function getConfig_() {
  const p = PropertiesService.getScriptProperties();
  const cfg = {
    GOOGLE_CLIENT_ID: p.getProperty('GOOGLE_CLIENT_ID'),
    GOOGLE_CLIENT_SECRET: p.getProperty('GOOGLE_CLIENT_SECRET'),
    GOOGLE_REFRESH_TOKEN: p.getProperty('GOOGLE_REFRESH_TOKEN'),
    GOOGLE_DEVELOPER_TOKEN: p.getProperty('GOOGLE_DEVELOPER_TOKEN'),
    GOOGLE_LOGIN_CUSTOMER_ID: p.getProperty('GOOGLE_LOGIN_CUSTOMER_ID'),
    GOOGLE_CUSTOMER_ID: p.getProperty('GOOGLE_CUSTOMER_ID'),
    GOOGLE_CONVERSION_ACTION_ID: p.getProperty('GOOGLE_CONVERSION_ACTION_ID'),
    META_ACCESS_TOKEN: p.getProperty('META_ACCESS_TOKEN'),
    META_PIXEL_ID: p.getProperty('META_PIXEL_ID'),
    META_TEST_EVENT_CODE: p.getProperty('META_TEST_EVENT_CODE') || '',
  };
  Object.keys(cfg).forEach(function(key) {
    if (!cfg[key] && key !== 'META_TEST_EVENT_CODE') throw new Error('Missing Script Property: ' + key);
  });
  return cfg;
}

function indexMap_(headers) {
  const map = {};
  headers.forEach(function(h, i) { map[String(h).trim()] = i; });
  return map;
}

function writeRowUpdates_(sheet, rowNumber, idx, updates) {
  Object.keys(updates).forEach(function(name) {
    if (idx[name] == null) return;
    sheet.getRange(rowNumber, idx[name] + 1).setValue(updates[name]);
  });
}

function parseJsonSafe_(value) {
  try {
    if (value == null || value === '') return { ok: false, error: 'empty' };
    if (typeof value === 'object') return { ok: true, value: value };
    return { ok: true, value: JSON.parse(value) };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

function formatGoogleDateTime_(d) {
  const tz = Session.getScriptTimeZone() || 'Etc/UTC';
  const main = Utilities.formatDate(d, tz, 'yyyy-MM-dd HH:mm:ss');
  const off = Utilities.formatDate(d, tz, 'Z');
  return main + off.slice(0,3) + ':' + off.slice(3);
}

function normalize_(v) {
  return String(v == null ? '' : v).trim().toLowerCase();
}

function normalizeEmail_(v) {
  const s = String(v == null ? '' : v).trim().toLowerCase();
  return s || '';
}

function normalizePhone_(v) {
  const s = String(v == null ? '' : v).replace(/\D+/g, '');
  return s || '';
}

function sha256_(value) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8);
  return bytes.map(function(b) {
    const v = (b < 0 ? b + 256 : b).toString(16);
    return v.length === 1 ? '0' + v : v;
  }).join('');
}

function firstNonEmpty_() {
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] != null && String(arguments[i]).trim() !== '') return arguments[i];
  }
  return null;
}

function truncate_(s, maxLen) {
  s = String(s == null ? '' : s);
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}
```

### 4.4. Script Properties (secrets)

`Project Settings → Script Properties` in the Apps Script editor. The script throws on startup if any required property is missing.

```
GOOGLE_CLIENT_ID            = {{GOOGLE_CLIENT_ID}}
GOOGLE_CLIENT_SECRET        = {{GOOGLE_CLIENT_SECRET}}
GOOGLE_REFRESH_TOKEN        = {{GOOGLE_REFRESH_TOKEN}}
GOOGLE_DEVELOPER_TOKEN      = {{GOOGLE_DEVELOPER_TOKEN}}
GOOGLE_LOGIN_CUSTOMER_ID    = {{GOOGLE_LOGIN_CUSTOMER_ID}}
GOOGLE_CUSTOMER_ID          = {{GOOGLE_CUSTOMER_ID}}
GOOGLE_CONVERSION_ACTION_ID = {{GOOGLE_CONVERSION_ACTION_ID}}
META_ACCESS_TOKEN           = {{META_ACCESS_TOKEN}}
META_PIXEL_ID               = {{META_PIXEL_ID}}
META_TEST_EVENT_CODE        = (leave empty in production; set temporarily during §8.2 testing)
```

### 4.5. Triggers and behavior

Triggers in `Apps Script → Triggers`:

- **Primary:** `runTargetPostbacks` — *Time-driven* → *Hour timer* → *Every hour*.
- **Optional:** add an *On edit* trigger for `runTargetPostbacks` for near-real-time pickup when the `target` column changes. The hourly trigger is the source of truth — `onEdit` runs with a reduced permission scope and may not always be able to call external APIs depending on Apps Script's security model.

What it does, per row in the `enrichment` tab:

- Processes rows where `target == 'target'` or `target == 'review'` AND the corresponding postback status is not already `'sent'`.
- Parses `json_response` to recover the original form payload.
- **Google Ads** (`uploadClickConversions`, API `v21`):
  - Sends only if one of `gclid` / `gbraid` / `wbraid` is present in the payload. Otherwise: `skipped`.
  - Conversion action: `customers/{{GOOGLE_CUSTOMER_ID}}/conversionActions/{{GOOGLE_CONVERSION_ACTION_ID}}`.
  - Sends `consent: { adUserData: 'GRANTED', adPersonalization: 'GRANTED' }`.
  - Sets `orderId = lead.id` (same UUID as `lead_event_id` from the browser).
- **Meta CAPI** (`v22.0`):
  - Event: `QualifiedLead`, `action_source: 'website'`.
  - User data: hashed `em` / `ph` / `fn` (first token of name) + `fbc` / `fbp` / `client_user_agent` whenever the payload has them.
  - `event_id` is a fresh UUID per postback run — `QualifiedLead` is a different event from the browser `Lead` and intentionally does not dedup against it.
  - `custom_data: { lead_status: 'target' }` is hardcoded even for `review` rows (both grades flow to the same Custom Conversion, §6).
- Writes status / error / sent-at columns back to the row. Idempotent — subsequent runs skip rows where both `google_postback_status` and `meta_postback_status` are `'sent'`.

### 4.6. Enrichment (out of scope)

How the `target` column gets set to `target` / `review` / `non-target` is **not** part of this stack. It is per-project (manual review by the sales team, a separate scoring script, an external CRM sync, etc.). The only contract this stack relies on is: when a row's `target` is `'target'` or `'review'`, the postback fires.

---

## 5. GTM container

One container per landing. Same structure every time.

### 5.1. User-Defined Variables (Data Layer Variable type)

| Variable name | Data Layer Variable Name |
|---|---|
| `DLV - lead_event_id` | `lead_event_id` |
| `DLV - email` | `email` |
| `DLV - phone` | `phone` |
| `DLV - content_name` | `content_name` |
| `DLV - value` | `value` |
| `DLV - currency` | `currency` |

`Data Layer Version = Version 2`, `Default Value` empty.

### 5.2. Triggers

| Name | Type | Config |
|---|---|---|
| `All Pages` | Page View | default |
| `CE - lead_submit` | Custom Event | event name = `lead_submit`, fires on **All Custom Events** |

### 5.3. Tags

#### Tag 1 — Meta Pixel Base (PageView)

- **Type:** Custom HTML (or Facebook Pixel template from Community Gallery)
- **HTML:**
  ```html
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '{{META_PIXEL_ID}}');
    fbq('track', 'PageView');
  </script>
  ```
- **Trigger:** `All Pages`
- **Firing options:** Once per page

#### Tag 2 — Meta Pixel Lead

- **Type:** Custom HTML
- **HTML:**
  ```html
  <script>
    if (typeof fbq === 'function') {
      fbq('track', 'Lead', {
        content_name: {{DLV - content_name}},
        value: {{DLV - value}},
        currency: {{DLV - currency}}
      }, {
        eventID: {{DLV - lead_event_id}}
      });
    }
  </script>
  ```
- **Trigger:** `CE - lead_submit`
- **Firing options:** Once per event
- **Tag sequencing:** Setup Tag = `Meta Pixel Base` (fire only if base succeeds)

The `eventID` parameter is critical — it dedupes this browser-side `Lead` against the same event if it is ever re-sent via CAPI with the same `lead_event_id`.

#### Tag 3 — GA4 generate_lead *(optional)*

- **Type:** Google Analytics: GA4 Event
- **Configuration Tag:** your GA4 config tag (or set `{{GA4_MEASUREMENT_ID}}` inline)
- **Event Name:** `generate_lead`
- **Event Parameters:** `value = {{DLV - value}}`, `currency = {{DLV - currency}}`, `lead_event_id = {{DLV - lead_event_id}}`
- **Trigger:** `CE - lead_submit`

#### Tag 4 — Google Ads Conversion

- **Type:** Google Ads Conversion Tracking
- **Conversion ID:** `{{GTM_GADS_CONVERSION_ID}}`
- **Conversion Label:** `{{GTM_GADS_CONVERSION_LABEL}}`
- **Conversion Value:** `{{DLV - value}}`
- **Currency:** `{{DLV - currency}}`
- **Transaction ID:** `{{DLV - lead_event_id}}` (deduplicates with offline upload)
- **Trigger:** `CE - lead_submit`

### 5.4. Publish

Submit → Version name `v1 — initial setup` → **Publish**.

---

## 6. Meta Custom Conversion `QualifiedLead`

Created in **Events Manager → Custom Conversions**:

- **Source:** Pixel `{{META_PIXEL_ID}}`
- **Event:** `QualifiedLead` (custom)
- **Category:** Lead
- **Rule (optional):** `custom_data.lead_status` contains `target`

`QualifiedLead` is **not fired from the website** — it arrives via CAPI from the Apps Script postback (§4.3), after the enrichment service marks a lead as `target` in the Google Sheet.

Campaign optimization recommendation:

- **Week 1–2 (cold start):** optimize Meta campaigns on `Lead` (high volume, browser-side). Quick exit from learning phase.
- **Week 2+:** once `QualifiedLead` accumulates volume, switch optimization to `QualifiedLead` so the algorithm trains on target-quality leads only.
- Keep `Lead` as a secondary metric throughout.

In Google Ads the offline `QualifiedLead` is a separate Conversion Action with numeric ID `{{GOOGLE_CONVERSION_ACTION_ID}}` (the script composes the resource name as `customers/{{GOOGLE_CUSTOMER_ID}}/conversionActions/{{GOOGLE_CONVERSION_ACTION_ID}}`) and is uploaded via `uploadClickConversions`.

---

## 7. Per-site deployment checklist

1. **Google Sheet** — create the project's Sheet and the `enrichment` tab with the headers from §4.2 (`target`, `json_response`, `google_postback_status`, `meta_postback_status`, `postback_sent_at`, `postback_error`).
2. **AXEVIL `spreadsheet-form-writer` endpoint** — ask the AXEVIL platform team to provision a new `<endpoint-name>` mapped to this Sheet (so AXEVIL backend writes incoming form payloads, including a `json_response` column). Record the full URL → `{{FORM_API_ENDPOINT}}`.
3. **Postback Apps Script** (§4.3) — open `Extensions → Apps Script` inside the Sheet, paste the production script verbatim, fill `Script Properties` (§4.4) with all Meta / Google Ads secrets, attach the hourly `runTargetPostbacks` trigger (§4.5).
4. **GTM container** — create, record `{{GTM_CONTAINER_ID}}`, import the variables / triggers / tags from §5, publish.
5. **Meta Pixel** (`{{META_PIXEL_ID}}`) — create in Events Manager. Generate a system-user token with `ads_management` scope → `{{META_ACCESS_TOKEN}}`.
6. **Meta Custom Conversion** `QualifiedLead` (§6).
7. **Google Ads (online)** — create the web conversion action used by GTM. Record `{{GTM_GADS_CONVERSION_ID}}` + `{{GTM_GADS_CONVERSION_LABEL}}`.
8. **Google Ads (offline)** — create a separate conversion action `QualifiedLead` (Import → Offline). Record its numeric ID → `{{GOOGLE_CONVERSION_ACTION_ID}}` and the account's `{{GOOGLE_CUSTOMER_ID}}` / `{{GOOGLE_LOGIN_CUSTOMER_ID}}`.
9. **Google Ads API OAuth** — create OAuth2 client (Web type), authorize for `https://www.googleapis.com/auth/adwords`, exchange for a refresh token. Record `{{GOOGLE_CLIENT_ID}}` / `{{GOOGLE_CLIENT_SECRET}}` / `{{GOOGLE_REFRESH_TOKEN}}` + `{{GOOGLE_DEVELOPER_TOKEN}}` into Script Properties (§4.4).
10. **Code wiring in the project:**
    - Copy `src/lib/{tracking,useUtm,analytics}.ts` unchanged from §2.
    - Call `captureTrackingContextOnLoad()` in `main.tsx` before render (§2.4).
    - Add the GTM snippet (head + body) to `index.html` with `{{GTM_CONTAINER_ID}}` (§2.5).
    - Use the submit-handler from §3 with `{{FORM_API_ENDPOINT}}` substituted.
11. **Verification** (§8).

---

## 8. Verification

### 8.1. End-to-end smoke test (front → Sheet → online ads)

1. Open the landing with `?gclid=TEST_GCLID&utm_source=test&fbclid=TEST_FBCLID`.
2. Fill and submit the form.
3. Check:
   - **Network panel** — POST to `{{FORM_API_ENDPOINT}}` returned `2xx`.
   - **Google Sheet** — new row appeared. The `json_response` column contains the full submitted payload; flat columns (if AXEVIL backend writes them) contain `utm_*`, `gclid`, `fbclid`, `fbc`, `_fbp`, etc.
   - **GTM Preview** — `lead_submit` event fired → Meta Pixel Lead + Google Ads Conversion fired (+ GA4 if configured).
   - **Meta Events Manager → Test Events** — `Lead` (Browser) with `eventID` equal to the row's `id` / `lead_event_id`.
   - **Google Ads → Conversions** — primary online conversion +1 within an hour.

### 8.2. Offline postback test (Sheet → CAPI / Google Ads API)

1. Set `META_TEST_EVENT_CODE` in Script Properties (§4.4) to your current Events Manager test code.
2. In the `enrichment` tab manually set `target = target` on a recently-submitted test row. Make sure `json_response` is populated for that row.
3. In Apps Script → run `runTargetPostbacks` once manually.
4. Check:
   - `meta_postback_status` and `google_postback_status` change from empty to `sent` (or `skipped` if no click-ID).
   - `postback_sent_at` is filled.
   - **Meta Events Manager → Test Events** — `QualifiedLead` arrives. `custom_data.lead_status === 'target'`. `user_data` includes hashed `em`, `ph`, `fn` plus `fbc` / `fbp` / `client_user_agent`.
   - **Google Ads → Tools → Conversions → Upload diagnostics** — offline upload accepted (no errors). If `partialFailureError` is populated in the response, the script writes the error into `postback_error`.
5. Remove `META_TEST_EVENT_CODE` from Script Properties.

### 8.3. Production smoke test

After deploy:

1. Submit a real test form from a real browser (no GTM Preview).
2. Events Manager **Overview** — `Lead` event appears within 1–2 minutes.
3. Events Manager **Diagnostics** — no warnings about deprecated / duplicate / missing-eventID events.
4. After the next hourly run (or onEdit triggered run), if the row was enriched to `target` / `review`, confirm `QualifiedLead` appears in Events Manager and the offline conversion appears in Google Ads.

---

## 9. Frozen contracts (do not rename)

These names are referenced by GTM triggers, the postback Apps Script, Meta CAPI, and Google Ads. Changing any of them without updating every downstream consumer will silently break the stack.

- **dataLayer events:** `form_view`, `form_start`, `form_error`, `form_submit`, `lead_submit`, `scroll_25/50/75/100`
- **`lead_submit` payload keys:** `lead_event_id`, `email`, `phone`, `content_name`, `value` (numeric), `currency`
- **API payload keys (form → spreadsheet-form-writer):** `id`, `ts`, `name`, `email`, `phone`, `phone_country`, `page`, `form_id`, `campaign_name`, `lead_funnel`, `utm_source/medium/campaign/content/term`, `gclid`, `gbraid`, `wbraid`, `fbclid`, `fbc`, `fbp`, `page_url`, `page_path`, `referrer`, `user_agent`, `lead_event_id`
- **Sheet `enrichment` tab columns (read/written by the postback):** `target`, `json_response`, `google_postback_status`, `meta_postback_status`, `postback_sent_at`, `postback_error`
- **Postback `target` column values that trigger postback:** `'target'`, `'review'`
- **Postback `status` column values:** `'sent'`, `'error'`, `'skipped'`, or empty
- **Cookies:** `_ax_gclid`, `_ax_gbraid`, `_ax_wbraid`, `_fbc` (Meta standard), `_fbp` (Meta standard, set by Pixel itself)
- **Identity binding for the *online* layer:** `payload.data.id == payload.data.lead_event_id == Meta browser-side `eventID` == Google Ads `orderId` written by the offline postback`. The *offline* Meta `QualifiedLead` event intentionally uses a fresh per-postback `event_id` because `Lead` and `QualifiedLead` are different events — they must not be deduped against each other in Events Manager.

---

## Appendix A — webinar landing concrete values

| Placeholder | Webinar landing value |
|---|---|
| `{{GTM_CONTAINER_ID}}` | `GTM-K8LRWKPS` |
| `{{META_PIXEL_ID}}` | `1276420891145739` |
| `{{FORM_API_ENDPOINT}}` | `https://api.axevil.io/api/spreadsheet-form-writer/form-private-markets-webinar` |
| `{{FORM_ID}}` | `landing-webinar` |
| `{{CAMPAIGN_NAME}}` | `webinar_04_06_2026` |
| `{{PAGE_SLUG}}` | `webinar` |
| `{{LEAD_CONTENT_NAME}}` | `Private Markets Webinar` |
| `{{LEAD_VALUE}}` / `{{LEAD_CURRENCY}}` | `1` / `USD` |
| `{{TELEGRAM_BOT_URL}}` | `https://t.me/axevil_events_bot` |
| `{{TELEGRAM_START_PREFIX}}` | `mkt_webl_` |

Notes specific to this landing:

- `{{FORM_API_ENDPOINT}}` is an AXEVIL `spreadsheet-form-writer` endpoint — that's the canonical path for any AXEVIL landing. For other landings the `<endpoint-name>` segment changes; the rest of the URL is the same.
- Two form instances live on the page (hero card + bottom registration section). `form_view` is deduped via a module-level guard inside `WBRegistrationForm.tsx`.
- The success modal CTA deep-links to the Telegram bot with `?start={{TELEGRAM_START_PREFIX}}<E.164 phone digits>`, so the bot can pair the chat with the Sheet row by phone.

---

## Change log

| Date       | Author | Change                                                                  |
|------------|--------|-------------------------------------------------------------------------|
| 2026-05-18 | vladk  | Initial GTM setup: migrate Meta Pixel from hardcoded to GTM.            |
| 2026-06-03 | vladk  | Consolidate full marketing stack into reusable template (this file).    |
| 2026-06-03 | vladk  | Replace fictional Apps Script `doPost` path with real `spreadsheet-form-writer` flow; inline real production postback script verbatim; rename `GADS_*` placeholders to match the script's Script Properties; clarify online vs offline Google Ads conversion actions; clarify `Lead` vs `QualifiedLead` dedup; add §4.0 / §4.6 / §1.2. |
