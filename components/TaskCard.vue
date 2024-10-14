<script setup lang="ts">
import { useTasksStore } from "~/stores/tasks";
import type { TaskDocument } from "~/server/models/Task";

const props = defineProps<{
  task: TaskDocument;
  onStatusChange: (task: TaskDocument, newStatus: string) => void;
}>();

const tasksStore = useTasksStore();

// Drag & Drop Handlers
function handleDragStart(event: DragEvent) {
  event.dataTransfer?.setData("text/plain", props.task._id.toString());
}

function handleDrop(event: DragEvent) {
  const taskId = event.dataTransfer?.getData("text/plain");
  const newStatus = props.task.status; // Hier müsstest du den neuen Status basierend auf der Drop-Position bestimmen
  if (taskId) {
    tasksStore.update({ ...props.task, status: newStatus });
    props.onStatusChange(props.task, newStatus);
  }
}

function openEditModal() {
  // Hier kannst du den Code zum Öffnen des Edit-Modals hinzufügen
}

async function removeTask() {
  await tasksStore.remove(props.task._id);
}
</script>

<template>
  <div
      class="task-card"
      draggable="true"
      @dragstart="handleDragStart"
      @dragover.prevent
      @drop="handleDrop"
  >
    <h3 class="task-title">{{ task.title }}</h3>
    <p class="task-description">{{ task.description }}</p>
    <div class="task-details">
      <span class="task-priority">Priority: {{ task.priority }}</span>
      <span class="task-due-date">Due: {{ formatDueDate(task.dueDate) }}</span>
    </div>
    <div class="task-actions">
      <button @click="openEditModal">Edit</button>
      <button @click="removeTask">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: background-color 0.3s;
}

.task-title {
  font-weight: bold;
  margin: 0;
}

.task-description {
  margin: 0.5rem 0;
}

.task-details {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.task-actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}
</style>
