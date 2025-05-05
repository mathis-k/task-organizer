import { useStorage } from "@vueuse/core";

export const useTheme = () => {
  const theme = useStorage<"light" | "dark">("theme", "light");

  const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", theme.value === "dark");
  };

  // Set class on load
  onMounted(() => {
    document.documentElement.classList.toggle("dark", theme.value === "dark");
  });

  return { theme, toggleTheme };
};
