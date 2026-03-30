import Link from "next/link";
import { SfSymbol } from "@/components/sf-symbol";
import type {
  TeamMemberTone,
  TeamSnapshot,
  TeamTaskTone,
} from "@/features/team/types";

function getToneDot(tone: TeamTaskTone | TeamMemberTone) {
  if (tone === "warning") {
    return "bg-[color:var(--warning)]";
  }

  if (tone === "secondary") {
    return "bg-[color:var(--secondary)]";
  }

  if (tone === "success") {
    return "bg-emerald-500";
  }

  return "bg-[color:var(--primary)]";
}

export function TeamWorkspace({ snapshot }: { snapshot: TeamSnapshot }) {
  return (
    <div className="flex flex-col gap-4">
      <section className="grid items-start gap-4">
        <section className="story-panel px-5 py-5 sm:px-6">
          <span className="story-system-label story-system-label-accent">Team</span>
          <h1 className="mt-4 text-balance font-heading text-[2.55rem] leading-[0.94] text-[color:var(--story-ink)] sm:text-[3.25rem]">
            Keep inputs current.
          </h1>
          <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
            {snapshot.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/schedule"
              className="story-primary-cta inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)]"
            >
              Open week
              <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
            </Link>
            <Link
              href="/shifts"
              className="story-nav-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
            >
              Open shapes
            </Link>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          {snapshot.metrics.map((metric) => (
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
      </section>

      <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)]">
        <section className="story-panel px-5 py-5 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                People
              </p>
              <h2 className="mt-2 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
                Keep the week human.
              </h2>
            </div>
            <span className="story-system-label">{snapshot.members.length} profiles</span>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-2">
            {snapshot.members.map((member) => (
              <article key={member.id} className="story-soft-card px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-[color:var(--story-ink)]">
                      {member.name}
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--story-muted)]">
                      {member.role} / {member.site}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_12px_28px_rgba(20,28,58,0.08)] dark:bg-white/6 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_40px_rgba(3,7,24,0.32)]">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${getToneDot(member.tone)}`}
                    />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--story-subtle)]">
                      {member.status}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-[color:var(--story-muted)]">
                  {member.detail}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span key={skill} className="story-system-label">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="story-panel px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            Needs action
          </p>
          <div className="mt-4 space-y-3">
            {snapshot.tasks.map((task) => (
              <article key={task.title} className="story-soft-card px-4 py-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${getToneDot(task.tone)}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[color:var(--story-ink)]">
                      {task.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
                      {task.detail}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
