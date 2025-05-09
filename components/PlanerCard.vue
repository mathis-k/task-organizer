<script setup lang="ts">
import { CalendarSearch } from "lucide-vue-next";
</script>

<template>
  <Card>
    <CardHeader class="flex justify-center">
      <CardTitle class="flex items-center gap-2">
        <CalendarSearch class="h-6 w-6 text-yellow-400" />
        Planner
      </CardTitle>
    </CardHeader>
    <CardContent class="grid gap-4 lg:grid-cols-2">
      <div class="border rounded-xl p-4 shadow-sm">
        <h3 class="text-sm text-muted-foreground text-center mb-2">
          Days until first exam
        </h3>
        <p class="text-3xl font-bold text-center">tbd</p>
      </div>

      <div class="border rounded-xl p-4 shadow-sm">
        <h3 class="text-sm text-muted-foreground text-center mb-2">
          Next event
        </h3>
        <p class="text-center">tbd</p>
      </div>
    </CardContent>
  </Card>
</template>
