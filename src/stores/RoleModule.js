const state = {
  userRole: localStorage.getItem('userRole') || null,
  permissions:[],
};

// Check if userPermissions is available in localStorage and is a valid JSON string
const storedPermissions = localStorage.getItem('userPermissions');
if (storedPermissions) {
  try {
    state.permissions = JSON.parse(storedPermissions);
  } catch (e) {
    console.error('Failed to parse userPermissions:', e);
    state.permissions = []; // Default to an empty array if parsing fails
  }
}

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
