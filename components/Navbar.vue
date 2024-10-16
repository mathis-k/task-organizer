<script setup lang="ts">
import { Bell, ListTodo, CircleUser } from "lucide-vue-next";

const { data, signOut } = useAuth();
const isCollapsed = ref(true);

export type User = {
  email: string;
  password: string;
};

async function logout() {
  await signOut();
  await useRouter().push("/login");
}
</script>

<template>
  <div v-if="data?.user" :data-collapsed="isCollapsed">
    <nav class="bg-background border-b border-border py-4">
      <div class="container mx-auto flex items-center justify-between px-6">
        <div class="flex items-center space-x-4">
          <ListTodo class="w-8 h-8 text-foreground" />
          <span class="text-xl font-bold text-foreground">Mathis' Task Organizer</span>
        </div>

        <div class="flex items-center space-x-6">
          <CreateTask />

          <Button class="relative">
            <Bell class="w-6 h-6 text-foreground" />
            <span class="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-destructive rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button class="focus:outline-none">
                <CircleUser class="w-8 h-8 text-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{{ (data?.user as User).email }}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>

</style>