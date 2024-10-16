<script setup lang="ts">
import { useTasksStore } from "~/stores/tasks";
import type { TaskDocument } from "~/server/models/Task";
import { ChevronUp, ChevronDown, Minus } from "lucide-vue-next";
import { Badge } from "~/components/ui/badge";

const props = defineProps<{
  task: TaskDocument;
}>();

const tasksStore = useTasksStore();

async function removeTask() {
  await tasksStore.remove(props.task._id);
}

function priorityIcon(priority: string) {
  switch (priority) {
    case "High":
      return ChevronUp;
    case "Medium":
      return Minus;
    case "Low":
      return ChevronDown;
    default:
      return Minus;
  }
}

function priorityColor(priority: string) {
  switch (priority) {
    case "High":
      return "text-red-500";
    case "Medium":
      return "text-gray-400";
    case "Low":
      return "text-gray-400";
    default:
      return "text-gray-400";
  }
}
</script>

<template>
  <Card class="bg-slate-800 text-white">
    <CardHeader class="flex justify-between items-center">
      <div>
        <CardTitle class="text-base font-normal">{{ task.title }}</CardTitle>
        <CardDescription class="text-sm text-gray-400">{{
          task.course
        }}</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      <div class="flex justify-between items-center">
        <component
          :is="priorityIcon(task.priority)"
          :class="priorityColor(task.priority)"
          class="w-5 h-5"
        />
        <span class="text-sm">{{
          task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No due date"
        }}</span>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped></style>
