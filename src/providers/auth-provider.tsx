"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { AppRole, AppSession, AppUser } from "@/lib/auth/claims";

type AuthContextValue = {
  session: AppSession | null;
  user: AppUser | null;
  status: "authenticated" | "anonymous";
  replaceSession: (session: AppSession | null) => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  children,
  initialSession = null,
}: {
  children: React.ReactNode;
  initialSession?: AppSession | null;
}) {
  const [session, setSession] = useState<AppSession | null>(initialSession);

  useEffect(() => {
    setSession(initialSession);
  }, [initialSession]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        status: session ? "authenticated" : "anonymous",
        replaceSession: setSession,
        signOut: async () => {
          try {
            await fetch("/api/auth/signout", {
              method: "POST",
            });
          } finally {
            setSession(null);

            if (typeof window !== "undefined") {
              window.location.assign("/");
            }
          }
        },
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

export type { AppRole, AppSession, AppUser };
