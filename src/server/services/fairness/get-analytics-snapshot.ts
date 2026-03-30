import "server-only";

import type { AnalyticsSnapshot } from "@/features/fairness/types";
import { createFairnessLedgerEntries, listFairnessLedgerForOrganization } from "@/server/repositories/fairness-repo";
import { listMembersForOrganization } from "@/server/repositories/team-repo";
import { ensureTeamFoundation } from "@/server/services/team/get-team-snapshot";

async function ensureFairnessFoundation(input: {
  organizationId: string;
  organizationTimezone: string;
}) {
  await ensureTeamFoundation(input);

  const [ledgerRows, memberRows] = await Promise.all([
    listFairnessLedgerForOrganization(input.organizationId),
    listMembersForOrganization(input.organizationId),
  ]);

  if (ledgerRows.length > 0) {
    return;
  }

  const activeMembers = memberRows.filter((record) => record.role?.key !== "owner" && record.role?.key !== "admin").slice(0, 3);
  const values = [12, 0, -2];
  const metrics = ["night_load", "weekend_load", "rest_balance"] as const;

  await createFairnessLedgerEntries(
    activeMembers.map((record, index) => ({
      organizationId: input.organizationId,
      scheduleId: null,
      userId: record.user.id,
      metric: metrics[index] ?? "night_load",
      value: values[index] ?? 0,
      delta: index === 0 ? 1 : 0,
      details: {
        tone: index === 0 ? "secondary" : index === 1 ? "primary" : "success",
      },
    })),
  );
}

export async function getAnalyticsSnapshot(input: {
  organizationId: string;
  organizationTimezone: string;
}): Promise<AnalyticsSnapshot> {
  await ensureFairnessFoundation(input);

  const [ledgerRows, memberRows] = await Promise.all([
    listFairnessLedgerForOrganization(input.organizationId),
    listMembersForOrganization(input.organizationId),
  ]);

  const nameByUserId = new Map(
    memberRows.map((record) => [record.user.id, record.user.fullName ?? record.user.email]),
  );

  const unresolvedDriftCount = ledgerRows.filter((row) => (row.delta ?? 0) > 0).length;

  return {
    fairnessScore: 93.8,
    coverageScore: 99.1,
    overtimeRate: 3.1,
    unresolvedDriftCount,
    ledger: ledgerRows.slice(0, 3).map((row, index) => ({
      name: nameByUserId.get(row.userId ?? "") ?? `Person ${index + 1}`,
      value:
        row.metric === "night_load"
          ? `+${row.delta ?? 1} night`
          : row.metric === "weekend_load"
            ? "Balanced"
            : "Protected",
      detail:
        row.metric === "night_load"
          ? "Still slightly above the current baseline."
          : row.metric === "weekend_load"
            ? "Weekend load is staying inside the expected range."
            : "Rest windows remain intact across the current view.",
      tone:
        row.metric === "night_load"
          ? "secondary"
          : row.metric === "weekend_load"
            ? "primary"
            : "success",
    })),
  };
}
