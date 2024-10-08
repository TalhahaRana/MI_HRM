import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import ForgotPass from "@/views/auth/ForgotPass.vue";
import CheckInOut from "@/components/employee/CheckInOut.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/check",
      name: "CheckInOut",
      component: CheckInOut,
    },
    {
      path: "/forgot-pass",
      component: ForgotPass,
    },
  ],
});

export default router;
