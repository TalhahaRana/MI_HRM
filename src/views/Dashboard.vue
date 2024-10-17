<template>
  <div>
    <div>
      <nav class="navbar" style="background-color: #ffffff; width: 99%">
        <div class="container-fluid d-block">
          <div class="row">
            <div class="col-5 row">
              <div class="d-flex align-items-center gap-5">
                <div class="header-left">
                  <img
                    width="150px"
                    height="45px"
                    src="../assets/images/logo.png"
                  />
                </div>
                <button
                  class="btn"
                  type="button"
                  id="sidebarToggle"
                  @click="toggleSidebar"
                >
                  <i class="fa-xl fa-solid fa-bars"></i>
                </button>
              </div>
            </div>

            <div class="col-7 row">
              <div class="profile-menu">
                <button class="profile-settings-btn">
              <img class="profile-icon"src="../assets/images/user.png" alt="">
            </button>
            <button class="logout-btn " @click="logout">
              <img class="profile-icon" src="../assets/images/logout.gif" alt="">
            </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Navbar -->
    <div class="container-fluid" style="background-color: #f5f7ff">
      <div class="d-flex">
        <div
          :class="{
            'sidebar-expanded': sidebarVisible,
            'sidebar-collapsed': !sidebarVisible,
          }"
        >
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
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import SideBar from "./SideBar.vue";
import DashView from "../components/dashcompo/DashView.vue";
import store from '@/stores';
export default {
  name: "Dashboard",
  components: { SideBar, DashView },
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


    watch(
      () => router.currentRoute.value,
      () => {
        closeSidebar(); // Automatically close sidebar on route change
      }
    );
    const goToProfileSettings = () => {
      // Logic to navigate to profile settings
    };

    const logout = async () => {
      
      try {
        // Dispatch the logout action from Vuex
        await store.dispatch('auth/logout');

        // Redirect to the login page
         router.push('/');
      } catch (error) {
        console.error('Error during logout:', error);
      } 
    };


    return {
      sidebarVisible,
      toggleSidebar,
      closeSidebar,
      goToProfileSettings,
      logout,
      DashView,
    };
  },
};
</script>

<style scoped>
.navbar-brand {
  font-size: 22px;
  color: rgb(7, 7, 7);
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

/* .container {
  display: flex;
} */

.profile-menu {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-left: 60px;
}
.profile-icon {
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
</style>
