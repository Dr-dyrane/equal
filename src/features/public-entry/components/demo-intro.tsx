"use client";

import type { DemoCopy } from "@/features/public-entry/types";
import { useDemoWorkspace } from "@/features/public-entry/provider/demo-workspace-provider";

type DemoIntroProps = {
  content: DemoCopy;
};

export function DemoIntro({ content }: DemoIntroProps) {
  const { state } = useDemoWorkspace();

  return (
    <div className="story-reveal space-y-5 xl:pr-6">
      <span className="story-chip inline-flex px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--story-subtle)]">
        {content.eyebrow}
      </span>

      <div className="space-y-3">
        <h1 className="text-balance font-heading text-[2.75rem] leading-[0.94] text-[color:var(--story-ink)] sm:text-[4rem] xl:text-[4.75rem]">
          {content.headline.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </h1>
        <p className="max-w-[34rem] text-base leading-7 text-[color:var(--story-muted)] sm:text-lg md:text-xl md:leading-8">
          {content.description}
        </p>
      </div>

      <div className="story-soft-card px-4 py-4 md:px-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
          {content.helperLabel}
        </p>
        <p className="mt-2 max-w-[28rem] text-sm leading-7 text-[color:var(--story-ink)] md:text-[0.96rem]">
          {state.hint}
        </p>
      </div>
    </div>
  );
}
