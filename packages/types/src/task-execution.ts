export const taskExecutionOutcomes = [
  "COMPLETED",
  "INTERRUPTED",
  "SKIPPED",
] as const;

export type TaskExecutionOutcome = (typeof taskExecutionOutcomes)[number];

export type TaskExecution = {
  id: string;
  taskId: string;
  startedAt: Date;
  endedAt?: Date;
  outcome?: TaskExecutionOutcome;
  actualMinutes?: number;
};
