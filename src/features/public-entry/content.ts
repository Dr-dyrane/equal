import type {
  AuthContent,
  AuthMode,
  DemoCopy,
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
  eyebrow: "Instant start",
  headline: ["Move one shift.", "See the week settle."],
  description:
    "Touch the roster before you read about it. One adjustment shows how Equal protects fairness, coverage, and recovery together.",
  panelEyebrow: "Live demo",
  panelHeading: "Shift one decision. Watch the week rebalance.",
  helperLabel: "Try this first",
  conversionTitle: "Ready to run your own team?",
  conversionDescription:
    "Start with your roster, your rules, and your sites once the interaction makes sense.",
  conversionAction: "Start with your team",
};

export const demoScenarios: Record<DemoScenarioKey, DemoScenarioState> = {
  baseline: {
    fairness: {
      label: "Fairness",
      value: "84%",
      qualifier: "Fair",
      state: "Needs attention",
    },
    hint: "Select Tuesday night, then rotate it away from Mia.",
    signals: ["Fatigue building", "Back-to-back risk", "Coverage held"],
    insightTitle: "Tuesday night is leaning too hard on Mia.",
    insightBody:
      "Coverage is technically intact, but the same person is carrying another heavy late slot. That squeezes the recovery window and drags the rotation out of balance.",
    actionLabel: "Rotate Kai into Tuesday night",
    actionDetail:
      "One move lifts fairness, keeps coverage intact, and reopens the rest buffer for the rest of the week.",
    days: [
      {
        day: "Mon",
        shifts: [
          {
            id: "mon-early",
            time: "07:00",
            person: "Lena Park",
            label: "Rest protected",
            tone: "bg-emerald-400/18 dark:bg-emerald-400/16",
            note: "Stable opener with healthy recovery behind it.",
          },
          {
            id: "mon-late",
            time: "19:00",
            person: "Mia Cruz",
            label: "Night rotation",
            tone: "bg-sky-400/18 dark:bg-sky-400/16",
            note: "Valid on its own, but it raises the cost of another late slot.",
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
            tone: "bg-emerald-400/18 dark:bg-emerald-400/16",
            note: "Coverage is solid here. The issue is the late rotation below it.",
          },
          {
            id: "tue-late",
            time: "19:00",
            person: "Mia Cruz",
            label: "Back-to-back risk",
            tone: "bg-amber-300/24 dark:bg-amber-300/18",
            note: "This is the pressure point. Move it and the whole week settles down.",
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
            note: "Coverage remains legal, but the mix is less resilient than it should be.",
          },
          {
            id: "wed-late",
            time: "19:00",
            person: "Kai Morgan",
            label: "Recovery gap",
            tone: "bg-sky-400/18 dark:bg-sky-400/16",
            note: "Kai can absorb the Tuesday late slot and reopen a cleaner rotation.",
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
    hint: "Tap any shift to inspect it, or reset to replay the change.",
    signals: fairnessSignals,
    insightTitle: "The week settles once the late load rotates.",
    insightBody:
      "Kai absorbs Tuesday night, Mia gets a healthier recovery window, and the schedule keeps coverage without asking the team to absorb hidden fatigue.",
    actionDetail:
      "Equal keeps the explanation visible: fairness rises because the late burden rotates, not because the rules became softer.",
    days: [
      {
        day: "Mon",
        shifts: [
          {
            id: "mon-early",
            time: "07:00",
            person: "Lena Park",
            label: "Rest protected",
            tone: "bg-emerald-400/18 dark:bg-emerald-400/16",
            note: "Stable opener with healthy recovery behind it.",
          },
          {
            id: "mon-late",
            time: "19:00",
            person: "Mia Cruz",
            label: "Night rotation",
            tone: "bg-sky-400/18 dark:bg-sky-400/16",
            note: "Still a heavy assignment, but no longer compounded by another late handoff.",
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
            tone: "bg-emerald-400/18 dark:bg-emerald-400/16",
            note: "Coverage remains stable while the late burden rotates fairly.",
          },
          {
            id: "tue-late",
            time: "19:00",
            person: "Kai Morgan",
            label: "Fair rotation",
            tone: "bg-sky-400/18 dark:bg-sky-400/16",
            note: "The late slot rotates to Kai, lifting fairness without sacrificing coverage.",
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
            tone: "bg-sky-400/18 dark:bg-sky-400/16",
            note: "The experience mix is healthier once the late rotation evens out.",
          },
          {
            id: "wed-late",
            time: "19:00",
            person: "Mia Cruz",
            label: "Recovery protected",
            tone: "bg-emerald-400/18 dark:bg-emerald-400/16",
            note: "Recovery stays legible because the week is no longer stacking late pressure on one person.",
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
        tone: "bg-emerald-400/14 text-emerald-50 dark:bg-emerald-400/16",
      },
      {
        time: "19:00",
        person: "Mia Cruz",
        label: "Night rotation",
        tone: "bg-sky-400/14 text-sky-50 dark:bg-sky-400/16",
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
        tone: "bg-emerald-400/14 text-emerald-50 dark:bg-emerald-400/16",
      },
      {
        time: "19:00",
        person: "Kai Morgan",
        label: "Fair rotation",
        tone: "bg-sky-400/14 text-sky-50 dark:bg-sky-400/16",
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
        tone: "bg-sky-400/14 text-sky-50 dark:bg-sky-400/16",
      },
      {
        time: "19:00",
        person: "Mia Cruz",
        label: "Recovery gap",
        tone: "bg-emerald-400/14 text-emerald-50 dark:bg-emerald-400/16",
      },
    ],
  },
];

const authContentByMode: Record<AuthMode, AuthContent> = {
  signin: {
    title: "Sign in.",
    description: "Pick up where you left the roster.",
    cta: "Continue",
    alternateLabel: "Need a new workspace?",
    alternateHref: "/auth",
    alternateAction: "Get started",
    destination: "/workspace",
  },
  start: {
    title: "Start scheduling.",
    description: "Set up your team and publish the first balanced roster.",
    cta: "Enter Equal",
    alternateLabel: "Already have access?",
    alternateHref: "/auth?mode=signin",
    alternateAction: "Sign in",
    destination: "/onboarding",
  },
};

export function getAuthContent(mode: AuthMode) {
  return authContentByMode[mode];
}
