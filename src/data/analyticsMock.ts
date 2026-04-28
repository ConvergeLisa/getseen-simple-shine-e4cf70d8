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
    { label: "Visitors", value: "12,430", delta: "+14.2%" },
    { label: "Avg time on page", value: "2m 48s", delta: "+9.6%" },
    { label: "Engagement rate", value: "63.4%", delta: "+4.1%" },
    { label: "WhatsApp clicks", value: "382", delta: "+19.3%" },
    { label: "Form submissions", value: "74", delta: "+11.8%" },
  ],
  trafficSources: [
    { source: "Direct", percent: 41, sessions: 5086 },
    { source: "Google", percent: 46, sessions: 5718 },
    { source: "Social", percent: 13, sessions: 1626 },
  ],
  topPages: [
    { path: "/", title: "Homepage", avgTime: "3m 12s", views: 8421 },
    { path: "/#pricing", title: "Pricing section", avgTime: "2m 26s", views: 3160 },
    { path: "/#portfolio", title: "Portfolio section", avgTime: "2m 05s", views: 2488 },
    { path: "/#contact", title: "Contact section", avgTime: "1m 49s", views: 1750 },
  ],
  conversions: [
    { event: "whatsapp_click", count: 382, conversionRate: "3.07%" },
    { event: "generate_lead", count: 143, conversionRate: "1.15%" },
    { event: "form_submit", count: 74, conversionRate: "0.60%" },
  ],
  clarity: {
    sessionRecordings: 1684,
    heatmaps: 12,
    rageClicks: 39,
    deadClicks: 61,
    dashboardUrl: "https://clarity.microsoft.com/",
  },
};
