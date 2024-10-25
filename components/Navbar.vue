<script setup lang="ts">
import { ListTodo } from "lucide-vue-next";

const { data } = useAuth();
const isCollapsed = ref(true);
</script>

<template>
  <div v-if="data?.user" :data-collapsed="isCollapsed">
    <nav class="bg-background border-b border-border py-4">
      <div class="container mx-auto flex items-center justify-between px-6">
        <div class="flex items-center space-x-4">
          <ListTodo class="w-8 h-8 text-foreground" />
          <span class="text-xl font-bold text-foreground">
            Mathis' Task Organizer
          </span>
        </div>

        <div class="flex items-center space-x-6">
          <CreateTask />
          <Links />
          <User />
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped></style>
