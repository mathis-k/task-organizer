<template>
  <div class="flex flex-col h-screen">
    <Navbar />
    <div class="flex flex-1">
      <Sidebar />
      <div class="flex-1 p-4">
        <NuxtPage />
      </div>
    </div>
  </div>

  <Toaster />
</template>

<script setup lang="ts"></script>
