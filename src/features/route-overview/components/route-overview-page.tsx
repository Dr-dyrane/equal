import Link from "next/link";
import { SfSymbol } from "@/components/sf-symbol";
import type { RouteOverviewContent } from "@/features/route-overview/types";

export function RouteOverviewPage({
  content,
}: {
  content: RouteOverviewContent;
}) {
  return (
    <div className="flex flex-col gap-4">
      <section className="story-panel px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <span className="story-chip inline-flex px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            {content.eyebrow}
          </span>
          <div className="story-icon-well flex h-12 w-12 items-center justify-center text-[color:var(--story-ink)]">
            <SfSymbol name={content.icon} className="h-5 w-5" />
          </div>
        </div>

        <h1 className="mt-5 max-w-4xl text-balance font-heading text-[2.8rem] leading-[0.92] text-[color:var(--story-ink)] sm:text-[3.4rem]">
          {content.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--story-muted)] sm:text-lg">
          {content.description}
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href={content.primaryAction.href}
            className="story-primary-cta inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)]"
          >
            {content.primaryAction.label}
            <SfSymbol name="arrow-right" className="h-4 w-4" />
          </Link>
          {content.secondaryAction ? (
            <Link
              href={content.secondaryAction.href}
              className="story-cta-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
            >
              {content.secondaryAction.label}
              <SfSymbol name="arrow-up-right" className="h-4 w-4" />
            </Link>
          ) : null}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {content.metrics.map((metric) => (
            <article key={metric.label} className="story-soft-card px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
                {metric.label}
              </p>
              <p className="mt-3 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
                {metric.value}
              </p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
                {metric.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {content.sections.map((section) => (
            <article key={section.title} className="story-soft-card px-5 py-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
                {section.eyebrow}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-[color:var(--story-ink)]">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
                {section.description}
              </p>
              <div className="mt-4 space-y-3">
                {section.items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--story-brand-blue)]" />
                    <p className="text-sm leading-6 text-[color:var(--story-ink)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <aside className="story-panel px-5 py-5 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            {content.tasksTitle}
          </p>
          <h2 className="mt-3 max-w-sm text-balance font-heading text-[2.1rem] leading-[0.96] text-[color:var(--story-ink)]">
            {content.tasksHeading}
          </h2>

          <div className="mt-5 space-y-3">
            {content.tasks.map((task) =>
              task.href ? (
                <Link
                  key={task.title}
                  href={task.href}
                  className="story-soft-card flex items-start justify-between gap-4 px-4 py-4 transition hover:-translate-y-[1px]"
                >
                  <div>
                    <p className="text-base font-semibold text-[color:var(--story-ink)]">
                      {task.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
                      {task.detail}
                    </p>
                  </div>
                  <SfSymbol
                    name="arrow-right"
                    className="mt-1 h-4 w-4 shrink-0 text-[color:var(--story-subtle)]"
                  />
                </Link>
              ) : (
                <div key={task.title} className="story-soft-card px-4 py-4">
                  <p className="text-base font-semibold text-[color:var(--story-ink)]">
                    {task.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
                    {task.detail}
                  </p>
                </div>
              ),
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
