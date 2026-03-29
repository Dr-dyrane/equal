import type {
  FairnessComparisonMode,
  FairnessWindow,
} from "@/features/fairness/provider/fairness-provider";

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

const analyticsMetrics = {
  "6-weeks": {
    fairness: "96%",
    coverage: "99.4%",
    overtime: "2.8%",
  },
  quarter: {
    fairness: "94.2%",
    coverage: "99.1%",
    overtime: "3.6%",
  },
  year: {
    fairness: "92.7%",
    coverage: "98.8%",
    overtime: "4.4%",
  },
} as const;

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getAnalyticsSummary(
  window: FairnessWindow,
  comparisonMode: FairnessComparisonMode,
) {
  if (window === "year") {
    return {
      badge: "Annual view",
      title: "See where fairness drifts over time.",
      detail: `You are comparing by ${sentenceCase(comparisonMode)} so long-cycle imbalance stays visible before it becomes policy debt.`,
    };
  }

  if (window === "quarter") {
    return {
      badge: "Quarter",
      title: "Follow the trend, not one week.",
      detail: `The ${sentenceCase(comparisonMode)} view keeps overtime, nights, and coverage drift in the same frame.`,
    };
  }

  return {
    badge: "6 weeks",
    title: "Keep fairness visible while the week is still editable.",
    detail: `The ${sentenceCase(comparisonMode)} lens shows the strongest signal without leaving the live schedule behind.`,
  };
}

export function getAnalyticsMetrics(
  window: FairnessWindow,
  comparisonMode: FairnessComparisonMode,
): AnalyticsMetric[] {
  const metricSet = analyticsMetrics[window];

  return [
    {
      label: "Fairness",
      value: metricSet.fairness,
      detail: `Undesirable shifts stay tightly distributed in the ${window} view.`,
    },
    {
      label: "Coverage",
      value: metricSet.coverage,
      detail: `Coverage still holds when you compare by ${sentenceCase(comparisonMode)}.`,
    },
    {
      label: "Overtime",
      value: metricSet.overtime,
      detail: "Excess hours are visible early enough to correct the next cycle.",
    },
  ];
}

export function getAnalyticsSignals(
  window: FairnessWindow,
  comparisonMode: FairnessComparisonMode,
  explanationPanelOpen: boolean,
): AnalyticsSignal[] {
  return [
    {
      title: "Mia still carries one extra night",
      detail: `The ${window} trend shows one fairness drift still worth correcting before the next publish.`,
      tone: "warning",
    },
    {
      title: `Coverage stays stable by ${comparisonMode}`,
      detail: "The current comparison lens still keeps critical windows well covered.",
      tone: "primary",
    },
    {
      title: explanationPanelOpen
        ? "Decision notes are already open"
        : "Decision notes stay quiet until needed",
      detail: explanationPanelOpen
        ? "The reasoning surface is available now if you need to defend a hard assignment."
        : "You can keep the board calm until the trend needs explanation.",
      tone: "secondary",
    },
  ];
}

export function getLedgerLines(
  window: FairnessWindow,
  comparisonMode: FairnessComparisonMode,
): LedgerLine[] {
  return [
    {
      name: "Mia Cruz",
      value: window === "year" ? "+3 nights" : window === "quarter" ? "+2 nights" : "+1 night",
      detail: `Still slightly above the ${comparisonMode} baseline.`,
      tone: "secondary",
    },
    {
      name: "Kai Morgan",
      value: "Balanced",
      detail: "Weekend load is staying inside the expected cycle range.",
      tone: "primary",
    },
    {
      name: "Lena Park",
      value: "Protected",
      detail: "Rest windows remain intact across the current view.",
      tone: "success",
    },
  ];
}
