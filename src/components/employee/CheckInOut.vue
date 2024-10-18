<!-- <template>
  <div class="container mt-4 form-card">
    <div class="card">
      <div class="card-body">
        <div
          class="alert d-flex justify-content-between align-items-center"
          style="background-color: whitesmoke"
        >
          <div>
            <h4 class="mb-0">Work Time</h4>
            <p class="h5 mb-0 text-dark">{{ formattedWorkTime }}</p>
          </div>
          <div>
            <button
              class="btn btn-inverse gap-2 d-flex align-items-center justify-content-center"
              @click="toggleCheckInOut"
              :disabled="isCheckedOut || isTomorrow || isLoading"
            >
              <span v-if="isLoading" class="spinner"></span>
              <span
                class="gap-2 d-flex align-items-center justify-content-center"
                v-else
              >
                <img src="../../assets/images/clock.svg" alt="clock icon" />
                {{ isCheckedIn ? "Check-out" : "Check-in" }}
              </span>
            </button>
          </div>
        </div>

        <div class="row mt-3 text-center">
          <div class="col">
            <h5>Remaining</h5>
            <p>{{ remainingTime }}</p>
          </div>
          <div class="col">
            <h5>Working Hours</h5>
            <p>{{ displayedWorkingHours }}</p>
          </div>
          <div class="col">
            <h5>Break</h5>
            <p>{{ breakTime }}</p>
          </div>
        </div>
      </div>

      <div class="card-footer text-start">
        <div class="d-flex d-inline-flex align-items-center p-2 gap-2">
          <a href="#" class="link-primary text-dark text-decoration-none"
            >View Attendance</a
          >
          <img
            src="../../assets/images/arrow-right-circle.svg"
            alt="arrow-right-circle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const isCheckedIn = ref(false);
    const isCheckedOut = ref(false);
    const workTime = ref(0);
    const timer = ref(null);
    const isTomorrow = ref(false);
    const displayedWorkingHours = ref("");
    const isLoading = ref(false);

    const formattedWorkTime = computed(() => {
      const hours = Math.floor(workTime.value / 3600);
      const minutes = Math.floor((workTime.value % 3600) / 60);
      const seconds = workTime.value % 60;
      return `${hours} Hrs : ${minutes} Min : ${seconds} Sec`;
    });

    const remainingTime = ref("2 Hrs 36 Min"); // Placeholder
    const breakTime = ref("1 Hrs 20 Min"); // Placeholder

    const toggleCheckInOut = async () => {
      const type = isCheckedIn.value ? "check_out" : "check_in";
      isLoading.value = true; // Set loading to true

      try {
        const workingHoursResponse = await store.dispatch(
          "employee/checkInOut",
          type
        );

        if (!isCheckedIn.value) {
          isCheckedIn.value = true; // Set checked in state
          timer.value = setInterval(() => {
            workTime.value += 1; // Increment timer every second
          }, 1000);
        } else {
          isCheckedIn.value = false; // Set checked out state
          isCheckedOut.value = true; // Mark as checked out
          clearInterval(timer.value); // Stop the timer
        }

        if (workingHoursResponse) {
          displayedWorkingHours.value = workingHoursResponse; // Set working hours from API response
        }
      } catch (error) {
        console.error("Error during API call:", error);
        alert("An error occurred. Please try again.");
      } finally {
        isLoading.value = false; // Reset loading state
      }
    };

    return {
      formattedWorkTime,
      remainingTime,
      breakTime,
      isCheckedIn,
      toggleCheckInOut,
      displayedWorkingHours,
      isCheckedOut,
      isTomorrow,
      isLoading,
    };
  },
};
</script>

<style scoped>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 20px; /* Adjust the size of the spinner */
  height: 20px; /* Adjust the size of the spinner */
  animation: spin 1s linear infinite;
  margin-right: 8px; /* Space between spinner and text */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.alert {
  background-color: #fff3cd;
}

.btn-inverse {
  background-color: #4b49ac; /* Button color */
  border-color: rgba(0, 123, 255, 0);
  color: whitesmoke; /* Button text color */
}

.btn-inverse:hover {
  color: white; /* Color on hover */
  background-color: #007bff; /* Background color on hover */
  border-color: #007bff; /* Border color on hover */
}

.btn-inverse:focus,
.btn-inverse.focus {
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); /* Focus effect */
}

