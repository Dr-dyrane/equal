import type { AppRole } from "@/lib/auth/claims";
import { startupRoutine } from "@/lib/startup-routine";

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
};

export type DashboardAssignment = {
  time: string;
  label: string;
  person: string;
  surface: {
    light: {
      from: string;
      to: string;
      ink: string;
      meta: string;
    };
    dark: {
      from: string;
      to: string;
      ink: string;
      meta: string;
    };
  };
};

export type DashboardDay = {
  day: string;
  entries: DashboardAssignment[];
  summary: string;
};

export type AttentionItem = {
  title: string;
  detail: string;
  href: string;
  tone: "primary" | "secondary" | "warning";
};

export type FairnessLine = {
  name: string;
  detail: string;
  tone: string;
};

export function getDashboardMetrics(): DashboardMetric[] {
  return [
    {
      label: "Fairness",
      value: "92%",
      detail: "Balanced enough to publish after one review pass.",
    },
    {
      label: "Coverage",
      value: "99.4%",
      detail: "Critical roles are covered across the active week.",
    },
    {
      label: "Swaps",
      value: "04",
      detail: "Only one request needs manager review today.",
    },
  ];
}

export function getDashboardDays(): DashboardDay[] {
  return [
    {
      day: "Mon",
      summary: "Rest protected",
      entries: [
        {
          time: "07:00",
          label: "Rest protected",
          person: "Lena Park",
          surface: {
            light: {
              from: "#ffd7f1",
              to: "#f5c9ff",
              ink: "#22274d",
              meta: "rgba(34, 39, 77, 0.72)",
            },
            dark: {
              from: "#5a336d",
              to: "#4a2e61",
              ink: "#f6fbff",
              meta: "rgba(246, 251, 255, 0.82)",
            },
          },
        },
        {
          time: "19:00",
          label: "Night rotation",
          person: "Mia Cruz",
          surface: {
            light: {
              from: "#d4d5ff",
              to: "#cbc7ff",
              ink: "#22274d",
              meta: "rgba(34, 39, 77, 0.72)",
            },
            dark: {
              from: "#2a2759",
              to: "#24224f",
              ink: "#f6fbff",
              meta: "rgba(246, 251, 255, 0.82)",
            },
          },
        },
      ],
    },
    {
      day: "Tue",
      summary: "Coverage ready",
      entries: [
        {
          time: "07:00",
          label: "Coverage ready",
          person: "Owen Diaz",
          surface: {
            light: {
              from: "#c8eeff",
              to: "#bce8ff",
              ink: "#18324b",
              meta: "rgba(24, 50, 75, 0.72)",
            },
            dark: {
              from: "#173f59",
              to: "#15364b",
              ink: "#f6fbff",
              meta: "rgba(246, 251, 255, 0.82)",
            },
          },
        },
        {
          time: "19:00",
          label: "Fair rotation",
          person: "Kai Morgan",
          surface: {
            light: {
              from: "#e0d0ff",
              to: "#d3c4ff",
              ink: "#22274d",
              meta: "rgba(34, 39, 77, 0.72)",
            },
            dark: {
              from: "#37245d",
              to: "#2f214f",
              ink: "#f6fbff",
              meta: "rgba(246, 251, 255, 0.82)",
            },
          },
        },
      ],
    },
    {
      day: "Wed",
      summary: "Recovery gap",
      entries: [
        {
          time: "07:00",
          label: "Balanced seniority",
          person: "June Hall",
          surface: {
            light: {
              from: "#e8f0ff",
              to: "#dfe7ff",
              ink: "#223454",
              meta: "rgba(34, 52, 84, 0.72)",
            },
            dark: {
              from: "#213052",
              to: "#1d2946",
              ink: "#f6fbff",
              meta: "rgba(246, 251, 255, 0.82)",
            },
          },
        },
        {
          time: "19:00",
          label: "Recovery gap",
          person: "Mia Cruz",
          surface: {
            light: {
              from: "#c9f2ff",
              to: "#c4f7f1",
              ink: "#1d4052",
              meta: "rgba(29, 64, 82, 0.72)",
            },
            dark: {
              from: "#14465a",
              to: "#153f49",
              ink: "#f6fbff",
              meta: "rgba(246, 251, 255, 0.82)",
            },
          },
        },
      ],
    },
  ];
}

export function getAttentionItems(role: AppRole): AttentionItem[] {
  const base: AttentionItem[] = [
    {
      title: "One fairness drift",
      detail: "Tuesday night still leans too hard on Mia. Review the week before publish.",
      href: "/schedule",
      tone: "warning",
    },
    {
      title: "Two preference gaps",
      detail: "Field Coverage still needs updated availability for next week.",
      href: "/team",
      tone: "secondary",
    },
    {
      title: "Rules want review",
      detail: "Weekend weighting is set, but recovery windows still need a final pass.",
      href: "/settings",
      tone: "primary",
    },
  ];

  if (role === "staff" || role === "observer") {
    return [
      {
        title: "Your week is ready",
        detail: "Review your upcoming shifts and any open swaps.",
        href: "/schedule",
        tone: "primary",
      },
      {
        title: "Fairness stays visible",
        detail: "You can see how nights and weekends are trending for your team.",
        href: "/analytics",
        tone: "secondary",
      },
    ];
  }

  return base;
}

export function getFairnessLines(): FairnessLine[] {
  return [
    {
      name: "Mia Cruz",
      detail: "One extra night this cycle. Review before publish.",
      tone: "text-[color:var(--story-brand-pink)]",
    },
    {
      name: "Kai Morgan",
      detail: "Weekend load is on target.",
      tone: "text-[color:var(--story-brand-blue)]",
    },
    {
      name: "Lena Park",
      detail: "Rest windows are fully protected this week.",
      tone: "text-emerald-500",
    },
  ];
}

const ROLE_STEP_MAP: Record<AppRole, string[]> = {
  owner: ["organization", "team", "rules"],
  admin: ["team", "rules", "preferences"],
  scheduler: ["rules", "preferences", "generate"],
  staff: ["preferences", "publish"],
  observer: ["generate", "publish"],
};

export function getRoleSteps(role: AppRole) {
  return ROLE_STEP_MAP[role]
    .map((id) => startupRoutine.find((step) => step.id === id))
    .filter((step): step is (typeof startupRoutine)[number] => Boolean(step));
}
