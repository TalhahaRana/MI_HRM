<template>
  <div>
    <nav class="navbar" style="background-color: #ffffff; width: 99%">
      <div class="container-fluid d-block">
        <div class="row">
          <div class="col-5 row">
            <div class="d-flex align-items-center gap-5">
              <div class="header-left">
                <img width="150px" height="45px" src="../assets/images/logo.png" />
              </div>
              <button class="btn" type="button" id="sidebarToggle" @click="toggleSidebar">
                <i class="fa-xl fa-solid fa-bars"></i>
              </button>
            </div>
          </div>

          <div class="col-7 row">
            <div class="profile-menu">
              <button v-if="isHRorEmployee" class="profile-settings-btn" @click="toggleDropdown">
                <img class="message-icon" src="../assets/images/open.png" alt="Messages" />

                <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
              </button>


              <div v-if="showDropdown" class="dropdown">
                <EmployeeAnnouncements @close="showDropdown = false" @markAsRead="markAnnouncementAsRead" />
              </div>

              <button class="profile-settings-btn">
                <img class="profile-icon" src="../assets/images/user.png" alt="Profile" />
              </button>
              <button class="logout-btn" @click="logout">
                <img class="profile-icon" src="../assets/images/logout.gif" alt="Logout" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="container-fluid" style="background-color: #f5f7ff">
      <div class="d-flex">
        <div :class="{ 'sidebar-expanded': sidebarVisible, 'sidebar-collapsed': !sidebarVisible }">
          <SideBar :visible="sidebarVisible" />
        </div>
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import SideBar from "./SideBar.vue";
import EmployeeAnnouncements from "./EmployeeAnnouncements.vue";

export default {
  name: "Dashboard",
  components: { SideBar, EmployeeAnnouncements },
  setup() {
    const sidebarVisible = ref(false);
    const showDropdown = ref(false);
    const isHRorEmployee = ref(false);
    const store = useStore();
    const router = useRouter();

    // Fetch announcements on mount
    onMounted(async () => {
      const storedRole = localStorage.getItem("userRole");
      if (storedRole === "hr" || storedRole === "employee") {
        isHRorEmployee.value = true;
      }

      // Fetch announcements when dashboard is loaded
      await store.dispatch('employee/fetchAnnouncements');
    });

    // Calculate unread announcements count
    const unreadCount = computed(() => {
      return store.state.employee.announcements.filter(announcement => !announcement.is_read).length;
    });

    const toggleSidebar = () => {
      sidebarVisible.value = !sidebarVisible.value;
    };

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    // Mark announcement as read when clicked
    const markAnnouncementAsRead = (announcementId) => {
      store.dispatch('employee/markAsRead', announcementId);
    };

    const logout = () => {
      localStorage.removeItem("userRole");
      router.push("/");
    };

    return {
      sidebarVisible,
      toggleSidebar,
      toggleDropdown,
      unreadCount,
      markAnnouncementAsRead,
      isHRorEmployee,
      showDropdown,
      logout,
    };
  },
};
</script>


<style scoped>
/* Styles from your current component */

.navbar-brand {
  font-size: 22px;
  color: rgb(7, 7, 7);
}

.bg {
  height: 100vh;
}

/* Adjust the sidebar and main content */
.sidebar-expanded {
  width: 250px;
  transition: width 0.3s ease-in-out;
}

.sidebar-collapsed {
  width: 0;
  transition: width 0.3s ease-in-out;
}

.main-content {
  flex-grow: 1;
  transition: margin-left 0.3s ease-in-out;
}

.sidebar-collapsed ~ .main-content {
  margin-left: 0;
}

.profile-menu {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-left: 60px;
}

.profile-icon,
.message-icon {
  width: 35px;
}

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

@media (max-width: 425px) {
  img {
    display: none;
  }
}

.dropdown {
  position: absolute;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 450px;
  top: 32px;
  right: 20px;


}

.dropdown ul {
  list-style-type: none;
  padding: 0;
  margin: 0;

}

.dropdown ul li {
  padding: 10px 10px 10px 20px;
  cursor: pointer;

}

.dropdown ul li:hover {
  background-color: #f0f0f0;
}

.message-icon {
  width: 30px;
  height: 30px;
}

.badge {
  background-color: red; /* Badge color */
  color: white; /* Text color */
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 13px;
  position: absolute;
  top: 0; /* Adjust based on your layout */
  right: 125px; /* Adjust based on your layout */
}
</style>
