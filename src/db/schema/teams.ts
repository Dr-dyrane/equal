import { sql } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "@/db/schema/auth";
import { organizations } from "@/db/schema/organisations";

export const teams = pgTable(
  "teams",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organisation_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    colorToken: text("color_token"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    orgSlugUnique: uniqueIndex("teams_organisation_slug_unique").on(
      table.organizationId,
      table.slug,
    ),
  }),
);

export const sites = pgTable(
  "sites",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organisation_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    timezone: text("timezone").notNull().default("UTC"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    orgSlugUnique: uniqueIndex("sites_organisation_slug_unique").on(
      table.organizationId,
      table.slug,
    ),
  }),
);

export const skills = pgTable(
  "skills",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organisation_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    orgSlugUnique: uniqueIndex("skills_organisation_slug_unique").on(
      table.organizationId,
      table.slug,
    ),
  }),
);

export const userSkills = pgTable(
  "user_skills",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    skillId: uuid("skill_id")
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
    proficiency: integer("proficiency").notNull().default(1),
    verifiedAt: timestamp("verified_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userSkillUnique: uniqueIndex("user_skills_user_skill_unique").on(
      table.userId,
      table.skillId,
    ),
  }),
);

export const preferences = pgTable(
  "preferences",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organisation_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    availability: jsonb("availability")
      .$type<Record<string, unknown>>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    preferredShiftWindows: jsonb("preferred_shift_windows")
      .$type<Record<string, unknown>>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    maxHoursPerWeek: integer("max_hours_per_week"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    orgUserUnique: uniqueIndex("preferences_organisation_user_unique").on(
      table.organizationId,
      table.userId,
    ),
  }),
);
