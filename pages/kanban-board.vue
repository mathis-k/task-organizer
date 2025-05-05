<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const tasks = useTasks();
const modules = useModules();

await useAsyncData("tasks", () => tasks.fetch().then(() => true));
await useAsyncData("modules", () => modules.fetch().then(() => true));

const selectedModule = ref<string | null>(null);
const selectedPriority = ref<string | null>(null);
const selectedType = ref<string | null>(null);

const filteredTasks = computed(() => {
  return tasks.get.filter((task) => {});
});

const backlogTasks = computed(() => {
  return filteredTasks.value.filter((task) => task.status === "backlog");
});
const plannedTasks = computed(() => {
  return filteredTasks.value.filter((task) => task.status === "planned");
});
const activeTasks = computed(() => {
  return filteredTasks.value.filter((task) => task.status === "active");
});
const thisWeekTasks = computed(() => {
  return filteredTasks.value.filter((task) => task.status === "this week");
});
const doneTasks = computed(() => {
  return filteredTasks.value.filter((task) => task.status === "done");
});
</script>

<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-5">
    <div class="relative rounded-xl bg-card p-4 space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-medium leading-tight">Backlog</h3>
        <span class="text-xs text-muted-foreground">{{
          backlogTasks.length
        }}</span>
      </div>
      <TaskCard
        v-for="(task, index) in backlogTasks"
        :key="index"
        :task="task"
      />
    </div>
    <div class="relative rounded-xl bg-card p-4 space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-medium leading-tight">Planned</h3>
        <span class="text-xs text-muted-foreground">
          {{ plannedTasks.length }}
        </span>
      </div>
      <TaskCard
        v-for="(task, index) in plannedTasks"
        :key="index"
        :task="task"
      />
    </div>
    <div class="relative rounded-xl bg-card p-4 space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-medium leading-tight">Active</h3>
        <span class="text-xs text-muted-foreground">
          {{ activeTasks.length }}
        </span>
      </div>
      <TaskCard
        v-for="(task, index) in activeTasks"
        :key="index"
        :task="task"
      />
    </div>
    <div class="relative rounded-xl bg-card p-4 space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-medium leading-tight">This week</h3>
        <span class="text-xs text-muted-foreground">
          {{ thisWeekTasks.length }}
        </span>
      </div>
      <TaskCard
        v-for="(task, index) in thisWeekTasks"
        :key="index"
        :task="task"
      />
    </div>
    <div class="relative rounded-xl bg-card p-4 space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-medium leading-tight">Done</h3>
        <span class="text-xs text-muted-foreground">
          {{ doneTasks.length }}
        </span>
      </div>
      <TaskCard v-for="(task, index) in doneTasks" :key="index" :task="task" />
    </div>
  </div>
</template>
