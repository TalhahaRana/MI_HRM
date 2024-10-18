// // // // // // import ApiServices from "@/services/ApiServices";
// // // // // // import { useRouter } from "vue-router";
// // // // // // const state = {
// // // // // //   user: null,
// // // // // // };
// // // // // // const getters = {
// // // // // //   isAuthenticated: (state) => !!state.user,
// // // // // //   user: (state) => state.user,
// // // // // // };
// // // // // // const actions = {
// // // // // //   async login({ commit }, credentials) {
// // // // // //     try {
// // // // // //       const response = await ApiServices.PostRequest('/login', credentials);
// // // // // //       console.log("Resssssssssssss",response.data);
// // // // // //       commit("setUser", response.data);
// // // // // //       return response;
// // // // // //     } catch (error) {
// // // // // //       throw error; 
// // // // // //     }
// // // // // //   },
// // // // // //  // async twoFactor({commit})
// // // // // //   async passwordSetup({commit},passwordData){
// // // // // //     try{
// // // // // //       const response=await ApiServices.PostRequest('/password-setup',passwordData)
// // // // // //     }catch(error){
// // // // // //       throw error;
// // // // // //     }
// // // // // //   },
// // // // // //   async logout({ commit }) {
// // // // // //     commit("clearUser");
// // // // // //     // Clear token from localStorage
// // // // // //     localStorage.removeItem("token");
// // // // // //     localStorage.removeItem("permissions");
// // // // // //     localStorage.removeItem("roles");
// // // // // //     // Clear role and permissions from localStorage (assuming these are managed in another module)
// // // // // //     await this.dispatch('roles/clearRoleAndPermissions'); // Assuming you have 'roles.js' module
// // // // // //     // Redirect to login page

// // // // // //   },
// // // // // // };

// // // // // // const mutations = {
// // // // // //   setUser(state, user) {
// // // // // //     state.user = user;
// // // // // //   },
// // // // // //   clearUser(state) {
// // // // // //     state.user = null;
// // // // // //   },
// // // // // // };

// // // // // // export default {
// // // // // //   namespaced: true,
// // // // // //   state,
// // // // // //   getters,
// // // // // //   actions,
// // // // // //   mutations,
// // // // // // };


// // // // // import ApiServices from "@/services/ApiServices";
// // // // // import { useRouter } from "vue-router";

// // // // // const state = {
// // // // //   user: null,
// // // // // };

// // // // // const getters = {
// // // // //   isAuthenticated: (state) => !!state.user,
// // // // //   user: (state) => state.user,
// // // // // };

// // // // // const actions = {
// // // // //   async login({ commit }, credentials) {
// // // // //     try {
// // // // //       const response = await ApiServices.PostRequest('/login', credentials);
// // // // //       console.log("Resssssssssssss", response.data);
// // // // //       commit("setUser", response.data);
// // // // //       return response;
// // // // //     } catch (error) {
// // // // //       throw error;
// // // // //     }
// // // // //   },

// // // // //   async passwordSetup({ commit }, passwordData) {
// // // // //     try {
// // // // //       const response = await ApiServices.PostRequest('/password-setup', passwordData);
// // // // //     } catch (error) {
// // // // //       throw error;
// // // // //     }
// // // // //   },

// // // // //   // New action to verify the 2FA code
// // // // //   async verify2FACode({ commit }, authCode) {
// // // // //     try {
// // // // //       // Retrieve the token from localStorage (or Vuex state)
// // // // //       const token = localStorage.getItem('token');
      
// // // // //       // Check if the token is available
// // // // //       if (!token) {
// // // // //         throw new Error('Authentication token is missing');
// // // // //       }
  
// // // // //       // Attach token in the request headers
// // // // //       const headers = {
// // // // //         Authorization: `Bearer ${token}`,  // Ensure proper format for Bearer token
// // // // //       };
  
// // // // //       // Send the request to verify the 2FA code
// // // // //       const response = await ApiServices.PostRequest('/verify-2fa-code', { code: authCode }, { headers });
  
// // // // //       // Assuming the response contains token and user data
// // // // //       commit('setUser', response.data);  // Save user data in Vuex state
// // // // //       localStorage.setItem('token', response.data.token);  // Update the token in localStorage
// // // // //       localStorage.setItem('permissions', JSON.stringify(response.data.permissions));  // Store permissions
  
// // // // //       // Redirect to the dashboard
// // // // //       const router = useRouter();
// // // // //       router.push('/dashboard');
// // // // //     } catch (error) {
// // // // //       console.error('Error verifying 2FA code:', error.response?.data || error.message);  // Better error handling
// // // // //       throw error;
// // // // //     }
// // // // //   },

// // // // //   async logout({ commit }) {
// // // // //     commit("clearUser");

