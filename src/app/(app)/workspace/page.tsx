import { getRequestAuthSession } from "@/server/services/auth/get-auth-session";
import { getScheduleSnapshot } from "@/server/services/schedule/get-schedule-snapshot";
import { WorkspaceDashboard } from "@/features/workspace/components/workspace-dashboard";

export default async function WorkspacePage() {
  const session = await getRequestAuthSession();

  if (!session) {
    return null;
  }

  const snapshot = await getScheduleSnapshot({
    organizationId: session.organization.id,
    userId: session.user.id,
  });

  return <WorkspaceDashboard snapshot={snapshot} />;
}
