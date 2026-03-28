import { AuthEntryView } from "@/features/public-entry/components/auth-entry-view";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const params = await searchParams;
  const mode = params.mode === "signin" ? "signin" : "start";

  return <AuthEntryView mode={mode} />;
}
