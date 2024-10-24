<script setup lang="ts">
import { ExternalLink } from "lucide-vue-next";

const linkArtemis = "https://artemis.cit.tum.de/courses";
const linkMoodle = "https://www.moodle.tum.de/my/";
const linkTumLive = "https://live.rbg.tum.de/";
</script>

<template>
  <div class="p-4">
    <ul class="mt-4 space-y-4">
      <li>
        <a :href="linkArtemis" target="_blank" rel="noopener noreferrer">
          Artemis
          <ExternalLink class="w-10 h-10 text-gray-400 hover:text-gray-200" />
        </a>
      </li>
      <li>
        <a :href="linkMoodle" target="_blank" rel="noopener noreferrer">
          Moodle
          <ExternalLink class="w-10 h-10 text-gray-400 hover:text-gray-200" />
        </a>
      </li>
      <li>
        <a :href="linkTumLive" target="_blank" rel="noopener noreferrer">
          TUMLive
          <ExternalLink class="w-10 h-10 text-gray-400 hover:text-gray-200" />
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
