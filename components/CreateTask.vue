<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { useToast } from "~/components/ui/toast";
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import type {TaskDocument} from "~/server/models/Task";

const { toast } = useToast();
const taskStore = useTasksStore()

const taskData = ref ({
  title: '',
  description: '',
  status: 'Backlog',
  priority: 'Medium',
  course: '',
  link: '',
  dueDate: null,
})

const formSchema = toTypedSchema(z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(["Backlog", "Working On", "Done"], {
    errorMap: () => ({ message: "Status must be Backlog, Working On, or Done" }),
  }),
  priority: z.enum(["Low", "Medium", "High"], {
    errorMap: () => ({ message: "Priority must be Low, Medium, or High" }),
  }),
  course: z.string(),
  link: z.string().url().optional(),
  dueDate: z.preprocess((val) => {
    return typeof val === 'string' ? new Date(val) : val;
  }, z.date().optional())
}))

async function onSubmit(values: any) {
  try {
    if (taskData.value.dueDate) {
      taskData.value.dueDate = new Date(taskData.value.dueDate);
    }
    const createdTask = await taskStore.create(taskData.value as TaskDocument);
    toast({
      title: 'Task created successfully!',
      description: createdTask.title,
      variant: 'default',
    });
  } catch (error) {
    toast({
      title: 'Failed to create task',
      description: error.message,
      variant: 'destructive',
    });
  }
}
</script>

<template>
  <Form v-slot="{ submitForm }" as="" :validation-schema="formSchema" @submit.prevent="onSubmit">
    <Dialog>
      <DialogTrigger as-child>
        <Button>
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[600px]">

        <form @submit.prevent="onSubmit">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Task Title" v-bind="componentField" v-model="taskData.title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Task Description" v-bind="componentField" v-model="taskData.description" />
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
                      <SelectItem value="Backlog">
                        Backlog
                      </SelectItem>
                      <SelectItem value="Working On">
                        Working On
                      </SelectItem>
                      <SelectItem value="Done">
                        Done
                      </SelectItem>
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
                      <SelectItem value="Low">
                        Low
                      </SelectItem>
                      <SelectItem value="Medium">
                        Medium
                      </SelectItem>
                      <SelectItem value="High">
                        High
                      </SelectItem>
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
                <Input type="text" placeholder="Course Name" v-bind="componentField" v-model="taskData.course" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="link">
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com" v-bind="componentField" v-model="taskData.link" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="dueDate">
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" v-bind="componentField" v-model="taskData.dueDate" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="mb-6"></div>

          <DialogFooter>
            <Button type="submit">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </Form>
</template>
