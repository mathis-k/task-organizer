<script setup lang="ts">
import { computed } from "vue";
import { useTasksStore } from "~/stores/tasks";

const props = defineProps({
  status: String,
  title: String,
});

const taskStore = useTasksStore();
const draggedTask = ref(null);

const priorityOrder = {
  High: 1,
  Medium: 2,
  Low: 3,
};
const tasks = computed(() => {
  return taskStore.tasks
    .filter((task) => task.status === props.status)
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
});

function onDragStart(task) {
  draggedTask.value = task;
}

function onDrop() {
  if (draggedTask.value) {
    taskStore.updateTaskStatus(draggedTask.value.id, props.status);
    draggedTask.value = null;
  }
}
</script>
<template>
  <div class="kanban-column" @dragover.prevent @drop="onDrop">
    <h3 class="column-title">{{ title }}</h3>
    <div
      v-for="task in tasks"
      :key="task.id"
      class="task-card-wrapper"
      draggable="true"
      @dragstart="onDragStart(task)"
    >
      <TaskCard :task="task" />
    </div>
  </div>
</template>

<style scoped>
.kanban-column {
  flex: 1;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #2f363d;
}
.column-title {
  font-size: 1.2rem;
  margin-bottom: 25px;
}
.task-card-wrapper {
  margin-bottom: 5px;
}
</style>
