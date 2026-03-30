import { getRequestAuthSession } from "@/server/services/auth/get-auth-session";
import { getScheduleSnapshot } from "@/server/services/schedule/get-schedule-snapshot";
import { getTeamSnapshot } from "@/server/services/team/get-team-snapshot";
import { getShiftSnapshot } from "@/server/services/shifts/get-shift-snapshot";
import { WorkspaceDashboard } from "@/features/workspace/components/workspace-dashboard";

export default async function WorkspacePage() {
  const session = await getRequestAuthSession();

  if (!session) {
    return null;
  }

  const [snapshot, teamSnapshot, shiftSnapshot] = await Promise.all([
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
    <WorkspaceDashboard
      snapshot={snapshot}
      teamSnapshot={teamSnapshot}
      shiftSnapshot={shiftSnapshot}
    />
  );
}
