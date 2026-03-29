"use client";

import { useFairness } from "@/features/fairness/provider/fairness-provider";
import { RouteOverviewPage } from "@/features/route-overview/components/route-overview-page";
import type { RouteOverviewContent } from "@/features/route-overview/types";

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
  const content: RouteOverviewContent = {
    eyebrow: `Insights / ${sentenceCase(window)}`,
    title: "Fairness and coverage over time.",
    description: `Open the ledger, coverage trends, and overtime drift without losing the current comparison view. Right now you are comparing by ${sentenceCase(comparisonMode)}.`,
    icon: "chart-bar-fill",
    primaryAction: {
      href: "/schedule",
      label: "Open schedule",
    },
    secondaryAction: {
      href: explanationPanelOpen ? "/settings" : "/onboarding",
      label: explanationPanelOpen ? "Open rules" : "Open setup",
    },
    metrics: [
      {
        label: "Fairness",
        value: metricSet.fairness,
        detail: `Undesirable shifts stay tightly distributed over the ${window} view.`,
      },
      {
        label: "Coverage",
        value: metricSet.coverage,
        detail: `Coverage stays strong even under the current ${comparisonMode} comparison.`,
      },
      {
        label: "Overtime",
        value: metricSet.overtime,
        detail: "Excess hours stay visible early enough to correct the next week.",
      },
    ],
    sections: [
      {
        eyebrow: "Ledger",
        title: "Keep fairness visible.",
        description:
          "The week should explain who is carrying nights, weekends, and overtime before someone has to ask.",
        items: [
          `Track trend lines across the ${window} view.`,
          `Compare relative load by ${comparisonMode}.`,
          "Keep the fairness story readable after every edit.",
        ],
      },
      {
        eyebrow: "Coverage",
        title: "See where the week is thin.",
        description:
          "Coverage trouble should surface before it becomes an operational surprise.",
        items: [
          "Spot risk by day, time window, or site.",
          "Compare demand assumptions to the current week.",
          "Keep missing capability obvious, not hidden in reports.",
        ],
      },
      {
        eyebrow: "Explainability",
        title: explanationPanelOpen ? "Decision notes are open." : "Decision notes stay quiet.",
        description:
          "The UI should make explainability available when needed without forcing it into every view.",
        items: explanationPanelOpen
          ? [
              "Decision notes stay attached to difficult assignments.",
              "Overrides remain visible alongside fairness shifts.",
              "Audit detail is ready when you need to defend the week.",
            ]
          : [
              "The board stays focused until deeper context is needed.",
              "Decision notes can open without leaving the page.",
              "The workflow stays calm when all you need is the signal.",
            ],
      },
      {
        eyebrow: "Reporting",
        title: "Turn the week into evidence.",
        description:
          "The same signals that help schedulers should be exportable for managers, payroll, and audits.",
        items: [
          "Package fairness, coverage, and overtime together.",
          "Keep organization reporting tied to real schedule state.",
          "Make trends useful beyond the current week.",
        ],
      },
    ],
    tasksTitle: "Today",
    tasksHeading: "Follow the strongest signal.",
    tasks: [
      {
        title: "Review fairness drift",
        detail: `The ${window} view still shows one area worth correcting before publish.`,
        href: "/schedule",
      },
      {
        title: "Compare the right lens",
        detail: `Stay with ${sentenceCase(comparisonMode)} if you are checking balance, not raw count.`,
      },
      {
        title: "Open the rule context",
        detail: explanationPanelOpen
          ? "The explanatory layer is already open if you need to defend the output."
          : "Open the rules only when the trend needs explanation, not before.",
        href: explanationPanelOpen ? "/settings" : "/onboarding",
      },
    ],
  };

  return <RouteOverviewPage content={content} />;
}
