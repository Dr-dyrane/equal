import { BarChart3 } from "lucide-react";
import { ModuleScaffold } from "@/components/module-scaffold";

export default function AnalyticsPage() {
  return (
    <ModuleScaffold
      eyebrow="Analytics"
      title="Measure fairness, compliance, and coverage over time."
      description="Analytics turns schedule decisions into an audit trail. The focus is not vanity dashboards, but proof that staffing stayed compliant, balanced, and operationally sound."
      icon={BarChart3}
      primaryAction={{ href: "/schedule", label: "Inspect live schedule" }}
      secondaryAction={{ href: "/settings", label: "Open rule settings" }}
      metrics={[
        {
          label: "Fairness balance",
          value: "96%",
          detail: "Undesirable shifts remain tightly distributed over the current sample window.",
          tone: "primary",
        },
        {
          label: "Coverage compliance",
          value: "99.4%",
          detail: "Every required skill mix is met except for explicitly flagged draft conflicts.",
          tone: "success",
        },
        {
          label: "Overtime drift",
          value: "2.8%",
          detail: "Excess hours are visible early so future rosters can correct course.",
          tone: "warning",
        },
      ]}
      panels={[
        {
          title: "Fairness trends",
          description: "The ledger makes workload distribution visible to staff and schedulers alike.",
          tone: "primary",
          items: [
            "Track nights, weekends, holidays, and overtime over time.",
            "Show relative load versus peers, not just raw counts.",
            "Explain why a person was assigned a difficult shift.",
          ],
        },
        {
          title: "Coverage heatmaps",
          description: "Schedulers need to see pressure points before they become staffing failures.",
          tone: "success",
          items: [
            "Spot understaffed periods by time window or site.",
            "Compare demand assumptions to actual roster coverage.",
            "Highlight which missing skills create the biggest risk.",
          ],
        },
        {
          title: "Compliance exports",
          description: "Operational decisions need an audit-ready trail for payroll and regulators.",
          tone: "warning",
          items: [
            "Export schedule changes, overrides, and rule edits.",
            "Preserve actor, timestamp, and previous state values.",
            "Support observer and auditor access without modification rights.",
          ],
        },
      ]}
      steps={[
        {
          title: "Start with the fairness ledger",
          description: "Persist assignment history so fairness can be measured across schedules rather than in isolation.",
        },
        {
          title: "Add compliance overlays",
          description: "Surface legal-hour and rest-period risk alongside schedule results.",
        },
        {
          title: "Publish organization reports",
          description: "Deliver dashboard summaries and exportable evidence for admins, payroll, and auditors.",
        },
      ]}
    />
  );
}
