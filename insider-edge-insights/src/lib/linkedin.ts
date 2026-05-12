/**
 * LinkedIn Insight Tag conversion helper.
 *
 * Fires a LinkedIn conversion event via window.lintrk if the tag is loaded.
 *
 * TODO: Once a cookie consent system is integrated (Cookiebot/Iubenda/etc.),
 * also gate this on the user's marketing-cookies consent state.
 *
 * Usage:
 *   import { fireLinkedInConversion } from "@/lib/linkedin";
 *   fireLinkedInConversion(12345678); // conversion_id from LinkedIn Campaign Manager
 *
 * Planned conversion points:
 *   - Lead capture: successful submit of "Get Pre-IPO Insider Report" form on /ru and /en
 *   - Pricing: click on "Subscribe" button (when pricing page exists)
 *   - Thank-you / payment confirmation page load
 */
export function fireLinkedInConversion(conversionId: number): void {
  if (typeof window === "undefined") return;

  // TODO: check marketing cookie consent here once consent banner is added.
  // e.g. if (!hasMarketingConsent()) return;

  const lintrk = (window as any).lintrk;
  if (typeof lintrk !== "function") {
    console.warn("[linkedin] lintrk not available — Insight Tag may be blocked or not loaded");
    return;
  }

  try {
    lintrk("track", { conversion_id: conversionId });
  } catch (err) {
    console.error("[linkedin] failed to fire conversion:", err);
  }
}