// // // // //     // Clear token and user data from localStorage
// // // // //     localStorage.removeItem("token");
// // // // //     localStorage.removeItem("user");
// // // // //     localStorage.removeItem("permissions");

// // // // //     // Clear role and permissions from other Vuex modules, if applicable
// // // // //     await this.dispatch('roles/clearRoleAndPermissions');
// // // // //   },
// // // // // };

// // // // // const mutations = {
// // // // //   setUser(state, user) {
// // // // //     state.user = user;
// // // // //   },
// // // // //   clearUser(state) {
// // // // //     state.user = null;
// // // // //   },
// // // // // };

// // // // // export default {
// // // // //   namespaced: true,
// // // // //   state,
// // // // //   getters,
// // // // //   actions,
// // // // //   mutations,
// // // // // };


// // // // // import ApiServices from "@/services/ApiServices";
// // // // // import { useRouter } from "vue-router";

// // // // // const state = {
// // // // //   user: null,
// // // // // };

// // // // // const getters = {
// // // // //   isAuthenticated: (state) => !!state.user,
// // // // //   user: (state) => state.user,
// // // // // };

// // // // // const actions = {
// // // // //   async login({ commit }, credentials) {
// // // // //     try {
// // // // //       const response = await ApiServices.PostRequest('/login', credentials);
// // // // //       console.log("Resssssssssssss", response.data);
// // // // //       commit("setUser", response.data);
// // // // //       return response;
// // // // //     } catch (error) {
// // // // //       throw error;
// // // // //     }
// // // // //   },

// // // // //   async passwordSetup({ commit }, passwordData) {
// // // // //     try {
// // // // //       const response = await ApiServices.PostRequest('/password-setup', passwordData);
// // // // //     } catch (error) {
// // // // //       throw error;
// // // // //     }
// // // // //   },

// // // // //   // New action to verify the 2FA code
// // // // //   async verify2FACode({ commit }, twoFaCode) {
// // // // //     try {
// // // // //       const data = { two_fa_code: twoFaCode }; // Make sure two_fa_code is passed
// // // // //       const response = await ApiServices.PostRequestHeader('/verify-2fa-code', data);
// // // // //       commit('SET_2FA_VERIFIED', response); // Assuming you handle response in mutations
// // // // //     } catch (error) {
// // // // //       console.error('Error verifying 2FA code:', error);
// // // // //       throw error; // Handle error appropriately in your component
// // // // //     }
// // // // //   },

// // // // //   async logout({ commit }) {
// // // // //     commit("clearUser");

// // // // //     // Clear token and user data from localStorage
// // // // //     localStorage.removeItem("token");
// // // // //     localStorage.removeItem("user");
// // // // //     localStorage.removeItem("permissions");

// // // // //     // Clear role and permissions from other Vuex modules, if applicable
// // // // //     await this.dispatch('roles/clearRoleAndPermissions');
// // // // //   },
// // // // // };

// // // // // const mutations = {
// // // // //   setUser(state, user) {
// // // // //     state.user = user;
// // // // //   },
// // // // //   clearUser(state) {
// // // // //     state.user = null;
// // // // //   },
// // // // // };

// // // // // export default {
// // // // //   namespaced: true,
// // // // //   state,
// // // // //   getters,
// // // // //   actions,
// // // // //   mutations,
// // // // // };


// // // // import ApiServices from "@/services/ApiServices";

// // // // const state = {
// // // //   user: JSON.parse(localStorage.getItem("user")) || null,  // Retrieve user from localStorage on reload
// // // //   token: localStorage.getItem("token") || null,  // Retrieve token from localStorage
// // // // };

// // // // const getters = {
// // // //   isAuthenticated: (state) => !!state.user,
// // // //   user: (state) => state.user,
// // // // };

// // // // const actions = {
// // // //   async login({ commit }, credentials) {
// // // //     try {
// // // //       const response = await ApiServices.PostRequest('/login', credentials);
// // // //       console.log("Login response:", response.data);
// // // //       commit("setUser", response.data);
      
// // // //       // Store token and user in localStorage for persistence
// // // //       localStorage.setItem("token", response.data.token);
// // // //       localStorage.setItem("user", JSON.stringify(response.data.user));
      
// // // //       return response;
// // // //     } catch (error) {
// // // //       throw error;
// // // //     }
// // // //   },

// // // //   async passwordSetup({ commit }, passwordData) {
// // // //     try {
// // // //       const response = await ApiServices.PostRequest('/password-setup', passwordData);
// // // //       return response;
// // // //     } catch (error) {
// // // //       throw error;
// // // //     }
// // // //   },

// // // //   // Action to verify the 2FA code
// // // //   async verify2FACode({ commit }, twoFaCode) {
// // // //     try {
// // // //       const data = { two_fa_code: twoFaCode };
// // // //       const response = await ApiServices.PostRequestHeader('/verify-2fa-code', data);
      
