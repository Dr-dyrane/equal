import { NextResponse } from "next/server";
import { signOut } from "@/server/services/auth/signout";

export const runtime = "nodejs";

export async function POST() {
  await signOut();
  return new NextResponse(null, { status: 204 });
}
