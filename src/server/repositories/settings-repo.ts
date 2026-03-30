import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import type { NewRule } from "@/db/types";
import { auditLog, roles, rules } from "@/db/schema";

export async function listRulesForOrganization(organizationId: string) {
  return db
    .select()
    .from(rules)
    .where(eq(rules.organizationId, organizationId))
    .orderBy(asc(rules.type), asc(rules.createdAt));
}

export async function createRules(values: NewRule[]) {
  if (values.length === 0) {
    return [];
  }

  return db.insert(rules).values(values).returning();
}

export async function findRuleById(input: {
  organizationId: string;
  ruleId: string;
}) {
  const [rule] = await db
    .select()
    .from(rules)
    .where(and(eq(rules.organizationId, input.organizationId), eq(rules.id, input.ruleId)))
    .limit(1);

  return rule ?? null;
}

export async function updateRuleEnabledState(input: {
  organizationId: string;
  ruleId: string;
  enabled: boolean;
}) {
  const [rule] = await db
    .update(rules)
    .set({
      enabled: input.enabled,
      updatedAt: new Date(),
    })
    .where(and(eq(rules.organizationId, input.organizationId), eq(rules.id, input.ruleId)))
    .returning();

  return rule ?? null;
}

export async function listRolesForOrganization(organizationId: string) {
  return db.select().from(roles).where(eq(roles.organizationId, organizationId));
}

export async function listRecentAuditLogForOrganization(organizationId: string) {
  return db
    .select()
    .from(auditLog)
    .where(eq(auditLog.organizationId, organizationId))
    .orderBy(desc(auditLog.createdAt))
    .limit(10);
}
