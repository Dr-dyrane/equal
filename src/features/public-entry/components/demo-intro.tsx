"use client";

import type { DemoCopy } from "@/features/public-entry/types";
import { useDemoWorkspace } from "@/features/public-entry/provider/demo-workspace-provider";

type DemoIntroProps = {
  content: DemoCopy;
};

export function DemoIntro({ content }: DemoIntroProps) {
  const { state } = useDemoWorkspace();

  return (
    <div className="story-reveal space-y-3 xl:max-w-[20rem] xl:pr-4">
      <span className="story-chip inline-flex px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--story-subtle)]">
        {content.eyebrow}
      </span>

      <div className="space-y-1.5">
        <h1 className="text-balance font-heading text-[2.8rem] leading-[0.9] text-[color:var(--story-ink)] sm:text-[4rem] xl:text-[4.5rem]">
          {content.headline.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </h1>
      </div>

      <p className="max-w-[22rem] text-sm italic leading-6 text-[color:var(--story-muted)] opacity-90">
        {state.hint}
      </p>
    </div>
  );
}
