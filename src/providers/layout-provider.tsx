"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePersistentState } from "@/providers/use-persistent-state";

export type LayoutBreakpoint = "mobile" | "tablet" | "desktop";

type LayoutContextValue = {
  breakpoint: LayoutBreakpoint;
  viewportWidth: number;
  viewportHeight: number;
  inspectorWidth: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  setInspectorWidth: (width: number) => void;
};

const LayoutContext = createContext<LayoutContextValue | null>(null);

function resolveBreakpoint(width: number): LayoutBreakpoint {
  if (width < 768) {
    return "mobile";
  }

  if (width < 1200) {
    return "tablet";
  }

  return "desktop";
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [viewport, setViewport] = useState({
    width: 1440,
    height: 900,
  });
  const [inspectorWidth, setInspectorWidth] = usePersistentState(
    "equal.layout.inspector-width",
    360,
  );

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const breakpoint = resolveBreakpoint(viewport.width);

  return (
    <LayoutContext.Provider
      value={{
        breakpoint,
        viewportWidth: viewport.width,
        viewportHeight: viewport.height,
        inspectorWidth,
        isMobile: breakpoint === "mobile",
        isTablet: breakpoint === "tablet",
        isDesktop: breakpoint === "desktop",
        setInspectorWidth,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider.");
  }

  return context;
}
