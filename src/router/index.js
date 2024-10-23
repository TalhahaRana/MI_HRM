import { createRouter, createWebHistory } from "vue-router";
import RouteService from "@/services/RouteGuard"; // Import route guard logic
import AssignProject from "@/components/hr/AssignProject.vue";
// Import all the components/views used in the routes
import Login from "../views/auth/Login.vue";
import ForgotPass from "@/views/auth/ForgotPass.vue";
import SetPassword from "@/views/auth/SetPassword.vue";
import AddEmployee from "@/components/admin/AddEmployee.vue";
import AllEmployee from "@/components/admin/AllEmployee.vue";
import DepartmentManagement from "@/components/admin/DepartmentManagement.vue";
import CheckInOut from "@/components/employee/CheckInOut.vue";
import LeaveApplication from "@/components/employee/leaveApplication.vue";
import WorkingHours from "@/components/employee/workingHours.vue";
import Dashboard from "@/views/Dashboard.vue";
import Projects from "@/components/admin/Projects.vue";
import HrEmployeeJoining from "@/components/hr/EmployeeJoining.vue";
import HrManageLeaves from "@/components/hr/ManageLeaves.vue";
import AttendanceHR from "@/components/hr/AttendanceEmployee.vue";
import AttendanceEmployee from "@/components/employee/AttendanceEmployee.vue";
import AssignedProjects from "@/components/employee/AssignedProjects.vue";
import Payroll from "@/components/hr/Payroll.vue";
import DashView from "@/components/dashcompo/MainDashView.vue";
import AllAssignedProjects from "@/components/admin/AllAssignedProjects.vue";
import AssignProjectEmployee from "@/components/hr/AssignProjectEmployee.vue";
import TwoFa from "@/views/TwoFa.vue";
import QR from "@/views/QR.vue";
import Salaries from "@/components/admin/Salaries.vue";
import EmpWorkingHours from "@/components/admin/EmpWorkingHours.vue";
import ForgotPassword from "@/views/auth/ForgotPassword.vue";
import Announcements from "@/components/admin/Announcements.vue";
import ManagePerks from "@/components/admin/ManagePerks.vue";
import CreatePerks from "@/components/admin/CreatePerks.vue";   
import EditProfile from "@/views/EditProfile.vue";
import ApplyPerks from "@/components/employee/ApplyPerks.vue";
// Create Vue Router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/Twofa",
      name: "TwoFa",
      component: TwoFa,
    },
    {
      path: "/QR",
      name: "QR",
      component: QR,
    },

    {
      path: "/forgot-pass",
      component: ForgotPass,
    },
    {
      path: "/password-setup",
      component: SetPassword,
    },
    {
      path: "/password-reset",
      component: ForgotPassword,
    },
    {
      path: "/edit-profile",
      name: "EditProfile",
      component: EditProfile,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: RouteService("User can get salary invoice", ["admin","employee","hr"]),
      children: [
        {
          path: "",
          name: "DashView",
          component: DashView,
        },
        {
          path: "announcements",
          component: Announcements,
          beforeEnter: RouteService('User can manage Announcement',['admin','hr']),
        },
        {
          path: "manage-perks",
          component: ManagePerks,
          beforeEnter: RouteService('User can get perk requests', ["admin","hr"]),
        },
        {
          path: "create-perks",
          component: CreatePerks,
          beforeEnter: RouteService('User can create perks', ["admin"]),
        },
        {
          path: "apply-perks",
          component: ApplyPerks,
          beforeEnter: RouteService('User Can send perk requests', ["employee","hr"]),
        },

        {
          path: "check",
          name: "CheckInOut",
          component: CheckInOut,
          beforeEnter: RouteService("User can Check-in/Check-out", [
            "employee",
            "hr",
          ]),
        },
        {
          path: "leave-application",
          name: "LeaveApplication",
          component: LeaveApplication,
          beforeEnter: RouteService("User can submit Leave Applications", [
            "employee",
            "hr"
          ]),
        },
        {
          path: "attendance-employee",
          name: "AttendanceEmployee",
          component: AttendanceEmployee,
          beforeEnter: RouteService("User can see Attendance Records", [
            "employee",
            "hr"
          ]),
        },
        {
          path: "assignedProjects",
          name: "AssignedProjects",
          component: AssignedProjects,
          beforeEnter: RouteService("User can see their assigned projects", [
            "employee",
          ]),
        },
        {
          path: "working-hours",
          name: "WorkingHours",
          component: WorkingHours,
          beforeEnter: RouteService("User can see Working Hours", [
            "employee",
            "hr",
          ]),
        },
        {
          path: "add-employee",
          name: "AddEmployee",
          component: AddEmployee,
          beforeEnter: RouteService("User can add users (employee,hr)", [
            "admin",
          ]),
        },
        {
          path: "all-employee",
          name: "AllEmployee",
          component: AllEmployee,
          beforeEnter: RouteService("User can see all employee", ["admin"]),
        },
        {
          path: "projects",
          name: "Projects",
          component: Projects,
          beforeEnter: RouteService("User can create projects", ["admin"]),
        },
        {
          path: "department-management",
          component: DepartmentManagement,
          beforeEnter: RouteService("User can add department", ["admin"]),
        },
        {
          path: "employee-joining",
          component: HrEmployeeJoining,
        },
        {
          path: "manage-leaves-hr",
          component: HrManageLeaves,
          beforeEnter: RouteService("User can see Attendance Records", [
            "admin",
            "hr",
          ]),
        },
        {
          path:"all-working-hours",
          component:EmpWorkingHours,
          beforeEnter: RouteService('User can see Attendance Records', ['admin','hr']),
        },
        {
          path: "attendance-hr",
          component: AttendanceHR,
          beforeEnter: RouteService("User can see Attendance Records", [
            "employee",
            "hr",
          ]),
        },
        {
          path: "payroll-hr",
          component: Payroll,
          beforeEnter: RouteService("User can get salary invoice", [
            "employee",
            "hr",
          ]),
        },
        {
          path: "salaries",
          component: Salaries,
          beforeEnter: RouteService('User can get salary invoice', ['admin','hr']),
        },
        {
          path: "assign-projects-employee",
          component: AssignProjectEmployee,
          beforeEnter: RouteService("User can assign Projects to employees", [
            "hr",
          ]),
        },
        {
          path: "all-assign-projects",
          component: AllAssignedProjects,
          beforeEnter: RouteService(
            "User can view employee assigned projects",
            ["admin", "hr"]
          ),
        },
       
        
      ],
    },
  ],
});

export default router;
