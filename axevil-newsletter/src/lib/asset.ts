/**
 * Prefixes a `public/` asset path with the site's configured base URL.
 *
 * vite.config.ts sets `base: '/pdf/pre-ipo-insider/'` (site is physically nested at that
 * path) expecting every `/img/*` reference to get that prefix automatically — true for
 * what Vite can statically analyze (index.html, CSS `url()`), but NOT for a plain JS
 * string literal used as `<img src="/img/...">` in a .tsx file: Vite has no way to know
 * that string is an asset reference, so it ships unprefixed and 404s in both dev and
 * prod. Confirmed 2026-07-27 (client: photos missing across most sections) — every
 * hardcoded `/img/...` literal in src/ must go through this.
 */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
