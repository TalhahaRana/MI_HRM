<template>
    <div class="row">
      <!-- Left Side: Statistics Cards -->
      <div class="col-md-6 mb-5 stats-card">
        <div class="card p-4">
          <h5 class="card-title">Statistics</h5>
          <!-- Progress Bars -->
          <div class="progress-card">
            <p>Today Leave <span class="float-end">65</span></p>
            <div class="progress">
              <div class="progress-bar bg-warning" role="progressbar" style="width: 20%"></div>
            </div>
          </div>
          <div class="progress-card mt-3">
            <p>Total Absents <span class="float-end">92</span></p>
            <div class="progress">
              <div class="progress-bar bg-warning" role="progressbar" style="width: 16%"></div>
            </div>
          </div>
          <div class="progress-card mt-3">
            <p>Completed Projects <span class="float-end">112</span></p>
            <div class="progress">
              <div class="progress-bar bg-success" role="progressbar" style="width: 76%"></div>
            </div>
          </div>
          <div class="progress-card mt-3">
            <p>Ongoing Projects <span class="float-end">212</span></p>
            <div class="progress">
              <div class="progress-bar bg-danger" role="progressbar" style="width: 89%"></div>
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
                <p class="text-muted">Last 30 days</p>
              </div>
            </div>
          </div>
  
          <div class="col-sm-6 mb-4">
            <div class="card text-center shadow-sm card-total-bookings">
              <div class="card-body">
                <h5 class="card-title">Total HRs</h5>
                <p class="card-text display-4">{{ hrCount }}</p>
                <p class="text-muted">Last 30 days</p>
              </div>
            </div>
          </div>
  
          <div class="col-sm-6 mb-4">
            <div class="card text-center shadow-sm card-number-meetings">
              <div class="card-body">
                <h5 class="card-title">Total Departments</h5>
                <p class="card-text display-4">{{ departmentCount }}</p>
                <p class="text-muted">2.00% (Increase)</p>
              </div>
            </div>
          </div>
  
          <div class="col-sm-6 mb-4">
            <div class="card text-center shadow-sm card-number-clients">
              <div class="card-body">
                <h5 class="card-title">Total Ongoing Projects</h5>
                <p class="card-text display-4">55</p>
                <p class="text-muted">0.22% (Increase)</p>
              </div>
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
  
      onMounted(async () => {
        console.log('Fetching counts...');
        await store.dispatch('employee/card');
        console.log('Employee Count:', store.getters['employee/employeeCount']);
        console.log('HR Count:', store.getters['employee/hrCount']);
      });
  
      const employeeCount = computed(() => store.getters['employee/employeeCount']);
      const hrCount = computed(() => store.getters['employee/hrCount']);
      const departmentCount = computed(() => store.getters['employee/departmentCount']);
  
      return {
        employeeCount,
        hrCount,
        departmentCount
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
  }
  
  .card-total-bookings {
    background-color: #4747A1;
  }
  
  .card-number-meetings {
    background-color: #7978E9;
  }
  
  .card-number-clients {
    background-color: #F3797E;
  }
  
  .card-title {
    font-weight: bold;
  }
  
  .card-text {
    font-size: 1.5rem;
  }
  
  .progress-card {
    margin-bottom: 15px;
    border:1px solid rgb(221, 221, 221);
    padding: 10px;
  }
  
  .progress {
    height: 8px;
  }
  
  .progress-bar {
    border-radius: 10px;
  }
  
  .float-end {
    float: right;
  }

  </style>
  