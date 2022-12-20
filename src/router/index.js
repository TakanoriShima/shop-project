import * as vueRouter from "vue-router";
import Top from "../components/pages/Top.vue";
import Menu from "../components/pages/Menu.vue";
import Post from "../components/pages/Post.vue";
import Upload from "../components/pages/Upload.vue";

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
  {
    path: "/upload",
    component: Upload,
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

export default router;