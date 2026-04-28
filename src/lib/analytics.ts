import type { TrackableEvent } from "@/lib/trackingEvents";

type GtagCommand = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: GtagCommand;
  }
}

export const GA_MEASUREMENT_ID = "G-05ED96HFYY";
const SESSION_ID_KEY = "getseen_session_id";
const SESSION_STARTED_KEY = "getseen_session_started";

export function trackEvent(eventName: string, eventLabel: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    event_category: "engagement",
    event_label: eventLabel,
    page_location: window.location.href,
  });
}

function getSessionId() {
  if (typeof window === "undefined") {
    return "";
  }

  const existing = window.sessionStorage.getItem(SESSION_ID_KEY);
  if (existing) return existing;

  const created =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.sessionStorage.setItem(SESSION_ID_KEY, created);
  return created;
}

function getDeviceType() {
  if (typeof window === "undefined") return "unknown";
  const ua = window.navigator.userAgent.toLowerCase();
  if (/tablet|ipad/.test(ua)) return "tablet";
  if (/mobi|android/.test(ua)) return "mobile";
  return "desktop";
}

function getSource() {
  if (typeof window === "undefined") return "direct";
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  if (utmSource) return utmSource.toLowerCase();

  const referrer = document.referrer;
  if (!referrer) return "direct";

  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (host.includes("google")) return "google";
    if (host.includes("facebook") || host.includes("instagram") || host.includes("linkedin")) {
      return "social";
    }
    return host.replace(/^www\./, "");
  } catch {
    return "direct";
  }
}

export function trackServerEvent(event: TrackableEvent, page?: string) {
  if (typeof window === "undefined") {
    return;
  }

  void fetch("/api/track/event", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    keepalive: true,
    body: JSON.stringify({
      event,
      page: page ?? window.location.pathname,
      session_id: getSessionId(),
      source: getSource(),
      device_type: getDeviceType(),
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
    }),
  });
}

export function initFirstPartyTracking() {
  if (typeof window === "undefined") {
    return;
  }

  const pathname = window.location.pathname;
  if (pathname.startsWith("/admin")) {
    return;
  }

  const hasStartedSession = window.sessionStorage.getItem(SESSION_STARTED_KEY) === "1";
  if (!hasStartedSession) {
    trackServerEvent("session_start", pathname);
    window.sessionStorage.setItem(SESSION_STARTED_KEY, "1");
  }

  trackServerEvent("page_view", pathname);
}
