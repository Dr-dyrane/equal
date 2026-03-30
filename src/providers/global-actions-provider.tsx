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
        id: "schedule-review-fairness",
        label: "Review fairness",
        description: "Open analytics and inspect what the current week is doing to people.",
        href: "/analytics",
        tone: "primary",
      },
      {
        id: "schedule-open-team",
        label: "Check team inputs",
        description: "Move to availability, skills, and preferences before changing the week.",
        href: "/team",
      },
    ] satisfies GlobalAction[];
  }

  if (pathname.startsWith("/analytics")) {
    return [
      {
        id: "analytics-open-schedule",
        label: "Return to schedule",
        description: "Go back to the live week and keep working from the board.",
        href: "/schedule",
        tone: "primary",
      },
      {
        id: "analytics-open-settings",
        label: "Review rules",
        description: "Open settings and inspect the rule set behind the current score.",
        href: "/settings",
      },
    ] satisfies GlobalAction[];
  }

  if (pathname.startsWith("/settings")) {
    return [
      {
        id: "settings-open-onboarding",
        label: "Continue setup",
        description: "Move into the organization setup flow and keep the foundation moving.",
        href: "/onboarding",
        tone: "primary",
      },
      {
        id: "settings-open-schedule",
        label: "Return to schedule",
        description: "Go back to the live week once the rule context is clear.",
        href: "/schedule",
      },
    ] satisfies GlobalAction[];
  }

  if (pathname.startsWith("/team")) {
    return [
      {
        id: "team-open-shifts",
        label: "Review shifts",
        description: "Open shift templates and coverage structure before finalizing people inputs.",
        href: "/shifts",
        tone: "primary",
      },
      {
        id: "team-open-schedule",
        label: "Open schedule",
        description: "Move from people inputs into the week itself.",
        href: "/schedule",
      },
    ] satisfies GlobalAction[];
  }

  if (pathname.startsWith("/shifts")) {
    return [
      {
        id: "shifts-open-week",
        label: "Open week",
        description: "See how current shapes land in the live week.",
        href: "/schedule",
      },
      {
        id: "shifts-open-team",
        label: "Open team",
        description: "Check people inputs before changing a shape.",
        href: "/team",
      },
    ] satisfies GlobalAction[];
  }

  if (pathname.startsWith("/workspace")) {
    return [
      {
        id: "workspace-open-onboarding",
        label: "Continue setup",
        description: "Move through the documented first-run path for a new organization.",
        href: "/onboarding",
        tone: "primary",
      },
      {
        id: "workspace-open-schedule",
        label: "Open schedule",
        description: "Move into the live week and start shaping coverage.",
        href: "/schedule",
      },
    ] satisfies GlobalAction[];
  }

  if (pathname.startsWith("/onboarding")) {
    return [
      {
        id: "onboarding-open-settings",
        label: "Open settings",
        description: "Define rules, roles, and organization controls as part of setup.",
        href: "/settings",
        tone: "primary",
      },
      {
        id: "onboarding-open-workspace",
        label: "Return to workspace",
        description: "Go back to the main workspace once setup context is clear.",
        href: "/workspace",
      },
    ] satisfies GlobalAction[];
  }

  return [] satisfies GlobalAction[];
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
