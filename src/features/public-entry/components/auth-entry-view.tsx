"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { SfSymbol } from "@/components/sf-symbol";
import { getAuthContent } from "@/features/public-entry/content";
import { PublicRouteFrame } from "@/features/public-entry/components/public-route-frame";
import { createPublicSession } from "@/features/public-entry/lib/public-session";
import type { AuthMode } from "@/features/public-entry/types";
import { useAuth } from "@/providers/auth-provider";

export function AuthEntryView({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const { replaceSession } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const content = getAuthContent(mode);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubmitting(true);
    replaceSession(createPublicSession(email.trim(), name));
    router.push(content.destination);
  }

  return (
    <PublicRouteFrame
      width="narrow"
      centerMain
      headerAction={{
        href: "/",
        label: "Home",
        iconName: "house-fill",
      }}
    >
      <section className="story-stage story-reveal w-full max-w-[620px] px-5 py-6 md:px-6 md:py-7">
        <span className="story-chip inline-flex px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
          Equal account
        </span>

        <h1 className="mt-6 font-heading text-4xl leading-[0.96] text-[color:var(--story-ink)] md:text-5xl">
          {content.title}
        </h1>
        <p className="mt-4 max-w-[32rem] text-base leading-7 text-[color:var(--story-muted)] md:text-lg">
          {content.description}
        </p>

        <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--story-subtle)]">
              Full name
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              autoComplete="name"
              placeholder="Alex Morgan"
              className="story-input"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--story-subtle)]">
              Email
            </span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              autoComplete="email"
              placeholder="alex@equal.app"
              required
              className="story-input"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="story-primary-cta mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Opening..." : content.cta}
            <SfSymbol name="arrow-right" className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-2 text-sm text-[color:var(--story-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>{content.alternateLabel}</p>
          <Link
            href={content.alternateHref}
            className="inline-flex items-center gap-2 font-semibold text-[color:var(--story-ink)] transition hover:opacity-80 focus-visible:outline-none focus-visible:opacity-80"
          >
            {content.alternateAction}
            <SfSymbol name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicRouteFrame>
  );
}
