<template>
  <nav class="navbar">
    <div class="container-fluid d-block">
      <div class="row">
        <div class="col-5 row">
          <button
            class="btn btn-primary d-md-none"
            type="button"
            id="sidebarToggle"
            @click="toggleSidebar"
          >
            ☰
          </button>
          <div class="header-left">
            <h2 class="dashboard-title">Dashboard</h2>
          </div>
        </div>

        <div class="col-7 row">
          <div class="profile-menu">
            <button class="profile-settings-btn">
              <router-link to="./EditProfile">
                <img
                  class="profile-icon"
                  src="../assets/images/user.png"
                  alt=""
                />
              </router-link>
            </button>
            <button class="logout-btn" @click="logout">
              <img
                class="profile-icon"
                src="../assets/images/logout.gif"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div id="content">
    <!-- Navbar -->
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-3">
          <nav
            id="sidebar"
            :class="{
              'd-none d-md-block': !sidebarVisible,
              'd-block': sidebarVisible,
            }"
          >
            <ul class="list-unstyled components">
              <li v-if="hasPermission('User can add users (employee,hr)')">
                <router-link to="/dashboard/add-employee" class="redirect-link">
                  <i class="icon fas fa-user-plus"></i> Add Employee
                </router-link>
              </li>
              <li v-if="samePermission('User can see all employee')">
                <router-link to="/dashboard/all-employee" class="redirect-link">
                  <i class="icon fas fa-address-card"></i> All Employees
                </router-link>
              </li>
              <li v-if="samePermission('User can see Working Hours')">
                <router-link
                  to="/dashboard/working-hours"
                  class="redirect-link"
                >
                  <i class="icon fas fa-clock"></i> Admin Working Hours
                </router-link>
              </li>
              <!-- <li>
                <router-link to="/dashboard/leaves" class="redirect-link">
                  <i class="icon far fa-band-aid"></i> Manage Leaves
                </router-link>
              </li> -->
              <li v-if="hasPermission('User can add department')">
                <router-link
                  to="/dashboard/department-management"
                  class="redirect-link"
                >
                  <i class="icon fas fa-building"></i> Manage Department
                </router-link>
              </li>
              <li v-if="hasPermission('User can create projects')">
                <router-link to="/dashboard/projects" class="redirect-link">
                  <i class="icon fas fa-project-diagram"></i> Manage Projects
                </router-link>
              </li>
              <li
                v-if="hasPermission('User can view employee assigned projects')"
              >
                <router-link
                  to="/dashboard/all-assign-projects"
                  class="redirect-link"
                >
                  <i class="icon fas fa-project-diagram"></i> Employee Assigned
                  Projects
                </router-link>
              </li>

              <!-- <li>
                <router-link to="/dashboard/checkout" class="redirect-link">
                  <i class="icon far fa-stopwatch"></i> Check-in/Check-out
                </router-link>
              </li> -->
              <!-- <li>
                <router-link
                  to="/dashboard/manage-leaves"
                  class="redirect-link"
                >
                  <i class="icon fas fa-calendar-check"></i> Manage Attendance
                </router-link>
              </li> -->
              <!-- HR -->
              <li v-if="samePermission('User can see Attendance Records')">
                <router-link
                  to="/dashboard/manage-leaves-hr"
                  class="redirect-link"
                >
                  <i class="icon fas fa-user-times"></i> Manage Employee Leaves
                </router-link>
              </li>
              <li v-if="hasPermission('User can assign Projects to employees')">
                <router-link
                  to="/dashboard/assign-projects-employee"
                  class="redirect-link"
                >
                  <i class="icon fas fa-user-times"></i> Assign Projects
                </router-link>
              </li>

              <li v-if="!samePermission('User can see Attendance Records')">
                <router-link
                  to="/dashboard/attendance-hr"
                  class="redirect-link"
                >
                  <i class="icon fas fa-user-clock"></i> View Attendance
                </router-link>
              </li>
              <!-- <li>
                <router-link
                  to="/dashboard/department-management"
                  class="redirect-link"
                >
                  <i class="icon fas fa-building"></i> Department Management
                </router-link>
              </li> -->
              <li v-if="!samePermission('User can get salary invoice')">
                <router-link to="/dashboard/payroll-hr" class="redirect-link">
                  <i class="icon fas fa-money-check-alt"></i> Payroll
                </router-link>
              </li>
              <!-- <li>
                <router-link
                  to="/dashboard/manage-projects-hr"
                  class="redirect-link"
                >
                  <i class="icon fas fa-tasks"></i> Manage Projects HR
                </router-link>
              </li> -->
              <!-- <li v-if="hasPermission('User can Check-in/Check-out')">
                <router-link to="/dashboard/checkout" class="redirect-link">
                  <i class="icon fas fa-user-check"></i> Check-in/Check-out
                  Tracking
                </router-link>
              </li> -->
              <!-- <li>
                <router-link
                  to="/dashboard/employee-joining"
                  class="redirect-link"
                >
                  <i class="icon fas fa-calendar-plus"></i> Employee Joining
                  Dates
                </router-link>
              </li> -->

              <!-- Employees -->
              <li v-if="hasPermission('User can Check-in/Check-out')">
                <router-link to="/dashboard/check" class="redirect-link">
                  <i class="icon fas fa-user-check"></i> Check-in/Check-out
                </router-link>
              </li>
              <li v-if="hasPermission('')">
                <router-link
                  to="/dashboard/attendance-employee"
                  class="redirect-link"
                >
                  <i class="icon fas fa-calendar-alt"></i> View Attendance
                </router-link>
              </li>
              <li v-if="hasPermission('User can submit Leave Applications')">
                <router-link
                  to="/dashboard/leave-application"
                  class="redirect-link"
                >
                  <i class="icon fas fa-file-alt"></i> Apply Leave
                </router-link>
              </li>
              <li v-if="!samePermission('User can see Working Hours')">
                <router-link
                  to="/dashboard/working-hours"
                  class="redirect-link"
                >
                  <i class="icon fas fa-clock"></i> Working Hours
                </router-link>
              </li>
              <li v-if="hasPermission('User can see their assigned projects')">
                <router-link
                  to="/dashboard/assignedProjects"
                  class="redirect-link"
                >
                  <i class="icon fas fa-clipboard-list"></i> Assigned Projects
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-9">
          <div class="child main-content">
            <!-- Router View -->
            <div class="container">
              <!-- <DashView /> -->
            </div>
            <router-view> </router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import DashView from "../components/dashcompo/DashView.vue";

