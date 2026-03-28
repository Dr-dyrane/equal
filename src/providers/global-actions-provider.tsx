"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useOrg } from "@/providers/org-provider";
import { useUI } from "@/providers/ui-provider";

export type GlobalAction = {
  id: string;
  label: string;
  description: string;
  href?: string;
  tone?: "default" | "primary";
  run?: () => void;
};

type GlobalActionsContextValue = {
  actions: GlobalAction[];
  registerActions: (scope: string, actions: GlobalAction[]) => void;
  unregisterActions: (scope: string) => void;
};

const GlobalActionsContext = createContext<GlobalActionsContextValue | null>(
  null,
);

function buildPathActions(pathname: string) {
  if (pathname.startsWith("/schedule")) {
    return [
      {
        id: "schedule-open-analytics",
        label: "Open fairness analytics",
        description: "Jump from the roster board into fairness and compliance reporting.",
        href: "/analytics",
      },
    ] satisfies GlobalAction[];
  }

  if (pathname.startsWith("/analytics")) {
    return [
      {
        id: "analytics-open-schedule",
        label: "Inspect live schedule",
        description: "Switch back to the current roster proposal and conflict board.",
        href: "/schedule",
      },
    ] satisfies GlobalAction[];
  }

  if (pathname.startsWith("/settings")) {
    return [
      {
        id: "settings-open-onboarding",
        label: "Open startup routine",
        description: "Review the organization-first setup sequence from settings.",
        href: "/onboarding",
      },
    ] satisfies GlobalAction[];
  }

  if (pathname.startsWith("/team")) {
    return [
      {
        id: "team-open-schedule",
        label: "Open schedule workspace",
        description: "Move from staffing inputs into roster review.",
        href: "/schedule",
      },
    ] satisfies GlobalAction[];
  }

  if (pathname.startsWith("/shifts")) {
    return [
      {
        id: "shifts-open-settings",
        label: "Review rule settings",
        description: "Open organization rules and integrations before changing templates.",
        href: "/settings",
      },
    ] satisfies GlobalAction[];
  }

  if (pathname.startsWith("/workspace")) {
    return [
      {
        id: "workspace-open-onboarding",
        label: "Open startup routine",
        description: "Review the documented first-run path for a new organization.",
        href: "/onboarding",
        tone: "primary",
      },
      {
        id: "workspace-open-schedule",
        label: "Open schedule workspace",
        description: "Move into roster review and publishing.",
        href: "/schedule",
      },
    ] satisfies GlobalAction[];
  }

  return [
    {
      id: "public-start-auth",
      label: "Start with Equal",
      description: "Move from the public entry into authentication and product setup.",
      href: "/auth",
      tone: "primary",
    },
  ] satisfies GlobalAction[];
}

export function GlobalActionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { activeTeam, role } = useOrg();
  const { resolvedTheme, setTheme } = useTheme();
  const { cycleDensity, cycleScheduleView, density, scheduleView } = useUI();
  const [registeredActions, setRegisteredActions] = useState<
    Record<string, GlobalAction[]>
  >({});

  const registerActions = useCallback((scope: string, actions: GlobalAction[]) => {
    setRegisteredActions((current) => ({
      ...current,
      [scope]: actions,
    }));
  }, []);

  const unregisterActions = useCallback((scope: string) => {
    setRegisteredActions((current) => {
      const next = { ...current };
      delete next[scope];
      return next;
    });
  }, []);

  const baseActions: GlobalAction[] = [
    {
      id: "theme-toggle",
      label: resolvedTheme === "dark" ? "Use light theme" : "Use dark theme",
      description: "Switch the workspace theme without leaving the current route.",
      run: () => {
        const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        toast.success(
          `${nextTheme === "dark" ? "Dark" : "Light"} theme enabled.`,
        );
      },
    },
    {
      id: "density-toggle",
      label:
        density === "comfortable"
          ? "Switch to compact density"
          : "Switch to comfortable density",
      description: `Current density is ${density}. Toggle the shell spacing preference.`,
      run: () => {
        cycleDensity();
        toast.message(
          density === "comfortable"
            ? "Compact density enabled."
            : "Comfortable density enabled.",
        );
      },
    },
    {
      id: "view-cycle",
      label: `Cycle schedule view (${scheduleView})`,
      description: "Rotate between day, week, month, and board schedule modes.",
      run: () => {
        cycleScheduleView();
        toast.message("Schedule view mode updated.");
      },
    },
    {
      id: "workspace-context",
      label: `${activeTeam.name} context`,
      description: `Current operating role: ${role}. Quick actions follow this workspace context.`,
    },
    ...buildPathActions(pathname),
  ];

  const actions = [
    ...baseActions,
    ...Object.values(registeredActions).flat(),
  ];

  return (
    <GlobalActionsContext.Provider
      value={{
        actions,
        registerActions,
        unregisterActions,
      }}
    >
      {children}
    </GlobalActionsContext.Provider>
  );
}

export function useGlobalActions() {
  const context = useContext(GlobalActionsContext);

  if (!context) {
    throw new Error(
      "useGlobalActions must be used within a GlobalActionsProvider.",
    );
  }

  return context;
}
