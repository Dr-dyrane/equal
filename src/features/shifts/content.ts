export type ShiftMetric = {
  label: string;
  value: string;
  detail: string;
};

export type ShiftTemplate = {
  name: string;
  window: string;
  site: string;
  demand: string;
  skills: string[];
  detail: string;
};

export type ShiftSignal = {
  title: string;
  detail: string;
  tone: "primary" | "secondary" | "warning";
};

export const shiftMetrics: ShiftMetric[] = [
  {
    label: "Active templates",
    value: "24",
    detail: "Core day, evening, night, and weekend shapes are ready to reuse.",
  },
  {
    label: "Critical roles",
    value: "07",
    detail: "These roles must stay covered or the week is not safe to publish.",
  },
  {
    label: "Coverage bundles",
    value: "12",
    detail: "Reusable skill combinations keep high-risk windows consistent.",
  },
];

export const shiftTemplates: ShiftTemplate[] = [
  {
    name: "Inbound morning",
    window: "06:00 - 14:00",
    site: "Central Ops",
    demand: "Lead + 2 floor",
    skills: ["Inbound", "Forklift", "Mentor"],
    detail: "The first handoff of the day. Stable coverage here prevents the whole board from drifting.",
  },
  {
    name: "Dispatch day",
    window: "11:00 - 19:00",
    site: "Field Coverage",
    demand: "Dispatch + escalation cover",
    skills: ["Dispatch", "Escalations"],
    detail: "This is where late-week demand turns visible, so pair coverage and experience deliberately.",
  },
  {
    name: "Night operations",
    window: "22:00 - 06:00",
    site: "Central Ops",
    demand: "Night lead + safety cover",
    skills: ["Night cover", "Escalations", "Supervisor"],
    detail: "The roster feels fair or unfair here first. Protect recovery before trying to optimize everything else.",
  },
  {
    name: "Weekend support",
    window: "08:00 - 16:00",
    site: "Field Coverage",
    demand: "Support pod + dispatch pairing",
    skills: ["Support", "Dispatch assist"],
    detail: "Weekend load is lighter, but experience mix still matters to keep the cycle balanced.",
  },
];

export const shiftSignals: ShiftSignal[] = [
  {
    title: "Night coverage still carries the most risk",
    detail: "The schedule can absorb small day-shift changes, but night demand still sets the fairness pressure for the week.",
    tone: "warning",
  },
  {
    title: "Template reuse is strong",
    detail: "Most of the week already comes from repeatable shapes instead of manual one-off shifts.",
    tone: "primary",
  },
  {
    title: "One capability bundle is thin",
    detail: "Escalation cover is still concentrated in too few people if demand spikes midweek.",
    tone: "secondary",
  },
];

export const shiftReadinessLanes = [
  {
    title: "Demand is explicit",
    detail: "Headcount and required skills are visible before the solver starts assigning people.",
  },
  {
    title: "Templates stay reusable",
    detail: "The week should inherit stable structures, not be rebuilt from loose labels every cycle.",
  },
  {
    title: "Coverage is measurable",
    detail: "Critical windows are clear enough that the schedule can explain why certain assignments matter more.",
  },
] as const;
