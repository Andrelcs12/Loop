import { ApiError } from "@/lib/api";
import { getSupabaseClient } from "@/lib/supabase";

export type SetupDraft = {
  availableTime: "UNDER_30_MINUTES" | "FROM_30_TO_60_MINUTES" | "FROM_1_TO_2_HOURS" | "OVER_2_HOURS" | null;
  currentStep: number;
  goal: "PRODUCTIVITY" | "STUDY" | "HEALTHY_HABITS" | "MORE_FREE_TIME" | "LIFE_ORGANIZATION" | null;
  routine: "MORNING" | "AFTERNOON" | "EVENING" | "ALL_DAY" | null;
};

async function request<T>(path: string, options?: RequestInit) {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { data } = await getSupabaseClient().auth.getSession();
  if (!apiUrl || !data.session?.access_token) throw new Error("Não foi possível acessar o setup.");

  const response = await fetch(`${apiUrl.replace(/\/$/, "")}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${data.session.access_token}`, "Content-Type": "application/json", ...options?.headers },
  });
  if (!response.ok) throw new ApiError("Não foi possível salvar o setup.", response.status);
  return response.json() as Promise<T>;
}

export async function getSetup() {
  return request<{ setup: SetupDraft | null; setupCompleted: boolean }>("/setup");
}

export async function updateSetup(draft: Partial<SetupDraft>) {
  return request<{ setup: SetupDraft; setupCompleted: boolean }>("/setup", { method: "PATCH", body: JSON.stringify(draft) });
}

export async function completeSetup(input: Omit<SetupDraft, "currentStep"> & { initialCommitment?: { startsAt: string; title: string } }) {
  return request<{ setup: SetupDraft; setupCompleted: boolean }>("/setup/complete", { method: "POST", body: JSON.stringify(input) });
}
