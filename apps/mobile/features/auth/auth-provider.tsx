import type { Session, User } from "@supabase/supabase-js";
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

type AuthContextValue = {
  error: string | null;
  isLoading: boolean;
  session: Session | null;
  signOut: () => Promise<void>;
  user: User | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setError("Supabase Auth ainda não foi configurado neste ambiente.");
      setIsLoading(false);
      return;
    }

    const supabase = getSupabaseClient();
    let isMounted = true;

    void supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!isMounted) return;
      if (sessionError) setError(sessionError.message);
      setSession(data.session);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) return;
      setSession(nextSession);
      setError(null);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      error,
      isLoading,
      session,
      signOut: async () => {
        const { error } = await getSupabaseClient().auth.signOut();
        if (error) throw error;
      },
      user: session?.user ?? null,
    }),
    [error, isLoading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  return context;
}
