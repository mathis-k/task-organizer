<script setup lang="ts">
import { ChevronsUpDown, LogOut, User } from "lucide-vue-next";
const { data, signOut } = useAuth();

type User = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
};
const initials = computed(() => {
  const user = data?.value?.user as User;
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
      <DropdownMenu v-if="data?.user">
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar class="h-8 w-8 rounded-lg">
              <AvatarImage
                :src="(data?.user as User).avatar"
                :alt="(data?.user as User).email"
              />
              <AvatarFallback class="rounded-lg">
                {{ initials }}
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                {{ (data?.user as User).firstName }}
                {{ (data?.user as User).lastName }}
              </span>
              <span class="truncate text-xs">{{
                (data?.user as User).email
              }}</span>
            </div>
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side="top"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar class="h-8 w-8 rounded-lg">
                <AvatarImage
                  :src="(data?.user as User).avatar"
                  :alt="(data?.user as User).email"
                />
                <AvatarFallback class="rounded-lg">
                  {{ initials }}
                </AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">
                  {{ (data?.user as User).firstName }}
                  {{ (data?.user as User).lastName }}
                </span>
                <span class="truncate text-xs">{{
                  (data?.user as User).email
                }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <NuxtLink
                to="/profile"
                class="flex items-center gap-2 text-foreground no-underline"
              >
                <User />
                Profile
              </NuxtLink>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="logout" class="flex items-center gap-2">
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