// // // //       // Store the user and token from the 2FA response
// // // //       commit('setUser', response.data);
      
// // // //       // Save token and user in localStorage for persistence
// // // //       localStorage.setItem("token", response.data.token);
// // // //       localStorage.setItem("user", JSON.stringify(response.data.user));

// // // //       return response;
// // // //     } catch (error) {
// // // //       console.error('Error verifying 2FA code:', error);
// // // //       throw error;
// // // //     }
// // // //   },

// // // //   async logout({ commit }) {
// // // //     commit("clearUser");

// // // //     // Clear token and user data from localStorage
// // // //     localStorage.removeItem("token");
// // // //     localStorage.removeItem("user");
// // // //     localStorage.removeItem("permissions");

// // // //     // Clear role and permissions from other Vuex modules, if applicable
// // // //     await this.dispatch('roles/clearRoleAndPermissions');
// // // //   },
// // // // };

// // // // const mutations = {
// // // //   setUser(state, user) {
// // // //     state.user = user;
// // // //     state.token = user.token;  // Assuming the token is part of the user object
// // // //   },
  
// // // //   clearUser(state) {
// // // //     state.user = null;
// // // //     state.token = null;
// // // //   },
// // // // };

// // // // export default {
// // // //   namespaced: true,
// // // //   state,
// // // //   getters,
// // // //   actions,
// // // //   mutations,
// // // // };


// // // import ApiServices from "@/services/ApiServices";

// // // const state = {
// // //   user: JSON.parse(localStorage.getItem("user")) || null,
// // //   token: localStorage.getItem("token") || null,
// // //   role: localStorage.getItem("role") || null,
// // //   permissions: JSON.parse(localStorage.getItem("permissions")) || [],
// // // };

// // // const getters = {
// // //   isAuthenticated: (state) => !!state.user,
// // //   user: (state) => state.user,
// // //   userRole: (state) => state.role,
// // //   hasPermission: (state) => (permission) => state.permissions.includes(permission),
// // // };

// // // const actions = {
// // //   async login({ commit }, credentials) {
// // //     try {
// // //       const response = await ApiServices.PostRequest('/login', credentials);
// // //       commit("setUserData", response.data);
// // //       return response;
// // //     } catch (error) {
// // //       throw error;
// // //     }
// // //   },

// // //   async passwordSetup({ commit }, passwordData) {
// // //     try {
// // //       const response = await ApiServices.PostRequest('/password-setup', passwordData);
// // //       return response;
// // //     } catch (error) {
// // //       throw error;
// // //     }
// // //   },

// // //   // Action to verify the 2FA code
// // //   async verify2FACode({ commit }, twoFaCode) {
// // //     try {
// // //       const data = { two_fa_code: twoFaCode };
// // //       const response = await ApiServices.PostRequestHeader('/verify-2fa-code', data);
      
// // //       // Commit user data (token, user info, role, permissions) after successful 2FA
// // //       commit('setUserData', response.data);

// // //       // Save token, user, role, and permissions to localStorage for persistence
// // //       localStorage.setItem("token", response.data.token);
// // //       localStorage.setItem("user", JSON.stringify(response.data));
// // //       localStorage.setItem("role", response.data.role);
// // //       localStorage.setItem("permissions", JSON.stringify(response.data.permissions));

// // //       return response;
// // //     } catch (error) {
// // //       console.error('Error verifying 2FA code:', error);
// // //       throw error;
// // //     }
// // //   },

// // //   async logout({ commit }) {
// // //     commit("clearUserData");

// // //     // Clear token and user data from localStorage
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("user");
// // //     localStorage.removeItem("role");
// // //     localStorage.removeItem("permissions");

// // //     // Clear role and permissions from other Vuex modules, if applicable
// // //     await this.dispatch('roles/clearRoleAndPermissions');
// // //   },
// // // };

// // // const mutations = {
// // //   setUserData(state, userData) {
// // //     state.user = userData;
// // //     state.token = userData.token;
// // //     state.role = userData.role;
// // //     state.permissions = userData.permissions;
// // //   },
// // //   clearUserData(state) {
// // //     state.user = null;
// // //     state.token = null;
// // //     state.role = null;
// // //     state.permissions = [];
// // //   },
// // // };

// // // export default {
// // //   namespaced: true,
// // //   state,
// // //   getters,
// // //   actions,
// // //   mutations,
// // // };


// // import ApiServices from "@/services/ApiServices";

// // const state = {
// //   user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
// //   token: localStorage.getItem("token") || null,
// //   role: localStorage.getItem("role") || null,
// //   permissions: localStorage.getItem("permissions") ? JSON.parse(localStorage.getItem("permissions")) : [],
// // };

// // const getters = {
// //   isAuthenticated: (state) => !!state.user,
// //   user: (state) => state.user,
// //   userRole: (state) => state.role,
// //   hasPermission: (state) => (permission) => state.permissions.includes(permission),
// // };

