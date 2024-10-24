export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();

  if (status.value === "authenticated" && to.path !== "/") {
    return navigateTo("/");
  }
});
