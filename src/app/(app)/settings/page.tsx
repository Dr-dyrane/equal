import { SettingsWorkspace } from "@/features/settings/components/settings-workspace";
import { getRequestAuthSession } from "@/server/services/auth/get-auth-session";
import { getSettingsSnapshot } from "@/server/services/settings/get-settings-snapshot";

export default async function SettingsPage() {
  const session = await getRequestAuthSession();

  if (!session) {
    return null;
  }

  const snapshot = await getSettingsSnapshot({
    organizationId: session.organization.id,
    userId: session.user.id,
  });

  return <SettingsWorkspace snapshot={snapshot} />;
}
