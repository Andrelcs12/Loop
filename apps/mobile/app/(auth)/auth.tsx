import { router } from "expo-router";

import { AuthScreen } from "@/features/auth/auth-screen";

export default function AuthRoute() {
  function handleMockAuthentication() {
    // Temporário: será substituído por Supabase Auth quando a autenticação real existir.
    router.replace("/setup");
  }

  return <AuthScreen onAuthenticate={handleMockAuthentication} />;
}
