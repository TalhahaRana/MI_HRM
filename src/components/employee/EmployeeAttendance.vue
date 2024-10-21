<template>
  <div class="attendance-card card shadow-sm ms-2 mt-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title">Attendance & Leaves</h5>
      </div>
      <div class="row leave-summary">
        <div class="col-4 text-center">
          <h4 class="text-warning">{{ attendanceCounts.present }}</h4>
          <p>Total Present</p>
        </div>
        <div class="col-4 text-center">
          <h4 class="text-danger">{{ attendanceCounts.absent }}</h4>
          <p>Total Absent</p>
        </div>
        <div class="col-4 text-center">
          <h4 class="text-success">{{ attendanceCounts.onleave }}</h4>
          <p>Leaves</p>
        </div>
        <!-- Include other fields here as needed -->
      </div>
      <div class="mt-3 apply-leave text-center">
        <a href="#" class="apply-leave-link">
          Apply Leave <i class="bi bi-arrow-right-circle"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("employee/fetchEmployeeAttendanceCounts"); // Fetch attendance counts on mount
    });

    const attendanceCounts = computed(
      () => store.getters["employee/attendanceCounts"]
    );

    return {
      attendanceCounts,
    };
  },
};
</script>

<style scoped>
.attendance-card {
  background-color: #ffff;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 611px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
}

.year-select {
  width: 80px;
}

.leave-summary {
  margin-top: 10px;
}

.leave-summary .col-4 {
  margin-bottom: 15px;
}

.leave-summary h4 {
  font-size: 24px;
  margin: 0;
}

.leave-summary p {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.apply-leave {
  border-top: 1px solid #e0e0e0;
  padding-top: 10px;
}

.apply-leave-link {
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
}

.apply-leave-link i {
  font-size: 16px;
  margin-left: 5px;
}
</style>
