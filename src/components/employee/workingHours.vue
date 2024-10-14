<template>
  <div class="chart-container  form-card">
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
import { defineComponent, ref } from "vue";
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

export default defineComponent({
  name: "EmployeeWorkingHoursChart",
  components: {
    Bar,
  },
  setup() {
    // Sample Data with RGBA colors to decrease opacity
    const chartData = ref({
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [
        {
          label: "Working Hours per Day",
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)", // Red with 60% opacity
            "rgba(54, 162, 235, 0.6)", // Blue with 60% opacity
            "rgba(255, 206, 86, 0.6)", // Yellow with 60% opacity
            "rgba(75, 192, 192, 0.6)", // Green with 60% opacity
            "rgba(153, 102, 255, 0.6)", // Purple with 60% opacity
            "rgba(255, 159, 64, 0.6)", // Orange with 60% opacity
            "rgba(255, 205, 86, 0.6)", // Light yellow with 60% opacity
          ],
          borderColor: "#FFFFFF", // White border around bars
          borderWidth: 2,
          hoverBackgroundColor: "#4BC0C0",
          data: [8, 7, 8, 6, 9, 5, 7],
        },
      ],
    });

    // Chart options
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

    // Custom width and height for the chart
    const width = ref(800);
    const height = ref(400);

    return {
      chartData,
      chartOptions,
      width,
      height,
    };
  },
});
</script>

<style scoped>
.chart-container {
  max-width: 800px;
  max-height: 500px;
  margin: 80px auto;
}

h2 {
  text-align: center;
}
</style>
