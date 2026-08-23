import type { Task, TaskExecution, TaskExecutionOutcome } from "@loop/types";
import {
  createContext,
  type PropsWithChildren,
  useState,
} from "react";

import type {
  CreateTaskInput,
  TaskFlowContextValue,
} from "./task-flow-types";
import { tasksMockData } from "./tasks-mock-data";

export const TaskFlowContext = createContext<TaskFlowContextValue | null>(null);

function createLocalId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function TaskFlowProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<Task[]>(tasksMockData);
  const [executions, setExecutions] = useState<TaskExecution[]>([]);
  const [activeExecutionId, setActiveExecutionId] = useState<string>();

  const activeExecution = executions.find(
    (execution) => execution.id === activeExecutionId,
  );

  function createTask(input: CreateTaskInput) {
    const task: Task = {
      ...input,
      id: createLocalId("task"),
      status: "PENDING",
      createdAt: new Date(),
    };

    setTasks((current) => [task, ...current]);
    return task;
  }

  function startTask(taskId: string) {
    const execution: TaskExecution = {
      id: createLocalId("execution"),
      taskId,
      startedAt: new Date(),
    };

    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, status: "IN_PROGRESS" } : task,
      ),
    );
    setExecutions((current) => [...current, execution]);
    setActiveExecutionId(execution.id);
  }

  function finishActiveExecution(outcome: TaskExecutionOutcome) {
    if (!activeExecution) {
      return;
    }

    const endedAt = new Date();
    const actualMinutes = Math.max(
      0,
      Math.round(
        (endedAt.getTime() - activeExecution.startedAt.getTime()) / 60_000,
      ),
    );

    setExecutions((current) =>
      current.map((execution) =>
        execution.id === activeExecution.id
          ? { ...execution, endedAt, outcome, actualMinutes }
          : execution,
      ),
    );
    setTasks((current) =>
      current.map((task) =>
        task.id === activeExecution.taskId
          ? {
              ...task,
              status: outcome === "COMPLETED" ? "COMPLETED" : "PENDING",
            }
          : task,
      ),
    );
    setActiveExecutionId(undefined);
  }

  const value: TaskFlowContextValue = {
    tasks,
    executions,
    activeExecution,
    createTask,
    startTask,
    finishActiveExecution,
  };

  return (
    <TaskFlowContext.Provider value={value}>
      {children}
    </TaskFlowContext.Provider>
  );
}
