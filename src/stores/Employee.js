import ApiServices from "@/services/ApiServices";

const state = {
  employees: [], // List of employees
  salaryDetails: {}, // Salary details for the specific employee
  workingHour: "", // New state for working hours
  workingHours: [],
  workingHoursAttendance: [],
  assignedProjects: [],
  attendanceRecords: [],
  statusCounts: { present: 0, absent: 0 },
  attendanceCounts: {
    employee_name: "",
    present: 0,
    absent: 0,
    onleave: 0,
  },
  attendanceDetails: {},

  hrCount: 0,            // New state for HR count
  employeeCount: 0,
  departmentCount:0
 };

const getters = {
  allEmployees: (state) => state.employees,
  employeeSalaryDetails: (state) => state.salaryDetails,
  getAssignedProjects: (state) => state.assignedProjects,
  getAttendanceRecords: (state) => state.attendanceRecords,
  getWorkingHours: (state) => state.workingHours,
  statusCounts: (state) => state.statusCounts,
  allWorkingHours: (state) => state.workingHours,
  allWorkingHoursAttendance: (state) => state.workingHoursAttendance,
  getAttendanceDetails: (state) => state.attendanceDetails,
  hrCount: (state) => state.hrCount,
  departmentCount: (state) => state.departmentCount,
  employeeCount: (state) => state.employeeCount,
  attendanceCounts: (state) => state.attendanceCounts,
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
  //samia

  async allAttendance({ commit }) {
    try {
      const response = await ApiServices.GetRequest("/get-all-attendance");
      commit("attendanceDetails", response.data); // This should match the mutation name
    } catch (error) {
      throw error;
    }
  },
  async fetchEmployeeStatus({ commit }, { date, frequency }) {
    try {
      // Fetch working hours using the API
      const response = await ApiServices.GetRequestWorkingHours(
        `/get-employee/working-hours?date=${date}&frequency=${frequency}`
      );

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
        },
        { present: 0, absent: 0 } // Initial counts
      );

      // Commit the computed counts to the store
      commit("setStatusCounts", statusCounts);
    } catch (error) {
      console.error("Error fetching employee status:", error);
      throw error; // Rethrow the error for handling in the component
    }
  },
  async LeaveApplication({ commit }, leaveApplication) {
    try {
      const response = await ApiServices.PostRequestHeader(
        "/submit/leave",
        leaveApplication
      );
      commit("newLeaveApplication", response.data);
    } catch (error) {
      console.error("Error submitting leave application:", error);
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
  //   async deleteEmployee({ commit }, user_id) {
  //     try {
  //       const response = await ApiServices.delete(`delete-employees/${user_id}`); // Ensure this uses user_id
  //       commit("removeEmployee", user_id); // Mutation to remove the employee from state
  //       return response;
  //     } catch (error) {
  //       console.error("Error deleting employee:", error);
  //       throw error;
  //     }
  //   },

  async deleteEmployee({ commit }, user_id) {
    try {
      const response = await ApiServices.DeleteRequest(
        `delete-employees/${user_id}`
      ); // Ensure this uses user_id
      commit("removeEmployee", user_id); // Mutation to remove the employee from state
      return response;
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  },
  // Fetch working hours for an employee
  async fetchEmployeeWorkingHours({ commit }, payload) {
    try {
      const response = await ApiServices.GetRequestWorkingHours(
        "/get-employee/working-hours",
        payload
      );
      console.log("Working hours response:", response.data);

      // Ensure response data is in the expected format before committing
      commit("SET_WORKING_HOURS", response.data);
    } catch (error) {
      console.error("Error fetching working hours:", error);
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

  //Emp and hr card
  async card({ commit }) {
    try {
      const response = await ApiServices.GetRequest('/employee-role-counts');
      console.log('API Response:', response.data); 
      if (response.data) { // Check if response.data exists
        const { hr_count, employee_count,department_count } = response.data; // Destructure employee_count from response.data
        console.log("employeeeeee", employee_count);
      
        commit('setHrCount', hr_count); 
        commit('setEmployeeCount', employee_count); 
        commit('setDepartmentCount',department_count)
      }
    } catch (error) {
      console.error('Error fetching employee role counts:', error);
    }
  }
,  
  
  
  // Check-in action

  // Fetch attendance records of the logged-in employee based on the token
  async fetchEmployeeAttendance({ commit }, { month }) {
    try {
      const params = { month: month || "" }; // If no month, fetch all
      const response = await ApiServices.GetRequest(
        "/get-employees-attendence",
        params
      );

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

  // Check-out Check-in action

  async checkInOut({ commit }, type) {
    try {
      const response = await ApiServices.PostRequestHeader(
        "/attendance/checkin-out",
        { type }
      );

      alert(response.message);
      return response.data ? response.data["working hours"] : null;
    } catch (error) {
      console.error(
        `${type.charAt(0).toUpperCase() + type.slice(1)} failed:`,
        error
      );
      alert(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } failed. Please try again.`
      );
      return null;
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
  async fetchWorkingHoursAttendance({ commit }, { date, frequency }) {
    try {
      // Construct the URL with query parameters directly in the string
      const response = await ApiServices.GetRequestWorkingHours(
        `/get-employee/working-hours?date=${date}&frequency=${frequency}`
      );

      console.log(date, frequency); // Debugging: log the date and frequency
      commit("setWorkingHoursAttendance", response.data.daily_working_hours); // Commit the response data
    } catch (error) {
      console.error("Error fetching working hours:", error); // Log the error
      throw error; // Rethrow the error for handling in the component
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

   // Check-out Check-in action

   async checkInOut({ commit }, type) {
    try {
      const response = await ApiServices.PostRequestHeader(
        "/attendance/checkin-out",
        { type }
      );

      alert(response.message);
      return response.data ? response.data["working hours"] : null;
    } catch (error) {
      console.error(
        `${type.charAt(0).toUpperCase() + type.slice(1)} failed:`,
        error
      );
      alert(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } failed. Please try again.`
      );
      return null;
    }
  },

  async fetchEmployeeAttendanceCounts({ commit }) {
    try {
      console.log("Fetching attendance counts...");
      const response = await ApiServices.GetRequest(
        "/employee-attendance-count"
      );

      // Log to inspect full response
      console.log("Full API response:", response);

      // Check response structure
      if (response && response.data) {
        commit("setAttendanceCounts", response.data); // Commit the data directly
        console.log("Attendance counts fetched:", response.data); // Check what is being passed
      } else {
        console.error("Failed to fetch attendance counts:", response.message);
      }
    } catch (error) {
      console.error("Error fetching attendance counts:", error);
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
  setWorkingHoursAttendance(state, workingHours) {
    state.workingHoursAttendance = workingHours; // Update the state with fetched working hours
  },
  newLeaveApplication(state, leaveApplication) {
    // Logic to handle the leave application if needed
  },
  attendanceDetails(state, attendanceDetails) {
    state.attendanceDetails = attendanceDetails; // Fixed typo
  },
  setStatusCounts(state, statusCounts) {
    state.statusCounts = statusCounts;
  },
  //Arham
  setWorkingHours(state, workingHours) {
    state.workingHour = workingHours; // Update the state with fetched working hours
  },
  SET_WORKING_HOURS(state, payload) {
    state.workingHours = payload;
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
  setHrCount(state, count) {
    state.hrCount = count;
  },
  setEmployeeCount(state, count) {
    state.employeeCount = count;
  },
  setDepartmentCount(state,count){
    state.departmentCount = count
  },

  //arham
  setAttendanceCounts(state, counts) {
    if (counts) {
      console.log("Setting attendance counts:", counts); // Log the counts received
      state.attendanceCounts.employee_name = counts.employee_name || "";
      state.attendanceCounts.present = counts.present || 0;
      state.attendanceCounts.absent = counts.absent || 0;
      state.attendanceCounts.onleave = counts.onleave || 0;
    } else {
      console.error("Received undefined counts in mutation");
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
