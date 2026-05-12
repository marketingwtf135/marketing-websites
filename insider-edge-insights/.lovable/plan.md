## Текущее состояние (что УЖЕ работает)

- `index.html`: gtag.js (AW-16618753984 + G-TSD84WP4H6), Meta Pixel base (986884120474910) + PageView, LinkedIn Insight Tag — все загружаются.
- `src/hooks/useFormSubmit.ts`: единый shared handler (используется и верхней, и нижней формой через `useLeadForm`). После `res.ok` стреляет:
  - `gtag('event', 'form_submit', ...)` + `gtag_report_conversion()` (Google Ads + GA4)
  - `fbq('track', 'Lead', { ... }, { eventID })` (Meta Pixel)
  - `supabase.functions.invoke('meta-capi', { event_id, email, phone, fbc, fbp, ... })` (Meta CAPI)
  - LinkedIn conversion
  - Один и тот же `eventId` (UUID) идёт в Pixel и CAPI → дедуп работает.
- `supabase/functions/meta-capi/index.ts`: хэширует email/phone (SHA-256, lowercase/digits-only), `event_time` в Unix seconds, `action_source: "website"`, `client_ip_address`, `client_user_agent`, fbc/fbp проброшены. Логи подтверждают `events_received: 1`, `fbtrace_id`, `test_mode: false`.
- `src/lib/meta.ts`: `captureFbclid()` создаёт `_fbc` cookie из `?fbclid=...`.
- Cookie/consent баннеров в проекте нет — удалять нечего.

Жалоба «Pixel не стреляет Lead» по коду не подтверждается — событие отправляется. Вероятно, проблема была временной (тест-режим из прошлой итерации, либо AdBlock у проверяющего). Тем не менее ниже — точечные доработки под твой бриф.

## Что меняем

### 1) `index.html` — добавить Google Consent Mode v2 (default granted)

Перед существующим `<script async src=".../gtag/js?id=AW-16618753984">` вставить блок с дефолтным consent. Существующая инициализация `dataLayer`/`gtag()`/`config` остаётся (порядок: consent default → gtag.js → `gtag('js'/'config')`).

```html
<!-- Google Consent Mode v2 — default granted (no banner) -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
    security_storage: 'granted',
    functionality_storage: 'granted',
    personalization_storage: 'granted'
  });
</script>
```

Существующий блок инициализации (`window.dataLayer = ...; function gtag(){...}; window.gtag = window.gtag || gtag; ...`) остаётся ниже — `gtag()` уже определён, повторное определение безвредно.

### 2) `src/hooks/useFormSubmit.ts` — уточнить Meta Lead payload

- Убрать `currency: "USD"` и `value: 0` с клиентского `fbq('track', 'Lead', ...)` — Meta снижает Match Quality для не-purchase событий с `value=0`.
- Добавить `content_category: "lead_generation"`.
- Передавать `name` в `meta-capi` body (для хэширования `fn` на сервере → Match Quality).

```ts
(window as any).fbq("track", "Lead", {
  content_name: "Pre-IPO Insider Report",
  content_category: "lead_generation",
}, { eventID: eventId });

supabase.functions.invoke("meta-capi", {
  body: {
    event_id: eventId,
    email: form.email,
    phone: form.phone,
    name: form.name,           // NEW
    fbc, fbp,
    event_source_url: window.location.href,
    user_agent: navigator.userAgent,
  },
});
```

### 3) `supabase/functions/meta-capi/index.ts` — `fn` hash + чистый custom_data

- Принять `name` из payload, нормализовать (`trim().toLowerCase()`), SHA-256 → `user_data.fn = [hash]`.
- В `custom_data` убрать `currency`/`value`, оставить `content_name` + `content_category: "lead_generation"`.
- Остальное (em/ph/fbc/fbp/IP/UA/event_time в seconds/event_id/retry-once) уже корректно — не трогаем.

## Чего НЕ делаем

- Не трогаем `src/integrations/supabase/client.ts`, `.env`, `supabase/config.toml`.
- Не меняем GA4/Ads ID, не меняем Pixel ID.
- Не включаем `test_event_code` (production режим).
- Не добавляем cookie banner.
- Не меняем `useLeadForm`/`FormModal`/UI форм — обе формы и так используют один handler.

## Verification

После деплоя в DevTools на `research.axevil.app/ru`:

1. Network: при загрузке страницы — `gtag/js?id=AW-16618753984` (200), `facebook.com/tr?...&ev=PageView` (200), `region1.google-analytics.com/g/collect?...tid=G-TSD84WP4H6` (200).
2. URL Google Ads запросов содержит `gcd=...n...n...n...` (n = granted) — подтверждает Consent Mode default granted.
3. Реальный submit формы → Network: `facebook.com/tr?...&ev=Lead&eid=<uuid>` (200), `googleads.g.doubleclick.net/.../viewthroughconversion/16618753984/` (200), POST в `meta-capi` edge function → `{"ok": true, "events_received": 1}`.
4. Edge function logs: `[meta-capi] sent { event_id: <тот же uuid>, ... }`.
5. Через 24–48 ч в Meta Events Manager Test Events: одна строка Lead «Browser + Server», Match Quality ≥ 7.0 (em+ph+fn+fbc+fbp+ip+ua).
