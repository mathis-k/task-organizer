<script setup lang="ts">
definePageMeta({
  title: "Home",
  middleware: "auth",
});
const tasks = useTasks();
const modules = useModules();

await useAsyncData("tasks", () => tasks.fetch().then(() => true));
await useAsyncData("modules", () => modules.fetch().then(() => true));
</script>

<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <QuickActions />
    <Overview />
    <PlanerCard />
    <div class="col-span-1 lg:col-span-3">
      <Card>
        <CardHeader>
          <CardTitle class="text-center">Dashboard</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-4"></CardContent>
      </Card>
    </div>
  </div>
</template>
