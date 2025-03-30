<script setup lang="ts">
import { User } from "lucide-vue-next";
const { data } = useAuth();

type User = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
};
const user = data?.value?.user as User;

const initials = computed(() => {
  if (!user) return "";
  const firstNameInitial = user.firstName.charAt(0).toUpperCase();
  const lastNameInitial = user.lastName.charAt(0).toUpperCase();
  return `${firstNameInitial}${lastNameInitial}`;
});

const userRef = ref({
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
});
</script>

<template>
  <div class="items-center justify-center p-5">
    <Card class="flex flex-row items-center h-h-auto border-0 rounded-lg p-4">
      <div class="ml-4 mr-6">
        <Avatar class="h-32 w-32 rounded-lg">
          <AvatarImage
            :src="(data?.user as User)?.avatar"
            :alt="(data?.user as User)?.email"
          />
          <AvatarFallback class="rounded-lg">
            {{ initials }}
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <div class="grid flex-1 text-left text-5xl leading-tight">
          <span class="truncate font-bold">
            {{ (data?.user as User)?.firstName }}
            {{ (data?.user as User)?.lastName }}
          </span>
          <span class="truncate text-lg text-neutral-400">{{
            (data?.user as User)?.email
          }}</span>
        </div>
      </div>
    </Card>
    <span class="truncate font-bold p-4 text-2xl mt-4 block">
      Information
    </span>
    <Card class="flex flex-row items-center h-auto border-0 rounded-lg p-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="first-name">First name</Label>
          <Input
            v-model="user.firstName"
            id="first-name"
            placeholder="Max"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="last-name">Last name</Label>
          <Input
            v-model="user.lastName"
            id="last-name"
            placeholder="Robinson"
            required
          />
        </div>
      </div>
    </Card>
    <span class="truncate font-bold p-4 text-2xl mt-4 block"> Statistics </span>
    <Card class="flex flex-row items-center h-auto border-0 rounded-lg p-4">
      Soon
    </Card>
  </div>
</template>
