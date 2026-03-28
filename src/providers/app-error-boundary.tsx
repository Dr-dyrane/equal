"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

function AppErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const errorDetails =
    error instanceof Error
      ? error
      : new Error("An unexpected application error occurred.");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f5fbff_0%,#edf4fb_42%,#e6f0fa_100%)] px-6">
      <div className="glass-panel-strong max-w-xl p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-[24px] bg-slate-950 text-white">
          <TriangleAlert className="h-6 w-6" />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          App boundary
        </p>
        <h2 className="mt-3 font-heading text-3xl text-slate-950">
          A workspace surface failed to render.
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          The root boundary caught an unexpected error so the shell did not
          collapse entirely. Reset the boundary and continue from the current
          route.
        </p>
        <div className="mt-5 rounded-[24px] border border-white/60 bg-white/78 p-4">
          <p className="text-sm font-semibold text-slate-900">
            {errorDetails.name}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {errorDetails.message}
          </p>
        </div>
        <button
          type="button"
          onClick={resetErrorBoundary}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <RotateCcw className="h-4 w-4" />
          Reset boundary
        </button>
      </div>
    </div>
  );
}

export function AppErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={AppErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
