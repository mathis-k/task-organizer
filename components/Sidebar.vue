<script setup lang="ts">
const { data } = useAuth();
</script>

<template>
  <div v-if="data?.user">
    <aside class="w-10 h-full text-white flex flex-col">
      <UniLinks />
    </aside>
  </div>
</template>

<style scoped></style>