// // const actions = {
// //   async login({ commit }, credentials) {
// //     try {
// //       const response = await ApiServices.PostRequest('/login', credentials);
// //       commit("setUserData", response.data);
// //       return response;
// //     } catch (error) {
// //       throw error;
// //     }
// //   },

// //   async passwordSetup({ commit }, passwordData) {
// //     try {
// //       const response = await ApiServices.PostRequest('/password-setup', passwordData);
// //       return response;
// //     } catch (error) {
// //       throw error;
// //     }
// //   },

// //   // Action to verify the 2FA code
// //   async verify2FACode({ commit }, twoFaCode) {
// //     try {
// //       const data = { two_fa_code: twoFaCode };
// //       const response = await ApiServices.PostRequestHeader('/verify-2fa-code', data);
      
// //       // Commit user data (token, user info, role, permissions) after successful 2FA
// //       commit('setUserData', response.data);

// //       // Save token, user, role, and permissions to localStorage for persistence
// //       localStorage.setItem("token", response.data.token);
// //       localStorage.setItem("user", JSON.stringify(response.data));
// //       localStorage.setItem("role", response.data.role);
// //       localStorage.setItem("permissions", JSON.stringify(response.data.permissions));

// //       return response;
// //     } catch (error) {
// //       console.error('Error verifying 2FA code:', error);
// //       throw error;
// //     }
// //   },

// //   async logout({ commit }) {
// //     commit("clearUserData");

// //     // Clear token and user data from localStorage
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("role");
// //     localStorage.removeItem("permissions");

// //     // Clear role and permissions from other Vuex modules, if applicable
// //     await this.dispatch('roles/clearRoleAndPermissions');
// //   },
// // };

// // const mutations = {
// //   setUserData(state, userData) {
// //     state.user = userData;
// //     state.token = userData.token;
// //     state.role = userData.role;
// //     state.permissions = userData.permissions;
// //   },
// //   clearUserData(state) {
// //     state.user = null;
// //     state.token = null;
// //     state.role = null;
// //     state.permissions = [];
// //   },
// // };

// // export default {
// //   namespaced: true,
// //   state,
// //   getters,
// //   actions,
// //   mutations,
// // };


// import ApiServices from "@/services/ApiServices";

// const safeParse = (value) => {
//   try {
//     return value ? JSON.parse(value) : null;
//   } catch (e) {
//     console.error("Error parsing JSON from localStorage:", e);
//     return null;
//   }
// };

// const state = {
//   user: safeParse(localStorage.getItem("user")),
//   token: localStorage.getItem("token") || null,
//   role: localStorage.getItem("role") || null,
//   permissions: safeParse(localStorage.getItem("permissions")) || [],
// };

// const getters = {
//   isAuthenticated: (state) => !!state.user,
//   user: (state) => state.user,
//   userRole: (state) => state.role,
//   hasPermission: (state) => (permission) => state.permissions.includes(permission),
// };

// const actions = {
//   async login({ commit }, credentials) {
//     try {
//       const response = await ApiServices.PostRequest('/login', credentials);
//       commit("setUserData", response.data);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   async passwordSetup({ commit }, passwordData) {
//     try {
//       const response = await ApiServices.PostRequest('/password-setup', passwordData);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Action to verify the 2FA code
//   async verify2FACode({ commit }, twoFaCode) {
//     try {
//       const data = { two_fa_code: twoFaCode };
//       const response = await ApiServices.PostRequestHeader('/verify-2fa-code', data);
      
//       // Commit user data (token, user info, role, permissions) after successful 2FA
//       commit('setUserData', response.data);

//       // Save token, user, role, and permissions to localStorage for persistence
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("user", JSON.stringify(response.data));
//       localStorage.setItem("role", response.data.role);
//       localStorage.setItem("permissions", JSON.stringify(response.data.permissions));

//       return response;
//     } catch (error) {
//       console.error('Error verifying 2FA code:', error);
//       throw error;
//     }
//   },

//   async logout({ commit }) {
//     commit("clearUserData");

//     // Clear token and user data from localStorage
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("role");
//     localStorage.removeItem("permissions");

//     // Clear role and permissions from other Vuex modules, if applicable
//     await this.dispatch('roles/clearRoleAndPermissions');
//   },
// };

// const mutations = {
//   setUserData(state, userData) {
//     state.user = userData;
//     state.token = userData.token;
//     state.role = userData.role;
//     state.permissions = userData.permissions;
//   },
//   clearUserData(state) {
//     state.user = null;
//     state.token = null;
//     state.role = null;
//     state.permissions = [];
//   },
// };

// export default {
//   namespaced: true,
//   state,
//   getters,
//   actions,
//   mutations,
// };


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
