import type { AuthMode } from "@/lib/contracts/auth";

export type AppRole =
  | "owner"
  | "admin"
  | "scheduler"
  | "staff"
  | "observer";

export type AppPermission =
  | "schedule.generate"
  | "schedule.publish"
  | "schedule.swap.review"
  | "team.manage"
  | "rules.manage"
  | "analytics.view"
  | "settings.manage"
  | "billing.manage";

export const PERMISSIONS_BY_ROLE: Record<AppRole, AppPermission[]> = {
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

export type AppUser = {
  id: string;
  email: string;
  name: string;
  role: AppRole;
};

export type AppOrganization = {
  id: string;
  name: string;
  timezone: string;
};

export type AppSession = {
  sessionId: string;
  user: AppUser;
  organization: AppOrganization;
  permissions: AppPermission[];
  activeTeamId?: string | null;
  activeSiteId?: string | null;
  issuedAt: string;
  expiresAt: string;
};

export type MagicLinkTokenClaims = {
  type: "magic-link";
  mode: AuthMode;
  email: string;
  name?: string;
  redirectTo: string;
};

export type SessionTokenClaims = {
  type: "session";
  sessionId: string;
  userId: string;
  organizationId: string;
  role: AppRole;
  permissions: AppPermission[];
  activeTeamId?: string;
  activeSiteId?: string;
};
