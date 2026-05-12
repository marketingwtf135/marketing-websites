/**
 * Meta Pixel + Conversions API helpers.
 * - Captures fbclid → _fbc cookie on first visit
 * - Reads _fbc / _fbp cookies for CAPI forwarding
 * - Generates event IDs for Pixel/CAPI deduplication
 */

const FBCLID_COOKIE_DAYS = 90;

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  // host-only by default; production custom domain (axevil.app/.com) — let browser scope to it.
  // No explicit domain → cookie is host-only and works on whatever origin we're on.
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Lax`;
}

/**
 * On first visit with ?fbclid=..., create _fbc cookie in fb.1.<ts>.<fbclid> format.
 * Idempotent — if _fbc already exists, do nothing.
 * Call once on app start.
 */
export function captureFbclid(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get("fbclid");
    if (!fbclid) return;
    if (getCookie("_fbc")) return;
    const value = `fb.1.${Date.now()}.${fbclid}`;
    setCookie("_fbc", value, FBCLID_COOKIE_DAYS);
  } catch (e) {
    console.warn("[meta] captureFbclid failed:", e);
  }
}

export function getFbc(): string | null {
  return getCookie("_fbc");
}

export function getFbp(): string | null {
  return getCookie("_fbp");
}

export function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback (very old browsers)
  return "ev-" + Math.random().toString(36).slice(2) + "-" + Date.now();
}
