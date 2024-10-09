// store/modules/employee.js
const state = {
  departments: [],
};

const getters = {
  departments: (state) => state.departments,
};

const actions = {
  addDepartment({ commit }, department) {
    // Here you would typically make an API call to add the department
    const newDepartment = { id: Date.now(), ...department }; // Mocked ID for demonstration
    commit('ADD_DEPARTMENT', newDepartment);
  },
  updateDepartment({ commit }, updatedDepartment) {
    commit('UPDATE_DEPARTMENT', updatedDepartment);
  },
  deleteDepartment({ commit }, departmentId) {
    commit('DELETE_DEPARTMENT', departmentId);
  },
};

const mutations = {
  ADD_DEPARTMENT(state, department) {
    state.departments.push(department);
  },
  UPDATE_DEPARTMENT(state, updatedDepartment) {
    const index = state.departments.findIndex(dept => dept.id === updatedDepartment.id);
    if (index !== -1) {
      state.departments.splice(index, 1, updatedDepartment);
    }
  },
  DELETE_DEPARTMENT(state, departmentId) {
    state.departments = state.departments.filter(dept => dept.id !== departmentId);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
