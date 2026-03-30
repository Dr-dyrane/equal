export type ShiftMetric = {
  label: string;
  value: string;
  detail: string;
};

export type ShiftTaskTone = "primary" | "secondary" | "warning";

export type ShiftTask = {
  title: string;
  detail: string;
  tone: ShiftTaskTone;
};

export type ShiftSkillOption = {
  id: string;
  name: string;
};

export type ShiftTemplateCard = {
  id: string;
  name: string;
  dayLabel: string;
  window: string;
  site: string;
  headcount: string;
  headcountValue: number;
  skillIds: string[];
  skills: string[];
  detail: string;
};

export type ShiftSnapshot = {
  summary: string;
  metrics: ShiftMetric[];
  tasks: ShiftTask[];
  templates: ShiftTemplateCard[];
  skillOptions: ShiftSkillOption[];
};
