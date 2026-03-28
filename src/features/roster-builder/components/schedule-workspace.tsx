"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarSync,
  Clock3,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useFairness } from "@/features/fairness/provider/fairness-provider";
import { useRosterBuilder } from "@/features/roster-builder/provider/roster-builder-provider";
import { useUI } from "@/providers/ui-provider";

const metrics = {
  draft: {
    hardRules: "100%",
    softScore: "90.4",
    readiness: "Draft created",
  },
  reviewing: {
    hardRules: "100%",
    softScore: "93.8",
    readiness: "Needs review",
  },
  ready: {
    hardRules: "100%",
    softScore: "95.1",
    readiness: "Ready to publish",
  },
  published: {
    hardRules: "100%",
    softScore: "95.1",
    readiness: "Published",
  },
} as const;

const board = [
  {
    day: "Monday",
    date: "Mar 31",
    shifts: [
      {
        id: "mon-1",
        time: "06:00 - 14:00",
        role: "Inbound lead",
        person: "Mia Cruz",
        tone: "bg-primary/12 text-sky-700",
      },
      {
        id: "mon-2",
        time: "14:00 - 22:00",
        role: "Support pod",
        person: "Kai Morgan",
        tone: "bg-secondary/14 text-fuchsia-700",
      },
      {
        id: "mon-3",
        time: "22:00 - 06:00",
        role: "Night ops",
        person: "Noah Kent",
        tone: "bg-slate-950 text-white",
      },
    ],
  },
  {
    day: "Tuesday",
    date: "Apr 1",
    shifts: [
      {
        id: "tue-1",
        time: "07:00 - 15:00",
        role: "Packing",
        person: "Lena Park",
        tone: "bg-success/15 text-emerald-700",
      },
      {
        id: "tue-2",
        time: "12:00 - 20:00",
        role: "Dispatch",
        person: "Owen Diaz",
        tone: "bg-accent/16 text-orange-700",
      },
      {
        id: "tue-3",
        time: "18:00 - 02:00",
        role: "Escalations",
        person: "Rae Taylor",
        tone: "bg-warning/20 text-amber-700",
      },
    ],
  },
  {
    day: "Wednesday",
    date: "Apr 2",
    shifts: [
      {
        id: "wed-1",
        time: "08:00 - 16:00",
        role: "Clinical",
        person: "Ivy Chen",
        tone: "bg-success/15 text-emerald-700",
      },
      {
        id: "wed-2",
        time: "10:00 - 18:00",
        role: "Float pool",
        person: "June Hall",
        tone: "bg-primary/12 text-sky-700",
      },
      {
        id: "wed-3",
        time: "20:00 - 04:00",
        role: "Night desk",
        person: "Zara Ali",
        tone: "bg-secondary/14 text-fuchsia-700",
      },
    ],
  },
  {
    day: "Thursday",
    date: "Apr 3",
    shifts: [
      {
        id: "thu-1",
        time: "06:30 - 14:30",
        role: "Inbound",
        person: "Mia Cruz",
        tone: "bg-primary/12 text-sky-700",
      },
      {
        id: "thu-2",
        time: "13:00 - 21:00",
        role: "Service",
        person: "Kai Morgan",
        tone: "bg-secondary/14 text-fuchsia-700",
      },
      {
        id: "thu-3",
        time: "21:30 - 05:30",
        role: "Night ops",
        person: "Ava Brooks",
        tone: "bg-slate-950 text-white",
      },
    ],
  },
  {
    day: "Friday",
    date: "Apr 4",
    shifts: [
      {
        id: "fri-1",
        time: "09:00 - 17:00",
        role: "Warehouse",
        person: "Lena Park",
        tone: "bg-success/15 text-emerald-700",
      },
      {
        id: "fri-2",
        time: "11:00 - 19:00",
        role: "Customer care",
        person: "Rae Taylor",
        tone: "bg-warning/20 text-amber-700",
      },
      {
        id: "fri-3",
        time: "16:00 - 00:00",
        role: "Dispatch",
        person: "Owen Diaz",
        tone: "bg-accent/16 text-orange-700",
      },
    ],
  },
];

const fairnessNotes = [
  {
    name: "Kai Morgan",
    note: "Picked for Tuesday support because it reduces weekend imbalance over the last 6 cycles.",
  },
  {
    name: "Noah Kent",
    note: "Night coverage assigned because minimum-rest constraints eliminate two alternates this week.",
  },
  {
    name: "Lena Park",
    note: "Protected from back-to-back late shifts to keep fatigue score inside the soft threshold.",
  },
];

