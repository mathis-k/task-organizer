import type { ObjectId } from "mongoose";
import { defineStore } from "pinia";
import type { TaskDocument } from "~/server/models/Task";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<TaskDocument[]>([]);

  async function fetch() {
    const response: TaskDocument[] = await $fetch("/api/tasks", {
      method: "GET",
    });

    if (response) {
      tasks.value = response;
    }
  }

  async function getTask(id: ObjectId) {
    const response: TaskDocument = await $fetch(`/api/tasks/${id}`, {
      method: "GET",
    });

    if (response) {
      return response;
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
      tasks.value.push(response);
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
      const index = tasks.value.findIndex((t) => t._id === task._id);
      tasks.value[index] = response;
      return response;
    }
  }

  async function remove(id: ObjectId) {
    const response: TaskDocument = await $fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (response) {
      const index = tasks.value.findIndex((t) => t._id === id);
      tasks.value.splice(index, 1);
      return response;
    }
  }

  async function updateTaskStatus(taskId, newStatus) {
    const task = tasks.value.find((task) => task._id === taskId);
    if (task) {
      task.status = newStatus;
      const response: TaskDocument = await $fetch(`/api/tasks`, {
        method: "PUT",
        body: task,
      });
      if (response) {
        const index = tasks.value.findIndex((t) => t._id === taskId);
        tasks.value[index] = response;
        return response;
      }
    }
  }

  const get = computed(() => tasks.value);

  return {
    tasks,
    fetch,
    getTask,
    get,
    create,
    update,

    remove,
    updateTaskStatus,
  };
});
