import type {
  FairnessComparisonMode,
  FairnessWindow,
} from "@/features/fairness/provider/fairness-provider";
import type { AnalyticsMetric, AnalyticsSignal, AnalyticsSnapshot, LedgerLine } from "@/features/fairness/types";

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function scaleScore(value: number, window: FairnessWindow, delta: number) {
  if (window === "year") {
    return Math.max(0, value - delta * 1.2);
  }

  if (window === "quarter") {
    return Math.max(0, value - delta * 0.6);
  }

  return value;
}

export function getAnalyticsSummary(
  snapshot: AnalyticsSnapshot,
  window: FairnessWindow,
  comparisonMode: FairnessComparisonMode,
) {
  if (window === "year") {
    return {
      badge: "Annual view",
      title: "Keep drift visible over time.",
      detail: `${snapshot.unresolvedDriftCount} fairness drifts still deserve attention in the ${sentenceCase(comparisonMode)} view.`,
    };
  }

  if (window === "quarter") {
    return {
      badge: "Quarter",
      title: "Follow the trend, not one week.",
      detail: `${snapshot.unresolvedDriftCount} fairness drifts are still shaping the quarter view.`,
    };
  }

  return {
    badge: "6 weeks",
    title: "Keep fairness visible while the week is still editable.",
    detail: `${snapshot.unresolvedDriftCount} fairness drift${snapshot.unresolvedDriftCount === 1 ? "" : "s"} still show up before publish.`,
  };
}

export function getAnalyticsMetrics(
  snapshot: AnalyticsSnapshot,
  window: FairnessWindow,
  comparisonMode: FairnessComparisonMode,
): AnalyticsMetric[] {
  const fairness = scaleScore(snapshot.fairnessScore, window, 2.4);
  const coverage = scaleScore(snapshot.coverageScore, window, 0.3);
  const overtime =
    window === "year"
      ? snapshot.overtimeRate + 1.2
      : window === "quarter"
        ? snapshot.overtimeRate + 0.5
        : snapshot.overtimeRate;

  return [
    {
      label: "Fairness",
      value: `${fairness.toFixed(1)}%`,
      detail: `The ${sentenceCase(comparisonMode)} view keeps hard shifts from clustering too quietly.`,
    },
    {
      label: "Coverage",
      value: `${coverage.toFixed(1)}%`,
      detail: "Critical roles are still covered while the lens shifts.",
    },
    {
      label: "Overtime",
      value: `${overtime.toFixed(1)}%`,
      detail: "Extra hours stay visible early enough to correct the next pass.",
    },
  ];
}

export function getAnalyticsSignals(
  snapshot: AnalyticsSnapshot,
  window: FairnessWindow,
  comparisonMode: FairnessComparisonMode,
  explanationPanelOpen: boolean,
): AnalyticsSignal[] {
  const focusName = snapshot.ledger[0]?.name ?? "The current lead";

  return [
    {
      title: `${focusName} still carries one extra difficult window`,
      detail: `The ${window} view still shows one fairness call worth checking before publish.`,
      tone: "warning",
    },
    {
      title: `Coverage holds in ${comparisonMode} view`,
      detail: "The current lens still keeps critical work visible and covered.",
      tone: "primary",
    },
    {
      title: explanationPanelOpen ? "Decision notes are open" : "Decision notes stay quiet",
      detail: explanationPanelOpen
        ? "Explainability is available now if you need to defend a decision."
        : "Open notes only when the week needs explanation.",
      tone: "secondary",
    },
  ];
}

export function getLedgerLines(
  snapshot: AnalyticsSnapshot,
  window: FairnessWindow,
): LedgerLine[] {
  return snapshot.ledger.map((line) => {
    if (window === "6-weeks") {
      return line;
    }

    if (window === "quarter") {
      return {
        ...line,
        detail: line.tone === "secondary" ? "Still slightly above the quarter baseline." : line.detail,
      };
    }

    return {
      ...line,
      detail: line.tone === "secondary" ? "Still visible in the annual baseline." : line.detail,
    };
  });
}
