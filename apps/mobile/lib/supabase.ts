import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const storage = {
  getItem: async (key: string) =>
    Platform.OS === "web"
      ? globalThis.localStorage?.getItem(key) ?? null
      : SecureStore.getItemAsync(key),
  removeItem: async (key: string) => {
    if (Platform.OS === "web") {
      globalThis.localStorage?.removeItem(key);
      return;
    }

    await SecureStore.deleteItemAsync(key);
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === "web") {
      globalThis.localStorage?.setItem(key, value);
      return;
    }

    await SecureStore.setItemAsync(key, value, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
    });
  },
};

let client: SupabaseClient | undefined;

export function isSupabaseConfigured() {
  return Boolean(
    process.env.EXPO_PUBLIC_SUPABASE_URL && process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase Auth não está configurado neste ambiente.");
  }

  if (!client) {
    client = createClient(
      process.env.EXPO_PUBLIC_SUPABASE_URL!,
      process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        auth: {
          autoRefreshToken: true,
          detectSessionInUrl: false,
          persistSession: true,
          storage,
          storageKey: "loop.supabase.session",
        },
      },
    );
  }

  return client;
}
