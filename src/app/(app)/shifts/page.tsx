import { ShiftsWorkspace } from "@/features/shifts/components/shifts-workspace";
import { getRequestAuthSession } from "@/server/services/auth/get-auth-session";
import { getShiftSnapshot } from "@/server/services/shifts/get-shift-snapshot";

export default async function ShiftsPage() {
  const session = await getRequestAuthSession();

  if (!session) {
    return null;
  }

  const snapshot = await getShiftSnapshot({
    organizationId: session.organization.id,
    organizationTimezone: session.organization.timezone,
  });

  return <ShiftsWorkspace snapshot={snapshot} />;
}
