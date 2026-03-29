import type { ScheduleDay } from "@/features/roster-builder/content";

export type RosterStage = "draft" | "reviewing" | "ready" | "published";

export type ScheduleSnapshot = {
  scheduleId: string;
  stage: RosterStage;
  unresolvedConflictCount: number;
  decisionPerson: string;
  days: ScheduleDay[];
};
