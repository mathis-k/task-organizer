<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { useToast } from "~/components/ui/toast";
import type { TaskDocument } from "~/server/models/Task";
import { Loader2 } from "lucide-vue-next";

const { toast } = useToast();
const taskStore = useTasksStore();

const dialogOpen = ref(false);

const taskData = ref({
  title: "",
  description: "",
  status: "Backlog",
  priority: "Medium",
  course: "",
  link: "",
  dueDate: null,
});

const isSubmitting = ref(false);
const isFormValid = computed(() => {
  return (
    taskData.value.title.trim() !== "" &&
    ["Backlog", "Working On", "Done"].includes(taskData.value.status) &&
    ["Low", "Medium", "High"].includes(taskData.value.priority) &&
    taskData.value.course.trim() !== "" &&
    (!taskData.value.link ||
      /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(taskData.value.link)) &&
    (!taskData.value.dueDate || true)
  );
});

async function submit() {
  isSubmitting.value = true;
  try {
    if (taskData.value.dueDate) {
      taskData.value.dueDate = new Date(taskData.value.dueDate);
    }
    const createdTask = await taskStore.create(taskData.value as TaskDocument);
    toast({
      title: "Task created successfully!",
      description: createdTask.title,
      variant: "default",
    });
    taskData.value = {
      title: "",
      description: "",
      status: "Backlog",
      priority: "Medium",
      course: "",
      link: "",
      dueDate: null,
    };
    await taskStore.fetch();
    dialogOpen.value = false;
  } catch (error) {
    toast({
      title: "Failed to create task",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <Form>
    <Dialog v-model:open="dialogOpen">
      <DialogTrigger as-child>
        <Button @click="dialogOpen = true"> Create Task </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[600px]">
        <form @submit.prevent="submit">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Task Title"
                  v-bind="componentField"
                  v-model="taskData.title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Task Description"
                  v-bind="componentField"
                  v-model="taskData.description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="status">
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select v-bind="componentField" v-model="taskData.status">
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
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="priority">
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Select v-bind="componentField" v-model="taskData.priority">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Low"> Low </SelectItem>
                      <SelectItem value="Medium"> Medium </SelectItem>
                      <SelectItem value="High"> High </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="course">
            <FormItem>
              <FormLabel>Course</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Course Name"
                  v-bind="componentField"
                  v-model="taskData.course"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="link">
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com"
                  v-bind="componentField"
                  v-model="taskData.link"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="dueDate">
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  v-bind="componentField"
                  v-model="taskData.dueDate"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="mb-6"></div>

          <DialogFooter>
            <Button
              type="submit"
              :disabled="isSubmitting || !isFormValid"
              @click.prevent="submit"
            >
              <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
              <span v-else>Create</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </Form>
</template>
