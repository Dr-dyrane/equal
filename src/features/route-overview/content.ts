import type { RouteOverviewContent } from "@/features/route-overview/types";
import {
  roleCards,
  startupGuardrails,
  startupRoutine,
  startupSuccessCriteria,
} from "@/lib/startup-routine";

export const teamOverview: RouteOverviewContent = {
  eyebrow: "Team",
  title: "People, skills, and availability.",
  description:
    "The schedule gets easier when the human inputs are complete before the week starts.",
  icon: "person-2-fill",
  primaryAction: {
    href: "/schedule",
    label: "Open schedule",
  },
  secondaryAction: {
    href: "/onboarding",
    label: "Open setup",
  },
  metrics: [
    {
      label: "Active staff",
      value: "128",
      detail: "Profiles are spread across teams, roles, and sites without duplicating people.",
    },
    {
      label: "Availability ready",
      value: "92%",
      detail: "Most of the team has already shared the week-level signals the roster needs.",
    },
    {
      label: "Cross-skill cover",
      value: "34%",
      detail: "Cross-trained staff keep the week resilient when demand shifts.",
    },
  ],
  sections: [
    {
      eyebrow: "Directory",
      title: "Keep every person visible.",
      description:
        "One place for roles, contract status, and the team or site each person belongs to.",
      items: [
        "Search by name, role, site, or capability.",
        "Open a person without leaving the week behind.",
        "Keep the roster tied to real people, not loose labels.",
      ],
    },
    {
      eyebrow: "Skills",
      title: "Track the capability mix.",
      description:
        "Coverage is often about who can safely do the work, not just who is free.",
      items: [
        "Attach skills and certifications to each person.",
        "Flag expiring capability before it becomes a schedule problem.",
        "Support multi-role staff without cloning records.",
      ],
    },
    {
      eyebrow: "Preferences",
      title: "Capture the human signal early.",
      description:
        "Availability, preferred shifts, and leave windows should be easy to enter and hard to miss.",
      items: [
        "Keep intake light enough that staff will actually use it.",
        "Turn preferences into real schedule inputs, not notes on the side.",
        "Let swaps respect the same availability picture.",
      ],
    },
    {
      eyebrow: "Structure",
      title: "Teams and sites stay clear.",
      description:
        "Scheduling gets messy fast when locations and team boundaries are implied instead of defined.",
      items: [
        "Assign people to one or more teams without losing visibility.",
        "Scope staffing by site when coverage depends on location.",
        "Keep org structure clean before scale makes it painful.",
      ],
    },
  ],
  tasksTitle: "Today",
  tasksHeading: "Keep team data ready.",
  tasks: [
    {
      title: "Invite the core schedulers",
      detail: "Bring in the people who will own templates, approvals, and weekly review.",
      href: "/onboarding",
    },
    {
      title: "Fill the skills gaps",
      detail: "Make sure the critical capabilities are attached before the next schedule run.",
    },
    {
      title: "Check next week",
      detail: "Open the schedule once the people data is strong enough to trust.",
      href: "/schedule",
    },
  ],
};

export const shiftsOverview: RouteOverviewContent = {
  eyebrow: "Shifts",
  title: "Templates, coverage, and demand.",
  description:
    "Model the week once, then reuse it without rebuilding every roster from scratch.",
  icon: "square-grid-2x2-fill",
  primaryAction: {
    href: "/schedule",
    label: "Open schedule",
  },
  secondaryAction: {
    href: "/settings",
    label: "Open rules",
  },
  metrics: [
    {
      label: "Active templates",
      value: "24",
      detail: "Core day, evening, night, and weekend shapes are already available.",
    },
    {
      label: "Critical roles",
      value: "07",
      detail: "These roles must stay covered or the week is not publishable.",
    },
    {
      label: "Coverage bundles",
      value: "12",
      detail: "Reusable skill combinations keep high-risk shifts consistent.",
    },
  ],
  sections: [
    {
      eyebrow: "Templates",
      title: "Start from repeatable shift patterns.",
      description:
        "The product should reuse the language your operation already uses every week.",
      items: [
        "Keep times, durations, and shift types consistent.",
        "Model day, night, weekend, and holiday load clearly.",
        "Reuse the same structures instead of redrawing the week.",
      ],
    },
    {
      eyebrow: "Coverage",
      title: "Make demand explicit.",
      description:
        "The system needs to know what good coverage looks like before it can help you.",
      items: [
        "Set headcount and role expectations by template.",
        "Flag the windows where missing coverage hurts most.",
        "Keep the week ready for real demand changes later.",
      ],
    },
    {
      eyebrow: "Skills",
      title: "Tie templates to real capability.",
      description:
        "A covered shift is not valid if the right capability is missing.",
      items: [
        "Attach required skills to each template.",
        "Protect critical roles as hard constraints.",
        "Allow flexible substitutions only where policy supports them.",
      ],
    },
    {
      eyebrow: "Readiness",
      title: "Feed the builder clean inputs.",
      description:
        "The schedule should open with clear demand and clean template logic already in place.",
      items: [
        "Keep shift design separate from assignment review.",
        "Use templates to reduce repetitive weekly work.",
        "Surface demand drift before generation starts.",
      ],
    },
  ],
  tasksTitle: "Today",
  tasksHeading: "Set the week up once.",
  tasks: [
    {
      title: "Clean up night coverage",
      detail: "The late windows are where fairness pressure shows up first.",
    },
    {
      title: "Attach required skills",
      detail: "Make sure the high-risk templates reflect the real capability needed.",
      href: "/team",
    },
    {
      title: "Review the live week",
      detail: "Move into the schedule once the templates are ready to trust.",
      href: "/schedule",
    },
  ],
};

