"use client";

import Link from "next/link";
import { SfSymbol } from "@/components/sf-symbol";
import { useAuth } from "@/providers/auth-provider";
import { useOrg } from "@/providers/org-provider";
import {
  getAttentionItems,
  getDashboardDays,
  getDashboardMetrics,
  getFairnessLines,
  getRoleSteps,
} from "@/features/workspace/content";
import { WorkspaceMetricCard } from "./workspace-metric-card";
import { WorkspaceRail } from "./workspace-rail";
import { WorkspaceWeekBoard } from "./workspace-week-board";

function getFirstName(name: string | undefined) {
  return name?.split(" ")[0] ?? "Team";
}

export function WorkspaceDashboard() {
  const { user } = useAuth();
  const { role, activeSite, activeTeam } = useOrg();
  const metrics = getDashboardMetrics();
  const days = getDashboardDays();
  const attention = getAttentionItems(role);
  const fairness = getFairnessLines();
  const nextSteps = getRoleSteps(role);

  return (
    <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(21rem,0.75fr)]">
      <div className="grid items-start gap-4">
        <section className="story-panel px-5 py-5 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            Today
          </p>
          <h2 className="mt-3 text-balance font-heading text-[2.55rem] leading-[0.94] text-[color:var(--story-ink)] sm:text-[3.25rem]">
            {getFirstName(user?.name)}, keep the week balanced.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--story-muted)]">
            {activeTeam.name} at {activeSite.name} is ready for review. One fairness
            risk and one swap need attention.
          </p>

          <div className="mt-5">
            <Link
              href="/schedule"
              className="story-primary-cta inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)]"
            >
              Open schedule
              <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
            </Link>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          {metrics.map((metric) => (
            <WorkspaceMetricCard key={metric.label} metric={metric} />
          ))}
        </section>

        <WorkspaceWeekBoard days={days} />
      </div>

      <WorkspaceRail attention={attention} fairness={fairness} nextSteps={nextSteps} />
    </section>
  );
}