const actions = [
  "Generate schedule",
  "Review conflicts",
  "Adjust by drag-and-drop",
  "Publish roster and notify staff",
];

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function ScheduleWorkspace() {
  const { scheduleView } = useUI();
  const { window, comparisonMode, explanationPanelOpen } = useFairness();
  const {
    hasUnsavedChanges,
    reviewConflicts,
    selectedAssignmentId,
    selectedDay,
    selectAssignment,
    selectDay,
    stage,
    unresolvedConflictCount,
  } = useRosterBuilder();
  const stageMetrics = metrics[stage];

  return (
    <div className="flex flex-col gap-6">
      <section className="glass-panel-strong grid gap-6 overflow-hidden p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div>
          <span className="metric-chip w-fit">Schedule workspace</span>
          <h2 className="mt-4 font-heading text-4xl text-slate-950 md:text-5xl">
            Review the week, not a spreadsheet.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            The schedule module is now wrapped in route-scoped roster and
            fairness providers, so review state, publishing state, and
            explanation focus can evolve without leaking into the rest of the
            app.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="metric-chip">View: {sentenceCase(scheduleView)}</span>
            <span className="metric-chip">Stage: {sentenceCase(stage)}</span>
            <span className="metric-chip">Fairness: {sentenceCase(window)}</span>
            <span className="metric-chip">
              Compare: {sentenceCase(comparisonMode)}
            </span>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/team"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Review team inputs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={reviewConflicts}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/78 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white"
            >
              Focus conflicts
            </button>
          </div>
        </div>

        <div className="rounded-[28px] bg-[linear-gradient(145deg,rgba(66,165,245,0.24),rgba(255,255,255,0.78),rgba(129,199,132,0.18))] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <WandSparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Generation flow</p>
              <p className="text-sm text-slate-600">
                Global actions now plug into the roster builder state directly.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {actions.map((action, index) => (
              <div
                key={action}
                className="flex items-center gap-3 rounded-2xl border border-white/55 bg-white/70 px-4 py-3"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                  0{index + 1}
                </span>
                <p className="text-sm font-medium text-slate-700">{action}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[24px] border border-white/55 bg-white/74 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Draft state
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {hasUnsavedChanges ? "Unsaved adjustments pending" : "Draft is synced"}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {unresolvedConflictCount} unresolved conflicts remain before the
              roster is publishable.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="glass-panel p-5">
          <div className="inline-flex rounded-full bg-success/16 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Hard rules satisfied
          </div>
          <p className="mt-4 font-heading text-3xl text-slate-950">
            {stageMetrics.hardRules}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            No overlaps, legal rest windows protected, and coverage met for every
            critical role.
          </p>
        </article>
        <article className="glass-panel p-5">
          <div className="inline-flex rounded-full bg-primary/12 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">
            Soft constraint score
          </div>
          <p className="mt-4 font-heading text-3xl text-slate-950">
            {stageMetrics.softScore}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Preferences, fatigue balancing, and weekend rotation all factor into
            the current proposal.
          </p>
        </article>
        <article className="glass-panel p-5">
          <div className="inline-flex rounded-full bg-warning/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
            Publish readiness
          </div>
          <p className="mt-4 font-heading text-3xl text-slate-950">
            {stage === "published"
              ? stageMetrics.readiness
              : `${unresolvedConflictCount} unresolved`}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Conflict review state now lives inside the roster builder provider
            instead of being hard-coded into the page.
          </p>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <article className="glass-panel p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="metric-chip">Current proposal</span>
              <h3 className="mt-3 font-heading text-3xl text-slate-950">
                Week of March 31
              </h3>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <CalendarSync className="h-4 w-4" />
              Focused on {selectedDay}
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-5">
            {board.map((day) => {
              const daySelected = day.day === selectedDay;

              return (
                <button
                  key={day.day}
                  type="button"
                  onClick={() => selectDay(day.day)}
                  className={`rounded-[24px] border bg-white/74 p-4 text-left transition ${
                    daySelected
                      ? "border-slate-950 shadow-glow"
                      : "border-white/55 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-heading text-xl text-slate-950">{day.day}</p>
                      <p className="text-sm text-slate-500">{day.date}</p>
                    </div>
                    <Clock3 className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="mt-4 space-y-3">
                    {day.shifts.map((shift) => {
                      const shiftSelected = shift.id === selectedAssignmentId;

                      return (
                        <div
                          key={shift.id}
                          onClick={(event) => {
                            event.stopPropagation();
                            selectAssignment(shiftSelected ? null : shift.id);
                          }}
                          className={`rounded-2xl px-3 py-3 ${shift.tone} ${
                            shiftSelected ? "ring-2 ring-slate-950/70" : ""
                          }`}
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
                            {shift.role}
                          </p>
                          <p className="mt-2 text-sm font-semibold">{shift.time}</p>
                          <p className="mt-1 text-sm opacity-80">{shift.person}</p>
                        </div>
                      );
                    })}
                  </div>
                </button>
              );
            })}
          </div>
        </article>

        <div className="grid gap-6">
          {explanationPanelOpen ? (
            <article className="glass-panel p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <div>
                  <span className="metric-chip">Explainability</span>
                  <h3 className="mt-3 font-heading text-2xl text-slate-950">
                    Why the system made each choice
                  </h3>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {fairnessNotes.map((entry) => (
                  <div
                    key={entry.name}
                    className="rounded-[24px] border border-white/55 bg-white/74 p-4"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      {entry.name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {entry.note}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ) : null}

          <article className="glass-panel p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-success" />
              <div>
                <span className="metric-chip">Guardrails</span>
                <h3 className="mt-3 font-heading text-2xl text-slate-950">
                  Constraint priorities
                </h3>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[
                "Legal max hours and mandatory rest periods are locked before any soft scoring happens.",
                "Skill coverage checks ensure every published shift has the required mix.",
                "Soft weights balance nights, weekends, fatigue, and personal preferences over time.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/55 bg-white/74 px-4 py-3"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-success" />
                  <p className="text-sm leading-6 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
