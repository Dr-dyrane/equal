import "server-only";

import { BASELINE_RULES } from "@/features/settings/content";
import type { SettingsSnapshot, SettingsTask, SettingsRuleCard } from "@/features/settings/types";
import { findOrganizationById } from "@/server/repositories/org-repo";
import { listSitesForOrganization, listTeamsForOrganization } from "@/server/repositories/team-repo";
import {
  createRules,
  listRecentAuditLogForOrganization,
  listRolesForOrganization,
  listRulesForOrganization,
} from "@/server/repositories/settings-repo";

function getScopeLabel(input: {
  scope: "organization" | "team" | "site";
  scopeSlug?: string;
  teamBySlug: Map<string, string>;
  siteBySlug: Map<string, string>;
  organizationName: string;
}) {
  if (input.scope === "organization") {
    return input.organizationName;
  }

  if (input.scope === "team") {
    return input.teamBySlug.get(input.scopeSlug ?? "") ?? "Team";
  }

  return input.siteBySlug.get(input.scopeSlug ?? "") ?? "Site";
}

function buildTasks(input: {
  disabledHardRules: number;
  disabledSoftRules: number;
  auditCount: number;
}): SettingsTask[] {
  const tasks: SettingsTask[] = [];

  if (input.disabledHardRules > 0) {
    tasks.push({
      title: "Re-enable hard rules",
      detail:
        input.disabledHardRules === 1
          ? "One hard guardrail is off."
          : `${input.disabledHardRules} hard guardrails are off.`,
      tone: "warning",
    });
  }

  if (input.disabledSoftRules > 0) {
    tasks.push({
      title: "Check scoring weights",
      detail:
        input.disabledSoftRules === 1
          ? "One soft rule is no longer shaping the week."
          : `${input.disabledSoftRules} soft rules are no longer shaping the week.`,
      tone: "secondary",
    });
  }

  tasks.push({
    title: "Audit stays visible",
    detail:
      input.auditCount > 0
        ? `${input.auditCount} recent changes are already traceable.`
        : "The first rule change should leave a visible trail.",
    tone: "primary",
  });

  return tasks;
}

async function ensureSettingsFoundation(input: {
  organizationId: string;
  userId: string;
}) {
  const [ruleRows, organization, teamRows, siteRows] = await Promise.all([
    listRulesForOrganization(input.organizationId),
    findOrganizationById(input.organizationId),
    listTeamsForOrganization(input.organizationId),
    listSitesForOrganization(input.organizationId),
  ]);

  if (ruleRows.length > 0 || !organization) {
    return;
  }

  const teamBySlug = new Map(teamRows.map((team) => [team.slug, team]));
  const siteBySlug = new Map(siteRows.map((site) => [site.slug, site]));

  await createRules(
    BASELINE_RULES.map((rule) => ({
      organizationId: input.organizationId,
      teamId: rule.scope === "team" ? teamBySlug.get(rule.scopeSlug ?? "")?.id ?? null : null,
      siteId: rule.scope === "site" ? siteBySlug.get(rule.scopeSlug ?? "")?.id ?? null : null,
      name: rule.name,
      key: rule.key,
      type: rule.type,
      expression: rule.expression,
      weight: rule.weight,
      enabled: true,
      createdByUserId: input.userId,
    })),
  );
}

export async function getSettingsSnapshot(input: {
  organizationId: string;
  userId: string;
}): Promise<SettingsSnapshot> {
  await ensureSettingsFoundation(input);

  const [organization, teamRows, siteRows, roleRows, ruleRows, auditRows] = await Promise.all([
    findOrganizationById(input.organizationId),
    listTeamsForOrganization(input.organizationId),
    listSitesForOrganization(input.organizationId),
    listRolesForOrganization(input.organizationId),
    listRulesForOrganization(input.organizationId),
    listRecentAuditLogForOrganization(input.organizationId),
  ]);

  const teamBySlug = new Map(teamRows.map((team) => [team.slug, team.name]));
  const siteBySlug = new Map(siteRows.map((site) => [site.slug, site.name]));
  const hardRuleCount = ruleRows.filter((rule) => rule.type === "hard" && rule.enabled).length;
  const disabledHardRules = ruleRows.filter((rule) => rule.type === "hard" && !rule.enabled).length;
  const disabledSoftRules = ruleRows.filter((rule) => rule.type === "soft" && !rule.enabled).length;

  const rules: SettingsRuleCard[] = ruleRows.map((rule) => {
    const scope =
      rule.teamId != null
        ? teamRows.find((team) => team.id === rule.teamId)?.name ?? "Team"
        : rule.siteId != null
          ? siteRows.find((site) => site.id === rule.siteId)?.name ?? "Site"
          : organization?.name ?? "Organization";

    return {
      id: rule.id,
      name: rule.name,
      key: rule.key,
      type: rule.type,
      weight: rule.weight,
      enabled: rule.enabled,
      scope,
      detail:
        BASELINE_RULES.find((baseline) => baseline.key === rule.key)?.detail ??
        "Keep this guardrail visible before the week goes out.",
    };
  });

  return {
    summary:
      hardRuleCount > 0
        ? hardRuleCount === 1
          ? "1 hard guardrail is holding the floor."
          : `${hardRuleCount} hard guardrails are holding the floor.`
        : "Turn the hard guardrails back on.",
    metrics: [
      {
        label: "Rules",
        value: String(ruleRows.length),
        detail: "Keep the week explainable before it is published.",
      },
      {
        label: "Roles",
        value: String(roleRows.length),
        detail: "Access stays intentional when role boundaries are clear.",
      },
      {
        label: "Audit",
        value: String(auditRows.length),
        detail: "Recent changes should always leave a visible trail.",
      },
    ],
    tasks: buildTasks({
      disabledHardRules,
      disabledSoftRules,
      auditCount: auditRows.length,
    }),
    rules,
  };
}
