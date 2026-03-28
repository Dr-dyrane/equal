import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  assignments,
  auditLog,
  fairnessLedger,
  invites,
  memberships,
  organizations,
  preferences,
  roles,
  rules,
  schedules,
  sessions,
  shiftTemplates,
  sites,
  skills,
  teams,
  userSkills,
  users,
} from "@/db/schema";

export type Organization = InferSelectModel<typeof organizations>;
export type NewOrganization = InferInsertModel<typeof organizations>;

export type Role = InferSelectModel<typeof roles>;
export type NewRole = InferInsertModel<typeof roles>;

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Membership = InferSelectModel<typeof memberships>;
export type NewMembership = InferInsertModel<typeof memberships>;

export type Invite = InferSelectModel<typeof invites>;
export type NewInvite = InferInsertModel<typeof invites>;

export type Session = InferSelectModel<typeof sessions>;
export type NewSession = InferInsertModel<typeof sessions>;

export type Team = InferSelectModel<typeof teams>;
export type NewTeam = InferInsertModel<typeof teams>;

export type Site = InferSelectModel<typeof sites>;
export type NewSite = InferInsertModel<typeof sites>;

export type Skill = InferSelectModel<typeof skills>;
export type NewSkill = InferInsertModel<typeof skills>;

export type UserSkill = InferSelectModel<typeof userSkills>;
export type NewUserSkill = InferInsertModel<typeof userSkills>;

export type Preference = InferSelectModel<typeof preferences>;
export type NewPreference = InferInsertModel<typeof preferences>;

export type ShiftTemplate = InferSelectModel<typeof shiftTemplates>;
export type NewShiftTemplate = InferInsertModel<typeof shiftTemplates>;

export type Schedule = InferSelectModel<typeof schedules>;
export type NewSchedule = InferInsertModel<typeof schedules>;

export type Assignment = InferSelectModel<typeof assignments>;
export type NewAssignment = InferInsertModel<typeof assignments>;

export type Rule = InferSelectModel<typeof rules>;
export type NewRule = InferInsertModel<typeof rules>;

export type FairnessLedgerEntry = InferSelectModel<typeof fairnessLedger>;
export type NewFairnessLedgerEntry = InferInsertModel<typeof fairnessLedger>;

export type AuditLogEntry = InferSelectModel<typeof auditLog>;
export type NewAuditLogEntry = InferInsertModel<typeof auditLog>;
