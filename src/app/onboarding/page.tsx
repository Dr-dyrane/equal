import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";
import {
  buildSequence,
  roleCards,
  startupGuardrails,
  startupRoutine,
  startupSuccessCriteria,
} from "@/lib/startup-routine";

function toneClass(tone: (typeof startupRoutine)[number]["tone"]) {
  const classes = {
    primary: "bg-primary/12 text-sky-700",
    secondary: "bg-secondary/14 text-fuchsia-700",
    accent: "bg-accent/16 text-orange-700",
    success: "bg-success/16 text-emerald-700",
    warning: "bg-warning/20 text-amber-700",
  };

  return classes[tone];
}

export default function OnboardingPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="glass-panel-strong grid gap-6 overflow-hidden p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
        <div>
          <span className="metric-chip w-fit">Onboarding</span>
          <h2 className="mt-4 font-heading text-4xl text-slate-950 md:text-5xl">
            Stand up a new organization with the documented startup routine.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            The first-run path is now aligned to the source spec: define the
            organization boundary, assign roles, encode rules, collect
            preferences, generate assignments, and publish the first schedule.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/settings"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Open settings
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/78 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white"
            >
              Jump to schedule
            </Link>
          </div>
        </div>

        <div className="rounded-[28px] bg-[linear-gradient(145deg,rgba(156,39,176,0.16),rgba(255,255,255,0.8),rgba(66,165,245,0.18))] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                What success looks like
              </p>
              <p className="text-sm text-slate-600">
                Managers can complete the first scheduling cycle without outside
                intervention.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {startupSuccessCriteria.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/55 bg-white/72 px-4 py-3"
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-secondary" />
                <p className="text-sm leading-6 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <article className="glass-panel p-6">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-primary" />
            <div>
              <span className="metric-chip">Startup sequence</span>
              <h3 className="mt-3 font-heading text-3xl text-slate-950">
                First-run checklist
              </h3>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {startupRoutine.map((step, index) => (
              <Link
                key={step.id}
                href={step.href}
                className="block rounded-[26px] border border-white/55 bg-white/74 p-5 transition hover:bg-white"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {step.title}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {step.owner}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${toneClass(
                      step.tone,
                    )}`}
                  >
                    Step ready
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
                <div className="mt-4 space-y-2">
                  {step.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-950" />
                      <p className="text-sm leading-6 text-slate-700">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </article>

        <div className="grid gap-6">
          <article className="glass-panel p-6">
            <div className="flex items-center gap-3">
              <Workflow className="h-5 w-5 text-accent" />
              <div>
                <span className="metric-chip">Build order</span>
                <h3 className="mt-3 font-heading text-2xl text-slate-950">
                  Implementation sequence
                </h3>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {buildSequence.map((phase, index) => (
                <div
                  key={phase.title}
                  className="rounded-[24px] border border-white/55 bg-white/74 p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                      0{index + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-900">
                      {phase.title}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="glass-panel p-6">
          <div className="flex items-center gap-3">
            <UsersRound className="h-5 w-5 text-secondary" />
            <div>
              <span className="metric-chip">Roles</span>
              <h3 className="mt-3 font-heading text-2xl text-slate-950">
                Access model
              </h3>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {roleCards.map((role) => (
              <div
                key={role.title}
                className="rounded-[24px] border border-white/55 bg-white/74 p-4"
              >
                <div
                  className={`inline-flex rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${role.tone}`}
                >
                  {role.title}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {role.note}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="glass-panel p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-success" />
            <div>
              <span className="metric-chip">Guardrails</span>
              <h3 className="mt-3 font-heading text-2xl text-slate-950">
                Non-negotiables
              </h3>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {startupGuardrails.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/55 bg-white/74 px-4 py-3"
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-success" />
                <p className="text-sm leading-6 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
