# Equal Provider Architecture

Equal now uses a small provider tree with clear ownership boundaries.

## Root providers

These wrap the full app in `src/providers/app-providers.tsx`:

- `AppErrorBoundary`: catches rendering failures so one broken surface does not crash the whole shell.
- `ThemeProvider`: owns light, dark, and system theme state through `next-themes`.
- `QueryProvider`: owns TanStack Query cache, retry policy, and mutation defaults.
- `AuthProvider`: holds the current session scaffold and user identity shape without coupling the UI to a specific auth vendor.
- `OrgProvider`: owns the active organization, site, team, role, and permission snapshot.
- `UIProvider`: owns ephemeral shell state like density, schedule view, command palette state, and quick actions visibility.
- `LayoutProvider`: owns viewport and layout composition state such as breakpoint mode and inspector width.
- `GlobalActionsProvider`: owns route-aware quick actions and feature-registered actions.
- `Toaster`: handles cross-app notifications through Sonner.

## Route-scoped providers

These only mount where the feature needs shared interactive state:

- `RosterBuilderProvider`: mounted on `/schedule`; owns draft selection, conflict review, publish state, and roster action registration.
- `FairnessProvider`: mounted on `/schedule` and `/analytics`; owns fairness window, comparison mode, explainability state, and related actions.

## Rules

- Keep server data in TanStack Query, not in ad hoc global context.
- Keep business state route-scoped unless multiple routes truly need the same interactive state.
- Keep shell state in `UIProvider` and structural layout state in `LayoutProvider`; do not merge them.
- Keep vendor SDKs behind service modules or server utilities instead of pushing them into React context.
