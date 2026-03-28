import type { AuthMode } from "@/features/public-entry/types";
import type { AppSession } from "@/providers/auth-provider";

function deriveName(email: string, name: string) {
  const source = name.trim() || email.split("@")[0] || "Scheduler";

  return source
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function createPublicSession(
  email: string,
  name: string,
  mode: AuthMode,
): AppSession {
  return {
    user: {
      id: globalThis.crypto?.randomUUID?.() ?? `equal-${Date.now()}`,
      email,
      name: deriveName(email, name),
      role: mode === "start" ? "owner" : "scheduler",
    },
    issuedAt: new Date().toISOString(),
  };
}
