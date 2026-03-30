"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { SfSymbol } from "@/components/sf-symbol";
import { SettingsSupportSheet } from "@/features/settings/components/settings-support-sheet";
import type { SettingsRuleCard, SettingsSnapshot } from "@/features/settings/types";
import { useGlobalActions } from "@/providers/global-actions-provider";

export function SettingsWorkspace({ snapshot: initialSnapshot }: { snapshot: SettingsSnapshot }) {
  const { registerActions, unregisterActions } = useGlobalActions();
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(
    initialSnapshot.rules[0]?.id ?? null,
  );
  const [supportOpen, setSupportOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const selectedRule = useMemo<SettingsRuleCard | null>(
    () => snapshot.rules.find((rule) => rule.id === selectedRuleId) ?? snapshot.rules[0] ?? null,
    [selectedRuleId, snapshot.rules],
  );

  useEffect(() => {
    if (!selectedRule) {
      unregisterActions("settings-rule");
      return;
    }

    registerActions("settings-rule", [
      {
        id: "settings-toggle-rule",
        label: selectedRule.enabled ? "Pause rule" : "Enable rule",
        description: `${selectedRule.name} is ${selectedRule.enabled ? "on" : "off"}.`,
        tone: "primary",
        run: () => {
          void toggleRule();
        },
      },
      {
        id: "settings-open-details",
        label: "Details",
        description: "Open the trust view for current guardrails.",
        run: () => {
          setSupportOpen(true);
        },
      },
    ]);

    return () => unregisterActions("settings-rule");
  }, [registerActions, selectedRule, unregisterActions]);

  async function toggleRule() {
    if (!selectedRule || saving) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/settings/rule", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ruleId: selectedRule.id,
          enabled: !selectedRule.enabled,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | SettingsSnapshot
        | { message?: string };

      if (!response.ok || !payload || !("rules" in payload)) {
        toast.error(payload?.message ?? "Could not update that rule.");
        return;
      }

      setSnapshot(payload);
      toast.success(selectedRule.enabled ? "Rule paused." : "Rule enabled.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <section className="story-panel px-5 py-5 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <span className="story-system-label story-system-label-accent">Settings</span>
            <button
              type="button"
              onClick={() => setSupportOpen(true)}
              className="story-nav-secondary inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-[color:var(--story-ink)]"
            >
              Details
            </button>
          </div>

          <h1 className="mt-4 text-balance font-heading text-[2.55rem] leading-[0.94] text-[color:var(--story-ink)] sm:text-[3.25rem]">
            Keep the guardrails clear.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--story-muted)]">
            {snapshot.summary}
          </p>

          {selectedRule ? (
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void toggleRule()}
                disabled={saving}
                className="story-primary-cta inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)] disabled:opacity-70"
              >
                {selectedRule.enabled ? "Pause rule" : "Enable rule"}
                <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
              </button>
              <Link
                href="/analytics"
                className="story-nav-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
              >
                Open insights
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

        {selectedRule ? (
          <section className="grid items-start gap-4">
            <section className="story-panel px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                    Pick a rule
                  </p>
                  <h2 className="mt-2 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
                    {selectedRule.name}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
                    {selectedRule.scope}
                  </p>
                </div>
                <span className="story-system-label">
                  {selectedRule.enabled ? "Enabled" : "Paused"}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="story-soft-card px-4 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
                    Type
                  </p>
                  <p className="mt-2 text-sm font-semibold capitalize text-[color:var(--story-ink)]">
                    {selectedRule.type}
                  </p>
                </div>
                <div className="story-soft-card px-4 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
                    Weight
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[color:var(--story-ink)]">
                    {selectedRule.weight}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-[color:var(--story-muted)]">
                {selectedRule.detail}
              </p>
            </section>

            <section className="story-panel px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                    Rules
                  </p>
                  <h3 className="mt-2 font-heading text-[2rem] leading-none text-[color:var(--story-ink)]">
                    Choose the next one.
                  </h3>
                </div>
                <span className="story-system-label">{snapshot.rules.length} live</span>
              </div>

              <div className="mt-5 grid grid-cols-2 items-start gap-2 xl:grid-cols-3">
                {snapshot.rules.map((rule) => {
                  const active = rule.id === selectedRule.id;

                  return (
                    <button
                      key={rule.id}
                      type="button"
                      onClick={() => setSelectedRuleId(rule.id)}
                      className="shift-template-selector"
                      data-active={active ? "true" : "false"}
                      aria-pressed={active}
                      data-rule-id={rule.id}
                    >
                      <p className="font-heading text-[1.2rem] leading-none text-[color:var(--story-ink)]">
                        {rule.name}
                      </p>
                      <p className="mt-2 text-sm capitalize text-[color:var(--story-muted)]">
                        {rule.type}
                      </p>
                      <p className="mt-1 text-sm text-[color:var(--story-muted)]">
                        {rule.scope}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>
          </section>
        ) : null}
      </div>

      <SettingsSupportSheet
        open={supportOpen}
        onOpenChange={setSupportOpen}
        tasks={snapshot.tasks}
        metrics={snapshot.metrics}
      />
    </>
  );
}
