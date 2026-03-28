import Image from "next/image";
import Link from "next/link";
import { SfSymbol, type SfSymbolName } from "@/components/sf-symbol";
import { PublicThemeToggle } from "@/features/public-entry/components/public-theme-toggle";

type PublicHeaderProps = {
  actionHref: string;
  actionLabel: string;
  actionIconName: SfSymbolName;
  actionVariant?: "secondary" | "nav";
  showThemeToggle?: boolean;
};

export function PublicHeader({
  actionHref,
  actionLabel,
  actionIconName,
  actionVariant = "secondary",
  showThemeToggle = true,
}: PublicHeaderProps) {
  const actionClassName =
    actionVariant === "nav" ? "story-nav-secondary" : "story-cta-secondary";

  return (
    <header className="story-header story-reveal flex items-center justify-between gap-3 px-3 py-2.5 md:px-4 md:py-3">
      <Link href="/" className="flex min-w-0 items-center gap-3">
        <div className="story-logo-well flex h-11 w-11 shrink-0 items-center justify-center">
          <Image
            src="/brand/hero.png"
            alt="Equal"
            width={24}
            height={24}
            priority
          />
        </div>
        <div className="min-w-0">
          <p className="truncate font-heading text-lg text-[color:var(--story-ink)]">
            Equal
          </p>
          <p className="truncate text-[11px] uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            Easy scheduling
          </p>
        </div>
      </Link>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {showThemeToggle ? <PublicThemeToggle /> : null}
        <Link
          href={actionHref}
          aria-label={actionLabel}
          title={actionLabel}
          className={`${actionClassName} inline-flex h-10 w-10 items-center justify-center sm:h-auto sm:w-auto sm:px-4 sm:py-2 text-sm font-semibold text-[color:var(--story-ink)]`}
        >
          <SfSymbol name={actionIconName} className="h-4 w-4 sm:hidden" />
          <span className="sr-only sm:not-sr-only">{actionLabel}</span>
        </Link>
      </div>
    </header>
  );
}
