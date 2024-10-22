<template>
    <div class="row">
      <!-- Left Side: Statistics Cards -->
      <div class="col-md-6 mb-5 stats-card">
        <div class="card p-4">
          <h5 class="card-title">Statistics</h5>
          <!-- Progress Bars -->
          <div class="progress-card">
            <p>Today Leave <span class="float-end">{{ totalOnLeave }}</span></p>
            <div class="progress">
                <div class="progress-bar bg-warning" role="progressbar" :style="{ width: `${leavePercentage}%` }"></div>
            </div>
          </div>
          <div class="progress-card mt-3">
            <p>Total Absents <span class="float-end">{{ totalAbsent }}</span></p>
            <div class="progress">
                <div class="progress-bar bg-warning" role="progressbar" :style="{ width: `${absentPercentage}%` }"></div>
            </div>
          </div>
        <!-- Pending Projects -->
<div class="progress-card mt-3">
  <p>Pending Projects <span class="float-end">{{ pendingProjectCount }}</span></p>
  <div class="progress">
    <div class="progress-bar bg-danger" role="progressbar" :style="{ width: `${pendingProjectCount}%` }"></div>
  </div>
</div>

<!-- Completed Projects -->
<div class="progress-card mt-3">
  <p>Completed Projects <span class="float-end">{{ completedProjectCount }}</span></p>
  <div class="progress">
    <div class="progress-bar bg-success" role="progressbar" :style="{ width: `${completedProjectCount}%` }"></div>
  </div>
</div>

  </div>
 
      </div>
  
      <!-- Right Side: 4 Cards in 2x2 grid -->
      <div class="col-md-6">
      <div class="row">
        <div class="col-sm-6 mb-4">
          <div class="card text-center shadow-sm card-today-bookings">
            <div class="card-body">
              <h5 class="card-title">Total Employees</h5>
              <h5 class="card-text display-4">{{ employeeCount }}</h5>
            </div>
          </div>
        </div>

        <div class="col-sm-6 mb-4">
          <div class="card text-center shadow-sm card-total-bookings">
            <div class="card-body">
              <h5 class="card-title">Total HRs</h5>
              <p class="card-text display-4">{{ hrCount }}</p>
            </div>
          </div>
        </div>

        <div class="col-sm-6 mb-4">
          <div class="card text-center shadow-sm card-number-meetings">
            <div class="card-body">
              <h5 class="card-title">Total Departments</h5>
              <p class="card-text display-4">{{ departmentCount }}</p>
            </div>
          </div>
        </div>

        <div class="col-sm-6 mb-4">
          <div class="card text-center shadow-sm card-number-clients">
            <div class="card-body">
              <h6 class="card-title">Total Ongoing Projects</h6>
              <p class="card-text display-4">{{ inProgressProjectCount }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row  project-summary">
    <div class="col-12 fill-space">
      <h4 class="project-summary-heading">Project Summary</h4>

      <!-- Summary Table -->
      <div class="table-responsive">
        <table class="table table-bordered ">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Employee Name</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            
 
            <tr v-for="(projectData, index) in projects" :key="index">
                <td>{{ projectData.title }}</td>
                <td>{{ projectData.name }}</td>
        
        <td>{{ projectData.deadline }}</td>
        <td>{{ projectData.status }}</td>
      
    </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
    </div>


   
  </template>
  
  <script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    // Fetch necessary data when the component mounts
    onMounted(() => {
      store.dispatch('employee/fetchAttendanceData');
      store.dispatch('employee/card');
      store.dispatch('projects/fetchProjectsCount');
      store.dispatch('projects/AllAssignProject');
    });

    // Compute employee, HR, and department counts
    const employeeCount = computed(() => store.getters['employee/employeeCount']);
    const hrCount = computed(() => store.getters['employee/hrCount']);
    const departmentCount = computed(() => store.getters['employee/departmentCount']);
  
    // Compute total absents and leaves from the store 
    const totalAbsent = computed(() => store.getters['employee/totalAbsent']);
    const totalOnLeave = computed(() => store.getters['employee/totalOnLeave']);
  
    const totalEmployees = computed(() => employeeCount.value || 1); // Avoid division by zero
    const leavePercentage = computed(() => (totalOnLeave.value / totalEmployees.value) * 100);
    const absentPercentage = computed(() => (totalAbsent.value / totalEmployees.value) * 100);
  
    // Fetch project counts from the store
    const pendingProjectCount = computed(() => store.getters['projects/pendingProjectCount']);
    const inProgressProjectCount = computed(() => store.getters['projects/inProgressProjectCount']);
    const completedProjectCount = computed(() => store.getters['projects/completedProjectCount']);
  
    // Fetch the projects
    const projects = computed(() => store.getters['projects/allProjects']);

    return {
      totalAbsent,
      totalOnLeave,
      leavePercentage,
      absentPercentage,
      employeeCount,
      hrCount,
      departmentCount,
      pendingProjectCount,
      inProgressProjectCount,
      completedProjectCount,
      projects, 
    };
  },
};
</script>

  
  
  <style scoped>
  .card {
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: 0px 5px 21px -5px #CDD1E1;
   
  }
  
  .card-today-bookings {
    background-color: #7DA0FA;
    
   color: #ffffff;
  }
  
  .card-total-bookings {
    background-color: #4747A1;
    color: #ffffff;
}
  
  .card-number-meetings {
    background-color: #7978E9;
    color: #ffffff;
  }
  
  .card-number-clients {
    background-color: #F3797E;
    color: #ffffff;
  }
  
  .card-title {
    font-weight: bold;
  }
  
  .card-text {
    font-size: 1.5rem;
  }
  
  .progress-card {
  margin-bottom: 15px;
  border: 1px solid rgba(221, 221, 221, 0.5); 
  border-radius: 10px; 
  padding: 10px;
  background-color: #f9f9f9; 
  transition: background-color 0.3s; 
}

