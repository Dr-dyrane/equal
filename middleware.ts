import { NextResponse, type NextRequest } from "next/server";
import { authConfig } from "@/lib/auth/config";
import { isProtectedAppPath } from "@/lib/auth/guards";
import { verifySessionToken } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(authConfig.sessionCookieName)?.value;
  let hasValidSession = false;

  if (token) {
    try {
      await verifySessionToken(token);
      hasValidSession = true;
    } catch {
      hasValidSession = false;
    }
  }

  if (isProtectedAppPath(pathname) && !hasValidSession) {
    const redirectUrl = new URL("/auth?mode=signin", request.url);
    redirectUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === "/auth" && hasValidSession) {
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
