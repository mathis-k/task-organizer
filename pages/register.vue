<script setup lang="ts">
import { useToast } from "~/components/ui/toast";
import { Loader2 } from "lucide-vue-next";

definePageMeta({
  middleware: "guest",
});

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const { toast } = useToast();
const router = useRouter();

async function handleRegister() {
  isLoading.value = true;

  try {
    const { error } = await useFetch("/api/users", {
      method: "POST",
      body: { email: email.value, password: password.value },
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
    <div class="mx-auto grid w-[350px] gap-6 rounded-2xl shadow-lg">
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Register</h1>
      </div>
      <form @submit.prevent="handleRegister" class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            v-model="email"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            v-model="password"
            id="password"
            type="password"
            placeholder="********"
            required
          />
        </div>
        <Button type="submit" class="w-full" :disabled="isLoading">
          <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
          <span v-else>Register</span>
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
