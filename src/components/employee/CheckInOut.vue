<template>
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
</style>
