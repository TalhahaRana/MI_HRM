import ApiServices from "@/services/ApiServices";
import { useRouter } from "vue-router";
const state = {
  user: null,
};
const getters = {
  isAuthenticated: (state) => !!state.user,
  user: (state) => state.user,
};
const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await ApiServices.PostRequest('/login', credentials);
      console.log("Resssssssssssss",response.data);
      commit("setUser", response.data);
      return response;
    } catch (error) {
      throw error; 
    }
  },
  async passwordSetup({commit},passwordData){
    try{
      const response=await ApiServices.PostRequest('/password-setup',passwordData)
    }catch(error){
      throw error;
    }
  },
  async logout({ commit }) {
    commit("clearUser");
    // Clear token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    localStorage.removeItem("roles");
    // Clear role and permissions from localStorage (assuming these are managed in another module)
    await this.dispatch('roles/clearRoleAndPermissions'); // Assuming you have 'roles.js' module
    // Redirect to login page

  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearUser(state) {
    state.user = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
