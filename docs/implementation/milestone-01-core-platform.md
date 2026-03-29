# Milestone 01: Core Platform

This is the first concrete execution milestone after the public-entry foundation.

It combines authentication, schema, migrations, and route protection into one coherent platform layer.

## Outcome

By the end of this milestone:

- the app has a real database schema
- the app has real auth and session flow
- protected routes are actually protected
- public auth UI is backed by real behavior
- landing and demo remain static-first

## Scope

### 1. Add schema tooling

Install:

- `drizzle-orm`
- `drizzle-kit`
- `drizzle-zod`

Create:

```txt
drizzle.config.ts
src/db/connection.ts
src/db/client.ts
src/db/index.ts
src/db/types.ts
src/db/schema/index.ts
src/db/schema/auth.ts
src/db/schema/organisations.ts
src/db/schema/teams.ts
src/db/schema/scheduling.ts
src/db/schema/rules.ts
src/db/schema/fairness.ts
```

### 2. Create squashed migrations

Bootstrap with a small migration set.

Current generated and applied migration:

- `0000_nostalgic_slipstream`

Target follow-up pattern:

- `0001_people_structure`
- `0002_scheduling_core`
- `0003_rules_fairness_audit`
- `0004_rls_and_indexes`

### 3. Add auth platform code

Create:

```txt
src/lib/auth/config.ts
src/lib/auth/cookies.ts
src/lib/auth/claims.ts
src/lib/auth/session.ts
src/lib/auth/guards.ts
src/lib/auth/errors.ts
src/lib/contracts/auth.ts
src/server/repositories/auth-repo.ts
src/server/repositories/org-repo.ts
src/server/services/auth/start-auth.ts
src/server/services/auth/verify-auth.ts
src/server/services/auth/signout.ts
src/server/services/auth/get-auth-session.ts
src/app/api/auth/start/route.ts
src/app/api/auth/signout/route.ts
src/app/(public)/auth/verify/route.ts
middleware.ts
```

### 4. Rewire auth UI

Update `/auth` to:

- call the real start-auth endpoint
- show submission and error states
- stop fabricating local session as the source of truth

Keep:

- current visual simplicity
- email-first mechanism
- single obvious action

### 5. Hydrate real session

Update:

- `AuthProvider`
- protected route layout
- redirect rules for authenticated versus anonymous states
- root versus route-group layout ownership

## Exact Acceptance Checklist

### Schema

- [x] Drizzle is configured
- [x] Neon client is wired
- [x] schema is exported from one universal index
- [x] bootstrap migration is generated
- [x] bootstrap migration is applied to Neon

### Auth

- [x] `/auth` can submit work email
- [x] auth start sends Postmark email
- [x] verify route consumes signed token
- [x] verify route sets secure HttpOnly cookie
- [x] signout clears cookie

### Protected app

- [x] `(app)` route group exists
- [x] `(public)` route group exists
- [x] middleware blocks anonymous access to protected routes
- [x] authenticated users can reach protected routes
- [x] session survives refresh
- [x] landing and demo are static again

### Quality

- [x] no provider bloat added
- [x] no migration bloat added
- [x] lint passes
- [x] typecheck passes
- [x] build passes

## Risks To Watch

- over-designing auth before the backend contract exists
- leaking db row types directly into every UI form
- adding too many migrations too early
- coupling auth UI too tightly to one temporary implementation detail

## Done Means

Done means the product has a real platform spine, not just a polished public entry.
