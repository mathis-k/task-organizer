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
    await useRouter().push("/");
  }

  isLoading.value = false;
}
</script>

<template>
  <div class="login-container">
    <Card class="login-card">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="form-group">
          <label for="email">Email</label>
          <Input
            v-model="email"
            type="email"
            id="email"
            required
            placeholder="your email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Input
            v-model="password"
            type="password"
            id="password"
            required
            placeholder="your password"
          />
        </div>
      </CardContent>
      <CardFooter>
        <div class="button-container">
          <Button
            :disabled="isLoading"
            type="submit"
            @click.prevent="handleLogin"
          >
            <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
            <span v-else>Login</span>
          </Button>
        </div>
      </CardFooter>
    </Card>

    <div class="register-container">
      <span class="register-label">Don't have an account yet?</span>
      <NuxtLink to="/register">
        <Button :disabled="isLoading" type="submit">
          <span>Register</span>
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background);
  gap: 1.5rem;
}

.register-container {
  text-align: center;
}

.register-label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.login-card {
  max-width: 400px;
  width: 100%;
  padding: 1.5rem;
  background-color: var(--card);
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.button-container {
  margin-top: 1rem;
}
</style>
