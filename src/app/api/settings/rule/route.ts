import { NextResponse } from "next/server";
import { z } from "zod";
import { getRequestAuthSession } from "@/server/services/auth/get-auth-session";
import { findRuleById, updateRuleEnabledState } from "@/server/repositories/settings-repo";
import { getSettingsSnapshot } from "@/server/services/settings/get-settings-snapshot";

const payloadSchema = z.object({
  ruleId: z.string().uuid(),
  enabled: z.boolean(),
});

export async function POST(request: Request) {
  const session = await getRequestAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid rule update." }, { status: 400 });
  }

  const existingRule = await findRuleById({
    organizationId: session.organization.id,
    ruleId: parsed.data.ruleId,
  });

  if (!existingRule) {
    return NextResponse.json({ message: "Rule not found." }, { status: 404 });
  }

  await updateRuleEnabledState({
    organizationId: session.organization.id,
    ruleId: parsed.data.ruleId,
    enabled: parsed.data.enabled,
  });

  const snapshot = await getSettingsSnapshot({
    organizationId: session.organization.id,
    userId: session.user.id,
  });

  return NextResponse.json(snapshot);
}
