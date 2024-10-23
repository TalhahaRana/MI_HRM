<template>
  <div class="container form-card">
    <div class="card">
      <div class="card-body">
        <div class="alert d-flex justify-content-between align-items-center">
          <div>
            <h4 class="mb-0 text-light">Work Time</h4>
            <p class="h5 mb-0 text-light">{{ formattedWorkTime }}</p>
          </div>
          <div>
            <button class="btn btn-inverse gap-2 d-flex align-items-center justify-content-center"
              @click="toggleCheckInOut" :disabled="isCheckedOut || isTomorrow || isLoading">
              <span v-if="isLoading" class="spinner"></span>
              <span class="gap-2 d-flex align-items-center justify-content-center" v-else>
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

      <div class="card-footer text-start grad">
        <div class="d-flex d-inline-flex align-items-center p-2 gap-2">
          <a href="#" class="link-primary text-light text-decoration-none">View Attendance</a>
          <img src="../../assets/images/arrow-right-circle.svg" alt="arrow-right-circle" />
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
  width: 20px;
  /* Adjust the size of the spinner */
  height: 20px;
  /* Adjust the size of the spinner */
  animation: spin 1s linear infinite;
  margin-right: 8px;
  /* Space between spinner and text */
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
  position: relative;
  padding: 15px;
  border-radius: 10px;
  z-index: 1;
}

.alert::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  z-index: -1;
  border-radius: 10px; /* Match the border radius */
  background: linear-gradient(45deg, rgb(34, 51, 102), rgb(68, 102, 153), rgb(102, 153, 204), rgb(136, 204, 238));
}

/* .alert {
  background-color: #fff3cd;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid transparent; 
  background-image: linear-gradient(white, white), 
                    linear-gradient(45deg, rgb(34, 51, 102), rgb(68, 102, 153), rgb(102, 153, 204), rgb(136, 204, 238));
  background-origin: border-box;
  background-clip: padding-box, border-box;
} */




.btn-inverse {
  /* background-color: #ffffff; */
  /* Button color */
  border-color: rgb(255, 255, 255);
  color: #e8e8e8;
  /* Button text color */
}

.btn-inverse:hover {
  color: rgb(0, 0, 0);
  /* Color on hover */
  background-color: #ffffff;
  /* Background color on hover */
  border-color: #007bff;
  /* Border color on hover */
}

.btn-inverse:focus,
.btn-inverse.focus {
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  /* Focus effect */
}

.btn-inverse:disabled,
.btn-inverse.disabled {
  color: #007bff;
  /* Color when disabled */
  background-color: transparent;
  /* Background when disabled */
}

.btn-inverse:active,
.btn-inverse.active,
.show>.btn-inverse.dropdown-toggle {
  color: white;
  /* Color when active */
  background-color: #007bff;
  /* Background color when active */
  border-color: #007bff;
  /* Border color when active */
}

@media (max-width: 576px) {
  .alert {
    flex-direction: column;
    text-align: center;
  }
}
</style>
