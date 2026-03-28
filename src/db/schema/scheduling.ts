import { sql } from "drizzle-orm";
import {
  date,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uniqueIndex,
  uuid,
  index,
} from "drizzle-orm/pg-core";
import { users } from "@/db/schema/auth";
import { organizations } from "@/db/schema/organisations";
import { sites, teams } from "@/db/schema/teams";

export const scheduleStatusEnum = pgEnum("schedule_status", [
  "draft",
  "published",
  "archived",
]);

export const assignmentStatusEnum = pgEnum("assignment_status", [
  "proposed",
  "confirmed",
  "published",
  "swapped",
  "cancelled",
]);

export const shiftTemplates = pgTable("shift_templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organisation_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  teamId: uuid("team_id").references(() => teams.id, { onDelete: "set null" }),
  siteId: uuid("site_id").references(() => sites.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  dayOfWeek: integer("day_of_week").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  requiredSkillIds: jsonb("required_skill_ids")
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  requiredHeadcount: integer("required_headcount").notNull().default(1),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const schedules = pgTable(
  "schedules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organisation_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    teamId: uuid("team_id").references(() => teams.id, { onDelete: "set null" }),
    siteId: uuid("site_id").references(() => sites.id, { onDelete: "set null" }),
    name: text("name").notNull(),
    status: scheduleStatusEnum("status").notNull().default("draft"),
    periodStart: date("period_start").notNull(),
    periodEnd: date("period_end").notNull(),
    createdByUserId: uuid("created_by_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    publishedByUserId: uuid("published_by_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    orgPeriodUnique: uniqueIndex("schedules_organisation_period_unique").on(
      table.organizationId,
      table.periodStart,
      table.periodEnd,
    ),
    orgPeriodIndex: index("schedules_org_period_index").on(
      table.organizationId,
      table.periodStart,
      table.periodEnd,
    ),
  }),
);

export const assignments = pgTable(
  "assignments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    scheduleId: uuid("schedule_id")
      .notNull()
      .references(() => schedules.id, { onDelete: "cascade" }),
    organizationId: uuid("organisation_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    shiftTemplateId: uuid("shift_template_id").references(() => shiftTemplates.id, {
      onDelete: "set null",
    }),
    teamId: uuid("team_id").references(() => teams.id, { onDelete: "set null" }),
    siteId: uuid("site_id").references(() => sites.id, { onDelete: "set null" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    shiftDate: date("shift_date").notNull(),
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    roleLabel: text("role_label"),
    requiredSkillIds: jsonb("required_skill_ids")
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'::jsonb`),
    status: assignmentStatusEnum("status").notNull().default("proposed"),
    fatigueScore: integer("fatigue_score"),
    fairnessScore: integer("fairness_score"),
    metadata: jsonb("metadata")
      .$type<Record<string, unknown>>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userDateIndex: index("assignments_user_date_index").on(table.userId, table.shiftDate),
    scheduleDateIndex: index("assignments_schedule_date_index").on(
      table.scheduleId,
      table.shiftDate,
    ),
  }),
);
