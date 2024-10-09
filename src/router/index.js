import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import ForgotPass from "@/views/auth/ForgotPass.vue";
import AddEmployee from "@/components/admin/AddEmployee.vue";
import AllEmployee from "@/components/admin/AllEmployee.vue";
import Leaves from "@/components/admin/Leaves.vue";
import Attendance from "@/components/admin/Attendance.vue";
import DepartmentManagement from "@/components/admin/DepartmentManagement.vue";
import CheckInOut from "@/components/employee/CheckInOut.vue";
import LeaveApplication from "@/components/employee/leaveApplication.vue";
import Dashboard from "@/views/Dashboard.vue";
import AddHR from "@/components/admin/AddHR.vue";
import AllHR from "@/components/admin/AllHR.vue";
import Projects from "@/components/admin/Projects.vue";
import CheckInCheckOut from "@/components/admin/CheckInCheckOut.vue";
import ManageLeaves from "@/components/hr/ManageLeaves.vue";

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
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/forgot-pass",
      component: ForgotPass,
    },
    {
      path: "/manage-leaves",
      component: ManageLeaves,
    },
    {
      path: "/leaveApplication",
      name: "leaveApplication",
      component: LeaveApplication,
    },
    {
      path: "/Add-HR",
      name: "AddHR",
      component: AddHR,
    },
    {
      path: "/All-HR",
      name: "AllHR",
      component: AllHR,
    },
    {
      path: "/project",
      name: "Projects",
      component: Projects,
    },
    {
      path: "/attendance",
      name: "AttendanceEmployee",
      component: AttendanceEmployee,
    },
    {
      path: "/assignedProjects",
      name: "AssignedProjects",
      component: AssignedProjects,
    },
  ],
});

export default router;