.progress-card:hover {
  background-color: #e6f0ff; 
}

.progress {
  height: 8px;
  border-radius: 10px; 
  overflow: hidden; 
}

.progress-bar {
  border-radius: 10px;
}

.float-end {
  float: right;
}

.bg-warning {
  background-color: #ffc107 !important; 
}

.bg-success {
  background-color: #28a745 !important; 
}

.bg-danger {
  background-color: #dc3545 !important; 
}
  .project-summary {
  background-color: #DAE7FF;
  border-radius: 10px;
  padding: 20px;
  height: 230px;
}
.project-summary-heading {
  font-size: 1.5rem; 
  font-weight: bold; 
  color: #4e73df; 
  margin-bottom: 15px; 
  text-align: center;
  text-transform: uppercase; 
  letter-spacing: 1px; 
  border-bottom: 2px solid #4e73df; 
  padding-bottom: 5px; 
}
.table-responsive {
  max-height: 150px; 
  overflow-y: auto; 
  overflow-x: hidden; 
}

.table {
  border-collapse: collapse; 
  width: 100%; 
}

.table th {
    background-color: #4747A1; 
  color: white; 
  padding: 10px; 
  font-size: 0.8rem;
  text-align: left; 
}

.table td {
  padding: 7px; 
  border-bottom: 1px solid #dee2e6; 
  transition: background-color 0.3s; 
  font-size: 0.8rem;
}

.table tbody tr:hover {
  background-color: #f1f1f1; 
}

.badge {
  padding: 0.6em 1.2em;
  font-size: 0.85rem;
  border-radius: 15px;
  font-weight: 600;
}

.status-ongoing {
  background-color: white;
  color: blue; 
  border: 2px solid blue; 
  width: 80px;
  font-size: 0.6rem;
}

.status-completed {
  background-color: white;
  color: green;
  width: 80px;
  font-size: 0.6rem;
  border: 2px solid green;
}
  </style>
  