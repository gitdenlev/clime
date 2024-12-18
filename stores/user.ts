import firebase from "firebase/compat/app";
import { defineStore } from "pinia";


export const useUserStore = defineStore("user", {
    state: () => ({
        user_name: firebase.auth().currentUser?.displayName,
    })
})