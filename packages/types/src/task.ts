export const taskPriorities = ["LOW", "MEDIUM", "HIGH"] as const;

export type TaskPriority = (typeof taskPriorities)[number];

export const taskStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED"] as const;

export type TaskStatus = (typeof taskStatuses)[number];

export type Task = {
  id: string;
  title: string;
  estimatedMinutes: number;
  priority: TaskPriority;
  status: TaskStatus;
  deadline?: Date;
};
