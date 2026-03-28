import type { ReactNode } from "react";
import { PublicThemeToggle } from "@/features/public-entry/components/public-theme-toggle";

type PublicRouteFooterProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function PublicRouteFooter({
  eyebrow = "Theme",
  title,
  description,
  actions,
  className,
}: PublicRouteFooterProps) {
  const hasContent = Boolean(title || description || actions);

  return (
    <footer
      className={`story-footer-surface story-reveal mx-auto w-full max-w-[1180px] px-4 py-4 md:px-5 md:py-5${className ? ` ${className}` : ""}`}
      style={{ animationDelay: "0.12s" }}
    >
      <div
        className={`gap-4 ${
          hasContent
            ? "flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end"
            : "flex flex-col items-center text-center"
        }`}
      >
        {hasContent ? (
          <div className="max-w-[34rem]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
              {eyebrow}
            </p>
            {title ? (
              <h2 className="mt-2 text-2xl font-medium text-[color:var(--story-ink)]">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-2 text-sm leading-7 text-[color:var(--story-muted)]">
                {description}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            {eyebrow}
          </p>
        )}

        <div
          className={`flex w-full gap-3 ${
            hasContent
              ? "flex-col lg:max-w-[24rem] lg:justify-self-end"
              : "flex-col"
          }`}
        >
          {actions ? (
            <div className="grid w-full gap-3 [&>*]:w-full">
              {actions}
            </div>
          ) : null}
          <PublicThemeToggle stretch />
        </div>
      </div>
    </footer>
  );
}
