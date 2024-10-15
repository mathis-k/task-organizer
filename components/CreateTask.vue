<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { useToast } from "~/components/ui/toast";
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const { toast } = useToast();
const taskStore = useTasksStore()

const formSchema = toTypedSchema(z.object({
  title: z.string(),
  description: z.string().optional(),
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
  console.log(values)
  try {
    if (values.dueDate) {
      values.dueDate = new Date(values.dueDate);
    }
    const createdTask = await taskStore.create(values)
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

        <form @submit.prevent="submitForm">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Task Title" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Task Description" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="priority">
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Select v-bind="componentField">
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
                <Input type="text" placeholder="Course Name" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="link">
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="dueDate">
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" v-bind="componentField" />
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
