<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav
      id="sidebar"
      :class="{
        'd-none d-md-block': !sidebarVisible,
        'd-block': sidebarVisible,
      }"
    >
      <div class="sidebar-header">
        <h4>Dashboard</h4>
      </div>
      <hr style="border: 1px solid black;" />
      <ul class="list-unstyled components">
        <li >
          <router-link
            to="/mainDashboard/studentRequests"
            class="redirect-link"
          >
            <i class="icon fas fa-tachometer-alt"></i> Add Employee
          </router-link>
        </li>
        <li >
          <router-link to="/mainDashboard/addManager" class="redirect-link">
            <i class="icon fas fa-tachometer-alt"></i> All Employees
          </router-link>
        </li>
        <li >
          <router-link to="/mainDashboard/createQuiz" class="redirect-link">
            <i class="icon fas fa-tachometer-alt"></i> Manage Leaves
          </router-link>
        </li>
        <li >
          <router-link to="/mainDashboard/assignQuiz" class="redirect-link">
            <i class="icon fas fa-tachometer-alt"></i> Manage Department
          </router-link>
        </li>
        <li >
          <router-link to="/mainDashboard/viewAllQuiz" class="redirect-link">
            <i class="icon fas fa-tachometer-alt"></i> Employee Designations
          </router-link>
        </li>
        <li >
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
            <i class="icon fas fa-tachometer-alt"></i> Manage Projects
          </router-link>
        </li>
        <li >
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
            <i class="icon fas fa-tachometer-alt"></i> Check-in/Check-out
          </router-link>
        </li>
        <!-- HR -->
        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
            <i class="icon fas fa-tachometer-alt"></i> Manage Employee Leaves
          </router-link>
        </li>
        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
            <i class="icon fas fa-tachometer-alt"></i> Manage Employee Leaves
          </router-link>
        </li>
        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
            <i class="icon fas fa-tachometer-alt"></i> Manage Attendance
          </router-link>
        </li>
        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
            <i class="icon fas fa-tachometer-alt"></i> Department Management
          </router-link>
        </li>
        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
            <i class="icon fas fa-tachometer-alt"></i>Payroll
          </router-link>
        </li> 
        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
            <i class="icon fas fa-tachometer-alt"></i>Check-in/Check-out Tracking
          </router-link>
        </li>  

        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
            <i class="icon fas fa-tachometer-alt"></i>Employee Joining Dates
          </router-link>
        </li>

        <!-- Employees -->

        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
            <i class="icon fas fa-tachometer-alt"></i>Check-in/Check-out
          </router-link>
        </li>
        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
          <i class="icon fas fa-tachometer-alt"></i>View Attendance
          </router-link>
        </li>
        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
          <i class="icon fas fa-tachometer-alt"></i>View Department
          </router-link>
        </li>
        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
          <i class="icon fas fa-tachometer-alt"></i>View Department
          </router-link>
        </li>
        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
          <i class="icon fas fa-tachometer-alt"></i>Working Hours
          </router-link>
        </li>
        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
          <i class="icon fas fa-tachometer-alt"></i>Assigned Projects
          </router-link>
        </li>

        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
          <i class="icon fas fa-tachometer-alt"></i>Assigned Projects
          </router-link>
        </li>
        <li>
          <router-link
            to="/mainDashboard/studentAssignQuiz"
            class="redirect-link"
          >
          <i class="icon fas fa-tachometer-alt"></i>Completed Projects
          </router-link>
        </li>
      </ul>
    </nav>
    <!-- Main Content -->
    <div id="content" class="flex-grow-1">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <!-- Toggle button for sidebar in mobile -->
          <button
            class="btn btn-primary d-md-none"
            type="button"
            id="sidebarToggle"
            @click="toggleSidebar"
          >
            ☰
          </button>
         <div class="profile-menu ms-auto">
            <!-- <img
              src="@/assets/profileImage.png"
              alt="Profile"
              class="profile-img"
            /> -->
            <div class="header-right">
            <button class="profile-settings-btn" @click="goToProfileSettings">
              <i class="fas fa-user-circle"></i> Profile
            </button>
            <button class="logout-btn" @click="logout">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
         </div>
        </div>
      </nav>
      <div class="child">
      <!-- Router View -->
      <router-view></router-view>
    </div>
    </div>
  </div>
</template>
<script >
import { ref, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  name:'Dashoard',
  setup() {
    const sidebarVisible = ref(false);

    const toggleSidebar = () => {
      sidebarVisible.value = !sidebarVisible.value;
    };

    const goToProfileSettings = () => {
      // Logic to navigate to profile settings
    };

    const logout = () => {
      // Logic for logout
    };

    return {
      sidebarVisible,
      toggleSidebar,
      goToProfileSettings,
      logout,
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
.wrapper {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
}
.navbar-brand {
  font-size: 22px;
  color: rgb(7, 7, 7);
}
#sidebar {
  background: var(--side);
  width: 260px;
  padding: 15px;
  color: white;
  text-align: left;
 
}
.sidebar-header {
  text-align: center;
  color: black;
 
}
.child{

  flex-grow: 1; 
  background-color: #F5F7FF;
  padding: 20px; 
  overflow-y: auto; 
  height: 100vh;
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
  color: black;
  display: flex;
  align-items: center;
  text-decoration: none;
}

#sidebar ul li a i.icon {
  margin-right: 10px; /* Space between icon and text */
  font-size: 1.2em; /* Adjust icon size if needed */
}

#sidebar ul li a:hover {
  color: white; /* Change text color to white on hover */
  background-color: var(--basic-button); /* Change background color on hover */
  padding: 15px; /* Increase padding to extend hover height */
  border-radius: 4px; /* Optional: add rounded corners */
  transition: all 0.3s;
  width:220px;
}

#sidebar ul li:hover .icon {
  color: white; /* Change icon color on hover */
}

.icon {
  color: black; /* Initial icon color */
}
.header-right {
    display: flex;
    align-items: center;
    padding: 6px;
  }
  .profile-settings-btn, .logout-btn {
    background-color: transparent;
    border: none;
    color: var(--side); 
    font-size: 16px;
    margin-left: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  
  .profile-settings-btn i, .logout-btn i {
    margin-right: 8px;
    font-size: 22px;
  }
  /* .profile-settings-btn:hover, .logout-btn:hover {
    color: var(--light-grey); 
  } */

/* Fix sidebar position in mobile */

@media (max-width: 768px) {
  #sidebar {
    width: 100%;
    height: auto;
    position: fixed; /* Make sidebar fixed */
    top: 56px; /* Align below the fixed navbar */
    left: 0; /* Align to the left */
    z-index: 9999;
    display: none;
  }

  #sidebar.d-block {
    display: block; /* Show when sidebar is toggled */
  }

  .wrapper {
    flex-direction: column;
  }
  .navbar {
    margin-top: -60px;
    top: 0;
  }
  .navbar-brand {
    display: none;
  }
  #content {
    margin-top: 56px; /* Ensure main content doesn't overlap the navbar */
    width: 100%;
  }
}

/* Navbar */
.navbar {
  padding: 10px;
  color: black;
  background-color: var(--basic-button);
}

.profile-menu {
  display: flex;
  align-items: center;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
