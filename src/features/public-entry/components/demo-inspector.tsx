"use client";

import { SfSymbol } from "@/components/sf-symbol";
import { demoFocusShiftId } from "@/features/public-entry/content";
import { useDemoWorkspace } from "@/features/public-entry/provider/demo-workspace-provider";

export function DemoInspector() {
  const {
    scenario,
    state,
    selectedShift,
    selectedShiftId,
    canApplySuggestion,
    applySuggestion,
    resetDemo,
  } = useDemoWorkspace();

  const isFocusShift = selectedShiftId === demoFocusShiftId;

  return (
    <aside className="story-soft-card flex h-full flex-col justify-between p-4 md:p-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
          {scenario === "baseline" ? "Live suggestion" : "Updated result"}
        </p>
        <h3 className="mt-3 max-w-[22rem] text-2xl font-medium text-[color:var(--story-ink)]">
          {isFocusShift ? state.insightTitle : selectedShift.label}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[color:var(--story-muted)]">
          {isFocusShift ? state.insightBody : selectedShift.note}
        </p>

        <div className="mt-5 space-y-3 text-sm text-[color:var(--story-muted)]">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
              Shift
            </span>
            <span className="font-medium text-[color:var(--story-ink)]">
              {selectedShift.time}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
              Person
            </span>
            <span className="font-medium text-[color:var(--story-ink)]">
              {selectedShift.person}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
              Signal
            </span>
            <span className="font-medium text-[color:var(--story-ink)]">
              {selectedShift.label}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <button
          type="button"
          onClick={applySuggestion}
          disabled={!canApplySuggestion}
          className="story-primary-cta inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[color:var(--story-primary-text)] disabled:cursor-not-allowed disabled:opacity-55"
        >
          {state.actionLabel ?? "Rotation applied"}
          <SfSymbol name="arrow-right" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={resetDemo}
          className="story-cta-secondary inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
        >
          Reset demo
        </button>
      </div>
      <p className="mt-4 text-sm leading-7 text-[color:var(--story-muted)]">
        {state.actionDetail}
      </p>
    </aside>
  );
}
