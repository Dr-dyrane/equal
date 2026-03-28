export type ShiftPreview = {
  time: string;
  person: string;
  label: string;
  tone: string;
};

export type DayPreview = {
  day: string;
  shifts: ShiftPreview[];
};

export type LandingFairnessPreview = {
  label: string;
  value: string;
  qualifier: string;
  state: string;
};

export type LandingCopy = {
  eyebrow: string;
  headline: string[];
  secondaryHeadline: string;
  previewEyebrow: string;
  previewHeading: string;
  fairness: LandingFairnessPreview;
};

export type DemoShift = {
  id: string;
  time: string;
  person: string;
  label: string;
  tone: string;
  note: string;
};

export type DemoDay = {
  day: string;
  shifts: DemoShift[];
};

export type DemoScenarioState = {
  fairness: LandingFairnessPreview;
  hint: string;
  signals: readonly string[];
  days: DemoDay[];
  insightTitle: string;
  insightBody: string;
  actionLabel?: string;
  actionDetail: string;
};

export type DemoCopy = {
  eyebrow: string;
  headline: string[];
  panelEyebrow: string;
  panelHeading: string;
  conversionTitle: string;
  conversionDescription?: string;
  conversionAction: string;
};

export type DemoScenarioKey = "baseline" | "balanced";

export type AuthMode = "start" | "signin";

export type AuthContent = {
  title: string;
  description: string;
  cta: string;
  alternateLabel: string;
  alternateHref: string;
  alternateAction: string;
  destination: string;
};
