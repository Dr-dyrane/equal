# Equal - Universal Roster/Scheduler Product README Bible

## Brand & Identity

### Brand name

Equal - a universal rostering system that treats every person fairly. The name captures the etymology of equality; two "E" shapes face each other to form an equals sign, echoing the way the logo is constructed using a rotated symbol.

### Brand statement

Equal empowers organisations of any size to create rosters where humans feel respected and operations thrive. We believe fairness isn't optional - it's the foundation of sustainable work.

### Logo mark

The mark features two stylised E shapes arranged as a rotated "equals" sign, signifying balance and reciprocity. This rotated symbol comes from the Copilot-inspired asset you provided and visually emphasises the idea of fairness.

### Colour theme

Our palette uses vivid, emotionally resonant colours to convey trust, creativity and warmth. Each tone was selected based on the psychology of colour in branding:

- Trust Blue (#42a5f5) - conveys dependability and intelligence. Blue is widely used by technology and healthcare firms because it builds calm, reliable experiences.
- Creative Purple (#9c27b0) - merges creativity with elegance, suggesting sophistication and imagination.
- Optimistic Yellow (#ffc107) - symbolises optimism and warmth. A golden hue lifts energy without overwhelming the interface.
- Growth Green (#81c784) - reflects growth, balance and health. It grounds the experience in wellbeing and sustainability.
- Energetic Orange (#ff9800) - an energetic yet friendly accent that injects vibrancy when used sparingly.

These colours are implemented as Tailwind CSS custom tokens. A simple table summarises them:

| Token | Hex |
| --- | --- |
| primary | #42a5f5 |
| secondary | #9c27b0 |
| accent | #ff9800 |
| success | #81c784 |
| warning | #ffc107 |

Use black (#000000) and white (#ffffff) sparingly for contrast. Limit the palette to these five colours for clarity.

## Apple-HIG UI Design Stack

This stack should live in the product README as the canonical UI implementation baseline.

### Final production-ready stack

1. `shadcn/ui` (Radix UI primitives)

Purpose: interaction patterns, accessibility, and structure. It gives the product predictable, composable primitives that fit a token-driven Apple-style interface.

2. Tailwind with global tokens

Purpose: spacing, radius, blur, elevation, translucency, and consistency enforcement. Apple HIG-style UI is spacing-driven, and Tailwind is the right execution layer for the token system.

3. Liquid Glass UI

Purpose: Apple-style visual language with glass, blur, depth, specular highlights, and motion. Use it for surface physics, not as decoration.

4. `sf-symbols-lib` with SF Symbols and SF Pro

Purpose: primary Apple iconography for Next.js and TypeScript. It provides tree-shakeable SF Symbols React components with server-safe rendering, while local Apple font assets remain available for typography and icon-font fallback work.

5. Lucide

Purpose: the secondary icon set for more technical or futuristic modules. It complements SF Symbols without turning the product into an Apple copy.

6. Optional: Phosphor Icons

Purpose: expressive multi-weight fallback icons when SF Symbols does not cover a concept cleanly.

### Recommended stack summary

#### Core UI

- Next.js 14 / React 19 / TypeScript
- shadcn/ui with Radix primitives
- Tailwind with global tokens

#### Visual Language

- Liquid Glass UI for glass, blur, depth, and motion
- Custom tokens for spacing, radius, blur, and elevation

#### Iconography

- Primary: `sf-symbols-lib` for SF Symbols React components
- Secondary: Lucide
- Optional: Phosphor Icons

#### Fonts

- SF Pro for UI
- Satoshi for numbers
- Geist for body text
- Space Grotesk for headings

## 0. ⚡ IDEA INPUT (START HERE)

### IDEA

Build Equal, a universal, AI-driven rostering and scheduling system. It creates fair, adaptive rosters by modelling human fatigue, preferences, skills and constraints. The system learns from feedback and continually improves scheduling quality across any industry.

### CATEGORY ANCHOR

Closest existing products: UKG Kronos, Blue Yonder (FedEx scheduling), When I Work, Humanity. Equal takes inspiration from workforce management software but removes domain-specific assumptions and adds deep context awareness.

### CORE VALUE MOMENT

The moment a scheduler presses "Generate" and sees a balanced roster that covers every requirement while honouring individual preferences - and the team feels heard and treated fairly.

### TARGET USER

Managers, schedulers and staff within any organisation that operates shifts - hospitals, logistics centres, call centres, restaurants, hospitality, retail, manufacturing and remote teams. Equal is also designed for staff to self-manage preferences and swaps.

### WHY NOW

Hybrid work, tighter labour regulations, and increased focus on wellbeing make static spreadsheets untenable. AI and constraint programming enable smarter scheduling today, while employees demand fairness. A cross-industry platform democratises advanced scheduling for organisations that could not previously afford bespoke systems.

## 1. 🧭 REFERENCE PRODUCT ANALYSIS (MANDATORY)

### PRIMARY REFERENCE

Blue Yonder (FedEx scheduling)

What it gets right:

- Real-time shift assignments for logistics operations.
- Integration with enterprise systems and payroll.
- Handles large volumes of workers.
What it gets wrong:

- Manual assignment heavy - the scheduler must make decisions instead of the system offering suggestions.
- Limited handling of soft constraints (preferences, fatigue, skill mix).
- Feels like a spreadsheet; it doesn't visualise fairness over time or explain why a shift was assigned.

### SECONDARY REFERENCES

- UKG Kronos: powerful compliance engine and labour law enforcement, but complex and industry-specific.
- When I Work: simple mobile interface and shift swapping, but lacks deep optimisation and fairness tracking.
- Google Calendar: intuitive time-based UI, but not built for shift-based labour and lacks constraint handling.

### PATTERNS TO BORROW

- Navigation model: Tabs for Schedule, Team, Shifts and Analytics, similar to When I Work.
- Interaction style: Drag-and-drop from Google Calendar; real-time updates and notifications.
- Trust model: Transparent explanation of decisions; fairness ledger showing historical workload.

### PATTERNS TO REJECT

- Spreadsheet-like grids with no context; complexity hidden from the user.
- Manual assignment as the primary workflow.
- Black-box AI that doesn't explain why a shift was assigned.

### PRODUCT SYNTHESIS

"Equal is Blue Yonder+Google Calendar+Kronos but simpler because it prioritises fairness and adapts across industries rather than hard-coding healthcare or logistics rules."

## 2. 🎯 PRODUCT DEFINITION

### PROBLEM

Schedulers juggle legal requirements, coverage needs, staff preferences, skills, fatigue and fairness. Existing tools either oversimplify (ignoring human nuance) or are rigid, industry-specific and hard to use. Manual scheduling leads to burnout, unfair workloads and operational risk.

### USER OUTCOME

When Equal works perfectly, managers generate rosters that respect constraints and preferences with minimal effort, and staff receive schedules they're happy with. No one feels punished with repeated night shifts or unfair workloads; coverage is always maintained.

### SUCCESS METRIC

- Fairness score: distribution of undesirable shifts balanced over time.
- Schedule approval rate: percentage of staff who accept schedules without requesting swaps.
- Coverage compliance: percentage of shifts correctly staffed with required skills.
- Scheduler time saved: reduction in time spent creating or modifying rosters.

### PRODUCT PRINCIPLES

- Reduce cognitive load: surface only relevant decisions; auto-suggest best assignments.
- Progressive disclosure: show simple dashboards first; allow deeper tweaking when necessary.
- Trust through clarity: explain why each assignment was made and track fairness over time.
- Human-centric: respect individual preferences, wellbeing and development.
- Domain-agnostic: keep rules configurable so any organisation can encode its own hard and soft constraints.

## 3. 👥 ROLES & PERMISSIONS

### ROLES

- Owner: creates the organisation, manages billing and has full permissions.
- Admin: manages users, roles and organisation-wide settings.
- Scheduler/Manager: configures shifts, defines rules and generates schedules.
- Staff: views their own schedule, sets preferences and requests swaps.
- Observer: read-only access for payroll/auditors.

### ROLE CAPABILITIES

| Role | Can | Cannot |
| --- | --- | --- |
| Owner | All actions; delegate billing; manage roles | - |
| Admin | Invite/remove users; configure default rules | Delete organisation |
| Scheduler | Create/edit shifts, run optimisation, approve swaps | Manage billing or user roles |
| Staff | Set availability/preferences, request swap/leave | Edit other users' schedules or rules |
| Observer | View schedules and reports | Modify any data |

### SENSITIVE ACTIONS

- Modifying employment contracts.
- Changing legal compliance rules (e.g. maximum weekly hours).
- Editing fairness parameters (e.g. weight of night vs day shifts).
- Deleting historical schedule data.

### VISIBILITY RULES

- Staff see only their own shifts, availability and fairness ledger.
- Schedulers see everyone's preferences, skill levels and fairness statistics.
- Admins and owners see financial metrics and compliance reports.

## 4. 🌍 DOMAIN REALITY (CRITICAL)

### HARD RULES (non-negotiable)

- Legal limits: maximum hours per day/week, minimum rest periods between shifts, and mandatory breaks vary by jurisdiction.
- Skill coverage: each shift type requires a specified mix of skills (e.g. two senior staff and one junior). Rules are configurable per organisation.
- One person per shift: a staff member cannot be assigned to overlapping shifts.
- Holiday/time-off blocks: approved leave overrides any other assignment.

### SOFT CONSTRAINTS

- Staff preferences (availability, preferred shift types, days off, notes).
- Equitable rotation of night/weekend/holiday shifts.
- Mixing experience levels for mentoring.
- Avoiding consecutive high-stress shifts.
- Limiting pairing of staff from the same department when cross-functional collaboration is desired.

### EDGE CONDITIONS

- Last-minute call-offs due to illness or emergencies.
- Changes in demand requiring extra coverage (e.g. unexpected influx of work).
- New hires or departing employees mid-cycle.
- Multiple job roles per person (e.g. someone who can fill both barista and cashier roles).

### EXCEPTIONS

- Emergency overrides by admins (e.g. assign someone beyond usual maximum hours during a crisis) with appropriate logging.
- Temporary rule relaxation (e.g. during training periods).

## 5. 🧩 FEATURE MAP

### CORE FEATURES (MVP)

- Constraint engine: encode hard and soft rules; run optimisation to generate rosters.
- Fairness ledger: track workload distribution across past schedules.
- Schedule editor: drag-and-drop interface to review and tweak generated rosters.
- Preference management: staff input availability, preferred shifts, days off.
- Swap requests & approvals: staff request swaps; system ranks viable replacements; scheduler approves.

### SUPPORTING FEATURES

- Analytics dashboard: visualise coverage, overtime and fairness metrics.
- Notification system: deliver schedules, reminders and changes via email/SMS/push.
- Compliance audit: export schedule data for regulatory reporting.
- API integrations: connect to payroll, HR, and time-tracking systems.
- Multi-organisation support: agencies manage rosters for multiple clients in one account.

### TRUST / SAFETY FEATURES

- Explainability panel: show why each assignment was chosen (e.g. to balance night shifts).
- Audit log: immutable logs of schedule changes and rule modifications.
- Role-based access control: enforced via Postgres Row Level Security (RLS).

### NOT NOW

- AI-driven hiring recommendations (future).
- Automated payroll processing (integration later).
- Global marketplace for on-demand shift trading.

## 6. 🧭 INFORMATION ARCHITECTURE

### TOP-LEVEL NAVIGATION

- Schedule - generate and view rosters.
- Team - manage staff profiles, skills and preferences.
- Shifts - define shift templates (duration, required skills).
- Analytics - fairness, coverage and compliance dashboards.
- Settings - organisation rules, integrations and billing.

### MODULES

- Schedule module
- Screens: Calendar view, optimisation runner, fairness ledger, swap requests.
- Team module
- Screens: Staff list, individual profile, preferences form, skill matrix.
- Shifts module
- Screens: Shift templates, required skills editor, demand forecasting.
- Analytics module
- Screens: Coverage heatmap, fairness trends, compliance report.
- Settings module
- Screens: Organisation settings, rule configuration, integrations, billing.

### SCREEN INVENTORY

- Onboarding
- Dashboard
- Schedule calendar (day/week/month)
- Schedule review & conflicts
- Staff profile & availability
- Shift template editor
- Fairness ledger
- Swap request flow
- Analytics dashboards
- Admin settings

## 7. 🔁 USER FLOWS

### PRIMARY FLOW - Generate Schedule

- Scheduler navigates to Schedule.
- Selects date range and location/team.
- Clicks Generate- constraint engine runs and proposes assignments.
- Review screen shows roster with conflicts highlighted; fairness ledger summarises distribution.
- Scheduler drags to adjust assignments if needed.
- Scheduler publishes schedule; staff are notified and can accept or request swaps.

### SECONDARY FLOWS

- Set availability: Staff member opens their profile, selects days/times they cannot work, chooses preferred shifts and submits.
- Request swap: Staff member selects an assigned shift and chooses "Request swap"; system suggests eligible colleagues; request goes to scheduler for approval.
- Define rule: Admin adds or edits a constraint (e.g. "maximum consecutive night shifts = 3"). Schedules regenerate accordingly.
- View fairness: Staff open fairness ledger to see how many nights, weekends and undesirable shifts they've worked compared to peers.

### FAILURE FLOWS

- Optimisation failure: System cannot satisfy all hard constraints → show list of violated rules and allow scheduler to relax constraints or manually assign.
- API failure: Data fetch errors → display error state with retry button and offline fallback (cached schedules).
- Permission denial: Staff attempt to edit someone else's schedule → show "Access denied" message.

### ADMIN FLOWS

- Invite user: Admin enters email, assigns a role; user receives invite link.
- Configure roles: Create custom roles by selecting capabilities; update Postgres RLS policies accordingly.
- Integration setup: Admin connects payroll or calendar integrations; selects what data to sync.

## 8. 🔄 STATE MODEL (VERY IMPORTANT)

### CORE OBJECT STATES

Shift Assignment:

- unassigned - slot exists but no person assigned.
- proposed - generated by optimisation engine; awaiting scheduler publication.
- published - visible to staff; can be swapped.
- swap_requested - staff has requested a swap; awaiting approval.
- swap_denied - request denied.
- completed - shift completed; locked for editing.
- cancelled - removed due to emergency or schedule regeneration.

### TRANSITIONS

- unassigned → proposed - optimisation engine runs.
- proposed → published - scheduler publishes.
- published → swap_requested - staff requests swap.
- swap_requested → published - scheduler approves swap and assigns replacement.
- swap_requested → swap_denied - scheduler denies swap.
- published → cancelled - shift removed and reoptimised.
- published → completed - shift occurs.

### PERMISSIONS BY STATE

- Scheduler - can modify assignments in any state except completed.
- Staff - can view all states, request swaps only in published state for their own shifts.
- Admin/Owner - can override any state change with justification.

## 9. 🧱 DOMAIN MODELS

### ENTITIES

- Organisation- a company or client using the app.
- User- person with a role in the organisation.
- Role- defines permissions.
- Skill- a capability staff may possess (e.g. RN, forklift driver).
- ShiftTemplate- definition of a shift: start time, duration, required skills, type (day/night/weekend).
- Schedule- collection of shift assignments for a time range.
- Assignment- linking a ShiftTemplate instance to a User on a specific date/time.
- Preference- user input of availability, preferred shift types and notes.
- Rule- encoded hard or soft constraint with weight and scope.
- FairnessLedger- historical record of assignments per person and fairness metrics.

### ENTITY DEFINITIONS

Organisation

Purpose: container for all entities; enforces isolation across organisations.

Key fields: id (UUID), name, timezone, created_at.

Relationships: Organisation 1: N Users, 1: N ShiftTemplates, 1: N Schedules.

User

Purpose: represents a person (staff, manager, admin).

Key fields: id (UUID), organisation_id (FK), name, email, role_id, skills (array of skill IDs), created_at, deleted_at.

Relationships: User N: M Skills through a join table; N: M Assignments; 1: N Preferences.

Role

Purpose: enumerates capabilities.

Key fields: id, organisation_id, name, permissions (JSONB array).

Relationships: Role 1:N Users.

Skill

Purpose: defines a capability that can satisfy shift requirements.

Key fields: id, organisation_id, name, description.

Relationships: Skill N:M Users; N:M ShiftTemplates (required skills).

ShiftTemplate

Purpose: defines shift structure.

Key fields: id, organisation_id, name, start_time, end_time, duration, required_skills (JSONB), type (ENUM).

Relationships: ShiftTemplate 1:N Assignments; N:M Skills.

Schedule

Purpose: groups assignments by period.

Key fields: id, organisation_id, name, period_start, period_end, generated_at, published_at.

Relationships: Schedule 1:N Assignments.

Assignment

Purpose: specific scheduled occurrence linking a ShiftTemplate to a user on a date.

Key fields: id, schedule_id, shift_template_id, user_id (nullable until assigned), date, state (ENUM), fairness_weight (numeric), created_at.

Relationships: Assignment N:1 Schedule; N:1 ShiftTemplate; N:1 User.

Preference

Purpose: staff availability and preferences.

Key fields: id, user_id, unavailable_dates (daterange array), preferred_shift_types (ENUM[]), notes (text), updated_at.

Relationships: Preference1: 1User.

Rule

Purpose: configurable constraints.

Key fields: id, organisation_id, name, type (hard|soft), expression (JSONB), weight (numeric), created_at.

Relationships: Rule1: NOrganisation.

FairnessLedger

Purpose: record of assignments and fairness metrics.

Key fields: id, user_id, date, shift_type, weight, cumulative_night_shifts, cumulative_weekend_shifts, cumulative_overtime.

Relationships: FairnessLedger N:1 User.

### RELATIONSHIPS

- Organisation → Users (1: N)
- Organisation → ShiftTemplates (1: N)
- Organisation → Schedules (1: N)
- User ↔ Skill (M: N via user_skills)
- ShiftTemplate ↔ Skill (M: N via template_required_skills)
- Schedule → Assignment (1: N)
- Assignment → User (N: 1)
- Assignment → ShiftTemplate (N: 1)
- User → Preference (1: 1)
- Organisation → Rule (1: N)

## 10. 🗄️ DATABASE SCHEMA (POSTGRES)

### TABLES

organisations

- id UUID PRIMARY KEY
- name TEXT NOT NULL
- timezone TEXT DEFAULT 'UTC'
- created_at TIMESTAMPTZ DEFAULT now ()
users

- id UUID PRIMARY KEY
- organisation_id UUID REFERENCES organisations (id) ON DELETE CASCADE
- name TEXT NOT NULL
- email TEXT UNIQUE NOT NULL
- role_id UUID REFERENCES roles (id)
- created_at TIMESTAMPTZ DEFAULT now ()
- deleted_at TIMESTAMPTZ
roles

- id UUID PRIMARY KEY
- organisation_id UUID REFERENCES organisations (id) ON DELETE CASCADE
- name TEXT NOT NULL
- permissions JSONB NOT NULL
skills

- id UUID PRIMARY KEY
- organisation_id UUID REFERENCES organisations (id) ON DELETE CASCADE
- name TEXT NOT NULL
- description TEXT
user_skills (join table)

- user_id UUID REFERENCES users (id) ON DELETE CASCADE
- skill_id UUID REFERENCES skills (id) ON DELETE CASCADE
- PRIMARY KEY (user_id, skill_id)
shift_templates

- id UUID PRIMARY KEY
- organisation_id UUID REFERENCES organisations (id) ON DELETE CASCADE
- name TEXT NOT NULL
- start_time TIME NOT NULL
- end_time TIME NOT NULL
- duration INTERVAL GENERATED ALWAYS AS (end_time - start_time) STORED
- required_skills JSONB DEFAULT '[]'
- type TEXT CHECK (type IN ('day', 'night', 'weekend', 'holiday'))
schedules

- id UUID PRIMARY KEY
- organisation_id UUID REFERENCES organisations (id) ON DELETE CASCADE
- name TEXT
- period_start DATE NOT NULL
- period_end DATE NOT NULL
- generated_at TIMESTAMPTZ
- published_at TIMESTAMPTZ
assignments

- id UUID PRIMARY KEY
- schedule_id UUID REFERENCES schedules (id) ON DELETE CASCADE
- shift_template_id UUID REFERENCES shift_templates (id) ON DELETE CASCADE
- user_id UUID REFERENCES users (id)
- date DATE NOT NULL
- state TEXT CHECK (state IN ('unassigned', 'proposed', 'published', 'swap_requested', 'swap_denied', 'completed', 'cancelled'))
- fairness_weight NUMERIC DEFAULT 1
- created_at TIMESTAMPTZ DEFAULT now ()
preferences

- id UUID PRIMARY KEY
- user_id UUID REFERENCES users (id) ON DELETE CASCADE
- unavailable_dates DATERANGE[]
- preferred_shift_types TEXT[]
- notes TEXT
- updated_at TIMESTAMPTZ DEFAULT now ()
rules

- id UUID PRIMARY KEY
- organisation_id UUID REFERENCES organisations (id) ON DELETE CASCADE
- name TEXT
- type TEXT CHECK (type IN ('hard', 'soft'))
- expression JSONB NOT NULL
- weight NUMERIC DEFAULT 1
- created_at TIMESTAMPTZ DEFAULT now ()
fairness_ledger

- id UUID PRIMARY KEY
- user_id UUID REFERENCES users (id) ON DELETE CASCADE
- date DATE NOT NULL
- shift_type TEXT
- weight NUMERIC
- cumulative_night_shifts INT
- cumulative_weekend_shifts INT
- cumulative_overtime INTERVAL

### ENUMS

- shift_type: 'day', 'night', 'weekend', 'holiday'.
- assignment_state: matches assignment.state column.

### CONSTRAINTS

- Unique constraint on (organisation_id, name) for roles and skills.
- Check that period_end > period_start in schedules.
- Check that unavailable date ranges in preferences do not overlap within the same user.

### INDEXES

- Index on assignments (user_id, date) for quick lookup of shifts per user.
- Index on fairness_ledger (user_id) to generate fairness dashboards.
- GIN index on required_skills for shift_templates (JSONB containment queries).

### SPECIAL NOTES

- JSONB usage: required_skills and permissions are stored as JSONB arrays to allow flexible definitions without schema migrations.
- Computed fields: duration in shift_templates and fairness metrics in fairness_ledger are computed to reduce logic in application code.

## 11. 🔐 AUTH & PERMISSIONS (RLS READY)

### ROLE STRUCTURE

- Roles are stored in the roles table with a JSONBpermissionsarray. Each permission corresponds to a capability (e.g.schedule: create, assignment: edit). Custom roles can be created by combining permissions.

### ACCESS RULES

- organisations: owner and admin can create/update; users can read only their organisation.
- users: owner/admin can manage; scheduler can read staff in their organisation; staff can read only themselves.
- schedules/assignments: schedulers and admins can read/write; staff can read only assignments where assignment.user_id = their id.
- preferences: staff can write their own; scheduler/admin can read.
- rules: admins can manage; scheduler can read.

### RLS STRATEGY

- Table: assignments
- Policy: Using Postgres Row Level Security, define policies such that staff can SELECT only assignments where `user_id = current_user_id()`. Schedulers can SELECT and UPDATE assignments where `schedule.organisation_id = current_organisation_id()`. Admins have bypass roles.

### SERVER AUTH RULES

- JWT tokens identify user_id and organisation_id, plus an array of roles. The app's auth layer attaches these claims. The Next.js client uses these claims to call serverless functions.

## 12. ⚙️ BACKEND CONTRACT (SERVERLESS FUNCTIONS)

### FUNCTION LIST

- signupUser
- Purpose: Create a new user under an organisation or start a new organisation.
- Auth required: none for self-service; organisation invites require admin JWT.
- Input: name, email, organisation_name (optional), role.
- Output: JWT, organisation_id, user_id.
- Side effects: Sends confirmation email; creates organisation if necessary.
Errors: EMAIL_EXISTS, ORG_NAME_TAKEN.

createSchedule

- Purpose: Initialise a new schedule for a date range.
- Auth required: scheduler or admin.
- Input: organisation_id, period_start, period_end, team/location id.
- Output: schedule_id, status.
- Side effects: Inserts schedule row.
Errors: INVALID_RANGE, NO_PERMISSION.

generateAssignments

- Purpose: Run the constraint engine to propose assignments.
- Auth required: scheduler.
- Input: schedule_id.
- Output: list of proposed assignments with conflicts and fairness metrics.
- Side effects: Creates assignment rows with stateproposed.
Errors: RULE_VIOLATIONwhen no solution exists.

publishSchedule

- Purpose: Transition allproposedassignments topublishedand notify staff.
- Auth required: scheduler.
- Input: schedule_id.
- Output: success flag.
- Side effects: Sends notifications.
Errors: NO_ASSIGNMENTS, NO_PERMISSION.

requestSwap

- Purpose: Staff requests to swap a published assignment.
- Auth required: staff (must own the assignment).
- Input: assignment_id, target_user_ids (optional).
- Output: swap_request_id.
- Side effects: Creates swap record, notifies scheduler.
Errors: ASSIGNMENT_NOT_PUBLISHED, NOT_OWNER.

resolveSwap

- Purpose: Scheduler approves or denies a swap request.
- Auth required: scheduler.
- Input: swap_request_id, approve (boolean), replacement_user_id (optional).
- Output: updated assignment.
- Side effects: Assigns replacement; updates fairness ledger.
- Errors: INVALID_USER, RULE_VIOLATION.

### ERROR CODES

EMAIL_EXISTS, ORG_NAME_TAKEN, INVALID_RANGE, NO_PERMISSION, RULE_VIOLATION, NO_ASSIGNMENTS, ASSIGNMENT_NOT_PUBLISHED, NOT_OWNER, INVALID_USER.

## 13. 🖥️ FRONTEND SPEC

### ROUTES

- /- dashboard with overview of schedules, fairness and alerts.
- /schedule/: id- detailed schedule view with calendar and fairness ledger.
- /team- staff directory and profiles.
- /shifts- shift template management.
- /analytics- coverage and fairness dashboards.
- /settings- organisation settings and rules.
- /onboarding- first-time setup.

### SCREEN SPECS (EXAMPLES)

Schedule Calendar

- Purpose: Display assignments across days/weeks/months; allow drag-and-drop editing.
- Data required: schedule, assignments, shift templates, fairness scores, preferences.
- Actions: generate schedule, publish, edit assignment, view fairness ledger, open swap requests.
- States: loading (skeleton UI), empty (no assignments yet), error (API failure), success (calendar populated).
Staff Profile

- Purpose: Let staff manage their availability, skills and preferences.
- Data required: user info, preferences, skills, fairness ledger.
- Actions: set availability dates, choose preferred shift types, update skills, request leave.
- States: loading, empty (no preferences set), error, success.

### DATA STRATEGY

- Useserver componentsin Next.js 14 to fetch schedules and assignments from Neon-backed Postgres on the server for initial rendering.
- Hydrate client-side components to handle drag-and-drop and inline editing.
- Real-time updates via Postgres listen/notify or a websocket transport for new assignments, swap requests and approvals.
- Cache schedules in IndexedDB for offline access and prefetch future periods.

## 14. 🎨 DESIGN SYSTEM (YOUR RULES LOCKED IN)

### DESIGN PRINCIPLES

- Liquid glass aesthetic: adopt Apple HIG-inspired translucency and depth. Surfaces float on a blurred backdrop; content takes precedence.
- Borderless UI: emphasise cards and panels without hard borders. Use shadows and blur to separate layers.
- Content-first hierarchy: typography scales to signal information importance; numbers and names are legible on all devices.
- Depth via blur, spacing & motion: subtle parallax and shadows create depth without distraction.

### TOKENS

- Spacing scale: 0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem. Use multiples of 4 px for consistency.
- Typography scale: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl. Use SF Pro for UI, Geist for body, Space Grotesk for headings, and Satoshi for numbers.
- Radius: base radius0.5remfor cards; 1remfor modals.
- Elevation: 3 levels (sm, md, lg) mapping to Tailwind shadows; incorporate backdrop-blur for glass effect.
- Colour tokens: see colour theme table above.

### COMPONENTS

- Navigation bar: translucent bar with icons for Schedule, Team, Shifts, Analytics and Settings. On mobile, use bottom navigation; on desktop, a vertical sidebar.
- Schedule board: grid displaying days and time slots. Use cards for assignments; drag-and-drop enabled. Hover reveals details; click opens side panel.
- Shift card: shows time, role, assigned person, icons for skills; colour coded by shift type (blue = day, purple = night, yellow = weekend, green = holiday).
- Fairness meter: circular progress indicator showing relative share of undesirable shifts.
- Preference form: modal with date picker, toggles for preferred shift types and note field.
- Rule editor: wizard that guides admins through adding/editing constraints; uses natural language plus parameters.

### INTERACTIONS

- Drag-and-drop: assignment cards can be dragged to another slot; invalid moves show visual feedback; dropping triggers optimistic UI update and server call.
- Swipe actions (mobile): swipe on a shift to request swap or mark unavailable.
- Context menus: right-click or long-press reveals options like "Edit", "Cancel" or "View fairness".
- Search & filter: search staff by name, filter schedule by role/skill or shift type.

### MOTION

- Use Framer Motion for React to animate transitions (modals slide up, cards fade-in). Follow Apple HIG motion curves (ease-in-out). Avoid excessive motion; keep durations around 150-250 ms.
- Use CSS `prefers-reduced-motion` to respect user settings. Provide fallbacks with no animation.
- Ensure animations are GPU-accelerated (translate/opacity) for 60 fps performance on Chrome and Safari. Test with Lighthouse to maintain high scores.

### DEVICE-SPECIFIC DESIGN

Rather than solely relying on responsive classes, design intentional layouts per form factor:

- Mobile: bottom navigation bar; single-column views; schedule board shows one day at a time with swipe to move between days; large tap targets for shift cards.
- Tablet: two-pane layout; schedule list on the left and details on the right. Landscape orientation shows a full week; portrait collapses to day view.
- Desktop: side navigation; multi-column schedule view showing full week or month; modals appear as side panels; analytics dashboards display charts and tables side by side.
Ensure that all components adapt gracefully but maintain hierarchy and gestures appropriate to the device.

## 15. ⚠️ EDGE CASES & FAILURE HANDLING

### EMPTY STATES

- No schedules yet: Show an illustration with a call to action to create the first schedule.
- No preferences: Encourage staff to set availability with a simple button.
- No rules: Prompt admins to add constraints to improve scheduling accuracy.

### FAILURES

- Network errors: Display toast notification and persistent message on the screen; provide retry and offline fallback using cached data.
- Validation errors: Highlight invalid fields; provide inline error messages near the field.
- Permission errors: Show a clear "Access denied" page with an explanation of missing privileges and a link to request access.

### RECOVERY

- OfferUndofor destructive actions (e.g. deleting assignments). Use toast notifications with undo links.
- Retry schedule generation if optimisation fails; allow scheduler to relax or adjust rules.
- Persist unsaved form data locally (LocalStorage/IndexedDB) to avoid losing input on refresh.

### SAFETY RULES

- Always log overrides and emergency rule changes with user id, timestamp and reason.
- Do not allow scheduling beyond legal maximums unless explicit override is triggered by an admin with multi-factor authentication.

## 16. 📊 NON-FUNCTIONAL REQUIREMENTS

### PERFORMANCE

- Optimise database queries (indexing, caching) to generate schedules within seconds even for thousands of employees.
- Use static rendering and incremental static regeneration in Next.js for pages that don't require real-time data.
- Employ code splitting to reduce initial bundle size. Preload essential components.

### SECURITY

- Implement OAuth/OpenID Connect for sign-in; secure JWT storage in HttpOnly cookies.
- Encrypt sensitive fields (e.g. notes containing personal information) in the database.
- Apply least privilege principle through RLS and serverless function checks.

### AUDIT LOGGING

- Record all schedule changes, rule edits, and role modifications with user, timestamp and previous values.
- Provide exportable logs for compliance audits.

### ACCESSIBILITY

- Meet WCAG 2.1 AA standards. Use sufficient colour contrast; support keyboard navigation; provide screen reader labels.
- Offer dark mode by inverting colour tokens while maintaining contrast.

### SCALING ASSUMPTIONS

- Built on serverless infrastructure (Neon/Postgres + Vercel) to scale up automatically.
- Expect to support 10-10, 000 employees per organisation; design query plans accordingly.

## 17. 🏗️ BUILD SEQUENCE

### ORDER

- Database schema - create tables, indexes and RLS policies.
- Auth - set up JWT/OIDC auth with custom claims (user_id, organisation_id, roles).
- Core entities - implement API routes/functions for users, skills, shift templates and schedules.
- Constraint engine - build rule interpreter and optimiser (use OR-Tools or a custom solver in a serverless function).
- Functions - implement API endpoints (`createSchedule`, `generateAssignments`, etc.).
- UI skeleton - scaffold the Next.js app with navigation and placeholder screens.
- Features - integrate the schedule board, preferences, fairness ledger, and swap flow.
- Realtime - add Postgres listen/notify-backed live updates.
- Admin - build role management and the rule editor.
- Polish - implement analytics dashboards, refine motion and accessibility, and finalise the design system.

### DEPENDENCIES

- Setting up database and auth precedes everything else.
- Constraint engine depends on defined rule expressions and available data.
- Realtime features rely on functions and database triggers.

### RISKS

- Complexity of optimisation: solving schedules with many constraints could be computationally expensive.
- Managing cross-domain legal rules; may need to build a library of jurisdictional templates.
- Ensuring fairness without sacrificing flexibility; tuning weights may require user education.

## 18. 🧪 TESTING STRATEGY

### CRITICAL PATHS

- Schedule generation: test with varying organisation sizes, constraint combinations and edge cases (no solution, near-infeasible solutions).
- Swap request: ensure only valid swaps are suggested; verify fairness ledger updates.
- RLS policies: test access control by role and state; ensure no unauthorised access.

### EDGE CASE TESTS

- Multiple overlapping constraints (e.g. max hours + skill coverage + mixing experience).
- Emergency overrides and rule relaxation.
- Concurrent edits - two schedulers editing the same schedule.
- Timezone differences - scheduling across distributed teams.

### ROLE TESTS

- Owner: full CRUD operations; ensure billing and role editing works.
- Admin: cannot delete organisation; can manage users and rules.
- Scheduler: cannot change roles; can generate schedules.
- Staff: cannot modify others' assignments; can request swaps.

### ACCEPTANCE CRITERIA

- Users can complete the primary flow end-to-end without assistance.
- Schedules satisfy all hard constraints; soft constraints are maximised within tolerance.
- Fairness ledger shows balanced distribution over time.
- UI meets design system guidelines on mobile, tablet and desktop.

## 19. 🚀 FINAL CHECK (DON'T SKIP)

Before coding:

- Do we know every entity and relationship? Yes - see domain models and schema.
- Do we know every possible state? Yes - states are enumerated in the state model.
- Do we know every API and function? Yes - backend contract lists them.
- Do we know every role permission? Yes - roles and RLS policies are defined.
- Do we know failure behaviour? Yes - failure flows and error codes are specified.
- Do we know UI states across devices? Yes - design system and screen specs clarify mobile, tablet and desktop variations.
If anything is unclear, refine this document rather than writing code. Equality in scheduling begins with clarity.

How to Choose the Perfect Logo Colors: Psychology, Hex Codes, and Examples

https: //stockimg.ai/blog/logo-color/how-to-choose-the-perfect-logo-colors-psychology-hex-codes-and-examples

