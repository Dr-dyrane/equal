import { FairnessProvider } from "@/features/fairness/provider/fairness-provider";
import { ScheduleWorkspace } from "@/features/roster-builder/components/schedule-workspace";
import { RosterBuilderProvider } from "@/features/roster-builder/provider/roster-builder-provider";

export default function SchedulePage() {
  return (
    <RosterBuilderProvider>
      <FairnessProvider>
        <ScheduleWorkspace />
      </FairnessProvider>
    </RosterBuilderProvider>
  );
}
