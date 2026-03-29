import Link from "next/link";
import { SfSymbol } from "@/components/sf-symbol";
import type { DashboardDay } from "@/features/workspace/content";

export function WorkspaceWeekBoard({ days }: { days: DashboardDay[] }) {
  return (
    <section className="story-panel px-5 py-5 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            This week
          </p>
          <h3 className="mt-2 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
            Calm on the surface.
          </h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
            One fairness risk remains. Everything else is ready to move.
          </p>
        </div>
        <Link
          href="/schedule"
          className="story-cta-secondary inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
        >
          Open schedule
          <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
        </Link>
      </div>

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
                  className={`story-demo-shift bg-gradient-to-br text-[color:var(--story-shift-ink)] ${entry.tone}`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--entry-meta,var(--story-shift-meta))]">
                    {entry.time}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--entry-meta,var(--story-shift-meta))]">
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
