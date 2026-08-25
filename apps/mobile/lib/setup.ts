import { authenticatedApiRequest } from "@/lib/api";

export type SetupDraft = {
  availableTime: "UNDER_30_MINUTES" | "FROM_30_TO_60_MINUTES" | "FROM_1_TO_2_HOURS" | "OVER_2_HOURS" | null;
  currentStep: number;
  goal: "PRODUCTIVITY" | "STUDY" | "HEALTHY_HABITS" | "MORE_FREE_TIME" | "LIFE_ORGANIZATION" | null;
  routine: "MORNING" | "AFTERNOON" | "EVENING" | "ALL_DAY" | null;
};

export async function getSetup() {
  return authenticatedApiRequest<{ setup: SetupDraft | null; setupCompleted: boolean }>("/setup", undefined, "Não foi possível carregar o setup.");
}

export async function updateSetup(draft: Partial<SetupDraft>) {
  return authenticatedApiRequest<{ setup: SetupDraft; setupCompleted: boolean }>("/setup", { method: "PATCH", body: JSON.stringify(draft) }, "Não foi possível salvar o setup.");
}

export async function completeSetup(input: Omit<SetupDraft, "currentStep"> & { initialCommitment?: { startsAt: string; title: string } }) {
  return authenticatedApiRequest<{ setup: SetupDraft; setupCompleted: boolean }>("/setup/complete", { method: "POST", body: JSON.stringify(input) }, "Não foi possível concluir o setup.");
}
