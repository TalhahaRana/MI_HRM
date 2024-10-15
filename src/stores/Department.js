import ApiServices from "@/services/ApiServices";

const state = {
    departments: [],
    loading: false, // Indicates if an API call is in progress
    error: null, // Stores error messages
};

const getters = {
    allDepartments: (state) => state.departments,
    isLoading: (state) => state.loading,
    departmentError: (state) => state.error,
};

const actions = {
    // Fetch all departments
    async fetchDepartments({ commit }) {
        commit("setLoading", true);
        commit("clearError");
        try {
            const response = await ApiServices.GetRequest("/get/departments");
            // Assuming response.data contains the departments array
            commit("setDepartments", response.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
            commit("setError", "Failed to fetch departments.");
            throw error; // Re-throw to allow further handling if needed
        } finally {
            commit("setLoading", false);
        }
    },

    // Add a new department
    async addDepartment({ commit }, departmentData) {
        commit("setLoading", true);
        commit("clearError");
        try {
            const response = await ApiServices.PostRequest("/add-department", departmentData);
            // Assuming response.data contains the newly created department
            commit("newDepartment", response.data);
        } catch (error) {
            console.error("Error adding department:", error);
            commit("setError", "Failed to add department.");
            throw error;
        } finally {
            commit("setLoading", false);
        }
    },

    // Update an existing department
    async updateDepartment({ commit }, { id, updatedData }) {
        commit("setLoading", true);
        commit("clearError");
        try {
            const response = await ApiServices.PutRequest(`/departments/${id}`, updatedData);
            // Assuming response.data contains the updated department
            commit("updateDepartment", response.data);
        } catch (error) {
            console.error("Error updating department:", error);
            commit("setError", "Failed to update department.");
            throw error;
        } finally {
            commit("setLoading", false);
        }
    },

    // Delete a department
    async deleteDepartment({ commit }, id) {
        commit("setLoading", true);
        commit("clearError");
        try {
            await ApiServices.DeleteRequest(`/departments/${id}`);
            commit("removeDepartment", id);
            console.log(`Department with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting department:", error);
            commit("setError", "Failed to delete department.");
            throw error;
        } finally {
            commit("setLoading", false);
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
    setLoading(state, isLoading) {
        state.loading = isLoading;
    },
    setError(state, errorMessage) {
        state.error = errorMessage;
    },
    clearError(state) {
        state.error = null;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};