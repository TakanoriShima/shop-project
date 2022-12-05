import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from "./router/index"; // 追加

// createApp(App).mount('#app')
createApp(App).use(VueRouter).mount("#app"); // 変更
