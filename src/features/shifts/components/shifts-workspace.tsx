"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SfSymbol } from "@/components/sf-symbol";
import { ShiftSupportSheet } from "@/features/shifts/components/shift-support-sheet";
import { ShiftTemplateSheet } from "@/features/shifts/components/shift-template-sheet";
import type { ShiftSnapshot, ShiftTemplateCard } from "@/features/shifts/types";
import { useGlobalActions } from "@/providers/global-actions-provider";

export function ShiftsWorkspace({ snapshot: initialSnapshot }: { snapshot: ShiftSnapshot }) {
  const { registerActions, unregisterActions } = useGlobalActions();
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    initialSnapshot.templates[0]?.id ?? null,
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const selectedTemplate = useMemo<ShiftTemplateCard | null>(
    () =>
      snapshot.templates.find((template) => template.id === selectedTemplateId) ??
      snapshot.templates[0] ??
      null,
    [selectedTemplateId, snapshot.templates],
  );

  useEffect(() => {
    if (!selectedTemplate) {
      unregisterActions("shifts-editor");
      return;
    }

    registerActions("shifts-editor", [
      {
        id: "shifts-edit-shape",
        label: "Edit shape",
        description: `Adjust ${selectedTemplate.name.toLowerCase()}.`,
        tone: "primary",
        run: () => {
          setSheetOpen(true);
        },
      },
      {
        id: "shifts-open-details",
        label: "Details",
        description: "Open the week watch.",
        run: () => {
          setSupportOpen(true);
        },
      },
    ]);

    return () => unregisterActions("shifts-editor");
  }, [registerActions, selectedTemplate, unregisterActions]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <section className="story-panel px-5 py-5 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <span className="story-system-label story-system-label-accent">Shifts</span>
            <button
              type="button"
              onClick={() => setSupportOpen(true)}
              className="story-nav-secondary inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-[color:var(--story-ink)]"
            >
              Details
            </button>
          </div>

          <h1 className="mt-4 text-balance font-heading text-[2.55rem] leading-[0.94] text-[color:var(--story-ink)] sm:text-[3.25rem]">
            Keep demand clear.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--story-muted)]">
            {snapshot.summary}
          </p>

          {selectedTemplate ? (
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="story-primary-cta inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)]"
              >
                Edit shape
                <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
              </button>
              <Link
                href="/schedule"
                className="story-nav-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
              >
                Open week
              </Link>
            </div>
          ) : null}
        </section>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {snapshot.metrics.map((metric, index) => (
            <article
              key={metric.label}
              className={`story-soft-card px-4 py-4 ${
                index === snapshot.metrics.length - 1 ? "col-span-2 md:col-span-1" : ""
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

        {selectedTemplate ? (
          <section className="grid items-start gap-4">
            <section className="story-panel px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                    Pick a shape
                  </p>
                  <h2 className="mt-2 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
                    {selectedTemplate.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
                    {selectedTemplate.dayLabel} · {selectedTemplate.window} · {selectedTemplate.site}
                  </p>
                </div>
                <span className="story-system-label">{selectedTemplate.headcount}</span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="story-soft-card px-4 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
                    Day
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--story-ink)]">
                    {selectedTemplate.dayLabel}
                  </p>
                </div>
                <div className="story-soft-card px-4 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
                    Window
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--story-ink)]">
                    {selectedTemplate.window}
                  </p>
                </div>
                <div className="story-soft-card px-4 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
                    Site
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--story-ink)]">
                    {selectedTemplate.site}
                  </p>
                </div>
                <div className="story-soft-card px-4 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
                    Skills
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--story-ink)]">
                    {selectedTemplate.skills.length}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-[color:var(--story-muted)]">
                {selectedTemplate.detail}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedTemplate.skills.map((skill) => (
                  <span key={skill} className="story-system-label">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="story-panel px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                    Shapes
                  </p>
                  <h3 className="mt-2 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
                    Choose the next one.
                  </h3>
                </div>
                <span className="story-system-label">{snapshot.templates.length} live</span>
              </div>

              <div className="mt-5 grid grid-cols-2 items-start gap-2 xl:grid-cols-3">
                {snapshot.templates.map((template) => {
                  const active = template.id === selectedTemplate.id;

                  return (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => setSelectedTemplateId(template.id)}
                      className={`shift-template-selector ${ active ? 'bg-accent':'bg-surface'}  rounded-2xl p-4 shadow glass`}
                      data-active={active ? "true" : "false"}
                      aria-pressed={active}
                      data-template-id={template.id}
                    >
                      <p className="font-heading text-[1.2rem] leading-none text-[color:var(--story-ink)]">
                        {template.name}
                      </p>
                      <p className="mt-2 text-sm text-[color:var(--story-muted)]">
                        {template.dayLabel}
                      </p>
                      <p className="mt-1 text-sm text-[color:var(--story-muted)]">
                        {template.window}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>
          </section>
        ) : null}
      </div>

      <ShiftSupportSheet
        open={supportOpen}
        onOpenChange={setSupportOpen}
        tasks={snapshot.tasks}
        metrics={snapshot.metrics}
      />
      <ShiftTemplateSheet
        template={selectedTemplate}
        skillOptions={snapshot.skillOptions}
        open={sheetOpen && Boolean(selectedTemplate)}
        onOpenChange={(open) => setSheetOpen(open)}
        onSaved={(nextSnapshot) => {
          setSnapshot(nextSnapshot);
        }}
      />
    </>
  );
}
