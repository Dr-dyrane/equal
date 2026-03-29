import "server-only";

import { PERMISSIONS_BY_ROLE, type AppPermission, type AppSession } from "@/lib/auth/claims";
import { readSessionCookie } from "@/lib/auth/cookies";
import { hashToken, verifySessionToken } from "@/lib/auth/session";
import { getSessionViewer } from "@/server/repositories/auth-repo";

function coercePermissions(
  rolePermissions: AppPermission[] | null | undefined,
  overridePermissions: AppPermission[] | null | undefined,
  role: AppSession["user"]["role"],
) {
  if (overridePermissions && overridePermissions.length > 0) {
    return overridePermissions;
  }

  if (rolePermissions && rolePermissions.length > 0) {
    return rolePermissions;
  }

  return PERMISSIONS_BY_ROLE[role];
}

export async function getRequestAuthSession(): Promise<AppSession | null> {
  const token = await readSessionCookie();

  if (!token) {
    return null;
  }

  try {
    const payload = await verifySessionToken(token);
    const tokenHash = await hashToken(token);
    const viewer = await getSessionViewer({
      sessionId: payload.sessionId,
      userId: payload.userId,
      organizationId: payload.organizationId,
      tokenHash,
    });

    if (!viewer) {
      return null;
    }

    const role = (viewer.role?.key as AppSession["user"]["role"] | undefined) ?? payload.role;

    return {
      sessionId: viewer.session.id,
      user: {
        id: viewer.user.id,
        email: viewer.user.email,
        name: viewer.user.fullName ?? viewer.user.email.split("@")[0] ?? "Scheduler",
        role,
      },
      organization: {
        id: viewer.organization.id,
        name: viewer.organization.name,
        timezone: viewer.organization.timezone,
      },
      permissions: coercePermissions(
        viewer.role?.permissions,
        viewer.membership.permissionsOverride,
        role,
      ),
      issuedAt: payload.iat
        ? new Date(payload.iat * 1000).toISOString()
        : viewer.session.createdAt.toISOString(),
      expiresAt: payload.exp
        ? new Date(payload.exp * 1000).toISOString()
        : viewer.session.expiresAt.toISOString(),
      activeSiteId: payload.activeSiteId ?? null,
      activeTeamId: payload.activeTeamId ?? null,
    };
  } catch {
    return null;
  }
}
