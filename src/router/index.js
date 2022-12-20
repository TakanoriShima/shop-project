import * as vueRouter from "vue-router";
import Top from "../components/pages/Top.vue";
import Menu from "../components/pages/Menu.vue";
import Post from "../components/pages/Post.vue";

const routes = [
  {
    path: "/",
    component: Top,
  },
  {
    path: "/menu",
    component: Menu,
  },
  {
    path: "/post",
    component: Post,
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

export default router;