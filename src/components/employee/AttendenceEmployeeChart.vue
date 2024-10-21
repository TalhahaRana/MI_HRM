<!-- <template>
  <div class="container mt-4 form-card">
    <h2 class="text-center mb-4">Employee Attendance Chart</h2>

    <div class="row g-3 justify-content-center mb-3">
      <div class="col-md-4">
        <label for="date" class="form-label">Select Date</label>
        <input
          type="date"
          id="date"
          class="form-control"
          v-model="selectedDate"
          @change="fetchAttendanceData"
          required
        />
      </div>
      <div class="col-md-4">
        <label for="frequency" class="form-label">Select Frequency</label>
        <select
          id="frequency"
          class="form-select"
          v-model="selectedFrequency"
          @change="fetchAttendanceData"
          required
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>

    <div class="text-center mb-3">
      <button class="btn btn-primary" @click="fetchAttendanceData">
        <i class="bi bi-search"></i> FETCH ATTENDANCE DATA
      </button>
    </div>

    <div class="chart-container">
      <Chart :data="chartData" :options="chartOptions" type="pie" />
    </div>
  </div>
</template>

<script>
import { Chart } from "vue-chartjs";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register the necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: "EmployeeAttendanceChart",
  components: {
    Chart,
  },
  setup() {
    const store = useStore();

    // Get the first day of the current month
    const currentMonthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString()
      .split("T")[0];

    const selectedDate = ref(currentMonthFirstDay);
    const selectedFrequency = ref("monthly");

    // Function to fetch attendance data
    const fetchAttendanceData = async () => {
      if (selectedDate.value && selectedFrequency.value) {
        try {
          console.log("Fetching attendance data for:", selectedDate.value, selectedFrequency.value);
          await store.dispatch("employee/fetchEmployeeStatus", {
            date: selectedDate.value,
            frequency: selectedFrequency.value,
          });
        } catch (error) {
          console.error("Error fetching attendance data:", error);
          alert("Failed to fetch attendance data.");
        }
      } else {
        alert("Please select both a date and frequency.");
      }
    };

    onMounted(() => {
      fetchAttendanceData();
    });

    // Compute the attendance counts
    const attendanceCounts = computed(() => {
      const counts = store.getters["employee/statusCounts"] || { present: 0, absent: 0 };
      return counts;
    });

    // Chart data (computed based on attendance counts)
    const chartData = computed(() => {
      return {
        labels: ["Present", "Absent"],
        datasets: [
          {
            label: "Attendance",
            backgroundColor: ["#70e000", "#ff686b"], // Green for present, red for absent
            data: [attendanceCounts.value.present, attendanceCounts.value.absent],
          },
        ],
      };
    });

    // Chart options
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Employee Attendance Distribution",
        },
      },
    };

    return {
      chartData,
      chartOptions,
      selectedDate,
      selectedFrequency,
      fetchAttendanceData,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.row {
  margin-bottom: 20px;
}

.col-md-4 {
  min-width: 300px;
}

.btn-primary {
  background-color: var(--basic-button);
  border-color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.chart-container {
  position: relative;
  height: 350px;
  width: 350px;
  margin: 0 auto;
}
</style> -->


<template>
  <div class="container mt-4 form-card">
    <h2 class="text-center mb-4">Employee Attendance Chart</h2>

    <div class="row g-3 justify-content-center mb-3">
      <div class="col-md-4">
        <label for="date" class="form-label">Select Date</label>
        <input
          type="date"
          id="date"
          class="form-control"
          v-model="selectedDate"
          @change="fetchAttendanceData"
          required
        />
      </div>
      <div class="col-md-4">
        <label for="frequency" class="form-label">Select Frequency</label>
        <select
          id="frequency"
          class="form-select"
          v-model="selectedFrequency"
          @change="fetchAttendanceData"
          required
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>

    <div class="text-center mb-3">
      <button class="btn btn-primary" @click="fetchAttendanceData">
        <i class="bi bi-search"></i> FETCH ATTENDANCE DATA
      </button>
    </div>

    <div class="chart-container">
      <Chart :data="chartData" :options="chartOptions" type="pie" />
    </div>
  </div>
</template>

<script>
import { Chart } from "vue-chartjs";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register the necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: "EmployeeAttendanceChart",
  components: {
    Chart,
  },
  setup() {
    const store = useStore();

    const selectedDate = ref(null);
    const selectedFrequency = ref("monthly");

    // Function to fetch attendance data
    const fetchAttendanceData = async () => {
      try {
        console.log("Fetching attendance data...");
        await store.dispatch("employee/fetchEmployeeStatus");
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        alert("Failed to fetch attendance data.");
      }
    };

    onMounted(() => {
      fetchAttendanceData();
    });

    // Compute the attendance counts
    const attendanceCounts = computed(() => {
      const counts = store.getters["employee/statusCounts"] || { present: 0, absent: 0, onleave: 0 };
      return counts;
    });

    // Chart data (computed based on attendance counts)
    const chartData = computed(() => {
      return {
        labels: ["Present", "Absent", "On Leave"], // Added onleave
        datasets: [
          {
            label: "Attendance",
            backgroundColor: ["#70e000", "#ff686b", "#ffcc00"], // Green for present, red for absent, yellow for on leave
            data: [attendanceCounts.value.present, attendanceCounts.value.absent, attendanceCounts.value.onleave],
          },
        ],
      };
    });

    // Chart options
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Employee Attendance Distribution",
        },
      },
    };

    return {
      chartData,
      chartOptions,
      selectedDate,
      selectedFrequency,
      fetchAttendanceData,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.row {
  margin-bottom: 20px;
}

.col-md-4 {
  min-width: 300px;
}

.btn-primary {
  background-color: var(--basic-button);
  border-color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.chart-container {
  position: relative;
  height: 350px;
  width: 350px;
  margin: 0 auto;
}
</style>
