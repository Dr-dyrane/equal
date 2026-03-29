import { AuthEntryView } from "@/features/public-entry/components/auth-entry-view";
import { getAuthErrorCopy } from "@/lib/auth/guards";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const mode = params.mode === "signin" ? "signin" : "start";
  const error = getAuthErrorCopy(params.error);

  return (
    <AuthEntryView
      key={`${mode}:${params.next ?? ""}:${params.error ?? ""}`}
      mode={mode}
      errorMessage={error}
      nextPath={params.next}
    />
  );
}
