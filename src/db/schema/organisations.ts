import { sql } from "drizzle-orm";
import { jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const organizationStatusEnum = pgEnum("organization_status", [
  "active",
  "inactive",
]);

export const organizations = pgTable(
  "organisations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    timezone: text("timezone").notNull().default("UTC"),
    status: organizationStatusEnum("status").notNull().default("active"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    slugUnique: uniqueIndex("organisations_slug_unique").on(table.slug),
  }),
);

export const roles = pgTable(
  "roles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organisation_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    key: text("key").notNull(),
    permissions: jsonb("permissions")
      .$type<Record<string, unknown>>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    orgKeyUnique: uniqueIndex("roles_organisation_key_unique").on(
      table.organizationId,
      table.key,
    ),
  }),
);
