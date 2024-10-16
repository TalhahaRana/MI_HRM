import ApiServices from "@/services/ApiServices";

const state = {
  employees: [], // List of employees
  salaryDetails: {}, // Salary details for the specific employee
  workingHours: "", // New state for working hours

  assignedProjects: [],
  attendanceRecords: [],
};

const getters = {
  allEmployees: (state) => state.employees,
  employeeSalaryDetails: (state) => state.salaryDetails,
  getWorkingHours: (state) => state.workingHours, // Getter for working hours
  getAssignedProjects: (state) => state.assignedProjects,
  getAttendanceRecords: (state) => state.attendanceRecords,
};

const actions = {
  // Fetch all employees
  async fetchEmployees({ commit }) {
    try {
      const response = await ApiServices.GetRequest("/get-all-employees");
      if (response && response.data) {
        commit("setEmployees", response.data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },
  async fetchSalaryDetails({ commit }) {
    try {
      const response = await ApiServices.GetRequest("/salary-invoice"); // No need for employee ID

      commit("setSalaryDetails", response.data); // Use the response data from the API
    } catch (error) {
      throw error;
    }
  },
  // Fetch a single employee by ID
  async getEmployee({ commit }, id) {
    try {
      const response = await ApiServices.GetRequest(`/employees/${id}`);
      if (response && response.data) {
        commit("setEmployees", [response.data]); // Commit single employee as an array for consistency
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
      throw error;
    }
  },

  // Add a new employee
  async addEmployee({ commit }, employeeData) {
    try {
      const response = await ApiServices.PostRequestHeader(
        "/register",
        employeeData
      );
      commit("newEmployee", response); // Assuming the API returns the created employee
    } catch (error) {
      throw error;
    }
  },

  // Update an existing employee
  async updateEmployee({ commit }, { id, updatedData }) {
    try {
      const response = await ApiServices.PutRequest(
        `/employees/${id}`,
        updatedData
      );
      commit("updateEmployee", response); // Assuming API returns updated employee
    } catch (error) {
      throw error;
    }
  },

  // Delete an employee
  // Delete an employee
  async deleteEmployee({ commit }, user_id) {
    try {
      const response = await ApiServices.delete(`delete-employees/${user_id}`); // Ensure this uses user_id
      commit("removeEmployee", user_id); // Mutation to remove the employee from state
      return response;
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  },
  async updateEmployee({ commit }, employeeData) {
    try {
      // Check if id is defined
      if (!employeeData.id) {
        throw new Error("Employee ID is required");
      }
      const response = await ApiServices.PutRequest(
        `/update-employees/update/${employeeData.id}`,
        employeeData.updatedData
      ); // Update here
      alert("Employee updated successfully");
      return response; // Return the response for further use if needed
    } catch (error) {
      console.error("Failed to update employee:", error);
      alert("An error occurred while updating the employee."); // Alert on error
      throw error; // Rethrow the error if needed
    }
  },
  // Check-in action

  async checkIn({ commit }) {
    try {
      const response = await ApiServices.PostRequestHeader(
        "/attendance/check-in",

        {}
      );

      alert(response.message);

      // Optionally commit any mutations if needed
    } catch (error) {
      console.error("Check-in failed:", error);

      alert("Check-in failed. Please try again.");
    }
  },
  // Fetch attendance records of the logged-in employee based on the token
  async fetchEmployeeAttendance({ commit }, { month }) {
    try {
      const params = { month: month || "" }; // If no month, fetch all
      const response = await ApiServices.GetRequest("/get-employees-attendence", params);
      
      if (response.status_code === "200, OK") {
        console.log("Attendance data received:", response.data);
        commit("setAttendanceRecords", response.data); // Commit the data to the store
      } else {
        console.error("Failed to fetch attendance:", response.message);
        throw new Error("Failed to fetch attendance records");
      }
    } catch (error) {
      console.error("Error fetching employee attendance:", error);
      throw error;
    }
  },

  // Check-out action

  async checkOut({ commit }) {
    try {
      const response = await ApiServices.PostRequestHeader(
        "/attendance/check-out",

        {}
      );

      alert(response.message);
    } catch (error) {
      console.error("Check-out failed:", error);

      alert("Check-out failed. Please try again.");
    }
  },

  async fetchWorkingHours({ commit }) {
    try {
      const today = new Date().toISOString().split("T")[0]; // Get today's date

      const params = {
        date: today,

        frequency: "daily", // Specify the frequency as needed
      };

      const response = await ApiServices.GetRequestWorkingHours(
        "/get-employee/working-hours",

        params
      );

      if (response.status_code === "200, OK") {
        const todayEntry = response.data.daily_working_hours.find(
          (entry) => entry.date === today
        );

        commit("setCurrentWorkingDay", todayEntry || null);

        commit("setWorkingHours", todayEntry ? todayEntry.working_hours : null); // Store today's working hours
      }
    } catch (error) {
      console.error("Fetch working hours failed:", error);
    }
  },

  async fetchAssignedProjects({ commit }) {
    try {
      const response = await ApiServices.GetRequest(
        "/get-employee/assigned-projects"
      );

      if (response.status_code === "200, OK") {
        commit("setAssignedProjects", response.data); // Commit the 'data' part of the response
      } else {
        console.error("Failed to fetch projects:", response.message);
      }
    } catch (error) {
      console.error("Error fetching assigned projects:", error);
    }
  },

  async updateProjectStatus({ commit }, { id, status }) {
    try {
      const response = await ApiServices.PostRequestHeader(
        "projects/update-status",

        {
          project_id: id, // Use 'project_id' for the payload

          status: status,
        }
      );

      if (response.status_code === "200, OK") {
        commit("updateProjectStatus", response.data);

        return response.message;
      } else {
        console.error("Failed to update status:", response.message);

        return null;
      }
    } catch (error) {
      console.error("Error updating project status:", error);

      return null;
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
  setSalaryDetails(state, salaryDetails) {
    state.salaryDetails = salaryDetails; // Update the salary details state
  },
  setAttendanceRecords(state, attendanceRecords) {
    state.attendanceRecords = attendanceRecords; // Update the state with fetched attendance records
  },
  //Arham
  setWorkingHours(state, workingHours) {
    state.workingHours = workingHours; // Update the state with fetched working hours
  },

  setAssignedProjects(state, projects) {
    if (Array.isArray(projects)) {
      state.assignedProjects = projects;
    } else {
      console.error("Expected an array, got:", projects);

      state.assignedProjects = []; // Fallback to an empty array
    }
  },

  updateProjectStatus(state, updatedProject) {
    const index = state.assignedProjects.findIndex(
      (project) => project.id === updatedProject.id
    );

    if (index !== -1) {
      // Update the project's status in the state

      state.assignedProjects[index].status = updatedProject.status;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
