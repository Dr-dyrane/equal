"use client";

import Link from "next/link";
import { SfSymbol } from "@/components/sf-symbol";
import {
  getCurrentRoute,
  isNavActive,
  primaryNavigation,
} from "@/features/shell/config/navigation";
import { useLayout } from "@/providers/layout-provider";
import { useOrg } from "@/providers/org-provider";
import { ShellBrandLink } from "./shell-brand-link";

export function Sidebar({ pathname }: { pathname: string }) {
  const { isDesktop, isTablet } = useLayout();
  const { organization, activeSite, activeTeam, role } = useOrg();

  if (!isDesktop && !isTablet) {
    return null;
  }

  const compact = isTablet && !isDesktop;
  const currentRoute = getCurrentRoute(pathname);

  return (
    <aside
      className={`app-shell-sidebar sticky top-4 hidden h-[calc(100vh-2rem)] shrink-0 md:flex ${
        compact ? "w-[5.5rem] p-3" : "w-[18rem] p-4"
      }`}
      data-compact={compact ? "true" : "false"}
    >
      <div className="flex h-full flex-col gap-4">
        <ShellBrandLink compact={compact} />

        <nav className="flex flex-1 flex-col gap-2">
          {primaryNavigation.map((item) => {
            const active = isNavActive(pathname, item);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="app-nav-item"
                data-active={active ? "true" : "false"}
                aria-current={active ? "page" : undefined}
              >
                <span className="app-nav-icon">
                  <SfSymbol
                    name={item.icon}
                    variant={active ? "dualtone" : "monochrome"}
                    className="h-[1.1rem] w-[1.1rem]"
                  />
                </span>
                {!compact ? (
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">
                      {item.label}
                    </span>
                    <span
                      className={`mt-1 block truncate text-[11px] uppercase tracking-[0.18em] ${
                        active
                          ? "text-white/66"
                          : "text-[color:var(--story-subtle)]"
                      }`}
                    >
                      {item.shortLabel}
                    </span>
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        {compact ? (
          <Link
            href="/workspace"
            className="story-chip flex items-center justify-center rounded-[22px] px-0 py-3"
            aria-label={`Open ${currentRoute.label} home`}
          >
            <SfSymbol name="house-fill" className="h-[1rem] w-[1rem]" />
          </Link>
        ) : (
          <div className="app-shell-context">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--story-subtle)]">
                  Active context
                </p>
                <p className="mt-2 text-base font-semibold text-[color:var(--story-ink)]">
                  {organization.name}
                </p>
              </div>
              <span className="story-system-label">{role}</span>
            </div>
            <div className="mt-4 grid gap-2">
              <span className="story-chip px-3 py-2 text-sm text-[color:var(--story-ink)]">
                {activeSite.name}
              </span>
              <span className="story-chip px-3 py-2 text-sm text-[color:var(--story-ink)]">
                {activeTeam.name}
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
