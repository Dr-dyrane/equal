"use client";

import { BarChart3 } from "lucide-react";
import { ModuleScaffold } from "@/components/module-scaffold";
import { useFairness } from "@/features/fairness/provider/fairness-provider";

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

export function AnalyticsWorkspace() {
  const { comparisonMode, explanationPanelOpen, window } = useFairness();
  const metricSet = analyticsMetrics[window];

  return (
    <ModuleScaffold
      eyebrow={`Analytics / ${sentenceCase(window)}`}
      title="Measure fairness, compliance, and coverage over time."
      description={`Analytics is now route-scoped behind a fairness provider, so the active window, comparison mode, and explainability panel state can change without polluting the rest of the workspace. Current comparison mode: ${sentenceCase(comparisonMode)}.`}
      icon={BarChart3}
      primaryAction={{ href: "/schedule", label: "Inspect live schedule" }}
      secondaryAction={{
        href: explanationPanelOpen ? "/settings" : "/onboarding",
        label: explanationPanelOpen
          ? "Open rule settings"
          : "Review startup routine",
      }}
      metrics={[
        {
          label: "Fairness balance",
          value: metricSet.fairness,
          detail: `Undesirable shifts remain tightly distributed over the ${window} analysis window.`,
          tone: "primary",
        },
        {
          label: "Coverage compliance",
          value: metricSet.coverage,
          detail: `Coverage remains strong even when filtered by ${comparisonMode} comparisons.`,
          tone: "success",
        },
        {
          label: "Overtime drift",
          value: metricSet.overtime,
          detail: "Excess hours are visible early so future rosters can correct course.",
          tone: "warning",
        },
      ]}
      panels={[
        {
          title: "Fairness trends",
          description:
            "The ledger makes workload distribution visible to staff and schedulers alike.",
          tone: "primary",
          items: [
            `Track nights, weekends, holidays, and overtime across the ${window} window.`,
            `Compare relative load by ${comparisonMode} rather than raw counts alone.`,
            "Keep explainability attached to difficult assignments and overrides.",
          ],
        },
        {
          title: "Coverage heatmaps",
          description:
            "Schedulers need to see pressure points before they become staffing failures.",
          tone: "success",
          items: [
            "Spot understaffed periods by time window or site.",
            "Compare demand assumptions to actual roster coverage.",
            "Highlight which missing skills create the biggest risk.",
          ],
        },
        {
          title: explanationPanelOpen ? "Explainability on" : "Explainability off",
          description:
            "The analytics route can toggle explanation surfaces without pushing that state into the global app shell.",
          tone: "warning",
          items: [
            explanationPanelOpen
              ? "Decision notes are visible alongside fairness trends."
              : "Decision notes are hidden so the dashboard can stay compact.",
            "Export schedule changes, overrides, and rule edits.",
            "Preserve actor, timestamp, and previous state values.",
          ],
        },
      ]}
      steps={[
        {
          title: "Start with the fairness ledger",
          description:
            "Persist assignment history so fairness can be measured across schedules rather than in isolation.",
        },
        {
          title: "Add compliance overlays",
          description:
            "Surface legal-hour and rest-period risk alongside schedule results.",
        },
        {
          title: "Publish organization reports",
          description:
            "Deliver dashboard summaries and exportable evidence for admins, payroll, and auditors.",
        },
      ]}
    />
  );
}
