import { Settings2 } from "lucide-react";
import { ModuleScaffold } from "@/components/module-scaffold";

export default function SettingsPage() {
  return (
    <ModuleScaffold
      eyebrow="Settings"
      title="Control rules, roles, integrations, and organizational boundaries."
      description="Settings is where the product becomes domain-agnostic: organizations encode their own hard and soft rules, permission boundaries, and integration hooks without rewriting the app."
      icon={Settings2}
      primaryAction={{ href: "/onboarding", label: "Review setup path" }}
      secondaryAction={{ href: "/analytics", label: "Open analytics" }}
      metrics={[
        {
          label: "Rule definitions",
          value: "18",
          detail: "A mix of hard legal constraints and weighted soft preferences.",
          tone: "primary",
        },
        {
          label: "Role profiles",
          value: "05",
          detail: "Owner, admin, scheduler, staff, and observer access models are already mapped.",
          tone: "secondary",
        },
        {
          label: "Integration targets",
          value: "03",
          detail: "Payroll, HRIS, and time-tracking endpoints are reserved for later implementation.",
          tone: "accent",
        },
      ]}
      panels={[
        {
          title: "Rules engine",
          description: "Encode constraints in a way the optimizer and UI can both explain.",
          tone: "primary",
          items: [
            "Hard versus soft rule modeling with explicit weights.",
            "Jurisdiction-aware limits for hours, breaks, and rest.",
            "Temporary overrides that always require audit reasons.",
          ],
        },
        {
          title: "Roles and permissions",
          description: "Access control must survive both UI state and database policy.",
          tone: "secondary",
          items: [
            "Role-to-capability mapping for every workflow.",
            "RLS-ready boundaries around staff, scheduler, and observer data.",
            "Sensitive actions isolated for admins and owners.",
          ],
        },
        {
          title: "Integrations and billing",
          description: "Operational systems can plug in without collapsing the core model.",
          tone: "accent",
          items: [
            "Payroll and HR sync points for downstream reporting.",
            "Calendar and notifications reserved for later rollout.",
            "Organization-level settings and billing controls.",
          ],
        },
      ]}
      steps={[
        {
          title: "Lock the permission model",
          description: "Define role claims and RLS rules before the app starts mutating real schedule data.",
        },
        {
          title: "Ship configurable rules",
          description: "Make hard and soft constraints editable through a guided rule editor.",
        },
        {
          title: "Layer integrations later",
          description: "Connect payroll and workforce systems once the core data model is stable.",
        },
      ]}
    />
  );
}
