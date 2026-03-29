import { PublicSystemLabel } from "@/features/public-entry/components/public-system-label";
import { PreviewDay } from "@/features/public-entry/components/preview-day";
import type { DayPreview, LandingCopy } from "@/features/public-entry/types";

type LandingPreviewPanelProps = {
  content: LandingCopy;
  days: DayPreview[];
  signals: readonly string[];
};

export function LandingPreviewPanel({
  content,
  days,
  signals,
}: LandingPreviewPanelProps) {
  return (
    <section className="story-stage story-reveal w-full max-w-[1120px] px-4 py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 backdrop-blur-[2px]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            {content.previewEyebrow}
          </p>
          <p className="mt-2 max-w-[22rem] text-lg font-medium text-[color:var(--story-ink)] md:text-xl">
            {content.previewHeading}
          </p>
        </div>

        <div
          className="story-fairness-indicator story-reveal shrink-0"
          style={{ animationDelay: "0.14s" }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-subtle)]">
            {content.fairness.label}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span className="story-status-dot" />
            <p className="text-base font-semibold text-[color:var(--story-ink)]">
              {content.fairness.value} {content.fairness.qualifier}
            </p>
          </div>
          <p className="mt-1 text-[11px] font-medium text-[color:var(--story-muted)]">
            {content.fairness.state}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {days.map((day, index) => (
          <div
            key={day.day}
            className={index === 2 ? "col-span-2 lg:col-span-1" : undefined}
          >
            <PreviewDay
              {...day}
              compact
              animationDelay={`${0.1 + index * 0.06}s`}
            />
          </div>
        ))}
      </div>

      {/* <div className="mt-4 flex flex-wrap gap-2">
        {signals.map((signal, index) => (
          <PublicSystemLabel
            key={signal}
            accent
            className={index > 1 ? "hidden lg:inline-flex" : "inline-flex"}
          >
            {signal}
          </PublicSystemLabel>
        ))}
      </div> */}
    </section>
  );
}
