import { createRouter, createWebHistory } from "vue-router";
import RouteService from "@/services/RouteGuard"; // Import route guard logic
import AssignProject from "@/components/hr/AssignProject.vue";
// Import all the components/views used in the routes
import Login from "../views/auth/Login.vue";
import ForgotPass from "@/views/auth/ForgotPass.vue";
import SetPassword from "@/views/auth/SetPassword.vue";
import AddEmployee from "@/components/admin/AddEmployee.vue";
import AllEmployee from "@/components/admin/AllEmployee.vue";
import Attendance from "@/components/admin/Attendance.vue";
import DepartmentManagement from "@/components/admin/DepartmentManagement.vue";
import CheckInOut from "@/components/employee/CheckInOut.vue";
import LeaveApplication from "@/components/employee/leaveApplication.vue";
import WorkingHours from "@/components/employee/workingHours.vue";
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
import ManageLeaves from "@/components/admin/Leaves.vue"; // Import corrected
import Payroll from "@/components/hr/Payroll.vue";
import ManageProjectsHR from "@/components/hr/ManageProjects.vue";
import DashView from "@/components/dashcompo/DashView.vue";
import AllAssignedProjects from "@/components/admin/AllAssignedProjects.vue";
import AssignProjectEmployee from "@/components/hr/AssignProjectEmployee.vue";
import TwoFa from "@/views/TwoFa.vue";
import QR from "@/views/QR.vue";
import Salaries from "@/components/admin/Salaries.vue";
import EmpWorkingHours from "@/components/admin/EmpWorkingHours.vue";

//Profile
import Profile from "@/components/profile.vue";

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
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      // beforeEnter: (to, from, next) => {
      //   const result = RouteService("User can get salary invoice");
      //   if (result === true) {
      //     next(); 
      //   } else {
      //     next(result); 
      //   }
      // },
      beforeEnter: RouteService('User can get salary invoice', ['admin','employee','hr']),
      children: [
        {
          path: "",
          name: "DashView",
          component: DashView, // Default child route for Dashboard
        },
       
        {
          path: "check",
          name: "CheckInOut",
          component: CheckInOut,
          beforeEnter: RouteService('User can Check-in/Check-out', ['employee','hr']),
        },
        {
          path: "leave-application",
          name: "LeaveApplication",
          component: LeaveApplication,
          beforeEnter: RouteService('User can submit Leave Applications', ['employee','hr']),
        },
        {
          path: "attendance-employee",
          name: "AttendanceEmployee",
          component: AttendanceEmployee,
          beforeEnter: RouteService('User can see Attendance Records', ['employee','hr']),
        },
        {
          path: "assignedProjects",
          name: "AssignedProjects",
          component: AssignedProjects,
          beforeEnter: RouteService('User can see their assigned projects', ['employee']),
        },
        {
          path: "working-hours",
          name: "WorkingHours",
          component: WorkingHours,
          beforeEnter: RouteService('User can see Working Hours', ['employee','hr']),
        },
        // {
        //   path: "attendance",
        //   name: "Attendance",
        //   component: Attendance,
        //   beforeEnter: (to, from, next) => {
        //     next(RouteService('User can see Attendance Record of all users', to));
        //   },
        // },
        // {
        //   path: "department-management",
        //   name: "DepartmentManagement",
        //   component: DepartmentManagement,
        //   beforeEnter: (to, from, next) => {
        //     next(RouteService('User can manage all users department and position (update)', to));
        //   },
        // },
        // {
        //   path: "addHr",
        //   name: "AddHR",
        //   component: AddHR,
        //   beforeEnter: (to, from, next) => {
        //     next(RouteService("Admin can add HR", to));
        //   },
        // },
        // {
        //   path: "all-hr",
        //   name: "AllHR",
        //   component: AllHR,
        //   beforeEnter: (to, from, next) => {
        //     next(RouteService("Admin can view all HR", to));
        //   },
        // },
        {
          path: "add-employee",
          name: "AddEmployee",
          component: AddEmployee,
          beforeEnter: RouteService('User can add users (employee,hr)', ['admin']),
        },
        {
          path: "all-employee",
          name: "AllEmployee",
          component: AllEmployee,
          beforeEnter: RouteService('User can see all employee', ['admin']),
        },
        {
          path: "projects",
          name: "Projects",
          component: Projects,
          beforeEnter: RouteService('User can create projects', ['admin']),
          
        },
        // {
        //   path: "manage-leaves",
        //   component: ManageLeaves,
        //   beforeEnter: (to, from, next) => {
        //     next(RouteService('User can view attendance records', to));
        //   },
        // },
        // {
        //   path: "checkout",
        //   component: HrCheckoutCheckIn,
        //   beforeEnter: (to, from, next) => {
        //     next(RouteService('User can Check-in/Check-out', to));
        //   },
        // },
        {
          path: "department-management",
          component: DepartmentManagement,
          beforeEnter: RouteService('User can add department', ['admin']),
          
        },
        {
          path: "employee-joining",
          component: HrEmployeeJoining,
          // beforeEnter: (to, from, next) => {
          //   next(RouteService("HR can handle employee joining", to));
          // },
        },
        {
          path: "manage-leaves-hr",
          component: HrManageLeaves,
          beforeEnter: RouteService('User can see Attendance Records', ['admin','hr']),
          
        },
        {
          path:"all-working-hours",
          component:EmpWorkingHours,
          beforeEnter: RouteService('User can see Attendance Records', ['admin','hr']),
        },
        {
          path: "attendance-hr",
          component: AttendanceHR,
          beforeEnter: RouteService('User can see Attendance Records', ['employee','hr']),
          
        },
        {
          path: "payroll-hr",
          component: Payroll,
          beforeEnter: RouteService('User can get salary invoice', ['employee','hr']),
        },
        {
          path: "salaries",
          component: Salaries,
          beforeEnter: RouteService('User can get salary invoice', ['admin']),
        },
        // {
        //   path: "manage-projects-hr",
        //   component: ManageProjectsHR,
        //   beforeEnter: (to, from, next) => {
        //     next(RouteService('User can create Projects', to));
        //   },
        // },
        {
          path:"assign-projects-employee",
          component:AssignProjectEmployee,
          beforeEnter: RouteService('User can assign Projects to employees', ['hr']),
        },
        {
          path:"all-assign-projects",
          component:AllAssignedProjects,
          beforeEnter: RouteService('User can view employee assigned projects', ['admin','hr']),
        }
      ],
    },
  ],
});

export default router;
