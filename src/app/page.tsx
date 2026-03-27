import Link from "next/link";
import {
  ArrowRight,
  CalendarRange,
  CircleAlert,
  Clock3,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import {
  buildSequence,
  startupChecklist,
  startupRoutine,
} from "@/lib/startup-routine";

const scorecards = [
  {
    label: "Fairness score",
    value: "96.2",
    detail: "Targeting balanced nights, weekends, and overtime load.",
    icon: TrendingUp,
    accent: "bg-primary/12 text-sky-700",
  },
  {
    label: "Coverage confidence",
    value: "99.4%",
    detail: "All critical shifts staffed across the current planning horizon.",
    icon: ShieldCheck,
    accent: "bg-success/16 text-emerald-700",
  },
  {
    label: "Open swap requests",
    value: "07",
    detail: "Requests ranked by viable replacements and fairness impact.",
    icon: UsersRound,
    accent: "bg-secondary/14 text-fuchsia-700",
  },
  {
    label: "Time saved / roster",
    value: "11.8h",
    detail: "Estimated reduction versus manual spreadsheet scheduling.",
    icon: Clock3,
    accent: "bg-warning/20 text-amber-700",
  },
];

const schedulePreview = [
  {
    day: "Mon",
    entries: [
      { time: "06:00", team: "Inbound", person: "Mia Cruz", tone: "bg-primary/12 text-sky-700" },
      { time: "14:00", team: "Support", person: "Kai Morgan", tone: "bg-secondary/14 text-fuchsia-700" },
    ],
  },
  {
    day: "Tue",
    entries: [
      { time: "08:00", team: "Packing", person: "Lena Park", tone: "bg-success/15 text-emerald-700" },
      { time: "18:00", team: "Dispatch", person: "Owen Diaz", tone: "bg-accent/16 text-orange-700" },
    ],
  },
  {
    day: "Wed",
    entries: [
      { time: "07:00", team: "Ops", person: "Rae Taylor", tone: "bg-primary/12 text-sky-700" },
      { time: "15:30", team: "Service", person: "Zara Ali", tone: "bg-warning/20 text-amber-700" },
    ],
  },
  {
    day: "Thu",
    entries: [
      { time: "09:00", team: "Clinical", person: "Ivy Chen", tone: "bg-success/15 text-emerald-700" },
      { time: "20:00", team: "Night desk", person: "Noah Kent", tone: "bg-secondary/14 text-fuchsia-700" },
    ],
  },
  {
    day: "Fri",
    entries: [
      { time: "06:30", team: "Inbound", person: "June Hall", tone: "bg-primary/12 text-sky-700" },
      { time: "16:00", team: "Flex pool", person: "Ava Brooks", tone: "bg-accent/16 text-orange-700" },
    ],
  },
];

const fairnessLedger = [
  { name: "Mia Cruz", shifts: "2 nights", trend: "-1 vs team median", tone: "text-emerald-700" },
  { name: "Kai Morgan", shifts: "3 weekends", trend: "on target", tone: "text-sky-700" },
  { name: "Lena Park", shifts: "1 holiday", trend: "+1 credit banked", tone: "text-fuchsia-700" },
  { name: "Owen Diaz", shifts: "4 overtime hrs", trend: "monitor next cycle", tone: "text-orange-700" },
];

const modules = [
  {
    title: "Schedule workspace",
    description: "Calendar-first review flow with assignment explainability and fairness context.",
    href: "/schedule",
  },
  {
    title: "Team operations",
    description: "Profiles, skills, availability, and preference capture for every staff member.",
    href: "/team",
  },
  {
    title: "Rules + analytics",
    description: "Templates, compliance signals, and fairness reporting for administrators.",
    href: "/analytics",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <section className="glass-panel-strong grid gap-6 overflow-hidden p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
        <div className="relative z-10 flex flex-col gap-5">
          <span className="metric-chip w-fit">Equal dashboard</span>
          <div className="space-y-4">
            <h2 className="max-w-3xl font-heading text-4xl leading-tight text-balance text-slate-950 md:text-5xl">
              Fairness-first scheduling, with the startup routine ready.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              The workspace now carries the documented first-run flow directly in
              the app: setup, role handoff, rule definition, preference intake,
              and first roster generation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/onboarding"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Open startup routine
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/78 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white"
            >
              Open schedule workspace
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(145deg,rgba(66,165,245,0.22),rgba(255,255,255,0.8),rgba(156,39,176,0.14))] p-6 shadow-glow">
          <div className="absolute -right-12 -top-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute bottom-0 left-8 h-32 w-32 rounded-full bg-secondary/18 blur-3xl" />
          <div className="relative space-y-5">
            <div className="flex items-center gap-3">
              <span className="metric-chip">Build sequence</span>
              <span className="rounded-full bg-white/60 px-3 py-2 text-xs font-medium text-slate-700">
                UI skeleton phase
              </span>
            </div>
            <div className="space-y-3">
              {buildSequence.slice(0, 4).map((step, index) => (
                <div
                  key={step.title}
                  className="flex items-start gap-3 rounded-2xl border border-white/60 bg-white/58 p-4 backdrop-blur-xl"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {scorecards.map(({ label, value, detail, icon: Icon, accent }) => (
          <article key={label} className="glass-panel p-5">
            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-5 text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-2 font-heading text-3xl text-slate-950">{value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <article className="glass-panel p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="metric-chip">Roster preview</span>
              <h3 className="mt-3 font-heading text-3xl text-slate-950">
                Weekly assignment board
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                The schedule surface is set up for drag-and-drop review, fairness
                context, and eventual optimization results.
              </p>
            </div>
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
            >
              Open module
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-5">
            {schedulePreview.map((day) => (
              <div
                key={day.day}
                className="rounded-[24px] border border-white/55 bg-white/72 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <p className="font-heading text-xl text-slate-950">{day.day}</p>
                  <CalendarRange className="h-4 w-4 text-slate-400" />
                </div>
                <div className="mt-4 space-y-3">
                  {day.entries.map((entry) => (
                    <div
                      key={`${day.day}-${entry.time}-${entry.person}`}
                      className={`rounded-2xl px-3 py-3 ${entry.tone}`}
                    >
                      <div className="flex items-center justify-between gap-3 text-sm font-semibold">
                        <span>{entry.time}</span>
                        <span>{entry.team}</span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-slate-900/80">
                        {entry.person}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <div className="grid gap-6">
          <article className="glass-panel p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="metric-chip">Fairness ledger</span>
                <h3 className="mt-3 font-heading text-3xl text-slate-950">
                  Human impact at a glance
                </h3>
              </div>
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-6 space-y-4">
              {fairnessLedger.map((entry) => (
                <div
                  key={entry.name}
                  className="rounded-[24px] border border-white/55 bg-white/72 px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-slate-900">{entry.name}</p>
                    <span className={`text-xs font-semibold uppercase tracking-[0.16em] ${entry.tone}`}>
                      {entry.trend}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{entry.shifts}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-panel p-6">
            <div className="flex items-center gap-3">
              <CircleAlert className="h-5 w-5 text-accent" />
              <div>
                <span className="metric-chip">Startup readiness</span>
                <h3 className="mt-3 font-heading text-2xl text-slate-950">
                  What is ready now
                </h3>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {startupChecklist.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/55 bg-white/72 px-4 py-3"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-success" />
                  <p className="text-sm leading-6 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="glass-panel p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="metric-chip">First-run flow</span>
            <h3 className="mt-3 font-heading text-3xl text-slate-950">
              Documented startup sequence
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              These are the first six actions the app is designed to support for a
              new organization.
            </p>
          </div>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
          >
            Review full routine
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
          {startupRoutine.map((step, index) => (
            <Link
              key={step.id}
              href={step.href}
              className="rounded-[24px] border border-white/55 bg-white/72 p-4 transition hover:bg-white"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                  0{index + 1}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {step.owner}
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                {step.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {step.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {modules.map((module) => (
          <Link
            key={module.title}
            href={module.href}
            className="glass-panel group p-6 transition duration-200 hover:-translate-y-1 hover:bg-white/76"
          >
            <p className="metric-chip">Module</p>
            <h3 className="mt-4 font-heading text-2xl text-slate-950">{module.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{module.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition group-hover:text-slate-950">
              Explore surface
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
