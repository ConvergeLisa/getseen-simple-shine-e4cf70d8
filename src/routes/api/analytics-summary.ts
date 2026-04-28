import { createFileRoute } from "@tanstack/react-router";
import { analyticsMockData } from "@/data/analyticsMock";
import { isAuthenticatedRequest } from "@/lib/adminAuth.server";
import { getStoredEvents } from "@/lib/eventStore.server";

const ALLOWED_RANGES = ["7d", "30d", "90d", "all"] as const;
type AnalyticsRange = (typeof ALLOWED_RANGES)[number];

function normalizeRange(value: string | null): AnalyticsRange {
  if (value === "7d" || value === "30d" || value === "90d" || value === "all") {
    return value;
  }
  return "30d";
}

function cutoffForRange(range: AnalyticsRange, nowMs: number) {
  if (range === "all") return null;
  const days = range === "7d" ? 7 : range === "90d" ? 90 : 30;
  return nowMs - days * 24 * 60 * 60 * 1000;
}

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0s";
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (mins <= 0) return `${secs}s`;
  return `${mins}m ${secs.toString().padStart(2, "0")}s`;
}

export const Route = createFileRoute("/api/analytics-summary")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticatedRequest(request)) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const url = new URL(request.url);
        const range = normalizeRange(url.searchParams.get("range"));
        const nowMs = Date.now();
        const cutoffMs = cutoffForRange(range, nowMs);

        let events;
        try {
          events = await getStoredEvents(10000);
        } catch (error) {
          console.error("Failed to load analytics events:", error);
          return Response.json({ error: "Failed to load analytics summary" }, { status: 500 });
        }

        const filteredEvents = events.filter((event) => {
          if (cutoffMs == null) return true;
          const ts = Date.parse(event.timestamp);
          return !Number.isNaN(ts) && ts >= cutoffMs;
        });

        const conversionCounts = {
          whatsapp_click: 0,
          generate_lead: 0,
          form_submit: 0,
        };
        const sessions = new Map<string, { first: number; last: number; eventCount: number }>();
        const pageViewsByPage = new Map<string, number>();
        const sourceBySession = new Map<string, string>();
        const deviceBySession = new Map<string, string>();

        for (const event of filteredEvents) {
          const ts = Date.parse(event.timestamp);
          if (Number.isNaN(ts)) continue;

          const session = sessions.get(event.sessionId) ?? { first: ts, last: ts, eventCount: 0 };
          session.first = Math.min(session.first, ts);
          session.last = Math.max(session.last, ts);
          session.eventCount += 1;
          sessions.set(event.sessionId, session);

          if (event.event === "page_view") {
            pageViewsByPage.set(event.page, (pageViewsByPage.get(event.page) ?? 0) + 1);
          }
          if (event.event === "whatsapp_click") conversionCounts.whatsapp_click += 1;
          if (event.event === "generate_lead") conversionCounts.generate_lead += 1;
          if (event.event === "form_submit") conversionCounts.form_submit += 1;

          if (!sourceBySession.has(event.sessionId)) {
            sourceBySession.set(event.sessionId, event.source || "direct");
          }
          if (!deviceBySession.has(event.sessionId)) {
            deviceBySession.set(event.sessionId, event.deviceType || "unknown");
          }
        }

        const visitors = sessions.size;
        const pageViews = [...pageViewsByPage.values()].reduce((sum, count) => sum + count, 0);
        const totalSessionSeconds = [...sessions.values()].reduce(
          (sum, session) => sum + Math.max(0, (session.last - session.first) / 1000),
          0,
        );
        const avgSessionSeconds = visitors > 0 ? totalSessionSeconds / visitors : 0;
        const engagedSessions = [...sessions.values()].filter(
          (session) => session.eventCount >= 2,
        ).length;
        const engagementRate = visitors > 0 ? (engagedSessions / visitors) * 100 : 0;

        const sourceCounts = new Map<string, number>();
        for (const source of sourceBySession.values()) {
          sourceCounts.set(source, (sourceCounts.get(source) ?? 0) + 1);
        }
        const trafficSources = [...sourceCounts.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([source, count]) => ({
            source,
            sessions: count,
            percent: visitors > 0 ? Math.round((count / visitors) * 100) : 0,
          }));

        const topPages = [...pageViewsByPage.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(([page, views]) => ({
            path: page,
            title: page === "/" ? "Homepage" : page,
            avgTime: formatDuration(avgSessionSeconds),
            views,
          }));

        const deviceCounts = new Map<string, number>();
        for (const deviceType of deviceBySession.values()) {
          deviceCounts.set(deviceType, (deviceCounts.get(deviceType) ?? 0) + 1);
        }
        const deviceSplit = [...deviceCounts.entries()]
          .sort((a, b) => b[1] - a[1])
          .map(([deviceType, count]) => ({
            deviceType,
            sessions: count,
            percent: visitors > 0 ? Math.round((count / visitors) * 100) : 0,
          }));

        const data = {
          ...analyticsMockData,
          dateRangeLabel:
            range === "all"
              ? "All time (Supabase first-party tracking)"
              : `Last ${range.slice(0, -1)} days (Supabase first-party tracking)`,
          overview: analyticsMockData.overview.map((metric) => {
            if (metric.label === "Visitors") {
              return { ...metric, value: visitors.toLocaleString(), delta: "Live" };
            }
            if (metric.label === "Avg time on page") {
              return { ...metric, value: formatDuration(avgSessionSeconds), delta: "Live" };
            }
            if (metric.label === "Engagement rate") {
              return { ...metric, value: `${engagementRate.toFixed(1)}%`, delta: "Live" };
            }
            if (metric.label === "WhatsApp clicks") {
              return {
                ...metric,
                value: conversionCounts.whatsapp_click.toLocaleString(),
                delta: "Live",
              };
            }
            if (metric.label === "Form submissions") {
              return {
                ...metric,
                value: conversionCounts.form_submit.toLocaleString(),
                delta: "Live",
              };
            }
            return metric;
          }),
          trafficSources,
          topPages,
          deviceSplit,
          conversions: analyticsMockData.conversions.map((conversion) => ({
            ...conversion,
            count: conversionCounts[conversion.event],
            conversionRate:
              pageViews > 0
                ? `${((conversionCounts[conversion.event] / pageViews) * 100).toFixed(2)}%`
                : "0.00%",
          })),
        };

        return Response.json({
          ok: true,
          data,
        });
      },
    },
  },
});
