export type BaselineRule = {
  name: string;
  key: string;
  type: "hard" | "soft" | "informational";
  weight: number;
  scope: "organization" | "team" | "site";
  scopeSlug?: string;
  detail: string;
  expression: Record<string, unknown>;
};

export const BASELINE_RULES: readonly BaselineRule[] = [
  {
    name: "Rest window floor",
    key: "rest-window-floor",
    type: "hard",
    weight: 100,
    scope: "organization",
    detail: "Keep legal recovery time fixed before anything else moves.",
    expression: {
      minimumHours: 11,
      appliesTo: "all",
    },
  },
  {
    name: "Critical skills stay covered",
    key: "critical-skills-covered",
    type: "hard",
    weight: 100,
    scope: "team",
    scopeSlug: "core-scheduling",
    detail: "Do not publish a shift if the required skill bundle is missing.",
    expression: {
      requiresSkills: true,
      publishGate: true,
    },
  },
  {
    name: "Night load rotates",
    key: "night-load-rotates",
    type: "soft",
    weight: 78,
    scope: "team",
    scopeSlug: "core-scheduling",
    detail: "Spread difficult nights before the same names keep carrying them.",
    expression: {
      metric: "night-load",
      target: "balanced",
    },
  },
  {
    name: "Escalations stay paired",
    key: "escalations-stay-paired",
    type: "soft",
    weight: 72,
    scope: "site",
    scopeSlug: "field-coverage",
    detail: "Late coverage should still keep escalation support in the mix.",
    expression: {
      requiresMentorPairing: true,
    },
  },
  {
    name: "Explain every hard override",
    key: "explain-hard-override",
    type: "informational",
    weight: 40,
    scope: "organization",
    detail: "Any hard exception should leave a trail before the week goes out.",
    expression: {
      auditRequired: true,
      appliesTo: "overrides",
    },
  },
] as const;