.btn-inverse:disabled,
.btn-inverse.disabled {
  color: #007bff; /* Color when disabled */
  background-color: transparent; /* Background when disabled */
}

.btn-inverse:active,
.btn-inverse.active,
.show > .btn-inverse.dropdown-toggle {
  color: white; /* Color when active */
  background-color: #007bff; /* Background color when active */
  border-color: #007bff; /* Border color when active */
}

@media (max-width: 576px) {
  .alert {
    flex-direction: column;
    text-align: center;
  }
}
</style> -->


<!-- <template>
  <div class="container mt-4 form-card">
    <div class="card">
      <div class="card-body">
        <div class="arc-container">
          <svg width="100%" height="150" viewBox="0 0 200 100">

            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#e0e0e0"
              stroke-width="10"
            />

            <path
              :d="arcPath"
              fill="none"
              stroke="#4b49ac"
              stroke-width="10"
              stroke-linecap="round"
            />

            <text x="20" y="95" font-size="12">🌙</text>
            <text x="100" y="55" font-size="12">☀️</text>
            <text x="180" y="95" font-size="12">🌙</text>
          </svg>
          <div class="time-blocks">
            <div class="block">
              <h5>Check-In</h5>
              <p>{{ checkInTime || "10:00 AM" }}</p>
            </div>
            <div class="block">
              <img src="../../assets/images/clock.svg" alt="clock icon" />
            </div>
            <div class="block">
              <h5>Check-Out</h5>
              <p>{{ checkOutTime || "06:00 PM" }}</p>
            </div>
          </div>
        </div>

        <div class="row mt-3 text-center">
          <div class="col">
            <h5>Remaining</h5>
            <p>{{ remainingTime }}</p>
          </div>
          <div class="col">
            <h5>Working Hours</h5>
            <p>{{ displayedWorkingHours }}</p>
          </div>
          <div class="col">
            <h5>Break</h5>
            <p>{{ breakTime }}</p>
          </div>
        </div>
      </div>

      <div class="card-footer text-start">
        <div class="d-flex d-inline-flex align-items-center p-2 gap-2">
          <a href="#" class="link-primary text-dark text-decoration-none"
            >View Attendance</a
          >
          <img
            src="../../assets/images/arrow-right-circle.svg"
            alt="arrow-right-circle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const isCheckedIn = ref(false);
    const isCheckedOut = ref(false);
    const workTime = ref(0); // Time in seconds
    const checkInTime = ref("10:00 AM"); // Placeholder check-in time
    const checkOutTime = ref("06:00 PM"); // Placeholder check-out time
    const remainingTime = ref("2 Hrs 36 Min"); // Placeholder
    const breakTime = ref("1 Hrs 20 Min"); // Placeholder
    const displayedWorkingHours = computed(() => {
      const hours = Math.floor(workTime.value / 3600);
      const minutes = Math.floor((workTime.value % 3600) / 60);
      return `${hours} Hrs : ${minutes} Min`;
    });

    // Dynamic arc filling
    const maxTime = 7.5 * 3600; // 7 hours 30 minutes in seconds
    const arcPath = computed(() => {
      const progress = Math.min(workTime.value / maxTime, 1); // Ensure it doesn't go over 1
      const endX = 20 + progress * 160;
      const arcSweep = progress > 0.5 ? 1 : 0;
      return `M 20 80 A 80 80 0 ${arcSweep} 1 ${endX} 80`;
    });

    const toggleCheckInOut = async () => {
      const type = isCheckedIn.value ? "check_out" : "check_in";

      if (!isCheckedIn.value) {
        isCheckedIn.value = true; // Set checked in state
        setInterval(() => {
          workTime.value += 60; // Increment timer by 1 minute for demo purposes
        }, 1000);
      } else {
        isCheckedIn.value = false; // Set checked out state
        isCheckedOut.value = true; // Mark as checked out
        clearInterval(workTime); // Stop the timer
      }
    };

    return {
      checkInTime,
      checkOutTime,
      remainingTime,
      breakTime,
      isCheckedIn,
      toggleCheckInOut,
      displayedWorkingHours,
      arcPath,
    };
  },
};
</script>

<style scoped>
.arc-container {
  position: relative;
  text-align: center;
}

.time-blocks {
  display: flex;
  justify-content: space-between;
  margin-top: -30px;
}

.block {
  text-align: center;
  width: 33%;
}

