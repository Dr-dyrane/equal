import { demoCopy } from "@/features/public-entry/content";
import { DemoConversionStrip } from "@/features/public-entry/components/demo-conversion-strip";
import { DemoIntro } from "@/features/public-entry/components/demo-intro";
import { DemoWorkspace } from "@/features/public-entry/components/demo-workspace";
import { PublicRouteFrame } from "@/features/public-entry/components/public-route-frame";
import { DemoWorkspaceProvider } from "@/features/public-entry/provider/demo-workspace-provider";

export function DemoPage() {
  return (
    <DemoWorkspaceProvider>
      <PublicRouteFrame
        width="wide"
        headerAction={{
          href: "/auth?mode=signin",
          label: "Sign in",
          iconName: "rectangle-portrait-and-arrow-right",
          variant: "nav",
        }}
      >
        <div className="w-full">
          <section className="grid w-full gap-6 xl:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] xl:gap-10">
            <div className="order-2 xl:order-1 xl:self-center">
              <DemoIntro content={demoCopy} />
            </div>
            <div className="order-1 xl:order-2">
              <DemoWorkspace content={demoCopy} />
            </div>
          </section>
          <DemoConversionStrip content={demoCopy} />
        </div>
      </PublicRouteFrame>
    </DemoWorkspaceProvider>
  );
}
