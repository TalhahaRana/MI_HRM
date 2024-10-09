import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import ForgotPass from "@/views/auth/ForgotPass.vue";
import AddEmployee from "@/components/admin/AddEmployee.vue";
import AllEmployee from "@/components/admin/AllEmployee.vue";
import Leaves from "@/components/admin/Leaves.vue";
import Attendance from "@/components/admin/Attendance.vue";
import DepartmentManagement from "@/components/admin/DepartmentManagement.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/forgot-pass",
      component: ForgotPass,
    },
    {
      path: "/admin/add-employee",
      name: "AddEmployee",
      component: AddEmployee,
    },
    {
      path: "/admin/all-employee",
      name: "AllEmployee",
      component: AllEmployee,
    },
    {
      path: "/admin/leaves",
      name: "Leaves",
      component: Leaves,
    },
    {
      path: "/admin/attendance",
      name: "Attendance",
      component: Attendance,
    },{
      path: "/admin/department-management",
      name: "DepartmentManagement",
      component: DepartmentManagement,
    }
  ],
});

export default router;
