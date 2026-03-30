import "server-only";

import { shiftTemplateUpdateSchema, type ShiftTemplateUpdateInput } from "@/lib/contracts/shifts";
import { findShiftTemplateById, updateShiftTemplateRecord } from "@/server/repositories/shift-repo";
import { listSkillsForOrganization } from "@/server/repositories/team-repo";
import { getShiftSnapshot } from "@/server/services/shifts/get-shift-snapshot";

export async function updateShiftTemplate(input: {
  organizationId: string;
  organizationTimezone: string;
  payload: ShiftTemplateUpdateInput;
}) {
  const payload = shiftTemplateUpdateSchema.parse(input.payload);
  const [template, skillRows] = await Promise.all([
    findShiftTemplateById({
      organizationId: input.organizationId,
      templateId: payload.templateId,
    }),
    listSkillsForOrganization(input.organizationId),
  ]);

  if (!template) {
    throw new Error("That shift shape is gone.");
  }

  const validSkillIds = new Set(skillRows.map((skill) => skill.id));
  const invalidSkillId = payload.requiredSkillIds.find((skillId) => !validSkillIds.has(skillId));

  if (invalidSkillId) {
    throw new Error("One of the selected skills is no longer available.");
  }

  await updateShiftTemplateRecord({
    organizationId: input.organizationId,
    templateId: payload.templateId,
    requiredHeadcount: payload.requiredHeadcount,
    requiredSkillIds: payload.requiredSkillIds,
    notes: payload.notes.trim() ? payload.notes.trim() : null,
  });

  return getShiftSnapshot({
    organizationId: input.organizationId,
    organizationTimezone: input.organizationTimezone,
  });
}
