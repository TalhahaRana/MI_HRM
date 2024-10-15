<template>
  <div class="container mt-4 form-card">
    <h2 class="text-center mb-4">Employee Working Hours</h2>
    <div class="row mb-3">
      <div class="col-md-6">
        <label for="date" class="form-label">Date</label>
        <input
          type="date"
          id="date"
          class="form-control"
          v-model="date"
          required
        />
      </div>
      <div class="col-md-6">
        <label for="frequency" class="form-label">Frequency</label>
        <select id="frequency" class="form-select" v-model="frequency" required>
          <option value="" disabled>Select Frequency</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
    </div>
    <div class="text-center mb-3">
      <button class="btn btn-primary" @click="fetchWorkingHours">
        <i class="bi bi-search"></i> FETCH WORKING HOURS
      </button>
    </div>
    <div class="table-responsive" v-if="workingHours.length > 0">
      <table class="table table-striped table-bordered">
        <thead class="table-light text-center">
          <tr>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Working Hours</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(record, index) in workingHours"
            :key="index"
            class="hover-row"
          >
            <td>{{ record.date }}</td>
            <td>{{ record.check_in }}</td>
            <td>{{ record.check_out }}</td>
            <td>{{ record.working_hours }}</td>
            <td>{{ record.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="text-center">No records found for the selected date and frequency.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      date: '',
      frequency: '',
    };
  },
  computed: {
    ...mapGetters('employee', ['allWorkingHours']),
    workingHours() {
      return this.allWorkingHours; // Get working hours from Vuex store
    },
  },
  methods: {
    async fetchWorkingHours() {
      if (this.date && this.frequency) {
        try {
          await this.$store.dispatch('employee/fetchWorkingHours', {
            date: this.date,
            frequency: this.frequency,
          });
        } catch (error) {
          console.error('Error fetching working hours:', error);
          alert('Error fetching working hours. Please try again.');
        }
      } else {
        alert('Please provide both Date and Frequency.');
      }
    },
  },
};
</script>

<style scoped>
.table-responsive {
  margin-top: 20px;
}

.table th,
.table td {
  text-align: center;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9; /* Light grey for odd rows */
}

.table tbody tr:hover {
  background-color: #e9ecef; /* Light grey on hover */
}

.btn-primary {
  background-color: var(--basic-button); /* Primary button color */
  border-color: white;
}

.btn-primary:hover {
  background-color: #0056b3; /* Darker blue on hover */
}
</style>
