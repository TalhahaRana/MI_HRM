import ApiServices from "@/services/ApiServices";
const state = {
  adminData: {},
  employees: [],
  salaryDetails: null,
  announcements: [],
  perks: [],
};
const getters = {
  getAdminData: (state) => state.adminData,
  getEmployees: (state) => state.employees,
  getSalaryDetails: (state) => state.salaryDetails,
  getAnnouncements: (state) => state.announcements,
  getPerks: (state) => state.perks,  // Get perks from state
  getPendingPerks: (state) => state.perks.filter(perk => perk.status === 'pending'),
  getAcceptedPerks: (state) => state.perks.filter(perk => perk.status === 'approved'),
  getRejectedPerks: (state) => state.perks.filter(perk => perk.status === 'rejected'),
};
const actions = {
  async fetchAdminData({
    commit
  }) {
    try {
      const response = await ApiServices.GetRequest("/admin-data");
      commit("setAdminData", response.data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  },
  async fetchAllEmployees({
    commit
  }) {
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


  async fetchSalaryByEmployeeAndMonth({
    commit
  }, {
    employee_id,
    month
  }) {
    try {
      const response = await ApiServices.GetRequest(`/salary-invoice?employee_id=${employee_id}&month=${month}`);
      commit("setSalaryDetails", response.data); // Assuming the response contains salary details
    } catch (error) {
      console.error("Error fetching salary details:", error);
    }
  },
  async createAnnouncement({
    commit
  }, announcementData) {
    try {
      const response = await ApiServices.PostRequestHeader("/announcements-create", announcementData);
      console.log("Announcement created:", response.data);
      commit("addAnnouncement", response.data); // Add the created announcement to the state
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  },
  async fetchAnnouncements({
    commit
  }) {
    try {
      const response = await ApiServices.GetRequest("/get-announcements");
      if (response.data && Array.isArray(response.data)) {
        commit("setAnnouncements", response.data);
      } else {
        console.error("No announcement data found.");
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  },
  async updateAnnouncementStatus({
    commit
  }, {
    id,
    is_published
  }) {
    try {
      const response = await ApiServices.PutRequest('/announcements/update-status', {
        id,
        is_published
      });
      console.log('Announcement status updated:', response);
      commit('updateAnnouncementStatus', {
        id,
        is_published
      });
    } catch (error) {
      console.error('Error updating announcement status:', error);
    }
  },

  // Action to create a perk
  async createPerk({
    commit
  }, perkData) {
    try {
      const response = await ApiServices.PostRequestHeader("/perks-create", perkData);
      console.log("Perk created:", response.data);
      commit("addPerk", response.data);
      return response;
    } catch (error) {
      console.error("Error creating perk:", error);
      throw error;
    }
  },
  async fetchPerks({ commit }) {
    try {
      const response = await ApiServices.GetRequest('/get-perks/requests');
      commit('setPerks', response.data);
    } catch (error) {
      console.error('Error fetching perks:', error);
    }
  },
  async updatePerkStatus({ commit }, { perk_request_id, status }) {
    try {
      const response = await ApiServices.PostRequestHeader('/perks/request-handle', {
        perk_request_id,
        status,
      });
      
      commit('updatePerkStatusInState', response.data);
      return response;
    } catch (error) {
      console.error('Error updating perk status:', error);
      throw error;
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
  addAnnouncement(state, announcement) {
    state.announcements.push(announcement);
  },
  setAnnouncements(state, announcements) {
    state.announcements = announcements; 
  },
  updateAnnouncementStatus(state, {
    id,
    is_published
  }) {
    const announcement = state.announcements.find(ann => ann.id === id);
    if (announcement) {
      announcement.enabled = is_published === 1;
    }
  },
  addPerk(state, perk) {
    if (!state.perks) {
      state.perks = [];
    }
    state.perks.push(perk);
  },
  setPerks(state, perks) {
    state.perks = perks;
  },
  updatePerkStatusInState(state, updatedPerk) {
    const index = state.perks.findIndex(perk => perk.id === updatedPerk.id);
    
    if (index !== -1) {
      state.perks.splice(index, 1, updatedPerk);
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