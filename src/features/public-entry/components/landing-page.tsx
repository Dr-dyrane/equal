import {
  fairnessSignals,
  landingCopy,
  rosterPreview,
} from "@/features/public-entry/content";
import { LandingHero } from "@/features/public-entry/components/landing-hero";
import { LandingPreviewPanel } from "@/features/public-entry/components/landing-preview-panel";
import { PublicRouteFooter } from "@/features/public-entry/components/public-route-footer";
import { PublicRouteFrame } from "@/features/public-entry/components/public-route-frame";

export function LandingPage() {
  return (
    <PublicRouteFrame
      width="wide"
      headerShowThemeToggle={false}
      headerAction={{
        href: "/auth?mode=signin",
        label: "Sign in",
        iconName: "rectangle-portrait-and-arrow-right",
      }}
    >
      <section className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-8 lg:gap-10">
        <LandingHero content={landingCopy} signals={fairnessSignals} />
        <LandingPreviewPanel
          content={landingCopy}
          days={rosterPreview}
          signals={fairnessSignals}
        />
        <PublicRouteFooter />
      </section>
    </PublicRouteFrame>
  );
}
