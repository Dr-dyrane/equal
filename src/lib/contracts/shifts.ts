import { z } from "zod";

export const shiftTemplateUpdateSchema = z.object({
  templateId: z.string().uuid(),
  requiredHeadcount: z.number().int().min(1).max(6),
  requiredSkillIds: z.array(z.string().uuid()).min(1, "Pick at least one skill."),
  notes: z.string().trim().max(240).optional().default(""),
});

export type ShiftTemplateUpdateInput = z.infer<typeof shiftTemplateUpdateSchema>;
