import ApiServices from "@/services/ApiServices";
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
      commit("setUser", response.data.user);
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
    // Simulating an async operation with resolve()
    return Promise.resolve();
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
