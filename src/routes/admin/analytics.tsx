import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analyticsMockData, type AnalyticsDashboardData } from "@/data/analyticsMock";

const RANGE_OPTIONS = ["7d", "30d", "90d", "all"] as const;
type AnalyticsRange = (typeof RANGE_OPTIONS)[number];

export const Route = createFileRoute("/admin/analytics")({
  component: AnalyticsDashboardPage,
  head: () => ({
    meta: [
      { title: "GetSeen Admin Analytics (Private)" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function AnalyticsDashboardPage() {
  const [password, setPassword] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [activeRange, setActiveRange] = useState<AnalyticsRange>("30d");
  const [error, setError] = useState("");
  const [dashboardData, setDashboardData] = useState<AnalyticsDashboardData>(analyticsMockData);

  const data = useMemo(() => dashboardData, [dashboardData]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/me", {
          method: "GET",
          credentials: "same-origin",
        });

        if (!response.ok) {
          setAuthenticated(false);
          return;
        }

        const payload = (await response.json()) as { authenticated?: boolean };
        setAuthenticated(Boolean(payload.authenticated));
      } catch {
        setAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    void checkAuth();
  }, []);

  const onUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Invalid password.");
          return;
        }

        setError("Unable to authenticate right now.");
        return;
      }

      setAuthenticated(true);
    } catch {
      setError("Unable to authenticate right now.");
    } finally {
      setSubmitting(false);
    }
  };

  const onSignOut = async () => {
    setSigningOut(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      setAuthenticated(false);
      setPassword("");
      setError("");
      setSigningOut(false);
    }
  };

  useEffect(() => {
    const loadDashboardSummary = async () => {
      if (!authenticated) {
        return;
      }

      try {
        const response = await fetch(`/api/analytics-summary?range=${activeRange}`, {
          method: "GET",
          credentials: "same-origin",
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { data?: AnalyticsDashboardData };
        if (payload.data) {
          setDashboardData(payload.data);
        }
      } catch {
        // keep mock data when summary fetch fails
      }
    };

    void loadDashboardSummary();
  }, [activeRange, authenticated]);

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-14 sm:px-8">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-soft backdrop-blur">
          <p className="text-sm text-slate-300">Checking admin session...</p>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-14 sm:px-8">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-soft backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Private</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white">Analytics dashboard</h1>
          <p className="mt-3 text-sm text-slate-300">
            Enter the admin password to view internal performance metrics.
          </p>
          <form onSubmit={onUnlock} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="analytics-password" className="text-sm font-medium text-slate-200">
                Password
              </label>
              <Input
                id="analytics-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-white/20 bg-slate-900/60 text-white"
                autoComplete="current-password"
              />
            </div>
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <Button type="submit" variant="hero" className="w-full" disabled={submitting}>
              {submitting ? "Signing in..." : "Open dashboard"}
            </Button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 sm:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <header className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-soft backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                GetSeen insights
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                Private analytics
              </h1>
              <p className="mt-2 text-sm text-slate-300">{data.dateRangeLabel}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {RANGE_OPTIONS.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setActiveRange(range)}
                    className={
                      activeRange === range
                        ? "rounded-full border border-cyan-300/50 bg-cyan-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100"
                        : "rounded-full border border-white/15 bg-slate-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-300 hover:border-white/30 hover:text-white"
                    }
                  >
                    {range === "all" ? "All time" : range}
                  </button>
                ))}
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onSignOut}
              disabled={signingOut}
              className="border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
            >
              {signingOut ? "Signing out..." : "Sign out"}
            </Button>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {data.overview.map((metric) => (
            <article
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-soft backdrop-blur"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-wide text-slate-400">{metric.label}</p>
                <MetricDataBadge label={metric.label} />
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">{metric.value}</p>
              <p className="mt-1 text-sm text-emerald-300">{metric.delta}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Traffic sources</h2>
            <p className="mt-1 text-xs text-slate-400">Live Supabase first-party tracking data.</p>
            <div className="mt-4 space-y-4">
              {data.trafficSources.map((source) => (
                <div key={source.source}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-200">{source.source}</span>
                    <span className="text-slate-300">
                      {source.percent}% ({source.sessions.toLocaleString()})
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                      style={{ width: `${source.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Engagement</h2>
            <p className="mt-1 text-xs text-slate-400">Live Supabase first-party tracking data.</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[20rem] text-left text-sm">
                <thead className="text-slate-400">
                  <tr>
                    <th className="pb-2 font-medium">Top pages</th>
                    <th className="pb-2 font-medium">Views</th>
                    <th className="pb-2 font-medium">Time per page</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topPages.map((page) => (
                    <tr key={page.path} className="border-t border-white/10 text-slate-200">
                      <td className="py-3">
                        <p className="font-medium text-white">{page.title}</p>
                        <p className="text-xs text-slate-400">{page.path}</p>
                      </td>
                      <td className="py-3">{page.views.toLocaleString()}</td>
                      <td className="py-3">{page.avgTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Conversions</h2>
            <div className="mt-4 space-y-3">
              {data.conversions.map((conversion) => (
                <div
                  key={conversion.event}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3"
                >
                  <span className="font-mono text-sm text-cyan-300">{conversion.event}</span>
                  <span className="rounded-full border border-emerald-300/40 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200">
                    Real
                  </span>
                  <div className="text-right">
                    <p className="font-semibold text-white">{conversion.count.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">{conversion.conversionRate} rate</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Clarity summary</h2>
            <p className="mt-1 text-xs text-slate-400">
              External tool until Clarity API is connected.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <ClarityCard
                label="Session recordings"
                value={data.clarity.sessionRecordings.toLocaleString()}
              />
              <ClarityCard label="Heatmaps" value={data.clarity.heatmaps.toLocaleString()} />
              <ClarityCard label="Rage clicks" value={data.clarity.rageClicks.toLocaleString()} />
              <ClarityCard label="Dead clicks" value={data.clarity.deadClicks.toLocaleString()} />
            </div>
            <div className="mt-5">
              <a href={data.clarity.dashboardUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  Open Clarity dashboard
                </Button>
              </a>
            </div>
          </article>
        </section>

        <section>
          <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Device split</h2>
            <p className="mt-1 text-xs text-slate-400">Live Supabase first-party tracking data.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {(data.deviceSplit ?? []).map((device) => (
                <div
                  key={device.deviceType}
                  className="rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {device.deviceType}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {device.sessions.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-400">{device.percent}% of sessions</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

function MetricDataBadge({ label }: { label: string }) {
  const isRealMetric =
    label === "Visitors" ||
    label === "Avg time on page" ||
    label === "Engagement rate" ||
    label === "WhatsApp clicks" ||
    label === "Form submissions";

  return (
    <span
      className={
        isRealMetric
          ? "rounded-full border border-emerald-300/40 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200"
          : "rounded-full border border-slate-500/40 bg-slate-700/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-300"
      }
    >
      {isRealMetric ? "Real" : "Sample"}
    </span>
  );
}

function ClarityCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/85 p-3">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
