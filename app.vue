<script setup lang="ts">
import AppSidebar from "~/components/AppSidebar.vue";
import { capitalize } from "~/lib/utils";
const { data } = useAuth();
const route = useRoute();

const currentTime = ref("");

function updateTime() {
  const now = new Date();
  currentTime.value = now.toLocaleString("de-DE", {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  updateTime();
  interval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div>
    <TooltipProvider v-if="data?.user">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset class="flex flex-col flex-1 h-screen">
          <header
            class="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
          >
            <div class="flex items-center gap-2 px-4">
              <SidebarTrigger class="-ml-1" />
              <Separator orientation="vertical" class="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem class="hidden md:block">
                    <BreadcrumbLink v-if="route.path !== '/'" href="/">
                      Home
                    </BreadcrumbLink>
                    <BreadcrumbPage v-else> Home </BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator
                    v-if="route.path !== '/'"
                    class="hidden md:block"
                  />
                  <template
                    v-for="(segment, index) in route.path
                      .split('/')
                      .filter(Boolean)"
                    :key="index"
                  >
                    <BreadcrumbItem
                      v-if="
                        index < route.path.split('/').filter(Boolean).length - 1
                      "
                    >
                      <BreadcrumbLink
                        :href="`/${route.path
                          .split('/')
                          .slice(0, index + 1)
                          .join('/')}`"
                      >
                        {{ capitalize(segment) }}
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbPage v-else>
                      {{ capitalize(segment) }}
                    </BreadcrumbPage>

                    <BreadcrumbSeparator
                      v-if="
                        index < route.path.split('/').filter(Boolean).length - 1
                      "
                    />
                  </template>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div
              class="absolute left-1/2 transform -translate-x-1/2 text-sm font-medium text-muted-foreground whitespace-nowrap"
            >
              {{ currentTime }}
            </div>
            <ModeSwitch class="mr-4" />
          </header>
          <div class="flex-1 overflow-auto p-4">
            <NuxtPage class="max-w-full max-h-full overflow-auto" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
    <NuxtPage v-else />
  </div>
  <Toaster />
</template>
