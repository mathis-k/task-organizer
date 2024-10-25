<script lang="ts" setup>
import SideBarNav, { type LinkProp } from "~/components/SideBarNav.vue";

const { data } = useAuth();
const route = useRoute();
const isCollapsed = ref(true);
const links = computed<LinkProp[]>(() => [
  {
    title: "Home",
    icon: "House",
    destination: "/",
    variant: route.path === "/" ? "default" : "ghost",
  },
  {
    title: "List",
    icon: "List",
    destination: "/list",
    variant: route.path === "/list" ? "default" : "ghost",
  },
]);
</script>

<template>
  <div v-if="data?.user" :data-collapsed="isCollapsed">
    <div class="sidebar">
      <SideBarNav :links="links" />
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 240px;
  padding: 16px;
  height: 100vh;
}
</style>
