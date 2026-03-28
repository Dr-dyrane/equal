import type { DemoDay } from "@/features/public-entry/types";

type DemoDayColumnProps = {
  day: DemoDay;
  selectedShiftId: string;
  focusShiftId: string;
  onSelectShift: (shiftId: string) => void;
};

export function DemoDayColumn({
  day,
  selectedShiftId,
  focusShiftId,
  onSelectShift,
}: DemoDayColumnProps) {
  return (
    <article className="story-soft-card px-3 py-3 md:px-4 md:py-4">
      <h3 className="font-heading text-[1.9rem] leading-none text-[color:var(--story-ink)] md:text-2xl">
        {day.day}
      </h3>
      <div className="mt-4 space-y-3 md:space-y-2.5">
        {day.shifts.map((shift) => {
          const isSelected = shift.id === selectedShiftId;
          const isFocus = shift.id === focusShiftId;

          return (
            <button
              key={shift.id}
              type="button"
              onClick={() => onSelectShift(shift.id)}
              className={`story-demo-shift ${shift.tone}`}
              data-selected={isSelected}
              data-focus={isFocus}
            >
              <div className="space-y-1.5 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--story-shift-meta)] md:text-[11px]">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-shift-meta)]">
                  {shift.time}
                </p>
                <p className="text-balance text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-shift-meta)]">
                  {shift.label}
                </p>
              </div>
              <p className="mt-2 text-left text-sm font-medium text-[color:var(--story-shift-ink)] md:text-[0.95rem]">
                {shift.person}
              </p>
            </button>
          );
        })}
      </div>
    </article>
  );
}
