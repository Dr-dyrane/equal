"use client";

import Link from "next/link";
import { scheduleGuardrails, getScheduleNotes } from "@/features/roster-builder/content";
import { ResponsiveSheet } from "@/features/shell/components/responsive-sheet";
import {
  type FairnessComparisonMode,
  type FairnessWindow,
  useFairness,
} from "@/features/fairness/provider/fairness-provider";
import type { TeamTask } from "@/features/team/types";
import type { ShiftTask } from "@/features/shifts/types";

type ScheduleSupportSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDay: string;
  unresolvedConflictCount: number;
  decisionPerson: string;
  teamTask: TeamTask | null;
  shiftTask: ShiftTask | null;
};

function getWindowLabel(window: FairnessWindow) {
  if (window === "quarter") {
    return "Quarter";
  }

  if (window === "year") {
    return "Year";
  }

  return "6 weeks";
}

function getComparisonLabel(comparisonMode: FairnessComparisonMode) {
  if (comparisonMode === "role") {
    return "Role";
  }

  if (comparisonMode === "self") {
    return "Self";
  }

  return "Team";
}

function getNoteStateLabel(explanationPanelOpen: boolean) {
  return explanationPanelOpen ? "Show less" : "Show more";
}

function getToneLabel(tone: "primary" | "secondary" | "success") {
  if (tone === "secondary") {
    return "Watch";
  }

  if (tone === "success") {
    return "Steady";
  }

  return "Live";
}

export function ScheduleSupportSheet({
  open,
  onOpenChange,
  selectedDay,
  unresolvedConflictCount,
  decisionPerson,
  teamTask,
  shiftTask,
}: ScheduleSupportSheetProps) {
  const {
    window,
    comparisonMode,
    explanationPanelOpen,
    cycleWindow,
    cycleComparisonMode,
    toggleExplanationPanel,
  } = useFairness();
  const notes = getScheduleNotes(explanationPanelOpen, decisionPerson);

  return (
    <ResponsiveSheet
      open={open}
      onOpenChange={onOpenChange}
      title={`${selectedDay} details`}
      description={
        unresolvedConflictCount > 0
          ? `${unresolvedConflictCount} call still needs review.`
          : "Week is ready to send."
      }
    >
      <div className="space-y-3">
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={cycleWindow}
            className="schedule-sheet-option w-full text-left"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              Window
            </p>
            <p className="mt-3 text-sm font-semibold text-[color:var(--story-ink)]">
              {getWindowLabel(window)}
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
              Change the fairness range.
            </p>
          </button>

          <button
            type="button"
            onClick={cycleComparisonMode}
            className="schedule-sheet-option w-full text-left"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              Lens
            </p>
            <p className="mt-3 text-sm font-semibold text-[color:var(--story-ink)]">
              {getComparisonLabel(comparisonMode)}
            </p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
              Switch the fairness view.
            </p>
          </button>
        </div>

        <button
          type="button"
          onClick={toggleExplanationPanel}
          className="schedule-sheet-option w-full text-left"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            Notes
          </p>
          <p className="mt-3 text-sm font-semibold text-[color:var(--story-ink)]">
            {getNoteStateLabel(explanationPanelOpen)}
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
            Keep the people view brief or expanded.
          </p>
        </button>

        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            People now
          </p>
          {notes.map((note) => (
            <div key={note.name} className="story-soft-card px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[color:var(--story-ink)]">
                  {note.name}
                </p>
                <span className="story-system-label">{getToneLabel(note.tone)}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
                {note.note}
              </p>
            </div>
          ))}
        </div>

        {teamTask || shiftTask ? (
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              Fix around the week
            </p>
            {teamTask ? (
              <Link
                href="/team"
                onClick={() => onOpenChange(false)}
                className="schedule-sheet-option block w-full text-left"
              >
                <p className="text-sm font-semibold text-[color:var(--story-ink)]">
                  {teamTask.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
                  {teamTask.detail}
                </p>
              </Link>
            ) : null}
            {shiftTask ? (
              <Link
                href="/shifts"
                onClick={() => onOpenChange(false)}
                className="schedule-sheet-option block w-full text-left"
              >
                <p className="text-sm font-semibold text-[color:var(--story-ink)]">
                  {shiftTask.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
                  {shiftTask.detail}
                </p>
              </Link>
            ) : null}
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              Hard rules
            </p>
            {scheduleGuardrails.map((item) => (
              <div key={item} className="story-soft-card px-4 py-4">
                <p className="text-sm leading-6 text-[color:var(--story-muted)]">{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ResponsiveSheet>
  );
}
