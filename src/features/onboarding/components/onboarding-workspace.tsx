import Link from "next/link";
import {
  roleCards,
  startupGuardrails,
  startupRoutine,
  startupSuccessCriteria,
} from "@/lib/startup-routine";
import { SfSymbol } from "@/components/sf-symbol";

export function OnboardingWorkspace() {
  return (
    <div className="flex flex-col gap-4">
      <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(21rem,0.75fr)]">
        <div className="grid items-start gap-4">
          <section className="story-panel px-5 py-5 sm:px-6">
            <span className="story-system-label story-system-label-accent">
              Setup
            </span>
            <h1 className="mt-4 text-balance font-heading text-[2.55rem] leading-[0.94] text-[color:var(--story-ink)] sm:text-[3.25rem]">
              Start the first week.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[color:var(--story-muted)]">
              Name it. Add people. Set rules.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/team"
                className="story-primary-cta inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)]"
              >
                Add team
                <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
              </Link>
              <Link
                href="/schedule"
                className="story-nav-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
              >
                Open week
              </Link>
            </div>
          </section>

          <section className="grid gap-3 md:grid-cols-3">
            <article className="story-soft-card px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                Steps
              </p>
              <p className="mt-4 font-heading text-[2.25rem] leading-none text-[color:var(--story-ink)]">
                {String(startupRoutine.length).padStart(2, "0")}
              </p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
                Keep it short.
              </p>
            </article>
            <article className="story-soft-card px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                Roles
              </p>
              <p className="mt-4 font-heading text-[2.25rem] leading-none text-[color:var(--story-ink)]">
                {String(roleCards.length).padStart(2, "0")}
              </p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
                Keep ownership clear.
              </p>
            </article>
            <article className="story-soft-card px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                Guardrails
              </p>
              <p className="mt-4 font-heading text-[2.25rem] leading-none text-[color:var(--story-ink)]">
                {String(startupGuardrails.length).padStart(2, "0")}
              </p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
                Keep the rules hard.
              </p>
            </article>
          </section>
        </div>

        <div className="grid gap-4">
          <section className="story-panel px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              Done when
            </p>
            <div className="mt-4 space-y-3">
              {startupSuccessCriteria.map((item) => (
                <div key={item} className="story-soft-card px-4 py-4">
                  <p className="text-sm leading-6 text-[color:var(--story-muted)]">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="story-panel px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              Roles
            </p>
            <div className="mt-4 space-y-3">
              {roleCards.slice(0, 3).map((role) => (
                <div key={role.title} className="story-soft-card px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[color:var(--story-ink)]">
                      {role.title}
                    </p>
                    <span className="story-system-label">{role.title}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
                    {role.note}
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
              Sequence
            </p>
            <h2 className="mt-2 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
              Go once.
            </h2>
          </div>
          <span className="story-system-label">6 steps</span>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {startupRoutine.map((step) => (
            <Link
              key={step.id}
              href={step.href}
              className="story-soft-card block px-4 py-4 transition hover:-translate-y-[1px]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                    {step.owner}
                  </p>
                  <p className="mt-3 text-base font-semibold text-[color:var(--story-ink)]">
                    {step.title}
                  </p>
                </div>
                <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem] text-[color:var(--story-subtle)]" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
