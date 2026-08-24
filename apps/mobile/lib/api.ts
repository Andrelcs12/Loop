import { getSupabaseClient } from "@/lib/supabase";

export type CurrentUser = {
  email: string;
  id: string;
  name: string | null;
  setupCompleted: boolean;
};

export async function getCurrentUser(): Promise<CurrentUser> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("A URL da API não está configurada neste ambiente.");

  const { data, error } = await getSupabaseClient().auth.getSession();
  if (error || !data.session?.access_token) throw new Error("Não há uma sessão autenticada para chamar a API.");

  const response = await fetch(`${apiUrl.replace(/\/$/, "")}/me`, {
    headers: { Authorization: `Bearer ${data.session.access_token}` },
  });
  if (!response.ok) throw new Error("Não foi possível carregar o usuário atual.");
  return response.json() as Promise<CurrentUser>;
}
