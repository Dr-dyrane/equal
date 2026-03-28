"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { SfSymbol } from "@/components/sf-symbol";
import { getAuthContent } from "@/features/public-entry/content";
import { AuthModeSwitch } from "@/features/public-entry/components/auth-mode-switch";
import { PublicThemeToggle } from "@/features/public-entry/components/public-theme-toggle";
import { PublicRouteFrame } from "@/features/public-entry/components/public-route-frame";
import { createPublicSession } from "@/features/public-entry/lib/public-session";
import type { AuthMode } from "@/features/public-entry/types";
import { useAuth } from "@/providers/auth-provider";

export function AuthEntryView({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const { replaceSession, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [submitting, setSubmitting] = useState(false);
  const content = getAuthContent(mode);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubmitting(true);
    replaceSession(createPublicSession(email.trim(), name, mode));
    router.push(content.destination);
  }

  return (
    <PublicRouteFrame
      width="narrow"
      headerShowThemeToggle={false}
      headerAction={{
        href: "/",
        label: "Home",
        iconName: "house-fill",
        variant: "nav",
        compact: true,
      }}
    >
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-5">
        <section className="story-stage story-reveal w-full px-5 py-6 md:px-6 md:py-7">
          <div className="flex justify-start">
            <AuthModeSwitch mode={mode} />
          </div>

          <h1 className="mt-8 font-heading text-4xl leading-[0.96] text-[color:var(--story-ink)] md:text-5xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-[30rem] text-base leading-7 text-[color:var(--story-muted)] md:text-lg">
            {content.description}
          </p>

          <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
            {content.showNameField ? (
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--story-subtle)]">
                  Your name
                </span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  autoComplete="name"
                  placeholder={content.namePlaceholder}
                  className="story-input"
                />
              </label>
            ) : null}

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--story-subtle)]">
                Work email
              </span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                autoComplete="email"
                placeholder={content.emailPlaceholder}
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
        </section>

        <footer className="story-footer-surface story-reveal flex w-full flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
          <div className="flex items-center gap-3">
            <PublicThemeToggle />
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--story-ink)] transition hover:opacity-80 focus-visible:outline-none focus-visible:opacity-80"
            >
              Try the demo
              <SfSymbol name="arrow-right" className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-sm text-[color:var(--story-muted)]">
            {content.nextSteps[0]}
          </p>
        </footer>
      </div>
    </PublicRouteFrame>
  );
}
