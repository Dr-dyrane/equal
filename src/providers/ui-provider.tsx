"use client";

import { createContext, useContext, useState } from "react";
import { usePersistentState } from "@/providers/use-persistent-state";

export type DensityMode = "comfortable" | "compact";
export type ScheduleViewMode = "day" | "week" | "month" | "board";

type UIContextValue = {
  commandPaletteOpen: boolean;
  mobileNavOpen: boolean;
  quickActionsOpen: boolean;
  activeSheetId: string | null;
  density: DensityMode;
  scheduleView: ScheduleViewMode;
  setCommandPaletteOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setQuickActionsOpen: (open: boolean) => void;
  setActiveSheetId: (sheetId: string | null) => void;
  setDensity: (density: DensityMode) => void;
  setScheduleView: (view: ScheduleViewMode) => void;
  cycleDensity: () => void;
  cycleScheduleView: () => void;
};

const SCHEDULE_VIEWS: ScheduleViewMode[] = ["day", "week", "month", "board"];

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [density, setDensity] = usePersistentState<DensityMode>(
    "equal.ui.density",
    "comfortable",
  );
  const [scheduleView, setScheduleView] =
    usePersistentState<ScheduleViewMode>("equal.ui.schedule-view", "week");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [activeSheetId, setActiveSheetId] = useState<string | null>(null);

  return (
    <UIContext.Provider
      value={{
        commandPaletteOpen,
        mobileNavOpen,
        quickActionsOpen,
        activeSheetId,
        density,
        scheduleView,
        setCommandPaletteOpen,
        setMobileNavOpen,
        setQuickActionsOpen,
        setActiveSheetId,
        setDensity,
        setScheduleView,
        cycleDensity: () =>
          setDensity((current) =>
            current === "comfortable" ? "compact" : "comfortable",
          ),
        cycleScheduleView: () =>
          setScheduleView((current) => {
            const currentIndex = SCHEDULE_VIEWS.indexOf(current);

            return SCHEDULE_VIEWS[(currentIndex + 1) % SCHEDULE_VIEWS.length];
          }),
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used within a UIProvider.");
  }

  return context;
}
