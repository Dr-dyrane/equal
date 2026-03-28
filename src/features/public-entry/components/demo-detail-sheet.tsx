"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { SfSymbol } from "@/components/sf-symbol";
import { demoFocusShiftId } from "@/features/public-entry/content";
import { useDemoWorkspace } from "@/features/public-entry/provider/demo-workspace-provider";

export function DemoDetailSheet() {
  const {
    scenario,
    state,
    selectedShift,
    sheetOpen,
    canApplySuggestion,
    closeSheet,
    selectShift,
    applySuggestion,
    resetDemo,
  } = useDemoWorkspace();
  const fairnessValue = Number.parseInt(state.fairness.value, 10);
  const title =
    scenario === "baseline" && canApplySuggestion
      ? state.insightTitle
      : selectedShift.label;
  const detail =
    scenario === "baseline" && canApplySuggestion
      ? state.insightBody
      : selectedShift.note;
  const helperNote =
    scenario === "baseline" && !canApplySuggestion
      ? state.hint
      : state.actionDetail;
  const primaryLabel =
    canApplySuggestion
      ? state.actionLabel ?? "Rotate"
      : scenario === "balanced"
        ? "Done"
        : "Open Tuesday 19:00";

  function handlePrimaryAction() {
    if (canApplySuggestion) {
      applySuggestion();
      return;
    }

    if (scenario === "balanced") {
      closeSheet();
      return;
    }

    selectShift(demoFocusShiftId);
  }

  return (
    <Dialog.Root open={sheetOpen} onOpenChange={(open) => (!open ? closeSheet() : undefined)}>
      <Dialog.Portal>
        <Dialog.Overlay className="story-sheet-overlay" />
        <Dialog.Content className="story-sheet">
          <div className="story-sheet-handle" />

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Dialog.Title className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                {scenario === "baseline" ? "Selected shift" : "Updated week"}
              </Dialog.Title>
              <Dialog.Description className="mt-3 max-w-[24rem] text-[1.9rem] font-medium leading-[1] text-[color:var(--story-ink)]">
                {title}
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                className="story-nav-secondary inline-flex h-11 w-11 items-center justify-center text-[color:var(--story-ink)]"
                aria-label="Close details"
              >
                <SfSymbol name="xmark" className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <div className="story-system-label story-system-label-accent">
              {selectedShift.time}
            </div>
            <div className="story-system-label">
              {selectedShift.person}
            </div>
          </div>

          <div className="mt-5 story-soft-card px-4 py-4 md:px-5 md:py-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
                {state.fairness.label}
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--story-ink)]">
                <span className="story-status-dot" />
                <span>{state.fairness.value} {state.fairness.qualifier}</span>
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-[rgba(255,255,255,0.08)]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--story-brand-pink),var(--story-brand-violet),var(--story-brand-blue))]"
                style={{ width: `${fairnessValue}%` }}
              />
            </div>
            <p className="mt-3 text-base font-medium text-[color:var(--story-ink)]">
              {state.fairness.state}
            </p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--story-muted)]">
              {detail}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="story-primary-cta inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[color:var(--story-primary-text)] disabled:cursor-not-allowed disabled:opacity-55"
            >
              {primaryLabel}
              <SfSymbol name="arrow-right" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={resetDemo}
              className="story-cta-secondary inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
            >
              Reset
            </button>
          </div>

          <p className="mt-4 text-sm italic leading-6 text-[color:var(--story-muted)] opacity-90">
            {helperNote}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
