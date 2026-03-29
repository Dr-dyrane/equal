import type { AuthMode } from "@/lib/contracts/auth";

const PROTECTED_PREFIXES = [
  "/workspace",
  "/schedule",
  "/team",
  "/shifts",
  "/analytics",
  "/settings",
  "/onboarding",
] as const;

export function isProtectedAppPath(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function isPublicAuthPath(pathname: string) {
  return pathname === "/auth" || pathname.startsWith("/auth/");
}

export function getPostAuthDestination(mode: AuthMode) {
  return mode === "start" ? "/onboarding" : "/workspace";
}

export function sanitizeAuthRedirect(
  candidate: string | undefined,
  fallback: string,
) {
  if (!candidate) {
    return fallback;
  }

  if (!candidate.startsWith("/") || candidate.startsWith("//")) {
    return fallback;
  }

  return candidate;
}

export function getAuthErrorCopy(code?: string) {
  switch (code) {
    case "missing_token":
      return "That link was incomplete. Start again with your email.";
    case "expired_token":
      return "That link expired. Start again with your email.";
    case "invalid_token":
      return "That link could not be used. Start again with your email.";
    case "unauthorized":
      return "This email is not set up for Equal yet.";
    case "email_send_failed":
      return "We could not send the email. Try again.";
    case "server_misconfigured":
      return "Auth is not configured yet. Add the missing auth env values.";
    case "verify_failed":
      return "That link reached Equal, but we could not finish signing you in. Try again.";
    default:
      return undefined;
  }
}
