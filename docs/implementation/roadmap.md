# Implementation Roadmap

This document is the execution sequence for the next major build phase.

The landing, demo, and auth routes are now good enough to serve as the foundation. The remaining work is the real product.

## Phase Order

1. Core platform
2. App shell
3. Core staffing entities
4. Scheduling workflow
5. Fairness and analytics
6. Swaps and notifications
7. Realtime, offline, and audit hardening

## Phase 1: Core Platform

Includes:

- Drizzle setup
- Neon schema
- squashed core migrations
- auth start/verify/signout
- session cookies
- middleware
- protected route group

Dependency:

- everything else depends on this

## Phase 2: App Shell

Includes:

- `(app)` route group shell
- sidebar / rail / bottom pill
- context-aware FAB
- responsive sheet primitive
- topbar and page chrome standards

Dependency:

- requires working auth/session

## Phase 3: Core Staffing Entities

Includes:

- organizations bootstrap
- teams
- sites
- users/memberships
- skills
- preferences
- shift templates
- rules base

Dependency:

- requires schema and shell

## Phase 4: Scheduling Workflow

Includes:

- schedule creation
- draft board
- drag/drop
- conflict surfacing
- draft state
- publish flow

Dependency:

- requires staffing entities and rules

## Phase 5: Fairness and Analytics

Includes:

- fairness ledger
- fairness summaries
- trend views
- explanation surfaces
- analytics route with real data

Dependency:

- requires assignments and rule-aware schedule flow

## Phase 6: Swaps and Notifications

Includes:

- request swap
- review/approve/deny
- Postmark/Vonage notification hooks
- staff-side swap visibility

Dependency:

- requires published schedules and role-aware access

## Phase 7: Realtime, Offline, Audit Hardening

Includes:

- listen/notify or websocket path
- IndexedDB caching and draft persistence
- audit logs surfaced in admin context
- failure and recovery hardening

## Delivery Rule

Each phase must produce something real and usable.

Do not leave the repo in a half-wired architectural state for long stretches.

## Current Immediate Focus

Build Phase 1 first.

The next useful milestone is documented in:

- `docs/implementation/milestone-01-core-platform.md`
