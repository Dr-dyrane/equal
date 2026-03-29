"use client";

import Image from "next/image";
import Link from "next/link";

export function ShellBrandLink({
  compact = false,
  showWordmark = true,
}: {
  compact?: boolean;
  showWordmark?: boolean;
}) {
  if (compact) {
    return (
      <Link
        href="/workspace"
        className="story-logo-well flex h-14 w-14 items-center justify-center rounded-[22px]"
        aria-label="Open workspace"
      >
        <Image src="/brand/logo.png" alt="Equal" width={30} height={30} priority />
      </Link>
    );
  }

  return (
    <Link href="/workspace" className="flex min-w-0 items-center gap-3 rounded-[24px]">
      <div className="story-logo-well flex h-14 w-14 shrink-0 items-center justify-center rounded-[22px]">
        <Image src="/brand/logo.png" alt="Equal" width={30} height={30} priority />
      </div>
      {showWordmark ? (
        <div className="min-w-0">
          <p className="truncate font-heading text-[1.55rem] leading-none text-[color:var(--story-ink)]">
            Equal
          </p>
          <p className="mt-1 truncate text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--story-subtle)]">
            Easy scheduling
          </p>
        </div>
      ) : null}
    </Link>
  );
}
