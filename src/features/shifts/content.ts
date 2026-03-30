export type BaselineShiftTemplate = {
  name: string;
  siteSlug: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  requiredHeadcount: number;
  skills: string[];
  note: string;
};

export const BASELINE_SHIFT_TEMPLATES: readonly BaselineShiftTemplate[] = [
  {
    name: "Inbound morning",
    siteSlug: "central-ops",
    dayOfWeek: 1,
    startTime: "06:00:00",
    endTime: "14:00:00",
    requiredHeadcount: 2,
    skills: ["Inbound", "Forklift"],
    note: "Starts the week and keeps the first handoff stable.",
  },
  {
    name: "Packing day",
    siteSlug: "central-ops",
    dayOfWeek: 2,
    startTime: "07:00:00",
    endTime: "15:00:00",
    requiredHeadcount: 2,
    skills: ["Packing"],
    note: "Carries the Tuesday base load.",
  },
  {
    name: "Dispatch swing",
    siteSlug: "field-coverage",
    dayOfWeek: 2,
    startTime: "12:00:00",
    endTime: "20:00:00",
    requiredHeadcount: 2,
    skills: ["Dispatch", "Escalations"],
    note: "Holds the late-day coordination window.",
  },
  {
    name: "Clinical day",
    siteSlug: "central-ops",
    dayOfWeek: 3,
    startTime: "08:00:00",
    endTime: "16:00:00",
    requiredHeadcount: 1,
    skills: ["Clinical"],
    note: "Keeps the midweek specialist load visible.",
  },
  {
    name: "Service swing",
    siteSlug: "field-coverage",
    dayOfWeek: 4,
    startTime: "13:00:00",
    endTime: "21:00:00",
    requiredHeadcount: 2,
    skills: ["Service", "Mentor"],
    note: "Protects the late-week fairness rotation.",
  },
  {
    name: "Night ops",
    siteSlug: "central-ops",
    dayOfWeek: 5,
    startTime: "22:00:00",
    endTime: "06:00:00",
    requiredHeadcount: 2,
    skills: ["Night cover", "Escalations"],
    note: "This is the template that exposes fairness first.",
  },
] as const;
