import type { Session, User } from "@supabase/supabase-js";
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import { ApiError, type CurrentUser, getCurrentUser } from "@/lib/api";

type AuthContextValue = {
  error: string | null;
  currentUser: CurrentUser | null;
  isLoading: boolean;
  refreshCurrentUser: () => Promise<CurrentUser | null>;
  session: Session | null;
  signOut: () => Promise<void>;
  user: User | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
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

    async function resolveCurrentUser(nextSession: Session | null) {
      if (!nextSession) {
        setCurrentUser(null);
        setIsLoading(false);
        return null;
      }

      try {
        const user = await getCurrentUser();
        if (!isMounted) return null;
        setCurrentUser(user);
        setError(null);
        return user;
      } catch (error) {
        if (!isMounted) return null;

        if (error instanceof ApiError && error.status === 401) {
          await supabase.auth.signOut();
          setSession(null);
          setCurrentUser(null);
        }

        setError(error instanceof Error ? error.message : "Não foi possível validar sua sessão.");
        return null;
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!isMounted) return;
      if (sessionError) setError(sessionError.message);
      setSession(data.session);
      void resolveCurrentUser(data.session);
    }).catch(() => {
      if (!isMounted) return;
      setError("Não foi possível restaurar sua sessão.");
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) return;
      setSession(nextSession);
      void resolveCurrentUser(nextSession);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      error,
      currentUser,
      isLoading,
      refreshCurrentUser: async () => {
        if (!session) return null;

        setIsLoading(true);
        try {
          const user = await getCurrentUser();
          setCurrentUser(user);
          setError(null);
          return user;
        } catch (error) {
          if (error instanceof ApiError && error.status === 401) {
            await getSupabaseClient().auth.signOut();
            setSession(null);
            setCurrentUser(null);
          }
          setError(error instanceof Error ? error.message : "Não foi possível validar sua sessão.");
          return null;
        } finally {
          setIsLoading(false);
        }
      },
      session,
      signOut: async () => {
        const { error } = await getSupabaseClient().auth.signOut();
        if (error) throw error;
        setSession(null);
        setCurrentUser(null);
        setError(null);
      },
      user: session?.user ?? null,
    }),
    [currentUser, error, isLoading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  return context;
}
