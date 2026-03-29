import Link from "next/link";
import {
  shiftMetrics,
  shiftReadinessLanes,
  shiftSignals,
  shiftTemplates,
  type ShiftSignal,
} from "@/features/shifts/content";
import { SfSymbol } from "@/components/sf-symbol";

function getSignalTone(tone: ShiftSignal["tone"]) {
  if (tone === "warning") {
    return "bg-[color:var(--warning)]";
  }

  if (tone === "secondary") {
    return "bg-[color:var(--secondary)]";
  }

  return "bg-[color:var(--primary)]";
}

export function ShiftsWorkspace() {
  return (
    <div className="flex flex-col gap-4">
      <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(21rem,0.75fr)]">
        <div className="grid items-start gap-4">
          <section className="story-panel px-5 py-5 sm:px-6">
            <span className="story-system-label story-system-label-accent">
              Shift templates
            </span>
            <h1 className="mt-4 text-balance font-heading text-[2.55rem] leading-[0.94] text-[color:var(--story-ink)] sm:text-[3.25rem]">
              Model the week once.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--story-muted)]">
              Times, demand, and required skills should be clear before the schedule
              starts assigning people. Clean templates keep the week reusable and legible.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/schedule"
                className="story-primary-cta inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)]"
              >
                Open week
                <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
              </Link>
              <Link
                href="/team"
                className="story-nav-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
              >
                Check skills
              </Link>
            </div>
          </section>

          <section className="grid gap-3 md:grid-cols-3">
            {shiftMetrics.map((metric) => (
              <article key={metric.label} className="story-soft-card px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                  {metric.label}
                </p>
                <p className="mt-4 font-heading text-[2.25rem] leading-none text-[color:var(--story-ink)]">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
                  {metric.detail}
                </p>
              </article>
            ))}
          </section>
        </div>

        <div className="grid gap-4">
          <section className="story-panel px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              What shapes the week
            </p>
            <div className="mt-4 space-y-3">
              {shiftSignals.map((signal) => (
                <div key={signal.title} className="story-soft-card px-4 py-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${getSignalTone(signal.tone)}`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[color:var(--story-ink)]">
                        {signal.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
                        {signal.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="story-panel px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              Readiness
            </p>
            <div className="mt-4 space-y-3">
              {shiftReadinessLanes.map((lane) => (
                <div key={lane.title} className="story-soft-card px-4 py-4">
                  <p className="text-sm font-semibold text-[color:var(--story-ink)]">
                    {lane.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
                    {lane.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="story-panel px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              Template library
            </p>
            <h2 className="mt-2 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
              Keep demand explicit.
            </h2>
          </div>
          <span className="story-system-label">4 live templates</span>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {shiftTemplates.map((template) => (
            <article key={template.name} className="story-soft-card px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-[color:var(--story-ink)]">
                    {template.name}
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--story-muted)]">
                    {template.window} · {template.site}
                  </p>
                </div>
                <span className="story-system-label">{template.demand}</span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[color:var(--story-muted)]">
                {template.detail}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {template.skills.map((skill) => (
                  <span key={skill} className="story-system-label">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
