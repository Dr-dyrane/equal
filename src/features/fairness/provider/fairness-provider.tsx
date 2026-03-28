"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useGlobalActions } from "@/providers/global-actions-provider";

export type FairnessWindow = "6-weeks" | "quarter" | "year";
export type FairnessComparisonMode = "team" | "role" | "self";

type FairnessContextValue = {
  window: FairnessWindow;
  comparisonMode: FairnessComparisonMode;
  explanationPanelOpen: boolean;
  setWindow: (window: FairnessWindow) => void;
  cycleWindow: () => void;
  cycleComparisonMode: () => void;
  toggleExplanationPanel: () => void;
};

const FAIRNESS_WINDOWS: FairnessWindow[] = ["6-weeks", "quarter", "year"];
const FAIRNESS_COMPARISONS: FairnessComparisonMode[] = [
  "team",
  "role",
  "self",
];

const FairnessContext = createContext<FairnessContextValue | null>(null);

export function FairnessProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { registerActions, unregisterActions } = useGlobalActions();
  const [window, setWindow] = useState<FairnessWindow>("6-weeks");
  const [comparisonMode, setComparisonMode] =
    useState<FairnessComparisonMode>("team");
  const [explanationPanelOpen, setExplanationPanelOpen] = useState(true);

  const cycleWindow = useCallback(() => {
    setWindow((current) => {
      const currentIndex = FAIRNESS_WINDOWS.indexOf(current);
      const nextWindow =
        FAIRNESS_WINDOWS[(currentIndex + 1) % FAIRNESS_WINDOWS.length];
      toast.message(`Fairness window set to ${nextWindow}.`);
      return nextWindow;
    });
  }, []);

  const cycleComparisonMode = useCallback(() => {
    setComparisonMode((current) => {
      const currentIndex = FAIRNESS_COMPARISONS.indexOf(current);
      const nextMode =
        FAIRNESS_COMPARISONS[
          (currentIndex + 1) % FAIRNESS_COMPARISONS.length
        ];
      toast.message(`Fairness comparison switched to ${nextMode}.`);
      return nextMode;
    });
  }, []);

  const toggleExplanationPanel = useCallback(() => {
    setExplanationPanelOpen((current) => {
      const nextState = !current;
      toast.message(
        nextState
          ? "Explainability panel opened."
          : "Explainability panel hidden.",
      );
      return nextState;
    });
  }, []);

  useEffect(() => {
    registerActions("fairness", [
      {
        id: "fairness-window",
        label: `Cycle fairness window (${window})`,
        description: "Move between the short, quarterly, and annual fairness views.",
        run: cycleWindow,
      },
      {
        id: "fairness-compare",
        label: `Compare by ${comparisonMode}`,
        description: "Switch the fairness lens between team, role, and self baselines.",
        run: cycleComparisonMode,
      },
      {
        id: "fairness-explainability",
        label: explanationPanelOpen
          ? "Hide explainability"
          : "Show explainability",
        description: "Toggle the explanation surface that tells schedulers why the system made each choice.",
        run: toggleExplanationPanel,
      },
    ]);

    return () => unregisterActions("fairness");
  }, [
    cycleComparisonMode,
    cycleWindow,
    comparisonMode,
    explanationPanelOpen,
    registerActions,
    toggleExplanationPanel,
    unregisterActions,
    window,
  ]);

  return (
    <FairnessContext.Provider
      value={{
        window,
        comparisonMode,
        explanationPanelOpen,
        setWindow,
        cycleWindow,
        cycleComparisonMode,
        toggleExplanationPanel,
      }}
    >
      {children}
    </FairnessContext.Provider>
  );
}

export function useFairness() {
  const context = useContext(FairnessContext);

  if (!context) {
    throw new Error("useFairness must be used within a FairnessProvider.");
  }

  return context;
}
