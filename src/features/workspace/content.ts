import type { AppRole } from "@/lib/auth/claims";
import type { ScheduleDay } from "@/features/roster-builder/content";
import type { RosterStage } from "@/features/roster-builder/types";
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

export function getDashboardMetrics(stage: RosterStage): DashboardMetric[] {
  const readinessValue =
    stage === "published" ? "Out" : stage === "ready" ? "Ready" : "1 left";
  const fairnessValue =
    stage === "draft" ? "90.4" : stage === "reviewing" ? "93.8" : "95.1";
  const readinessDetail =
    stage === "published"
      ? "Roster is sent."
      : stage === "ready"
        ? "Week can go out."
        : "Tuesday still needs a call.";

  return [
    {
      label: "Fairness",
      value: fairnessValue,
      detail: stage === "published" ? "Week stayed even." : "Night load stays in range.",
    },
    {
      label: "Coverage",
      value: "99.4%",
      detail: "Critical roles covered.",
    },
    {
      label: "Ready",
      value: readinessValue,
      detail: readinessDetail,
    },
  ];
}

export function getDashboardDays(days: ScheduleDay[]): DashboardDay[] {
  return days.slice(0, 3).map((day) => ({
    day: day.day.slice(0, 3),
    summary: day.summary,
    entries: day.shifts.slice(0, 2).map((shift) => ({
      time: shift.time.split(" - ")[0] ?? shift.time,
      label: shift.emphasis,
      person: shift.person,
      surface: shift.surface,
    })),
  }));
}

export function getAttentionItems(input: {
  role: AppRole;
  stage: RosterStage;
  unresolvedConflictCount: number;
}): AttentionItem[] {
  const base: AttentionItem[] = [
    input.unresolvedConflictCount > 0
      ? {
          title: "Fairness drift",
          detail: "Tuesday night still leans hard.",
          href: "/schedule",
          tone: "warning",
        }
      : {
          title: "Week is ready",
          detail:
            input.stage === "published"
              ? "Roster is already out."
              : "The hardest call is closed.",
          href: "/schedule",
          tone: "primary",
        },
    {
      title: "Preference gaps",
      detail: "Availability still needs updates.",
      href: "/team",
      tone: "secondary",
    },
    {
      title: "Rules review",
      detail: "Recovery windows need a pass.",
      href: "/settings",
      tone: "primary",
    },
  ];

  if (input.role === "staff" || input.role === "observer") {
    return [
      {
        title: "Week is ready",
        detail: "Check your shifts and swaps.",
        href: "/schedule",
        tone: "primary",
      },
      {
        title: "Fairness view",
        detail: "See how nights and weekends are trending.",
        href: "/analytics",
        tone: "secondary",
      },
    ];
  }

  return base;
}

export function getFairnessLines(decisionPerson: string): FairnessLine[] {
  const leadLine =
    decisionPerson === "Mia Cruz"
      ? {
          name: "Mia Cruz",
          detail: "One extra night.",
          tone: "text-[color:var(--story-brand-pink)]",
        }
      : {
          name: decisionPerson,
          detail: "Tuesday night is balanced.",
          tone: "text-[color:var(--story-brand-blue)]",
        };

  return [
    leadLine,
    {
      name: "Kai Morgan",
      detail: "Weekend load is even.",
      tone: "text-[color:var(--story-brand-blue)]",
    },
    {
      name: "Lena Park",
      detail: "Rest stays protected.",
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
