export type Lang = "ru" | "en";

const STORAGE_KEY = "lang_manual_override";

const CIS_LANGS = ["ru", "uk", "be", "kk", "ky", "uz", "tg", "az", "hy", "ka", "mo"];

/**
 * Returns the primary (first) browser language code, e.g. "en", "ru", "uk".
 */
export function getPrimaryBrowserLang(): string {
  const langs = navigator.languages ?? [navigator.language];
  const first = langs[0] ?? "en";
  return first.split("-")[0].toLowerCase();
}

/**
 * Auto-detect language based on the user's PRIMARY browser language only.
 * CIS languages map to "ru", everything else to "en".
 */
export function detectAutoLang(): Lang {
  const primary = getPrimaryBrowserLang();
  return CIS_LANGS.includes(primary) ? "ru" : "en";
}

/**
 * Get manually stored language override (only set when user clicks the lang switcher).
 */
export function getManualOverride(): Lang | null {
  const val = localStorage.getItem(STORAGE_KEY);
  if (val === "ru" || val === "en") return val;
  return null;
}

/**
 * Save a manual language override.
 */
export function setManualOverride(lang: Lang): void {
  localStorage.setItem(STORAGE_KEY, lang);
}

/**
 * Resolve which language to show on the landing page.
 * Priority: manual override > auto-detect from primary browser language.
 */
export function resolveLandingLang(): Lang {
  return getManualOverride() ?? detectAutoLang();
}

/**
 * Returns whether the current language was manually chosen or auto-detected.
 */
export function getLanguageSource(): "manual" | "auto" {
  return getManualOverride() !== null ? "manual" : "auto";
}

/**
 * Returns the full browser languages list as a string for diagnostics.
 */
export function getBrowserLanguages(): string {
  return (navigator.languages ?? [navigator.language]).join(", ");
}
