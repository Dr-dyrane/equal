export type SettingsMetric = {
  label: string;
  value: string;
  detail: string;
};

export type SettingsTaskTone = "primary" | "secondary" | "warning";

export type SettingsTask = {
  title: string;
  detail: string;
  tone: SettingsTaskTone;
};

export type SettingsRuleCard = {
  id: string;
  name: string;
  key: string;
  type: "hard" | "soft" | "informational";
  weight: number;
  enabled: boolean;
  scope: string;
  detail: string;
};

export type SettingsSnapshot = {
  summary: string;
  metrics: SettingsMetric[];
  tasks: SettingsTask[];
  rules: SettingsRuleCard[];
};
