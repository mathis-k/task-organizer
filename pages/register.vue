<script setup lang="ts">
import { useToast } from "~/components/ui/toast";
import { Loader2 } from "lucide-vue-next";

definePageMeta({
  middleware: "guest",
});

const user = ref({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
});

const isLoading = ref(false);
const { toast } = useToast();
const router = useRouter();

async function handleRegister() {
  isLoading.value = true;

  try {
    const { error } = await useFetch("/api/users", {
      method: "POST",
      body: user.value,
    });

    if (error.value) {
      toast({
        title: "Registration failed",
        description: error.value.message || "An unknown error occurred.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Registration successful",
        description: "You have successfully registered. You can now log in.",
      });
      await router.push("/login");
    }
  } catch (err) {
    toast({
      title: "An error occurred",
      description: "An unknown error occurred. Please try again later.",
      variant: "destructive",
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <div class="mx-auto grid w-[350px] gap-6">
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Register</h1>
      </div>
      <form @submit.prevent="handleRegister" class="grid gap-4">
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
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            v-model="user.email"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            v-model="user.password"
            id="password"
            type="password"
            placeholder="********"
            required
          />
        </div>
        <Button
          type="submit"
          class="w-full bg-[#F0F0F0] text-[#09090B]"
          :disabled="isLoading"
        >
          <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
          <span v-else>Create an account</span>
        </Button>
      </form>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <NuxtLink to="/login" :disabled="isLoading" class="underline">
          Login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
