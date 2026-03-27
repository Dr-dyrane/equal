import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

type Tone = "primary" | "secondary" | "accent" | "success" | "warning";

type Metric = {
  label: string;
  value: string;
  detail: string;
  tone: Tone;
};

type Panel = {
  title: string;
  description: string;
  items: string[];
  tone: Tone;
};

type Step = {
  title: string;
  description: string;
};

type Action = {
  href: string;
  label: string;
};

function toneClass(tone: Tone) {
  const classes: Record<Tone, string> = {
    primary: "bg-primary/12 text-sky-700",
    secondary: "bg-secondary/14 text-fuchsia-700",
    accent: "bg-accent/16 text-orange-700",
    success: "bg-success/16 text-emerald-700",
    warning: "bg-warning/20 text-amber-700",
  };

  return classes[tone];
}

export function ModuleScaffold({
  eyebrow,
  title,
  description,
  icon: Icon,
  metrics,
  panels,
  steps,
  primaryAction,
  secondaryAction,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  metrics: Metric[];
  panels: Panel[];
  steps: Step[];
  primaryAction: Action;
  secondaryAction?: Action;
}) {
  return (
    <div className="flex flex-col gap-6">
      <section className="glass-panel-strong overflow-hidden p-6 lg:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <span className="metric-chip w-fit">{eyebrow}</span>
            <h2 className="mt-4 font-heading text-4xl text-slate-950 md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              {description}
            </p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-slate-950 text-white shadow-glow">
            <Icon className="h-8 w-8" />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={primaryAction.href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {primaryAction.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          {secondaryAction ? (
            <Link
              href={secondaryAction.href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/78 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white"
            >
              {secondaryAction.label}
            </Link>
          ) : null}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <article key={metric.label} className="glass-panel p-5">
            <div
              className={`inline-flex rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${toneClass(metric.tone)}`}
            >
              {metric.label}
            </div>
            <p className="mt-4 font-heading text-3xl text-slate-950">{metric.value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{metric.detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="glass-panel p-6">
          <h3 className="font-heading text-3xl text-slate-950">Primary surfaces</h3>
          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            {panels.map((panel) => (
              <div
                key={panel.title}
                className="rounded-[26px] border border-white/55 bg-white/72 p-5"
              >
                <div
                  className={`inline-flex rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${toneClass(panel.tone)}`}
                >
                  {panel.title}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {panel.description}
                </p>
                <div className="mt-5 space-y-3">
                  {panel.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span
                        className={`mt-2 h-2.5 w-2.5 rounded-full ${toneClass(panel.tone)}`}
                      />
                      <p className="text-sm leading-6 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="glass-panel p-6">
          <h3 className="font-heading text-3xl text-slate-950">Build path</h3>
          <div className="mt-5 space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[24px] border border-white/55 bg-white/72 p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                    0{index + 1}
                  </span>
                  <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
