<script setup lang="ts">
import { useTasksStore } from "~/stores/tasks";
import type { TaskDocument } from "~/server/models/Task";
import { ChevronUp, ChevronDown, Minus, ExternalLink } from "lucide-vue-next";

const props = defineProps<{
  task: TaskDocument;
}>();

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
  <Card
    class="bg-slate-800 text-white border-none relative transition-transform duration-200 ease-in-out hover:shadow-lg hover:scale-100"
  >
    <CardHeader class="flex justify-between items-center">
      <div>
        <CardTitle
          class="text-base font-normal"
          :class="{ 'line-through text-green-400': task.status === 'Done' }"
          >{{ task.title }}</CardTitle
        >
        <CardDescription class="text-sm text-gray-400">{{
          task.course
        }}</CardDescription>
      </div>
    </CardHeader>
    <a
      v-if="task.link"
      :href="task.link"
      target="_blank"
      rel="noopener noreferrer"
      class="absolute top-2 right-2"
    >
      <ExternalLink class="w-5 h-5 text-gray-400 hover:text-gray-200" />
    </a>
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