.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.alert {
  background-color: #fff3cd;
}

.btn-inverse {
  background-color: #4b49ac; /* Button color */
  border-color: rgba(0, 123, 255, 0);
  color: whitesmoke; /* Button text color */
}

.btn-inverse:hover {
  color: white; /* Color on hover */
  background-color: #007bff; /* Background color on hover */
}

.btn-inverse:focus,
.btn-inverse.focus {
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); /* Focus effect */
}

.btn-inverse:disabled,
.btn-inverse.disabled {
  color: #007bff; /* Color when disabled */
  background-color: transparent; /* Background when disabled */
}

.btn-inverse:active,
.btn-inverse.active,
.show > .btn-inverse.dropdown-toggle {
  color: white; /* Color when active */
  background-color: #007bff; /* Background color when active */
}

@media (max-width: 576px) {
  .alert {
    flex-direction: column;
    text-align: center;
  }
}
</style> -->


<template>
  <div class="container mt-4 form-card">
    <div class="card">
      <div class="card-body text-center">
        <div class="arc-container">
          <svg width="100%" height="150" viewBox="0 0 200 100">
            <!-- Background arc -->
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#e0e0e0"
              stroke-width="10"
            />
            <!-- Dynamic arc filling based on working hours -->
            <path
              :d="arcPath"
              fill="none"
              stroke="#4b49ac"
              stroke-width="10"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <div class="row mt-3">
          <!-- Check-in Block with box shadow -->
          <div class="col-4 text-center check-block">
            <h5>Check-In Time</h5>
            <p>{{ checkInTime }}</p>
            <button class="btn btn-primary" @click="handleCheckIn">
              Check-In
            </button>
          </div>

          <!-- Image Placeholder -->
          <div class="col-4 text-center">
            <img src="../../assets/images/Untitled_design-removebg-preview.png" alt="custom image" class="custom-image" />
          </div>

          <!-- Check-out Block with box shadow -->
          <div class="col-4 text-center check-block">
            <h5>Check-Out Time</h5>
            <p>{{ checkOutTime }}</p>
            <button class="btn btn-danger" @click="handleCheckOut">
              Check-Out
            </button>
          </div>
        </div>

        <!-- Working Hours Block below the check-in and check-out -->
        <div class="working-hours">
          <h5>Working Hours: {{ workingHours }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const checkInTime = ref("00:00");
    const checkOutTime = ref("00:00");
    const workingHours = ref("00:00"); // Display working hours
    const arcPath = ref(""); // SVG path for dynamic arc filling

    const handleCheckIn = () => {
      const now = new Date();
      const formattedTime = now.toTimeString().slice(0, 5);
      checkInTime.value = formattedTime;

      // Reset working hours at check-in
      workingHours.value = "00:00";

      // Update dynamic arc path
      updateArc(0); // Assuming 0% filled at check-in
    };

    const handleCheckOut = () => {
      const now = new Date();
      const formattedTime = now.toTimeString().slice(0, 5);
      checkOutTime.value = formattedTime;

      // Calculate and display working hours
      const checkInDate = new Date();
      const checkOutDate = new Date();

      checkInDate.setHours(...checkInTime.value.split(":").map(Number));
      checkOutDate.setHours(...checkOutTime.value.split(":").map(Number));

      const diff = checkOutDate - checkInDate;
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      workingHours.value = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;

      // Update dynamic arc path
      updateArc(100); // Assuming 100% filled after checkout
    };

    const updateArc = (percentage) => {
      const arcRadius = 80;
      const startX = 20;
      const endX = 180;

      // Calculate the endpoint based on percentage of arc filled
      const x = startX + ((endX - startX) * percentage) / 100;
      const largeArcFlag = percentage > 50 ? 1 : 0;

      arcPath.value = `M 20 80 A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 1 ${x} 80`;
    };

    return {
      checkInTime,
      checkOutTime,
      workingHours,
      handleCheckIn,
      handleCheckOut,
      arcPath,
    };
  },
};
</script>

<style scoped>
.arc-container {
  margin-bottom: 20px;
}

svg {
  margin-bottom: 20px;
}

.check-block {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Added shadow */
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
}

.custom-image {
  width: 80px;
  height: 80px;
  object-fit: contain; /* Adjust this to fit your image display needs */
}

.working-hours {
  margin-top: 20px;
}
</style>
