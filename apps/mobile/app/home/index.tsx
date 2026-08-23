import { router } from "expo-router";

import { HomeScreen } from "@/features/home/home-screen";

export default function HomeRoute() {
  return <HomeScreen onViewNow={() => router.navigate("/home/now")} />;
}
