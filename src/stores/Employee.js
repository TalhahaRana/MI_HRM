import ApiServices from "@/services/ApiServices";

const state = {
    employees: [], // List of employees
    workingHours: [], // Store for employee working hours
    statusCounts: { present: 0, absent: 0 },
};

const getters = {
    allEmployees: (state) => state.employees,
    allWorkingHours: (state) => state.workingHours,
    statusCounts: (state) => state.statusCounts,
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
    async fetchWorkingHours({ commit }, { date, frequency }) {
        try {
            // Construct the URL with query parameters directly in the string
            const response = await ApiServices.GetRequestWorkingHours(`/get-employee/working-hours?date=${date}&frequency=${frequency}`);

            console.log(date, frequency); // Debugging: log the date and frequency
            commit("setWorkingHours", response.data.daily_working_hours); // Commit the response data
        } catch (error) {
            console.error('Error fetching working hours:', error); // Log the error
            throw error; // Rethrow the error for handling in the component
        }
    },

    async fetchEmployeeStatus({ commit }, { date, frequency }) {
        try {
            // Fetch working hours using the API
            const response = await ApiServices.GetRequestWorkingHours(`/get-employee/working-hours?date=${date}&frequency=${frequency}`);

            // Get the daily working hours from the API response
            const dailyWorkingHours = response.data.daily_working_hours;

            // Calculate the counts based on the status key
            const statusCounts = dailyWorkingHours.reduce(
                (counts, entry) => {
                    if (entry.status === "present") {
                        counts.present++;
                    } else if (entry.status === "absent") {
                        counts.absent++;
                    }
                    return counts;
                }, { present: 0, absent: 0 } // Initial counts
            );

            // Commit the computed counts to the store
            commit("setStatusCounts", statusCounts);
        } catch (error) {
            console.error("Error fetching employee status:", error);
            throw error; // Rethrow the error for handling in the component
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
    setStatusCounts(state, statusCounts) {
        state.statusCounts = statusCounts;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};