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
    <article className="story-soft-card p-4 md:p-5">
      <h3 className="font-heading text-2xl text-[color:var(--story-ink)]">
        {day.day}
      </h3>
      <div className="mt-4 space-y-3">
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
              <div className="flex items-start justify-between gap-3">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-shift-meta)]">
                  {shift.time}
                </p>
                <p className="max-w-[8.5rem] truncate text-right text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--story-shift-meta)]">
                  {shift.label}
                </p>
              </div>
              <p className="mt-3 text-left text-lg font-semibold text-[color:var(--story-shift-ink)]">
                {shift.person}
              </p>
            </button>
          );
        })}
      </div>
    </article>
  );
}
