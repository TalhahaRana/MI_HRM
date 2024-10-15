import ApiServices from "@/services/ApiServices"; // Import the ApiServices module

const state = {
  leaves: [],
  pendingLeaves: [],
  acceptedLeaves: [],
  rejectedLeaves: [],
  loading: false,
  error: null,
};

const getters = {
  allLeaves: (state) => state.leaves,
  pendingLeaves: (state) => state.pendingLeaves,
  acceptedLeaves: (state) => state.acceptedLeaves,
  rejectedLeaves: (state) => state.rejectedLeaves,
};

const actions = {
  async fetchLeaves({ commit }) {
    commit('setLoading', true);
    try {
      const response = await ApiServices.GetRequest('/get-leave-requests');
      const leaves = response.data;
      commit('setLeaves', leaves);
    } catch (error) {
      commit('setError', error.response?.data?.message || 'Error fetching leaves');
    } finally {
      commit('setLoading', false);
    }
  },

  async acceptLeave({ commit, state }, leaveId) {
    try {
      // Make the POST request using ApiServices with authorization headers
      const response = await ApiServices.PostRequestHeader(`/leave-requests/${leaveId}/approved`, {});
      if (response) {
        // If successful, update the local state
        const updatedLeaves = state.leaves.map((leave) =>
          leave.id === leaveId ? { ...leave, status: 'approved' } : leave
        );
        commit('setLeaves', updatedLeaves);
      }
    } catch (error) {
      commit('setError', error.response?.data?.message || 'Error accepting leave');
    }
  },

  async rejectLeave({ commit, state }, leaveId) {
    try {
      // Make the POST request using ApiServices with authorization headers
      const response = await ApiServices.PostRequestHeader(`/leave-requests/${leaveId}/rejected`, {});
      if (response) {
        // If successful, update the local state
        const updatedLeaves = state.leaves.map((leave) =>
          leave.id === leaveId ? { ...leave, status: 'rejected' } : leave
        );
        commit('setLeaves', updatedLeaves);
      }
    } catch (error) {
      commit('setError', error.response?.data?.message || 'Error rejecting leave');
    }
  },
};

const mutations = {
  setLeaves(state, leaves) {
    state.leaves = leaves;
    state.pendingLeaves = leaves.filter((leave) => leave.status === 'pending');
    state.acceptedLeaves = leaves.filter((leave) => leave.status === 'approved');
    state.rejectedLeaves = leaves.filter((leave) => leave.status === 'rejected');
  },

  setLoading(state, loading) {
    state.loading = loading;
  },

  setError(state, error) {
    state.error = error;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
