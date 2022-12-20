import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from "./router/index"; // 追加
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy346ukxN23ix7_qYRjF_tH905_nF7hYs",
  authDomain: "shop-project-8196e.firebaseapp.com",
  projectId: "shop-project-8196e",
  storageBucket: "shop-project-8196e.appspot.com",
  messagingSenderId: "834276475788",
  appId: "1:834276475788:web:33f0998926e84cec584ca9"
};

// Initialize Firebase
initializeApp(firebaseConfig);
createApp(App).use(VueRouter).mount("#app"); // 変更
