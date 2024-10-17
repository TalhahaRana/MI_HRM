import ApiServices from "@/services/ApiServices";
const state = {
  adminData: {},
  employees: [],
  salaryDetails: null, 
};
const getters = {
  getAdminData: (state) => state.adminData,
  getEmployees: (state) => state.employees,
  getSalaryDetails: (state) => state.salaryDetails,
};
const actions = {
  async fetchAdminData({ commit }) {
    try {
      const response = await ApiServices.GetRequest("/admin-data");
      commit("setAdminData", response.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  },
  async fetchAllEmployees({ commit }) {
    try {
      const response = await ApiServices.GetRequest("/get-all-employees");  
      if (response.data && Array.isArray(response.data)) {
        commit("setEmployees", response.data);
      } else {
        console.error("No employee data found.");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  },  
  

  async fetchSalaryByEmployeeAndMonth({ commit }, { employee_id, month }) {
    try {
      const response = await ApiServices.GetRequest(`/salary-invoice?employee_id=${employee_id}&month=${month}`);
      commit("setSalaryDetails", response.data); // Assuming the response contains salary details
    } catch (error) {
      console.error("Error fetching salary details:", error);
    }
  },
};
const mutations = {
  setAdminData(state, data) {
    state.adminData = data;
  },
  setEmployees(state, employees) {
    state.employees = employees ? [...employees] : [];
  },
  setSalaryDetails(state, salaryDetails) {
    state.salaryDetails = salaryDetails;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
