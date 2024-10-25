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
      await useRouter().push("/login");
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
  <div class="login-container">
    <Card class="login-card">
      <CardHeader>
        <CardTitle>Register</CardTitle>
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
            @click.prevent="handleRegister"
          >
            <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
            <span v-else>Register</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background);
}

.login-card {
  max-width: 400px;
  width: 100%;
  padding: 1.5rem;
  background-color: var(--card);
  border: none; /* border-radius: 8px; */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.button-container {
  margin-top: 1rem;
}
</style>
