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
              :disabled="isCheckedOut || isTomorrow"
            >
              <img src="../../assets/images/clock.svg" />
              {{ isCheckedIn ? "Check-out" : "Check-in" }}
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
            <p>{{ workingHours }}</p>
            <!-- Display working hours -->
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
    const today = new Date();
    const isTomorrow = ref(false);
    const workingHours = ref("00:00:00"); // Initialize with default value

    const formattedWorkTime = computed(() => {
      const hours = Math.floor(workTime.value / 3600);
      const minutes = Math.floor((workTime.value % 3600) / 60);
      const seconds = workTime.value % 60;
      return `${hours} Hrs : ${minutes} Min : ${seconds} Sec`;
    });

    const toggleCheckInOut = async () => {
      if (!isCheckedIn.value) {
        // Check-in
        await store.dispatch("employee/checkIn");
        isCheckedIn.value = true;

        // Start the timer
        timer.value = setInterval(() => {
          workTime.value += 1; // Increment the timer every second
        }, 1000);
      } else {
        // Check-out
        try {
          const response = await store.dispatch("employee/checkOut");
          isCheckedIn.value = false;
          isCheckedOut.value = true; // Set checked out state

          // Access working hours from the state
          workingHours.value =
            store.getters["employee/getWorkingHours"] || "00:00:00"; // Default to "00:00:00" if not available

          alert(response.message);
          // Stop the timer
          clearInterval(timer.value);
        } catch (error) {
          console.error("Check-out failed:", error);
          alert("Check-out failed. Please try again.");
        }
      }
    };

    return {
      formattedWorkTime,
      remainingTime: ref("2 Hrs 36 Min"),
      overtimeTime: ref("0 Hrs 00 Min"),
      breakTime: ref("1 Hrs 20 Min"),
      workingHours, // Return working hours
      isCheckedIn,
      toggleCheckInOut,
      isCheckedOut,
      isTomorrow,
    };
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.alert {
  background-color: #fff3cd;
}

.btn-inverse {
  background-color: #4b49ac;
  border-color: rgba(0, 123, 255, 0);
  color: whitesmoke;
}

.btn-inverse:hover {
  color: white;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-inverse:focus,
.btn-inverse.focus {
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
}

.btn-inverse:disabled,
.btn-inverse.disabled {
  color: #007bff;
  background-color: transparent;
}

.btn-inverse:active,
.btn-inverse.active,
.show > .btn-inverse.dropdown-toggle {
  color: white;
  background-color: #007bff;
  border-color: #007bff;
}

@media (max-width: 576px) {
  .alert {
    flex-direction: column;
    text-align: center;
  }
}
</style>
