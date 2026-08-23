import type { Task } from "@loop/types";

export const tasksMockData: Task[] = [
  { id: "task-1", title: "Revisar cálculo", estimatedMinutes: 30, priority: "HIGH", status: "PENDING" },
  { id: "task-2", title: "Ler 20 páginas", estimatedMinutes: 40, priority: "MEDIUM", status: "PENDING" },
  { id: "task-3", title: "Arrumar o quarto", estimatedMinutes: 25, priority: "LOW", status: "COMPLETED" },
];
