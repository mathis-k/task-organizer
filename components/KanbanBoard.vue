<script setup lang="ts">
import KanbanColumn from "./KanbanColumn.vue";

const columns = [
  { status: "Backlog", title: "Backlog" },
  { status: "Working On", title: "Working On" },
  { status: "Done", title: "Done" },
];
</script>

<template>
  <div class="kanban-board">
    <KanbanColumn
      v-for="column in columns"
      :key="column.status"
      :status="column.status"
      :title="column.title"
    />
  </div>
</template>

<style scoped>
.kanban-board {
  display: flex;
  gap: 20px;
}
</style>
