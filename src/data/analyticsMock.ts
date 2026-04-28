export type OverviewMetric = {
  label: string;
  value: string;
  delta: string;
};

export type TrafficSource = {
  source: string;
  percent: number;
  sessions: number;
};

export type PageEngagement = {
  path: string;
  title: string;
  avgTime: string;
  views: number;
};

export type ConversionMetric = {
  event: "whatsapp_click" | "generate_lead" | "form_submit";
  count: number;
  conversionRate: string;
};

export type ClaritySummary = {
  sessionRecordings: number;
  heatmaps: number;
  rageClicks: number;
  deadClicks: number;
  dashboardUrl: string;
};

export type AnalyticsDashboardData = {
  dateRangeLabel: string;
  overview: OverviewMetric[];
  trafficSources: TrafficSource[];
  topPages: PageEngagement[];
  deviceSplit?: Array<{ deviceType: string; sessions: number; percent: number }>;
  conversions: ConversionMetric[];
  clarity: ClaritySummary;
};

// TODO(google-analytics-data-api): Replace overview/traffic/engagement with GA Data API responses.
// TODO(clarity-api): Replace clarity section with Microsoft Clarity API responses.
// TODO(backend-fetching): Move this data loading to secure server endpoints before production analytics rollout.
export const analyticsMockData: AnalyticsDashboardData = {
  dateRangeLabel: "Last 30 days (Supabase first-party tracking)",
  overview: [
    { label: "Visitors", value: "0", delta: "Live" },
    { label: "Avg time on page", value: "—", delta: "Live" },
    { label: "Engagement rate", value: "—", delta: "Live" },
    { label: "WhatsApp clicks", value: "0", delta: "Live" },
    { label: "Form submissions", value: "0", delta: "Live" },
  ],
  trafficSources: [],
  topPages: [],
  conversions: [
    { event: "whatsapp_click", count: 0, conversionRate: "0.00%" },
    { event: "generate_lead", count: 0, conversionRate: "0.00%" },
    { event: "form_submit", count: 0, conversionRate: "0.00%" },
  ],
  clarity: {
    sessionRecordings: 0,
    heatmaps: 0,
    rageClicks: 0,
    deadClicks: 0,
    dashboardUrl: "https://clarity.microsoft.com/",
  },
};
