import "server-only";

import {
  getScheduleAssignmentOptions,
  getScheduleDecisionState,
  SCHEDULE_DECISION_DEFAULT_PERSON,
  SCHEDULE_DECISION_SHIFT_ID,
} from "@/features/roster-builder/content";
import type { ScheduleStateActionInput } from "@/lib/contracts/schedule";
import {
  findScheduleById,
  listAssignmentsForSchedule,
  updateAssignment,
  updateAssignmentsForSchedule,
  updateScheduleRecord,
} from "@/server/repositories/schedule-repo";
import { getScheduleSnapshotById } from "@/server/services/schedule/get-schedule-snapshot";

function getAssignmentFreshness(
  assignment: Awaited<ReturnType<typeof listAssignmentsForSchedule>>[number],
) {
  const updatedAt = assignment.updatedAt ?? assignment.createdAt;
  return updatedAt instanceof Date ? updatedAt.getTime() : 0;
}

function readEditableAssignments(
  assignments: Awaited<ReturnType<typeof listAssignmentsForSchedule>>,
) {
  return assignments
    .filter((assignment) => assignment.metadata?.shiftKey === SCHEDULE_DECISION_SHIFT_ID)
    .sort((left, right) => getAssignmentFreshness(right) - getAssignmentFreshness(left));
}

export async function mutateScheduleState(input: {
  organizationId: string;
  userId: string;
  action: ScheduleStateActionInput;
}) {
  const schedule = await findScheduleById({
    scheduleId: input.action.scheduleId,
    organizationId: input.organizationId,
  });

  if (!schedule) {
    throw new Error("Schedule not found.");
  }

  const assignmentRows = await listAssignmentsForSchedule(schedule.id);
  const editableAssignments = readEditableAssignments(assignmentRows);
  const editableAssignment = editableAssignments[0];

  if (!editableAssignment) {
    throw new Error("Editable schedule decision was not found.");
  }

  if (input.action.action === "generate") {
    for (const assignment of editableAssignments) {
      await updateAssignment({
        assignmentId: assignment.id,
        fairnessScore: 938,
        status: "proposed",
        metadata: {
          ...assignment.metadata,
          shiftKey: SCHEDULE_DECISION_SHIFT_ID,
          personName: SCHEDULE_DECISION_DEFAULT_PERSON,
          workflowStage: "draft",
        },
      });
    }

    await updateScheduleRecord({
      scheduleId: schedule.id,
      status: "draft",
      publishedAt: null,
      publishedByUserId: null,
    });

    await updateAssignmentsForSchedule({
      scheduleId: schedule.id,
      status: "proposed",
    });
  }

  if (input.action.action === "apply") {
    const person = input.action.person.trim();
    const option = getScheduleAssignmentOptions(
      SCHEDULE_DECISION_SHIFT_ID,
      SCHEDULE_DECISION_DEFAULT_PERSON,
    ).find((item) => item.person === person);

    if (!option) {
      throw new Error("That assignment choice is not available.");
    }

    const decision = getScheduleDecisionState(person);
    const fairnessScore = Number.parseInt(
      decision.fairness.replace(".", ""),
      10,
    );

    for (const assignment of editableAssignments) {
      await updateAssignment({
        assignmentId: assignment.id,
        fairnessScore: Number.isNaN(fairnessScore) ? null : fairnessScore,
        status: "proposed",
        metadata: {
          ...assignment.metadata,
          shiftKey: SCHEDULE_DECISION_SHIFT_ID,
          personName: decision.person,
          workflowStage: decision.resolved ? "ready" : "reviewing",
        },
      });
    }

    await updateScheduleRecord({
      scheduleId: schedule.id,
      status: "draft",
      publishedAt: null,
      publishedByUserId: null,
    });
  }

  if (input.action.action === "publish") {
    const currentPerson =
      typeof editableAssignment.metadata?.personName === "string"
        ? editableAssignment.metadata.personName
        : SCHEDULE_DECISION_DEFAULT_PERSON;
    const decision = getScheduleDecisionState(currentPerson);

    if (!decision.resolved) {
      throw new Error("Review Tuesday night before publishing.");
    }

    await updateScheduleRecord({
      scheduleId: schedule.id,
      status: "published",
      publishedAt: new Date(),
      publishedByUserId: input.userId,
    });

    await updateAssignmentsForSchedule({
      scheduleId: schedule.id,
      status: "published",
    });
  }

  const snapshot = await getScheduleSnapshotById({
    organizationId: input.organizationId,
    scheduleId: schedule.id,
  });

  if (!snapshot) {
    throw new Error("Updated schedule could not be loaded.");
  }

  return snapshot;
}
