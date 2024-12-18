// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  router: { middleware: ["auth"] },
  plugins: [{ src: "~/plugins/firebase.ts", mode: "client" }],
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@pinia/nuxt",
  ],
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },
  css: ["~/assets/css/theme.css"],
  app: {
    head: {
      htmlAttrs: {
        class: "light", // starting theme
      },
    },
  },
  compatibilityDate: "2024-12-09",
});