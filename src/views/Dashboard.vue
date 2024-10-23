<template>
  <div>
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
                <button class="profile-settings-btn">
                  <img class="profile-icon" src="../assets/images/user.png" alt="">
                </button>
                <button class="Btn" @click="logout">
                  <div class="sign">
                    <svg viewBox="0 0 512 512">
                      <path
                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
                      </path>
                    </svg>
                  </div>

                  <div class="text">Logout</div>
                </button>

                <!-- <button class="logout-btn " @click="logout">
              <img class="profile-icon" src="../assets/images/logout.gif" alt="">
            </button> -->
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Navbar -->
    <div class="container-fluid bg" style="background-color: #f5f7ff">
      <div class="d-flex">
        <div :class="{
          'sidebar-expanded': sidebarVisible,
          'sidebar-collapsed': !sidebarVisible,
        }">
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
import EmpView from "@/components/employee/EmployeeDashboard.vue";
import store from '@/stores';
export default {
  name: "Dashboard",
  components: { SideBar, DashView, EmpView },
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
      EmpView
    };
  },
};
</script>

<style scoped>
.navbar-brand {
  font-size: 22px;
  color: rgb(7, 7, 7);
}

.bg {
  height: 100vh;
}

/* Adjust the sidebar and main content */
.sidebar-expanded {
  padding: 25px 4px;
  width: 250px;
  transition: width 0.3s ease-in-out;
}

.sidebar-collapsed {
  width: 0;
  transition: width 0.3s ease-in-out;
}

.main-content {
  padding: 25px 14px;

  flex-grow: 1;
  transition: margin-left 0.3s ease-in-out;
}

.sidebar-collapsed~.main-content {
  margin-left: 0;
}

/* .container {
  display: flex;
} */

.profile-menu {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-left: 15px;
  gap: 10px;
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

/* From Uiverse.io by MUJTABA201566 */
.Btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: white;
}

/* plus sign */
.sign {
  width: 100%;
  transition-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: black;
}

/* text */
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: 0.3s;
}

/* hover effect on button width */
.Btn:hover {
  background-color: black;
  width: 125px;
  border-radius: 40px;
  transition-duration: 0.3s;
}
/* From Uiverse.io by MUJTABA201566 */ 
.Btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: white;
}

/* plus sign */
.sign {
  width: 100%;
  transition-duration: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 17px;
}

.sign svg path {
  fill: black;
}
/* text */
.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: 0.3s;
}
/* hover effect on button width */
.Btn:hover {
  background-color: black;
  width: 125px;
  border-radius: 40px;
  transition-duration: 0.3s;
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: 0.3s;
  padding-left: 20px;
}

.Btn:hover .sign svg path {
  fill: white;
}

/* hover effect button's text */
.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: 0.3s;
  padding-right: 10px;
}
/* button click effect*/
.Btn:active {
  transform: translate(2px, 2px);
}


.Btn:hover .sign {
  width: 30%;
  transition-duration: 0.3s;
  padding-left: 20px;
}

.Btn:hover .sign svg path {
  fill: white;
}

/* hover effect button's text */
.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: 0.3s;
  padding-right: 10px;
}

/* button click effect*/
.Btn:active {
  transform: translate(2px, 2px);
}
</style>
