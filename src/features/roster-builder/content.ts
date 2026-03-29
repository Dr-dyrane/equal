import type { FairnessComparisonMode, FairnessWindow } from "@/features/fairness/provider/fairness-provider";
import type { RosterStage } from "@/features/roster-builder/provider/roster-builder-provider";

export type ScheduleMetric = {
  label: string;
  value: string;
  detail: string;
  tone: "primary" | "secondary" | "warning" | "success";
};

export type ScheduleShiftSurface = {
  light: {
    from: string;
    to: string;
    ink: string;
    meta: string;
  };
  dark: {
    from: string;
    to: string;
    ink: string;
    meta: string;
  };
};

export type ScheduleShift = {
  id: string;
  time: string;
  role: string;
  person: string;
  emphasis: string;
  surface: ScheduleShiftSurface;
};

export type ScheduleDay = {
  day: string;
  date: string;
  summary: string;
  shifts: ScheduleShift[];
};

export type ScheduleNote = {
  name: string;
  note: string;
  tone: "primary" | "secondary" | "success";
};

export const scheduleActions = [
  {
    id: "review",
    label: "Review",
    detail: "Open the calls that still need judgment.",
  },
  {
    id: "generate",
    label: "Refresh",
    detail: "Run the week again.",
  },
  {
    id: "publish",
    label: "Publish",
    detail: "Send the roster.",
  },
] as const;

