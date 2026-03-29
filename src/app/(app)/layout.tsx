import { redirect } from "next/navigation";
import { AppShell } from "@/features/shell/components/app-shell";
import { AppProviders } from "@/providers/app-providers";
import { getRequestAuthSession } from "@/server/services/auth/get-auth-session";

export default async function ProtectedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialSession = await getRequestAuthSession();

  if (!initialSession) {
    redirect("/auth?mode=signin");
  }

  return (
    <AppProviders initialSession={initialSession}>
      <AppShell>{children}</AppShell>
    </AppProviders>
  );
}
