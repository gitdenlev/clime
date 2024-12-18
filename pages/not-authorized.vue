<template>
  <div
    class="flex col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <div class="flex justify-between gap-6 items-center">
      <div class="mb-6">
        <NuxtImg src="/not-found-user.png" width="100" />
      </div>
      <div>
        <h1 class="text-2xl font-semibold mb-4">Ой, вибачте!</h1>
        <p class="text-lg mb-6">
          Ви не увійшли у свій аккаунт. Будь ласка, увійдіть, щоб продовжити.
        </p>
        <NuxtLink
          to="/"
          class="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Увійти
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
