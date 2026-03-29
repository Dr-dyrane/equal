"use client";

import Link from "next/link";
import { SfSymbol } from "@/components/sf-symbol";
import {
  isNavActive,
  primaryNavigation,
} from "@/features/shell/config/navigation";
import { useLayout } from "@/providers/layout-provider";
import { useUI } from "@/providers/ui-provider";

export function BottomPillNav({ pathname }: { pathname: string }) {
  const { isMobile } = useLayout();
  const { quickActionsOpen } = useUI();

  if (!isMobile || quickActionsOpen) {
    return null;
  }

  return (
    <nav className="app-bottom-nav">
      {primaryNavigation.map((item) => {
        const active = isNavActive(pathname, item);

        return (
          <Link
            key={item.href}
            href={item.href}
            className="app-bottom-nav-item"
            data-active={active ? "true" : "false"}
            aria-current={active ? "page" : undefined}
          >
            <SfSymbol
              name={item.icon}
              variant={active ? "dualtone" : "monochrome"}
              className="h-[1rem] w-[1rem]"
            />
            <span>{item.shortLabel}</span>
          </Link>
        );
      })}
    </nav>
  );
}
