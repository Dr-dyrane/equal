import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "@/db/schema/auth";
import { organizations } from "@/db/schema/organisations";
import { sites, teams } from "@/db/schema/teams";

export const ruleTypeEnum = pgEnum("rule_type", ["hard", "soft", "informational"]);

export const rules = pgTable(
  "rules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organisation_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    teamId: uuid("team_id").references(() => teams.id, { onDelete: "set null" }),
    siteId: uuid("site_id").references(() => sites.id, { onDelete: "set null" }),
    name: text("name").notNull(),
    key: text("key").notNull(),
    type: ruleTypeEnum("type").notNull().default("soft"),
    expression: jsonb("expression")
      .$type<Record<string, unknown>>()
      .notNull()
      .default(sql`'{}'::jsonb`),
    weight: integer("weight").notNull().default(50),
    enabled: boolean("enabled").notNull().default(true),
    createdByUserId: uuid("created_by_user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    orgKeyUnique: uniqueIndex("rules_organisation_key_unique").on(
      table.organizationId,
      table.key,
    ),
  }),
);
