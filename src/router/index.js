import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import ForgotPass from '@/views/auth/ForgotPass.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: '/check',
      name: 'CheckInOut',
      component: CheckInOut
    },
    {
      path: "/forgot-pass",
      component: ForgotPass,
    },
    {
      path: "/leaveApplication",
      name: "leaveApplication",
      component: LeaveApplication,
    },
  ],
});

export default router;
