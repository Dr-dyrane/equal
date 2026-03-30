import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db";
import type { NewShiftTemplate } from "@/db/types";
import { shiftTemplates } from "@/db/schema";

export async function listShiftTemplatesForOrganization(organizationId: string) {
  return db
    .select()
    .from(shiftTemplates)
    .where(eq(shiftTemplates.organizationId, organizationId))
    .orderBy(asc(shiftTemplates.dayOfWeek), asc(shiftTemplates.startTime));
}

export async function createShiftTemplates(values: NewShiftTemplate[]) {
  if (values.length === 0) {
    return [];
  }

  return db.insert(shiftTemplates).values(values).returning();
}

export async function findShiftTemplateById(input: {
  organizationId: string;
  templateId: string;
}) {
  const [template] = await db
    .select()
    .from(shiftTemplates)
    .where(
      and(
        eq(shiftTemplates.organizationId, input.organizationId),
        eq(shiftTemplates.id, input.templateId),
      ),
    )
    .limit(1);

  return template ?? null;
}

export async function updateShiftTemplateRecord(input: {
  organizationId: string;
  templateId: string;
  requiredHeadcount: number;
  requiredSkillIds: string[];
  notes: string | null;
}) {
  const [template] = await db
    .update(shiftTemplates)
    .set({
      requiredHeadcount: input.requiredHeadcount,
      requiredSkillIds: input.requiredSkillIds,
      notes: input.notes,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(shiftTemplates.organizationId, input.organizationId),
        eq(shiftTemplates.id, input.templateId),
      ),
    )
    .returning();

  return template ?? null;
}
