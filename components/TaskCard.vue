<script setup lang="ts">
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  TASK_TYPES,
  type TaskPriority,
  type TaskStatus,
  type TaskType,
} from "~/server/constants/taskConstants";
import { capitalize } from "~/lib/utils";
import { CirclePlus, Loader2 } from "lucide-vue-next";
import type { TaskDocument } from "~/server/models/Task";
import { useToast } from "~/components/ui/toast";

const props = defineProps<{
  task: TaskDocument;
}>();

const tasks = useTasks();
const modules = useModules();
const { toast } = useToast();

const dialogOpen = ref(false);

const title = ref(props.task.title);
const module = ref<string | undefined>(props.task.module.toString());
const selectedModule = computed(
  () => modules.get.find((m) => m._id.toString() === module.value)?._id,
);
const type = ref<TaskType | "">(props.task.type);
const priority = ref<TaskPriority | "">(props.task.priority);
const status = ref<TaskStatus | "">(props.task.status);

const description = ref(props.task.description);
const effortEstimate = ref<number | undefined>(props.task.effortEstimate);
const dueDate = ref<Date | null>(
  props.task.dueDate ? new Date(props.task.dueDate) : null,
);

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
    props.task.title = title.value;
    props.task.module = selectedModule.value || props.task.module;
    props.task.type = type.value || "todo";
    props.task.priority = priority.value || "medium";
    if (props.task.status !== "done" && status.value === "done") {
      props.task.status = "done";
      props.task.resolution = true;
      props.task.resolutionDate = new Date();
    } else if (
      props.task.status === "done" &&
      status.value !== "" &&
      status.value !== "done"
    ) {
      props.task.status = status.value;
      props.task.resolution = false;
      props.task.resolutionDate = undefined;
    } else {
      props.task.status = status.value || "backlog";
    }
    props.task.description = description.value;
    props.task.effortEstimate = effortEstimate.value;
    props.task.dueDate = props.task.dueDate
      ? new Date(props.task.dueDate)
      : undefined;
    props.task.updatedAt = new Date();
    await tasks.update(props.task);

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
      <TaskCardTrigger :task="task" />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px] border-none">
      <DialogHeader>
        <DialogTitle>Edit task</DialogTitle>
        <DialogDescription></DialogDescription>
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
