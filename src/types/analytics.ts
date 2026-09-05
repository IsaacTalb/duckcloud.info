export type AnalyticsKind = "blog" | "tool";

export interface AnalyticsPageViewEvent {
  kind: AnalyticsKind;
  identifier: string;
}

export interface AnalyticsSummary {
  generated_at: string;
  range: { days: number; from: string; to: string };
  totals: { views: number; blog: number; tool: number };
  recent_days: Array<{ day: string; views: number; blog: number; tool: number }>;
  top_content: Array<{ kind: AnalyticsKind; identifier: string; views: number }>;
}
