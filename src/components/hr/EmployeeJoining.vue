<template>
    <div class="container mt-5 py-5">
      <h3 class="text-black">Employee Joining Status</h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item fw-bolder"><a href="#"><strong>Dashboard</strong></a></li>
          <li class="breadcrumb-item active fw-bolder" aria-current="page"><strong>Employee Joining</strong></li>
        </ol>
      </nav>

      <!-- Filters -->
      <div class="row mb-3">
        <div class="col">
          <input v-model="filters.name" type="text" class="form-control py-3" placeholder="Employee Name" />
        </div>
        <div class="col">
          <select v-model="filters.status" class="form-select py-3">
            <option disabled value="">Select Probation Status</option>
            <option value="probation">On Probation</option>
            <option value="complete">Probation Complete</option>
          </select>
        </div>
        <div class="col">
          <button @click="search" class="btn text-light w-100 py-3">Search</button>
        </div>
      </div>

      <!-- Probation Period Employees Table -->
      <h4 class="mt-4">Employees in Probation Period</h4>
      <div class="table-responsive">
        <table class="table table-striped text-center">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Designation</th>
              <th>Join Date</th>
              <th>Days Present</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in probationEmployees" :key="employee.id">
              <td>{{ employee.name }}</td>
              <td>{{ employee.designation }}</td>
              <td>{{ employee.joinDate }}</td>
              <td>{{ employee.daysPresent }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Probation Complete Employees Table -->
      <h4 class="mt-4">Employees with Completed Probation</h4>
      <div class="table-responsive">
        <table class="table table-striped text-center">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Designation</th>
              <th>Join Date</th>
              <th>Days Present</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in completeEmployees" :key="employee.id">
              <td>{{ employee.name }}</td>
              <td>{{ employee.designation }}</td>
              <td>{{ employee.joinDate }}</td>
              <td>{{ employee.daysPresent }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, computed } from "vue";

  // Filters for searching
  const filters = ref({
    name: "",
    status: "", // Status filter for probation and completed employees
  });

  // Sample employee data
  const allEmployees = ref([
    { id: 1, name: "John Doe", designation: "Software Engineer", joinDate: "2024-01-01", daysPresent: 12, probation: true },
    { id: 2, name: "Jane Smith", designation: "UI/UX Designer", joinDate: "2023-06-15", daysPresent: 50, probation: false },
    { id: 3, name: "Richard Miles", designation: "Project Manager", joinDate: "2024-03-10", daysPresent: 20, probation: true },
    // Add more employees
  ]);

  // Filtering employees based on probation status
  const probationEmployees = computed(() => {
    return allEmployees.value.filter((employee) => employee.probation);
  });

  const completeEmployees = computed(() => {
    return allEmployees.value.filter((employee) => !employee.probation);
  });

  // Search function (to be extended with actual filtering logic)
  const search = () => {
    console.log("Search triggered with filters:", filters.value);
    // Extend with actual logic to filter based on name, status
  };
  </script>

  <style scoped>
  .table th, .table td {
    padding: 12px;
  }
  .btn{
    background-color: var(--basic-button);
  }
  </style>
