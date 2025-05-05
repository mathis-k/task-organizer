<script setup lang="ts">
import { CirclePlus, Loader2 } from "lucide-vue-next";
import { useToast } from "~/components/ui/toast";
import {
  TASK_TYPES,
  TASK_STATUSES,
  TASK_PRIORITIES,
  type TaskType,
  type TaskStatus,
  type TaskPriority,
} from "~/server/constants/taskConstants";
import { capitalize } from "~/lib/utils";
import type { TaskDocument } from "~/server/models/Task";

const tasks = useTasks();
const modules = useModules();
const { toast } = useToast();

const dialogOpen = ref(false);

const title = ref("");
const module = ref<string | undefined>();
const selectedModule = computed(
  () => modules.get.find((m) => m._id.toString() === module.value)?._id,
);
const type = ref<TaskType | "">("");
const priority = ref<TaskPriority | "">("");
const status = ref<TaskStatus | "">("");

const description = ref("");
const effortEstimate = ref<number | undefined>();
const dueDate = ref<Date | null>(null);

const isDisabled = computed(() => {
  return (
    !title.value.trim() ||
    !module.value ||
    !type.value ||
    !priority.value ||
    !status.value ||
    isSubmitting.value
  );
});

const isSubmitting = ref(false);

async function handleSave() {
  isSubmitting.value = true;

  try {
    const task = {
      title: title.value,
      module: selectedModule.value,
      type: type.value,
      priority: priority.value,
      status: status.value,
      description: description.value,
      effortEstimate: effortEstimate.value,
      dueDate: dueDate.value,
    };
    const createdTask = await tasks.create(task as TaskDocument);
    if (!createdTask) {
      throw new Error("Failed to create task");
    }

    toast({
      title: "Task created",
      description: `Task "${title.value}" was successfully created.`,
    });

    title.value = "";
    module.value = undefined;
    type.value = "";
    priority.value = "";
    status.value = "";
    description.value = "";
    effortEstimate.value = undefined;
    dueDate.value = null;

    dialogOpen.value = false;
  } catch (error) {
    console.error("Error creating task:", error);
    toast({
      title: "Error",
      description: (error as Error).message,
      variant: "destructive",
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child>
      <Button variant="outline" class="bg-card h-12 shadow-sm">
        <CirclePlus class="mr-2 h-4 w-4" />
        Create task
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create task</DialogTitle>
        <DialogDescription>
          Fill in the details below to add a task to your module – e.g. a to-do,
          learning goal, or homework.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div>
          <Label for="title">Title*</Label>
          <Input id="title" v-model="title" required />
        </div>

        <div>
          <Label for="module">Module</Label>
          <Select id="module" v-model="module">
            <SelectTrigger>
              <SelectValue
                class="text-muted-foreground"
                placeholder="Pick a module"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="(mod, index) in modules.get"
                  :key="index"
                  :value="mod._id.toString()"
                >
                  {{ mod.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label for="type">Type</Label>
          <Select id="type" v-model="type">
            <SelectTrigger>
              <SelectValue
                class="text-muted-foreground"
                placeholder="Pick a type"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="type in TASK_TYPES"
                  :key="type"
                  :value="type"
                >
                  {{ capitalize(type) }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label for="dueDate">Due Date</Label>
          <DatePicker id="dueDate" v-model="dueDate" />
        </div>

        <div class="grid gap-4 lg:grid-cols-2">
          <div>
            <Label for="status">Status</Label>
            <Select id="status" v-model="status">
              <SelectTrigger>
                <SelectValue
                  class="text-muted-foreground"
                  placeholder="Pick a status"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="status in TASK_STATUSES"
                    :key="status"
                    :value="status"
                  >
                    {{ capitalize(status) }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label for="priority">Priority</Label>
            <Select id="priority" v-model="priority">
              <SelectTrigger>
                <SelectValue
                  class="text-muted-foreground"
                  placeholder="Pick a priority"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="priority in TASK_PRIORITIES"
                    :key="priority"
                    :value="priority"
                  >
                    {{ capitalize(priority) }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label for="effortEstimate">Estimated Effort</Label>
          <Input
            id="effortEstimate"
            v-model="effortEstimate"
            type="number"
            min="0"
            max="100"
            step="10"
          />
        </div>

        <div>
          <Label for="description">Description</Label>
          <Textarea id="description" v-model="description" />
        </div>
      </div>
      <DialogFooter>
        <Button :disabled="isDisabled" type="submit" @click="handleSave">
          <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
          <span v-else>Save</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
