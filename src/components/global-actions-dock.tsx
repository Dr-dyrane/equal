"use client";

import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { useGlobalActions } from "@/providers/global-actions-provider";
import { useLayout } from "@/providers/layout-provider";
import { useUI } from "@/providers/ui-provider";

export function GlobalActionsDock() {
  const { actions } = useGlobalActions();
  const { isDesktop } = useLayout();
  const { quickActionsOpen, setQuickActionsOpen } = useUI();

  if (actions.length === 0) {
    return null;
  }

  return (
    <div
      className={`fixed right-4 z-40 flex flex-col items-end gap-3 ${
        isDesktop ? "bottom-8" : "bottom-28"
      }`}
    >
      {quickActionsOpen ? (
        <div className="glass-panel w-[min(92vw,380px)] p-3">
          <div className="flex items-center justify-between gap-3 px-2 py-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Quick actions
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Route-aware actions from the current provider stack.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setQuickActionsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white"
              aria-label="Close quick actions"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2 space-y-2">
            {actions.map((action) => {
              if (action.href) {
                return (
                  <Link
                    key={action.id}
                    href={action.href}
                    onClick={() => setQuickActionsOpen(false)}
                    className={`block rounded-[22px] px-4 py-3 transition ${
                      action.tone === "primary"
                        ? "bg-slate-950 text-white"
                        : "bg-white/78 text-slate-900 hover:bg-white"
                    }`}
                  >
                    <p className="text-sm font-semibold">{action.label}</p>
                    <p
                      className={`mt-1 text-sm leading-6 ${
                        action.tone === "primary"
                          ? "text-white/72"
                          : "text-slate-500"
                      }`}
                    >
                      {action.description}
                    </p>
                  </Link>
                );
              }

              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => {
                    action.run?.();
                    setQuickActionsOpen(false);
                  }}
                  className={`block w-full rounded-[22px] px-4 py-3 text-left transition ${
                    action.tone === "primary"
                      ? "bg-slate-950 text-white"
                      : "bg-white/78 text-slate-900 hover:bg-white"
                  }`}
                >
                  <p className="text-sm font-semibold">{action.label}</p>
                  <p
                    className={`mt-1 text-sm leading-6 ${
                      action.tone === "primary"
                        ? "text-white/72"
                        : "text-slate-500"
                    }`}
                  >
                    {action.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setQuickActionsOpen(!quickActionsOpen)}
        className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-slate-800"
      >
        <Sparkles className="h-4 w-4" />
        Quick actions
      </button>
    </div>
  );
}
