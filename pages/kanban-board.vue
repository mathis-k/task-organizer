<script setup lang="ts">
import type { TaskDocument } from "~/server/models/Task";
import { X } from "lucide-vue-next";
import {
  TASK_TYPES,
  TASK_PRIORITIES,
  type TaskType,
  type TaskPriority,
} from "~/server/constants/taskConstants";
import { capitalize } from "~/lib/utils";

definePageMeta({
  middleware: "auth",
});
const tasks = useTasks();
const modules = useModules();

await useAsyncData("tasks", () => tasks.fetch().then(() => true));
await useAsyncData("modules", () => modules.fetch().then(() => true));

const module = ref<string | undefined>();
const selectedModule = computed(() =>
  modules.get.find((m) => m._id.toString() === module.value),
);
const selectedPriority = ref<TaskPriority | "">("");
const selectedType = ref<TaskType | "">("");

const filter = ((task: TaskDocument) => {
  if (selectedModule.value && task.module !== selectedModule.value._id) {
    return false;
  }
  if (selectedPriority.value && task.priority !== selectedPriority.value) {
    return false;
  }
  if (selectedType.value && task.type !== selectedType.value) {
    return false;
  }
  return true;
}) as (task: TaskDocument) => boolean;

const backlogTasks = computed(() => {
  return tasks.get
    .filter((task) => task.status === "backlog" && filter(task))
    .sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return dateA - dateB;
    });
});
const plannedTasks = computed(() => {
  return tasks.get
    .filter((task) => task.status === "planned" && filter(task))
    .sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return dateA - dateB;
    });
});
const activeTasks = computed(() => {
  return tasks.get
    .filter((task) => task.status === "active" && filter(task))
    .sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return dateA - dateB;
    });
});
const thisWeekTasks = computed(() => {
  return tasks.get
    .filter((task) => task.status === "this week" && filter(task))
    .sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return dateA - dateB;
    });
});
const doneTasks = computed(() => {
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  return tasks.get
    .filter(
      (task) =>
        task.status === "done" &&
        filter(task) &&
        task.resolutionDate &&
        new Date(task.resolutionDate) >= twoWeeksAgo,
    )
    .sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return dateA - dateB;
    });
});
</script>

<template>
  <div class="mb-4">
    <h1 class="text-2xl font-bold mb-4">Kanban Board</h1>
    <div class="flex mb-4 gap-2">
      <AddTask />
      <Select v-model="module">
        <SelectTrigger
          class="h-12 bg-card border rounded-md px-4 w-[160px] shadow-sm flex items-center justify-between"
        >
          <SelectValue class="text-muted-foreground" placeholder="Module" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="(mod, index) in modules.get"
              :key="index"
              :value="mod._id.toString()"
            >
              {{ mod.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        v-if="module !== undefined"
        variant="outline"
        class="bg-card h-12 shadow-sm"
        @click="module = undefined"
      >
        <X class="text-muted-foreground" />
      </Button>
      <Select v-model="selectedPriority">
        <SelectTrigger
          class="h-12 bg-card border rounded-md px-4 w-[160px] shadow-sm flex items-center justify-between"
        >
          <SelectValue class="text-muted-foreground" placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="priority in TASK_PRIORITIES"
              :key="priority"
              :value="priority"
            >
              {{ capitalize(priority) }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        v-if="selectedPriority !== ''"
        variant="outline"
        class="bg-card h-12 shadow-sm"
        @click="selectedPriority = ''"
      >
        <X class="text-muted-foreground" />
      </Button>
      <Select v-model="selectedType">
        <SelectTrigger
          class="h-12 bg-card border rounded-md px-4 w-[160px] shadow-sm flex items-center justify-between"
        >
          <SelectValue class="text-muted-foreground" placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="type in TASK_TYPES" :key="type" :value="type">
              {{ capitalize(type) }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        v-if="selectedType !== ''"
        variant="outline"
        class="bg-card h-12 shadow-sm"
        @click="selectedType = ''"
      >
        <X class="text-muted-foreground" />
      </Button>
    </div>
  </div>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-5">
    <div class="relative rounded-lg bg-card p-4 space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-medium leading-tight">Backlog</h3>
        <span class="text-xs text-muted-foreground">
          {{ backlogTasks.length }}
        </span>
      </div>
      <TaskCard
        v-for="task in backlogTasks"
        :key="task._id.toString()"
        :task="task"
      />
    </div>
    <div class="relative rounded-lg bg-card p-4 space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-medium leading-tight">Planned</h3>
        <span class="text-xs text-muted-foreground">
          {{ plannedTasks.length }}
        </span>
      </div>
      <TaskCard
        v-for="task in plannedTasks"
        :key="task._id.toString()"
        :task="task"
      />
    </div>
    <div class="relative rounded-lg bg-card p-4 space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-medium leading-tight">This week</h3>
        <span class="text-xs text-muted-foreground">
          {{ thisWeekTasks.length }}
        </span>
      </div>
      <TaskCard
        v-for="task in thisWeekTasks"
        :key="task._id.toString()"
        :task="task"
      />
    </div>
    <div class="relative rounded-lg bg-card p-4 space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-medium leading-tight">Active</h3>
        <span class="text-xs text-muted-foreground">
          {{ activeTasks.length }}
        </span>
      </div>
      <TaskCard
        v-for="task in activeTasks"
        :key="task._id.toString()"
        :task="task"
      />
    </div>
    <div class="relative rounded-lg bg-card p-4 space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-medium leading-tight">Done</h3>
        <span class="text-xs text-muted-foreground">
          {{ doneTasks.length }}
        </span>
      </div>
      <TaskCard
        v-for="task in doneTasks"
        :key="task._id.toString()"
        :task="task"
      />
    </div>
  </div>
</template>
