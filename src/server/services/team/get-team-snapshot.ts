import "server-only";

import {
  BASELINE_SITES,
  BASELINE_SKILLS,
  BASELINE_TEAM,
  BASELINE_TEAM_PROFILES,
  type BaselineTeamProfile,
} from "@/features/team/content";
import type {
  TeamMember,
  TeamMemberTone,
  TeamSnapshot,
  TeamTask,
  TeamTaskTone,
} from "@/features/team/types";
import {
  createMemberships,
  createPreferences,
  createSites,
  createSkills,
  createTeams,
  createUsers,
  createUserSkills,
  findUsersByEmails,
  listMembersForOrganization,
  listPreferencesForOrganization,
  listSitesForOrganization,
  listSkillsForOrganization,
  listTeamsForOrganization,
  listUserSkillsForOrganization,
} from "@/server/repositories/team-repo";

type PreferenceState = {
  status?: string;
  siteSlug?: string;
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function seedEmailForProfile(profile: BaselineTeamProfile, organizationId: string) {
  const localPart = slugify(profile.name).replace(/-/g, ".");
  return `${localPart}+${organizationId.slice(0, 8)}@team.equal.app`;
}

function readPreferenceState(value: unknown): PreferenceState {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const record = value as Record<string, unknown>;

  return {
    status: typeof record.status === "string" ? record.status : undefined,
    siteSlug: typeof record.siteSlug === "string" ? record.siteSlug : undefined,
  };
}

function readShiftWindowState(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const record = value as Record<string, unknown>;

  return {
    status: typeof record.status === "string" ? record.status : undefined,
    teamSlug: typeof record.teamSlug === "string" ? record.teamSlug : undefined,
  };
}

function readNoteState(value: string | null) {
  if (!value) {
    return {
      state: "ready",
      detail: "",
    };
  }

  const [state, detail] = value.split("|");

  return {
    state: state || "ready",
    detail: detail || value,
  };
}

function getMemberTone(status: string): TeamMemberTone {
  if (status === "Needs availability" || status === "Needs preferences") {
    return "warning";
  }

  if (status === "Check skill") {
    return "secondary";
  }

  return "success";
}

function getTaskTone(kind: string): TeamTaskTone {
  if (kind === "warning") {
    return "warning";
  }

  if (kind === "secondary") {
    return "secondary";
  }

  return "primary";
}

export async function ensureTeamFoundation(input: {
  organizationId: string;
  organizationTimezone: string;
}) {
  const [teamRows, siteRows, skillRows] = await Promise.all([
    listTeamsForOrganization(input.organizationId),
    listSitesForOrganization(input.organizationId),
    listSkillsForOrganization(input.organizationId),
  ]);

  if (!teamRows.some((team) => team.slug === BASELINE_TEAM.slug)) {
    await createTeams([
      {
        organizationId: input.organizationId,
        name: BASELINE_TEAM.name,
        slug: BASELINE_TEAM.slug,
        colorToken: BASELINE_TEAM.colorToken,
      },
    ]);
  }

  const missingSites = BASELINE_SITES.filter(
    (site) => !siteRows.some((existing) => existing.slug === site.slug),
  );

  if (missingSites.length > 0) {
    await createSites(
      missingSites.map((site) => ({
        organizationId: input.organizationId,
        name: site.name,
        slug: site.slug,
        timezone: input.organizationTimezone,
      })),
    );
  }

  const missingSkills = BASELINE_SKILLS.filter(
    (name) =>
      !skillRows.some((skill) => slugify(skill.name) === slugify(name)),
  );

  if (missingSkills.length > 0) {
    await createSkills(
      missingSkills.map((name) => ({
        organizationId: input.organizationId,
        name,
        slug: slugify(name),
      })),
    );
  }

  const seedProfiles = BASELINE_TEAM_PROFILES.map((profile) => ({
    profile,
    email: seedEmailForProfile(profile, input.organizationId),
  }));

  const existingUsers = await findUsersByEmails(seedProfiles.map((entry) => entry.email));
  const existingUserByEmail = new Map(
    existingUsers.map((user) => [user.email, user]),
  );

  const missingUsers = seedProfiles.filter(
    (entry) => !existingUserByEmail.has(entry.email),
  );

  if (missingUsers.length > 0) {
    await createUsers(
      missingUsers.map(({ profile, email }) => ({
        email,
        fullName: profile.name,
      })),
    );
  }

  const allUsers = await findUsersByEmails(seedProfiles.map((entry) => entry.email));
  const userByEmail = new Map(allUsers.map((user) => [user.email, user]));
  const memberRows = await listMembersForOrganization(input.organizationId);
  const membershipByUserId = new Map(
    memberRows.map((record) => [record.user.id, record.membership]),
  );

  const missingMemberships = seedProfiles
    .map(({ profile, email }) => ({
      profile,
      user: userByEmail.get(email),
    }))
    .filter(
      (entry): entry is { profile: BaselineTeamProfile; user: (typeof allUsers)[number] } =>
        Boolean(entry.user) && !membershipByUserId.has(entry.user.id),
    );

  if (missingMemberships.length > 0) {
    await createMemberships(
      missingMemberships.map(({ profile, user }) => ({
        organizationId: input.organizationId,
        userId: user.id,
        title: profile.role,
        status: "active",
      })),
    );
  }

  const preferenceRows = await listPreferencesForOrganization(input.organizationId);
  const preferenceByUserId = new Map(
    preferenceRows.map((preference) => [preference.userId, preference]),
  );

  const missingPreferences = seedProfiles
    .map(({ profile, email }) => ({
      profile,
      user: userByEmail.get(email),
    }))
    .filter(
      (entry): entry is { profile: BaselineTeamProfile; user: (typeof allUsers)[number] } =>
        Boolean(entry.user) && !preferenceByUserId.has(entry.user.id),
    );

  if (missingPreferences.length > 0) {
    await createPreferences(
      missingPreferences.map(({ profile, user }) => ({
        organizationId: input.organizationId,
        userId: user.id,
        availability: {
          status:
            profile.inputState === "needs-availability" ? "missing" : "ready",
          siteSlug: profile.siteSlug,
        },
        preferredShiftWindows: {
          status:
            profile.inputState === "needs-preferences"
              ? "needs-update"
              : "ready",
          teamSlug: BASELINE_TEAM.slug,
        },
        maxHoursPerWeek: profile.maxHoursPerWeek,
        notes: `${profile.inputState}|${profile.detail}`,
      })),
    );
  }

  const allSkillRows = await listSkillsForOrganization(input.organizationId);
  const skillBySlug = new Map(allSkillRows.map((skill) => [skill.slug, skill]));
  const userSkillRows = await listUserSkillsForOrganization(input.organizationId);
  const existingUserSkillKeys = new Set(
    userSkillRows.map((record) => `${record.userSkill.userId}:${record.userSkill.skillId}`),
  );

  const missingUserSkills = seedProfiles.flatMap(({ profile, email }) => {
    const user = userByEmail.get(email);

    if (!user) {
      return [];
    }

    return profile.skills.flatMap((skillName) => {
      const skill = skillBySlug.get(slugify(skillName));

      if (!skill) {
        return [];
      }

      const key = `${user.id}:${skill.id}`;

      if (existingUserSkillKeys.has(key)) {
        return [];
      }

      return [
        {
          userId: user.id,
          skillId: skill.id,
          proficiency: 3,
        },
      ];
    });
  });

  if (missingUserSkills.length > 0) {
    await createUserSkills(missingUserSkills);
  }
}

function buildTasks(members: TeamMember[]): TeamTask[] {
  const needAvailability = members.filter(
    (member) => member.status === "Needs availability",
  ).length;
  const needPreferences = members.filter(
    (member) => member.status === "Needs preferences",
  ).length;
  const needChecks = members.filter((member) => member.status === "Check skill").length;
  const nightCover = members.filter((member) =>
    member.skills.some((skill) => skill === "Night cover"),
  ).length;

  const tasks: TeamTask[] = [];

  if (needAvailability > 0) {
    tasks.push({
      title: "Get availability in",
      detail: `${needAvailability} ${needAvailability === 1 ? "person still needs next week." : "people still need next week."}`,
      tone: getTaskTone("warning"),
    });
  }

  if (needPreferences > 0) {
    tasks.push({
      title: "Refresh preferences",
      detail: `${needPreferences} ${needPreferences === 1 ? "profile still needs a pass." : "profiles still need a pass."}`,
      tone: getTaskTone("secondary"),
    });
  }

  if (needChecks > 0) {
    tasks.push({
      title: "Check skill coverage",
      detail: `${needChecks} ${needChecks === 1 ? "person has one open check." : "people have open checks."}`,
      tone: getTaskTone("secondary"),
    });
  }

  tasks.push({
    title: "Night cover",
    detail:
      nightCover > 1
        ? `${nightCover} people can still absorb late load.`
        : "Night cover is thin.",
    tone: getTaskTone(nightCover > 1 ? "primary" : "warning"),
  });

  return tasks.slice(0, 3);
}

export async function getTeamSnapshot(input: {
  organizationId: string;
  organizationTimezone: string;
}): Promise<TeamSnapshot> {
  await ensureTeamFoundation(input);

  const [siteRows, memberRows, preferenceRows, userSkillRows] = await Promise.all([
    listSitesForOrganization(input.organizationId),
    listMembersForOrganization(input.organizationId),
    listPreferencesForOrganization(input.organizationId),
    listUserSkillsForOrganization(input.organizationId),
  ]);

  const siteNameBySlug = new Map(siteRows.map((site) => [site.slug, site.name]));
  const preferenceByUserId = new Map(
    preferenceRows.map((preference) => [preference.userId, preference]),
  );
  const skillsByUserId = new Map<string, string[]>();

  for (const row of userSkillRows) {
    const current = skillsByUserId.get(row.userSkill.userId) ?? [];
    current.push(row.skill.name);
    skillsByUserId.set(row.userSkill.userId, current);
  }

  const seedOrderByEmail = new Map(
    BASELINE_TEAM_PROFILES.map((profile, index) => [
      seedEmailForProfile(profile, input.organizationId),
      index,
    ]),
  );
  const seedProfileByEmail = new Map(
    BASELINE_TEAM_PROFILES.map((profile) => [
      seedEmailForProfile(profile, input.organizationId),
      profile,
    ]),
  );

  const members = memberRows
    .filter((record) => record.role?.key !== "owner" && record.role?.key !== "admin")
    .sort((left, right) => {
      const leftOrder = seedOrderByEmail.get(left.user.email) ?? Number.MAX_SAFE_INTEGER;
      const rightOrder = seedOrderByEmail.get(right.user.email) ?? Number.MAX_SAFE_INTEGER;
      return leftOrder - rightOrder;
    })
    .map((record) => {
      const preference = preferenceByUserId.get(record.user.id);
      const availability = readPreferenceState(preference?.availability);
      const shiftWindows = readShiftWindowState(preference?.preferredShiftWindows);
      const note = readNoteState(preference?.notes ?? null);
      const seedProfile = seedProfileByEmail.get(record.user.email);
      const skills = skillsByUserId.get(record.user.id) ?? seedProfile?.skills ?? [];
      const siteSlug = availability.siteSlug ?? seedProfile?.siteSlug;
      const site = siteSlug ? siteNameBySlug.get(siteSlug) ?? "Unassigned" : "Unassigned";

      let status = "Ready";

      if (availability.status === "missing") {
        status = "Needs availability";
      } else if (shiftWindows.status === "needs-update") {
        status = "Needs preferences";
      } else if (note.state === "needs-check") {
        status = "Check skill";
      }

      return {
        id: record.user.id,
        name: record.user.fullName ?? record.user.email,
        role: record.membership.title ?? seedProfile?.role ?? "Staff",
        site,
        status,
        tone: getMemberTone(status),
        detail: note.detail || seedProfile?.detail || "Profile is current.",
        skills,
      };
    });

  const readyCount = members.filter((member) => member.status === "Ready").length;
  const crossSkillCount = members.filter((member) => member.skills.length >= 2).length;

  return {
    summary:
      members.length === 0
        ? "Start with the people who make the week possible."
        : `${readyCount} of ${members.length} people are ready for next week.`,
    metrics: [
      {
        label: "People",
        value: String(members.length),
        detail:
          members.length === 1
            ? "One person is shaping the week."
            : `${members.length} people are shaping the week.`,
      },
      {
        label: "Ready",
        value: `${members.length === 0 ? 0 : Math.round((readyCount / members.length) * 100)}%`,
        detail:
          readyCount === members.length
            ? "Inputs are current."
            : `${members.length - readyCount} still need a pass.`,
      },
      {
        label: "Cross-skill",
        value: `${members.length === 0 ? 0 : Math.round((crossSkillCount / members.length) * 100)}%`,
        detail:
          crossSkillCount > 0
            ? "Coverage can still absorb change."
            : "Coverage is too narrow.",
      },
    ],
    tasks: buildTasks(members),
    members,
  };
}
