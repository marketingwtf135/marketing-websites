# GTM Setup — Webinar Landing

Container: **GTM-K8LRWKPS**
Meta Pixel: **1276420891145739**
Domain: webinar landing (`axevil-webinar`)

This document is the single source of truth for analytics/marketing setup on the webinar landing. Update it whenever you change anything in GTM or add a new pixel/tag.

---

## 1. Architecture

```
WBForm.tsx
    │
    ├── analytics.formView()    ───► dataLayer { event: 'form_view' }
    ├── analytics.formStart()   ───► dataLayer { event: 'form_start' }
    ├── analytics.formError()   ───► dataLayer { event: 'form_error', field }
    ├── analytics.formSubmit()  ───► dataLayer { event: 'form_submit', email }
    └── analytics.leadSubmit()  ───► dataLayer { event: 'lead_submit', lead_event_id, email, phone, content_name, value, currency }
                                              │
                                              ▼
                                           GTM (GTM-K8LRWKPS)
                                              │
                              ┌───────────────┼───────────────┬───────────────┐
                              ▼               ▼               ▼               ▼
                       Meta Pixel        GA4               Google Ads    (LinkedIn / TikTok /
                       Lead              generate_lead     conversion     VK / Yandex ...)

Offline (after enrichment):

    Google Sheets ──► Apps Script (postback) ──► Meta CAPI (QualifiedLead)
                                            └──► Google Ads API (uploadClickConversions)
```

**Two independent layers:**
1. **Online (GTM)** — fires from the browser while the user is on the site (PageView, Lead).
2. **Offline (Apps Script)** — fires from the server after enrichment marks a lead as `target` in Google Sheets (QualifiedLead). See the postback script in the marketing Google Sheet of this landing.

The two layers are connected only by the shared `lead_event_id` (used as Meta `eventID` for deduplication if the same event is ever sent from both sources — currently not the case, because `Lead` and `QualifiedLead` are different events).

---

## 2. dataLayer events (contract)

These events are pushed by the landing's code (`src/lib/analytics.ts`). **Do not change names or fields** without updating both this README and all GTM triggers.

| Event name        | When                                                 | Payload                                                                                       |
|-------------------|------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| `form_view`       | Form section enters viewport (≥30%)                  | —                                                                                             |
| `form_start`      | User types anything in the form (first interaction)  | —                                                                                             |
| `form_error`      | Validation error on submit                           | `field` (string)                                                                              |
| `form_submit`     | Form sent to backend AND backend responded 2xx       | `email`                                                                                       |
| **`lead_submit`** | Same moment as `form_submit` — canonical lead event  | `lead_event_id`, `email`, `phone`, `content_name`, `value`, `currency`                        |
| `scroll_25/50/75/100` | Scroll depth thresholds                          | —                                                                                             |

**Use `lead_submit` for all marketing/conversion tags.** `form_submit` is kept for internal funnel analysis (it has been around longer and may already be wired into GA4 dashboards).

---

## 3. GTM setup — step by step

### 3.1. Variables

Go to **Variables → User-Defined Variables → New** and create:

| Name                    | Type                  | Data Layer Variable Name |
|-------------------------|-----------------------|--------------------------|
| `DLV - lead_event_id`   | Data Layer Variable   | `lead_event_id`          |
| `DLV - email`           | Data Layer Variable   | `email`                  |
| `DLV - phone`           | Data Layer Variable   | `phone`                  |
| `DLV - content_name`    | Data Layer Variable   | `content_name`           |
| `DLV - value`           | Data Layer Variable   | `value`                  |
| `DLV - currency`        | Data Layer Variable   | `currency`               |

Leave **Data Layer Version = Version 2** and **Default Value** empty.

### 3.2. Triggers

| Trigger name              | Type           | Configuration                                                       |
|---------------------------|----------------|---------------------------------------------------------------------|
| `All Pages`               | Page View      | (default, no extra config)                                          |
| `CE - lead_submit`        | Custom Event   | Event name: `lead_submit` · This trigger fires on **All Custom Events** |

### 3.3. Tags

#### Tag 1 — Meta Pixel Base (PageView)

