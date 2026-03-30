"use client";

import Link from "next/link";
import { ResponsiveSheet } from "@/features/shell/components/responsive-sheet";
import type { SettingsSnapshot, SettingsTaskTone } from "@/features/settings/types";

type SettingsSupportSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tasks: SettingsSnapshot["tasks"];
  metrics: SettingsSnapshot["metrics"];
};

function getToneDot(tone: SettingsTaskTone) {
  if (tone === "warning") {
    return "bg-[color:var(--warning)]";
  }

  if (tone === "secondary") {
    return "bg-[color:var(--secondary)]";
  }

  return "bg-[color:var(--primary)]";
}

export function SettingsSupportSheet({
  open,
  onOpenChange,
  tasks,
  metrics,
}: SettingsSupportSheetProps) {
  return (
    <ResponsiveSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Settings"
      description="Keep guardrails visible before the week goes out."
    >
      <div className="space-y-4">
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            Watch
          </p>
          <div className="mt-3 space-y-3">
            {tasks.map((task) => (
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
        </section>

        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            What holds
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {metrics.map((metric) => (
              <article key={metric.label} className="story-soft-card px-4 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
                  {metric.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-[color:var(--story-ink)]">
                  {metric.value}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-2 sm:grid-cols-2">
          <Link
            href="/schedule"
            onClick={() => onOpenChange(false)}
            className="story-primary-cta inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)]"
          >
            Open week
          </Link>
          <Link
            href="/analytics"
            onClick={() => onOpenChange(false)}
            className="story-nav-secondary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
          >
            Open insights
          </Link>
        </div>
      </div>
    </ResponsiveSheet>
  );
}
