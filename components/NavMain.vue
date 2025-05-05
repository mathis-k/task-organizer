<script setup lang="ts">
import { type LucideIcon } from "lucide-vue-next";

defineProps<{
  pages: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}>();
</script>

<template>
  <SidebarGroup>
    <SidebarMenu>
      <Collapsible
        v-for="item in pages"
        :key="item.title"
        as-child
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger as-child>
            <SidebarMenuButton :tooltip="item.title">
              <component :is="item.icon" v-if="item.icon" />
              <NuxtLink class="text-foreground" :to="item.url">
                <span>{{ item.title }}</span>
              </NuxtLink>
            </SidebarMenuButton>
          </CollapsibleTrigger>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