export const settingsOverview: RouteOverviewContent = {
  eyebrow: "Settings",
  title: "Rules, roles, and guardrails.",
  description:
    "Keep the operating rules clear before schedules and swaps start moving.",
  icon: "gearshape-fill",
  primaryAction: {
    href: "/onboarding",
    label: "Open setup",
  },
  secondaryAction: {
    href: "/analytics",
    label: "Open insights",
  },
  metrics: [
    {
      label: "Rule sets",
      value: "18",
      detail: "Hard constraints and weighted fairness rules are both visible here.",
    },
    {
      label: "Role profiles",
      value: "05",
      detail: "Owners, admins, schedulers, staff, and observers each stay within clear boundaries.",
    },
    {
      label: "Integration slots",
      value: "03",
      detail: "Payroll, HRIS, and time systems can connect without owning the product model.",
    },
  ],
  sections: [
    {
      eyebrow: "Rules",
      title: "Keep legal and fairness logic visible.",
      description:
        "The app should explain the rules it follows, not bury them in a black box.",
      items: [
        "Separate hard limits from soft weights.",
        "Keep recovery, hours, and fairness constraints obvious.",
        "Make temporary overrides explicit and auditable.",
      ],
    },
    {
      eyebrow: "Roles",
      title: "Permissions stay intentional.",
      description:
        "People should only see and change what their role actually owns.",
      items: [
        "Keep role boundaries stable across UI and data access.",
        "Reserve sensitive actions for owners and admins.",
        "Let schedulers move fast without opening the whole system.",
      ],
    },
    {
      eyebrow: "Integrations",
      title: "Plug in without bending the model.",
      description:
        "External systems should support the workflow, not dictate the product shape.",
      items: [
        "Keep payroll and HR data downstream where possible.",
        "Use clean boundaries for messaging and sync events.",
        "Leave room for real integrations without cluttering the UI now.",
      ],
    },
    {
      eyebrow: "Audit",
      title: "Decisions stay traceable.",
      description:
        "When someone asks why the week changed, the answer should be easy to find.",
      items: [
        "Record schedule overrides and role changes.",
        "Keep approval history readable after publication.",
        "Preserve trust when the week gets edited under pressure.",
      ],
    },
  ],
  tasksTitle: "Today",
  tasksHeading: "Lock the rules down.",
  tasks: [
    {
      title: "Review recovery windows",
      detail: "Make sure the current rule set still protects the week you are building.",
      href: "/schedule",
    },
    {
      title: "Check role boundaries",
      detail: "Owners and admins should be clear before more teammates join.",
      href: "/team",
    },
    {
      title: "Keep the model simple",
      detail: "Only add the rules and integrations the product actually needs today.",
    },
  ],
};

export const onboardingOverview: RouteOverviewContent = {
  eyebrow: "Setup",
  title: "Set up the first fair week.",
  description:
    "Keep the startup path calm: create the workspace, bring in the team, set the rules, then open the first schedule.",
  icon: "sparkles",
  primaryAction: {
    href: "/team",
    label: "Add team",
  },
  secondaryAction: {
    href: "/schedule",
    label: "Open schedule",
  },
  metrics: [
    {
      label: "Setup steps",
      value: String(startupRoutine.length).padStart(2, "0"),
      detail: "A short sequence is easier to finish than a sprawling admin setup.",
    },
    {
      label: "Role models",
      value: String(roleCards.length).padStart(2, "0"),
      detail: "Role boundaries are already defined before the org starts growing.",
    },
    {
      label: "Guardrails",
      value: String(startupGuardrails.length).padStart(2, "0"),
      detail: "The product starts with a few non-negotiables instead of dozens of knobs.",
    },
  ],
  sections: [
    {
      eyebrow: "Success",
      title: "Know what done looks like.",
      description:
        "The startup path should get a real team to a real published week without outside rescue.",
      items: startupSuccessCriteria,
    },
    {
      eyebrow: "Roles",
      title: "Start with clear ownership.",
      description:
        "The first few people in the system set the tone for every workflow that follows.",
      items: roleCards.map((role) => `${role.title}: ${role.note}`),
    },
    {
      eyebrow: "Guardrails",
      title: "Protect the week from day one.",
      description:
        "The product should be clear about the rules it refuses to bend quietly.",
      items: startupGuardrails,
    },
    {
      eyebrow: "Flow",
      title: "Keep the sequence short.",
      description:
        "Stand up only what the first schedule needs. Everything else can come later.",
      items: startupRoutine.slice(0, 4).map((step) => step.title),
    },
  ],
  tasksTitle: "Start here",
  tasksHeading: "Move through setup once.",
  tasks: startupRoutine.map((step) => ({
    title: step.title,
    detail: step.description,
    href: step.href,
  })),
};
