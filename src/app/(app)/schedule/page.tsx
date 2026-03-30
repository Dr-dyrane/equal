import { getRequestAuthSession } from "@/server/services/auth/get-auth-session";
import { getScheduleSnapshot } from "@/server/services/schedule/get-schedule-snapshot";
import { getTeamSnapshot } from "@/server/services/team/get-team-snapshot";
import { getShiftSnapshot } from "@/server/services/shifts/get-shift-snapshot";
import { FairnessProvider } from "@/features/fairness/provider/fairness-provider";
import { ScheduleWorkspace } from "@/features/roster-builder/components/schedule-workspace";
import { RosterBuilderProvider } from "@/features/roster-builder/provider/roster-builder-provider";

export default async function SchedulePage() {
  const session = await getRequestAuthSession();

  if (!session) {
    return null;
  }

  const [initialSnapshot, teamSnapshot, shiftSnapshot] = await Promise.all([
    getScheduleSnapshot({
      organizationId: session.organization.id,
      userId: session.user.id,
    }),
    getTeamSnapshot({
      organizationId: session.organization.id,
      organizationTimezone: session.organization.timezone,
    }),
    getShiftSnapshot({
      organizationId: session.organization.id,
      organizationTimezone: session.organization.timezone,
    }),
  ]);

  return (
    <RosterBuilderProvider initialSnapshot={initialSnapshot}>
      <FairnessProvider>
        <ScheduleWorkspace
          teamTask={teamSnapshot.tasks[0] ?? null}
          shiftTask={shiftSnapshot.tasks[0] ?? null}
        />
      </FairnessProvider>
    </RosterBuilderProvider>
  );
}
