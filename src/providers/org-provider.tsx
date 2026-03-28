"use client";

import { createContext, useContext } from "react";
import { type AppRole, useAuth } from "@/providers/auth-provider";
import { usePersistentState } from "@/providers/use-persistent-state";

type Organization = {
  id: string;
  name: string;
  timezone: string;
};

type WorkspaceTarget = {
  id: string;
  name: string;
};

type Permission =
  | "schedule.generate"
  | "schedule.publish"
  | "schedule.swap.review"
  | "team.manage"
  | "rules.manage"
  | "analytics.view"
  | "settings.manage"
  | "billing.manage";

type OrgContextValue = {
  organization: Organization;
  activeSite: WorkspaceTarget;
  activeTeam: WorkspaceTarget;
  role: AppRole;
  permissions: Permission[];
  isDemoContext: boolean;
  setActiveSite: (siteId: string) => void;
  setActiveTeam: (teamId: string) => void;
  can: (permission: Permission) => boolean;
};

const DEFAULT_ORGANIZATION: Organization = {
  id: "equal-demo",
  name: "Equal Ops",
  timezone: "America/New_York",
};

const SITES: WorkspaceTarget[] = [
  { id: "central-ops", name: "Central Ops" },
  { id: "north-hub", name: "North Hub" },
];

const TEAMS: WorkspaceTarget[] = [
  { id: "core-scheduling", name: "Core Scheduling" },
  { id: "field-coverage", name: "Field Coverage" },
];

const PERMISSIONS_BY_ROLE: Record<AppRole, Permission[]> = {
  owner: [
    "schedule.generate",
    "schedule.publish",
    "schedule.swap.review",
    "team.manage",
    "rules.manage",
    "analytics.view",
    "settings.manage",
    "billing.manage",
  ],
  admin: [
    "schedule.generate",
    "schedule.publish",
    "schedule.swap.review",
    "team.manage",
    "rules.manage",
    "analytics.view",
    "settings.manage",
  ],
  scheduler: [
    "schedule.generate",
    "schedule.publish",
    "schedule.swap.review",
    "analytics.view",
  ],
  staff: ["analytics.view"],
  observer: ["analytics.view"],
};

const OrgContext = createContext<OrgContextValue | null>(null);

export function OrgProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [activeSiteId, setActiveSiteId] = usePersistentState(
    "equal.org.active-site",
    SITES[0].id,
  );
  const [activeTeamId, setActiveTeamId] = usePersistentState(
    "equal.org.active-team",
    TEAMS[0].id,
  );

  const role = user?.role ?? "scheduler";
  const permissions = PERMISSIONS_BY_ROLE[role];
  const activeSite =
    SITES.find((site) => site.id === activeSiteId) ?? SITES[0];
  const activeTeam =
    TEAMS.find((team) => team.id === activeTeamId) ?? TEAMS[0];

  return (
    <OrgContext.Provider
      value={{
        organization: DEFAULT_ORGANIZATION,
        activeSite,
        activeTeam,
        role,
        permissions,
        isDemoContext: !user,
        setActiveSite: setActiveSiteId,
        setActiveTeam: setActiveTeamId,
        can: (permission) => permissions.includes(permission),
      }}
    >
      {children}
    </OrgContext.Provider>
  );
}

export function useOrg() {
  const context = useContext(OrgContext);

  if (!context) {
    throw new Error("useOrg must be used within an OrgProvider.");
  }

  return context;
}
