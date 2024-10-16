<script setup lang="ts">
import {useTasksStore} from "~/stores/tasks";
import {useAsyncData} from "#app";

definePageMeta({
  middleware: "auth",
});

const tasks = useTasksStore();
await useAsyncData("tasks", () => tasks.fetch().then(() => true));
</script>

<template>
  <div v-for="task in tasks.tasks" class="tasks-container">
    <TaskCard :task="task" />
  </div>
</template>

<style scoped>

</style>