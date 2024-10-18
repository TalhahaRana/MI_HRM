import ApiServices from "@/services/ApiServices";

const state = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  permissions: localStorage.getItem("permissions") ? JSON.parse(localStorage.getItem("permissions")) : [],
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  user: (state) => state.user,
  userRole: (state) => state.role, // Returns user role from state
  hasPermission: (state) => (permission) => state.permissions.includes(permission), // Checks permission from state
};

const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await ApiServices.PostRequest('/login', credentials);
      commit("setUserData", response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async passwordSetup({ commit }, passwordData) {
    try {
      const response = await ApiServices.PostRequest('/password-setup', passwordData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async updateUser({ commit }, userData) {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await ApiServices.PutRequest(
        "/user/update",
        userData.updatedData, // Payload should be correctly structured here
        { headers }
      );
      
      alert("User updated successfully");
      return response;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error; // Add the `throw error` statement here to properly handle the error
    }
  },

  async verify2FACode({ commit }, twoFaCode) {
    try {
      const data = { two_fa_code: twoFaCode };
      const response = await ApiServices.PostRequestHeader('/verify-2fa-code', data);
      
      // Commit user data (token, user info, role, permissions) after successful 2FA
      commit('setUserData', response.data);

      // Save token, user, role, and permissions to localStorage for persistence
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("permissions", JSON.stringify(response.data.permissions));

      return response;
    } catch (error) {
      console.error('Error verifying 2FA code:', error);
      throw error;
    }
  },

  async logout({ commit }) {
    commit("clearUserData");

    // Clear token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("permissions");

    // Clear role and permissions from other Vuex modules, if applicable
    await this.dispatch('roles/clearRoleAndPermissions');
  },
};

const mutations = {
  setUserData(state, userData) {
    state.user = userData;
    state.token = userData.token;
    state.role = userData.role; // Ensure role is set here
    state.permissions = userData.permissions;
  },
  clearUserData(state) {
    state.user = null;
    state.token = null;
    state.role = null;
    state.permissions = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
