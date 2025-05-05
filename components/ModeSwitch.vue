<script setup lang="ts">
import { Sun, Moon } from "lucide-vue-next";
import { useTheme } from "~/composables/useTheme";
const { theme, toggleTheme } = useTheme();
</script>

<template>
  <div class="flex items-center space-x-2">
    <Sun
      v-if="theme !== 'light'"
      class="bg-background rounded text-yellow-400"
    />
    <Moon v-else class="text-gray-700" />
    <Switch
      @click="toggleTheme"
      :class="[
        'bg-white',
        'data-[state=checked]:bg-white',
        'transition-colors',
      ]"
    />
  </div>
</template>
