<!--
  <template>
    <div class="attendance-chart">
      <h2>Employee Attendance Chart</h2>

      <div class="filters">
        <label for="date">Select Date: </label>
        <input type="date" v-model="selectedDate" @change="fetchAttendanceData" />

        <label for="frequency">Select Frequency: </label>
        <select v-model="selectedFrequency" @change="fetchAttendanceData">
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <Pie :chart-data="chartData" :options="chartOptions" />
    </div>
  </template>

  <script>
  import { Pie } from 'vue-chartjs';
  import { computed, ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

  ChartJS.register(Title, Tooltip, Legend, ArcElement);

  export default {
    name: 'EmployeeAttendanceChart',
    components: {
      Pie,
    },
    setup() {
      const store = useStore();
      const currentMonthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

      // Set default date to current month's first day
      const selectedDate = ref(currentMonthFirstDay);
      const selectedFrequency = ref('monthly');

      const fetchAttendanceData = async () => {
        if (selectedDate.value && selectedFrequency.value) {
          try {
            console.log('Fetching attendance data for:', selectedDate.value, selectedFrequency.value); // Debug log

            await store.dispatch('employee/fetchEmployeeStatus', {
              date: selectedDate.value,
              frequency: selectedFrequency.value,
            });

            console.log('Attendance Counts:', attendanceCounts.value); // Debug log
          } catch (error) {
            console.error('Error fetching attendance data:', error);
            alert('Failed to fetch attendance data.');
          }
        } else {
          alert('Please select both a date and frequency.');
        }
      };

      onMounted(() => {
        fetchAttendanceData(); // Fetch data on component mount
      });

      const attendanceCounts = computed(() => {
        const counts = store.getters['employee/statusCounts'] || { present: 0, absent: 0 };
        console.log('Computed Attendance Counts:', counts); // Debug log
        return counts;
      });

      const chartData = computed(() => {
        const data = {
          labels: ['Present', 'Absent'],
          datasets: [
            {
              label: 'Attendance',
              backgroundColor: ['#42A5F5', '#FF6384'],
              data: [attendanceCounts.value.present, attendanceCounts.value.absent],
            },
          ],
        };
        console.log('Chart Data:', data); // Debug log
        return data;
      });

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Employee Attendance Distribution',
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
  .attendance-chart {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center elements horizontally */
    margin: 20px 0; /* Add vertical spacing */
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .filters {
    text-align: center;
    margin-bottom: 20px;
  }

  div {
    position: relative;
    height: 350px; /* Ensure the chart has enough height */
    width: 350px;  /* Ensure the chart has enough width */
    margin: 0 auto; /* Center the chart horizontally */
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
        <Pie :chart-data="chartData" :options="chartOptions" />
      </div>
    </div>
  </template>

  <script>
  import { Pie } from 'vue-chartjs';
  import { computed, ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

  ChartJS.register(Title, Tooltip, Legend, ArcElement);

  export default {
    name: 'EmployeeAttendanceChart',
    components: {
      Pie,
    },
    setup() {
      const store = useStore();
      const currentMonthFirstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

      const selectedDate = ref(currentMonthFirstDay);
      const selectedFrequency = ref('monthly');

      const fetchAttendanceData = async () => {
        if (selectedDate.value && selectedFrequency.value) {
          try {
            console.log('Fetching attendance data for:', selectedDate.value, selectedFrequency.value);
            await store.dispatch('employee/fetchEmployeeStatus', {
              date: selectedDate.value,
              frequency: selectedFrequency.value,
            });
          } catch (error) {
            console.error('Error fetching attendance data:', error);
            alert('Failed to fetch attendance data.');
          }
        } else {
          alert('Please select both a date and frequency.');
        }
      };

      onMounted(() => {
        fetchAttendanceData();
      });

      const attendanceCounts = computed(() => {
        const counts = store.getters['employee/statusCounts'] || { present: 0, absent: 0 };
        return counts;
      });

      const chartData = computed(() => {
        return {
          labels: ['Present', 'Absent'],
          datasets: [
            {
              label: 'Attendance',
              backgroundColor: ['#70e000', '#ff686b'],
              data: [attendanceCounts.value.present, attendanceCounts.value.absent],
            },
          ],
        };
      });

      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Employee Attendance Distribution',
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
