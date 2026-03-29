"use client";

import { usePathname } from "next/navigation";
import { BottomPillNav } from "@/features/shell/components/bottom-pill-nav";
import { ContextFab } from "@/features/shell/components/context-fab";
import { Sidebar } from "@/features/shell/components/sidebar";
import { Topbar } from "@/features/shell/components/topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell-page">
      <div className="story-overlay pointer-events-none absolute inset-0" />
      <div className="story-grid pointer-events-none absolute inset-0 opacity-90" />

      <div className="app-shell-layout">
        <Sidebar pathname={pathname} />

        <div className="app-shell-main">
          <Topbar pathname={pathname} />
          <main className="min-h-0 flex-1 pb-28 md:pb-8">{children}</main>
        </div>
      </div>

      <ContextFab />
      <BottomPillNav pathname={pathname} />
    </div>
  );
}
