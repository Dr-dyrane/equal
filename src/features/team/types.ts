export type TeamMetric = {
  label: string;
  value: string;
  detail: string;
};

export type TeamTaskTone = "primary" | "secondary" | "warning";

export type TeamTask = {
  title: string;
  detail: string;
  tone: TeamTaskTone;
};

export type TeamMemberTone = "primary" | "secondary" | "warning" | "success";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  site: string;
  status: string;
  tone: TeamMemberTone;
  detail: string;
  skills: string[];
};

export type TeamSnapshot = {
  summary: string;
  metrics: TeamMetric[];
  tasks: TeamTask[];
  members: TeamMember[];
};
