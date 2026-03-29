import type { SfSymbolName } from "@/components/sf-symbol";

export type RouteOverviewMetric = {
  label: string;
  value: string;
  detail: string;
};

export type RouteOverviewSection = {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
};

export type RouteOverviewTask = {
  title: string;
  detail: string;
  href?: string;
};

export type RouteOverviewAction = {
  href: string;
  label: string;
};

export type RouteOverviewContent = {
  eyebrow: string;
  title: string;
  description: string;
  icon: SfSymbolName;
  primaryAction: RouteOverviewAction;
  secondaryAction?: RouteOverviewAction;
  metrics: RouteOverviewMetric[];
  sections: RouteOverviewSection[];
  tasksTitle: string;
  tasksHeading: string;
  tasks: RouteOverviewTask[];
};
