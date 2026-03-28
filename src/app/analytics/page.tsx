import { AnalyticsWorkspace } from "@/features/fairness/components/analytics-workspace";
import { FairnessProvider } from "@/features/fairness/provider/fairness-provider";

export default function AnalyticsPage() {
  return (
    <FairnessProvider>
      <AnalyticsWorkspace />
    </FairnessProvider>
  );
}
