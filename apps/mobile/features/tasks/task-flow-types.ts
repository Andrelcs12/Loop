import type {
  Task,
  TaskExecution,
  TaskExecutionOutcome,
  TaskPriority,
} from "@loop/types";

export type CreateTaskInput = {
  title: string;
  estimatedMinutes: number;
  priority: TaskPriority;
  deadline?: Date;
};

export type TaskFlowContextValue = {
  tasks: Task[];
  executions: TaskExecution[];
  activeExecution?: TaskExecution;
  createTask: (input: CreateTaskInput) => Task;
  startTask: (taskId: string) => void;
  finishActiveExecution: (outcome: TaskExecutionOutcome) => void;
};
