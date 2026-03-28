import type { ReactNode } from "react";
import type { SfSymbolName } from "@/components/sf-symbol";
import { PublicHeader } from "@/features/public-entry/components/public-header";

type PublicRouteFrameProps = {
  children: ReactNode;
  width?: "wide" | "narrow";
  centerMain?: boolean;
  headerShowThemeToggle?: boolean;
  headerAction: {
    href: string;
    label: string;
    iconName: SfSymbolName;
    variant?: "secondary" | "nav";
  };
};

const widthClasses = {
  narrow: "max-w-[1280px]",
  wide: "max-w-[1480px]",
} as const;

export function PublicRouteFrame({
  children,
  width = "wide",
  centerMain = false,
  headerShowThemeToggle = true,
  headerAction,
}: PublicRouteFrameProps) {
  return (
    <div className="story-page relative isolate min-h-screen overflow-hidden">
      <div className="story-overlay absolute inset-0" />
      <div className="story-grid absolute inset-0 opacity-60" />
      <div className="story-glow-left absolute left-[4%] top-14 h-52 w-52 rounded-full blur-[120px]" />
      <div className="story-glow-right absolute right-[6%] top-20 h-64 w-64 rounded-full blur-[140px]" />

      <div
        className={`relative mx-auto flex min-h-screen w-full ${widthClasses[width]} flex-col px-4 pb-6 pt-5 md:px-6 lg:px-8`}
      >
        <PublicHeader
          actionHref={headerAction.href}
          actionLabel={headerAction.label}
          actionIconName={headerAction.iconName}
          actionVariant={headerAction.variant}
          showThemeToggle={headerShowThemeToggle}
        />

        <main
          className={`flex flex-1 ${
            centerMain
              ? "items-center justify-center py-10 md:py-14"
              : "items-start py-6 md:py-8 lg:py-10"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
