const ADMIN_SESSION_COOKIE = "admin_session";
const ADMIN_SESSION_VALUE = "authenticated";

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};

  return cookieHeader.split(";").reduce<Record<string, string>>((acc, chunk) => {
    const [rawKey, ...rawValue] = chunk.trim().split("=");
    if (!rawKey) return acc;
    acc[rawKey] = decodeURIComponent(rawValue.join("="));
    return acc;
  }, {});
}

export function isAuthenticatedRequest(request: Request): boolean {
  const cookies = parseCookies(request.headers.get("cookie"));
  return cookies[ADMIN_SESSION_COOKIE] === ADMIN_SESSION_VALUE;
}

export function buildAdminSessionCookie() {
  const parts = [
    `${ADMIN_SESSION_COOKIE}=${ADMIN_SESSION_VALUE}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    "Max-Age=86400",
  ];

  if (isProduction()) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function clearAdminSessionCookie() {
  const parts = [`${ADMIN_SESSION_COOKIE}=`, "Path=/", "HttpOnly", "SameSite=Strict", "Max-Age=0"];

  if (isProduction()) {
    parts.push("Secure");
  }

  return parts.join("; ");
}

export function getAnalyticsDashboardPassword(): string | null {
  const ANALYTICS_DASHBOARD_PASSWORD = process.env.ANALYTICSDASHBOARDPASSWORD;
  if (!ANALYTICS_DASHBOARD_PASSWORD || ANALYTICS_DASHBOARD_PASSWORD.trim().length === 0) {
    console.error("Missing analytics dashboard env var");
    return null;
  }
  const value = ANALYTICS_DASHBOARD_PASSWORD;
  return value;
}
