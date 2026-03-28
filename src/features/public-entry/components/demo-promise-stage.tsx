"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { startTransition, useMemo, useState } from "react";
import { SfSymbol } from "@/components/sf-symbol";
import { demoFeatureExperiences } from "@/features/public-entry/content";
import type { DemoFeatureExperienceId } from "@/features/public-entry/types";

const featureIconById = {
  schedule: "calendar-circle-fill",
  team: "person-2-fill",
  swaps: "rectangle-portrait-and-arrow-right",
  analytics: "chart-bar-fill",
  setup: "gearshape-fill",
} as const;

export function DemoPromiseStage() {
  const [activeId, setActiveId] = useState<DemoFeatureExperienceId | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const activeFeature = useMemo(
    () =>
      demoFeatureExperiences.find((feature) => feature.id === activeId) ??
      demoFeatureExperiences[0],
    [activeId],
  );

  function openFeature(id: DemoFeatureExperienceId) {
    startTransition(() => {
      setActiveId(id);
      setSheetOpen(false);
    });
  }

  function closeFeature() {
    startTransition(() => {
      setActiveId(null);
      setSheetOpen(false);
    });
  }

  function openSheet() {
    startTransition(() => {
      setSheetOpen(true);
    });
  }

  return (
    <Dialog.Root open={sheetOpen} onOpenChange={setSheetOpen}>
      <section className="story-reveal w-full space-y-5 md:space-y-6">
        <div className="max-w-[32rem] space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            Try a task
          </p>
          <h2 className="text-balance font-heading text-[2rem] leading-[0.94] text-[color:var(--story-ink)] md:text-[2.6rem]">
            Add shifts. Add people. Review swaps.
          </h2>
        </div>

        <div className="story-stack-stage mt-5">
          <article className="story-stack-page" data-state={activeId ? "back" : "root"}>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                Start here
              </p>
              <p className="mt-2 text-lg font-medium text-[color:var(--story-ink)] md:text-xl">
                Pick a task.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {demoFeatureExperiences.map((feature) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => openFeature(feature.id)}
                  className="story-stack-row text-left"
                >
                  <span className="story-icon-well inline-flex h-10 w-10 items-center justify-center">
                    <SfSymbol
                      name={featureIconById[feature.id]}
                      className="h-4 w-4 text-[color:var(--story-ink)]"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[color:var(--story-ink)]">
                      {feature.label}
                    </p>
                    <p className="story-stack-row-meta">{feature.action}</p>
                  </div>
                  <SfSymbol
                    name="arrow-right"
                    className="h-4 w-4 shrink-0 text-[color:var(--story-subtle)]"
                  />
                </button>
              ))}
            </div>
          </article>

          <article className="story-stack-page" data-state={activeId ? "active" : "hidden"}>
            <div className="story-stack-page-bar">
              <button
                type="button"
                onClick={closeFeature}
                className="story-nav-secondary inline-flex h-11 w-11 items-center justify-center text-[color:var(--story-ink)]"
                aria-label="Back to feature list"
              >
                <SfSymbol name="arrow-right" className="h-4 w-4 rotate-180" />
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                  {activeFeature.label}
                </p>
                <p className="mt-2 text-lg font-medium text-[color:var(--story-ink)] md:text-xl">
                  {activeFeature.surfaceTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={openSheet}
                className="story-primary-cta inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[color:var(--story-primary-text)]"
              >
                Open
                <SfSymbol name="arrow-right" className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {activeFeature.surfaceItems.map((item) => (
                <div key={item} className="story-stack-tile">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--story-subtle)]">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="story-soft-card mt-5 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                What changes
              </p>
              <div className="mt-3 flex items-start gap-3">
                <span className="story-status-dot mt-1" />
                <p className="text-sm leading-7 text-[color:var(--story-ink)]">
                  {activeFeature.liveState}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {activeId ? (
        <Dialog.Portal>
          <Dialog.Overlay forceMount className="story-stack-dialog-overlay" />
          <Dialog.Content forceMount className="story-stack-dialog-content">
            <div className="story-sheet-handle" />

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="text-lg font-semibold text-[color:var(--story-ink)]">
                    {activeFeature.sheetTitle}
                  </Dialog.Title>
                </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  className="story-nav-secondary inline-flex h-11 w-11 items-center justify-center text-[color:var(--story-ink)]"
                  aria-label="Close details"
                >
                  <SfSymbol name="xmark" className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>

            <div className="mt-4 space-y-2.5">
              {activeFeature.sheetFields.map((field) => (
                <div key={field} className="story-stack-field">
                  {field}
                </div>
              ))}
            </div>

            <Dialog.Description className="mt-4 text-sm leading-7 text-[color:var(--story-muted)]">
              {activeFeature.liveState}
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Portal>
      ) : null}
    </Dialog.Root>
  );
}
