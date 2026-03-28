import Link from "next/link";
import { SfSymbol } from "@/components/sf-symbol";
import type { DemoCopy } from "@/features/public-entry/types";

type DemoConversionStripProps = {
  content: DemoCopy;
};

export function DemoConversionStrip({ content }: DemoConversionStripProps) {
  return (
    <section
      className="story-footer-surface story-reveal mt-6 w-full px-5 py-5 md:px-6 md:py-6"
      style={{ animationDelay: "0.16s" }}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[34rem]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            Build your own week
          </p>
          <h2 className="mt-2 text-2xl font-medium text-[color:var(--story-ink)]">
            {content.conversionTitle}
          </h2>
          <p className="mt-2 text-sm leading-7 text-[color:var(--story-muted)]">
            {content.conversionDescription}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/auth"
            className="story-primary-cta inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)]"
          >
            {content.conversionAction}
            <SfSymbol name="arrow-right" className="h-4 w-4" />
          </Link>
          <Link
            href="/auth?mode=signin"
            className="story-nav-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
