import Image from "next/image";
import Link from "next/link";
import { SfSymbol } from "@/components/sf-symbol";
import { PublicSystemLabel } from "@/features/public-entry/components/public-system-label";
import type { LandingCopy } from "@/features/public-entry/types";

type LandingHeroProps = {
  content: LandingCopy;
  signals: readonly string[];
};

export function LandingHero({ content, signals }: LandingHeroProps) {
  return (
    <div className="story-reveal mx-auto flex w-full max-w-[56rem] flex-col items-center space-y-5 text-center">
      <span className="story-chip inline-flex px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--story-subtle)]">
        {content.eyebrow}
      </span>

      <div className="space-y-1.5">
        <h1 className="text-balance font-black text-[3.4rem] leading-[0.9] text-[color:var(--story-ink)] sm:text-[5rem] lg:text-[6.5rem] xl:text-[7.1rem]">
          {content.headline.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </h1>
        <p className="text-balance font-heading text-[3.05rem] leading-[0.9] text-[color:var(--story-subtle)] italic opacity-90 sm:text-[4.55rem] lg:text-[5.95rem] xl:text-[6.45rem]">
          {content.secondaryHeadline}
        </p>
      </div>

      <Image
        src="/brand/hero.png"
        alt="Equal brand mark"
        width={393}
        height={393}
        priority
        sizes="(max-width: 640px) 12rem, (max-width: 1024px) 15rem, 18rem"
        className="h-auto w-[11.5rem] sm:w-[13.5rem] lg:w-[16rem] xl:w-[18rem]"
      />

      <div className="grid w-full max-w-[24rem] grid-cols-2 gap-3 sm:w-auto sm:max-w-none sm:auto-cols-max sm:grid-flow-col sm:justify-center">
        <Link
          href="/demo"
          className="story-primary-cta inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[color:var(--story-primary-text)] sm:px-5"
        >
          Start
          <SfSymbol name="arrow-right" className="h-4 w-4" />
        </Link>
        <Link
          href="/auth?mode=signin"
          className="story-nav-secondary inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[color:var(--story-ink)] sm:px-5"
        >
          <SfSymbol
            name="rectangle-portrait-and-arrow-right"
            className="h-4 w-4 sm:hidden"
          />
          Sign in
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {signals.map((signal, index) => (
          <PublicSystemLabel
            key={signal}
            className={index > 1 ? "hidden md:inline-flex" : "inline-flex"}
          >
            {signal}
          </PublicSystemLabel>
        ))}
      </div>
    </div>
  );
}
