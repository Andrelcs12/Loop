import { router } from "expo-router";
import { useState } from "react";

import { AuthScreen } from "@/features/auth/auth-screen";
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from "@/features/auth/google-auth";
import { useAuth } from "@/features/auth/auth-provider";

export default function AuthRoute() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const { refreshCurrentUser } = useAuth();

  async function handleGoogleAuthentication() {
    setError(null);
    setIsSubmitting(true);

    try {
      const session = await signInWithGoogle();
      if (session) {
        const user = await refreshCurrentUser();
        if (user) router.replace(user.setupCompleted ? "/home" : "/setup");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Não foi possível entrar com Google.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleEmailAuthentication(mode: "login" | "signup", name: string, email: string, password: string) {
    setError(null);
    setNotice(null);
    setIsSubmitting(true);
    try {
      const session = mode === "signup"
        ? await signUpWithEmail(name, email, password)
        : await signInWithEmail(email, password);
      if (!session) {
        setNotice("Conta criada. Verifique seu email para confirmar o cadastro antes de entrar.");
        return;
      }
      const user = await refreshCurrentUser();
      if (user) router.replace(user.setupCompleted ? "/home" : "/setup");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Não foi possível autenticar.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return <AuthScreen error={error} isSubmitting={isSubmitting} notice={notice} onEmailAuthenticate={handleEmailAuthentication} onGoogleAuthenticate={handleGoogleAuthentication} />;
}
