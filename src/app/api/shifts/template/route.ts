import { NextResponse } from "next/server";
import { shiftTemplateUpdateSchema } from "@/lib/contracts/shifts";
import { getRequestAuthSession } from "@/server/services/auth/get-auth-session";
import { updateShiftTemplate } from "@/server/services/shifts/update-shift-template";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getRequestAuthSession();

  if (!session) {
    return NextResponse.json(
      {
        error: "unauthorized",
        message: "Sign in to change shifts.",
      },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const payload = shiftTemplateUpdateSchema.parse(body);
    const snapshot = await updateShiftTemplate({
      organizationId: session.organization.id,
      organizationTimezone: session.organization.timezone,
      payload,
    });

    return NextResponse.json(snapshot);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not update that shift.";

    return NextResponse.json(
      {
        error: "shift_update_failed",
        message,
      },
      { status: 400 },
    );
  }
}
