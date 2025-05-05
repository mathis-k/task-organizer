<script setup lang="ts">
import { CirclePlus, Loader2 } from "lucide-vue-next";
import { useToast } from "~/components/ui/toast";
import type { ModuleDocument } from "~/server/models/Module";

const modules = useModules();
const { toast } = useToast();

const dialogOpen = ref(false);

const name = ref("");
const abbreviation = ref("");
const semester = ref("");
const color = ref("#0000FF");
const ects = ref<number | undefined>();

const isDisabled = computed(() => {
  return !name.value.trim() || isSubmitting.value;
});

const isSubmitting = ref(false);

async function handleSave() {
  isSubmitting.value = true;

  try {
    const module = {
      name: name.value,
      abbreviation: abbreviation.value,
      semester: semester.value,
      color: color.value,
      ects: ects.value,
    };
    const createdModule = await modules.create(module as ModuleDocument);
    if (!createdModule) {
      throw new Error("Failed to create module");
    }

    toast({
      title: "Module created",
      description: `Module "${name.value}" was successfully created.`,
    });

    name.value = "";
    abbreviation.value = "";
    semester.value = "";
    color.value = "#0000FF";
    ects.value = undefined;

    dialogOpen.value = false;
  } catch (error) {
    console.error("Error creating module:", error);
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
        Add module
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create module</DialogTitle>
        <DialogDescription>
          Create a module to manage your tasks, deadlines, homeworks, and exams.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div>
          <Label for="name">Name*</Label>
          <Input
            id="name"
            v-model="name"
            placeholder="e.g. Discrete Probability Theory"
            required
          />
        </div>

        <div class="grid gap-4 lg:grid-cols-2">
          <div>
            <Label for="abbreviation">Abbreviation</Label>
            <Input
              id="abbreviation"
              v-model="abbreviation"
              placeholder="e.g. DPT"
            />
          </div>

          <div>
            <Label for="semester">Semester</Label>
            <Input
              id="semester"
              v-model="semester"
              placeholder="e.g. WS23/24"
            />
          </div>
        </div>

        <div>
          <Label for="color">Color</Label>
          <Input id="color" v-model="color" type="color" />
        </div>

        <div>
          <Label for="ects">ECTS</Label>
          <Input
            id="ects"
            v-model="ects"
            type="number"
            min="0"
            max="30"
            step="1"
          />
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
