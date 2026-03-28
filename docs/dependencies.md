# Equal Dependency Baseline

This dependency set was derived from `equal.md` and now reflects the concrete stack decisions for the current build.

## Installed now

### Framework and runtime

- `next`
- `react`
- `react-dom`
- `typescript`
- `@vercel/analytics`

### Tailwind and styling utilities

- `tailwindcss`
- `@tailwindcss/postcss`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`

### shadcn and Radix foundation

- `shadcn`
- `@radix-ui/react-avatar`
- `@radix-ui/react-checkbox`
- `@radix-ui/react-context-menu`
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-label`
- `@radix-ui/react-popover`
- `@radix-ui/react-progress`
- `@radix-ui/react-scroll-area`
- `@radix-ui/react-select`
- `@radix-ui/react-separator`
- `@radix-ui/react-slot`
- `@radix-ui/react-switch`
- `@radix-ui/react-tabs`
- `@radix-ui/react-tooltip`

### Motion and iconography

- `framer-motion`
- `lucide-react`
- `sf-symbols-lib`
- `@phosphor-icons/react`

### Forms, validation, and date input

- `react-hook-form`
- `@hookform/resolvers`
- `zod`
- `react-day-picker`
- `date-fns`

### Scheduling interaction and feedback

- `@dnd-kit/core`
- `@dnd-kit/modifiers`
- `@dnd-kit/sortable`
- `@dnd-kit/utilities`
- `sonner`

### Data, database access, auth, and offline state

- `@neondatabase/serverless`
- `@neondatabase/api-client`
- `@tanstack/react-query`
- `jose`
- `idb`
- `next-themes`
- `react-error-boundary`

### Analytics, notifications, integrations, and solver

- `recharts`
- `react-is`
- `vercel`
- `postmark`
- `@vonage/server-sdk`
- `web-push`
- `@mergeapi/merge-node-client`
- `javascript-lp-solver`

## Decided provider/runtime choices

- Database platform: Neon with `@neondatabase/serverless` for app queries and `@neondatabase/api-client` for project, branch, and admin operations.
- Auth and OAuth/OIDC: provider-issued JWT/OIDC sessions verified with `jose`, with organization and role claims attached in the app layer.
- Deployment CLI and remote env sync: `vercel`.
- Web analytics: `@vercel/analytics`.
- Email delivery: `postmark`.
- SMS delivery: Vonage via `@vonage/server-sdk`.
- Browser push notifications: `web-push`.
- Analytics dashboards: `recharts`.
- Client-side query/mutation cache for interactive modules: `@tanstack/react-query`.
- Payroll and HR integration layer: `@mergeapi/merge-node-client`.
- Constraint engine baseline: `javascript-lp-solver`.

## Manual assets and source bundles

These are part of the documented stack but are not normal npm dependencies:

- SF Pro display weights are checked into `public/fonts` and loaded through `next/font/local`.
- Satoshi self-hosted web fonts and license are staged in `public/fonts/satoshi`.
- Apple SF Pro Icons web fonts are staged in `public/fonts/sf-pro-icons` for immediate browser use.
- The official Apple SF Symbols 7 macOS download is staged in `vendor/apple/SF-Symbols-7.dmg`; extracting or using the native app bundle still requires macOS.
- Any additional brand-owned type assets beyond SF Pro and Satoshi still need to be supplied manually.

## Still deferred

These remain implementation tasks, not missing package installs:

- Replacing the in-process solver with a dedicated optimization service if `javascript-lp-solver` proves too limited.
- Choosing the exact time-tracking provider(s); the app can use native `fetch` adapters until one is fixed.
- Provisioning provider accounts, secrets, templates, and webhook flows for auth and notifications.
