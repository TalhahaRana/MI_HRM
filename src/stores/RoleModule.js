const state = {
  userRole: localStorage.getItem('userRole') || null,
  permissions: [],
};

const getters = {
  userRole: (state) => state.userRole,
  hasPermission: (state) => (permission) => state.permissions.includes(permission),
};

const actions = {
  setRoleAndPermissions({ commit }, { role, permissions }) {
    commit('setUserRole', role);
    commit('setPermissions', permissions);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userPermissions', JSON.stringify(permissions));
  },

  clearRoleAndPermissions({ commit }) {
    commit('setUserRole', null);
    commit('setPermissions', []);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userPermissions');
  },
};

const mutations = {
  setUserRole(state, role) {
    state.userRole = role;
  },
  setPermissions(state, permissions) {
    state.permissions = permissions;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
