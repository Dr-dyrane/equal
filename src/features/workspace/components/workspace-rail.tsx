import Link from "next/link";
import { SfSymbol } from "@/components/sf-symbol";
import type { AttentionItem, FairnessLine } from "@/features/workspace/content";
import type { StartupStep } from "@/lib/startup-routine";

function toneDot(tone: AttentionItem["tone"]) {
  if (tone === "warning") {
    return "bg-[color:var(--warning)]";
  }

  if (tone === "secondary") {
    return "bg-[color:var(--secondary)]";
  }

  return "bg-[color:var(--primary)]";
}

export function WorkspaceRail({
  attention,
  fairness,
  nextSteps,
}: {
  attention: AttentionItem[];
  fairness: FairnessLine[];
  nextSteps: StartupStep[];
}) {
  const primaryStep = nextSteps[0] ?? null;

  return (
    <div className="grid gap-4">
      <section className="story-panel px-5 py-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              Today
            </p>
            <h3 className="mt-2 font-heading text-[1.85rem] leading-none text-[color:var(--story-ink)]">
              What needs you.
            </h3>
          </div>
          <div className="story-fairness-indicator">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--story-subtle)]">
              Fairness
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="story-status-dot" />
              <p className="text-[1.5rem] font-semibold leading-none text-[color:var(--story-ink)]">
                92%
              </p>
            </div>
            <p className="mt-2 text-sm text-[color:var(--story-muted)]">Balanced</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {attention.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="story-soft-card block px-4 py-4 transition hover:-translate-y-[1px]"
            >
              <div className="flex items-start gap-3">
                <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${toneDot(item.tone)}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[color:var(--story-ink)]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
                    {item.detail}
                  </p>
                </div>
                <SfSymbol name="arrow-right" className="mt-1 h-[0.95rem] w-[0.95rem] text-[color:var(--story-subtle)]" />
              </div>
            </Link>
          ))}
        </div>

        {primaryStep ? (
          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              Next step
            </p>
            <Link
              href={primaryStep.href}
              className="story-soft-card mt-3 block px-4 py-4 transition hover:-translate-y-[1px]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="story-system-label">{primaryStep.owner}</span>
                <SfSymbol
                  name="arrow-right"
                  className="h-[0.95rem] w-[0.95rem] text-[color:var(--story-subtle)]"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-[color:var(--story-ink)]">
                {primaryStep.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
                {primaryStep.description}
              </p>
            </Link>
          </div>
        ) : null}
      </section>

      <section className="story-panel px-5 py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
          Human load
        </p>
        <div className="mt-4 space-y-3">
          {fairness.map((line) => (
            <div key={line.name} className="story-soft-card px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[color:var(--story-ink)]">{line.name}</p>
                <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${line.tone}`}>
                  live
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[color:var(--story-muted)]">
                {line.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
