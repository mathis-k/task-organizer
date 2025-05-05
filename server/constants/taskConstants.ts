export const TASK_TYPES = [
  "exercise",
  "learning objective",
  "homework",
] as const;
export const TASK_STATUSES = [
  "backlog",
  "planned",
  "active",
  "this week",
  "done",
] as const;
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export type TaskType = (typeof TASK_TYPES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];