- **Tag Type:** Custom HTML (or "Facebook Pixel" template from Community Gallery)
- **HTML** (if Custom HTML):
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
    fbq('init', '1276420891145739');
    fbq('track', 'PageView');
  </script>
  ```
- **Trigger:** `All Pages`
- **Tag firing options:** Once per page

#### Tag 2 — Meta Pixel Lead

- **Tag Type:** Custom HTML (or "Facebook Pixel" template, Event = `Lead`)
- **HTML** (if Custom HTML):
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
- **Tag firing options:** Once per event
- **Tag sequencing:** Fire `Meta Pixel Base` first (Setup Tag) → only if it fires successfully

> The `eventID` parameter is critical — it deduplicates this browser-side `Lead` against the same event if it ever gets sent via Conversions API with the same `lead_event_id`.

#### (Optional) Tag 3 — GA4 generate_lead

If GA4 is in use:

- **Tag Type:** Google Analytics: GA4 Event
- **Configuration Tag:** your GA4 config tag (or set Measurement ID inline)
- **Event Name:** `generate_lead`
- **Event Parameters:** `value = {{DLV - value}}`, `currency = {{DLV - currency}}`, `lead_event_id = {{DLV - lead_event_id}}`
- **Trigger:** `CE - lead_submit`

#### (Optional) Tag 4 — Google Ads Conversion

- **Tag Type:** Google Ads Conversion Tracking
- **Conversion ID / Label:** from the Google Ads conversion action created for the webinar
- **Conversion Value:** `{{DLV - value}}`
- **Currency:** `{{DLV - currency}}`
- **Transaction ID:** `{{DLV - lead_event_id}}` (for deduplication with offline upload)
- **Trigger:** `CE - lead_submit`

### 3.4. Publish

Submit → Version name e.g. `v1 — initial Meta Pixel setup` → **Publish**.

---

## 4. Verification

### 4.1. GTM Preview Mode

1. In GTM workspace → **Preview** (top right)
2. Enter the landing URL → **Connect**
3. In the new tab — open the landing, scroll to the form, fill it, submit
4. In Tag Assistant tab, you should see:
   - Container Loaded → `Meta Pixel Base` fired
   - `form_view` event → no tags
   - `form_start` event → no tags
   - `form_submit` event → no tags (unless GA4 is wired)
   - **`lead_submit` event → `Meta Pixel Lead` fired** (+ GA4 / Google Ads if configured)

### 4.2. Meta Events Manager

1. Open pixel `1276420891145739` → **Test Events** tab
2. Enter the landing URL → open in the opened tab → submit form
3. You should see:
   - `PageView` (Browser) immediately
   - `Lead` (Browser) after form submit, with `eventID`, `content_name`, `value`, `currency`

### 4.3. Production smoke test

After deploy:
1. Open landing in real browser (no preview), submit a test form
2. Open Events Manager → **Overview** → events should appear within 1–2 minutes
3. Check **Diagnostics** tab — should be no warnings about deprecated/duplicate events

---

## 5. Custom Conversion `QualifiedLead`

Created in **Meta Events Manager → Custom Conversions**:

- **Source:** Pixel `1276420891145739`
- **Event:** `QualifiedLead` (custom event)
- **Category:** Lead
- **Rules:** (optional) `custom_data.lead_status` contains `target`

This event is **not fired from the website** — it comes via Conversions API from the Apps Script postback, after the enrichment service marks a lead as target in Google Sheets. See the postback script and its README in the webinar's Google Sheet (`enrichment` tab) for details.

---

## 6. Campaign optimization recommendations

- **Week 1–2 (cold start):** optimize Meta campaigns on `Lead` (high volume, browser-side). This gets the algorithm out of learning phase quickly.
- **Week 2+ (when `QualifiedLead` accumulates):** switch optimization to `QualifiedLead`. This trains the algorithm specifically on enriched, target-quality leads.
- Keep `Lead` as a secondary metric throughout.

---

## 7. Files / code references

- GTM container snippet: `axevil-webinar/index.html`
- dataLayer helpers: `axevil-webinar/src/lib/analytics.ts`
- Lead event firing: `axevil-webinar/src/pages/wb-sections/WBForm.tsx` (after successful API response)
- Tracking context capture (gclid/fbc/fbp on first visit): `axevil-webinar/src/lib/tracking.ts`

## 8. Change log

| Date       | Author | Change                                                    |
|------------|--------|-----------------------------------------------------------|
| 2026-05-18 | vladk  | Initial setup: migrate Meta Pixel from hardcoded to GTM   |
