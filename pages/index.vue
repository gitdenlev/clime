<script setup lang="ts">
import { auth } from "../firebaseConfig"; // Імпортуємо конфігурацію з іменованим експортом
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "#app";

useHead({
  title: "cliMe - Вхід",
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
});

const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref("");

// Функція для обробки входу
const handleLogin = async () => {
  // Перевірка, чи заповнені всі поля
  if (!email.value || !password.value) {
    errorMessage.value = "Будь ласка, заповніть усі поля!";
    setTimeout(() => {
      errorMessage.value = "";
    }, 5000);
    return; // Виходимо з функції, якщо поля не заповнені
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    // Перенаправлення на сторінку після успішного входу
    router.push("/dashboard");
  } catch (error: any) {
    console.error("Error during login:", error.message);

    // Обробка помилок від Firebase
    if (error.code === "auth/user-not-found") {
      errorMessage.value = "Користувача з таким email не знайдено!";
    } else if (error.code === "auth/invalid-credential") {
      errorMessage.value = "Невірний пароль!";
    } 
    else if (error.code === "auth/invalid-email") {
      errorMessage.value = "Невірний email!";
    }
    setTimeout(() => {
      errorMessage.value = "";
    }, 5000); // Виведення повідомлення протягом 5 секунд
  }
};
</script>

<template>
  <div class="flex flex-col gap-4 max-w-sm mx-auto mt-10">
    <div class="mx-auto">
      <NuxtImg src="/logo.png" width="100" />
    </div>
    <h1 class="text-center text-2xl font-bold">Вхід</h1>

    <UFormGroup label="Email">
      <UInput
        v-model="email"
        type="email"
        placeholder="Введіть email"
        icon="i-heroicons-envelope"
        color="blue"
        size="xl"
      />
    </UFormGroup>

    <UFormGroup label="Пароль">
      <UInput
        v-model="password"
        type="password"
        placeholder="Введіть пароль"
        icon="i-heroicons-lock-closed"
        color="blue"
        size="xl"
      />
    </UFormGroup>

    <UButton
      block
      color="cyan"
      size="md"
      class="font-bold text-lg"
      @click="handleLogin"
    >
      Увійти
    </UButton>

    <div class="text-center">
      <button
        @click="router.push('/register')"
        class="font-semibold underline text-black dark:text-white"
      >
        Немає облікового запису? Зареєструватися
      </button>
    </div>

    <transition name="fade">
      <UAlert v-if="errorMessage" color="red" :title="errorMessage" />
    </transition>
  </div>
</template>
