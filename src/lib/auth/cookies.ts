import { cookies } from "next/headers";
import { authConfig } from "@/lib/auth/config";

function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: authConfig.sessionDurationSeconds,
  };
}

export async function readSessionCookie() {
  const store = await cookies();
  return store.get(authConfig.sessionCookieName)?.value ?? null;
}

export async function setSessionCookie(token: string) {
  const store = await cookies();
  store.set(authConfig.sessionCookieName, token, getCookieOptions());
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.set(authConfig.sessionCookieName, "", {
    ...getCookieOptions(),
    expires: new Date(0),
    maxAge: 0,
  });
}
