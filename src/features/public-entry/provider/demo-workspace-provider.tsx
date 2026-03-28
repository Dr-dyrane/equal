"use client";

import { createContext, useContext, useState } from "react";
import {
  demoFocusShiftId,
  demoScenarios,
} from "@/features/public-entry/content";
import type {
  DemoScenarioKey,
  DemoScenarioState,
  DemoShift,
} from "@/features/public-entry/types";

type DemoWorkspaceContextValue = {
  scenario: DemoScenarioKey;
  state: DemoScenarioState;
  selectedShiftId: string;
  selectedShift: DemoShift;
  sheetOpen: boolean;
  canApplySuggestion: boolean;
  selectShift: (shiftId: string) => void;
  closeSheet: () => void;
  applySuggestion: () => void;
  resetDemo: () => void;
};

const DemoWorkspaceContext = createContext<DemoWorkspaceContextValue | null>(null);

function findShift(state: DemoScenarioState, shiftId: string) {
  return (
    state.days.flatMap((day) => day.shifts).find((shift) => shift.id === shiftId) ??
    state.days[0].shifts[0]
  );
}

export function DemoWorkspaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scenario, setScenario] = useState<DemoScenarioKey>("baseline");
  const [selectedShiftId, setSelectedShiftId] = useState(demoFocusShiftId);
  const [sheetOpen, setSheetOpen] = useState(false);
  const state = demoScenarios[scenario];
  const selectedShift = findShift(state, selectedShiftId);
  const canApplySuggestion =
    scenario === "baseline" && selectedShiftId === demoFocusShiftId;

  function selectShift(shiftId: string) {
    setSelectedShiftId(shiftId);
    setSheetOpen(true);
  }

  function closeSheet() {
    setSheetOpen(false);
  }

  function applySuggestion() {
    if (!canApplySuggestion) {
      return;
    }

    setScenario("balanced");
    setSelectedShiftId(demoFocusShiftId);
    setSheetOpen(true);
  }

  function resetDemo() {
    setScenario("baseline");
    setSelectedShiftId(demoFocusShiftId);
  }

  return (
    <DemoWorkspaceContext.Provider
      value={{
        scenario,
        state,
        selectedShiftId,
        selectedShift,
        sheetOpen,
        canApplySuggestion,
        selectShift,
        closeSheet,
        applySuggestion,
        resetDemo,
      }}
    >
      {children}
    </DemoWorkspaceContext.Provider>
  );
}

export function useDemoWorkspace() {
  const context = useContext(DemoWorkspaceContext);

  if (!context) {
    throw new Error(
      "useDemoWorkspace must be used within a DemoWorkspaceProvider.",
    );
  }

  return context;
}
