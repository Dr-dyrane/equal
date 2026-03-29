import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/auth/cookies";
import { AuthFlowError } from "@/lib/auth/errors";
import { verifyAuthToken } from "@/server/services/auth/verify-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/auth?error=missing_token", url));
  }

  try {
    const { redirectTo, sessionToken } = await verifyAuthToken({
      token,
      userAgent: request.headers.get("user-agent"),
      ipAddress:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    });

    await setSessionCookie(sessionToken);
    return NextResponse.redirect(new URL(redirectTo, url));
  } catch (error) {
    const code =
      error instanceof AuthFlowError ? error.code : "verify_failed";

    if (!(error instanceof AuthFlowError)) {
      console.error("Auth verify failed", error);
    }

    return NextResponse.redirect(new URL(`/auth?error=${code}`, url));
  }
}
