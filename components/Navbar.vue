<script setup lang="ts">
const { data } = useAuth();
const isCollapsed = ref(true);
</script>

<template>
  <div v-if="data?.user" :data-collapsed="isCollapsed">
    <nav class="bg-background border-b border-border py-4">
      <User />
    </nav>
  </div>
</template>
