import ApiServices from "@/services/ApiServices";

const state = {
    employees: [], // List of employees
    workingHours: [], // Store for employee working hours
};

const getters = {
    allEmployees: (state) => state.employees,
    allWorkingHours: (state) => state.workingHours,
};

const actions = {
    // Fetch all employees
    async fetchEmployees({ commit }) {
        try {
            const response = await ApiServices.GetRequest("/employees");
            commit("setEmployees", response);
        } catch (error) {
            throw error;
        }
    },

    // Fetch working hours for a specific employee
    async fetchWorkingHours({ commit }, { employeeId, frequency }) {
        try {
            const response = await ApiServices.GetRequest(`/working-hours`, {
                params: { employeeId, frequency },
            });
            commit("setWorkingHours", response); // Assuming the API returns the working hours data
        } catch (error) {
            throw error;
        }
    },

    // Add a new employee
    async addEmployee({ commit }, employeeData) {
        try {
            const response = await ApiServices.PostRequest("/employees", employeeData);
            commit("newEmployee", response); // Assuming the API returns the created employee
        } catch (error) {
            throw error;
        }
    },

    // Update an existing employee
    async updateEmployee({ commit }, { id, updatedData }) {
        try {
            const response = await ApiServices.PutRequest(`/employees/${id}`, updatedData);
            commit("updateEmployee", response); // Assuming API returns updated employee
        } catch (error) {
            throw error;
        }
    },

    // Delete an employee
    async deleteEmployee({ commit }, id) {
        try {
            await ApiServices.DeleteRequest(`/employees/${id}`);
            commit("removeEmployee", id);
        } catch (error) {
            throw error;
        }
    },
};

const mutations = {
    setEmployees(state, employees) {
        state.employees = employees;
    },
    newEmployee(state, employee) {
        state.employees.push(employee);
    },
    updateEmployee(state, updatedEmployee) {
        const index = state.employees.findIndex((e) => e.id === updatedEmployee.id);
        if (index !== -1) {
            state.employees.splice(index, 1, updatedEmployee);
        }
    },
    removeEmployee(state, id) {
        state.employees = state.employees.filter((employee) => employee.id !== id);
    },
    setWorkingHours(state, workingHours) {
        state.workingHours = workingHours; // Store fetched working hours
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};