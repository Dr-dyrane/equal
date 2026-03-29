"use client";

import type { CSSProperties } from "react";
import { SfSymbol } from "@/components/sf-symbol";
import {
  getScheduleFocus,
  getScheduleMetrics,
  getScheduleNotes,
  getScheduleSummary,
  scheduleActions,
  scheduleGuardrails,
  type ScheduleMetric,
  type ScheduleShift,
} from "@/features/roster-builder/content";
import { ScheduleShiftSheet } from "@/features/roster-builder/components/schedule-shift-sheet";
import { useFairness } from "@/features/fairness/provider/fairness-provider";
import { useRosterBuilder } from "@/features/roster-builder/provider/roster-builder-provider";

function getMetricTone(tone: ScheduleMetric["tone"]) {
  if (tone === "warning") {
    return "text-[color:var(--warning)]";
  }

  if (tone === "secondary") {
    return "text-[color:var(--secondary)]";
  }

  if (tone === "success") {
    return "text-emerald-500";
  }

  return "text-[color:var(--story-brand-blue)]";
}

function getShiftStyle(shift: ScheduleShift) {
  return {
    "--schedule-shift-from-light": shift.surface.light.from,
    "--schedule-shift-to-light": shift.surface.light.to,
    "--schedule-shift-ink-light": shift.surface.light.ink,
    "--schedule-shift-meta-light": shift.surface.light.meta,
    "--schedule-shift-from-dark": shift.surface.dark.from,
    "--schedule-shift-to-dark": shift.surface.dark.to,
    "--schedule-shift-ink-dark": shift.surface.dark.ink,
    "--schedule-shift-meta-dark": shift.surface.dark.meta,
  } as CSSProperties;
}

export function ScheduleWorkspace() {
  const { window, comparisonMode, explanationPanelOpen, toggleExplanationPanel } =
    useFairness();
  const {
    days,
    hasUnsavedChanges,
    reviewConflicts,
    generateDraft,
    publishRoster,
    selectedAssignmentId,
    selectedDay,
    selectAssignment,
    selectDay,
    stage,
    unresolvedConflictCount,
  } = useRosterBuilder();

  const summary = getScheduleSummary(stage);
  const metrics = getScheduleMetrics(stage);
  const activeDay = days.find((day) => day.day === selectedDay) ?? days[0];
  const focus = getScheduleFocus(
    unresolvedConflictCount,
    selectedDay,
    comparisonMode,
    window,
  );
  const notes = getScheduleNotes(
    explanationPanelOpen,
    days
      .find((day) => day.day === "Tuesday")
      ?.shifts.find((shift) => shift.id === "tue-3")?.person,
  );

  return (
    <>
      <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(21rem,0.75fr)]">
        <div className="grid items-start gap-4">
          <section className="story-panel px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="story-system-label story-system-label-accent">
                {summary.badge}
              </span>
              {hasUnsavedChanges ? (
                <span className="story-system-label">Unsaved changes</span>
              ) : null}
            </div>

            <h2 className="mt-3 text-balance font-heading text-[2rem] leading-[0.94] text-[color:var(--story-ink)] sm:mt-4 sm:text-[3.25rem]">
              {summary.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--story-muted)] sm:mt-3">
              {summary.detail}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:grid-cols-4">
              {focus.map((item) => (
                <div key={item.label} className="story-soft-card px-3 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--story-ink)]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:flex sm:flex-wrap sm:gap-3">
              <button
                type="button"
                onClick={reviewConflicts}
                className="story-primary-cta col-span-2 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)] sm:col-span-1"
              >
                Review
                <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
              </button>
              <button
                type="button"
                onClick={generateDraft}
                className="story-nav-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={publishRoster}
                className="story-nav-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
              >
                Publish
              </button>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {metrics.map((metric, index) => (
              <article
                key={metric.label}
                className={`story-soft-card px-4 py-4 ${
                  index === metrics.length - 1 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                  {metric.label}
                </p>
                <p className={`mt-3 font-heading text-[1.95rem] leading-none sm:mt-4 sm:text-[2.25rem] ${getMetricTone(metric.tone)}`}>
                  {metric.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)] sm:mt-3">
                  {metric.detail}
                </p>
              </article>
            ))}
          </section>

          <section className="story-panel px-5 py-5 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                  Week of March 31
                </p>
                <h3 className="mt-2 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
                  {activeDay.day}
                </h3>
              </div>
              <span className="story-system-label">{selectedDay}</span>
            </div>

            <div className="mt-5 grid grid-cols-2 items-start gap-2">
              {days.map((day) => {
                const daySelected = day.day === selectedDay;

                return (
                  <button
                    key={day.day}
                    type="button"
                    onClick={() => selectDay(day.day)}
                    className="schedule-day-selector"
                    data-active={daySelected ? "true" : "false"}
                    aria-pressed={daySelected}
                  >
                    <div>
                      <p className="font-heading text-[1.2rem] leading-none text-[color:var(--story-ink)] sm:text-[1.35rem]">
                        {day.day}
                      </p>
                      <p className="mt-2 text-sm text-[color:var(--story-muted)]">
                        {day.date}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <article className="schedule-day-card mt-4 p-4 sm:p-5" data-active="true">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-[color:var(--story-muted)]">
                    {activeDay.date}
                  </p>
                </div>
                <span className="story-system-label">{activeDay.summary}</span>
              </div>

              <div className="mt-4 grid gap-3">
                {activeDay.shifts.map((shift) => {
                  const shiftSelected = shift.id === selectedAssignmentId;

                  return (
                    <button
                      key={shift.id}
                      type="button"
                      onClick={() => selectAssignment(shiftSelected ? null : shift.id)}
                      className="schedule-shift-card"
                      data-active={shiftSelected ? "true" : "false"}
                      style={getShiftStyle(shift)}
                      aria-pressed={shiftSelected}
                    >
                      <p
                        data-schedule-meta="true"
                        className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                      >
                        {shift.time}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-current">
                        {shift.role}
                      </p>
                      <p
                        data-schedule-meta="true"
                        className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
                      >
                        {shift.emphasis}
                      </p>
                      <p className="mt-3 text-sm font-semibold text-current">
                        {shift.person}
                      </p>
                    </button>
                  );
                })}
              </div>
            </article>
          </section>
        </div>

        <div className="hidden gap-4 xl:grid">
          <section className="story-panel px-5 py-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                  Now
                </p>
              </div>
              <button
                type="button"
                onClick={toggleExplanationPanel}
                className="app-shell-icon-button"
                aria-label={explanationPanelOpen ? "Hide explanation detail" : "Show explanation detail"}
                title={explanationPanelOpen ? "Hide explanation detail" : "Show explanation detail"}
              >
                <SfSymbol name="sparkles" className="h-[1rem] w-[1rem]" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {notes.map((note) => (
                <div key={note.name} className="story-soft-card px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[color:var(--story-ink)]">
                      {note.name}
                    </p>
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${getMetricTone(note.tone)}`}
                    >
                      live
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
                    {note.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="story-panel px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              Rules
            </p>
            <div className="mt-4 space-y-3">
              {scheduleGuardrails.map((item) => (
                <div key={item} className="story-soft-card px-4 py-4">
                  <p className="text-sm leading-6 text-[color:var(--story-muted)]">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-3 xl:grid-cols-1">
              {scheduleActions.map((action) => (
                <div key={action.id} className="story-soft-card px-4 py-4">
                  <p className="text-sm font-semibold text-[color:var(--story-ink)]">
                    {action.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
                    {action.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <ScheduleShiftSheet />
    </>
  );
}
