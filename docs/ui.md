# Equal UI Guide

This document is the UI companion to `README.md`.

Use it when designing, reviewing, or refactoring screens.

## Document ownership

- `README.md` explains repo state, setup, routes, and current implementation scope.
- `equal.md` is the full product brief: brand, domain, flows, roles, and long-range product intent.
- `docs/providers.md` explains UI and app-state ownership.
- `docs/dependencies.md` explains stack and vendor choices.
- `docs/ui.md` explains how Equal should look, feel, and behave in the current codebase.

If the docs ever drift:

- `README.md` and the shipped code define current reality.
- `equal.md` defines product intent.
- `docs/ui.md` should translate that intent into practical screen rules.

## What Equal should feel like

Equal should feel:

- Calm
- Effortless
- Intelligent
- Fair
- Native
- Operationally trustworthy

It should never feel:

- Spreadsheet-heavy
- Generic SaaS
- Over-decorated
- Verbose
- Like a dashboard before the user understands the product

This comes directly from the product brief:

- reduce cognitive load
- use progressive disclosure
- build trust through clarity
- keep fairness visible
- respect human context, not just coverage math

## Route intent

These route roles should stay explicit.

### Public entry

- `/`
- Purpose: minimal product reveal, immediate proof, quiet trust, and CTA
- This is not a dashboard, settings page, or auth wall
- This is not a long-form explainer or feature brochure

### Authentication entry

- `/auth`
- Purpose: the first real product action after the public reveal
- This should feel like entering the product, not being dumped into a generic login box

### Product preview / internal overview

- `/workspace`
- Purpose: overview of modules, startup routine, launch progress, and current product surfaces

### Core product routes

- `/schedule`: roster builder, conflict review, fairness context, publish flow
- `/team`: staff profiles, skills, preferences, and staffing inputs
- `/shifts`: templates, coverage assumptions, and demand structure
- `/analytics`: fairness, compliance, and coverage reporting
- `/settings`: organization rules, integrations, roles, and system setup
- `/onboarding`: first-run setup and startup routine

## Brand system

### Color roles

Use the token meanings from `equal.md` and `src/app/globals.css`.

- `primary` `#42a5f5`: trust, guidance, main product action
- `secondary` `#9c27b0`: premium accent, secondary emphasis
- `accent` `#ff9800`: energy, attention, secondary alerts
- `success` `#81c784`: balance, completion, healthy outcomes
- `warning` `#ffc107`: risk, imbalance, review required

Rules:

- Color is semantic, not decorative.
- Semantic meaning must not change across screens or themes.
- Avoid random one-off colors outside the token system.

### Typography

Current repo typography should remain the baseline unless intentionally changed:

- SF Pro: primary body and UI type
- Space Grotesk: headings and large display moments
- Geist Mono: technical or code-like text
- Satoshi: optional numeric emphasis only if explicitly introduced

Rules:

- Headings carry tone and rhythm.
- Body copy should stay calm and readable.
- Dense operational screens must privilege legibility over stylistic flourish.

### Surface language

Equal uses depth, glass, blur, and layered backgrounds.

Rules:

- Prefer layered surfaces over flat blocks.
- Do not use borders as the primary separator.
- Do not use rings as a hierarchy tool.
- Do not stack bordered cards inside bordered cards just to create structure.
- Use blur, spacing, tone, elevation, grouping, scale, and alignment before reaching for any line treatment.
- The interface should feel premium, not like a default Tailwind starter.

Strict rule:

- Equal should read through surface difference, not outlined boxes.
- If a screen only works because every block has a border or ring, the hierarchy is wrong.
- Borders are transitional support at most, never the design language.

Preferred hierarchy tools, in order:

1. Surface tone difference
2. Elevation and shadow
3. Blur and translucency
4. Spacing and grouping
5. Typography contrast
6. Motion and state change

Allowed exceptions:

- Hairline separators inside dense data layouts when content would otherwise collapse
- Table or grid alignment aids in high-density operational views
- Critical safety delineation where the risk state must be unmistakable

Even in those cases:

- keep the line quiet
- never let the line carry the entire hierarchy
- never let rings become the default answer

Focus and accessibility note:

- Accessible focus states are still required.
- Do not rely on default border or ring styling for focus if it becomes the dominant visual language.
- Prefer glow, fill shift, shadow, contrast shift, or motion-supported focus treatment that remains clearly visible.

Current shared surface classes live in `src/app/globals.css`:

- `.glass-panel`
- `.glass-panel-strong`
- `.metric-chip`
- `.story-panel`

### Layout discipline

Rules:

