import { createRouter, createWebHistory } from "vue-router";
import MainCom from "@/views/1.base/index.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainCom,
    },
    {
      path: "/second",
      name: "SECOND",
      component: () => import("@/views/2.loopRender/index.vue"),
    },
    {
      path: "/three",
      name: "THREE",
      component: () => import("@/views/3.eartchAnimation/index.vue"),
    },
    {
      path: "/four",
      name: "FOUR",
      component: () => import("@/views/4.simpleSkyBox/index.vue"),
    },
  ],
});

export default router;
