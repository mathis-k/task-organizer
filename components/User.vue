<script setup lang="ts">
import { CircleUser } from "lucide-vue-next";
import type { ObjectId } from "mongoose";
const { data, signOut } = useAuth();

export type User = {
  _id: ObjectId;
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
      <DropdownMenuItem @click="logout">Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped></style>
