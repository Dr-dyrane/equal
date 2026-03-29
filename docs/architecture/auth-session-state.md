# Auth, Session, and State Architecture

This document defines the current platform spine behind the public entry experience.

The landing page and demo introduce the product. Auth, session, and route ownership make the real app trustworthy once the user enters it.

## Goals

- email-first entry
- server-owned session
- organization-aware permissions
- static public routes
- protected app routes
- one consistent state model across client and server

## Product Rule

The user should feel:

- they entered the app with one obvious step
- the app knows who they are
- the app knows what organization and role they belong to

The user should not feel:

- forced through a generic auth wall
- confused about whether they signed in, created an account, or entered a demo
- dependent on browser-local session hacks

## Chosen Mechanism

- primary auth method: email magic link
- email delivery: Postmark
- session signing and verification: `jose`
- session storage: secure HttpOnly cookie
- app context: session claims plus server bootstrap queries

## Why This Route

It matches Equal's product direction:

- low-friction
- no password ceremony
- easy onboarding
- organization-aware access can still be layered in

## Session Ownership

### Source of truth

The server is the source of truth.

Not:

- `localStorage`
- client-only `AuthProvider`
- mock in-memory session replacement

### Client role

The client hydrates a session snapshot and exposes it to the UI.

That means:

- `AuthProvider` remains useful
- but it consumes a real session, not a fabricated one

## Claims

The session carries at minimum:

- `user_id`
- `organisation_id`
- `role`
- `permissions`
- `active_team_id` optional
- `active_site_id` optional

## Route Ownership

### `(public)`

Owns:

- `/`
- `/demo`
- `/auth`
- `/auth/verify`

Rules:

- static-first
- no protected app shell
- no workspace navigation chrome
- theme and public presentation only

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

- protected by session
- bootstrapped with server session data
- rendered inside the shared app shell

## Middleware

Middleware is responsible for:

- allowing public routes and static assets through
- redirecting anonymous users away from protected routes
- preserving the requested path in `next`
- redirecting authenticated users away from redundant auth states when appropriate

## Current Implementation

The current flow is:

1. `/auth` submits the user's work email to `/api/auth/start`
2. Postmark sends a magic link
3. `/auth/verify` consumes the signed token and creates the session cookie
4. `(app)` layout reads the session on the server
5. `AuthProvider` hydrates that session snapshot for client UI

The landing page and demo stay static again because the session read now happens in `(app)` layout, not in the root layout. `/auth` remains request-aware, which is acceptable for the entry flow.

## File Map

```txt
src/lib/auth/
  config.ts
  cookies.ts
  claims.ts
  session.ts
  guards.ts
  errors.ts

src/lib/contracts/
  auth.ts

src/server/repositories/
  auth-repo.ts
  org-repo.ts

src/server/services/auth/
  start-auth.ts
  verify-auth.ts
  signout.ts
  get-auth-session.ts

src/app/api/auth/
  start/route.ts
  signout/route.ts

src/app/(public)/auth/
  page.tsx
  verify/route.ts

src/app/(app)/
  layout.tsx

middleware.ts
```

## State Management Rules

### Use providers for

- authenticated user snapshot
- active org, team, and site context
- route-scoped complex interactive state

### Use React Query for

- bootstrap user and org data
- permissions snapshot
- team lists
- schedules
- rules
- analytics

### Use forms for

- auth input
- onboarding
- team and profile editing
- rule setup

No ad hoc `useState` forms for real workflows.

Use:

- `react-hook-form`
- `zod`

## Auth UX Rules

- make the mechanism explicit: "Continue with email"
- keep one dominant action
- avoid duplicate controls
- do not clutter the header
- move utility controls like theme into quieter, useful surfaces
- do not explain auth architecture to the user

## Acceptance Checklist

- [x] auth email start works
- [x] verify flow creates secure cookie
- [x] session survives refresh
- [x] protected routes redirect correctly
- [x] authenticated user can reach `(app)`
- [x] anonymous user cannot reach `(app)`
- [x] `AuthProvider` hydrates real session data
- [x] landing and demo are no longer forced dynamic by auth bootstrap
- [x] current public auth UI still feels simple after backend wiring
