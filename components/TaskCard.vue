<script setup lang="ts">
import { useTasksStore } from "~/stores/tasks";
import type { TaskDocument } from "~/server/models/Task";
import {
  ChevronUp,
  ChevronDown,
  Minus,
  ExternalLink,
  Trash2,
} from "lucide-vue-next";
import { useToast } from "~/components/ui/toast";
import { Loader2 } from "lucide-vue-next";
import { Input } from "@/components/ui/input";

const props = defineProps<{
  task: TaskDocument;
}>();

const { toast } = useToast();
const taskStore = useTasksStore();

const dialogOpen = ref(false);
const isSubmitting = ref(false);

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

function cancel() {
  isDialogOpen.value = false;
}

async function deleteTask() {
  isSubmitting.value = true;
  try {
    const deletedTask = await taskStore.remove(props.task._id);
    if (deletedTask) {
      toast({
        title: "Task deleted successfully!",
        description: deletedTask.title,
        variant: "default",
      });
      dialogOpen.value = false;
    } else {
      toast({
        title: "Failed to delete task",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: "Failed to delete task",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    isSubmitting.value = false;
  }
}

async function updateTask() {
  isSubmitting.value = true;
  try {
    if (props.task.dueDate) {
      props.task.dueDate = new Date(props.task.dueDate);
    }
    const newTask = await taskStore.update(props.task);
    if (newTask) {
      toast({
        title: "Task updated successfully!",
        description: newTask.title,
        variant: "default",
      });
      dialogOpen.value = false;
    } else {
      toast({
        title: "Failed to update task",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: "Failed to update task",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <Dialog v-model:open="dialogOpen" class="border-none">
    <DialogTrigger as-child>
      <Card
        @click="dialogOpen = true"
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
          @click="dialogOpen = false"
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
    </DialogTrigger>
    <DialogContent class="sm:max-w-[600px] border-none">
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        Title
        <Input type="text" placeholder="Task Title" v-model="task.title" />
        Description
        <Input
          type="text"
          placeholder="Task Description"
          v-model="task.description"
        />
        Status
        <Select v-model="task.status">
          <SelectTrigger>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Backlog"> Backlog </SelectItem>
              <SelectItem value="Working On"> Working On </SelectItem>
              <SelectItem value="Done"> Done </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        Priority
        <Select v-model="task.priority">
          <SelectTrigger>
            <SelectValue placeholder="Select a priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="High"> High </SelectItem>
              <SelectItem value="Medium"> Medium </SelectItem>
              <SelectItem value="Low"> Low </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        Course
        <Input type="text" placeholder="Course" v-model="task.course" />
        Link
        <Input
          type="url"
          placeholder="https://example.com"
          v-model="task.link"
        />
        Due Date
        <Input type="date" v-model="task.dueDate" />
      </div>
      <DialogFooter class="relative">
        <Button
          variant="destructive"
          :disabled="isSubmitting"
          @click.prevent="deleteTask"
          class="absolute left-0 bottom-0 p-2"
        >
          <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
          <Trash2 class="w-5 h-5" />
        </Button>
        <Button
          type="submit"
          :disabled="isSubmitting"
          @click.prevent="updateTask"
          class="ml-auto"
        >
          <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
          <span v-else>Save changes</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
