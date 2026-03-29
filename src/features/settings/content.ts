export type SettingsMetric = {
  label: string;
  value: string;
  detail: string;
};

export type SettingsSignal = {
  title: string;
  detail: string;
  tone: "primary" | "secondary" | "warning";
};

export const settingsMetrics: SettingsMetric[] = [
  {
    label: "Rule sets",
    value: "18",
    detail: "Hard constraints and weighted fairness logic are both visible here.",
  },
  {
    label: "Role profiles",
    value: "05",
    detail: "Owners, admins, schedulers, staff, and observers stay within clear boundaries.",
  },
  {
    label: "Integration slots",
    value: "03",
    detail: "Payroll, HRIS, and messaging can connect without owning the product model.",
  },
];

export const settingsSignals: SettingsSignal[] = [
  {
    title: "Recovery windows still set the floor",
    detail: "Legal rest and approved leave must remain hard constraints even when demand gets noisy.",
    tone: "warning",
  },
  {
    title: "Role boundaries are mostly healthy",
    detail: "Schedulers can move quickly without opening sensitive organization controls.",
    tone: "primary",
  },
  {
    title: "Integrations should stay downstream",
    detail: "External systems should support the workflow, not twist the core scheduling model.",
    tone: "secondary",
  },
];

export const settingsSections = [
  {
    title: "Rules stay explainable",
    detail: "Separate hard limits from soft fairness weights so the week can be defended before it is published.",
  },
  {
    title: "Permissions stay intentional",
    detail: "People should only see and change what their role actually owns, no matter the device or route.",
  },
  {
    title: "Audit stays visible",
    detail: "When someone asks why the week changed, the trail should be easy to find without leaving the product.",
  },
] as const;
