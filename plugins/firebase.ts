import { defineNuxtPlugin } from "#app";
import { auth } from "../firebaseConfig";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("auth", auth);
});
