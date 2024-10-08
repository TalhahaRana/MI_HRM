<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-body">
        <div
          class="alert d-flex justify-content-between align-items-center"
          style="background-color: whitesmoke"
        >
          <div>
            <h4 class="mb-0">Work Time</h4>
            <p class="h5 mb-0 text-dark">{{ workTime }}</p>
          </div>
          <div>
            <button
              class="btn btn-inverse gap-2 d-flex align-items-center justify-content-center"
              @click="toggleCheckInOut"
            >
              <img src="../../assets/images/clock.svg" />
              {{ isCheckedIn ? 'Check-out' : 'Check-in' }}
            </button>
          </div>
        </div>
        <div class="row mt-3 text-center">
          <div class="col">
            <h5>Remaining</h5>
            <p>{{ remainingTime }}</p>
          </div>
          <div class="col">
            <h5>Overtime</h5>
            <p>{{ overtimeTime }}</p>
          </div>
          <div class="col">
            <h5>Break</h5>
            <p>{{ breakTime }}</p>
          </div>
        </div>
      </div>
      <div class="card-footer text-start">
        <div class="d-flex d-inline-flex align-items-center p-2 gap-2">
          <a href="#" class="link-primary text-dark text-decoration-none">View Attendance</a>
          <img src="../../assets/images/arrow-right-circle.svg" alt="arrow-right-circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const selectedDate = ref("Today");
    const workTime = ref("6 Hrs : 54 Min");
    const remainingTime = ref("2 Hrs 36 Min");
    const overtimeTime = ref("0 Hrs 00 Min");
    const breakTime = ref("1 Hrs 20 Min");
    const isCheckedIn = ref(false); // Track check-in/out state

    const toggleCheckInOut = () => {
      isCheckedIn.value = !isCheckedIn.value; // Toggle the check-in/out state
    };

    return {
      selectedDate,
      workTime,
      remainingTime,
      overtimeTime,
      breakTime,
      isCheckedIn,
      toggleCheckInOut,
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