const baseDays: ScheduleDay[] = [
  {
    day: "Monday",
    date: "Mar 31",
    summary: "Night rotation",
    shifts: [
      {
        id: "mon-1",
        time: "06:00 - 14:00",
        role: "Inbound lead",
        person: "Mia Cruz",
        emphasis: "Skill match stays covered",
        surface: {
          light: {
            from: "#d6e9ff",
            to: "#c4ddff",
            ink: "#19324f",
            meta: "rgba(25, 50, 79, 0.72)",
          },
          dark: {
            from: "#153857",
            to: "#18324e",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
      {
        id: "mon-2",
        time: "14:00 - 22:00",
        role: "Support pod",
        person: "Kai Morgan",
        emphasis: "Weekend balance preserved",
        surface: {
          light: {
            from: "#ead9ff",
            to: "#ddcdfa",
            ink: "#2d2350",
            meta: "rgba(45, 35, 80, 0.72)",
          },
          dark: {
            from: "#332451",
            to: "#2b2147",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
      {
        id: "mon-3",
        time: "22:00 - 06:00",
        role: "Night ops",
        person: "Noah Kent",
        emphasis: "Fatigue risk contained",
        surface: {
          light: {
            from: "#d4d8ff",
            to: "#c8ceff",
            ink: "#232b55",
            meta: "rgba(35, 43, 85, 0.72)",
          },
          dark: {
            from: "#24254d",
            to: "#202344",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
    ],
  },
  {
    day: "Tuesday",
    date: "Apr 1",
    summary: "Needs judgment",
    shifts: [
      {
        id: "tue-1",
        time: "07:00 - 15:00",
        role: "Packing",
        person: "Lena Park",
        emphasis: "Coverage is ready",
        surface: {
          light: {
            from: "#d0f1ff",
            to: "#c1e8ff",
            ink: "#18384f",
            meta: "rgba(24, 56, 79, 0.72)",
          },
          dark: {
            from: "#174059",
            to: "#15374c",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
      {
        id: "tue-2",
        time: "12:00 - 20:00",
        role: "Dispatch",
        person: "Owen Diaz",
        emphasis: "Paired for experience",
        surface: {
          light: {
            from: "#fce0ef",
            to: "#f4d2e8",
            ink: "#42284b",
            meta: "rgba(66, 40, 75, 0.72)",
          },
          dark: {
            from: "#573161",
            to: "#4b2b55",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
      {
        id: "tue-3",
        time: "18:00 - 02:00",
        role: "Escalations",
        person: "Mia Cruz",
        emphasis: "Back-to-back risk",
        surface: {
          light: {
            from: "#ffe8cf",
            to: "#ffdfbe",
            ink: "#4d3520",
            meta: "rgba(77, 53, 32, 0.72)",
          },
          dark: {
            from: "#5a4122",
            to: "#4a341d",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
    ],
  },
  {
    day: "Wednesday",
    date: "Apr 2",
    summary: "Recovery protected",
    shifts: [
      {
        id: "wed-1",
        time: "08:00 - 16:00",
        role: "Clinical",
        person: "Ivy Chen",
        emphasis: "Skill mix covered",
        surface: {
          light: {
            from: "#d8f6ea",
            to: "#ccf0e0",
            ink: "#1f4a3c",
            meta: "rgba(31, 74, 60, 0.72)",
          },
          dark: {
            from: "#1d4b41",
            to: "#1b4037",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
      {
        id: "wed-2",
        time: "10:00 - 18:00",
        role: "Float pool",
        person: "June Hall",
        emphasis: "Balanced seniority",
        surface: {
          light: {
            from: "#e6ecff",
            to: "#dae3ff",
            ink: "#23385a",
            meta: "rgba(35, 56, 90, 0.72)",
          },
          dark: {
            from: "#223456",
            to: "#1f2d4b",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
      {
        id: "wed-3",
        time: "20:00 - 04:00",
        role: "Night desk",
        person: "Zara Ali",
        emphasis: "Recovery gap closed",
        surface: {
          light: {
            from: "#cff3ff",
            to: "#c4f7f0",
            ink: "#1f4252",
            meta: "rgba(31, 66, 82, 0.72)",
          },
          dark: {
            from: "#15485d",
            to: "#163f47",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
    ],
  },
  {
    day: "Thursday",
    date: "Apr 3",
    summary: "Ready to publish",
    shifts: [
      {
        id: "thu-1",
        time: "06:30 - 14:30",
        role: "Inbound",
        person: "Mia Cruz",
        emphasis: "Coverage remains steady",
        surface: {
          light: {
            from: "#d8eaff",
            to: "#cfe1ff",
            ink: "#1f3552",
            meta: "rgba(31, 53, 82, 0.72)",
          },
          dark: {
            from: "#193b59",
            to: "#17324c",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
      {
        id: "thu-2",
        time: "13:00 - 21:00",
        role: "Service",
        person: "Kai Morgan",
        emphasis: "Fair rotation held",
        surface: {
          light: {
            from: "#eadbff",
            to: "#e2cffb",
            ink: "#312652",
            meta: "rgba(49, 38, 82, 0.72)",
          },
          dark: {
            from: "#3b2758",
            to: "#32234a",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
      {
        id: "thu-3",
        time: "21:30 - 05:30",
        role: "Night ops",
        person: "Ava Brooks",
        emphasis: "Rest window protected",
        surface: {
          light: {
            from: "#d7f4eb",
            to: "#cceddf",
            ink: "#21473b",
            meta: "rgba(33, 71, 59, 0.72)",
          },
          dark: {
            from: "#214b40",
            to: "#1d4037",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
    ],
  },
  {
    day: "Friday",
    date: "Apr 4",
    summary: "Final checks",
    shifts: [
      {
        id: "fri-1",
        time: "09:00 - 17:00",
        role: "Warehouse",
        person: "Lena Park",
        emphasis: "Preferences respected",
        surface: {
          light: {
            from: "#d7f5ed",
            to: "#cef0e6",
            ink: "#1f463a",
            meta: "rgba(31, 70, 58, 0.72)",
          },
          dark: {
            from: "#1e4b41",
            to: "#1d4039",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
      {
        id: "fri-2",
        time: "11:00 - 19:00",
        role: "Customer care",
        person: "Rae Taylor",
        emphasis: "Demand surge covered",
        surface: {
          light: {
            from: "#ffead1",
            to: "#ffe0bf",
            ink: "#533a20",
            meta: "rgba(83, 58, 32, 0.72)",
          },
          dark: {
            from: "#614520",
            to: "#533918",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
      {
        id: "fri-3",
        time: "16:00 - 00:00",
        role: "Dispatch",
        person: "Owen Diaz",
        emphasis: "Coverage pair remains stable",
        surface: {
          light: {
            from: "#d6efff",
            to: "#c9e5ff",
            ink: "#1f3654",
            meta: "rgba(31, 54, 84, 0.72)",
          },
          dark: {
            from: "#1a405f",
            to: "#18364f",
            ink: "#f6fbff",
            meta: "rgba(246, 251, 255, 0.82)",
          },
        },
      },
    ],
  },
];

export function getScheduleMetrics(stage: RosterStage): ScheduleMetric[] {
  const publishValue = stage === "published" ? "Published" : "1 unresolved";

  return [
    {
      label: "Hard rules",
      value: "100%",
      detail: "Still locked.",
      tone: "success",
    },
    {
      label: "Fairness",
      value: stage === "draft" ? "90.4" : stage === "reviewing" ? "93.8" : "95.1",
      detail: "Tuesday night still leans hard.",
      tone: "primary",
    },
    {
      label: "Readiness",
      value: publishValue,
      detail: "One call left.",
      tone: "warning",
    },
  ];
}

export function getScheduleDays(selectedDay: string): ScheduleDay[] {
  return baseDays.map((day) =>
    day.day === selectedDay
      ? day
      : {
          ...day,
        },
  );
}

export function getScheduleSummary(stage: RosterStage) {
  if (stage === "published") {
    return {
      badge: "Published",
      title: "Week is out.",
      detail: "Done.",
    };
  }

  if (stage === "ready") {
    return {
      badge: "Ready",
      title: "Ready to send.",
      detail: "Check Tuesday night.",
    };
  }

  if (stage === "draft") {
    return {
      badge: "Draft",
      title: "Week is ready.",
      detail: "Start with Tuesday night.",
    };
  }

  return {
    badge: "Reviewing",
    title: "Tuesday needs a call.",
    detail: "Check Mia before publish.",
  };
}

export function getScheduleFocus(
  unresolvedConflictCount: number,
  selectedDay: string,
  comparisonMode: FairnessComparisonMode,
  window: FairnessWindow,
) {
  return [
    {
      label: "Day",
      value: selectedDay,
    },
    {
      label: "View",
      value: comparisonMode === "team" ? "Team view" : comparisonMode === "role" ? "Role view" : "Self view",
    },
    {
      label: "Window",
      value: window === "6-weeks" ? "6 weeks" : window === "quarter" ? "Quarter" : "Year",
    },
    {
      label: "Left",
      value: `${unresolvedConflictCount} left`,
    },
  ] as const;
}

export function getScheduleNotes(explanationPanelOpen: boolean): ScheduleNote[] {
  const notes: ScheduleNote[] = [
    {
      name: "Mia Cruz",
      note: "Tuesday night still leans hard.",
      tone: "secondary",
    },
    {
      name: "Kai Morgan",
      note: "Weekend load stays even.",
      tone: "primary",
    },
    {
      name: "Lena Park",
      note: "Rest stays protected.",
      tone: "success",
    },
  ];

  return explanationPanelOpen ? notes : notes.slice(0, 2);
}

export const scheduleGuardrails = [
  "Rest locks first.",
  "Skills stay covered.",
  "Fairness is cycle-wide.",
] as const;
