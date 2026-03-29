import { UsersRound } from "lucide-react";
import { ModuleScaffold } from "@/components/module-scaffold";

export default function TeamPage() {
  return (
    <ModuleScaffold
      eyebrow="Team module"
      title="Capture the human inputs that make a fair roster possible."
      description="The team surface centralizes staff profiles, availability, skills, and preferences so schedule generation has the right signals before optimization runs."
      icon={UsersRound}
      primaryAction={{ href: "/schedule", label: "Open schedule module" }}
      secondaryAction={{ href: "/onboarding", label: "Review onboarding" }}
      metrics={[
        {
          label: "Active staff",
          value: "128",
          detail: "Modeled across multiple teams, locations, and role combinations.",
          tone: "primary",
        },
        {
          label: "Preference completion",
          value: "92%",
          detail: "Availability and preferred shift types are in place for nearly all staff.",
          tone: "success",
        },
        {
          label: "Multi-skill coverage",
          value: "34%",
          detail: "Cross-trained staff provide more resilient schedule options.",
          tone: "secondary",
        },
      ]}
      panels={[
        {
          title: "Staff directory",
          description: "A role-aware directory for schedulers, admins, and observers.",
          tone: "primary",
          items: [
            "Profile cards with role, contract status, and organizational scope.",
            "Fast search by name, location, or capability.",
            "Direct access to fairness history and recent assignments.",
          ],
        },
        {
          title: "Skills and certifications",
          description: "Track the capabilities needed to satisfy required shift coverage.",
          tone: "success",
          items: [
            "Map users to skills and proficiency levels.",
            "Highlight expiring certifications before they affect rosters.",
            "Support multi-role workers without duplicating people records.",
          ],
        },
        {
          title: "Availability intake",
          description: "Preference capture stays lightweight for staff and high-signal for schedulers.",
          tone: "secondary",
          items: [
            "Unavailable dates, preferred shifts, and notes.",
            "Swap eligibility shaped by state and role permissions.",
            "Self-serve updates without exposing other people's schedules.",
          ],
        },
      ]}
      steps={[
        {
          title: "Invite and assign roles",
          description: "Owners and admins bring users into the organization and map initial permissions.",
        },
        {
          title: "Attach skills and constraints",
          description: "Schedulers define which staff can satisfy which shift requirements before generation begins.",
        },
        {
          title: "Collect preferences",
          description: "Staff submit availability and shift preferences, giving the optimization engine the human context it needs.",
        },
      ]}
    />
  );
}
