import { RouteOverviewPage } from "@/features/route-overview/components/route-overview-page";
import { settingsOverview } from "@/features/route-overview/content";

export default function SettingsPage() {
  return <RouteOverviewPage content={settingsOverview} />;
}
