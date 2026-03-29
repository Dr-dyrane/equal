import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  memberships,
  organizations,
  roles,
  sessions,
  users,
} from "@/db/schema";
import { authConfig } from "@/lib/auth/config";
import {
  PERMISSIONS_BY_ROLE,
  type AppPermission,
  type AppRole,
} from "@/lib/auth/claims";
import { AuthFlowError } from "@/lib/auth/errors";
import {
  createSessionToken,
  hashToken,
  verifyMagicLinkToken,
} from "@/lib/auth/session";
import { normalizeEmail } from "@/server/repositories/auth-repo";

function deriveDisplayName(email: string, name?: string) {
  const source = name?.trim() || email.split("@")[0] || "Scheduler";

  return source
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function createOrganizationName(displayName: string) {
  return `${displayName} Team`;
}

function resolvePermissions(
  roleKey: AppRole,
  rolePermissions: AppPermission[] | null | undefined,
  overrides: AppPermission[] | null | undefined,
) {
  if (overrides && overrides.length > 0) {
    return overrides;
  }

  if (rolePermissions && rolePermissions.length > 0) {
    return rolePermissions;
  }

  return PERMISSIONS_BY_ROLE[roleKey];
}

export async function verifyAuthToken(input: {
  token: string;
  userAgent?: string | null;
  ipAddress?: string | null;
}) {
  const payload = await verifyMagicLinkToken(input.token);
  const email = normalizeEmail(payload.email);
  const displayName = deriveDisplayName(email, payload.name);
  const now = new Date();
  const expiresAt = new Date(
    Date.now() + authConfig.sessionDurationSeconds * 1000,
  );

  let [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    [user] = await db
      .insert(users)
      .values({
        email,
        fullName: displayName,
      })
      .returning();
  } else if (!user.fullName && payload.name) {
    [user] = await db
      .update(users)
      .set({
        fullName: displayName,
        updatedAt: now,
      })
      .where(eq(users.id, user.id))
      .returning();
  }

  let [membershipRecord] = await db
    .select({
      membership: memberships,
      organization: organizations,
      role: roles,
    })
    .from(memberships)
    .innerJoin(organizations, eq(memberships.organizationId, organizations.id))
    .leftJoin(roles, eq(memberships.roleId, roles.id))
    .where(
      and(eq(memberships.userId, user.id), eq(memberships.status, "active")),
    )
    .orderBy(desc(memberships.createdAt))
    .limit(1);

  if (!membershipRecord && payload.mode === "signin") {
    throw new AuthFlowError(
      "This email is not set up for Equal yet.",
      "unauthorized",
    );
  }

  if (!membershipRecord) {
    const organizationName = createOrganizationName(displayName);
    const [organization] = await db
      .insert(organizations)
      .values({
        name: organizationName,
        slug: `${slugify(organizationName)}-${crypto.randomUUID().slice(0, 6)}`,
      })
      .returning();

    await db.insert(roles).values(
      (Object.keys(PERMISSIONS_BY_ROLE) as AppRole[]).map((key) => ({
        organizationId: organization.id,
        key,
        name: key.charAt(0).toUpperCase() + key.slice(1),
        permissions: PERMISSIONS_BY_ROLE[key],
      })),
    );

    const [ownerRole] = await db
      .select()
      .from(roles)
      .where(
        and(eq(roles.organizationId, organization.id), eq(roles.key, "owner")),
      )
      .limit(1);

    if (!ownerRole) {
      throw new Error("Owner role was not created for the new organization.");
    }

    const [membership] = await db
      .insert(memberships)
      .values({
        userId: user.id,
        organizationId: organization.id,
        roleId: ownerRole.id,
        title: "Owner",
      })
      .returning();

    membershipRecord = {
      membership,
      organization,
      role: ownerRole,
    };
  }

  const roleKey = (membershipRecord.role?.key as AppRole | undefined) ?? "scheduler";
  const permissions = resolvePermissions(
    roleKey,
    membershipRecord.role?.permissions,
    membershipRecord.membership.permissionsOverride,
  );
  const sessionId = crypto.randomUUID();
  const sessionToken = await createSessionToken({
    type: "session",
    sessionId,
    userId: user.id,
    organizationId: membershipRecord.organization.id,
    role: roleKey,
    permissions,
  });

  await db.insert(sessions).values({
    id: sessionId,
    userId: user.id,
    organizationId: membershipRecord.organization.id,
    tokenHash: await hashToken(sessionToken),
    userAgent: input.userAgent ?? null,
    ipAddress: input.ipAddress ?? null,
    expiresAt,
    lastSeenAt: now,
  });

  await db
    .update(users)
    .set({
      lastSignedInAt: now,
      updatedAt: now,
    })
    .where(eq(users.id, user.id));

  return {
    redirectTo: payload.redirectTo,
    sessionToken,
  };
}
