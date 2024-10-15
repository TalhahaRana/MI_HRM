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
            <h5>workingHours</h5>
            <p>{{ workingHours }}</p>
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
import { ref, computed, onMounted } from "vue"; // Import onMounted
import { useStore } from "vuex"; // Import the Vuex store

export default {
  setup() {
    const store = useStore(); // Initialize the store
    const isCheckedIn = ref(false); // Track check-in/out state
    const isCheckedOut = ref(false); // Track if checked out
    const workTime = ref(0); // Time in seconds
    const timer = ref(null); // Timer reference
    const today = new Date(); // Current date
    const isTomorrow = ref(false); // Check if it's the next day

    // Computed property for formatted work time
    const formattedWorkTime = computed(() => {
      const hours = Math.floor(workTime.value / 3600);
      const minutes = Math.floor((workTime.value % 3600) / 60);
      const seconds = workTime.value % 60;
      return `${hours} Hrs : ${minutes} Min : ${seconds} Sec`;
    });

    // Fetch working hours from the store
    const workingHours = computed(
      () => store.getters["employee/getWorkingHours"]
    );

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
        await store.dispatch("employee/checkOut");
        isCheckedIn.value = false;
        isCheckedOut.value = true; // Set checked out state

        // Stop the timer
        clearInterval(timer.value);
      }
    };

    // Fetch working hours when the component is mounted
    onMounted(async () => {
      await store.dispatch("employee/fetchWorkingHours"); // Fetch working hours from Vuex
      const workingHoursData = store.getters["employee/getWorkingHours"];

      // Check if the current date is tomorrow
      const endDate = new Date(workingHoursData.end_date);
      isTomorrow.value = today.toDateString() === endDate.toDateString();
    });

    return {
      formattedWorkTime,
      remainingTime: ref("2 Hrs 36 Min"), // Placeholder, you can update this as needed
      overtimeTime: ref("0 Hrs 00 Min"), // Placeholder
      breakTime: ref("1 Hrs 20 Min"), // Placeholder
      isCheckedIn,
      toggleCheckInOut,
      workingHours,
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
  background-color: #4b49ac; /* Example color */
  border-color: rgba(0, 123, 255, 0);
  color: whitesmoke; /* Example color */
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
