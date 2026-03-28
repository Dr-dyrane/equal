import { sql } from "drizzle-orm";
import {
  date,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "@/db/schema/auth";
import { organizations } from "@/db/schema/organisations";
import { schedules } from "@/db/schema/scheduling";

export const fairnessLedger = pgTable(
  "fairness_ledger",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organisation_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    scheduleId: uuid("schedule_id").references(() => schedules.id, {
      onDelete: "set null",
    }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    metric: text("metric").notNull(),
    value: integer("value").notNull(),
    delta: integer("delta"),
    periodStart: date("period_start"),
    periodEnd: date("period_end"),
    details: jsonb("details")
      .$type<Record<string, unknown>>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userRecordedAtIndex: index("fairness_ledger_user_recorded_at_index").on(
      table.userId,
      table.recordedAt,
    ),
  }),
);

export const auditLog = pgTable("audit_log", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organisation_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  actorUserId: uuid("actor_user_id").references(() => users.id, {
    onDelete: "set null",
  }),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  action: text("action").notNull(),
  before: jsonb("before")
    .$type<Record<string, unknown>>()
    .notNull()
    .default(sql`'{}'::jsonb`),
  after: jsonb("after")
    .$type<Record<string, unknown>>()
    .notNull()
    .default(sql`'{}'::jsonb`),
  reason: text("reason"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
