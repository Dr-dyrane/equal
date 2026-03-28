import type { DayPreview } from "@/features/public-entry/types";

type PreviewDayProps = DayPreview & {
  compact?: boolean;
  animationDelay?: string;
};

export function PreviewDay({
  day,
  shifts,
  compact = false,
  animationDelay,
}: PreviewDayProps) {
  return (
    <article
      className="story-soft-card story-reveal px-3 py-3 md:px-4 md:py-4"
      style={animationDelay ? { animationDelay } : undefined}
    >
      <p className="text-lg font-medium text-[color:var(--story-ink)] md:text-[1.35rem]">
        {day}
      </p>
      <div className={`mt-4 space-y-3 ${compact ? "md:space-y-2.5" : ""}`}>
        {shifts.map((shift) => (
          <div
            key={`${day}-${shift.time}-${shift.person}`}
            className={`rounded-[18px] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:rounded-[20px] ${shift.tone}`}
          >
            <div className="space-y-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--story-shift-meta)] md:text-[11px]">
              <p>{shift.time}</p>
              <p className="text-balance">{shift.label}</p>
            </div>
            <p className="mt-2 text-sm font-medium text-[color:var(--story-shift-ink)] md:text-[0.95rem]">
              {shift.person}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
