"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlobalActionsDock } from "@/components/global-actions-dock";
import { SfSymbol } from "@/components/sf-symbol";
import { useOrg } from "@/providers/org-provider";
import { useUI } from "@/providers/ui-provider";
import {
  getCurrentSection,
  isNavActive,
  primaryNavigation,
} from "@/lib/navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentSection = getCurrentSection(pathname);
  const { activeSite, activeTeam, organization, role } = useOrg();
  const { density } = useUI();

  if (
    pathname === "/" ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/demo")
  ) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.45),transparent_30%)]" />
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] gap-6 px-4 pb-24 pt-4 md:px-6 md:pb-6">
        <aside className="glass-panel-strong sticky top-4 hidden h-[calc(100vh-2rem)] w-72 shrink-0 flex-col justify-between p-5 md:flex">
          <div>
            <Link
              href="/workspace"
              className="flex items-center gap-4 rounded-[24px] p-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-white/85 shadow-[0_16px_36px_rgba(15,23,42,0.14)]">
                <Image
                  src="/brand/logo.png"
                  alt="Equal"
                  width={36}
                  height={36}
                  priority
                />
              </div>
              <div>
                <p className="font-heading text-2xl text-slate-950">Equal</p>
                <p className="text-sm text-slate-500">
                  Fairness-led rostering workspace
                </p>
              </div>
            </Link>

            <nav className="mt-8 flex flex-col gap-2">
              {primaryNavigation.map((item) => {
                const active = isNavActive(pathname, item);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-[24px] px-4 py-3.5 transition ${
                      active
                        ? "bg-slate-950 text-white shadow-glow"
                        : "bg-white/42 text-slate-600 hover:bg-white/80 hover:text-slate-950"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                          active ? "bg-white/14" : "bg-slate-950/6"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.label}</p>
                        <p
                          className={`text-xs ${
                            active ? "text-white/70" : "text-slate-500"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] bg-slate-950 px-5 py-5 text-white shadow-glow">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                <SfSymbol name="sparkles" className="h-4 w-4" size="sm" />
                Startup ready
              </div>
              <p className="mt-4 text-sm leading-6 text-white/78">
                The workspace is cleaned up and aligned to the documented first-run
                flow, so the next step can focus on real data and scheduling logic.
              </p>
              <Link
                href="/onboarding"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white"
              >
                Open startup routine
                <SfSymbol name="arrow-up-right" className="h-4 w-4" size="sm" />
              </Link>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <header className="glass-panel sticky top-4 z-20 px-5 py-4 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Equal workspace
                </p>
                <h1 className="mt-2 font-heading text-3xl text-slate-950">
                  {currentSection}
                </h1>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="metric-chip">{organization.name}</span>
                  <span className="metric-chip">{activeSite.name}</span>
                  <span className="metric-chip">{activeTeam.name}</span>
                  <span className="metric-chip">{role} / {density}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-success/30 bg-success/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Startup routine ready
                </span>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Start setup
                  <SfSymbol name="arrow-up-right" className="h-4 w-4" size="sm" />
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 pb-6">{children}</main>
        </div>
      </div>

      <GlobalActionsDock />

      <nav className="fixed inset-x-3 bottom-3 z-30 rounded-[28px] border border-white/50 bg-white/78 px-3 py-3 shadow-soft backdrop-blur-2xl md:hidden">
        <div className="grid grid-cols-6 gap-2">
          {primaryNavigation.map((item) => {
            const active = isNavActive(pathname, item);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold ${
                  active
                    ? "bg-slate-950 text-white"
                    : "text-slate-500 hover:bg-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.shortLabel}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
