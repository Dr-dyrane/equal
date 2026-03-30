import type { AppRole } from "@/lib/auth/claims";
import type { ScheduleDay } from "@/features/roster-builder/content";
import type { RosterStage } from "@/features/roster-builder/types";
import type { TeamSnapshot, TeamTaskTone } from "@/features/team/types";
import type { ShiftSnapshot, ShiftTaskTone } from "@/features/shifts/types";
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

function getAttentionTone(
  tone: TeamTaskTone | ShiftTaskTone,
): AttentionItem["tone"] {
  if (tone === "warning") {
    return "warning";
  }

  if (tone === "secondary") {
    return "secondary";
  }

  return "primary";
}

export function getDashboardMetrics(input: {
  stage: RosterStage;
  teamSnapshot: TeamSnapshot;
  shiftSnapshot: ShiftSnapshot;
}): DashboardMetric[] {
  const { stage, teamSnapshot, shiftSnapshot } = input;
  const readinessValue =
    stage === "published" ? "Out" : stage === "ready" ? "Ready" : "1 left";
  const readinessDetail =
    stage === "published"
      ? "Roster is sent."
      : stage === "ready"
        ? "Week can go out."
        : "Tuesday still needs a call.";

  return [
    {
      label: "Week",
      value: readinessValue,
      detail: readinessDetail,
    },
    {
      label: "Team",
      value: teamSnapshot.metrics[1]?.value ?? "0%",
      detail: teamSnapshot.tasks[0]?.detail ?? teamSnapshot.summary,
    },
    {
      label: "Shapes",
      value: shiftSnapshot.metrics[0]?.value ?? "0",
      detail:
        shiftSnapshot.tasks[0]?.detail ??
        `${shiftSnapshot.templates.length} reusable shapes are live.`,
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
  teamSnapshot: TeamSnapshot;
  shiftSnapshot: ShiftSnapshot;
}): AttentionItem[] {
  const teamTask = input.teamSnapshot.tasks[0];
  const shiftTask = input.shiftSnapshot.tasks[0];
  const base: AttentionItem[] = [
    input.unresolvedConflictCount > 0
      ? {
          title: "Close Tuesday night",
          detail: "One call still decides the week.",
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
    ...(teamTask
      ? [
          {
            title: teamTask.title,
            detail: teamTask.detail,
            href: "/team",
            tone: getAttentionTone(teamTask.tone),
          },
        ]
      : []),
    ...(shiftTask
      ? [
          {
            title: shiftTask.title,
            detail: shiftTask.detail,
            href: "/shifts",
            tone: getAttentionTone(shiftTask.tone),
          },
        ]
      : []),
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
