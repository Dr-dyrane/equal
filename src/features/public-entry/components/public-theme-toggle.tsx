"use client";

import { useTheme } from "next-themes";
import { SfSymbol } from "@/components/sf-symbol";

export function PublicThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="story-toggle" aria-label="Theme switcher">
      <button
        type="button"
        aria-label="Use light theme"
        title="Use light theme"
        onClick={() => setTheme("light")}
        className="story-toggle-button story-toggle-button-light"
      >
        <SfSymbol name="sun-max" className="h-4 w-4" />
        <span className="sr-only sm:not-sr-only">Light</span>
      </button>
      <button
        type="button"
        aria-label="Use dark theme"
        title="Use dark theme"
        onClick={() => setTheme("dark")}
        className="story-toggle-button story-toggle-button-dark"
      >
        <SfSymbol name="moon-stars" className="h-4 w-4" />
        <span className="sr-only sm:not-sr-only">Dark</span>
      </button>
    </div>
  );
}
