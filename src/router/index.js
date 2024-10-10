import { createRouter, createWebHistory } from "vue-router";
import DashView from "@/views/Hr/DashView.vue";
import Login from "../views/auth/Login.vue";
import ForgotPass from "@/views/auth/ForgotPass.vue";
import AddEmployee from "@/components/admin/AddEmployee.vue";
import AllEmployee from "@/components/admin/AllEmployee.vue";
import Leaves from "@/components/admin/Leaves.vue";
import Attendance from "@/components/admin/Attendance.vue";
import DepartmentManagement from "@/components/admin/DepartmentManagement.vue";
import CheckInOut from "@/components/employee/CheckInOut.vue";
import LeaveApplication from "@/components/employee/LeaveApplication.vue";
import WorkingHours from "@/components/employee/WorkingHours.vue"; 
import Dashboard from "@/views/Dashboard.vue"; 
import AddHR from "@/components/admin/AddHR.vue";
import AllHR from "@/components/admin/AllHR.vue";
import Projects from "@/components/admin/Projects.vue";
import HrCheckoutCheckIn from "@/components/hr/CheckInOut.vue";
import HrDepartmentManagement from "@/components/hr/DepartmentManagement.vue";
import HrEmployeeJoining from "@/components/hr/EmployeeJoining.vue";
import HrManageLeaves from "@/components/hr/ManageLeaves.vue";
import AttendanceHR from "@/components/hr/AttendanceEmployee.vue";
import AttendanceEmployee from "@/components/employee/AttendanceEmployee.vue";
import AssignedProjects from "@/components/employee/AssignedProjects.vue";
import ManageLeaves from "@/components/admin/Leaves.vue"; // Missing import
import Payroll from "@/components/hr/Payroll.vue";
import ManageProjectsHR from "@/components/hr/ManageProjects.vue";
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
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: '', // Empty path means it will be the default
          component: DashView, // Your default child component
        },
        {
          path: 'check',
          name: 'CheckInOut',
          component: CheckInOut,
        },
        {
          path: "leave-application",
          name: "LeaveApplication",
          component: LeaveApplication
        },
        {
          path: "attendance-employee",
          name: "AttendanceEmployee",
          component:AttendanceEmployee,
        },
        {
          path: "assignedProjects",
          name: "AssignedProjects",
          component:AssignedProjects,
        },
        {
          path: "working-hours",
          name: "WorkingHours",
          component: WorkingHours,
        },
        {
          path: "attendance",
          name: "Attendance",
          component:Attendance,
        },
        {
          path: "leaves",
          name: "Leaves",
          component:Leaves,
        },
        {
          path: "department",
          name: "DepartmentManagement",
          component:DepartmentManagement,
        },
        {
          path: "addHr",
          name: "AddHR",
          component: AddHR,
        },
        {
          path: "all-hr",
          name: "AllHR",
          component: AllHR,
        },
        {
          path: "add-employee",
          name: "AddEmployee",
          component: AddEmployee,
        },
        {
          path: "all-employee",
          name: "AllEmployee", // Fixed name
          component: AllEmployee,
        },
        {
          path: "projects",
          name: "Projects",
          component: Projects,
        },
        {
          path: "manage-leaves",
          component: ManageLeaves,
        },
        {
          path: "checkout",
          component: HrCheckoutCheckIn,
        },
        {
          path: "department-management",
          component: HrDepartmentManagement,
        },
        {
          path: "employee-joining",
          component: HrEmployeeJoining,
        },
        {
          path: "manage-leaves-hr",
          component: HrManageLeaves,
        },
        {
          path: "attendance-hr",
          component: AttendanceHR,
        },
        {
          path: "payroll-hr",
          component: Payroll,
        },
        {
          path: "manage-projects-hr",
          component: ManageProjectsHR,
        },

      ]
    }, 
  ],
});

export default router;
