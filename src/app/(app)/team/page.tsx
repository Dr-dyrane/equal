import { TeamWorkspace } from "@/features/team/components/team-workspace";
import { getRequestAuthSession } from "@/server/services/auth/get-auth-session";
import { getTeamSnapshot } from "@/server/services/team/get-team-snapshot";

export default async function TeamPage() {
  const session = await getRequestAuthSession();

  if (!session) {
    return null;
  }

  const snapshot = await getTeamSnapshot({
    organizationId: session.organization.id,
    organizationTimezone: session.organization.timezone,
  });

  return <TeamWorkspace snapshot={snapshot} />;
}
