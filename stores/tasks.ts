import type { ObjectId } from "mongoose";
import { defineStore } from "pinia";
import type { TaskDocument } from "~/server/models/Task";
import type { UserDocument } from "~/server/models/User";

export const useTasks = defineStore("tasks", () => {
  const tasks = ref<TaskDocument[]>([]);

  const { data } = useAuth();
  const user = data?.value?.user as UserDocument;

  if (!user._id) throw new Error("Current user not found");

  async function fetch() {
    try {
      const response: TaskDocument[] = await $fetch<TaskDocument[]>(
        "/api/tasks/get",
        {
          headers: useRequestHeaders(["cookie"]),
          method: "POST",
          body: { user: user._id },
        },
      );
      if (response) {
        tasks.value = response;
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function create(task: TaskDocument) {
    task.createdAt = new Date();
    task.updatedAt = new Date();

    task.user = user._id;

    const response: TaskDocument = await $fetch<TaskDocument>("/api/tasks", {
      headers: useRequestHeaders(["cookie"]),
      method: "POST",
      body: task,
    });

    if (response) {
      tasks.value.push(response);
      return response;
    }
  }

  async function update(task: TaskDocument) {
    task.updatedAt = new Date();
    const response: TaskDocument = await $fetch<TaskDocument>(`/api/tasks`, {
      headers: useRequestHeaders(["cookie"]),
      method: "PUT",
      body: task,
    });

    if (response) {
      await fetch();
      return response;
    }
  }

  async function remove(id: ObjectId) {
    const response: TaskDocument = await $fetch<TaskDocument>(
      `/api/tasks/${id}`,
      {
        headers: useRequestHeaders(["cookie"]),
        method: "DELETE",
      },
    );

    if (response) {
      await fetch();
      return response;
    }
  }

  async function updateTaskStatus(
    taskId: ObjectId,
    newStatus: TaskDocument["status"],
  ) {
    const task = tasks.value.find((task) => task._id === taskId);
    if (!task) return;
    task.status = newStatus;
    return await update(task);
  }

  function getById(id: ObjectId) {
    return tasks.value.find((task) => task._id === id);
  }

  const get = computed(() => tasks.value);

  const getWithFilter = computed((filter: string) => {});

  const stats = computed(() => {
    const stats = {
      dueToday: 0,
      dueThisWeek: 0,
      doneThisWeek: 0,
      openHomework: 0,
      openLearningObjective: 0,
      overdue: 0,
    };
    tasks.value.forEach((task) => {
      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        const startOfWeek = new Date();
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        if (dueDate.toDateString() === today.toDateString()) {
          stats.dueToday++;
        } else if (dueDate >= startOfWeek && dueDate <= today) {
          stats.dueThisWeek++;
        } else if (task.status === "done" && dueDate >= startOfWeek) {
          stats.doneThisWeek++;
        }
      }

      if (task.type === "homework" && task.status !== "done") {
        stats.openHomework++;
      } else if (task.type === "learning objective" && task.status !== "done") {
        stats.openLearningObjective++;
      }

      if (task.dueDate && new Date(task.dueDate) < new Date()) {
        stats.overdue++;
      }
    });
    return stats;
  });

  return {
    tasks,
    fetch,
    get,
    getById,
    create,
    update,
    remove,
    updateTaskStatus,
    stats,
  };
});
