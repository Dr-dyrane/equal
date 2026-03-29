export type RoutineTone =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning";

export type StartupStep = {
  id: string;
  title: string;
  description: string;
  owner: string;
  href: string;
  tone: RoutineTone;
  outcomes: string[];
};

export type BuildPhase = {
  title: string;
  description: string;
};

export type RoleCard = {
  title: string;
  note: string;
  tone: string;
};

export const startupRoutine: StartupStep[] = [
  {
    id: "organization",
    title: "Set the organization",
    description: "Name it. Set the timezone.",
    owner: "Owner",
    href: "/settings",
    tone: "primary",
    outcomes: [
      "Organization identity and timezone are defined.",
      "The first privileged user is attached to the workspace.",
    ],
  },
  {
    id: "team",
    title: "Add the core team",
    description: "Start with the people who run the week.",
    owner: "Owner + Admin",
    href: "/team",
    tone: "secondary",
    outcomes: [
      "Core operators can manage staffing data.",
      "Role boundaries match the documented permission model.",
    ],
  },
  {
    id: "rules",
    title: "Set shifts and rules",
    description: "Lock the basics before the first run.",
    owner: "Admin + Scheduler",
    href: "/shifts",
    tone: "accent",
    outcomes: [
      "Coverage expectations are encoded as templates.",
      "Legal limits and fairness weights are ready for the solver.",
    ],
  },
  {
    id: "preferences",
    title: "Collect preferences",
    description: "Availability first.",
    owner: "Staff + Scheduler",
    href: "/team",
    tone: "success",
    outcomes: [
      "Availability is captured before scheduling starts.",
      "Preference data is available for soft-constraint scoring.",
    ],
  },
  {
    id: "generate",
    title: "Generate the first week",
    description: "Run it. Check the calls.",
    owner: "Scheduler",
    href: "/schedule",
    tone: "warning",
    outcomes: [
      "Assignments are proposed with conflicts surfaced.",
      "Fairness context is visible before publication.",
    ],
  },
  {
    id: "publish",
    title: "Publish",
    description: "Send the week.",
    owner: "Scheduler",
    href: "/schedule",
    tone: "primary",
    outcomes: [
      "Published schedules become visible to staff.",
      "The system is ready for swaps, analytics, and audit logging.",
    ],
  },
];

export const buildSequence: BuildPhase[] = [
  {
    title: "Database schema and RLS",
    description:
      "Create the Postgres tables, indexes, and row-level policies before mutating schedule data.",
  },
  {
    title: "Auth and organization claims",
    description:
      "Set up JWT/OIDC auth, attach user, organization, and role claims, and use them for Neon-backed server-side access control.",
  },
  {
    title: "Core entities and APIs",
    description:
      "Implement users, skills, shift templates, schedules, and the supporting server functions.",
  },
  {
    title: "Constraint engine",
    description:
      "Build the rule interpreter and assignment optimizer that can propose valid, fairness-aware rosters.",
  },
  {
    title: "Schedule features",
    description:
      "Connect the calendar, preferences, fairness ledger, and swap request flow to real data.",
  },
  {
    title: "Realtime, admin, and polish",
    description:
      "Add live updates, rule management, analytics depth, accessibility, and final UI refinement.",
  },
];

export const startupChecklist = [
  "Bootstrap residue, build output, and old backup folders were removed from the workspace.",
  "The documented first-run flow is now centralized in code instead of duplicated in pages.",
  "Clean and startup verification scripts are available for repeatable local launches.",
  "Workspace overview and onboarding surfaces now point to the same documented startup path.",
];

export const startupSuccessCriteria = [
  "Roles are clear.",
  "Rules match the floor.",
  "Preferences are in before publish.",
];

export const startupGuardrails = [
  "Legal limits stay hard.",
  "Approved leave wins.",
  "Overrides stay logged.",
];

export const roleCards: RoleCard[] = [
  {
    title: "Owner",
    note: "Owns the workspace.",
    tone: "bg-primary/12 text-sky-700",
  },
  {
    title: "Admin",
    note: "Runs people, rules, and settings.",
    tone: "bg-secondary/14 text-fuchsia-700",
  },
  {
    title: "Scheduler",
    note: "Builds and publishes the week.",
    tone: "bg-success/16 text-emerald-700",
  },
  {
    title: "Staff",
    note: "Sees own week and preferences.",
    tone: "bg-warning/20 text-amber-700",
  },
  {
    title: "Observer",
    note: "Read-only.",
    tone: "bg-slate-100 text-slate-700",
  },
];
