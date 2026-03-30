import { AnalyticsWorkspace } from "@/features/fairness/components/analytics-workspace";
import { FairnessProvider } from "@/features/fairness/provider/fairness-provider";
import { getRequestAuthSession } from "@/server/services/auth/get-auth-session";
import { getAnalyticsSnapshot } from "@/server/services/fairness/get-analytics-snapshot";

export default async function AnalyticsPage() {
  const session = await getRequestAuthSession();

  if (!session) {
    return null;
  }

  const snapshot = await getAnalyticsSnapshot({
    organizationId: session.organization.id,
    organizationTimezone: session.organization.timezone,
  });

  return (
    <FairnessProvider>
      <AnalyticsWorkspace snapshot={snapshot} />
    </FairnessProvider>
  );
}
