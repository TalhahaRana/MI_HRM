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
<<<<<<< HEAD
import CheckInOut from "@/components/employee/CheckInOut.vue";
import WorkingHours from "@/components/employee/workingHours.vue";
=======
import CheckInOut from "@/components/employee/CheckInOut.vue"
import AddHR from "@/components/admin/AddHR.vue";
import AllHR from "@/components/admin/AllHR.vue";
import Projects from "@/components/admin/Projects.vue";
import CheckInCheckOut from "@/components/admin/CheckInCheckOut.vue";
import ManageLeaves from '@/components/hr/ManageLeaves.vue'

>>>>>>> 2e862dd4b4118cbdc7e3e6fe121377ecb7d5bf6e

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
<<<<<<< HEAD
      path: "/check",
      name: "CheckInOut",
      component: CheckInOut,
=======
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
    },
     {
      path: '/check',
      name: 'CheckInOut',
      component: CheckInOut
>>>>>>> 2e862dd4b4118cbdc7e3e6fe121377ecb7d5bf6e
    },
    {
      path: "/forgot-pass",
      component: ForgotPass,
      path: "/forgot-pass",
      component: ForgotPass,
    },
    {
      path:'/manage-leaves',
      component:ManageLeaves
    },
    {
      path: "/leaveApplication",
      name: "leaveApplication",
      component: LeaveApplication,
    },
    {
<<<<<<< HEAD
      path: "/workingHours",
      name: "workingHours",
      component: WorkingHours,
=======
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
>>>>>>> 2e862dd4b4118cbdc7e3e6fe121377ecb7d5bf6e
    },
  ],
});

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 2e862dd4b4118cbdc7e3e6fe121377ecb7d5bf6e
