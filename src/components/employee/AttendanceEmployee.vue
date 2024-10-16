<template>
  <div class="container mt-4 form-card">
    <!-- Select Month Dropdown -->
    <div class="row mb-3">
      <div class="col-md-6">
        <label for="selectedMonth" class="form-label">Select Month</label>
        <select
          v-model="selectedMonth"
          id="selectedMonth"
          class="form-select"
        >
          <option disabled value="">Choose a Month</option>
          <option value="">All Months</option> <!-- Option to fetch all attendance -->
          <option v-for="(month, index) in months" :key="index" :value="index + 1">
            {{ month }}
          </option>
        </select>
      </div>

      <!-- Search Button -->
      <div class="col-md-6 d-flex align-items-end">
        <button @click="searchAttendance" class="btn btn-primary">
          Filter Attendance
        </button>
      </div>
    </div>

    <!-- Attendance Records Display -->
    <div v-if="attendanceRecords && attendanceRecords.length" class="mt-4">
      <h3>Attendance Records for Employee</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <!-- <th>Employee</th> -->
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in attendanceRecords" :key="index">
            <!-- <td>{{ record.name }}</td> -->
            <td>{{ record.date }}</td>
            <td>{{ record.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="mt-4 text-muted">
      <p>No attendance records found.</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const selectedMonth = ref(""); // Default is to show all attendance
    const months = ref([
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]);

    // Computed property to get attendance records from the Vuex store
    const attendanceRecords = computed(() => store.getters["employee/getAttendanceRecords"]);

    const searchAttendance = async () => {
      try {
        console.log("Fetching attendance for month:", selectedMonth.value || "All months");

        // Dispatch the Vuex action to fetch data
        await store.dispatch("employee/fetchEmployeeAttendance", {
          month: selectedMonth.value || "" // If no month selected, fetch all records
        });

      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    // Fetch all attendance records when the component is mounted
    onMounted(() => {
      searchAttendance(); // Automatically fetch attendance for all months
    });

    return {
      selectedMonth,
      months,
      searchAttendance,
      attendanceRecords,
    };
  },
};
</script>








<style scoped>
.container {
  max-width: 800px;
}
</style>


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

.table tbody tr td:hover {
  background-color: #e9ecef; /* Light grey for each cell on hover */
}

.btn-primary {
  background-color: var(--basic-button); /* Primary button color */
  border-color: white;
}

.btn-primary:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

@media (max-width: 576px) {
  .container {
    padding: 0 15px;
  }
}

/* Additional styles for icons */
.bi {
  margin-right: 5px; /* Space between icon and text */
}
</style>
