import type { SfSymbolName } from "@/components/sf-symbol";

export type ShellRouteKey =
  | "workspace"
  | "schedule"
  | "team"
  | "shifts"
  | "analytics"
  | "settings"
  | "onboarding";

export type ShellRouteMeta = {
  key: ShellRouteKey;
  href: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: SfSymbolName;
  matchPrefix: string;
  nav: boolean;
};

export const shellRoutes: ShellRouteMeta[] = [
  {
    key: "workspace",
    href: "/workspace",
    label: "Workspace",
    shortLabel: "Home",
    description: "Overview, readiness, and what the product should do next.",
    icon: "house-fill",
    matchPrefix: "/workspace",
    nav: false,
  },
  {
    key: "schedule",
    href: "/schedule",
    label: "Schedule",
    shortLabel: "Schedule",
    description: "Build, review, and publish the week without losing fairness context.",
    icon: "calendar-circle-fill",
    matchPrefix: "/schedule",
    nav: true,
  },
  {
    key: "team",
    href: "/team",
    label: "Team",
    shortLabel: "Team",
    description: "People, skills, availability, and the signals the schedule depends on.",
    icon: "person-2-fill",
    matchPrefix: "/team",
    nav: true,
  },
  {
    key: "shifts",
    href: "/shifts",
    label: "Shifts",
    shortLabel: "Shifts",
    description: "Templates, demand, and coverage patterns that shape the roster.",
    icon: "square-grid-2x2-fill",
    matchPrefix: "/shifts",
    nav: true,
  },
  {
    key: "analytics",
    href: "/analytics",
    label: "Analytics",
    shortLabel: "Insights",
    description: "Fairness, coverage, and compliance signals that explain the output.",
    icon: "chart-bar-fill",
    matchPrefix: "/analytics",
    nav: true,
  },
  {
    key: "settings",
    href: "/settings",
    label: "Settings",
    shortLabel: "Settings",
    description: "Rules, roles, integrations, and organization-level controls.",
    icon: "gearshape-fill",
    matchPrefix: "/settings",
    nav: true,
  },
  {
    key: "onboarding",
    href: "/onboarding",
    label: "Setup",
    shortLabel: "Setup",
    description: "Stand up the organization, define rules, and prepare the first cycle.",
    icon: "sparkles",
    matchPrefix: "/onboarding",
    nav: false,
  },
];

export const primaryNavigation = shellRoutes.filter((item) => item.nav);

export function isNavActive(pathname: string, item: ShellRouteMeta) {
  return pathname === item.href || pathname.startsWith(`${item.matchPrefix}/`);
}

export function getCurrentRoute(pathname: string) {
  return shellRoutes.find((item) => isNavActive(pathname, item)) ?? shellRoutes[0];
}

export function getCurrentSection(pathname: string) {
  return getCurrentRoute(pathname).label;
}
