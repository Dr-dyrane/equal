import { Shapes } from "lucide-react";
import { ModuleScaffold } from "@/components/module-scaffold";

export default function ShiftsPage() {
  return (
    <ModuleScaffold
      eyebrow="Shift design"
      title="Turn operational demand into reusable shift templates."
      description="The shifts module defines the structure the optimizer works against: templates, required skills, demand patterns, and role coverage by time window."
      icon={Shapes}
      primaryAction={{ href: "/schedule", label: "See schedule output" }}
      secondaryAction={{ href: "/settings", label: "Configure rule weights" }}
      metrics={[
        {
          label: "Active templates",
          value: "24",
          detail: "Core day, evening, night, and weekend templates across the pilot workspace.",
          tone: "primary",
        },
        {
          label: "Critical roles",
          value: "07",
          detail: "Coverage-sensitive roles that trigger hard-rule failures if missing.",
          tone: "warning",
        },
        {
          label: "Coverage bundles",
          value: "12",
          detail: "Reusable skill combinations attached to high-risk shifts.",
          tone: "accent",
        },
      ]}
      panels={[
        {
          title: "Shift templates",
          description: "Model repeatable shift structures instead of rebuilding each week from scratch.",
          tone: "primary",
          items: [
            "Template names, times, durations, and type tags.",
            "Day, night, weekend, and holiday distinctions for fairness scoring.",
            "Organization-specific flexibility without hard-coding industries.",
          ],
        },
        {
          title: "Required skills",
          description: "Coverage can demand a mix of seniority and capability, not just a headcount.",
          tone: "warning",
          items: [
            "Attach role minimums and required skill sets to each template.",
            "Prevent publish when critical qualifications are missing.",
            "Support multi-role substitutions where policy allows them.",
          ],
        },
        {
          title: "Demand shaping",
          description: "Templates eventually tie into seasonal and short-term demand forecasts.",
          tone: "accent",
          items: [
            "Plan baseline staffing by daypart or location.",
            "Prepare for spikes without rewriting every assignment manually.",
            "Give schedulers an input layer before the solver runs.",
          ],
        },
      ]}
      steps={[
        {
          title: "Define standard patterns",
          description: "Create a shared library of shift templates and tag them by type and location.",
        },
        {
          title: "Attach coverage needs",
          description: "Map skill requirements so the engine knows what counts as a valid assignment.",
        },
        {
          title: "Feed the generator",
          description: "Once templates and demand are set, the schedule module can generate proposals for review.",
        },
      ]}
    />
  );
}
