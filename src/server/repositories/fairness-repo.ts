import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import type { NewFairnessLedgerEntry } from "@/db/types";
import { fairnessLedger } from "@/db/schema";

export async function listFairnessLedgerForOrganization(organizationId: string) {
  return db
    .select()
    .from(fairnessLedger)
    .where(eq(fairnessLedger.organizationId, organizationId))
    .orderBy(desc(fairnessLedger.recordedAt));
}

export async function createFairnessLedgerEntries(values: NewFairnessLedgerEntry[]) {
  if (values.length === 0) {
    return [];
  }

  return db.insert(fairnessLedger).values(values).returning();
}
