<script setup lang="ts">
import KanbanBoard from "~/components/KanbanBoard.vue";

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="max-w-6xl py-10 mx-auto"></div>
</template>
