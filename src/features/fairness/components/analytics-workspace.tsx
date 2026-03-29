"use client";

import Link from "next/link";
import { SfSymbol } from "@/components/sf-symbol";
import {
  getAnalyticsMetrics,
  getAnalyticsSignals,
  getAnalyticsSummary,
  getLedgerLines,
  type AnalyticsSignal,
  type LedgerLine,
} from "@/features/fairness/content";
import { useFairness } from "@/features/fairness/provider/fairness-provider";

function getToneClass(tone: AnalyticsSignal["tone"] | LedgerLine["tone"]) {
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

export function AnalyticsWorkspace() {
  const {
    comparisonMode,
    cycleComparisonMode,
    cycleWindow,
    explanationPanelOpen,
    toggleExplanationPanel,
    window,
  } = useFairness();

  const summary = getAnalyticsSummary(window, comparisonMode);
  const metrics = getAnalyticsMetrics(window, comparisonMode);
  const signals = getAnalyticsSignals(window, comparisonMode, explanationPanelOpen);
  const ledger = getLedgerLines(window, comparisonMode);

  return (
    <div className="flex flex-col gap-4">
      <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(21rem,0.75fr)]">
        <div className="grid items-start gap-4">
          <section className="story-panel px-5 py-5 sm:px-6">
            <span className="story-system-label story-system-label-accent">
              {summary.badge}
            </span>
            <h1 className="mt-4 text-balance font-heading text-[2.55rem] leading-[0.94] text-[color:var(--story-ink)] sm:text-[3.25rem]">
              {summary.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--story-muted)]">
              {summary.detail}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/schedule"
                className="story-primary-cta inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)]"
              >
                Review fairness drift
                <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
              </Link>
              <button
                type="button"
                onClick={cycleWindow}
                className="story-nav-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
              >
                Switch window
              </button>
              <button
                type="button"
                onClick={cycleComparisonMode}
                className="story-nav-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
              >
                Change lens
              </button>
            </div>
          </section>

          <section className="grid gap-3 md:grid-cols-3">
            {metrics.map((metric) => (
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
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                  What stands out
                </p>
              </div>
              <button
                type="button"
                onClick={toggleExplanationPanel}
                className="app-shell-icon-button"
                aria-label={explanationPanelOpen ? "Hide decision notes" : "Show decision notes"}
                title={explanationPanelOpen ? "Hide decision notes" : "Show decision notes"}
              >
                <SfSymbol name="sparkles" className="h-[1rem] w-[1rem]" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {signals.map((signal) => (
                <div key={signal.title} className="story-soft-card px-4 py-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${getToneClass(signal.tone)}`}
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
        </div>
      </section>

      <section className="story-panel px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              Fairness ledger
            </p>
            <h2 className="mt-2 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
              Keep the human load visible.
            </h2>
          </div>
          <span className="story-system-label">
            {comparisonMode === "team" ? "Team view" : comparisonMode === "role" ? "Role view" : "Self view"}
          </span>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {ledger.map((line) => (
            <article key={line.name} className="story-soft-card px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-[color:var(--story-ink)]">
                    {line.name}
                  </p>
                  <p className="mt-3 font-heading text-[1.9rem] leading-none text-[color:var(--story-ink)]">
                    {line.value}
                  </p>
                </div>
                <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${getToneClass(line.tone)}`} />
              </div>
              <p className="mt-4 text-sm leading-6 text-[color:var(--story-muted)]">
                {line.detail}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
