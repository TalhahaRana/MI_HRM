<template>
  <div class="container mt-5">
    <h3 class="mb-4">All Employees</h3>

    <div class="row mb-4">
      <!-- Search by Name -->
      <div class="col-md-4">
        <input
          type="text"
          class="form-control"
          v-model="searchTerm"
          placeholder="Search by Name"
        />
      </div>

      <!-- Filter by Department -->
      <div class="col-md-4">
        <select class="form-control" v-model="selectedDepartment">
          <option value="">All Departments</option>
          <option v-for="department in departments" :key="department" :value="department">
            {{ department }}
          </option>
        </select>
      </div>

      <!-- Filter by Designation -->
      <div class="col-md-4">
        <select class="form-control" v-model="selectedDesignation">
          <option value="">All Designations</option>
          <option v-for="designation in designations" :key="designation" :value="designation">
            {{ designation }}
          </option>
        </select>
      </div>
    </div>

    <!-- Employee Table -->
    <table class="table table-bordered table-striped">
      <thead class="thead-light">
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Designation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in filteredEmployees" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.department }}</td>
          <td>{{ employee.designation }}</td>
        </tr>
        <tr v-if="filteredEmployees.length === 0">
          <td colspan="3" class="text-center">No employees found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    // Static dummy employee data
    const employees = ref([
      { id: 1, name: 'John Doe', department: 'HR', designation: 'Manager' },
      { id: 2, name: 'Jane Smith', department: 'Finance', designation: 'Accountant' },
      { id: 3, name: 'Alice Johnson', department: 'IT', designation: 'Developer' },
      { id: 4, name: 'Bob Brown', department: 'HR', designation: 'Assistant' },
      { id: 5, name: 'Charlie Black', department: 'Finance', designation: 'Analyst' },
    ]);

    const searchTerm = ref('');            // Search by employee name
    const selectedDepartment = ref('');    // Filter by department
    const selectedDesignation = ref('');   // Filter by designation

    // Filter employees based on search and selected filters
    const filteredEmployees = computed(() => {
      return employees.value.filter((employee) => {
        const matchesName = employee.name.toLowerCase().includes(searchTerm.value.toLowerCase());
        const matchesDepartment = !selectedDepartment.value || employee.department === selectedDepartment.value;
        const matchesDesignation = !selectedDesignation.value || employee.designation === selectedDesignation.value;
        return matchesName && matchesDepartment && matchesDesignation;
      });
    });

    // Get unique departments
    const departments = computed(() => {
      return [...new Set(employees.value.map(emp => emp.department))];
    });

    // Get unique designations
    const designations = computed(() => {
      return [...new Set(employees.value.map(emp => emp.designation))];
    });

    // Simulate fetching employees (in this case, just using static data)
    onMounted(() => {
      // In a real-world scenario, you'd fetch employee data from an API here
    });

    return {
      searchTerm,
      selectedDepartment,
      selectedDesignation,
      filteredEmployees,
      departments,
      designations,
    };
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
thead {
  background-color: #f8f9fa;
}
</style>
