"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SfSymbol } from "@/components/sf-symbol";
import { getAuthContent } from "@/features/public-entry/content";
import { AuthModeSwitch } from "@/features/public-entry/components/auth-mode-switch";
import { PublicThemeToggle } from "@/features/public-entry/components/public-theme-toggle";
import { PublicRouteFrame } from "@/features/public-entry/components/public-route-frame";
import type { AuthMode } from "@/features/public-entry/types";
import {
  authStartSchema,
  type AuthStartInput,
  type AuthStartResult,
} from "@/lib/contracts/auth";

export function AuthEntryView({
  mode,
  errorMessage,
  nextPath,
}: {
  mode: AuthMode;
  errorMessage?: string;
  nextPath?: string;
}) {
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const content = getAuthContent(mode);
  const form = useForm<AuthStartInput>({
    resolver: zodResolver(authStartSchema),
    defaultValues: {
      mode,
      email: "",
      next: nextPath,
      name: "",
    },
  });

  async function handleSubmit(values: AuthStartInput) {
    setSubmissionError(null);
    setSentTo(null);

    const response = await fetch("/api/auth/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        mode,
      }),
    });

    const payload = (await response.json()) as
      | AuthStartResult
      | { error?: string; message?: string };

    if (!response.ok || !("ok" in payload) || payload.ok !== true) {
      setSubmissionError(
        "message" in payload ? payload.message ?? "Could not start auth." : "Could not start auth.",
      );
      return;
    }

    if (payload.verifyUrl) {
      router.push(payload.verifyUrl);
      return;
    }

    setSentTo(payload.emailedTo);
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

          <form className="mt-8 grid gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
            <input type="hidden" {...form.register("next")} />
            {content.showNameField ? (
              <label className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--story-subtle)]">
                  Your name
                </span>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder={content.namePlaceholder}
                  className="story-input"
                  {...form.register("name")}
                />
                {form.formState.errors.name ? (
                  <span className="text-sm text-rose-500">
                    {form.formState.errors.name.message}
                  </span>
                ) : null}
              </label>
            ) : null}

            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--story-subtle)]">
                Work email
              </span>
              <input
                type="email"
                autoComplete="email"
                placeholder={content.emailPlaceholder}
                required
                className="story-input"
                {...form.register("email")}
              />
              {form.formState.errors.email ? (
                <span className="text-sm text-rose-500">
                  {form.formState.errors.email.message}
                </span>
              ) : null}
            </label>

            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="story-primary-cta mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {form.formState.isSubmitting
                ? "Opening..."
                : sentTo
                  ? "Email sent"
                  : content.cta}
              <SfSymbol name="arrow-right" className="h-4 w-4" />
            </button>
          </form>

          {errorMessage || submissionError || sentTo ? (
            <p className="mt-4 text-sm text-[color:var(--story-muted)]">
              {submissionError ?? errorMessage ?? `Check ${sentTo} for the link.`}
            </p>
          ) : null}
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
