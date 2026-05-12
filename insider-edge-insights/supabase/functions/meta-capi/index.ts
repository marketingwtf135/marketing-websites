// Meta Conversions API — Lead event forwarder.
// Receives a lead payload from the website, hashes PII, and posts to Meta.
// Deduplicates against the client-side Pixel via shared event_id.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PIXEL_ID = "986884120474910";
const GRAPH_URL = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`;

// Set to a TEST code (e.g. "TEST12345") to route events to Test Events tab.
// Leave empty for production traffic.
const TEST_EVENT_CODE = "";

interface LeadPayload {
  event_id: string;
  email?: string;
  phone?: string;
  name?: string;
  fbc?: string | null;
  fbp?: string | null;
  event_source_url?: string;
  user_agent?: string;
  test_event_code?: string;
}

async function sha256Hex(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function normalizeEmail(e: string): string {
  return e.trim().toLowerCase();
}

function normalizePhone(p: string): string {
  return p.replace(/\D/g, "");
}

function getClientIp(req: Request): string | null {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip");
}

async function postToMeta(body: unknown, accessToken: string) {
  const url = `${GRAPH_URL}?access_token=${encodeURIComponent(accessToken)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

function jitterDelayMs(): number {
  // Decorrelated jitter ~ 30s
  return 25_000 + Math.floor(Math.random() * 10_000);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const accessToken = Deno.env.get("META_CAPI_TOKEN");
  if (!accessToken) {
    console.error("[meta-capi] META_CAPI_TOKEN is not configured");
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: LeadPayload;
  try {
    payload = (await req.json()) as LeadPayload;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!payload.event_id || typeof payload.event_id !== "string") {
    return new Response(JSON.stringify({ error: "event_id required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const emHash = payload.email
    ? await sha256Hex(normalizeEmail(payload.email))
    : null;
  const phHash = payload.phone
    ? await sha256Hex(normalizePhone(payload.phone))
    : null;
  const fnHash = payload.name && payload.name.trim()
    ? await sha256Hex(payload.name.trim().toLowerCase())
    : null;

  const userData: Record<string, unknown> = {};
  if (emHash) userData.em = [emHash];
  if (phHash) userData.ph = [phHash];
  if (fnHash) userData.fn = [fnHash];
  if (payload.fbc) userData.fbc = payload.fbc;
  if (payload.fbp) userData.fbp = payload.fbp;
  const ip = getClientIp(req);
  if (ip) userData.client_ip_address = ip;
  const ua = payload.user_agent || req.headers.get("user-agent");
  if (ua) userData.client_user_agent = ua;

  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: payload.event_id,
    action_source: "website",
    event_source_url: payload.event_source_url || undefined,
    user_data: userData,
    custom_data: {
      content_name: "Pre-IPO Insider Report",
      content_category: "lead_generation",
    },
  };

  const body: Record<string, unknown> = { data: [event] };
  const testCode = payload.test_event_code || TEST_EVENT_CODE;
  if (testCode) body.test_event_code = testCode;

  const startedAt = new Date().toISOString();
  let result = await postToMeta(body, accessToken);

  // Retry once on transient error (code 2)
  const errCode = result.json?.error?.code;
  if (errCode === 2) {
    const wait = jitterDelayMs();
    console.warn(
      `[meta-capi] transient error (code 2), retrying in ${wait}ms`,
      { event_id: payload.event_id }
    );
    await new Promise((r) => setTimeout(r, wait));
    result = await postToMeta(body, accessToken);
  }

  const fbtraceId = result.json?.fbtrace_id;
  const eventsReceived = result.json?.events_received;
  const error = result.json?.error;

  if (error) {
    console.error("[meta-capi] Meta returned error", {
      timestamp: startedAt,
      event_id: payload.event_id,
      status: result.status,
      fbtrace_id: fbtraceId,
      error,
    });
    if (error.code === 190) {
      console.error(
        "[meta-capi] ALERT: META_CAPI_TOKEN is invalid (error 190). Rotate the token."
      );
    }
    return new Response(
      JSON.stringify({
        ok: false,
        status: result.status,
        fbtrace_id: fbtraceId,
        error,
      }),
      {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  console.log("[meta-capi] sent", {
    timestamp: startedAt,
    event_id: payload.event_id,
    status: result.status,
    fbtrace_id: fbtraceId,
    events_received: eventsReceived,
    test_mode: !!testCode,
  });

  return new Response(
    JSON.stringify({
      ok: true,
      status: result.status,
      fbtrace_id: fbtraceId,
      events_received: eventsReceived,
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
});
