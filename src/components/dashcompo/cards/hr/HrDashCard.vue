<template>
    <div class="container-fluid px-3">
      <div class="row">
        <!-- Left Side: Welcome Card & Other Sections -->
        <div class="col-lg-6 col-md-12">
          <!-- Welcome Card -->
          <div class="card custom-card text-white mb-3 grad">
            <div
              class="card-body d-flex justify-content-between align-items-center h-100 flex-column flex-lg-row"
            >
              <div>
                <h5 class="card-title mb-1">Welcome Back, {{ userName }}</h5>
                
                  <span class="font">
                    🌟 Today is a new opportunity to grow and shine! Remember,
                    every small step you take leads to big achievements. Let’s
                    make today count!
                  </span>
              
                <!-- <button class="btn btn-outline-light mt-2">View Profile</button> -->
              </div>
              <video autoplay muted loop class="emoji-video mt-3 mt-lg-0">
                <source src="../../assets/images/welcome.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
  
         
        </div>
  
       
        <div class="col-lg-6 col-md-12">
  <div class="row">
    <div class="col-lg-6 col-sm-6 col-12 mb-4 ">
      <div class="card text-center p-2 shadow-sm card-today-bookings">
        <div class="card-body">
          <h5 class="card-title">Total Employees</h5>
          <h5 class="card-text display-4">{{ employeeCount }}</h5>
        </div>
      </div>
    </div>

    <div class="col-lg-6 col-sm-6 col-12 mb-4">
      <div class="card text-center p-2 shadow-sm card-total-bookings">
        <div class="card-body">
          <h5 class="card-title">Total HRs</h5>
          <p class="card-text display-4">{{ hrCount }}</p>
        </div>
      </div>
    </div>

    <div class="col-lg-6 col-sm-6 col-12 mb-4">
      <div class="card text-center p-2 shadow-sm card-number-meetings">
        <div class="card-body">
          <h5 class="card-title">Total Departments</h5>
          <p class="card-text display-4">{{ departmentCount }}</p>
        </div>
      </div>
    </div>

    <div class="col-lg-6 col-sm-6 col-12 mb-4">
      <div class="card text-center p-2 shadow-sm card-number-clients">
        <div class="card-body">
          <h6 class="card-title">Total Ongoing Projects</h6>
          <p class="card-text display-4">{{ inProgressProjectCount }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  
      <div class="row">
  <!-- Left Side: Statistics Cards -->
  <div class="col-md-6 mb-2  stats-card">
    <div class="card p-4">
      <h5 class="card-title">Statistics</h5>
      <!-- Progress Bars -->
      <div class="progress-card p-3">
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
      <div class="progress-card mt-3">
        <p>Pending Projects <span class="float-end">{{ pendingProjectCount }}</span></p>
        <div class="progress">
          <div class="progress-bar bg-danger" role="progressbar" :style="{ width: `${pendingProjectCount}%` }"></div>
        </div>
      </div>
      <div class="progress-card mt-3">
        <p>Completed Projects <span class="float-end">{{ completedProjectCount }}</span></p>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" :style="{ width: `${completedProjectCount}%` }"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Right Side: ChartEmployee Component -->
  <div class="col-md-6">
    <div class="card p-2">
      <ChartEmployee />
    </div>
  </div>
</div>
<div class="row">
  <!-- Left Side: CheckInOut Component -->
  <div class="col-md-6 mb-5">
    <div class="card p-4">
      <CheckInOut />
    </div>
  </div>

  <!-- Right Side: WorkingHours Component -->
  <div class="card col-md-6">
    <div class="emp p-1">
      <WorkingHours />
    </div>
  </div>
</div>

    </div>
  </template>
  
  <script>

  import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
  import CheckInOut from "@/components/employee/CheckInOut.vue";
  import EmployeeAttendance from "@/components/employee/EmployeeAttendance.vue";
  import WorkingHours from "@/components/employee/workingHours.vue";
  import ChartEmployee from "@/components/employee/ChartEmployee.vue";
  
  export default {
    components: {
      CheckInOut,
      EmployeeAttendance,
      WorkingHours,
      ChartEmployee,
    },
    setup() {
        const store = useStore();
      const userName = ref("");
     
  
      onMounted(() => {
        store.dispatch('employee/fetchAttendanceData');
      store.dispatch('employee/card');
      store.dispatch('projects/fetchProjectsCount');
  
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
          userName.value = storedUserName.toUpperCase(); // Set the userName from local storage
        }
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
  
      const meetings = ref(4);
  
      return {
        userName,
        meetings,
        employeeCount,
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
 .container-fluid {
    background-color: #F5F7FF;
 }
  .custom-card {
    /* background: linear-gradient(90deg, #ff6a00 0%, #ee0979 100%); */
    border-radius: 10px;
    padding: 10px;
    height: 92%;
  }
  .working-hours{
    width: 100%;
    border-radius: 15px;
    height: 33%;
  
background-color: #ffffff;
    box-shadow: 0px 5px 21px -5px #CDD1E1;

   
  }
  .emp{
    margin-top:70px;
  }
  
  .emoji-video {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover; /* Ensures the video fits within the rounded container */
  }
  .card {
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: 0px 5px 21px -5px #CDD1E1;
   
  }
  .card-title {
    font-weight: bold;
  }
  
  .card-text {
    font-size: 1.5rem;
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
  .progress-card {
  margin-bottom: 15px;
  border-radius: 10px; 
  padding: 20px;

  background-color: #f9f9f9; 
  transition: background-color 0.3s; 
}

.progress-card:hover {
  background-color: #e6f0ff; 
}
.font{
  font-size: 18px;
}
.progress {
  height: 8px;
  border-radius: 10px; 
  overflow: hidden; 
}
.progress-card {
  background-color: #fff3cd;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid transparent; /* Transparent border to allow gradient */
  background-image: linear-gradient(white, white), 
                    linear-gradient(45deg, rgb(34, 51, 102), rgb(68, 102, 153), rgb(102, 153, 204), rgb(136, 204, 238));
  background-origin: border-box;
  background-clip: padding-box, border-box;
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
  
  /* Media Queries for Responsiveness */
  @media (max-width: 992px) {
    .card-body {
    flex-direction: column;
    text-align: center;
  }
  
    .emoji-video {
      margin-top: 15px;
    }
   
  }
  
  @media (max-width: 768px) {
    .attendance {
      margin: 0px 46px 25px 81px;
    }
    .card-title {
    font-size: 1.2rem;
  }

  .card-text {
    font-size: 0.9rem;
  }
  .card {
    margin-bottom: 20px;
  }

  .card .card-body {
    padding: 15px;
  }

    
  }
  
  @media (max-width: 576px) {
    .card-title {
      font-size: 1.2rem;
    }
  
    .card-text {
      font-size: 0.9rem;
    }
  
    .emoji-video {
      width: 40px;
      height: 40px;
    }
  }
  </style>
  