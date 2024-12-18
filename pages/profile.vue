<script setup>
definePageMeta({
  middleware: "auth", // Захист сторінки
});


useHead({
  title: "cliMe - Профіль",
  meta: [
    {
      name: "description",
      content: "Weather App",
    },
  ],
  link: {
    rel: "icon",
    href: "/logo.png",
  },
})

import { ref, onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "#app";

const router = useRouter();
const email = ref("");
const isOpen = ref(false);

onMounted(() => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    email.value = user.email; // Записуємо email користувача
  }
});

const logout = async () => {
  try {
    const auth = getAuth();
    await signOut(auth); // Вихід із акаунту
    router.push("/"); // Переходимо на головну
  } catch (error) {
    console.error("Error during logout:", error.message);
  }
};
</script>

<template>
  <div class="flex flex-col gap-4 mt-20">
     <NuxtLink to="/dashboard"
      ><UButton
        class="fixed right-4 top-14"
        icon="icon-park-outline:back"
        color="gray"
      ></UButton
    ></NuxtLink>
    <div class="flex items-center gap-2">
      <Icon name="bx:user" size="56" class="text-blue-500" />
      <h1 class="text-3xl font-extrabold pt-4">Ваш профіль</h1>
    </div>
    <div class="flex items-center space-x-3">
      <Icon name="heroicons:user" size="24" class="text-gray-500" />
      <span class="text-lg font-semibold">Денис</span>
    </div>
    <div class="flex items-center space-x-3">
      <Icon name="heroicons:envelope" size="24" class="text-gray-500" />
      <span class="text-lg font-semibold">{{ email }}</span>
    </div>
    <UButton
      color="red"
      @click="isOpen = true"
      class="md:w-1/4 w-1/3 flex items-center space-x-2 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
      icon="iconamoon:exit-bold"
      >

      <span class="font-semibold">Вийти</span>
    </UButton>

    <UModal v-model="isOpen" :transition="true">
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Вийти з аккаунту</h2>
        <p class="text-gray-600">Ви впевнені, що хочете вийти?</p>
        <div class="flex justify-end mt-4 gap-2">
          <UButton @click="isOpen = false" color="gray">Закрити</UButton>
          <UButton @click="logout()" color="red"
            ><NuxtLink to="/">Вийти</NuxtLink></UButton
          >
        </div>
      </div>
    </UModal>
  </div>
</template>