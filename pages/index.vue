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
</template>

<style scoped>

</style>