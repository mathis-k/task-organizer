<script setup lang="ts">
import {
  GraduationCap,
  Focus,
  NotebookPen,
  Cpu,
  Settings2,
} from "lucide-vue-next";
import NavMain from "~/components/NavMain.vue";
import NavUser from "~/components/NavUser.vue";
import type { SidebarProps } from "~/components/ui/sidebar";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});
const data = {
  navMain: [
    {
      title: "Core Features",
      url: "#",
      icon: Cpu,
      isActive: true,
      items: [
        {
          title: "Kanban Board",
          url: "kanban-board",
        },
        {
          title: "To-do List",
          url: "to-do-list",
        },
        {
          title: "Calendar",
          url: "calendar",
        },
      ],
    },
    {
      title: "Productivity & Tracking",
      url: "#",
      icon: Focus,
      items: [
        {
          title: "Study Session",
          url: "focus/study",
        },
        {
          title: "Pomodoro Timer",
          url: "focus/pomodoro",
        },
      ],
    },
    {
      title: "Academic Features",
      url: "#",
      icon: GraduationCap,
      items: [
        {
          title: "Course Management",
          url: "academic/course-management",
        },
        {
          title: "Semester Planner",
          url: "academic/semester-planner",
        },
      ],
    },
    {
      title: "Personal Organization",
      url: "#",
      icon: NotebookPen,
      items: [
        {
          title: "Habits",
          url: "personal/habits",
        },
        {
          title: "Finances",
          url: "personal/finances",
        },
        {
          title: "Events",
          url: "personal/events",
        },
      ],
    },
    {
      title: "Settings & Administration",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General Settings",
          url: "settings/general",
        },
        {
          title: "Appearance",
          url: "settings/appearance",
        },
        {
          title: "Integrations & Automation",
          url: "settings/integrations",
        },
        {
          title: "Account Management",
          url: "#",
        },
      ],
    },
  ],
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <AppInfo />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
