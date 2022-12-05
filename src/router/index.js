import * as vueRouter from "vue-router";
import Top from "../components/pages/Top.vue";

const routes = [
  {
    path: "/",
    component: Top,
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

export default router;