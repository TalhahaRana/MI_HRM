import ApiServices from "@/services/ApiServices";

const state = {
  departments: [], 
};

const getters = {
  allDepartments: (state) => state.departments,
};

const actions = {
  // Fetch all departments
  async fetchDepartments({ commit }) {
    try {
      const response = await ApiServices.GetRequest("/get/departments");
      commit("setDepartments", response);
    } catch (error) {
      throw error;
    }
  },

  // Add a new department
  async addDepartment({ commit }, departmentData) {
    try {
      const response = await ApiServices.PostRequest("/departments", departmentData);
      commit("newDepartment", response); // Assuming the API returns the created department
    } catch (error) {
      throw error;
    }
  },

  // Update an existing department
  async updateDepartment({ commit }, { id, updatedData }) {
    try {
      const response = await ApiServices.PutRequest(`/departments/${id}`, updatedData);
      commit("updateDepartment", response); // Assuming API returns updated department
    } catch (error) {
      throw error;
    }
  },

  // Delete a department
  async deleteDepartment({ commit }, id) {
    try {
      await ApiServices.DeleteRequest(`/departments/${id}`);
      commit("removeDepartment", id);
    } catch (error) {
      throw error;
    }
  },
};

const mutations = {
  setDepartments(state, departments) {
    state.departments = departments;
  },
  newDepartment(state, department) {
    state.departments.push(department);
  },
  updateDepartment(state, updatedDepartment) {
    const index = state.departments.findIndex((d) => d.id === updatedDepartment.id);
    if (index !== -1) {
      state.departments.splice(index, 1, updatedDepartment);
    }
  },
  removeDepartment(state, id) {
    state.departments = state.departments.filter((department) => department.id !== id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
