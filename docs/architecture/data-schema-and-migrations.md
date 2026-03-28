# Data Schema and Migration Strategy

This document defines how Equal should model data in Neon/Postgres without migration bloat.

## Core Rule

Do not create 20+ migrations for bootstrap.

Use a small set of intentional, squashed migrations while the platform is still forming.

## Chosen Approach

- database: Neon Postgres
- schema/migrations: Drizzle
- validation support: `drizzle-zod`
- one universal schema declaration exported from TypeScript

## Why Drizzle

It gives us:

- typed schema in TS
- predictable migrations
- good fit with Next + Neon
- a single declaration surface for db structure

That matches the repo direction better than a more opaque ORM layer.

## Universal Schema Rule

All database tables should be declared under `src/db/schema`.

The universal export surface should be:

```txt
src/db/schema/index.ts
src/db/types.ts
```

This means:

- one import surface for schema
- one import surface for inferred database row types
- feature-local services can stay typed without redefining core entities

## Module Layout

```txt
src/db/
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
```

## Migration Plan

### `0000_core_identity`

Tables:

- organisations
- roles
- users
- memberships
- invites
- sessions

### `0001_people_structure`

Tables:

- teams
- sites
- skills
- user_skills
- preferences

### `0002_scheduling_core`

Tables:

- shift_templates
- schedules
- assignments

### `0003_rules_fairness_audit`

Tables:

- rules
- fairness_ledger
- audit_log

### `0004_rls_and_indexes`

Includes:

- helper SQL functions
- RLS enablement
- policies
- indexes

## Entity Notes

These align with `equal.md`, but are adjusted for implementation sanity.

### Organisations

Owns:

- teams
- sites
- roles
- skills
- shift templates
- schedules
- rules

### Users and memberships

Do not over-assume one user belongs to one org forever.

Preferred model:

- `users` = person identity
- `memberships` = membership in organization with role assignment

This keeps future invite and multi-org behavior possible without rewriting identity later.

### Roles

- keep permissions as JSONB as already justified in `equal.md`
- role assignment should happen via membership, not hard-coded assumptions

### Preferences

Keep one row per user per organization context if needed, but start simple.

### Rules

Keep:

- `type`
- `expression`
- `weight`

Use JSONB only where flexibility is actually needed.

### Fairness ledger

This is not optional. It is part of the product differentiator.

### Audit log

Add it from the start.

Fields should include:

- id
- organisation_id
- actor_user_id
- entity_type
- entity_id
- action
- before
- after
- reason
- created_at

## Indexes

Start with the important ones only:

- assignments `(user_id, date)`
- assignments `(schedule_id, date)`
- fairness_ledger `(user_id, date desc)`
- schedules `(organisation_id, period_start, period_end)`
- preferences `(user_id)`
- GIN on JSONB fields only where query patterns justify it

## RLS Strategy

Do not try to perfect every policy before the data layer exists.

Sequence:

1. schema
2. seed roles/permissions approach
3. helper SQL functions for current user/org claims
4. basic policies
5. tighten by route/service as real usage appears

## Type Strategy

### Database types

Come from Drizzle inference in:

- `src/db/types.ts`

### Contract types

Live in:

- `src/lib/contracts/*`

Do not expose raw db row types directly into every form and component.

## What To Avoid

- hand-written SQL scattered across route handlers
- migrations generated for every naming change during bootstrap
- putting business logic into migrations
- a giant catch-all schema file with every table
- a separate migration every time one enum or column shifts during the first build phase

## Acceptance Checklist

- Drizzle configured
- Neon connection working locally and in Vercel
- schema exported from one surface
- `0000` through `0004` created
- initial indexes added
- initial RLS helper plan documented
- no redundant bootstrap migrations beyond the core set
