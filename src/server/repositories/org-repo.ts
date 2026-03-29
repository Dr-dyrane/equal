import { eq } from "drizzle-orm";
import { db } from "@/db";
import { organizations, roles } from "@/db/schema";

export async function findOrganizationById(organizationId: string) {
  const [organization] = await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, organizationId))
    .limit(1);

  return organization ?? null;
}

export async function findRolesForOrganization(organizationId: string) {
  return db
    .select()
    .from(roles)
    .where(eq(roles.organizationId, organizationId));
}
