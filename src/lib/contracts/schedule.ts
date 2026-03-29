import { z } from "zod";

export const scheduleStateActionSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("generate"),
    scheduleId: z.string().uuid(),
  }),
  z.object({
    action: z.literal("apply"),
    scheduleId: z.string().uuid(),
    person: z.string().min(1),
  }),
  z.object({
    action: z.literal("publish"),
    scheduleId: z.string().uuid(),
  }),
]);

export type ScheduleStateActionInput = z.infer<typeof scheduleStateActionSchema>;
