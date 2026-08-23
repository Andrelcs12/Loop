import type { Task } from "@loop/types";

export const tasksMockData: Task[] = [
  {
    id: "task-1",
    title: "Ler 20 páginas",
    estimatedMinutes: 40,
    priority: "MEDIUM",
    status: "PENDING",
    createdAt: new Date("2026-08-23T09:00:00.000Z"),
  },
  {
    id: "task-2",
    title: "Arrumar o quarto",
    estimatedMinutes: 25,
    priority: "LOW",
    status: "PENDING",
    createdAt: new Date("2026-08-23T09:10:00.000Z"),
  },
];
