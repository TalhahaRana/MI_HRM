<template>
  <nav id="sidebar" :class="{ 'd-block': visible, 'd-none': !visible }">
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
          <i class="icon far fa-band-aid"></i> Manage Leaves
        </router-link>
      </li>
      <li>
        <router-link
          to="/dashboard/department-management"
          class="redirect-link"
        >
          <i class="icon fas fa-building"></i> Manage Department
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
        <router-link
          to="/dashboard/department-management"
          class="redirect-link"
        >
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
</template>

<script>
export default {
  name: "SideBar",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
/* General Navbar Styling */
.navbar {
  padding: 10px;
  color: black;
  font-weight: 400;
  box-shadow: 0px 5px 21px -5px #cdd1e1;
  transition: background 0.25s ease;
}

/* Sidebar Styles */
#sidebar {
  background: var(--side);
  border-radius: 14px;
  box-shadow: 0 0.1875rem 0.5rem 0 rgba(34, 48, 62, 0.1);
  padding: 15px;
  width: 250px;
}

/* Sidebar List Items */
#sidebar ul {
  padding-left: 0;
}

#sidebar ul li {
  padding: 10px 0;
  margin: 0 7px;
  display: flex;
  align-items: center;
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
  font-size: 1.2em;
}

#sidebar ul li:hover {
  background-color: #4b49ac;
  cursor: pointer;
  padding: 6px;
}

#sidebar ul li:hover a {
  color: whitesmoke;
}

#sidebar ul li:hover .icon {
  color: whitesmoke;
}

/* Profile & Logout Button Styles */
.profile-settings-btn,
.logout-btn {
  background-color: transparent;
  border: none;
  color: #6c7383;
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

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  #sidebar {
    width: 100%;
    transition: width 0.3s ease-in-out;
  }

  .dashboard-title {
    display: none;
  }

  #content {
    margin-top: 56px;
    width: 100%;
  }
}

/* Profile Menu */
.profile-menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 60px;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
