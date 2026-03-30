import { and, asc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import type {
  NewMembership,
  NewPreference,
  NewSite,
  NewSkill,
  NewTeam,
  NewUser,
  NewUserSkill,
} from "@/db/types";
import {
  memberships,
  preferences,
  roles,
  sites,
  skills,
  teams,
  userSkills,
  users,
} from "@/db/schema";

export async function listTeamsForOrganization(organizationId: string) {
  return db
    .select()
    .from(teams)
    .where(eq(teams.organizationId, organizationId))
    .orderBy(asc(teams.createdAt));
}

export async function createTeams(values: NewTeam[]) {
  if (values.length === 0) {
    return [];
  }

  return db.insert(teams).values(values).returning();
}

export async function listSitesForOrganization(organizationId: string) {
  return db
    .select()
    .from(sites)
    .where(eq(sites.organizationId, organizationId))
    .orderBy(asc(sites.createdAt));
}

export async function createSites(values: NewSite[]) {
  if (values.length === 0) {
    return [];
  }

  return db.insert(sites).values(values).returning();
}

export async function listSkillsForOrganization(organizationId: string) {
  return db
    .select()
    .from(skills)
    .where(eq(skills.organizationId, organizationId))
    .orderBy(asc(skills.createdAt));
}

export async function createSkills(values: NewSkill[]) {
  if (values.length === 0) {
    return [];
  }

  return db.insert(skills).values(values).returning();
}

export async function findUsersByEmails(emails: string[]) {
  if (emails.length === 0) {
    return [];
  }

  return db.select().from(users).where(inArray(users.email, emails));
}

export async function createUsers(values: NewUser[]) {
  if (values.length === 0) {
    return [];
  }

  return db.insert(users).values(values).returning();
}

export async function listMembersForOrganization(organizationId: string) {
  return db
    .select({
      user: users,
      membership: memberships,
      role: roles,
    })
    .from(memberships)
    .innerJoin(users, eq(memberships.userId, users.id))
    .leftJoin(roles, eq(memberships.roleId, roles.id))
    .where(
      and(
        eq(memberships.organizationId, organizationId),
        eq(memberships.status, "active"),
      ),
    )
    .orderBy(asc(memberships.createdAt));
}

export async function createMemberships(values: NewMembership[]) {
  if (values.length === 0) {
    return [];
  }

  return db.insert(memberships).values(values).returning();
}

export async function listPreferencesForOrganization(organizationId: string) {
  return db
    .select()
    .from(preferences)
    .where(eq(preferences.organizationId, organizationId))
    .orderBy(asc(preferences.createdAt));
}

export async function createPreferences(values: NewPreference[]) {
  if (values.length === 0) {
    return [];
  }

  return db.insert(preferences).values(values).returning();
}

export async function listUserSkillsForOrganization(organizationId: string) {
  return db
    .select({
      userSkill: userSkills,
      skill: skills,
    })
    .from(userSkills)
    .innerJoin(skills, eq(userSkills.skillId, skills.id))
    .where(eq(skills.organizationId, organizationId))
    .orderBy(asc(skills.name));
}

export async function createUserSkills(values: NewUserSkill[]) {
  if (values.length === 0) {
    return [];
  }

  return db.insert(userSkills).values(values).returning();
}
