import Link from "next/link";
import type { AuthMode } from "@/features/public-entry/types";

type AuthModeSwitchProps = {
  mode: AuthMode;
};

const modeOptions = [
  { mode: "start", label: "Start", href: "/auth" },
  { mode: "signin", label: "Sign in", href: "/auth?mode=signin" },
] as const;

export function AuthModeSwitch({ mode }: AuthModeSwitchProps) {
  return (
    <div className="story-toggle" aria-label="Auth mode">
      {modeOptions.map((option) => (
        <Link
          key={option.mode}
          href={option.href}
          aria-current={mode === option.mode ? "page" : undefined}
          data-active={mode === option.mode}
          className="story-toggle-button"
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
