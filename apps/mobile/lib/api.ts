import { getSupabaseClient } from "@/lib/supabase";

export type CurrentUser = {
  avatarUrl: string | null;
  email: string;
  id: string;
  name: string | null;
  setupCompleted: boolean;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

export async function authenticatedApiRequest<T>(
  path: string,
  options?: RequestInit,
  errorMessage = "Não foi possível concluir a solicitação.",
): Promise<T> {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!apiUrl) throw new Error("A URL da API não está configurada neste ambiente.");

  const { data, error } = await getSupabaseClient().auth.getSession();
  if (error || !data.session?.access_token) throw new Error("Não há uma sessão autenticada para chamar a API.");

  const response = await fetch(`${apiUrl.replace(/\/$/, "")}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${data.session.access_token}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!response.ok) {
    throw new ApiError(errorMessage, response.status);
  }
  return response.json() as Promise<T>;
}

export function getCurrentUser(): Promise<CurrentUser> {
  return authenticatedApiRequest<CurrentUser>("/me", undefined, "Não foi possível carregar o usuário atual.");
}
