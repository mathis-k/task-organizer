import type { ObjectId } from "mongoose";
import { defineStore } from "pinia";
import type { ModuleDocument } from "~/server/models/Module";
import type { UserDocument } from "~/server/models/User";

export const useModules = defineStore("modules", () => {
  const modules = ref<ModuleDocument[]>([]);

  const { data } = useAuth();
  const user = data?.value?.user as UserDocument;

  if (!user._id) throw new Error("Current user not found");

  async function fetch() {
    try {
      const response: ModuleDocument[] = await $fetch<ModuleDocument[]>(
        "/api/modules/get",
        {
          headers: useRequestHeaders(["cookie"]),
          method: "POST",
          body: { user: user._id },
        },
      );
      if (response) {
        modules.value = response;
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  }

  async function create(module: ModuleDocument) {
    module.user = user._id;

    const response: ModuleDocument = await $fetch<ModuleDocument>(
      "/api/modules",
      {
        headers: useRequestHeaders(["cookie"]),
        method: "POST",
        body: module,
      },
    );

    if (response) {
      modules.value.push(response);
      return response;
    }
  }

  async function update(module: ModuleDocument) {
    const response: ModuleDocument = await $fetch<ModuleDocument>(
      `/api/modules`,
      {
        headers: useRequestHeaders(["cookie"]),
        method: "PUT",
        body: module,
      },
    );

    if (response) {
      await fetch();
      return response;
    }
  }

  async function remove(id: ObjectId) {
    const response: ModuleDocument = await $fetch<ModuleDocument>(
      `/api/modules/${id}`,
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

  function getById(id: ObjectId) {
    return modules.value.find((module) => module._id === id);
  }

  const get = computed(() => modules.value);

  return {
    modules,
    fetch,
    get,
    getById,
    create,
    update,
    remove,
  };
});
