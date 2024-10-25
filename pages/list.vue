<script setup lang="ts">
import { useTasksStore } from "~/stores/tasks";
import { columns } from "~/components/tasks/columns";
import DataTable from "~/components/tasks/data-table.vue";
import { useAsyncData } from "#app";

const taskStore = useTasksStore();
const data = computed(() => taskStore.tasks);

await useAsyncData("tasks", () => taskStore.fetch().then(() => true));
</script>

<template>
  <div class="container max-w-6xl py-10 mx-auto">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
  padding: 24px;
}
</style>
