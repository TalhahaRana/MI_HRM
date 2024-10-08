import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import ForgotPass from "@/views/auth/ForgotPass.vue";
import LeaveApplication from "@/components/employee/leaveApplication.vue";
import CheckInOut from "@/components/employee/CheckInOut.vue"
import AddHR from "@/components/admin/AddHR.vue";
import AllHR from "@/components/admin/AllHR.vue";
import Projects from "@/components/admin/Projects.vue";
import CheckInCheckOut from "@/components/admin/CheckInCheckOut.vue";


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
      path:'/forgot-pass',
      component:ForgotPass
    },
    {
      path: "/leaveApplication",
      name: "leaveApplication",
      component: LeaveApplication,
    },
    {
    path:"/Add-HR",
    name: "AddHR",
    component:AddHR
    },
    {
      path:"/All-HR",
      name:"AllHR",
      component:AllHR
    },
    {
      path:"/project",
      name:"Projects",
      component:Projects
    },
   
  ]
})
export default router