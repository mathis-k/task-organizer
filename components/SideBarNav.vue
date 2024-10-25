<script lang="ts" setup>
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as lucideIcons from "lucide-vue-next";

export interface LinkProp {
  title: string;
  icon: string;
  destination: string;
  variant: "default" | "ghost";
}

interface NavProps {
  links: LinkProp[];
}

defineProps<NavProps>();
</script>

<template>
  <div class="nav-container">
    <div v-for="(link, index) of links" :key="index" class="link-item">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <NuxtLink
              :to="link.destination"
              :class="['link', { highlight: link.variant === 'default' }]"
            >
              <component :is="lucideIcons[link.icon]" class="icon" />
              <span class="link-text">{{ link.title }}</span>
            </NuxtLink>
          </TooltipTrigger>
          <TooltipContent>
            <span>{{ link.title }}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>

<style scoped>
.nav-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.link-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  width: 100%;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

/* Icon Styling */
.icon {
  margin-right: 12px;
  width: 24px;
  height: 24px;
}

/* Text Styling */
.link-text {
  font-size: 1.1rem;
}

/* Hover und Highlight-Effekt */
.link:hover,
.link.highlight {
  background-color: #3d3d3d;
  color: white;
}
</style>
