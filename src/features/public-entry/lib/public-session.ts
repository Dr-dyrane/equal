import type { AppSession } from "@/providers/auth-provider";

function deriveName(email: string, name: string) {
  const source = name.trim() || email.split("@")[0] || "Scheduler";

  return source
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function createPublicSession(email: string, name: string): AppSession {
  return {
    user: {
      id: globalThis.crypto?.randomUUID?.() ?? `equal-${Date.now()}`,
      email,
      name: deriveName(email, name),
      role: "scheduler",
    },
    issuedAt: new Date().toISOString(),
  };
}
