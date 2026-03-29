import type { CSSProperties } from "react";
import type { DashboardAssignment, DashboardDay } from "@/features/workspace/content";

function getAssignmentSurfaceStyle(entry: DashboardAssignment) {
  return {
    "--entry-from-light": entry.surface.light.from,
    "--entry-to-light": entry.surface.light.to,
    "--entry-ink-light": entry.surface.light.ink,
    "--entry-meta-light": entry.surface.light.meta,
    "--entry-from-dark": entry.surface.dark.from,
    "--entry-to-dark": entry.surface.dark.to,
    "--entry-ink-dark": entry.surface.dark.ink,
    "--entry-meta-dark": entry.surface.dark.meta,
  } as CSSProperties;
}

export function WorkspaceWeekBoard({ days }: { days: DashboardDay[] }) {
  return (
    <section className="story-panel px-5 py-5 sm:px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
        This week
      </p>
      <h3 className="mt-2 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
        Calm on the surface.
      </h3>
      <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
        One fairness risk remains.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {days.map((day, index) => (
          <article
            key={day.day}
            className={`story-soft-card px-4 py-4 ${
              index === 2 ? "sm:col-span-2 xl:col-span-1" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-heading text-[1.7rem] leading-none text-[color:var(--story-ink)]">
                {day.day}
              </p>
              <span className="story-system-label">{day.summary}</span>
            </div>
            <div className="mt-4 space-y-3">
              {day.entries.map((entry) => (
                <div
                  key={`${day.day}-${entry.time}-${entry.person}`}
                  className="story-demo-shift workspace-week-shift"
                  style={getAssignmentSurfaceStyle(entry)}
                >
                  <p
                    data-entry-meta="true"
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  >
                    {entry.time}
                  </p>
                  <p
                    data-entry-meta="true"
                    className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
                  >
                    {entry.label}
                  </p>
                  <p className="mt-3 text-base font-semibold text-current">
                    {entry.person}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
