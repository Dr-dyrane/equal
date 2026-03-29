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
  getWorkspaceModules,
} from "@/features/workspace/content";
import { WorkspaceMetricCard } from "./workspace-metric-card";
import { WorkspaceModuleGrid } from "./workspace-module-grid";
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
  const modules = getWorkspaceModules();

  return (
    <div className="flex flex-col gap-4">
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="story-panel px-5 py-5 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            Start here
          </p>
          <h2 className="mt-3 text-balance font-heading text-[2.55rem] leading-[0.94] text-[color:var(--story-ink)] sm:text-[3.25rem]">
            {getFirstName(user?.name)}, keep the week balanced.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--story-muted)]">
            {activeTeam.name} at {activeSite.name} is ready for review. One fairness risk
            and one swap need attention.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/schedule"
              className="story-primary-cta inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)]"
            >
              Open schedule
              <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
            </Link>
            <Link
              href={nextSteps[0]?.href ?? "/onboarding"}
              className="story-cta-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
            >
              Continue setup
              <SfSymbol name="arrow-up-right" className="h-[0.95rem] w-[0.95rem]" />
            </Link>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {metrics.map((metric) => (
              <WorkspaceMetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </section>

        <WorkspaceRail attention={attention} fairness={fairness} nextSteps={nextSteps} />
      </section>

      <WorkspaceWeekBoard days={days} />

      <section className="story-panel px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              Open next
            </p>
            <h3 className="mt-2 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
              Every core surface is one tap away.
            </h3>
          </div>
          <Link
            href="/onboarding"
            className="story-cta-secondary inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
          >
            Open setup
            <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
          </Link>
        </div>

        <div className="mt-5">
          <WorkspaceModuleGrid modules={modules} />
        </div>
      </section>
    </div>
  );
}
