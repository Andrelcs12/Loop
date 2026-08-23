import type { Task, TaskPriority } from "@loop/types";

const priorityWeight: Record<TaskPriority, number> = {
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

const priorityReason: Record<TaskPriority, string> = {
  HIGH: "É uma tarefa importante",
  MEDIUM: "É uma tarefa relevante",
  LOW: "É uma tarefa que pode ser resolvida agora",
};

export type TaskRecommendation = {
  task: Task;
  reason: string;
};

function deadlineTime(task: Task) {
  return task.deadline?.getTime() ?? Number.POSITIVE_INFINITY;
}

export function recommendTask(
  tasks: readonly Task[],
  availableMinutes: number,
): TaskRecommendation | null {
  const candidates = tasks
    .filter(
      (task) =>
        task.status === "PENDING" &&
        task.estimatedMinutes <= availableMinutes,
    )
    .slice()
    .sort((first, second) => {
      const priorityDifference =
        priorityWeight[second.priority] - priorityWeight[first.priority];

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      const deadlineDifference = deadlineTime(first) - deadlineTime(second);

      if (deadlineDifference !== 0) {
        return deadlineDifference;
      }

      return first.createdAt.getTime() - second.createdAt.getTime();
    });

  const task = candidates[0];

  if (!task) {
    return null;
  }

  return {
    task,
    reason: `${priorityReason[task.priority]} e cabe nos ${availableMinutes} minutos que você tem agora.`,
  };
}
