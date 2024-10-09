<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Employee Attendance</h2>
    <div class="row mb-3 align-items-end">
      <div class="col-md-4">
        <label for="date" class="form-label">Date</label>
        <input
          type="date"
          id="date"
          class="form-control"
          v-model="selectedDate"
        />
      </div>
      <div class="col-md-4">
        <label for="month" class="form-label">Select Month</label>
        <select id="month" class="form-select" v-model="selectedMonth">
          <option disabled value="">Select Month</option>
          <option
            v-for="(month, index) in months"
            :key="index"
            :value="index + 1"
          >
            {{ month }}
          </option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="year" class="form-label">Select Year</label>
        <select id="year" class="form-select" v-model="selectedYear">
          <option disabled value="">Select Year</option>
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
    </div>
    <div class="text-center mb-3">
      <button class="btn btn-primary" @click="searchAttendance">
        <i class="bi bi-search"></i> SEARCH
      </button>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead class="table-light text-center">
          <tr>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Duty Hours</th>
            <th>Break</th>
            <th>Overtime</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(record, index) in filteredRecords"
            :key="index"
            class="hover-row"
          >
            <td>{{ record.date }}</td>
            <td>{{ record.checkIn }}</td>
            <td>{{ record.checkOut }}</td>
            <td>{{ record.production }}</td>
            <td>{{ record.breakTime }}</td>
            <td>{{ record.overtime }}</td>
          </tr>
          <tr v-if="filteredRecords.length === 0">
            <td colspan="6" class="text-center">
              No records found for the selected criteria.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const selectedDate = ref("");
    const selectedMonth = ref("");
    const selectedYear = ref("");

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const years = Array.from(
      { length: 5 },
      (_, i) => new Date().getFullYear() - i
    );

    const attendanceRecords = ref([
      {
        date: "2024-10-01",
        checkIn: "10 AM",
        checkOut: "7 PM",
        production: "9 hrs",
        breakTime: "1 hr",
        overtime: "0",
      },
      {
        date: "2024-10-02",
        checkIn: "10 AM",
        checkOut: "7 PM",
        production: "8 hrs",
        breakTime: "1 hr",
        overtime: "0",
      },
      {
        date: "2024-10-03",
        checkIn: "10 AM",
        checkOut: "7 PM",
        production: "9 hrs",
        breakTime: "1 hr",
        overtime: "1",
      },
      {
        date: "2024-09-30",
        checkIn: "10 AM",
        checkOut: "7 PM",
        production: "8 hrs",
        breakTime: "1 hr",
        overtime: "0",
      },
      {
        date: "2024-09-29",
        checkIn: "10 AM",
        checkOut: "7 PM",
        production: "7 hrs",
        breakTime: "1 hr",
        overtime: "0",
      },
    ]);

    const filteredRecords = computed(() => {
      return attendanceRecords.value.filter((record) => {
        const recordDate = new Date(record.date);
        const matchesDate = selectedDate.value
          ? record.date === selectedDate.value
          : true;
        const matchesMonth = selectedMonth.value
          ? recordDate.getMonth() + 1 === selectedMonth.value
          : true;
        const matchesYear = selectedYear.value
          ? recordDate.getFullYear() === selectedYear.value
          : true;

        return matchesDate && matchesMonth && matchesYear;
      });
    });

    const searchAttendance = () => {
      // Filtering is handled automatically by the computed property
    };

    return {
      selectedDate,
      selectedMonth,
      selectedYear,
      months,
      years,
      attendanceRecords,
      filteredRecords,
      searchAttendance,
    };
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
