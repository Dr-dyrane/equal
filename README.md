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
npm run vercel:sync-env
npm run dev
```

Open `http://localhost:3000`.

`npm run startup` runs the local startup routine: clean transient output, lint, typecheck, and production-build the app.
`npm run vercel:sync-env` syncs `.env.local` into Vercel `development`, verifies the same keys exist in Vercel `preview` and `production`, then pulls `development` back locally.
For targeted multi-environment pushes, use `node scripts/vercel-sync-env.mjs --keys=KEY1,KEY2 --targets=development,preview,production`.

The spec-derived dependency baseline is documented in `docs/dependencies.md`.
The active provider architecture is documented in `docs/providers.md`.
The UI implementation guide is documented in `docs/ui.md`.
The full repo documentation map now starts at `docs/README.md`.
Self-hosted font assets now live in `public/fonts`, and the official Apple `SF-Symbols-7.dmg` source bundle is staged in `vendor/apple` for macOS-side extraction if needed.

## Current scope

- Branded app shell with responsive navigation
- Minimal product-reveal landing screen at `/`
- Authentication entry route at `/auth`
- Workspace overview route at `/workspace`
- Schedule, team, shifts, analytics, settings, and onboarding routes
- Brand assets served from `public/brand`
- Original product brief preserved at `equal.md`
- Shared documented startup routine wired into the workspace overview and onboarding flow
- Vercel Analytics mounted in the root layout

## Next implementation targets

1. Define the database schema and RLS policies.
2. Add JWT/OIDC auth and Neon-backed organization-aware data access.
3. Implement schedule, team, and rule domain models.
4. Build the constraint engine and roster generation flow.
5. Replace placeholder data with live queries and realtime updates.
