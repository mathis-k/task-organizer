<script setup lang="ts">
import AppSidebar from "~/components/AppSidebar.vue";
const { data } = useAuth();
const route = useRoute();

import { capitalize } from "~/lib/utils";
</script>

<template>
  <div>
    <TooltipProvider v-if="data?.user">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset class="flex flex-col flex-1 h-screen">
          <header
            class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
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
