# Equal Docs

This folder is the repo-facing documentation system for Equal.

Use it to understand what the app is, how it is being built, and where implementation decisions now live.

## Read Order

1. `README.md`
2. `equal.md`
3. `docs/README.md`
4. `docs/ui.md`
5. `docs/providers.md`
6. `docs/dependencies.md`
7. `docs/architecture/*`
8. `docs/implementation/*`

## Document Roles

### Root repo docs

- `README.md`
  - current repo reality
  - setup
  - current scope
  - links into the rest of the docs

- `equal.md`
  - full product brief
  - brand, domain, flows, schema intent, roles, and long-range product direction
  - this is the broad source of product truth, not the day-to-day implementation map

### Existing focused docs

- `docs/ui.md`
  - UI doctrine
  - route intent
  - visual and interaction rules
  - lessons from landing/demo/auth work

- `docs/providers.md`
  - provider ownership
  - what belongs in root context versus route-scoped state

- `docs/dependencies.md`
  - installed stack
  - vendor/runtime decisions
  - manual assets

### Architecture docs

- `docs/architecture/repo-structure.md`
  - target repo layout
  - route groups
  - feature/module boundaries

- `docs/architecture/auth-session-state.md`
  - authentication architecture
  - session ownership
  - auth route and middleware plan

- `docs/architecture/data-schema-and-migrations.md`
  - Neon + Drizzle approach
  - universal schema declaration
  - core migration strategy
  - RLS rollout plan

- `docs/architecture/app-shell-layout.md`
  - protected app shell plan
  - mobile/tablet/desktop layout intent
  - navigation and sheet/drawer rules

### Implementation docs

- `docs/implementation/roadmap.md`
  - build sequence
  - milestone order
  - dependency chain between phases

- `docs/implementation/milestone-01-core-platform.md`
  - first concrete execution target
  - exact files, responsibilities, and acceptance checklist

## Documentation Rules

- Keep product intent in `equal.md`.
- Keep repo reality in `README.md`.
- Keep implementation architecture in `docs/architecture`.
- Keep execution sequencing in `docs/implementation`.
- Keep UI doctrine in `docs/ui.md`.
- Do not bury key build decisions inside chat history.
- If a decision affects more than one route or more than one feature, document it here.

## Current Build Direction

The landing page and demo now establish the public-facing product feel well enough to serve as the UI foundation.

The next build focus is:

1. authentication
2. session and permissions
3. schema and migrations
4. protected app shell
5. team, shifts, rules, schedule, fairness, swaps

The implementation details for that sequence now live in `docs/architecture` and `docs/implementation`.
