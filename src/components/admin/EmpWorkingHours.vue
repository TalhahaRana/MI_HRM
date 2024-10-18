<template>
  <div class="attendance-container">
    <h2>Attendance List</h2>

    <!-- Filter inputs -->
    <div class="filter-container">
      <input 
        v-model="searchName" 
        type="text" 
        placeholder="Search by Employee Name" 
        @input="console.log('Search Name:', searchName)" 
      />
      <select v-model="filterStatus" @change="console.log('Filter Status:', filterStatus)">
        <option value="">All Statuses</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>
    </div>

    <!-- Displaying filtered attendance -->
    <table v-if="paginatedAttendance.length">
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th>Date</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attendance in paginatedAttendance" :key="attendance.employee_id">
          <td>{{ attendance.employee_id }}</td>
          <td>{{ attendance.employee_name }}</td>
          <td>{{ attendance.date }}</td>
          <td>{{ attendance.check_in }}</td>
          <td>{{ attendance.check_out }}</td>
          <td>{{ attendance.status }}</td>
        </tr>
      </tbody>
    </table>

    <!-- If no data is available -->
    <p v-else>No records found matching your criteria.</p>

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const searchName = ref('');
const filterStatus = ref('');
const currentPage = ref(1);
const recordsPerPage = 15;

// Fetch attendance data on mounted
onMounted(() => {
  store.dispatch('employee/allAttendance').then(() => {
    console.log('Data fetched:', store.state.employee.attendanceDetails);
  }).catch((err) => {
    console.error('Error fetching data:', err);
  });
});

// Access attendance data from Vuex state
const attendanceData = computed(() => {
  const data = store.state.employee.attendanceDetails;
  return Array.isArray(data) ? data : []; // Ensure it's always an array
});

// Filtered attendance based on searchName and filterStatus
const filteredAttendance = computed(() => {
  return attendanceData.value.filter(attendance => {
    const matchesName = attendance.employee_name.toLowerCase().includes(searchName.value.toLowerCase());
    const matchesStatus = filterStatus.value === '' || attendance.status.toLowerCase() === filterStatus.value.toLowerCase();
    return matchesName && matchesStatus;
  });
});

// Paginate the filtered attendance data
const paginatedAttendance = computed(() => {
  const start = (currentPage.value - 1) * recordsPerPage;
  const end = start + recordsPerPage;
  return filteredAttendance.value.slice(start, end);
});

// Calculate total pages based on filtered attendance length
const totalPages = computed(() => {
  return Math.ceil(filteredAttendance.value.length / recordsPerPage);
});

// Go to the previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Go to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>

<style scoped>
.attendance-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h2 {
  text-align: center;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

input[type="text"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 30%;
}

select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #FFE1FF;
  color: black;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-controls button {
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  background-color: #4b49ac;
  color: white;
  cursor: pointer;
}

.pagination-controls button:disabled {
  background-color: #ccc;
}

.pagination-controls span {
  margin: 0 10px;
  font-size: 16px;
}
</style>
