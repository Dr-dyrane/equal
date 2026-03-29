import { NextResponse } from "next/server";
import { scheduleStateActionSchema } from "@/lib/contracts/schedule";
import { getRequestAuthSession } from "@/server/services/auth/get-auth-session";
import { mutateScheduleState } from "@/server/services/schedule/mutate-schedule-state";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getRequestAuthSession();

  if (!session) {
    return NextResponse.json(
      {
        error: "unauthorized",
        message: "Sign in to update the schedule.",
      },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const action = scheduleStateActionSchema.parse(body);
    const snapshot = await mutateScheduleState({
      organizationId: session.organization.id,
      userId: session.user.id,
      action,
    });

    return NextResponse.json(snapshot);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Could not update the schedule.";

    return NextResponse.json(
      {
        error: "schedule_update_failed",
        message,
      },
      { status: 400 },
    );
  }
}
