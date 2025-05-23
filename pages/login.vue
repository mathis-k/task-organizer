<script setup lang="ts">
import { useToast } from "~/components/ui/toast";
import { Loader2 } from "lucide-vue-next";

definePageMeta({
  middleware: "guest",
});

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const { signIn } = useAuth();
const { toast } = useToast();
const router = useRouter();

async function handleLogin() {
  isLoading.value = true;

  const res = await signIn("credentials", {
    email: email.value,
    password: password.value,
    redirect: false,
  });

  if (res?.error) {
    toast({
      title: "Anmeldung fehlgeschlagen",
      description: res.error || "Ein unbekannter Fehler ist aufgetreten.",
      variant: "destructive",
    });
  } else {
    await router.push("/");
  }

  isLoading.value = false;
}
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <div
      class="mx-auto grid w-[350px] gap-6 rounded-lg bg-card p-6 shadow-md border-muted"
    >
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Login</h1>
      </div>
      <form @submit.prevent="handleLogin" class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            v-model="email"
            class="bg-card"
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
            class="bg-card"
            id="password"
            type="password"
            placeholder="********"
            required
          />
        </div>
        <Button type="submit" class="w-full" :disabled="isLoading">
          <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
          <span v-else>Login</span>
        </Button>
      </form>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <NuxtLink to="/register" :disabled="isLoading" class="underline">
          Register
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