- Avoid wrapper-in-wrapper-in-wrapper composition.
- Avoid stacking full-width wrappers that exist only to center another wrapper.
- Full-page routes should usually have one page shell width, not a max-width inside a max-width inside a card.
- If a layout only works because several nested wrappers keep correcting each other's spacing, the structure is wrong.
- Nested DOM should exist for meaning, interaction, or necessary grouping, not for habit.

Practical rule:

- Prefer one page shell, one section grid, and direct children.
- Avoid extra "container", "inner", "content", and "body" wrappers unless each one has a distinct job.
- If a block can be removed without changing layout meaningfully, remove it.

Max-width rule:

- Full-screen public routes should feel expansive, not boxed in.
- Use a single intentional page width for the full composition.
- Do not add local `max-width` constraints repeatedly inside the same hero or page section.
- Narrow widths are acceptable only for readability-critical text or forms.

Apple-style test:

- If you are unsure, ask: would Apple ship this with fewer layers, fewer words, and stronger surface hierarchy?
- The answer should usually push the screen toward less chrome, not more.

### Iconography

- Primary product icon language: SF Symbols via `sf-symbols-lib`
- Secondary utility icon language: Lucide
- Optional expressive fallback: Phosphor

Rules:

- Use SF Symbols when the screen should feel native, polished, and product-led.
- Use Lucide when the concept is more technical or implementation-focused.
- Do not mix icon styles randomly inside the same component group.

## Core UI principles

These are the rules that should survive from `equal.md` into day-to-day implementation.

### 1. Purpose clarity

Every screen must answer:

- What is this screen for?
- What is the one dominant action?

Pass if:

- the purpose can be described in one sentence
- there is one visually dominant action

Fail if:

- multiple actions compete equally
- the user has to infer the screen's purpose

### 2. First-frame value

The first visible frame must show value quickly.

Rules:

- no empty shells as a first impression
- no skeleton-only public entry state
- no marketing page that reads like a feature dump

For Equal specifically:

- `/` must explain what Equal is and why it is different in under five seconds
- the proof should be visual before it becomes verbal

### 3. Trust through clarity

Equal is a scheduling system. Users need to trust it before they need to admire it.

Rules:

- show why an assignment or recommendation exists
- make fairness visible
- show consequences before sensitive actions
- prefer explainable UI over black-box magic

### 4. Progressive disclosure

Do not dump every control on the screen at once.

Rules:

- start with the clearest summary or action
- reveal complexity when the user moves deeper
- keep advanced controls close to the relevant workflow, not globally everywhere

### 5. Human context over abstract optimization

Equal is not just a solver front-end.

Rules:

- show fatigue, fairness, skill mix, and coverage as human outcomes
- avoid presentations that feel purely mathematical
- when possible, make the impact on people visible at a glance

## Screen anatomy

Most screens should follow this order:

1. Title
2. Context
3. Primary action
4. Main content
5. Supporting controls

Questions to ask:

- Does the eye know where to go first?
- Is the action hierarchy obvious in under one second?
- Is there a clear difference between primary, secondary, and tertiary actions?
- Would the hierarchy still work if visible borders and rings disappeared?
- Are there any wrappers here that only exist because the web tends to over-wrap layouts?

## First-load doctrine

The public first screen matters enough to deserve explicit rules.

Equal should start with:

- reveal
- proof
- quiet trust
- CTA

Not with:

- login
- empty dashboard
- settings
- feature grid

The current baseline is:

- hero
- one proof surface
- one trust line
- one clear CTA pair

Public-entry rule:

- The first screen should feel closer to a premium splash screen than a marketing page.
- Every extra paragraph, card, or explainer block must justify its existence.
- If proof can be shown visually, remove the text.
- If a concept needs a full explanation, it belongs deeper in the product, in docs, or in code comments/JSDoc, not on the public entry frame.
- The user should understand the product in one glance, not by reading down the page.
- The primary CTA should move the user into the product flow, usually through authentication.
- Remove preview language when the real product entry path exists.
- Supporting labels should read like system state, not decorative marketing pills.

Theme rule for public routes:

- Default public entry to light theme unless there is a deliberate reason not to.
- Dark theme should feel deep and contained, not like color bleed on a flat black background.
- Light and dark should both feel designed, not like one is a fallback inversion of the other.

If this changes later, keep the principle even if the exact composition evolves.

## App-shell rules

The app shell exists for product routes, not for the public landing screen.

Rules:

- `/` should remain outside the full workspace shell treatment
- the shell should reinforce current section, org context, team context, and role
- desktop nav should stay obvious
- mobile nav should remain task-oriented and compact
- global actions should stay contextual and useful, not become a dumping ground for random commands

## Device intent

Do not think in generic responsive shrink/stretch terms.

Design intentionally for:

- mobile
- tablet
- desktop

### Mobile

Purpose:

- quick actions
- approvals
- focused review

Rules:

