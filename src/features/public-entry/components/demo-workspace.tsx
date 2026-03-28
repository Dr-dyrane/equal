"use client";

import { demoFocusShiftId } from "@/features/public-entry/content";
import { PublicSystemLabel } from "@/features/public-entry/components/public-system-label";
import { DemoDayColumn } from "@/features/public-entry/components/demo-day-column";
import { DemoInspector } from "@/features/public-entry/components/demo-inspector";
import { useDemoWorkspace } from "@/features/public-entry/provider/demo-workspace-provider";
import type { DemoCopy } from "@/features/public-entry/types";

type DemoWorkspaceProps = {
  content: DemoCopy;
};

export function DemoWorkspace({ content }: DemoWorkspaceProps) {
  const { state, selectedShiftId, selectShift } = useDemoWorkspace();

  return (
    <section className="story-stage story-reveal px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            {content.panelEyebrow}
          </p>
          <p className="mt-2 max-w-[24rem] text-lg font-medium text-[color:var(--story-ink)] md:text-xl">
            {content.panelHeading}
          </p>
        </div>

        <div className="story-fairness-indicator story-reveal shrink-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
            {state.fairness.label}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span className="story-status-dot" />
            <p className="text-base font-semibold text-[color:var(--story-ink)]">
              {state.fairness.value} {state.fairness.qualifier}
            </p>
          </div>
          <p className="mt-1 text-[11px] font-medium text-[color:var(--story-muted)]">
            {state.fairness.state}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="grid gap-3 md:grid-cols-3">
          {state.days.map((day) => (
            <DemoDayColumn
              key={day.day}
              day={day}
              selectedShiftId={selectedShiftId}
              focusShiftId={demoFocusShiftId}
              onSelectShift={selectShift}
            />
          ))}
        </div>
        <DemoInspector />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {state.signals.map((signal, index) => (
          <PublicSystemLabel
            key={signal}
            accent
            className={index > 1 ? "hidden md:inline-flex" : "inline-flex"}
          >
            {signal}
          </PublicSystemLabel>
        ))}
      </div>
    </section>
  );
}
