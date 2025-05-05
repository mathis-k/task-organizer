<script setup lang="ts">
import {
  ChevronsDown,
  Equal,
  ChevronsUp,
  CircleCheckBig,
  Award,
} from "lucide-vue-next";
import { capitalize } from "~/lib/utils";
import type { TaskDocument } from "~/server/models/Task";

const props = defineProps<{
  task: TaskDocument;
}>();

const modules = useModules();
const module = modules.get.find((m) => m._id === props.task.module);

const dateToString = (date: Date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

const priorityIcon = {
  low: ChevronsDown,
  medium: Equal,
  high: ChevronsUp,
};

const typeColors = {
  exercise: "#4B5563", // gray-600
  "learning objective": "#3B82F6", // yellow-400
  homework: "#F43F5E", // rose-500
  project: "#3B82F6", // blue-500
  exam: "#4ADE80", // green-400
};
</script>

<template>
  <div
    class="relative rounded-xl border border-border bg-card p-4 shadow-sm space-y-2 hover:ring-1 transition w-full"
  >
    <div
      class="text-xs text-muted-foreground flex justify-between items-center"
    >
      <span v-if="task.dueDate">{{ dateToString(task.dueDate) }}</span>
      <Award class="h-3 w-3" />
    </div>

    <h3 class="text-base font-medium leading-tight truncate">
      {{ task.title }}
    </h3>

    <div class="flex flex-wrap gap-2 text-xs items-center">
      <span
        class="px-1.5 py-0.5 rounded text-[10px]"
        :style="{
          backgroundColor: typeColors[task.type],
          color: '#ffffff',
        }"
      >
        {{ capitalize(task.type) }}
      </span>

      <span
        class="px-1.5 py-0.5 rounded-full text-[10px]"
        v-if="module?.abbreviation"
        :style="{
          backgroundColor: module.color + '20',
          color: module.color,
        }"
        :title="module.name"
      >
        {{ module.abbreviation }}
      </span>

      <component
        :is="priorityIcon[task.priority]"
        class="h-4 w-4 text-muted-foreground"
        :title="`Priority: ${task.priority}`"
      />

      <CircleCheckBig
        class="h-4 w-4 absolute bottom-2 right-2 mr-2"
        :class="task.resolution ? 'text-green-700' : 'text-gray-200'"
      />
    </div>
  </div>
</template>
