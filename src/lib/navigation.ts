import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CalendarRange,
  LayoutDashboard,
  Settings2,
  Shapes,
  UsersRound,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  matchPrefix: string;
  description: string;
};

export const primaryNavigation: NavItem[] = [
  {
    href: "/workspace",
    label: "Overview",
    shortLabel: "Overview",
    icon: LayoutDashboard,
    matchPrefix: "/workspace",
    description: "Cross-module status and startup progress.",
  },
  {
    href: "/schedule",
    label: "Schedule",
    shortLabel: "Schedule",
    icon: CalendarRange,
    matchPrefix: "/schedule",
    description: "Generate, review, and publish rosters.",
  },
  {
    href: "/team",
    label: "Team",
    shortLabel: "Team",
    icon: UsersRound,
    matchPrefix: "/team",
    description: "Profiles, skills, and preferences.",
  },
  {
    href: "/shifts",
    label: "Shifts",
    shortLabel: "Shifts",
    icon: Shapes,
    matchPrefix: "/shifts",
    description: "Templates, coverage, and demand planning.",
  },
  {
    href: "/analytics",
    label: "Analytics",
    shortLabel: "Analytics",
    icon: BarChart3,
    matchPrefix: "/analytics",
    description: "Fairness, coverage, and compliance insights.",
  },
  {
    href: "/settings",
    label: "Settings",
    shortLabel: "Settings",
    icon: Settings2,
    matchPrefix: "/settings",
    description: "Roles, rules, integrations, and billing.",
  },
];

export function isNavActive(pathname: string, item: NavItem) {
  return pathname.startsWith(item.matchPrefix);
}

export function getCurrentSection(pathname: string) {
  return (
    primaryNavigation.find((item) => isNavActive(pathname, item))?.label ??
    "Workspace"
  );
}
