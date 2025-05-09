<script setup lang="ts">
import { ChartColumn } from "lucide-vue-next";

const tasks = useTasks();
const stats = tasks.stats;
</script>

<template>
  <Card>
    <CardHeader class="flex justify-center">
      <CardTitle class="flex items-center gap-2">
        <ChartColumn class="h-6 w-6 text-blue-400" />
        Weekly Overview
      </CardTitle>
    </CardHeader>
    <CardContent class="grid gap-4 lg:grid-cols-3">
      <div>
        <div>
          <h2 class="text-lg font-bold text-center">
            {{ stats.dueToday }}
          </h2>
        </div>
        <p class="text-sm text-muted-foreground text-center">Due today</p>
      </div>
      <div>
        <div>
          <h2 class="text-lg font-bold text-center">
            {{ stats.dueThisWeek }}
          </h2>
        </div>
        <p class="text-sm text-muted-foreground text-center">Due this week</p>
      </div>
      <div>
        <div>
          <h2
            class="text-lg font-bold text-center"
            :class="{ 'text-green-400': stats.doneThisWeek > 0 }"
          >
            {{ stats.doneThisWeek }}
          </h2>
        </div>
        <p class="text-sm text-muted-foreground text-center">Done this week</p>
      </div>
      <div>
        <div>
          <h2 class="text-lg font-bold text-center">
            {{ stats.openHomework }}
          </h2>
        </div>
        <p class="text-sm text-muted-foreground text-center">
          Open assignments
        </p>
      </div>
      <div>
        <div>
          <h2 class="text-lg font-bold text-center">
            {{ stats.openLearningObjective }}
          </h2>
        </div>
        <p class="text-sm text-muted-foreground text-center">Learning goals</p>
      </div>
      <div>
        <div>
          <h2
            class="text-lg font-bold text-center"
            :class="{ 'text-destructive': stats.overdue > 0 }"
          >
            {{ stats.overdue }}
          </h2>
        </div>
        <p class="text-sm text-muted-foreground text-center">Overdue</p>
      </div>
    </CardContent>
  </Card>
</template>
