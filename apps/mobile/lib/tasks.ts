import type { Task, TaskPriority } from "@loop/types";

import { authenticatedApiRequest } from "./api";

type ApiTask = Omit<Task, "createdAt" | "updatedAt" | "deadline"> & {
  createdAt: string;
  updatedAt: string;
  deadline: string | null;
};

type TaskInput = {
  title: string;
  estimatedMinutes: number;
  priority: TaskPriority;
  deadline?: Date;
};

function toTask(task: ApiTask): Task {
  return {
    ...task,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
    deadline: task.deadline ? new Date(task.deadline) : undefined,
  };
}

export async function getTasks() {
  const tasks = await authenticatedApiRequest<ApiTask[]>("/tasks", undefined, "Não foi possível carregar as tarefas.");
  return tasks.map(toTask);
}

export async function getTask(taskId: string) {
  return toTask(await authenticatedApiRequest<ApiTask>(`/tasks/${taskId}`, undefined, "Não foi possível carregar a tarefa."));
}

export async function createTask(input: TaskInput) {
  return toTask(await authenticatedApiRequest<ApiTask>("/tasks", {
    method: "POST",
    body: JSON.stringify({ ...input, deadline: input.deadline?.toISOString() }),
  }, "Não foi possível criar a tarefa."));
}

export async function updateTask(taskId: string, input: Partial<TaskInput>) {
  return toTask(await authenticatedApiRequest<ApiTask>(`/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify({ ...input, deadline: input.deadline?.toISOString() }),
  }, "Não foi possível atualizar a tarefa."));
}

export async function archiveTask(taskId: string) {
  return toTask(await authenticatedApiRequest<ApiTask>(`/tasks/${taskId}/archive`, {
    method: "PATCH",
  }, "Não foi possível arquivar a tarefa."));
}
