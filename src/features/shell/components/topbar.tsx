"use client";

import { useTheme } from "next-themes";
import { SfSymbol } from "@/components/sf-symbol";
import { getCurrentRoute } from "@/features/shell/config/navigation";
import { useAuth } from "@/providers/auth-provider";
import { useLayout } from "@/providers/layout-provider";
import { useOrg } from "@/providers/org-provider";
import { ShellBrandLink } from "./shell-brand-link";

export function Topbar({ pathname }: { pathname: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { signOut, user } = useAuth();
  const { isDesktop, isMobile } = useLayout();
  const { organization, activeSite, activeTeam } = useOrg();
  const currentRoute = getCurrentRoute(pathname);
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <header className="story-panel sticky top-4 z-20 px-4 py-4 sm:px-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {!isDesktop ? (
            <div className="mb-4">
              <ShellBrandLink compact={isMobile} showWordmark={!isMobile} />
            </div>
          ) : null}

          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--story-subtle)]">
            Equal workspace
          </p>
          <h1 className="mt-2 text-balance font-heading text-[2rem] leading-[0.98] text-[color:var(--story-ink)] sm:text-[2.35rem]">
            {currentRoute.label}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[color:var(--story-muted)] sm:text-base">
            {currentRoute.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="story-system-label">{organization.name}</span>
            <span className="story-system-label">{activeSite.name}</span>
            <span className="story-system-label">{activeTeam.name}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(nextTheme)}
            className="app-shell-icon-button"
            aria-label={`Use ${nextTheme} theme`}
            title={`Use ${nextTheme} theme`}
          >
            <SfSymbol
              name={resolvedTheme === "dark" ? "sun-max" : "moon-stars"}
              className="h-[1rem] w-[1rem]"
            />
            <span className="hidden text-sm font-semibold text-[color:var(--story-ink)] sm:inline">
              {resolvedTheme === "dark" ? "Light" : "Dark"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => void signOut()}
            className="app-shell-icon-button"
            aria-label="Sign out"
            title="Sign out"
          >
            <SfSymbol
              name="rectangle-portrait-and-arrow-right"
              className="h-[1rem] w-[1rem]"
            />
            <span className="hidden text-sm font-semibold text-[color:var(--story-ink)] lg:inline">
              {user?.name ?? "Sign out"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
