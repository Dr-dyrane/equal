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
    title: "Create the organization",
    description:
      "Capture the organization name, timezone, and the initial owner account. This becomes the boundary for schedules, users, rules, and analytics.",
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
    title: "Invite the core team",
    description:
      "Bring in admins and schedulers first so role management, rule configuration, and approval workflows have clear accountability.",
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
    title: "Define templates and rules",
    description:
      "Set up shift templates, required skills, and the first set of hard and soft constraints before any schedule is generated.",
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
    title: "Collect staff preferences",
    description:
      "Availability, preferred shift types, leave windows, and notes turn a valid roster into a fair one.",
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
    title: "Generate the first roster",
    description:
      "Run the optimizer, inspect conflicts and fairness impact, and prepare the first publishable schedule.",
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
    title: "Review and publish",
    description:
      "Adjust assignments if needed, publish the roster, and notify staff so swaps and follow-up actions can begin.",
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
  "Roles and permissions are clear from day one.",
  "Templates and rules match the real operating environment.",
  "Staff preferences are captured before publishing the first roster.",
];

export const startupGuardrails = [
  "Legal maximums and rest requirements stay hard constraints.",
  "Approved leave always overrides schedule proposals.",
  "Emergency overrides require audit logging and explicit authority.",
];

export const roleCards: RoleCard[] = [
  {
    title: "Owner",
    note: "Full control, billing, organization-level permissions, and escalation authority.",
    tone: "bg-primary/12 text-sky-700",
  },
  {
    title: "Admin",
    note: "User, rule, and settings management without organization deletion.",
    tone: "bg-secondary/14 text-fuchsia-700",
  },
  {
    title: "Scheduler",
    note: "Shift, assignment, swap, and roster generation authority.",
    tone: "bg-success/16 text-emerald-700",
  },
  {
    title: "Staff",
    note: "Own schedule visibility, preferences, and swap requests only.",
    tone: "bg-warning/20 text-amber-700",
  },
  {
    title: "Observer",
    note: "Read-only access for payroll, auditors, and operational visibility.",
    tone: "bg-slate-100 text-slate-700",
  },
];
