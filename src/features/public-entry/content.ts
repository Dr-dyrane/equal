import type {
  AuthContent,
  AuthMode,
  DemoCopy,
  DemoFeatureExperience,
  DemoScenarioKey,
  DemoScenarioState,
  DayPreview,
  LandingCopy,
} from "@/features/public-entry/types";

export const landingCopy: LandingCopy = {
  eyebrow: "Work, balanced.",
  headline: ["Fair", "schedules."],
  secondaryHeadline: "Automatically.",
  previewEyebrow: "This week",
  previewHeading: "Calm on the surface. Fair underneath.",
  fairness: {
    label: "Fairness",
    value: "92%",
    qualifier: "Fair",
    state: "Balanced",
  },
};

export const fairnessSignals = [
  "Fair rotation",
  "Rest protected",
  "Coverage ready",
] as const;

export const demoFocusShiftId = "tue-late";

export const demoCopy: DemoCopy = {
  eyebrow: "Demo",
  headline: ["Move one", "shift."],
  panelEyebrow: "This week",
  panelHeading: "See the week settle.",
  conversionTitle: "Use your own team.",
  conversionAction: "Start",
};

export const demoFeatureExperiences: DemoFeatureExperience[] = [
  {
    id: "schedule",
    label: "Shifts",
    action: "Add shift",
    surfaceLabel: "Week builder",
    surfaceTitle: "Drop a new shift into the week.",
    surfaceItems: [
      "Time block",
      "Coverage target",
      "Skill needed",
      "Fairness impact",
    ],
    liveState: "Coverage, fatigue, and fairness respond instantly.",
    sheetTitle: "Add shift",
    sheetFields: [
      "Tue 19:00-07:00",
      "RN required",
      "Recovery protected",
    ],
  },
  {
    id: "team",
    label: "Team",
    action: "Add teammate",
    surfaceLabel: "Team",
    surfaceTitle: "Bring a new person into the roster.",
    surfaceItems: [
      "Availability",
      "Skills",
      "Preferences",
      "Locations",
    ],
    liveState: "Coverage options expand as soon as the profile lands.",
    sheetTitle: "Add teammate",
    sheetFields: [
      "Kai Morgan",
      "Night capable",
      "Prefers Tue-Thu",
    ],
  },
  {
    id: "swaps",
    label: "Swaps",
    action: "Review swap",
    surfaceLabel: "Requests",
    surfaceTitle: "Approve swaps with context, not guesswork.",
    surfaceItems: [
      "Request",
      "Replacement",
      "Fairness impact",
      "Coverage held",
    ],
    liveState: "Eligible replacements rerank live as the week changes.",
    sheetTitle: "Swap request",
    sheetFields: [
      "Mia -> Kai",
      "Coverage held",
      "Fairness improves",
    ],
  },
  {
    id: "analytics",
    label: "Fairness",
    action: "Open insight",
    surfaceLabel: "Analytics",
    surfaceTitle: "See the week explain itself.",
    surfaceItems: [
      "Fairness trend",
      "Coverage heatmap",
      "Overtime watch",
      "Compliance",
    ],
    liveState: "Every shift change stays visible over time.",
    sheetTitle: "Tuesday nights",
    sheetFields: [
      "92% fair",
      "2 hard shifts",
      "Balanced seniority",
    ],
  },
  {
    id: "setup",
    label: "Rules",
    action: "Set rules",
    surfaceLabel: "Setup",
    surfaceTitle: "Set guardrails without opening the whole system.",
    surfaceItems: [
      "Rest window",
      "Max nights",
      "Teams",
      "Sites",
    ],
    liveState: "Rules appear only when the workflow needs them.",
    sheetTitle: "Work rules",
    sheetFields: [
      "11h rest",
      "2 nights max",
      "West campus",
    ],
  },
];

