import { RouteOverviewPage } from "@/features/route-overview/components/route-overview-page";
import { teamOverview } from "@/features/route-overview/content";

export default function TeamPage() {
  return <RouteOverviewPage content={teamOverview} />;
}
