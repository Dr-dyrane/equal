import "server-only";

import { BASELINE_SHIFT_TEMPLATES } from "@/features/shifts/content";
import type { ShiftSnapshot, ShiftTask } from "@/features/shifts/types";
import { listSitesForOrganization, listSkillsForOrganization, listTeamsForOrganization } from "@/server/repositories/team-repo";
import { createShiftTemplates, listShiftTemplatesForOrganization } from "@/server/repositories/shift-repo";
import { ensureTeamFoundation } from "@/server/services/team/get-team-snapshot";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatTime(value: string) {
  return value.slice(0, 5);
}

function getDayLabel(dayOfWeek: number) {
  return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][
    Math.max(0, Math.min(dayOfWeek - 1, 6))
  ];
}

async function ensureShiftFoundation(input: {
  organizationId: string;
  organizationTimezone: string;
}) {
  await ensureTeamFoundation(input);

  const [templateRows, teamRows, siteRows, skillRows] = await Promise.all([
    listShiftTemplatesForOrganization(input.organizationId),
    listTeamsForOrganization(input.organizationId),
    listSitesForOrganization(input.organizationId),
    listSkillsForOrganization(input.organizationId),
  ]);

  if (templateRows.length > 0) {
    return;
  }

  const primaryTeam = teamRows[0] ?? null;
  const siteBySlug = new Map(siteRows.map((site) => [site.slug, site]));
  const skillBySlug = new Map(skillRows.map((skill) => [skill.slug, skill]));

  await createShiftTemplates(
    BASELINE_SHIFT_TEMPLATES.flatMap((template) => {
      const site = siteBySlug.get(template.siteSlug);

      if (!site) {
        return [];
      }

      return [
        {
          organizationId: input.organizationId,
          teamId: primaryTeam?.id ?? null,
          siteId: site.id,
          name: template.name,
          dayOfWeek: template.dayOfWeek,
          startTime: template.startTime,
          endTime: template.endTime,
          requiredSkillIds: template.skills
            .map((skillName) => skillBySlug.get(slugify(skillName))?.id)
            .filter((value): value is string => Boolean(value)),
          requiredHeadcount: template.requiredHeadcount,
          notes: template.note,
        },
      ];
    }),
  );
}

function buildTasks(input: {
  templateCount: number;
  nightTemplateCount: number;
  escalationTemplateCount: number;
}): ShiftTask[] {
  const tasks: ShiftTask[] = [];

  if (input.nightTemplateCount > 0) {
    tasks.push({
      title: "Check nights",
      detail:
        input.nightTemplateCount === 1
          ? "One night template still sets the fairness pressure."
          : `${input.nightTemplateCount} night templates still set the fairness pressure.`,
      tone: "warning",
    });
  }

  if (input.escalationTemplateCount > 0) {
    tasks.push({
      title: "Review escalation cover",
      detail:
        input.escalationTemplateCount === 1
          ? "One template still carries escalation load."
          : `${input.escalationTemplateCount} templates still carry escalation load.`,
      tone: "secondary",
    });
  }

  tasks.push({
    title: "Keep templates reusable",
    detail:
      input.templateCount > 0
        ? `${input.templateCount} reusable shapes are carrying the week.`
        : "The week still needs its first reusable shape.",
    tone: "primary",
  });

  return tasks;
}

export async function getShiftSnapshot(input: {
  organizationId: string;
  organizationTimezone: string;
}): Promise<ShiftSnapshot> {
  await ensureShiftFoundation(input);

  const [templateRows, siteRows, skillRows] = await Promise.all([
    listShiftTemplatesForOrganization(input.organizationId),
    listSitesForOrganization(input.organizationId),
    listSkillsForOrganization(input.organizationId),
  ]);

  const siteById = new Map(siteRows.map((site) => [site.id, site.name]));
  const skillById = new Map(skillRows.map((skill) => [skill.id, skill.name]));
  const criticalTemplateCount = templateRows.filter((template) =>
    template.requiredSkillIds.some((skillId) => {
      const skill = skillById.get(skillId);
      return skill === "Night cover" || skill === "Escalations" || skill === "Clinical";
    }),
  ).length;
  const uniqueBundles = new Set(
    templateRows.map((template) =>
      [...template.requiredSkillIds]
        .map((skillId) => skillById.get(skillId) ?? skillId)
        .sort()
        .join("|"),
    ),
  );
  const nightTemplateCount = templateRows.filter((template) =>
    template.requiredSkillIds.some(
      (skillId) => skillById.get(skillId) === "Night cover",
    ),
  ).length;
  const escalationTemplateCount = templateRows.filter((template) =>
    template.requiredSkillIds.some(
      (skillId) => skillById.get(skillId) === "Escalations",
    ),
  ).length;

  return {
    summary:
      templateRows.length === 0
        ? "Start the first shape."
        : `${templateRows.length} reusable shapes are feeding the week.`,
    metrics: [
      {
        label: "Templates",
        value: String(templateRows.length),
        detail: "The week is built from reusable shapes.",
      },
      {
        label: "Critical",
        value: String(criticalTemplateCount),
        detail: "These shapes carry the highest risk.",
      },
      {
        label: "Bundles",
        value: String(uniqueBundles.size),
        detail: "Skill bundles stay visible before assignment.",
      },
    ],
    tasks: buildTasks({
      templateCount: templateRows.length,
      nightTemplateCount,
      escalationTemplateCount,
    }),
    templates: templateRows.map((template) => ({
      id: template.id,
      name: template.name,
      dayLabel: getDayLabel(template.dayOfWeek),
      window: `${formatTime(template.startTime)} - ${formatTime(template.endTime)}`,
      site: siteById.get(template.siteId ?? "") ?? "Unassigned",
      headcount:
        template.requiredHeadcount === 1
          ? "1 person"
          : `${template.requiredHeadcount} people`,
      headcountValue: template.requiredHeadcount,
      skillIds: template.requiredSkillIds,
      skills: template.requiredSkillIds
        .map((skillId) => skillById.get(skillId))
        .filter((value): value is string => Boolean(value)),
      detail: template.notes ?? "Reusable template.",
    })),
    skillOptions: skillRows.map((skill) => ({
      id: skill.id,
      name: skill.name,
    })),
  };
}