import store from "@/stores";
export default {
  name: "Dashboard",
  setup() {
    const sidebarVisible = ref(false);
    const router = useRouter();
    // store=useStore();
    const toggleSidebar = () => {
      sidebarVisible.value = !sidebarVisible.value;
    };

    const closeSidebar = () => {
      sidebarVisible.value = false;
    };

    // Close the sidebar automatically when navigating to a new route
    watch(
      () => router.currentRoute.value,
      () => {
        closeSidebar(); // Automatically close sidebar on route change
      }
    );
    const hasPermission = (permission) => {
      return store.getters["roles/hasPermission"](permission);
      //return true;
    };
    const samePermission = (permission) => {
      const isPermission = store.getters["roles/hasPermission"](permission);
      const role = store.getters["roles/userRole"];
      console.log("Same Permission Role", role);
      if (isPermission) {
        if (role == "employee") {
          return false;
        }
        if (role == "admin" || !(role == "hr" && isPermission)) {
          console.log("her!!!!!!!!!!!!!e");
          return true;
        } else {
          return false;
        }
      }
      return false;
    };
    const goToProfileSettings = () => {
      // Logic to navigate to profile settings
    };

    const logout = async () => {
      try {
        // Dispatch the logout action from Vuex
        await store.dispatch("auth/logout");

        // Redirect to the login page
        router.push("/");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    return {
      sidebarVisible,
      toggleSidebar,
      closeSidebar,
      logout,
      DashView,
      hasPermission,
      samePermission,
    };
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>
<style scoped>
/* Layout */
/* .wrapper {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
} */
.navbar-brand {
  font-size: 22px;
  color: rgb(7, 7, 7);
}

#sidebar {
  background: var(--side);
  border-radius: 14px;
  box-shadow: 0 0.1875rem 0.5rem 0 rgba(34, 48, 62, 0.1);
  padding: 15px;
}
.main-content {
  border-radius: 14px;
  box-shadow: 0 0.1875rem 0.5rem 0 rgba(34, 48, 62, 0.1);
}

.sidebar-header {
  text-align: center;
  color: black;
}

.child {
  background-color: #f5f7ff;
}

#sidebar ul li {
  padding: 10px 0;
  text-align: left;
  display: flex;
  align-items: center;
  margin-left: 7px;
  margin-right: 7px;
}

#sidebar ul li a {
  color: #6c7383;
  display: flex;
  align-items: center;
  text-decoration: none;
}

#sidebar ul li a i.icon {
  color: #6c7383;
  margin-right: 10px;
  /* Space between icon and text */
  font-size: 1.2em;
  /* Adjust icon size if needed */
}

#sidebar ul li a:hover {
  color: rgb(0, 0, 0);
  /* background-color: var(--basic-button); */
  border: 3px solid transparent;
  border-image: var(--gradient) 1;
  padding: 9px;
  /* border-radius: 4px; */
  transition: all 0.3s;
  width: 100%;
}

#sidebar ul li:hover .icon {
  color: rgb(0, 0, 0);
  /* Change icon color on hover */
}

.icon {
  color: black;
  /* Initial icon color */
}

.profile-settings-btn,
.logout-btn {
  background-color: transparent;
  border: none;
  color: #6c7383;
  font-size: 16px;
  margin-left: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.profile-settings-btn i,
.logout-btn i {
  margin-right: 8px;
  font-size: 22px;
}

/* .profile-settings-btn:hover, .logout-btn:hover {
    color: var(--light-grey); 
  } */

/* Fix sidebar position in mobile */
@media (max-width: 768px) {
  .dashboard-title {
    display: none;
  }
}
@media (max-width: 767px) {
  #sidebar {
    width: 100%;
    height: auto;
    position: relative;
    /* Make sidebar fixed */
    top: -56px;
    /* Align below the fixed navbar */
    left: 0;
    /* Align to the left */
    z-index: 9999;
    display: none;
  }
  #sidebar.d-block {
    display: block;
    /* Show when sidebar is toggled */
  }

  .wrapper {
    flex-direction: column;
  }

  .navbar {
    top: 0;
  }

  .navbar-brand {
    display: none;
  }

  #content {
    margin-top: 56px;
    /* Ensure main content doesn't overlap the navbar */
    width: 100%;
  }
}
@media (min-width: 1200px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl {
    max-width: 1250px;
  }
}

/* Navbar */
.navbar {
  padding: 10px;
  color: black;
  font-weight: 400;
  transition: background 0.25s ease;
  -webkit-transition: background 0.25s ease;
  -moz-transition: background 0.25s ease;
  -ms-transition: background 0.25s ease;
  -webkit-box-shadow: 0px 5px 21px -5px #cdd1e1;
  -moz-box-shadow: 0px 5px 21px -5px #cdd1e1;
  box-shadow: 0px 5px 21px -5px #cdd1e1;
}

.profile-menu {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-left: 15px;
}

.profile-icon {
  width: 35px;
}
</style>
