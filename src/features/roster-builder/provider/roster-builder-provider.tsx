"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useGlobalActions } from "@/providers/global-actions-provider";

export type RosterStage = "draft" | "reviewing" | "ready" | "published";

type RosterBuilderContextValue = {
  selectedDay: string;
  selectedAssignmentId: string | null;
  draggedAssignmentId: string | null;
  unresolvedConflictCount: number;
  hasUnsavedChanges: boolean;
  stage: RosterStage;
  selectDay: (day: string) => void;
  selectAssignment: (assignmentId: string | null) => void;
  setDraggedAssignmentId: (assignmentId: string | null) => void;
  reviewConflicts: () => void;
  generateDraft: () => void;
  publishRoster: () => void;
};

const RosterBuilderContext = createContext<RosterBuilderContextValue | null>(
  null,
);

export function RosterBuilderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { registerActions, unregisterActions } = useGlobalActions();
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(
    null,
  );
  const [draggedAssignmentId, setDraggedAssignmentId] = useState<string | null>(
    null,
  );
  const [unresolvedConflictCount, setUnresolvedConflictCount] = useState(18);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [stage, setStage] = useState<RosterStage>("reviewing");

  const reviewConflicts = useCallback(() => {
    setSelectedDay("Wednesday");
    setStage("reviewing");
    setHasUnsavedChanges(true);
    setUnresolvedConflictCount((current) => Math.max(0, current - 6));
    toast.message("Conflict review focus moved to the highest-risk shifts.");
  }, []);

  const generateDraft = useCallback(() => {
    setStage("reviewing");
    setHasUnsavedChanges(true);
    setSelectedAssignmentId(null);
    setDraggedAssignmentId(null);
    setUnresolvedConflictCount(18);
    toast.success("A fresh roster draft is ready for review.");
  }, []);

  const publishRoster = useCallback(() => {
    if (unresolvedConflictCount > 0) {
      toast.error(
        `Resolve ${unresolvedConflictCount} remaining conflicts before publishing.`,
      );
      return;
    }

    setStage("published");
    setHasUnsavedChanges(false);
    toast.success("Roster published and ready for staff notifications.");
  }, [unresolvedConflictCount]);

  useEffect(() => {
    registerActions("roster-builder", [
      {
        id: "roster-generate",
        label: "Generate draft",
        description: "Re-run the roster proposal with the current staffing inputs.",
        tone: "primary",
        run: generateDraft,
      },
      {
        id: "roster-review",
        label: "Review conflicts",
        description: `${unresolvedConflictCount} unresolved conflicts still need review.`,
        run: reviewConflicts,
      },
      {
        id: "roster-publish",
        label: "Publish roster",
        description: "Publish the current schedule and trigger downstream notifications.",
        run: publishRoster,
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

  return (
    <RosterBuilderContext.Provider
      value={{
        selectedDay,
        selectedAssignmentId,
        draggedAssignmentId,
        unresolvedConflictCount,
        hasUnsavedChanges,
        stage,
        selectDay: setSelectedDay,
        selectAssignment: setSelectedAssignmentId,
        setDraggedAssignmentId,
        reviewConflicts,
        generateDraft,
        publishRoster,
      }}
    >
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
