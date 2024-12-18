import { getAuth } from "firebase/auth";
import { useState } from "#app";

const auth = getAuth(); // Firebase auth

export const useAuth = () => {
  const user = useState("user", () => auth.currentUser); // Состояние для хранения текущего пользователя
  return user.value;
};
