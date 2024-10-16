<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks';
import type { TaskDocument } from '~/server/models/Task';
import { Trash2  } from 'lucide-vue-next';
import { Badge } from "~/components/ui/badge";

const props = defineProps<{
  task: TaskDocument;
}>();

const tasksStore = useTasksStore();

async function removeTask() {
  await tasksStore.remove(props.task._id);
}

function priorityColor(priority: string) {
  switch (priority) {
    case 'High':
      return 'bg-red-500 text-white';
    case 'Medium':
      return 'bg-yellow-400 text-black';
    case 'Low':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-400 text-white';
  }
}
</script>

<template>
  <Card class="bg-slate-800 text-white">
    <CardHeader class="flex justify-between items-center">
      <div>
        <CardTitle>{{ task.title }}</CardTitle>
        <CardDescription>{{ task.description || 'No description' }}</CardDescription>
      </div>
      <Button variant="destructive" size="icon" @click="removeTask">
        <Trash2  class="h-5 w-5" />
      </Button>
    </CardHeader>

    <CardContent>
      <div class="flex justify-between items-center">
        <Badge :class="priorityColor(task.priority)">
          {{ task.priority }}
        </Badge>
        <span>{{ task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date' }}</span>
      </div>
    </CardContent>

    <CardFooter>
      <Button variant="default" size="sm">
        View Details
      </Button>
    </CardFooter>
  </Card>
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
