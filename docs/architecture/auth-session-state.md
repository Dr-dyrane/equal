# Auth, Session, and State Architecture

This document defines the first real platform milestone after the public entry experience.

The public landing and demo now do the introduction work. The next job is to make entry into the real app trustworthy, simple, and technically solid.

## Goals

- email-first entry
- server-owned session
- organization-aware permissions
- thin route files
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
- session signing/verification: `jose`
- session storage: secure HttpOnly cookie
- app context: session claims + server bootstrap queries

## Why This Route

It matches Equal’s product direction:

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

The client should only hydrate a session snapshot and expose it to the UI.

That means:

- `AuthProvider` remains useful
- but it becomes a consumer of a real session, not the session authority

## Claims

The session should carry at minimum:

- `user_id`
- `organisation_id`
- `role`
- `permissions`
- `active_team_id` optional
- `active_site_id` optional

## Route Plan

### Public auth routes

- `/auth`
  - choose `start` or `signin`
  - capture email
  - optionally capture display name during self-serve start

- `/auth/verify`
  - consume magic link token
  - create session cookie
  - redirect to target route

- `/auth/invite/[token]`
  - later: invitation acceptance

### Protected routes

Everything in `(app)` requires a valid session.

### Middleware

Use middleware to:

- allow `(public)` and static assets
- protect `(app)`
- redirect anonymous users to `/auth`
- redirect authenticated users away from redundant auth states when appropriate

## Current Scaffold To Replace

The current mock session helper in `src/features/public-entry/lib/public-session.ts` is acceptable only as a temporary demo scaffold.

The target replacement is:

- API or server action starts auth flow
- Postmark sends magic link
- verify route creates signed cookie
- `AuthProvider` reads server session bootstrap

## File Plan

```txt
src/lib/auth/
  config.ts
  cookies.ts
  claims.ts
  session.ts
  guards.ts
  errors.ts

src/server/repositories/
  auth-repo.ts
  org-repo.ts

src/server/services/auth/
  start-auth.ts
  verify-auth.ts
  signout.ts

src/app/api/auth/
  start/route.ts
  verify/route.ts
  signout/route.ts

middleware.ts
```

## State Management Rules

### Use providers for

- authenticated user snapshot
- active org/team/site
- route-scoped complex interaction state

### Use React Query for

- bootstrap user/org data
- permissions snapshot
- team lists
- schedules
- rules
- analytics

### Use forms for

- auth input
- onboarding
- team/profile editing
- rule setup

No ad hoc `useState` forms for real workflows.

Use:

- `react-hook-form`
- `zod`

## Auth UX Rules

- make the mechanism explicit: “continue with email”
- keep one dominant action
- avoid duplicate controls
- do not clutter the header
- move utility controls like theme into quieter, useful surfaces
- do not explain auth architecture to the user

## Acceptance Checklist

- auth email start works
- verify flow creates secure cookie
- session survives refresh
- protected routes redirect correctly
- authenticated user can reach `(app)`
- anonymous user cannot reach `(app)`
- `AuthProvider` hydrates real session data
- current public auth UI still feels simple after backend wiring
