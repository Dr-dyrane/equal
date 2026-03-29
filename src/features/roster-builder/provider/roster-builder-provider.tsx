"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import {
  getScheduleAssignmentOptions,
  getScheduleDecisionState,
  SCHEDULE_DECISION_SHIFT_ID,
  type ScheduleAssignmentOption,
  type ScheduleDay,
  type ScheduleShift,
} from "@/features/roster-builder/content";
import type {
  RosterStage,
  ScheduleSnapshot,
} from "@/features/roster-builder/types";
import { useGlobalActions } from "@/providers/global-actions-provider";

type SelectedScheduleShift = ScheduleShift & {
  day: string;
  date: string;
  summary: string;
};

type RosterBuilderContextValue = {
  days: ScheduleDay[];
  selectedDay: string;
  selectedAssignmentId: string | null;
  selectedShift: SelectedScheduleShift | null;
  selectedPreviewPerson: string | null;
  selectedOptions: readonly ScheduleAssignmentOption[];
  selectedShiftEditable: boolean;
  selectedShiftPreview: ReturnType<typeof getScheduleDecisionState> | null;
  draggedAssignmentId: string | null;
  unresolvedConflictCount: number;
  hasUnsavedChanges: boolean;
  stage: RosterStage;
  selectDay: (day: string) => void;
  selectAssignment: (assignmentId: string | null) => void;
  setSelectedPreviewPerson: (person: string | null) => void;
  closeShiftEditor: () => void;
  applySelectedAssignment: () => Promise<void>;
  setDraggedAssignmentId: (assignmentId: string | null) => void;
  reviewConflicts: () => void;
  generateDraft: () => Promise<void>;
  publishRoster: () => Promise<void>;
};

const RosterBuilderContext = createContext<RosterBuilderContextValue | null>(
  null,
);

