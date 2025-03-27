import type { ObjectId } from "mongoose";
import { defineStore } from "pinia";
import type { TaskDocument } from "~/server/models/Task";
import type { User } from "~/components/User.vue";

export const useTasksStore = defineStore("tasks", () => {
  const tasks = ref<TaskDocument[]>([]);

  async function fetch() {
    try {
      const response: TaskDocument[] = await $fetch<TaskDocument[]>(
        "/api/tasks",
        {
          headers: useRequestHeaders(["cookie"]),
          method: "GET",
        },
      );
      if (response) {
        tasks.value = response;
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function getTask(id: ObjectId) {
    const response: TaskDocument = await $fetch<TaskDocument>(
      `/api/tasks/${id}`,
      {
        headers: useRequestHeaders(["cookie"]),
        method: "GET",
      },
    );

    if (response) {
      return response;
    }
  }

  async function create(task: TaskDocument) {
    task.createdAt = new Date();
    task.updatedAt = new Date();

    const { data } = useAuth();
    task.user = (data?.value?.user as User)._id;

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
    newStatus: "Backlog" | "Working On" | "Done",
  ) {
    const task = tasks.value.find((task) => task._id === taskId);
    if (task) {
      task.status = newStatus;
      const response: TaskDocument = await $fetch<TaskDocument>(`/api/tasks`, {
        headers: useRequestHeaders(["cookie"]),
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
