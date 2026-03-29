export type TeamMetric = {
  label: string;
  value: string;
  detail: string;
};

export type TeamMember = {
  name: string;
  role: string;
  site: string;
  state: string;
  detail: string;
  skills: string[];
};

export type TeamSignal = {
  title: string;
  detail: string;
  tone: "primary" | "secondary" | "warning";
};

export const teamMetrics: TeamMetric[] = [
  {
    label: "Active staff",
    value: "128",
    detail: "People are visible by team, site, and role without duplication.",
  },
  {
    label: "Availability ready",
    value: "92%",
    detail: "Most of next week’s signals are already captured before scheduling starts.",
  },
  {
    label: "Cross-skill cover",
    value: "34%",
    detail: "Cross-trained people still keep the week resilient when demand shifts.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Mia Cruz",
    role: "Inbound lead",
    site: "Central Ops",
    state: "Ready",
    detail: "Availability is in, nights are balanced, and skill coverage is current.",
    skills: ["Inbound", "Forklift", "Night cover"],
  },
  {
    name: "Lena Park",
    role: "Packing",
    site: "Central Ops",
    state: "Needs preference update",
    detail: "Shift preferences are stale for next week even though leave windows are current.",
    skills: ["Packing", "Dispatch assist", "Weekend cover"],
  },
  {
    name: "Kai Morgan",
    role: "Support pod",
    site: "Field Coverage",
    state: "Ready",
    detail: "Cross-skill pairing keeps the late week stable if Tuesday rotates cleanly.",
    skills: ["Support", "Escalations", "Mentor"],
  },
  {
    name: "Owen Diaz",
    role: "Dispatch",
    site: "Field Coverage",
    state: "Missing certification refresh",
    detail: "Coverage is usable, but one capability expires before the next cycle closes.",
    skills: ["Dispatch", "Forklift", "Escalations"],
  },
];

export const teamSignals: TeamSignal[] = [
  {
    title: "4 teammates still need availability",
    detail: "Next week looks usable, but a few missing inputs will turn into manual exceptions if they stay open.",
    tone: "warning",
  },
  {
    title: "Night pairing is thin",
    detail: "Only two people can safely absorb a Tuesday escalation without shifting fairness too far.",
    tone: "secondary",
  },
  {
    title: "Core skills are mostly healthy",
    detail: "The week can still run, but expiring capability needs a quick check before the next publish.",
    tone: "primary",
  },
];

export const teamCapabilityLanes = [
  {
    title: "Coverage confidence",
    detail: "Inbound, dispatch, and clinical roles all have at least one backup pairing available.",
  },
  {
    title: "Preference capture",
    detail: "Availability is strong enough to trust the next draft, but preferences need a final sweep.",
  },
  {
    title: "Skill health",
    detail: "Critical coverage holds as long as expiring certifications are renewed this week.",
  },
] as const;
