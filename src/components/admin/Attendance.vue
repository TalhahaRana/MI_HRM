<template>
    <div class="container mt-5  form-card">
      <h3 class="mb-4">Employee Attendance</h3>
  
      <!-- Filters and Table -->
      <div class="row mb-4">
        <!-- Search by Employee Name -->
        <div class="col-md-4">
          <input
            type="text"
            class="form-control"
            v-model="searchTerm"
            placeholder="Search by Employee Name"
          />
        </div>
  
        <!-- Filter by Status -->
        <div class="col-md-4">
          <select class="form-control" v-model="selectedStatus">
            <option value="">All Statuses</option>
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>
      </div>
  
      <!-- Doughnut Chart for Attendance Summary -->
      <div class="row mb-4">
        <div class="col-md-6 offset-md-3">
          <DoughnutChart :chart-data="chartData" :chart-options="chartOptions" />
        </div>
      </div>
  
      <!-- Attendance Table -->
      <table class="table table-bordered table-striped">
        <thead class="thead-light">
          <tr>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="attendance in filteredAttendance" :key="attendance.id">
            <td>{{ attendance.employeeName }}</td>
            <td>{{ attendance.date }}</td>
            <td>
              <span :class="statusClass(attendance.status)">
                {{ attendance.status }}
              </span>
            </td>
          </tr>
          <tr v-if="filteredAttendance.length === 0">
            <td colspan="3" class="text-center">No attendance records found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { Doughnut } from 'vue-chartjs';
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
  
  // Register chart components
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  export default {
    components: {
      DoughnutChart: {
        extends: Doughnut,
        props: ['chartData', 'chartOptions'],
      },
    },
    data() {
      return {
        searchTerm: '',
        selectedStatus: '',
        attendanceRecords: [
          { id: 1, employeeName: 'John Doe', date: '2024-10-01', status: 'Present' },
          { id: 2, employeeName: 'Jane Smith', date: '2024-10-01', status: 'Absent' },
          { id: 3, employeeName: 'Mike Johnson', date: '2024-10-01', status: 'Late' },
          { id: 4, employeeName: 'Emily Davis', date: '2024-10-02', status: 'Present' },
          { id: 5, employeeName: 'Michael Brown', date: '2024-10-02', status: 'Late' },
        ],
      };
    },
    computed: {
      filteredAttendance() {
        return this.attendanceRecords.filter((record) => {
          const matchesName = record.employeeName.toLowerCase().includes(this.searchTerm.toLowerCase());
          const matchesStatus = this.selectedStatus === '' || record.status === this.selectedStatus;
          return matchesName && matchesStatus;
        });
      },
  
      statuses() {
        return [...new Set(this.attendanceRecords.map((record) => record.status))];
      },
  
      // Compute the data for the Doughnut chart
      chartData() {
        const statusCounts = {
          Present: 0,
          Absent: 0,
          Late: 0,
        };
  
        // Count occurrences of each status
        this.attendanceRecords.forEach((record) => {
          statusCounts[record.status]++;
        });
  
        return {
          labels: ['Present', 'Absent', 'Late'],
          datasets: [
            {
              label: 'Attendance Status',
              data: [statusCounts.Present, statusCounts.Absent, statusCounts.Late],
              backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
              hoverBackgroundColor: ['#218838', '#c82333', '#e0a800'],
            },
          ],
        };
      },
  
      // Chart options
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
        };
      },
    },
    methods: {
      statusClass(status) {
        switch (status) {
          case 'Present':
            return 'text-success';
          case 'Absent':
            return 'text-danger';
          case 'Late':
            return 'text-warning';
          default:
            return '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .table {
    margin-top: 20px;
  }
  
  thead {
    background-color: #f8f9fa;
  }
  
  .text-success {
    color: green;
  }
  
  .text-danger {
    color: red;
  }
  
  .text-warning {
    color: orange;
  }
  
  canvas {
    max-height: 400px;
    margin: auto;
  }
  </style>
  