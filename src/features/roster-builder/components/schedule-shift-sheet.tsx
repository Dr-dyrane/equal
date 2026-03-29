"use client";

import { ResponsiveSheet } from "@/features/shell/components/responsive-sheet";
import { useRosterBuilder } from "@/features/roster-builder/provider/roster-builder-provider";

export function ScheduleShiftSheet() {
  const {
    selectedShift,
    selectedPreviewPerson,
    selectedOptions,
    selectedShiftEditable,
    selectedShiftPreview,
    setSelectedPreviewPerson,
    closeShiftEditor,
    applySelectedAssignment,
  } = useRosterBuilder();

  if (!selectedShift) {
    return null;
  }

  return (
    <ResponsiveSheet
      open={Boolean(selectedShift)}
      onOpenChange={(open) => {
        if (!open) {
          closeShiftEditor();
        }
      }}
      title={`${selectedShift.day} ${selectedShift.time}`}
      description={selectedShift.role}
    >
      <div className="space-y-3">
        <div className="story-soft-card px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            Assigned
          </p>
          <p className="mt-3 text-base font-semibold text-[color:var(--story-ink)]">
            {selectedShift.person}
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
            {selectedShift.emphasis}
          </p>
        </div>

        {selectedShiftEditable ? (
          <>
            <div className="space-y-2">
              {selectedOptions.map((option) => (
                <button
                  key={option.person}
                  type="button"
                  onClick={() => setSelectedPreviewPerson(option.person)}
                  className="schedule-sheet-option w-full text-left"
                  data-active={selectedPreviewPerson === option.person ? "true" : "false"}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[color:var(--story-ink)]">
                        {option.person}
                      </p>
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--story-subtle)]">
                        {option.note}
                      </p>
                    </div>
                    {option.recommended ? (
                      <span className="story-system-label story-system-label-accent">
                        Best
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
                    {option.outcome}
                  </p>
                </button>
              ))}
            </div>

            {selectedShiftPreview ? (
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="story-soft-card px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                    Fairness
                  </p>
                  <p className="mt-3 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
                    {selectedShiftPreview.fairness}
                  </p>
                </div>
                <div className="story-soft-card px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                    Status
                  </p>
                  <p className="mt-3 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
                    {selectedShiftPreview.readiness}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={closeShiftEditor}
                className="story-nav-secondary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
              >
                Not now
              </button>
              <button
                type="button"
                onClick={applySelectedAssignment}
                className="story-primary-cta inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)]"
              >
                Apply
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={closeShiftEditor}
            className="story-nav-secondary inline-flex w-full items-center justify-center px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
          >
            Close
          </button>
        )}
      </div>
    </ResponsiveSheet>
  );
}
