import { PublicThemeToggle } from "@/features/public-entry/components/public-theme-toggle";

export function LandingFooter() {
  return (
    <footer
      className="story-footer-surface story-reveal mx-auto flex w-full max-w-[22rem] flex-col items-center gap-3 px-4 py-4 text-center"
      style={{ animationDelay: "0.12s" }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
        Theme
      </p>
      <PublicThemeToggle />
    </footer>
  );
}
