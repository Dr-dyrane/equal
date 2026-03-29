import Link from "next/link";
import { SfSymbol } from "@/components/sf-symbol";
import type { ShellRouteMeta } from "@/features/shell/config/navigation";

export function WorkspaceModuleGrid({ modules }: { modules: ShellRouteMeta[] }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {modules.map((module) => (
        <Link
          key={module.key}
          href={module.href}
          className="story-soft-card group px-4 py-4 transition hover:-translate-y-[1px]"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="story-icon-well flex h-11 w-11 items-center justify-center rounded-[18px]">
              <SfSymbol name={module.icon} variant="dualtone" className="h-[1.1rem] w-[1.1rem]" />
            </span>
            <SfSymbol name="arrow-up-right" className="h-[0.95rem] w-[0.95rem] text-[color:var(--story-subtle)] transition group-hover:text-[color:var(--story-ink)]" />
          </div>
          <p className="mt-4 font-heading text-[1.45rem] leading-none text-[color:var(--story-ink)]">
            {module.label}
          </p>
          <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
            {module.description}
          </p>
        </Link>
      ))}
    </section>
  );
}

