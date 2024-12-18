import { auth } from "../firebaseConfig"; // Імпортуємо з firebaseConfig.ts
import { onAuthStateChanged } from "firebase/auth";

export default defineNuxtRouteMiddleware(() => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(); // Користувач є — пропускаємо далі
      } else {
        navigateTo("/not-authorized"); // Перенаправляємо на сторінку
      }
    });
  });
});

// import { auth } from "../firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";

// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const user = await new Promise((resolve) => {
//     onAuthStateChanged(auth, resolve);
//   });

//   if (!user) {
//     return navigateTo("/not-authorized");
//     }
// });