export function RosterBuilderProvider({
  children,
  initialSnapshot,
}: {
  children: React.ReactNode;
  initialSnapshot: ScheduleSnapshot;
}) {
  const { registerActions, unregisterActions } = useGlobalActions();
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [selectedDay, setSelectedDay] = useState("Tuesday");
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(
    null,
  );
  const [selectedPreviewPerson, setSelectedPreviewPerson] = useState<string | null>(
    null,
  );
  const [draggedAssignmentId, setDraggedAssignmentId] = useState<string | null>(
    null,
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setSnapshot(initialSnapshot);
  }, [initialSnapshot]);

  const days = snapshot.days;
  const stage = snapshot.stage;
  const unresolvedConflictCount = snapshot.unresolvedConflictCount;
  const decisionPerson = snapshot.decisionPerson;

  const selectedShift = selectedAssignmentId
    ? (days
        .flatMap((day) =>
          day.shifts.map((shift) => ({
            ...shift,
            day: day.day,
            date: day.date,
            summary: day.summary,
          })),
        )
        .find((shift) => shift.id === selectedAssignmentId) ?? null)
    : null;
  const selectedShiftEditable = selectedShift?.id === SCHEDULE_DECISION_SHIFT_ID;
  const selectedOptions = selectedShift
    ? getScheduleAssignmentOptions(selectedShift.id, selectedShift.person)
    : [];
  const selectedShiftPreview =
    selectedShiftEditable && selectedPreviewPerson
      ? getScheduleDecisionState(selectedPreviewPerson)
      : null;

  const closeShiftEditor = useCallback(() => {
    setSelectedAssignmentId(null);
    setSelectedPreviewPerson(null);
  }, []);

  const runMutation = useCallback(
    async (
      action:
        | { action: "generate"; scheduleId: string }
        | { action: "apply"; scheduleId: string; person: string }
        | { action: "publish"; scheduleId: string },
    ) => {
      const response = await fetch("/api/schedule/state", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(action),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload) {
        throw new Error(
          payload?.message ?? "Could not update the schedule right now.",
        );
      }

      setSnapshot(payload as ScheduleSnapshot);
      setHasUnsavedChanges(false);

      return payload as ScheduleSnapshot;
    },
    [],
  );

  const reviewConflicts = useCallback(() => {
    setSelectedDay("Tuesday");
    setSelectedAssignmentId(SCHEDULE_DECISION_SHIFT_ID);
    setSelectedPreviewPerson(decisionPerson);
    toast.message("Tuesday night is open.");
  }, [decisionPerson]);

  const generateDraft = useCallback(async () => {
    try {
      const nextSnapshot = await runMutation({
        action: "generate",
        scheduleId: snapshot.scheduleId,
      });

      setSelectedDay("Tuesday");
      setSelectedAssignmentId(SCHEDULE_DECISION_SHIFT_ID);
      setSelectedPreviewPerson(nextSnapshot.decisionPerson);
      setDraggedAssignmentId(null);
      toast.success("Fresh draft ready.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not refresh the week.",
      );
    }
  }, [runMutation, snapshot.scheduleId]);

  const applySelectedAssignment = useCallback(async () => {
    if (!selectedShiftEditable || !selectedPreviewPerson) {
      closeShiftEditor();
      return;
    }

    try {
      const nextSnapshot = await runMutation({
        action: "apply",
        scheduleId: snapshot.scheduleId,
        person: selectedPreviewPerson,
      });

      setSelectedDay("Tuesday");
      closeShiftEditor();
      toast.success(
        nextSnapshot.unresolvedConflictCount > 0
          ? "Tuesday night is back in review."
          : `${nextSnapshot.decisionPerson} now covers Tuesday night.`,
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not apply that change.",
      );
    }
  }, [
    closeShiftEditor,
    runMutation,
    selectedPreviewPerson,
    selectedShiftEditable,
    snapshot.scheduleId,
  ]);

  const publishRoster = useCallback(async () => {
    try {
      await runMutation({
        action: "publish",
        scheduleId: snapshot.scheduleId,
      });

      closeShiftEditor();
      toast.success("Week published.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not publish the week.",
      );
    }
  }, [closeShiftEditor, runMutation, snapshot.scheduleId]);

  useEffect(() => {
    registerActions("roster-builder", [
      {
        id: "roster-generate",
        label: "Generate draft",
        description: "Run the week again.",
        tone: "primary",
        run: () => {
          void generateDraft();
        },
      },
      {
        id: "roster-review",
        label: "Review",
        description: `${unresolvedConflictCount} call still needs review.`,
        run: reviewConflicts,
      },
      {
        id: "roster-publish",
        label: "Publish",
        description: "Send the week.",
        run: () => {
          void publishRoster();
        },
      },
    ]);

    return () => unregisterActions("roster-builder");
  }, [
    generateDraft,
    publishRoster,
    registerActions,
    reviewConflicts,
    unregisterActions,
    unresolvedConflictCount,
  ]);

  const value = useMemo<RosterBuilderContextValue>(
    () => ({
      days,
      selectedDay,
      selectedAssignmentId,
      selectedShift,
      selectedPreviewPerson,
      selectedOptions,
      selectedShiftEditable,
      selectedShiftPreview,
      draggedAssignmentId,
      unresolvedConflictCount,
      hasUnsavedChanges,
      stage,
      selectDay: (day) => {
        setSelectedDay(day);
        closeShiftEditor();
      },
      selectAssignment: (assignmentId) => {
        if (!assignmentId) {
          closeShiftEditor();
          return;
        }

        const shift = days.flatMap((day) => day.shifts).find((item) => item.id === assignmentId);

        setSelectedAssignmentId(assignmentId);
        setSelectedPreviewPerson(
          assignmentId === SCHEDULE_DECISION_SHIFT_ID
            ? decisionPerson
            : shift?.person ?? null,
        );
      },
      setSelectedPreviewPerson,
      closeShiftEditor,
      applySelectedAssignment,
      setDraggedAssignmentId,
      reviewConflicts,
      generateDraft,
      publishRoster,
    }),
    [
      applySelectedAssignment,
      closeShiftEditor,
      days,
      decisionPerson,
      draggedAssignmentId,
      generateDraft,
      hasUnsavedChanges,
      publishRoster,
      reviewConflicts,
      selectedAssignmentId,
      selectedDay,
      selectedOptions,
      selectedPreviewPerson,
      selectedShift,
      selectedShiftEditable,
      selectedShiftPreview,
      stage,
      unresolvedConflictCount,
    ],
  );

  return (
    <RosterBuilderContext.Provider value={value}>
      {children}
    </RosterBuilderContext.Provider>
  );
}

export function useRosterBuilder() {
  const context = useContext(RosterBuilderContext);

  if (!context) {
    throw new Error(
      "useRosterBuilder must be used within a RosterBuilderProvider.",
    );
  }

  return context;
}
