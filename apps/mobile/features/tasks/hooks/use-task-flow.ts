import { useContext } from "react";

import { TaskFlowContext } from "../task-flow-provider";

export function useTaskFlow() {
  const context = useContext(TaskFlowContext);

  if (!context) {
    throw new Error("useTaskFlow deve ser usado dentro de TaskFlowProvider");
  }

  return context;
}
