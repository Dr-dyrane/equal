# Repo Structure Plan

This document defines the repo shape for the current implementation phase.

The goal is to keep Equal readable as it grows:

- clear route groups
- small feature folders
- one database schema surface
- server logic separate from UI
- no monolithic `lib` dump

## Principles

- Route files should stay thin.
- Feature logic should live with the feature.
- Shared platform code should live in `src/lib`, `src/db`, or `src/server` based on responsibility.
- Database definitions should come from one universal schema declaration, not scattered ad hoc model files.
- Server orchestration should not live inside React components.

## Target App Structure

```txt
src/
  app/
    (public)/
      page.tsx
      demo/page.tsx
      auth/page.tsx
    (app)/
      layout.tsx
      workspace/page.tsx
      onboarding/page.tsx
      schedule/page.tsx
      team/page.tsx
      shifts/page.tsx
      analytics/page.tsx
      settings/page.tsx
    api/
      auth/
  db/
    client.ts
    index.ts
    types.ts
    schema/
      index.ts
      auth.ts
      organisations.ts
      teams.ts
      scheduling.ts
      rules.ts
      fairness.ts
    migrations/
  features/
    public-entry/
    auth/
    shell/
    onboarding/
    team/
    shifts/
    schedule/
    rules/
    fairness/
    swaps/
  lib/
    auth/
    contracts/
    permissions/
    navigation/
    env/
  providers/
  server/
    repositories/
    services/
```

## Route Groups

### `(public)`

Owns:

- `/`
- `/demo`
- `/auth`

Rules:

- no app shell
- no protected data
- no workspace navigation chrome
- the product is introduced here, not operated here

### `(app)`

Owns:

- `/workspace`
- `/onboarding`
- `/schedule`
- `/team`
- `/shifts`
- `/analytics`
- `/settings`

Rules:

- always protected by session
- always inside one app shell
- layout behavior is shared, not rebuilt per route

## Feature Folder Rules

Each major feature should default to:

```txt
features/<feature>/
  components/
  hooks/
  provider/
  services/
  types/
```

Not every feature needs every folder, but this is the starting shape.

### Use `components/` for

- route-scoped UI
- feature UI pieces
- local interaction surfaces

### Use `hooks/` for

- local composition hooks
- feature query hooks
- focused reusable interaction hooks

### Use `provider/` for

- route-scoped complex interactive state
- not for simple fetched data

### Use `services/` for

- feature-specific orchestration that is not generic enough for `src/server/services`

### Use `types/` for

- feature-local types that are not universal contracts

## Shared Platform Boundaries

### `src/db`

Use for:

- schema declaration
- migration config
- typed db client
- inferred database row types

### `src/lib`

Use for:

- cross-feature client/server-safe helpers
- contracts
- navigation config
- permissions helpers
- env parsing

### `src/server`

Use for:

- repositories
- server-only services
- auth/session orchestration
- db-backed business logic

## What To Avoid

- giant `src/lib/utils.ts`
- route files full of business logic
- duplicate query logic in components
- feature folders that become mini-apps with no discipline
- provider-per-entity architecture
- one more wrapper folder every time the structure gets confusing

## Current Platform Changes

- [x] route groups for `(public)` and `(app)` exist
- [x] `src/db` exists
- [x] `src/server` exists
- [x] `src/lib/contracts` exists
- [x] `src/features/shell` exists
- [x] protected routes live under `(app)`

## Success Criteria

- a new contributor can find auth, schema, shell, and feature code quickly
- one feature can be worked on without spelunking through unrelated folders
- route files read like composition, not implementation
