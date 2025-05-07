export const TASK_TYPES = [
  "exercise",
  "learning objective",
  "homework",
  "todo",
] as const;
export const TASK_STATUSES = [
  "backlog",
  "planned",
  "this week",
  "active",
  "done",
] as const;
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export type TaskType = (typeof TASK_TYPES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];
