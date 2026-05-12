/**
 * Ad tracking identifiers — Google (gclid/gbraid/wbraid) + Meta (fbclid/fbc/fbp).
 * Values are captured and forwarded RAW, with no normalization.
 */

import { getFbc, getFbp } from "./meta";

const COOKIE_DAYS = 90;

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
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Lax`;
}

const GOOGLE_KEYS = ["gclid", "gbraid", "wbraid"] as const;
type GoogleKey = typeof GOOGLE_KEYS[number];
const cookieName = (k: GoogleKey) => `_lc_${k}`;

/**
 * On first visit with ?gclid / ?gbraid / ?wbraid, persist raw value in a host-only cookie.
 * Idempotent — never overwrites an existing cookie.
 */
export function captureGoogleClickIds(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    for (const k of GOOGLE_KEYS) {
      const v = params.get(k);
      if (!v) continue;
      if (getCookie(cookieName(k))) continue;
      setCookie(cookieName(k), v, COOKIE_DAYS);
    }
  } catch (e) {
    console.warn("[ads] captureGoogleClickIds failed:", e);
  }
}

export interface AdTrackingContext {
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbclid: string | null;
  fbc: string | null;
  fbp: string | null;
}

/**
 * Returns raw (non-normalized) ad identifiers. URL takes precedence over cookies for click IDs.
 * Any missing value is `null`.
 */
export function getAdTrackingContext(): AdTrackingContext {
  let urlGclid: string | null = null;
  let urlGbraid: string | null = null;
  let urlWbraid: string | null = null;
  let urlFbclid: string | null = null;

  if (typeof window !== "undefined") {
    try {
      const p = new URLSearchParams(window.location.search);
      urlGclid = p.get("gclid");
      urlGbraid = p.get("gbraid");
      urlWbraid = p.get("wbraid");
      urlFbclid = p.get("fbclid");
    } catch {
      // ignore
    }
  }

  return {
    gclid: urlGclid ?? getCookie(cookieName("gclid")),
    gbraid: urlGbraid ?? getCookie(cookieName("gbraid")),
    wbraid: urlWbraid ?? getCookie(cookieName("wbraid")),
    fbclid: urlFbclid,
    fbc: getFbc(),
    fbp: getFbp(),
  };
}
