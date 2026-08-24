import { router } from "expo-router";
import { useState } from "react";

import { AuthScreen } from "@/features/auth/auth-screen";
import { signInWithGoogle } from "@/features/auth/google-auth";

export default function AuthRoute() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleGoogleAuthentication() {
    setError(null);
    setIsSubmitting(true);

    try {
      const session = await signInWithGoogle();
      if (session) router.replace("/setup");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Não foi possível entrar com Google.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return <AuthScreen error={error} isSubmitting={isSubmitting} onGoogleAuthenticate={handleGoogleAuthentication} />;
}
