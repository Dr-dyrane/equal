"use client";

import { useTheme } from "next-themes";
import { SfSymbol } from "@/components/sf-symbol";

export function PublicThemeToggle({ stretch = false }: { stretch?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const currentTheme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div
      className="story-toggle"
      data-stretch={stretch}
      aria-label="Theme switcher"
    >
      <button
        type="button"
        aria-pressed={currentTheme === "light"}
        data-active={currentTheme === "light"}
        aria-label="Use light theme"
        title="Use light theme"
        onClick={() => setTheme("light")}
        className="story-toggle-button"
      >
        <SfSymbol name="sun-max" className="h-4 w-4" />
        <span className="sr-only sm:not-sr-only">Light</span>
      </button>
      <button
        type="button"
        aria-pressed={currentTheme === "dark"}
        data-active={currentTheme === "dark"}
        aria-label="Use dark theme"
        title="Use dark theme"
        onClick={() => setTheme("dark")}
        className="story-toggle-button"
      >
        <SfSymbol name="moon-stars" className="h-4 w-4" />
        <span className="sr-only sm:not-sr-only">Dark</span>
      </button>
    </div>
  );
}
