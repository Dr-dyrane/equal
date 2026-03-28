"use client";

import { Toaster } from "sonner";
import { AuthProvider } from "@/providers/auth-provider";
import { AppErrorBoundary } from "@/providers/app-error-boundary";
import { GlobalActionsProvider } from "@/providers/global-actions-provider";
import { LayoutProvider } from "@/providers/layout-provider";
import { OrgProvider } from "@/providers/org-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { UIProvider } from "@/providers/ui-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppErrorBoundary>
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>
            <OrgProvider>
              <UIProvider>
                <LayoutProvider>
                  <GlobalActionsProvider>
                    {children}
                    <Toaster
                      closeButton
                      position="top-right"
                      richColors
                      toastOptions={{
                        className:
                          "border border-white/55 bg-white/88 text-slate-900 shadow-soft",
                      }}
                    />
                  </GlobalActionsProvider>
                </LayoutProvider>
              </UIProvider>
            </OrgProvider>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </AppErrorBoundary>
  );
}
