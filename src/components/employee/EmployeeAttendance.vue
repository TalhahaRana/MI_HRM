<template>
  <div class="attendance-card card shadow-sm ms-2 mt-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title">Attendance & Leaves</h5>
      </div>
      <div class="row leave-summary">
        <div class="col-4 text-center">
          <h4 class="text-warning">{{ totalLeaves }}</h4>
          <p>Total Leaves</p>
        </div>
        <div class="col-4 text-center">
          <h4 class="text-danger">{{ leavesTaken }}</h4>
          <p>Leaves Taken</p>
        </div>
        <div class="col-4 text-center">
          <h4 class="text-success">{{ leavesAbsent }}</h4>
          <p>Leaves Absent</p>
        </div>
        <div class="col-4 text-center">
          <h4 class="text-info">{{ pendingApproval }}</h4>
          <p>Pending Approval</p>
        </div>
        <div class="col-4 text-center">
          <h4 class="text-primary">{{ workingDays }}</h4>
          <p>Working Days</p>
        </div>
        <div class="col-4 text-center">
          <h4 class="text-danger">{{ lossOfPay }}</h4>
          <p>Loss of Pay</p>
        </div>
      </div>
      <div class="mt-3 apply-leave text-center">
        <a href="#" class="apply-leave-link"
          >Apply Leave <i class="bi bi-arrow-right-circle"></i
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalLeaves: 9,
      leavesTaken: 5.5,
      leavesAbsent: 4,
      pendingApproval: 0,
      workingDays: 214,
      lossOfPay: 2,
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
