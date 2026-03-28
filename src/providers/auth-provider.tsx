"use client";

import { createContext, useContext } from "react";
import { usePersistentState } from "@/providers/use-persistent-state";

export type AppRole =
  | "owner"
  | "admin"
  | "scheduler"
  | "staff"
  | "observer";

export type AppUser = {
  id: string;
  email: string;
  name: string;
  role: AppRole;
};

export type AppSession = {
  user: AppUser;
  issuedAt: string;
};

type AuthContextValue = {
  session: AppSession | null;
  user: AppUser | null;
  status: "authenticated" | "anonymous";
  replaceSession: (session: AppSession | null) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
  initialSession = null,
}: {
  children: React.ReactNode;
  initialSession?: AppSession | null;
}) {
  const [session, setSession] = usePersistentState<AppSession | null>(
    "equal.auth.session",
    initialSession,
  );

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        status: session ? "authenticated" : "anonymous",
        replaceSession: setSession,
        signOut: () => setSession(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
