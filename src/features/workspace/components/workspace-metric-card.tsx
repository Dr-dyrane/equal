import type { DashboardMetric } from "@/features/workspace/content";

export function WorkspaceMetricCard({ metric }: { metric: DashboardMetric }) {
  return (
    <article className="story-soft-card px-4 py-4 sm:px-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
        {metric.label}
      </p>
      <p className="mt-3 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
        {metric.value}
      </p>
      <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
        {metric.detail}
      </p>
    </article>
  );
}

