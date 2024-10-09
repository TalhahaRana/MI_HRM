import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import ForgotPass from "@/views/auth/ForgotPass.vue";
import AddEmployee from "@/components/admin/AddEmployee.vue";
import AllEmployee from "@/components/admin/AllEmployee.vue";
import Leaves from "@/components/admin/Leaves.vue";
import Attendance from "@/components/admin/Attendance.vue";
import DepartmentManagement from "@/components/admin/DepartmentManagement.vue";
import CheckInOut from "@/components/employee/CheckInOut.vue";
import LeaveApplication from "@/components/employee/LeaveApplication.vue";
import WorkingHours from "@/components/employee/WorkingHours.vue"; // From feature/leaveApplication
import Dashboard from "@/views/Dashboard.vue"; // From dev
import AddHR from "@/components/admin/AddHR.vue";
import AllHR from "@/components/admin/AllHR.vue";
import Projects from "@/components/admin/Projects.vue";
import CheckInCheckOut from "@/components/admin/CheckInCheckOut.vue";
import ManageLeaves from "@/components/hr/ManageLeaves.vue"; // Merged from both feature/leaveApplication and dev

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
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
      path: "/check",
      name: "CheckInOut",
      component: CheckInOut,
    },
    {
      path: "/leave-application",
      name: "LeaveApplication",
      component: LeaveApplication,
    },
    {
      path: "/working-hours",
      name: "WorkingHours",
      component: WorkingHours,
    },
    {
      path: "/admin/attendance",
      name: "Attendance",
      component: Attendance,
    },
    {
      path: "/admin/department-management",
      name: "DepartmentManagement",
      component: DepartmentManagement,
    },
    {
      path: "/admin/add-hr",
      name: "AddHR",
      component: AddHR,
    },
    {
      path: "/admin/all-hr",
      name: "AllHR",
      component: AllHR,
    },
    {
      path: "/projects",
      name: "Projects",
      component: Projects,
    },
    {
      path: "/manage-leaves",
      component: ManageLeaves,
    },
    {
      path: "/admin/check-in-check-out",
      name: "CheckInCheckOut",
      component: CheckInCheckOut,
    },
  ],
});

export default router;
