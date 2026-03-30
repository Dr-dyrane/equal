export type BaselineTeamInputState =
  | "ready"
  | "needs-availability"
  | "needs-preferences"
  | "needs-check";

export type BaselineTeamProfile = {
  name: string;
  role: string;
  siteSlug: string;
  detail: string;
  inputState: BaselineTeamInputState;
  skills: string[];
  maxHoursPerWeek: number;
};

export const BASELINE_TEAM = {
  name: "Core Scheduling",
  slug: "core-scheduling",
  colorToken: "indigo",
} as const;

export const BASELINE_SITES = [
  {
    name: "Central Ops",
    slug: "central-ops",
  },
  {
    name: "Field Coverage",
    slug: "field-coverage",
  },
] as const;

export const BASELINE_SKILLS = [
  "Inbound",
  "Forklift",
  "Night cover",
  "Packing",
  "Dispatch",
  "Escalations",
  "Mentor",
  "Clinical",
  "Float pool",
  "Service",
  "Customer care",
] as const;

export const BASELINE_TEAM_PROFILES: readonly BaselineTeamProfile[] = [
  {
    name: "Mia Cruz",
    role: "Inbound lead",
    siteSlug: "central-ops",
    detail: "Night coverage stays stable if Tuesday closes cleanly.",
    inputState: "ready",
    skills: ["Inbound", "Forklift", "Night cover"],
    maxHoursPerWeek: 40,
  },
  {
    name: "Lena Park",
    role: "Packing",
    siteSlug: "central-ops",
    detail: "Shift preferences need one more pass before the week goes out.",
    inputState: "needs-preferences",
    skills: ["Packing", "Dispatch", "Customer care"],
    maxHoursPerWeek: 36,
  },
  {
    name: "Kai Morgan",
    role: "Support pod",
    siteSlug: "field-coverage",
    detail: "Cross-skill coverage is current and ready to absorb late change.",
    inputState: "ready",
    skills: ["Service", "Escalations", "Mentor"],
    maxHoursPerWeek: 40,
  },
  {
    name: "Owen Diaz",
    role: "Dispatch",
    siteSlug: "field-coverage",
    detail: "One skill check is due before the next publish.",
    inputState: "needs-check",
    skills: ["Dispatch", "Forklift", "Escalations"],
    maxHoursPerWeek: 40,
  },
  {
    name: "Noah Kent",
    role: "Night ops",
    siteSlug: "central-ops",
    detail: "Availability is current and nights stay in range.",
    inputState: "ready",
    skills: ["Night cover", "Escalations"],
    maxHoursPerWeek: 38,
  },
  {
    name: "Ava Brooks",
    role: "Night ops",
    siteSlug: "central-ops",
    detail: "Rest windows are protected for the next cycle.",
    inputState: "ready",
    skills: ["Night cover", "Service"],
    maxHoursPerWeek: 38,
  },
  {
    name: "Ivy Chen",
    role: "Clinical",
    siteSlug: "central-ops",
    detail: "Availability still needs to land before the next draft.",
    inputState: "needs-availability",
    skills: ["Clinical", "Float pool"],
    maxHoursPerWeek: 32,
  },
  {
    name: "June Hall",
    role: "Float pool",
    siteSlug: "central-ops",
    detail: "Coverage is flexible and seniority stays balanced.",
    inputState: "ready",
    skills: ["Float pool", "Mentor", "Customer care"],
    maxHoursPerWeek: 40,
  },
] as const;
