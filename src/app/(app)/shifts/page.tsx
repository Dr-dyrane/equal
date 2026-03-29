import { RouteOverviewPage } from "@/features/route-overview/components/route-overview-page";
import { shiftsOverview } from "@/features/route-overview/content";

export default function ShiftsPage() {
  return <RouteOverviewPage content={shiftsOverview} />;
}
