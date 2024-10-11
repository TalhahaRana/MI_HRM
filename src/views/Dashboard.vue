<template>
  <nav class="navbar">
         <div class="container-fluid d-block">
           <button class="btn btn-primary d-md-none" type="button" id="sidebarToggle" @click="toggleSidebar">
             ☰
           </button>
           <div class="profile-menu justify-content-between ">
            <div class="header-left">
              <h2>
                Dashboard
              </h2>
            </div>
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
   
    <div id="content">
      <!-- Navbar -->
       <div class="container">
         <div class="row">
           <div class="col-md-3">
            <nav id="sidebar" :class="{
          'd-none d-md-block': !sidebarVisible,
          'd-block': sidebarVisible,
        }">
          <!-- <div class="sidebar-header">
            <h4>Dashboard</h4>
          </div> -->
          <hr style="border: 1px solid black;" />
          <ul class="list-unstyled components">
            <li>
              <router-link to="/dashboard/add-employee" class="redirect-link">
                <i class="icon fas fa-user-plus"></i> Add Employee
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/all-employee" class="redirect-link">
                <i class="icon fas fa-address-card"></i> All Employees
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/leaves" class="redirect-link">
                <i class="icon far fa-band-aid "></i> Manage Leaves
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/department-management" class="redirect-link">
                <i class="icon fas  fa-building"></i> Manage Department
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/projects" class="redirect-link">
                <i class="icon fas fa-project-diagram"></i> Manage Projects
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/checkout" class="redirect-link">
                <i class="icon far fa-stopwatch"></i> Check-in/Check-out
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/manage-leaves" class="redirect-link">
                <i class="icon fas fa-calendar-check"></i> Manage Attendance
              </router-link>
            </li>
    
            <!-- HR -->
            <li>
              <router-link to="/dashboard/manage-leaves-hr" class="redirect-link">
                <i class="icon fas fa-user-times"></i> Manage Employee Leaves
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/attendance-hr" class="redirect-link">
                <i class="icon fas fa-user-clock"></i> Manage Attendance
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/department-management" class="redirect-link">
                <i class="icon fas fa-building"></i> Department Management
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/payroll-hr" class="redirect-link">
                <i class="icon fas fa-money-check-alt"></i> Payroll
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/manage-projects-hr" class="redirect-link">
                <i class="icon fas fa-tasks"></i> Manage Projects HR
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/checkout" class="redirect-link">
                <i class="icon fas fa-user-check"></i> Check-in/Check-out Tracking
              </router-link>
            </li>
    
            <li>
              <router-link to="/dashboard/employee-joining" class="redirect-link">
                <i class="icon fas fa-calendar-plus"></i> Employee Joining Dates
              </router-link>
            </li>
    
            <!-- Employees -->
            <li>
              <router-link to="/dashboard/check" class="redirect-link">
                <i class="icon fas fa-user-check"></i> Check-in/Check-out
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/attendance-employee" class="redirect-link">
                <i class="icon fas fa-calendar-alt"></i> View Attendance
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/leave-application" class="redirect-link">
                <i class="icon fas fa-file-alt"></i> Apply Leave
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/working-hours" class="redirect-link">
                <i class="icon fas fa-clock"></i> Working Hours
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/assignedProjects" class="redirect-link">
                <i class="icon fas fa-clipboard-list"></i> Assigned Projects
              </router-link>
            </li>
    
          </ul>
        </nav>
           </div>
           <div class="col-md-9">
    
             <div class="child">
               <!-- Router View -->
               <div class="container">
                 <!-- <DashView /> -->
       
               </div>
               <router-view>
       
       
               </router-view>
             </div>
           </div>
         </div>
       </div>
    </div>
 
</template>
<script>
import { ref, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import DashView from '../components/dashcompo/DashView.vue';

export default {
  name: 'Dashoard',
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
      DashView,
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
  /* width: 260px; */
  padding: 15px;
  color: white;
  text-align: left;

}

.sidebar-header {
  text-align: center;
  color: black;

}

.child {
  background-color: #F5F7FF;
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
  color: #6C7383;
  display: flex;
  align-items: center;
  text-decoration: none;
}

#sidebar ul li a i.icon {
  color: #6C7383;
  margin-right: 10px;
  /* Space between icon and text */
  font-size: 1.2em;
  /* Adjust icon size if needed */
}

#sidebar ul li a:hover {
  color: rgb(0, 0, 0);
  /* Change text color to white on hover */
  /* background-color: var(--basic-button); */
 border: 3px solid transparent;
  border-image: var(--gradient) 1;
  /* Change background color on hover */
  padding: 15px;
  /* Increase padding to extend hover height */
  border-radius: 4px;
  /* Optional: add rounded corners */
  transition: all 0.3s;
  width: 220px;
}

#sidebar ul li:hover .icon {
  color: rgb(0, 0, 0);
  /* Change icon color on hover */
}

.icon {
  color: black;
  /* Initial icon color */
}

.header-right {
  display: flex;
  align-items: center;
  padding: 6px;
}

.profile-settings-btn,
.logout-btn {
  background-color: transparent;
  border: none;
  color: #6C7383;
  font-size: 16px;
  margin-left: 20px;
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
  #sidebar {
    width: 100%;
    height: auto;
    position: fixed;
    /* Make sidebar fixed */
    top: 56px;
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
    .container, .container-lg, .container-md, .container-sm, .container-xl {
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
    -webkit-box-shadow: 0px 5px 21px -5px #CDD1E1;
    -moz-box-shadow: 0px 5px 21px -5px #CDD1E1;
    box-shadow: 0px 5px 21px -5px #CDD1E1;

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
