# Equal

Initial product scaffold for Equal, a fairness-first rostering and scheduling platform.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide icons

## Run

```bash
npm install
npm run startup
npm run dev
```

Open `http://localhost:3000`.

`npm run startup` runs the local startup routine: clean transient output, lint, typecheck, and production-build the app.

## Current scope

- Branded app shell with responsive navigation
- Dashboard home screen
- Schedule, team, shifts, analytics, settings, and onboarding routes
- Brand assets served from `public/brand`
- Original product brief preserved at `equal.md.md`
- Shared documented startup routine wired into the dashboard and onboarding flow

## Next implementation targets

1. Define the database schema and RLS policies.
2. Add Supabase auth and organization-aware data access.
3. Implement schedule, team, and rule domain models.
4. Build the constraint engine and roster generation flow.
5. Replace placeholder data with live queries and realtime updates.
