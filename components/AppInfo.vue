<script setup lang="ts">
import { ChevronRight, Github, Gift } from "lucide-vue-next";

const appInfo = {
  name: "Task Organizer",
  logo: Github,
};

const links = [
  {
    name: "Code",
    icon: Github,
    url: "https://github.com/mathis-k/task-organizer",
  },
  {
    name: "Donate",
    icon: Gift,
    url: "https://buymeacoffee.com/mathisk",
  },
];
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <component :is="appInfo.logo" class="size-6" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                {{ appInfo.name }}
              </span>
            </div>
            <ChevronRight class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="start"
          side="right"
          :side-offset="4"
        >
          <DropdownMenuLabel class="text-xs text-muted-foreground">
            About
          </DropdownMenuLabel>
          <template v-for="link in links" :key="link.name">
            <DropdownMenuItem class="gap-2 p-2">
              <a
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-foreground no-underline"
              >
                <div
                  class="flex size-8 items-center justify-center rounded-sm border"
                >
                  <component :is="link.icon" class="size-4" />
                </div>
                <span class="font-semibold">
                  {{ link.name }}
                </span>
              </a>
            </DropdownMenuItem>
          </template>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
