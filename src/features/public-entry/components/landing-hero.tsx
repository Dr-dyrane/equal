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

      <Image
  src="/brand/hero.png"
  alt="Equal brand mark"
  width={140}
  height={140}
  priority
  sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, (max-width: 1280px) 112px, 120px"
  className="h-auto w-[80px] sm:w-[96px] lg:w-[112px] xl:w-[120px]"
/>

      <div className="flex flex-col gap-2 space-y-2 mb-20">
        <h1 className="text-balance font-black text-[3.4rem] leading-[0.9] text-[color:var(--story-ink)] sm:text-[5rem] lg:text-[6.5rem] xl:text-[7.1rem]">
          {content.headline}
        </h1>
        <p className="text-balance font-heading text-[1rem] leading-[0.9] text-[color:var(--story-subtle)] opacity-90 sm:text-[2rem] lg:text-[3rem] xl:text-[4rem]">
          {content.secondaryHeadline}
        </p>
      </div>

      <div className="flex w-full max-w-[24rem] items-center justify-center">
        <Link
          href="/demo"
          className="story-primary-cta inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[color:var(--story-primary-text)] sm:px-5"
        >
          View Demo
          <SfSymbol name="arrow-right" className="h-4 w-4" />
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
