<script setup lang="ts">
import { useTasksStore } from "~/stores/tasks";
import { useAsyncData } from "#app";
import KanbanBoard from "~/components/KanbanBoard.vue";

definePageMeta({
  middleware: "auth",
});

const tasks = useTasksStore();
await useAsyncData("tasks", () => tasks.fetch().then(() => true));
</script>

<template>
  <div class="container mx-auto mt-12">
    <KanbanBoard />
  </div>
</template>

<style scoped>
.container {
  margin-top: 3rem;
}
</style>
