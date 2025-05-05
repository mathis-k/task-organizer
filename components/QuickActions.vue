<script setup lang="ts">
import { Brain, Clock9 } from "lucide-vue-next";
</script>

<template>
  <Card>
    <CardHeader class="flex justify-center">
      <CardTitle class="flex items-center gap-2">
        <Brain class="h-6 w-6 text-pink-400" />
        Quick actions
      </CardTitle>
    </CardHeader>
    <CardContent class="grid gap-4 lg:grid-cols-2">
      <AddModule />
      <AddTask />
      <NuxtLink to="/pomodoro">
        <Button variant="outline" class="w-full bg-card h-12 shadow-sm">
          <Clock9 class="mr-2 h-4 w-4" />
          Start pomodoro
        </Button>
      </NuxtLink>
      <AddCalendarEvent />
    </CardContent>
  </Card>
</template>
