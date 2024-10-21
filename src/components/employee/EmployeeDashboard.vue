<template>
  <div class="container-fluid px-3">
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <!-- Welcome Card -->
        <div class="card custom-card text-white mt-4">
          <div
            class="card-body d-flex justify-content-between align-items-center h-100 flex-column flex-lg-row"
          >
            <div>
              <h5 class="card-title mb-1">Welcome Back, {{ userName }}</h5>
              <p class="card-text">
                <span class="font-weight-bold">
                  🌟 Today is a new opportunity to grow and shine! Remember,
                  every small step you take leads to big achievements. Let’s
                  make today count!
                </span>
              </p>
              <button class="btn btn-outline-light mt-2">View Profile</button>
            </div>
            <video autoplay muted loop class="emoji-video mt-3 mt-lg-0">
              <source src="../../assets/images/welcome.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <!-- CheckInOut Section -->
        <div class="">
          <CheckInOut />
        </div>

        <!-- Employee Holidays Section -->
        <div class="">
          <ChartEmployee />
        </div>
      </div>

      <!-- Attendance and Other Sections -->
      <div class="col-lg-6 col-md-12">
        <!-- Employee Attendance Section -->
        <div class="mt-4 attendance">
          <EmployeeAttendance />
        </div>

        <!-- Working Hours Section -->
        <div class="">
          <WorkingHours />
        </div>

        <!-- Chart Employee Section -->
        <div class="mt-4 attendance">
          <EmployeeHolidays />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import CheckInOut from "@/components/employee/CheckInOut.vue";
import EmployeeHolidays from "./EmployeeHolidays.vue";
import EmployeeAttendance from "./EmployeeAttendance.vue";
import WorkingHours from "./workingHours.vue";
import ChartEmployee from "./ChartEmployee.vue";

export default {
  components: {
    CheckInOut,
    EmployeeHolidays,
    EmployeeAttendance,
    WorkingHours,
    ChartEmployee,
  },
  setup() {
    const userName = ref("");

    onMounted(() => {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        userName.value = storedUserName.toUpperCase(); // Set the userName from local storage
      }
    });

    const meetings = ref(4);

    return {
      userName,
      meetings,
    };
  },
};
</script>

<style scoped>
.custom-card {
  background: linear-gradient(90deg, #ff6a00 0%, #ee0979 100%);
  border-radius: 10px;
  padding: 20px;
}

.emoji-video {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover; /* Ensures the video fits within the rounded container */
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
