"use client";

import { AppErrorBoundary } from "@/providers/app-error-boundary";
import { ThemeProvider } from "@/providers/theme-provider";

export function PublicProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppErrorBoundary>
      <ThemeProvider>{children}</ThemeProvider>
    </AppErrorBoundary>
  );
}
