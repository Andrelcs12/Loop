import type { Task, TaskExecution, TaskExecutionOutcome } from "@loop/types";
import { createContext, type PropsWithChildren, useCallback, useEffect, useState } from "react";

import { createTask as createRemoteTask, getTasks } from "@/lib/tasks";
import { useAuth } from "@/features/auth/auth-provider";
import type {
  CreateTaskInput,
  TaskFlowContextValue,
} from "./task-flow-types";

export const TaskFlowContext = createContext<TaskFlowContextValue | null>(null);

function createLocalId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function TaskFlowProvider({ children }: PropsWithChildren) {
  const { session } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [executions, setExecutions] = useState<TaskExecution[]>([]);
  const [activeExecutionId, setActiveExecutionId] = useState<string>();
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState<string | null>(null);

  const activeExecution = executions.find(
    (execution) => execution.id === activeExecutionId,
  );

  const refreshTasks = useCallback(async () => {
    if (!session) {
      setTasks([]);
      setTasksError(null);
      return;
    }

    setIsTasksLoading(true);
    try {
      setTasks(await getTasks());
      setTasksError(null);
    } catch (error) {
      setTasksError(error instanceof Error ? error.message : "Não foi possível carregar as tarefas.");
    } finally {
      setIsTasksLoading(false);
    }
  }, [session]);

  useEffect(() => {
    void refreshTasks();
  }, [refreshTasks]);

  async function createTask(input: CreateTaskInput) {
    const task = await createRemoteTask(input);
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
    isTasksLoading,
    refreshTasks,
    startTask,
    finishActiveExecution,
    tasksError,
  };

  return (
    <TaskFlowContext.Provider value={value}>
      {children}
    </TaskFlowContext.Provider>
  );
}
