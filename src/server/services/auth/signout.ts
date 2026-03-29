import { clearSessionCookie, readSessionCookie } from "@/lib/auth/cookies";
import { hashToken, verifySessionToken } from "@/lib/auth/session";
import { revokeSessionByTokenHash } from "@/server/repositories/auth-repo";

export async function signOut() {
  const token = await readSessionCookie();

  if (!token) {
    await clearSessionCookie();
    return;
  }

  try {
    await verifySessionToken(token);
    await revokeSessionByTokenHash(await hashToken(token));
  } catch {
    // Invalid tokens should still be cleared from the browser.
  }

  await clearSessionCookie();
}
