<template>
  <div class="chart-container form-card">
    <h2>Employee Working Hours</h2>
    <Bar
      :data="chartData"
      :options="chartOptions"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "vue-chartjs";

// Register necessary components for Chart.js
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "EmployeeWorkingHoursChart",
  components: {
    Bar,
  },
  setup() {
    const store = useStore();

    // Ensure all weekdays are included
    const chartData = ref({
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          label: "Working Hours per Day",
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)", // Red
            "rgba(54, 162, 235, 0.6)", // Blue
            "rgba(255, 206, 86, 0.6)", // Yellow
            "rgba(75, 192, 192, 0.6)", // Green
            "rgba(153, 102, 255, 0.6)", // Purple
            "rgba(255, 159, 64, 0.6)", // Orange
            "rgba(255, 205, 86, 0.6)", // Light yellow
          ],
          borderColor: "#FFFFFF",
          borderWidth: 2,
          hoverBackgroundColor: "#4BC0C0",
          data: [], // This will be dynamically updated
        },
      ],
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Employee Working Hours This Week",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Hours",
          },
        },
        x: {
          title: {
            display: true,
            text: "Days",
          },
        },
      },
    });

    const width = ref(800);
    const height = ref(400);

    // Fetch employee working hours from Vuex
    const fetchEmployeeWorkingHours = async () => {
      const payload = {
        date: "2024-10-06",
        frequency: "weekly",
      };
      try {
        await store.dispatch("employee/fetchEmployeeWorkingHours", payload); // Update to the correct action name
      } catch (error) {
        console.error("Error fetching employee working hours:", error);
      }
    };

    // Computed property to get employee working hours from the store
    const employeeWorkingHours = computed(
      () => store.getters["employee/getWorkingHours"]
    );

    // Watch for changes in employeeWorkingHours and update chart data
    watch(
      employeeWorkingHours,
      (newValue) => {
        if (newValue && newValue.daily_working_hours) {
          const hours = newValue.daily_working_hours.map((item) => {
            const hourParts = item.working_hours.split(":");
            if (hourParts.length === 3) {
              return (
                parseInt(hourParts[0], 10) +
                parseInt(hourParts[1], 10) / 60 +
                parseInt(hourParts[2], 10) / 3600
              );
            }
            return parseFloat(item.working_hours) || 0;
          });

          chartData.value.datasets[0].data = hours; // Update chart data
        }
      },
      { immediate: true }
    );

    onMounted(fetchEmployeeWorkingHours);

    return {
      chartData,
      chartOptions,
      width,
      height,
      employeeWorkingHours,
    };
  },
};
</script>

<style scoped>
.chart-container {
  max-width: 800px;
  max-height: 500px;
  margin: 0px auto;
}

h2 {
  text-align: center;
}
</style>
