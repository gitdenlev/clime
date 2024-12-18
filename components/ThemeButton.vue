<script setup>
const colorMode = useColorMode();
const currentTheme = computed(() => colorMode.preference);

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};
</script>

<template>
  <div class="fixed top-4 right-4">
    <UButton
      @click="toggleTheme"
      :icon="
        currentTheme === 'dark'
          ? 'i-heroicons-sun-solid'
          : 'i-heroicons-moon-solid'
      "
      :color="currentTheme === 'dark' ? 'cyan' : 'gray'"
    >
    </UButton>
  </div>
</template>
