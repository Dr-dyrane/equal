"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { SfSymbol } from "@/components/sf-symbol";
import {
  getAnalyticsMetrics,
  getAnalyticsSignals,
  getAnalyticsSummary,
  getLedgerLines,
} from "@/features/fairness/content";
import { AnalyticsSupportSheet } from "@/features/fairness/components/analytics-support-sheet";
import { useFairness } from "@/features/fairness/provider/fairness-provider";
import type { AnalyticsSnapshot, LedgerLine } from "@/features/fairness/types";
import { useGlobalActions } from "@/providers/global-actions-provider";

function getToneDot(tone: LedgerLine["tone"]) {
  if (tone === "secondary") {
    return "bg-[color:var(--secondary)]";
  }

  if (tone === "success") {
    return "bg-emerald-500";
  }

  return "bg-[color:var(--primary)]";
}

export function AnalyticsWorkspace({ snapshot }: { snapshot: AnalyticsSnapshot }) {
  const { registerActions, unregisterActions } = useGlobalActions();
  const {
    comparisonMode,
    cycleComparisonMode,
    cycleWindow,
    explanationPanelOpen,
    toggleExplanationPanel,
    window,
  } = useFairness();
  const [supportOpen, setSupportOpen] = useState(false);

  const summary = useMemo(
    () => getAnalyticsSummary(snapshot, window, comparisonMode),
    [comparisonMode, snapshot, window],
  );
  const metrics = useMemo(
    () => getAnalyticsMetrics(snapshot, window, comparisonMode),
    [comparisonMode, snapshot, window],
  );
  const signals = useMemo(
    () => getAnalyticsSignals(snapshot, window, comparisonMode, explanationPanelOpen),
    [comparisonMode, explanationPanelOpen, snapshot, window],
  );
  const ledger = useMemo(() => getLedgerLines(snapshot, window), [snapshot, window]);
  const selectedLine = ledger[0] ?? null;

  useEffect(() => {
    registerActions("analytics-page", [
      {
        id: "analytics-cycle-window",
        label: "Switch window",
        description: `Current window: ${window}.`,
        tone: "primary",
        run: cycleWindow,
      },
      {
        id: "analytics-cycle-lens",
        label: "Change lens",
        description: `Current lens: ${comparisonMode}.`,
        run: cycleComparisonMode,
      },
      {
        id: "analytics-open-details",
        label: "Details",
        description: "Open the current fairness watch.",
        run: () => setSupportOpen(true),
      },
      {
        id: "analytics-toggle-notes",
        label: explanationPanelOpen ? "Hide notes" : "Show notes",
        description: "Keep explanation close, not always visible.",
        run: () => {
          toggleExplanationPanel();
          toast.message(explanationPanelOpen ? "Notes hidden." : "Notes visible.");
        },
      },
    ]);

    return () => unregisterActions("analytics-page");
  }, [
    comparisonMode,
    cycleComparisonMode,
    cycleWindow,
    explanationPanelOpen,
    registerActions,
    toggleExplanationPanel,
    unregisterActions,
    window,
  ]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <section className="story-panel px-5 py-5 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <span className="story-system-label story-system-label-accent">
              {summary.badge}
            </span>
            <button
              type="button"
              onClick={() => setSupportOpen(true)}
              className="story-nav-secondary inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-[color:var(--story-ink)]"
            >
              Details
            </button>
          </div>

          <h1 className="mt-4 text-balance font-heading text-[2.55rem] leading-[0.94] text-[color:var(--story-ink)] sm:text-[3.25rem]">
            {summary.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--story-muted)]">
            {summary.detail}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/schedule"
              className="story-primary-cta inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)]"
            >
              Open week
              <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
            </Link>
            <button
              type="button"
              onClick={cycleWindow}
              className="story-nav-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
            >
              Switch window
            </button>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <article
              key={metric.label}
              className={`story-soft-card px-4 py-4 ${
                index === metrics.length - 1 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
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

        {selectedLine ? (
          <section className="grid items-start gap-4">
            <section className="story-panel px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                    Fairness
                  </p>
                  <h2 className="mt-2 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
                    {selectedLine.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
                    {selectedLine.detail}
                  </p>
                </div>
                <span className="story-system-label">{selectedLine.value}</span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="story-soft-card px-4 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
                    Window
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--story-ink)]">
                    {window}
                  </p>
                </div>
                <div className="story-soft-card px-4 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
                    Lens
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--story-ink)]">
                    {comparisonMode}
                  </p>
                </div>
              </div>
            </section>

            <section className="story-panel px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                    Ledger
                  </p>
                  <h3 className="mt-2 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
                    Keep the human load visible.
                  </h3>
                </div>
                <span className="story-system-label">{ledger.length} live</span>
              </div>

              <div className="mt-5 grid grid-cols-2 items-start gap-2 xl:grid-cols-3">
                {ledger.map((line, index) => {
                  const active = index === 0;

                  return (
                    <div
                      key={line.name}
                      className="shift-template-selector"
                      data-active={active ? "true" : "false"}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${getToneDot(line.tone)}`} />
                        <p className="font-heading text-[1.2rem] leading-none text-[color:var(--story-ink)]">
                          {line.name}
                        </p>
                      </div>
                      <p className="mt-2 text-sm text-[color:var(--story-muted)]">
                        {line.value}
                      </p>
                      <p className="mt-1 text-sm text-[color:var(--story-muted)]">
                        {line.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          </section>
        ) : null}
      </div>

      <AnalyticsSupportSheet
        open={supportOpen}
        onOpenChange={setSupportOpen}
        metrics={metrics}
        signals={signals}
      />
    </>
  );
}
