export type AnalyticsMetric = {
  label: string;
  value: string;
  detail: string;
};

export type AnalyticsSignal = {
  title: string;
  detail: string;
  tone: "primary" | "secondary" | "warning";
};

export type LedgerLine = {
  name: string;
  value: string;
  detail: string;
  tone: "primary" | "secondary" | "success";
};

export type AnalyticsSnapshot = {
  fairnessScore: number;
  coverageScore: number;
  overtimeRate: number;
  unresolvedDriftCount: number;
  ledger: LedgerLine[];
};
