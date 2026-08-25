import * as AuthSession from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";

import { getSupabaseClient } from "@/lib/supabase";

WebBrowser.maybeCompleteAuthSession();

export async function signInWithGoogle() {
  const redirectTo = Platform.OS === "web"
    ? AuthSession.makeRedirectUri({ path: "auth/callback" })
    : AuthSession.makeRedirectUri({ path: "auth/callback", scheme: "loop" });
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo, skipBrowserRedirect: true },
  });

  if (error) throw error;
  if (!data.url) throw new Error("Não foi possível iniciar a autenticação com Google.");

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type !== "success") return null;

  const { params, errorCode } = QueryParams.getQueryParams(result.url);
  if (errorCode) throw new Error(errorCode);
  if (!params.access_token || !params.refresh_token) return null;

  const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
    access_token: params.access_token,
    refresh_token: params.refresh_token,
  });
  if (sessionError) throw sessionError;
  return sessionData.session;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await getSupabaseClient().auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.session;
}

export async function signUpWithEmail(name: string, email: string, password: string) {
  const { data, error } = await getSupabaseClient().auth.signUp({
    email,
    password,
    options: { data: { full_name: name.trim() } },
  });
  if (error) throw error;
  return data.session;
}
