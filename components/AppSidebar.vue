<script setup lang="ts">
import {
  Columns3,
  Goal,
  Settings,
  ChartNoAxesCombined,
  Hourglass,
  BookCopy,
  CalendarDays,
} from "lucide-vue-next";
import NavMain from "~/components/NavMain.vue";
import NavUser from "~/components/NavUser.vue";
import type { SidebarProps } from "~/components/ui/sidebar";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});
const pages = [
  {
    title: "Kanban-Board",
    url: "/kanban-board",
    icon: Columns3,
  },
  {
    title: "Goals",
    url: "/goals",
    icon: Goal,
  },
  {
    title: "Modules",
    url: "/modules",
    icon: BookCopy,
  },
  {
    title: "Pomodoro",
    url: "/pomodoro",
    icon: Hourglass,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: CalendarDays,
  },
  {
    title: "Statistics",
    url: "/statistics",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <AppInfo />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :pages="pages" />
    </SidebarContent>
    <SidebarFooter>
      <Separator orientation="horizontal" class="mr-2 rounded" />
      <NavUser />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