- one primary action
- vertical stacking
- large tap targets
- limited chrome
- sheet-based details when appropriate
- hide non-essential labels before horizontal controls start colliding
- prefer compact 2-column action groupings over long full-width rails when space is tight
- icon-only controls are acceptable for secondary actions when the accessible label remains intact

### Tablet

Purpose:

- light editing
- overview plus detail

Rules:

- two-pane thinking
- more visible context than mobile
- touch-first interactions with stronger spatial feedback

### Desktop

Purpose:

- high-control workflows
- dense schedule interaction
- multi-panel editing and analysis

Rules:

- allow more information density
- use sidebars and inspector patterns
- support drag precision
- preserve hierarchy even with complex data

### Cross-device rule

Same logic, different surface.

Terminology, color meaning, icon meaning, and feedback patterns must remain consistent.

## Theme and environment awareness

Equal should behave like a theme-aware product, not a color-inverted demo.

### Light mode

- clearer surfaces
- softer blur
- high readability

### Dark mode

- deeper surfaces
- stronger sense of depth
- careful glow and contrast control

### System mode

- should follow the OS without feeling broken or unfinished

Rules:

- hierarchy must survive theme changes
- semantic color meaning must survive theme changes
- glass should enhance clarity, not muddy it
- text should reflow or hide gracefully before it overflows or starts fighting the layout

## Motion rules

Motion should clarify space and response, not decorate the screen.

Rules:

- favor opacity and transform
- keep transitions short and deliberate
- use motion to explain surface changes, not to show off
- respect `prefers-reduced-motion`

Current landing-page helpers in `src/app/globals.css` are fine as a model:

- `story-rise`
- `story-float`
- `story-reveal`

But reuse them intentionally, not everywhere.

## State completeness

Every meaningful screen must have designed states for:

- loading
- empty
- error
- success

Rules:

- no raw fallback text
- no broken layout when data is missing
- no silent failures
- always provide recovery where possible

Overflow rule:

- Do not let text overflow just because desktop copy was dropped into mobile.
- Hide low-priority labels before shrinking the whole interface into noise.
- Preserve the primary message and action first; supporting detail is what should collapse.
- Do not force segmented controls, theme toggles, or secondary CTAs to stay fully labeled on narrow screens if that breaks spacing.

Examples:

- schedule with no assignments
- analytics with no baseline data yet
- team with no preferences entered
- settings screen with missing integration credentials

## Feedback and safety

Scheduling actions have real-world consequences.

Sensitive actions include:

- publish roster
- override assignment
- change rules
- resolve swap
- remove staff from a schedule

Rules:

- show pre-action impact when possible
- confirm destructive or high-risk actions
- show success feedback
- show useful failure feedback
- provide undo where reasonable
- keep auditability visible in the product direction

## Fairness UX rules

Fairness is Equal's differentiator, so it must be felt in the interface.

Rules:

- do not hide fairness in a buried report
- make balance visible in schedule and analytics surfaces
- show fairness as distribution, not just a score
- pair fairness signals with explanation when the user needs to trust a decision

Good examples:

- rotation indicators
- fairness meters
- explanation notes
- historical workload context

Bad examples:

- fairness buried in a settings submenu
- a single score with no explanation
- risk signals that require deep drilling before they matter

## Implementation guidance for this repo

Keep the UI guidance grounded in the actual architecture:

- use global tokens and shared surface classes from `src/app/globals.css`
- use `docs/providers.md` when deciding whether state belongs in a provider or local component state
- use TanStack Query for server data, not ad hoc UI context
- keep route-scoped interaction state in feature providers such as roster-builder and fairness
- keep marketing/story surfaces separate from internal product-shell surfaces
- treat any existing border-heavy utility usage in the current codebase as transitional, not as the target design language
- when creating or refactoring shared classes, bias toward surface differentiation instead of adding more `border-*` or `ring-*` utilities

## No-border review rule

Before approving a screen, check this directly:

- If the border opacity increased to 100%, would the UI suddenly become readable? If yes, the hierarchy is too weak.
- If all borders and rings were removed, would the structure still be clear? If no, redesign the surfaces.
- Is spacing, tone, and elevation doing the work first? If no, redesign before shipping.
- Are rings being used because the layout lacks confidence? If yes, fix the layout instead.

## Screen review checklist

Before shipping a screen, answer yes to all of these:

- Is the purpose obvious?
- Is there one dominant action?
- Does the first frame show value?
- Is the hierarchy clear?
- Are loading, empty, error, and success states designed?
- Does the screen fit its route intent?
- Does it adapt correctly for role and device?
- Does it work in light, dark, and system themes?
- Does the hierarchy work without relying on borders or rings?
- Does it feel calm, intelligent, and fair?
- Would a real scheduler trust this screen?

If any answer is no, the screen is not ready.
