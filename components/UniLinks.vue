<script setup lang="ts">
import { ExternalLink } from "lucide-vue-next";

const linkArtemis = "https://artemis.cit.tum.de/courses";
const linkMoodle = "https://www.moodle.tum.de/my/";
const linkTumLive = "https://live.rbg.tum.de/";
const linkTumOnline =
  "https://campus.tum.de/tumonline/ee/ui/ca2/app/desktop/#/home?$ctx=design=ca;lang=de";
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button class="relative">
        <ExternalLink class="w-6 h-6 text-foreground" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel> nützliche Links </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <a :href="linkArtemis" target="_blank" rel="noopener noreferrer">
          Artemis
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <a :href="linkMoodle" target="_blank" rel="noopener noreferrer">
          Moodle
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <a :href="linkTumLive" target="_blank" rel="noopener noreferrer">
          TUM-Live
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <a :href="linkTumOnline" target="_blank" rel="noopener noreferrer">
          TUM-Online
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped></style>
