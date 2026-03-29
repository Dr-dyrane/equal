import { and, desc, eq, gt, isNull } from "drizzle-orm";
import { db } from "@/db";
import { memberships, sessions, users } from "@/db/schema";
import { organizations, roles } from "@/db/schema";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function findUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizeEmail(email)))
    .limit(1);

  return user ?? null;
}

export async function findPrimaryMembershipForUser(userId: string) {
  const [record] = await db
    .select({
      membership: memberships,
      organization: organizations,
      role: roles,
    })
    .from(memberships)
    .innerJoin(organizations, eq(memberships.organizationId, organizations.id))
    .leftJoin(roles, eq(memberships.roleId, roles.id))
    .where(
      and(eq(memberships.userId, userId), eq(memberships.status, "active")),
    )
    .orderBy(desc(memberships.createdAt))
    .limit(1);

  return record ?? null;
}

export async function getSessionViewer(input: {
  sessionId: string;
  userId: string;
  organizationId: string;
  tokenHash: string;
}) {
  const [record] = await db
    .select({
      session: sessions,
      user: users,
      membership: memberships,
      organization: organizations,
      role: roles,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .innerJoin(
      memberships,
      and(
        eq(memberships.userId, sessions.userId),
        eq(memberships.organizationId, sessions.organizationId),
        eq(memberships.status, "active"),
      ),
    )
    .innerJoin(organizations, eq(sessions.organizationId, organizations.id))
    .leftJoin(roles, eq(memberships.roleId, roles.id))
    .where(
      and(
        eq(sessions.id, input.sessionId),
        eq(sessions.userId, input.userId),
        eq(sessions.organizationId, input.organizationId),
        eq(sessions.tokenHash, input.tokenHash),
        isNull(sessions.revokedAt),
        gt(sessions.expiresAt, new Date()),
      ),
    )
    .limit(1);

  return record ?? null;
}

export async function revokeSessionByTokenHash(tokenHash: string) {
  await db
    .update(sessions)
    .set({
      revokedAt: new Date(),
    })
    .where(and(eq(sessions.tokenHash, tokenHash), isNull(sessions.revokedAt)));
}
