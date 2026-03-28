import Link from "next/link";
import { SfSymbol } from "@/components/sf-symbol";
import { demoCopy } from "@/features/public-entry/content";
import { DemoIntro } from "@/features/public-entry/components/demo-intro";
import { DemoPromiseStage } from "@/features/public-entry/components/demo-promise-stage";
import { DemoWorkspace } from "@/features/public-entry/components/demo-workspace";
import { PublicRouteFooter } from "@/features/public-entry/components/public-route-footer";
import { PublicRouteFrame } from "@/features/public-entry/components/public-route-frame";
import { DemoWorkspaceProvider } from "@/features/public-entry/provider/demo-workspace-provider";

export function DemoPage() {
  return (
    <DemoWorkspaceProvider>
      <PublicRouteFrame
        width="wide"
        headerShowThemeToggle={false}
        headerAction={{
          href: "/auth?mode=signin",
          label: "Sign in",
          iconName: "rectangle-portrait-and-arrow-right",
          variant: "nav",
        }}
      >
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-8 lg:gap-10">
          <section className="grid w-full gap-5 xl:grid-cols-[minmax(0,0.52fr)_minmax(0,1.48fr)] xl:items-start xl:gap-8">
            <div className="xl:self-center">
              <DemoIntro content={demoCopy} />
            </div>
            <div>
              <DemoWorkspace content={demoCopy} />
            </div>
          </section>
          <DemoPromiseStage />
          <PublicRouteFooter
            eyebrow="Next"
            title={demoCopy.conversionTitle}
            description={demoCopy.conversionDescription}
            actions={
              <>
                <Link
                  href="/auth"
                  className="story-primary-cta inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)]"
                >
                  {demoCopy.conversionAction}
                  <SfSymbol name="arrow-right" className="h-4 w-4" />
                </Link>
                <Link
                  href="/auth?mode=signin"
                  className="story-nav-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
                >
                  Sign in
                </Link>
              </>
            }
          />
        </div>
      </PublicRouteFrame>
    </DemoWorkspaceProvider>
  );
}
