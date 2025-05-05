<script setup lang="ts">
import {
  type DateValue,
  DateFormatter,
  getLocalTimeZone,
  fromDate,
} from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";
import { computed } from "vue";
import { cn } from "~/lib/utils";

const props = defineProps<{
  modelValue: Date | null;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Date | null): void;
}>();

const df = new DateFormatter("en-US", { dateStyle: "long" });

function toDateValue(date: Date): DateValue {
  return fromDate(date, getLocalTimeZone());
}

function toDate(dateValue: DateValue): Date {
  return dateValue.toDate(getLocalTimeZone());
}

const internalValue = computed({
  get: () => (props.modelValue ? toDateValue(props.modelValue) : undefined),
  set: (val) => emit("update:modelValue", val ? toDate(val) : null),
});
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        class="w-full justify-start text-left font-normal"
        :class="!props.modelValue && 'text-muted-foreground'"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ props.modelValue ? df.format(props.modelValue) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="internalValue" initial-focus />
    </PopoverContent>
  </Popover>
</template>
