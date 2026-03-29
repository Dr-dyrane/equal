"use client";

import Link from "next/link";
import { SfSymbol } from "@/components/sf-symbol";
import { useLayout } from "@/providers/layout-provider";
import { useGlobalActions } from "@/providers/global-actions-provider";
import { useUI } from "@/providers/ui-provider";

const UTILITY_ACTION_IDS = new Set([
  "theme-toggle",
  "density-toggle",
  "view-cycle",
  "workspace-context",
]);

export function ContextFab() {
  const { actions } = useGlobalActions();
  const { quickActionsOpen, setQuickActionsOpen } = useUI();
  const { isMobile } = useLayout();

  const routeActions = actions.filter(
    (action) =>
      !UTILITY_ACTION_IDS.has(action.id) && (Boolean(action.href) || Boolean(action.run)),
  );

  if (routeActions.length === 0) {
    return null;
  }

  const primaryAction =
    routeActions.find((action) => action.tone === "primary") ?? routeActions[0];

  return (
    <div className={`fixed right-4 z-40 ${isMobile ? "bottom-24" : "bottom-8"}`}>
      {quickActionsOpen ? (
        <div className="app-fab-menu mb-3 w-[min(88vw,22rem)] p-3">
          <div className="flex items-center justify-between gap-3 px-2 py-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                Next actions
              </p>
              <p className="mt-1 text-sm text-[color:var(--story-muted)]">
                What makes sense from here.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setQuickActionsOpen(false)}
              className="app-shell-icon-button"
              aria-label="Close actions"
            >
              <SfSymbol name="xmark" className="h-[0.95rem] w-[0.95rem]" />
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {routeActions.map((action) =>
              action.href ? (
                <Link
                  key={action.id}
                  href={action.href}
                  onClick={() => setQuickActionsOpen(false)}
                  className="app-fab-action"
                  data-primary={action.id === primaryAction.id ? "true" : "false"}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{action.label}</p>
                    <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
                  </div>
                  <p
                    className={`mt-2 text-sm leading-6 ${
                      action.id === primaryAction.id
                        ? "text-white/72"
                        : "text-[color:var(--story-muted)]"
                    }`}
                  >
                    {action.description}
                  </p>
                </Link>
              ) : (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => {
                    action.run?.();
                    setQuickActionsOpen(false);
                  }}
                  className="app-fab-action w-full text-left"
                  data-primary={action.id === primaryAction.id ? "true" : "false"}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{action.label}</p>
                    <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
                  </div>
                  <p
                    className={`mt-2 text-sm leading-6 ${
                      action.id === primaryAction.id
                        ? "text-white/72"
                        : "text-[color:var(--story-muted)]"
                    }`}
                  >
                    {action.description}
                  </p>
                </button>
              ),
            )}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setQuickActionsOpen(!quickActionsOpen)}
        className="app-fab-button"
        aria-label="Open next actions"
      >
        <SfSymbol name="sparkles" variant="dualtone" className="h-[1.05rem] w-[1.05rem]" />
        {!isMobile ? (
          <>
            <span>{primaryAction.label}</span>
            <SfSymbol name="arrow-right" className="h-[0.95rem] w-[0.95rem]" />
          </>
        ) : null}
      </button>
    </div>
  );
}
