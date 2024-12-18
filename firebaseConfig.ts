import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Ваші налаштування Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA1Idr0Aw56-pd5JnXTxWqHFT8lSxPoYow",
  authDomain: "weather-app-750fb.firebaseapp.com",
  projectId: "weather-app-750fb",
  storageBucket: "weather-app-750fb.appspot.com",
  messagingSenderId: "500725976251",
  appId: "1:500725976251:web:e01cf1928e0c7851aead9e",
  measurementId: "G-MPYJP2JPZQ",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };







