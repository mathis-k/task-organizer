<script setup lang="ts">
import { ExternalLink } from "lucide-vue-next";

const links = [
  { title: "Artemis", link: "https://artemis.cit.tum.de/courses" },
  { title: "Moodle", link: "https://www.moodle.tum.de/my/" },
  { title: "TUM-Live", link: "https://live.rbg.tum.de/" },
  {
    title: "TUM-Online",
    link: "https://campus.tum.de/tumonline/ee/ui/ca2/app/desktop/#/home?$ctx=design=ca;lang=de",
  },
  { title: "AnkiPro", link: "https://ankipro.net/decks" },
];
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button class="relative">
        <ExternalLink class="w-6 h-6 text-foreground" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel> helpful Links </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem v-for="link in links">
        <a :href="link.link" target="_blank" rel="noopener noreferrer">
          {{ link.title }}
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped></style>
