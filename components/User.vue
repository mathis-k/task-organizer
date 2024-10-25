<script setup lang="ts">
import { CircleUser } from "lucide-vue-next";
const { data, signOut } = useAuth();

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
</template>

<style scoped></style>
