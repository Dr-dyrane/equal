import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db";
import type { NewAssignment } from "@/db/types";
import { assignments, schedules } from "@/db/schema";

export async function findScheduleForWeek(input: {
  organizationId: string;
  periodStart: string;
  periodEnd: string;
}) {
  const [schedule] = await db
    .select()
    .from(schedules)
    .where(
      and(
        eq(schedules.organizationId, input.organizationId),
        eq(schedules.periodStart, input.periodStart),
        eq(schedules.periodEnd, input.periodEnd),
      ),
    )
    .limit(1);

  return schedule ?? null;
}

export async function findScheduleById(input: {
  scheduleId: string;
  organizationId: string;
}) {
  const [schedule] = await db
    .select()
    .from(schedules)
    .where(
      and(
        eq(schedules.id, input.scheduleId),
        eq(schedules.organizationId, input.organizationId),
      ),
    )
    .limit(1);

  return schedule ?? null;
}

export async function createSchedule(input: {
  organizationId: string;
  userId: string;
  name: string;
  periodStart: string;
  periodEnd: string;
}) {
  const [schedule] = await db
    .insert(schedules)
    .values({
      organizationId: input.organizationId,
      name: input.name,
      periodStart: input.periodStart,
      periodEnd: input.periodEnd,
      createdByUserId: input.userId,
    })
    .returning();

  return schedule;
}

export async function listAssignmentsForSchedule(scheduleId: string) {
  return db
    .select()
    .from(assignments)
    .where(eq(assignments.scheduleId, scheduleId))
    .orderBy(asc(assignments.shiftDate), asc(assignments.startTime));
}

export async function createAssignments(values: NewAssignment[]) {
  if (values.length === 0) {
    return [];
  }

  return db.insert(assignments).values(values).returning();
}

export async function updateAssignment(input: {
  assignmentId: string;
  metadata: Record<string, unknown>;
  fairnessScore?: number | null;
  status?: "proposed" | "confirmed" | "published" | "swapped" | "cancelled";
}) {
  const [assignment] = await db
    .update(assignments)
    .set({
      metadata: input.metadata,
      fairnessScore:
        typeof input.fairnessScore === "number" ? input.fairnessScore : null,
      status: input.status,
      updatedAt: new Date(),
    })
    .where(eq(assignments.id, input.assignmentId))
    .returning();

  return assignment ?? null;
}

export async function updateAssignmentsForSchedule(input: {
  scheduleId: string;
  status: "proposed" | "confirmed" | "published" | "swapped" | "cancelled";
}) {
  await db
    .update(assignments)
    .set({
      status: input.status,
      updatedAt: new Date(),
    })
    .where(eq(assignments.scheduleId, input.scheduleId));
}

export async function updateScheduleRecord(input: {
  scheduleId: string;
  status: "draft" | "published" | "archived";
  publishedByUserId?: string | null;
  publishedAt?: Date | null;
}) {
  const [schedule] = await db
    .update(schedules)
    .set({
      status: input.status,
      publishedByUserId: input.publishedByUserId ?? null,
      publishedAt: input.publishedAt ?? null,
      updatedAt: new Date(),
    })
    .where(eq(schedules.id, input.scheduleId))
    .returning();

  return schedule ?? null;
}
