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
    task.dueDate?.setHours(0, 0, 0, 0);

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

  const stats = computed(() => {
    const stats = {
      dueToday: 0,
      dueThisWeek: 0,
      doneThisWeek: 0,
      openHomework: 0,
      openLearningObjective: 0,
      overdue: 0,
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const isInCurrentWeek = (date: Date) => {
      if (!date) return false;
      const date_ = new Date(date);
      date_.setHours(0, 0, 0, 0);
      return date_ >= startOfWeek && date_ <= endOfWeek;
    };

    tasks.value.forEach((task) => {
      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        const dueThisWeek = isInCurrentWeek(dueDate);
        if (dueDate.getTime() === today.getTime()) {
          stats.dueToday++;
        }
        if (dueThisWeek) {
          stats.dueThisWeek++;
        }
        if (task.resolutionDate && isInCurrentWeek(task.resolutionDate)) {
          stats.doneThisWeek++;
        }
        if (task.type === "homework" && !task.resolution && dueThisWeek) {
          stats.openHomework++;
        }
        if (
          task.type === "learning objective" &&
          !task.resolution &&
          dueThisWeek
        ) {
          stats.openLearningObjective++;
        }
        if (dueDate < today && !task.resolution) {
          stats.overdue++;
        }
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
