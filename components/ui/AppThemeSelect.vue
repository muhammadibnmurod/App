<template>
  <button v-if="isDarkMode"
    class="w-9 h-9 flex items-center justify-center p-2 rounded-full text-primary-color bg-surface-40 border border-surface-30"
    @click="toggleDarkMode">
    <IconSun class="w-5 h-5" />
  </button>

  <button v-else
    class="w-9 h-9 flex items-center justify-center p-2 rounded-full text-primary-color bg-surface-40 border border-surface-30"
    @click="toggleDarkMode">
    <IconMoon class="w-5 h-5" />
  </button>
</template>

<script setup lang="ts">
const isDarkMode = ref(
  localStorage.getItem("theme") === "dark" ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !localStorage.getItem("theme"))
);

watchEffect(() => {
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>
