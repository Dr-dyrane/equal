import "server-only";

import type { Assignment, Schedule } from "@/db/types";
import {
  getScheduleDays,
  getScheduleDecisionState,
  SCHEDULE_DECISION_DEFAULT_PERSON,
  SCHEDULE_DECISION_SHIFT_ID,
} from "@/features/roster-builder/content";
import type {
  RosterStage,
  ScheduleSnapshot,
} from "@/features/roster-builder/types";
import {
  createAssignments,
  createSchedule,
  findScheduleById,
  findScheduleForWeek,
  listAssignmentsForSchedule,
} from "@/server/repositories/schedule-repo";

const ACTIVE_SCHEDULE_PERIOD = {
  name: "Week of March 31",
  periodStart: "2025-03-31",
  periodEnd: "2025-04-04",
} as const;

const DAY_ISO_BY_LABEL: Record<string, string> = {
  Monday: "2025-03-31",
  Tuesday: "2025-04-01",
  Wednesday: "2025-04-02",
  Thursday: "2025-04-03",
  Friday: "2025-04-04",
};

type AssignmentMetadata = {
  shiftKey?: string;
  personName?: string;
  workflowStage?: RosterStage;
};

function getAssignmentFreshness(assignment: Assignment) {
  const updatedAt = assignment.updatedAt ?? assignment.createdAt;
  return updatedAt instanceof Date ? updatedAt.getTime() : 0;
}

function parseShiftTimeRange(value: string) {
  const [startTime, endTime] = value.split("-").map((part) => part.trim());

  return {
    startTime,
    endTime,
  };
}

function readAssignmentMetadata(assignment: Assignment): AssignmentMetadata {
  const metadata = assignment.metadata ?? {};

  return {
    shiftKey:
      typeof metadata.shiftKey === "string" ? metadata.shiftKey : undefined,
    personName:
      typeof metadata.personName === "string" ? metadata.personName : undefined,
    workflowStage:
      metadata.workflowStage === "draft" ||
      metadata.workflowStage === "reviewing" ||
      metadata.workflowStage === "ready" ||
      metadata.workflowStage === "published"
        ? metadata.workflowStage
        : undefined,
  };
}

async function ensureScheduleSeed(input: {
  organizationId: string;
  userId: string;
}) {
  let schedule =
    (await findScheduleForWeek({
      organizationId: input.organizationId,
      periodStart: ACTIVE_SCHEDULE_PERIOD.periodStart,
      periodEnd: ACTIVE_SCHEDULE_PERIOD.periodEnd,
    })) ??
    (await createSchedule({
      organizationId: input.organizationId,
      userId: input.userId,
      name: ACTIVE_SCHEDULE_PERIOD.name,
      periodStart: ACTIVE_SCHEDULE_PERIOD.periodStart,
      periodEnd: ACTIVE_SCHEDULE_PERIOD.periodEnd,
    }));

  let existingAssignments = await listAssignmentsForSchedule(schedule.id);

  if (existingAssignments.length === 0) {
    const blueprint = getScheduleDays(
      "Tuesday",
      SCHEDULE_DECISION_DEFAULT_PERSON,
    );

    await createAssignments(
      blueprint.flatMap((day) =>
        day.shifts.map((shift) => {
          const { startTime, endTime } = parseShiftTimeRange(shift.time);
          const metadata: AssignmentMetadata = {
            shiftKey: shift.id,
            personName: shift.person,
          };

          if (shift.id === SCHEDULE_DECISION_SHIFT_ID) {
            metadata.workflowStage = "reviewing";
          }

          return {
            scheduleId: schedule.id,
            organizationId: input.organizationId,
            shiftDate: DAY_ISO_BY_LABEL[day.day],
            startTime,
            endTime,
            roleLabel: shift.role,
            fairnessScore:
              shift.id === SCHEDULE_DECISION_SHIFT_ID ? 938 : null,
            metadata,
          };
        }),
      ),
    );

    existingAssignments = await listAssignmentsForSchedule(schedule.id);
  }

  return {
    schedule,
    assignments: existingAssignments,
  };
}

function buildSnapshot(input: {
  schedule: Schedule;
  assignments: Assignment[];
}): ScheduleSnapshot {
  const assignmentByShiftKey = new Map<
    string,
    {
      assignmentId: string;
      personName?: string;
      workflowStage?: RosterStage;
      freshness: number;
    }
  >();

  for (const assignment of input.assignments) {
    const metadata = readAssignmentMetadata(assignment);
    const existing = metadata.shiftKey
      ? assignmentByShiftKey.get(metadata.shiftKey)
      : undefined;

    if (
      metadata.shiftKey &&
      (!existing || getAssignmentFreshness(assignment) >= existing.freshness)
    ) {
      assignmentByShiftKey.set(metadata.shiftKey, {
        assignmentId: assignment.id,
        personName: metadata.personName,
        workflowStage: metadata.workflowStage,
        freshness: getAssignmentFreshness(assignment),
      });
    }
  }

  const decisionRecord = assignmentByShiftKey.get(SCHEDULE_DECISION_SHIFT_ID);
  const decisionPerson =
    decisionRecord?.personName ?? SCHEDULE_DECISION_DEFAULT_PERSON;
  const decisionState = getScheduleDecisionState(decisionPerson);
  const stage: RosterStage =
    input.schedule.status === "published"
      ? "published"
      : decisionRecord?.workflowStage ??
        (decisionState.resolved ? "ready" : "reviewing");

  const days = getScheduleDays("Tuesday", decisionPerson).map((day) => ({
    ...day,
    shifts: day.shifts.map((shift) => ({
      ...shift,
      person: assignmentByShiftKey.get(shift.id)?.personName ?? shift.person,
    })),
  }));

  return {
    scheduleId: input.schedule.id,
    stage,
    unresolvedConflictCount: decisionState.resolved ? 0 : 1,
    decisionPerson,
    days,
  };
}

export async function getScheduleSnapshot(input: {
  organizationId: string;
  userId: string;
}): Promise<ScheduleSnapshot> {
  const seeded = await ensureScheduleSeed(input);
  return buildSnapshot(seeded);
}

export async function getScheduleSnapshotById(input: {
  organizationId: string;
  scheduleId: string;
}) {
  const schedule = await findScheduleById(input);

  if (!schedule) {
    return null;
  }

  const assignmentRows = await listAssignmentsForSchedule(schedule.id);

  return buildSnapshot({
    schedule,
    assignments: assignmentRows,
  });
}
