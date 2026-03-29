import type { AppRole } from "@/lib/auth/claims";
import { shellRoutes, type ShellRouteMeta } from "@/features/shell/config/navigation";
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
  tone: string;
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
          tone:
            "[--entry-meta:rgba(34,39,77,0.66)] from-[#ffd7f1] to-[#f5c9ff] text-[#22274d] dark:[--entry-meta:rgba(246,251,255,0.78)] dark:from-[#5a336d] dark:to-[#4a2e61] dark:text-[#f6fbff]",
        },
        {
          time: "19:00",
          label: "Night rotation",
          person: "Mia Cruz",
          tone:
            "[--entry-meta:rgba(34,39,77,0.66)] from-[#d4d5ff] to-[#cbc7ff] text-[#22274d] dark:[--entry-meta:rgba(246,251,255,0.78)] dark:from-[#2a2759] dark:to-[#24224f] dark:text-[#f6fbff]",
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
          tone:
            "[--entry-meta:rgba(34,39,77,0.66)] from-[#c8eeff] to-[#bce8ff] text-[#18324b] dark:[--entry-meta:rgba(246,251,255,0.78)] dark:from-[#173f59] dark:to-[#15364b] dark:text-[#f6fbff]",
        },
        {
          time: "19:00",
          label: "Fair rotation",
          person: "Kai Morgan",
          tone:
            "[--entry-meta:rgba(34,39,77,0.66)] from-[#e0d0ff] to-[#d3c4ff] text-[#22274d] dark:[--entry-meta:rgba(246,251,255,0.78)] dark:from-[#37245d] dark:to-[#2f214f] dark:text-[#f6fbff]",
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
          tone:
            "[--entry-meta:rgba(34,39,77,0.66)] from-[#e8f0ff] to-[#dfe7ff] text-[#223454] dark:[--entry-meta:rgba(246,251,255,0.78)] dark:from-[#213052] dark:to-[#1d2946] dark:text-[#f6fbff]",
        },
        {
          time: "19:00",
          label: "Recovery gap",
          person: "Mia Cruz",
          tone:
            "[--entry-meta:rgba(34,39,77,0.66)] from-[#c9f2ff] to-[#c4f7f1] text-[#1d4052] dark:[--entry-meta:rgba(246,251,255,0.78)] dark:from-[#14465a] dark:to-[#153f49] dark:text-[#f6fbff]",
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

export function getWorkspaceModules() {
  return shellRoutes.filter(
    (route): route is ShellRouteMeta =>
      route.key !== "workspace" && route.key !== "onboarding",
  );
}
