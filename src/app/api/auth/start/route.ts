import { NextResponse } from "next/server";
import { AuthFlowError } from "@/lib/auth/errors";
import { startAuth } from "@/server/services/auth/start-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await startAuth(body, {
      origin: new URL(request.url).origin,
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof AuthFlowError) {
      return NextResponse.json(
        {
          error: error.code,
          message: error.message,
        },
        { status: error.code === "email_send_failed" ? 502 : 400 },
      );
    }

    return NextResponse.json(
      {
        error: "unexpected",
        message: "Something went wrong starting auth.",
      },
      { status: 500 },
    );
  }
}
