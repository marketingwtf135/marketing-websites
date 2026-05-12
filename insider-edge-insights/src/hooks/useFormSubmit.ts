import { useState } from "react";
import { getPrimaryBrowserLang, getBrowserLanguages, getLanguageSource } from "@/lib/lang";
import { fireLinkedInConversion } from "@/lib/linkedin";
import { getFbc, getFbp, newEventId } from "@/lib/meta";
import { getAdTrackingContext } from "@/lib/ads";
import { supabase } from "@/integrations/supabase/client";

// LinkedIn Campaign Manager → Conversions → "Lead capture — Pre-IPO Insider Report"
const LINKEDIN_LEAD_CONVERSION_ID = 27556425;

const API_URL = "https://api.axevil.io/api/spreadsheet-form-writer/form-research-axevil";

interface FormData {
  name: string;
  email: string;
  phone: string;
  language?: string;
}

function getUtmParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    if (key.startsWith("utm_")) {
      utm[key] = value;
    }
  }
  return utm;
}

export function useFormSubmit() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");

  const submit = async (form: FormData): Promise<"success" | "error"> => {
    setStatus("pending");

    // Shared event_id for Pixel ↔ CAPI deduplication
    const eventId = newEventId();
    const fbc = getFbc();
    const fbp = getFbp();

    // Raw ad tracking identifiers — only include keys with actual values.
    const ads = getAdTrackingContext();
    const adFields = Object.fromEntries(
      Object.entries({
        gclid: ads.gclid,
        gbraid: ads.gbraid,
        wbraid: ads.wbraid,
        fbclid: ads.fbclid,
        fbc: ads.fbc,
        fbp: ads.fbp,
      }).filter(([, v]) => v != null && v !== "")
    );

    const payload = {
      data: {
        id: crypto.randomUUID(),
        event_id: eventId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        language: form.language || "",
        page_language: form.language || "",
        browser_primary_language: getPrimaryBrowserLang(),
        browser_languages: getBrowserLanguages(),
        language_source: getLanguageSource(),
        page_path: window.location.pathname,
        ...getUtmParams(),
        ...adFields,
        submitted_at: new Date().toISOString(),
      },
    };

    console.log("[form] payload:", payload);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => null);
      console.log("[form] response:", res.status, result);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      if (typeof window !== "undefined") {
        const win = window as any;

        if (typeof win.gtag === "function") {
          win.gtag("event", "form_submit", {
            event_category: "lead",
            event_label: "pre_ipo_report_request",
          });
        }

        if (typeof win.gtag_report_conversion === "function") {
          win.gtag_report_conversion();
        } else if (typeof win.gtag === "function") {
          win.gtag("event", "conversion", {
            send_to: "AW-16618753984/bd99CMrb3pYcEMCfuPQ9",
          });
        }
      }

      // Meta Pixel — Lead (no value/currency on free lead → better Match Quality)
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq(
          "track",
          "Lead",
          {
            content_name: "Pre-IPO Insider Report",
            content_category: "lead_generation",
          },
          { eventID: eventId }
        );
      }

      // Meta Conversions API — server-side, fire-and-forget
      supabase.functions
        .invoke("meta-capi", {
          body: {
            event_id: eventId,
            email: form.email,
            phone: form.phone,
            name: form.name,
            fbc,
            fbp,
            event_source_url: window.location.href,
            user_agent: navigator.userAgent,
          },
        })
        .then(({ data, error }) => {
          if (error) {
            console.warn("[meta-capi] invoke error:", error);
          } else {
            console.log("[meta-capi] ok:", data);
          }
        })
        .catch((err) => console.warn("[meta-capi] invoke threw:", err));

      // LinkedIn Insight Tag — Lead conversion
      if (LINKEDIN_LEAD_CONVERSION_ID > 0) {
        fireLinkedInConversion(LINKEDIN_LEAD_CONVERSION_ID);
      }

      setStatus("success");
      return "success";
    } catch (err) {
      console.error("[form] error:", err);
      setStatus("error");
      return "error";
    }
  };

  const reset = () => setStatus("idle");

  return { status, submit, reset };
}
