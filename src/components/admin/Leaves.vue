<template>
    <div class="container mt-5  form-card">
      <h3 class="mb-4">Manage Employee Leave Applications</h3>
  
      <!-- Leave Table -->
      <table class="table table-bordered table-striped">
        <thead class="thead-light">
          <tr>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="leave in leaveApplications" :key="leave.id">
            <td>{{ leave.employeeName }}</td>
            <td>{{ leave.leaveType }}</td>
            <td>{{ leave.startDate }}</td>
            <td>{{ leave.endDate }}</td>
            <td>
              <span :class="statusClass(leave.status)">{{ leave.status }}</span>
            </td>
            <td>
              <button
                class="btn btn-success btn-sm" :disabled="leave.status !== 'Pending'" @click="approveLeave(leave.id)">
                Approve
              </button>
              <button
                class="btn btn-danger btn-sm"
                :disabled="leave.status !== 'Pending'"
                @click="rejectLeave(leave.id)"
              >
                Reject
              </button>
            </td>
          </tr>
          <tr v-if="leaveApplications.length === 0">
            <td colspan="6" class="text-center">No leave applications found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        leaveApplications: [
          {
            id: 1,
            employeeName: 'John Doe',
            leaveType: 'Sick Leave',
            startDate: '2024-10-10',
            endDate: '2024-10-12',
            status: 'Pending',
          },
          {
            id: 2,
            employeeName: 'Jane Smith',
            leaveType: 'Vacation',
            startDate: '2024-10-15',
            endDate: '2024-10-20',
            status: 'Approved',
          },
          {
            id: 3,
            employeeName: 'Mike Johnson',
            leaveType: 'Sick Leave',
            startDate: '2024-10-05',
            endDate: '2024-10-08',
            status: 'Rejected',
          },
        ],
      };
    },
    methods: {
      // Approve leave application
      approveLeave(leaveId) {
        const leave = this.leaveApplications.find((leave) => leave.id === leaveId);
        if (leave) {
          leave.status = 'Approved';
        }
      },
  
      // Reject leave application
      rejectLeave(leaveId) {
        const leave = this.leaveApplications.find((leave) => leave.id === leaveId);
        if (leave) {
          leave.status = 'Rejected';
        }
      },
  
      // Dynamic class based on leave status
      statusClass(status) {
        switch (status) {
          case 'Approved':
            return 'text-success btn';
          case 'Rejected':
            return 'text-danger btn';
          case 'Pending':
            return 'text-warning btn';
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
    background-color: rgba(87, 182, 87, 0.2);
    color: #57B657;
  }
  
  .text-danger {
    color: red;
    background-color: rgba(255, 71, 71, 0.2);
  }
  
  .text-warning {
    background-color: rgba(255, 193, 0, 0.2);
    color: orange;
  }
  .btn{

  }
  </style>
  