<script setup lang="ts">
import { LogOut } from "lucide-vue-next";
import type { UserDocument } from "~/server/models/User";
const { data, signOut } = useAuth();

const user = data?.value?.user as UserDocument;
const initials = computed(() => {
  if (!user) return "";
  const firstNameInitial = user.firstName.charAt(0).toUpperCase();
  const lastNameInitial = user.lastName.charAt(0).toUpperCase();
  return `${firstNameInitial}${lastNameInitial}`;
});
async function logout() {
  await signOut();
  await useRouter().push("/login");
}
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton
        size="lg"
        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <Avatar class="h-8 w-8 rounded-lg">
          <AvatarImage :src="user.avatar" :alt="user.email" />
          <AvatarFallback class="rounded-lg">
            {{ initials }}
          </AvatarFallback>
        </Avatar>
        <div class="grid flex-1 text-left text-sm leading-tight">
          <span class="truncate font-semibold">
            {{ user.firstName }}
            {{ user.lastName }}
          </span>
          <span class="truncate text-xs">{{ user.email }}</span>
        </div>
        <Button @click="logout" variant="ghost">
          <LogOut />
        </Button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
