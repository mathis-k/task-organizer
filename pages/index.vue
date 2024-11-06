<script setup lang="ts">
import KanbanBoard from "~/components/KanbanBoard.vue";

definePageMeta({
  middleware: "auth",
});
console.log("Welcome to Mathis' Kanban Board");
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
