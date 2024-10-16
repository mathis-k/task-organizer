import type { ObjectId } from "mongoose";
import { defineStore } from "pinia";
import type { TaskDocument } from "~/server/models/Task";

export const useTasksStore = defineStore("tasks", () => {
  const { data } = useAuth();
  const user = (data.value?.user as any)._id;
  const tasks = ref<TaskDocument[]>([]);

  async function fetch() {
    const response: TaskDocument[] = await $fetch("/api/tasks", {
      method: "GET",
    });

    if (response) {
      tasks.value = response;
    }
  }

  async function create(task: TaskDocument) {
    task.createdAt = new Date();
    task.updatedAt = new Date();
    const response: TaskDocument = await $fetch("/api/tasks", {
      method: "POST",
      body: task,
    });

    if (response) {
      return response;
    }
  }

  async function update(task: TaskDocument) {
    task.updatedAt = new Date();
    const response: TaskDocument = await $fetch(`/api/tasks`, {
      method: "PUT",
      body: task,
    });

    if (response) {
      return response;
    }
  }

  async function remove(id: ObjectId) {
    const response: TaskDocument = await $fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (response) {
      return response;
    }
  }

  function updateTaskStatus(taskId, newStatus) {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  }

  const get = computed(() => tasks.value);

  return {
    tasks,
    fetch,
    get,
    create,
    update,
    remove,
    updateTaskStatus,
  };
});
