import { router } from "expo-router";

import { SetupScreen } from "@/features/setup/setup-screen";

export default function SetupRoute() {
  return <SetupScreen onComplete={() => router.replace("/home")} />;
}
