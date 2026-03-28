# App Shell and Layout Architecture

This document defines the protected app shell that comes after the public landing, demo, and auth entry.

The public entry proved the visual language. The protected app must now make that language operational.

## Goal

Build one coherent shell system that feels calm, native, and obvious across mobile, tablet, and desktop.

## Primary Rule

The user should not feel like every route invented its own layout.

The shell must be shared.

## Shell Responsibilities

- navigation
- current section awareness
- org/team/site context
- global quick actions
- route title and utility context
- responsive drawers/sheets/panels

## Shell Components

```txt
src/features/shell/components/
  app-shell.tsx
  sidebar.tsx
  topbar.tsx
  bottom-pill-nav.tsx
  context-fab.tsx
  responsive-sheet.tsx
  stack-frame.tsx
```

## Device Intent

### Mobile

- floating bottom pill navigation
- context-aware FAB on the right
- one primary surface at a time
- bottom drawers for helper flows
- day-focused schedule views

### Tablet

- collapsed left rail
- two-pane composition where useful
- right drawer for details
- week view in landscape, tighter focused view in portrait

### Desktop

- left sidebar
- optional collapsed rail state
- inspector/detail panels on the right
- full week and richer analytics layouts

## Navigation Model

### Main sections

- Schedule
- Team
- Shifts
- Analytics
- Settings

### Rules

- mobile: bottom pill
- tablet: rail
- desktop: sidebar
- section meaning must stay consistent across devices

## FAB / Context Actions

The right-side FAB is valid only if it is truly context-aware.

Examples:

- Schedule: add shift, generate, publish
- Team: add teammate
- Shifts: add template
- Analytics: export report
- Settings: add rule or integration

Do not let it become a generic junk drawer.

## Surface Rules

- stack pages for primary flow depth
- use sheets/drawers for helper detail
- desktop helpers can become side panels or centered modals depending on task weight
- keep one dominant working surface

## Layout Rules

- avoid stretchy empty slabs
- content should size to purpose
- do not use wrapper-in-wrapper layouts to fix alignment mistakes
- avoid repeating local `max-width` constraints inside shell content
- route content should plug into the shell, not rebuild the shell

## State Ownership

### Shell-owned state

- sidebar collapsed
- bottom nav state
- current route action set
- active sheet id
- density mode
- layout mode

### Route-owned state

- schedule draft
- team filters
- fairness comparison
- swaps queue selection

## Interactions

- page transitions should feel like stack movement, not reloads
- drawers should come from the correct edge by device
- motion should explain spatial changes
- helper detail should not replace whole pages if a sheet/panel is sufficient

## No Extra Library Rule

Do not add a separate glass UI library.

Reason:

- the design language is already established in our tokens and surfaces
- we need consistency more than novelty
- outsourcing glass effects will make the shell drift from the public entry

## Implementation Sequence

1. build the shell skeleton
2. wire responsive navigation
3. wire context-aware FAB
4. add one responsive sheet primitive
5. move current protected routes under the shell
6. only then deepen individual feature routes

## Acceptance Checklist

- one app shell wraps all protected routes
- mobile uses bottom pill navigation
- tablet uses a collapsible rail
- desktop uses a sidebar
- FAB changes by route context
- helper flows use one shared responsive sheet primitive
- protected routes feel like one product, not a set of separate demos
