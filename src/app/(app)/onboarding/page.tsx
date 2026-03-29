import { RouteOverviewPage } from "@/features/route-overview/components/route-overview-page";
import { onboardingOverview } from "@/features/route-overview/content";

export default function OnboardingPage() {
  return <RouteOverviewPage content={onboardingOverview} />;
}