export const demoScenarios: Record<DemoScenarioKey, DemoScenarioState> = {
  baseline: {
    fairness: {
      label: "Fairness",
      value: "84%",
      qualifier: "Fair",
      state: "Tight",
    },
    hint: "Tap Tuesday 19:00.",
    signals: ["Back-to-back risk", "Coverage held", "Recovery thin"],
    insightTitle: "Back-to-back risk.",
    insightBody:
      "Rotate Tuesday night to Kai. Mia gets recovery back and coverage stays intact.",
    actionLabel: "Rotate to Kai",
    actionDetail: "Fairness rises to 92%.",
    days: [
      {
        day: "Mon",
        shifts: [
          {
            id: "mon-early",
            time: "07:00",
            person: "Lena Park",
            label: "Rest protected",
            tone: "bg-fuchsia-400/18 dark:bg-fuchsia-400/18",
            note: "Recovery is protected.",
          },
          {
            id: "mon-late",
            time: "19:00",
            person: "Mia Cruz",
            label: "Night rotation",
            tone: "bg-indigo-500/18 dark:bg-indigo-500/18",
            note: "This compounds Tuesday night.",
          },
        ],
      },
      {
        day: "Tue",
        shifts: [
          {
            id: "tue-early",
            time: "07:00",
            person: "Owen Diaz",
            label: "Coverage ready",
            tone: "bg-sky-400/18 dark:bg-sky-400/18",
            note: "Coverage is stable.",
          },
          {
            id: "tue-late",
            time: "19:00",
            person: "Mia Cruz",
            label: "Back-to-back risk",
            tone: "bg-amber-300/24 dark:bg-amber-300/18",
            note: "This is the pressure point.",
          },
        ],
      },
      {
        day: "Wed",
        shifts: [
          {
            id: "wed-early",
            time: "07:00",
            person: "June Hall",
            label: "Thin seniority",
            tone: "bg-slate-400/18 dark:bg-slate-300/12",
            note: "Coverage holds, but the mix is thin.",
          },
          {
            id: "wed-late",
            time: "19:00",
            person: "Kai Morgan",
            label: "Recovery gap",
            tone: "bg-cyan-300/20 dark:bg-cyan-300/18",
            note: "Kai can absorb Tuesday night cleanly.",
          },
        ],
      },
    ],
  },
  balanced: {
    fairness: {
      label: "Fairness",
      value: "92%",
      qualifier: "Fair",
      state: "Balanced",
    },
    hint: "Tap any shift. Reset to replay.",
    signals: fairnessSignals,
    insightTitle: "Week rebalanced.",
    insightBody:
      "Kai takes Tuesday night. Mia regains recovery and the week stays covered.",
    actionDetail: "The tradeoff stays visible.",
    days: [
      {
        day: "Mon",
        shifts: [
          {
            id: "mon-early",
            time: "07:00",
            person: "Lena Park",
            label: "Rest protected",
            tone: "bg-fuchsia-400/18 dark:bg-fuchsia-400/18",
            note: "Recovery is protected.",
          },
          {
            id: "mon-late",
            time: "19:00",
            person: "Mia Cruz",
            label: "Night rotation",
            tone: "bg-indigo-500/18 dark:bg-indigo-500/18",
            note: "Heavy, but no longer compounded.",
          },
        ],
      },
      {
        day: "Tue",
        shifts: [
          {
            id: "tue-early",
            time: "07:00",
            person: "Owen Diaz",
            label: "Coverage ready",
            tone: "bg-sky-400/18 dark:bg-sky-400/18",
            note: "Coverage remains stable.",
          },
          {
            id: "tue-late",
            time: "19:00",
            person: "Kai Morgan",
            label: "Fair rotation",
            tone: "bg-violet-500/18 dark:bg-violet-500/18",
            note: "The late slot rotates cleanly.",
          },
        ],
      },
      {
        day: "Wed",
        shifts: [
          {
            id: "wed-early",
            time: "07:00",
            person: "June Hall",
            label: "Balanced seniority",
            tone: "bg-blue-400/18 dark:bg-blue-400/18",
            note: "The experience mix is healthier.",
          },
          {
            id: "wed-late",
            time: "19:00",
            person: "Mia Cruz",
            label: "Recovery protected",
            tone: "bg-cyan-300/20 dark:bg-cyan-300/18",
            note: "Recovery is visible and protected.",
          },
        ],
      },
    ],
  },
} as const;

export const rosterPreview: DayPreview[] = [
  {
    day: "Mon",
    shifts: [
      {
        time: "07:00",
        person: "Lena Park",
        label: "Rest protected",
        tone: "bg-fuchsia-400/16 text-fuchsia-50 dark:bg-fuchsia-400/18",
      },
      {
        time: "19:00",
        person: "Mia Cruz",
        label: "Night rotation",
        tone: "bg-indigo-500/16 text-indigo-50 dark:bg-indigo-500/18",
      },
    ],
  },
  {
    day: "Tue",
    shifts: [
      {
        time: "07:00",
        person: "Owen Diaz",
        label: "Coverage ready",
        tone: "bg-sky-400/16 text-sky-50 dark:bg-sky-400/18",
      },
      {
        time: "19:00",
        person: "Kai Morgan",
        label: "Fair rotation",
        tone: "bg-violet-500/16 text-violet-50 dark:bg-violet-500/18",
      },
    ],
  },
  {
    day: "Wed",
    shifts: [
      {
        time: "07:00",
        person: "June Hall",
        label: "Balanced seniority",
        tone: "bg-blue-400/16 text-blue-50 dark:bg-blue-400/18",
      },
      {
        time: "19:00",
        person: "Mia Cruz",
        label: "Recovery gap",
        tone: "bg-cyan-300/20 text-cyan-50 dark:bg-cyan-300/18",
      },
    ],
  },
];

const authContentByMode: Record<AuthMode, AuthContent> = {
  signin: {
    modeLabel: "Sign in",
    title: "Sign in.",
    description: "Use your work email to open the week and pick up where you left it.",
    cta: "Continue with email",
    emailPlaceholder: "alex@equal.app",
    nextTitle: "What opens next",
    nextSteps: ["Resume changes", "Review fairness", "Publish updates"],
    destination: "/workspace",
  },
  start: {
    modeLabel: "Start",
    title: "Start scheduling.",
    description: "Use your work email to create the workspace and shape the first fair week.",
    cta: "Continue with email",
    emailPlaceholder: "alex@equal.app",
    namePlaceholder: "Alex Morgan",
    showNameField: true,
    nextTitle: "What opens first",
    nextSteps: ["Add your team", "Set your rules", "Build the first week"],
    destination: "/onboarding",
  },
};

export function getAuthContent(mode: AuthMode) {
  return authContentByMode[mode];
}
