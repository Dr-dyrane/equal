import { getRequestAuthSession } from "@/server/services/auth/get-auth-session";
import { getScheduleSnapshot } from "@/server/services/schedule/get-schedule-snapshot";
import { FairnessProvider } from "@/features/fairness/provider/fairness-provider";
import { ScheduleWorkspace } from "@/features/roster-builder/components/schedule-workspace";
import { RosterBuilderProvider } from "@/features/roster-builder/provider/roster-builder-provider";

export default async function SchedulePage() {
  const session = await getRequestAuthSession();

  if (!session) {
    return null;
  }

  const initialSnapshot = await getScheduleSnapshot({
    organizationId: session.organization.id,
    userId: session.user.id,
  });

  return (
    <RosterBuilderProvider initialSnapshot={initialSnapshot}>
      <FairnessProvider>
        <ScheduleWorkspace />
      </FairnessProvider>
    </RosterBuilderProvider>
  );
}
