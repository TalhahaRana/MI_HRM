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
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      searchTerm: '',           
      selectedDepartment: '',   
      selectedDesignation: '',  
    };
  },
  computed: {
    // Correct usage of mapGetters with namespaced module
    ...mapGetters('employee', ['allEmployees']),

    filteredEmployees() {
      return this.allEmployees.filter(employee => {
        const matchesName = employee.name.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesDepartment = this.selectedDepartment === '' || employee.department === this.selectedDepartment;
        const matchesDesignation = this.selectedDesignation === '' || employee.designation === this.selectedDesignation;
        return matchesName && matchesDepartment && matchesDesignation;
      });
    },

    departments() {
      return [...new Set(this.allEmployees.map(emp => emp.department))];
    },

    designations() {
      return [...new Set(this.allEmployees.map(emp => emp.designation))];
    },
  },
  methods: {
    ...mapActions('employee', ['fetchEmployees']),
  },
  mounted() {
    this.fetchEmployees(); // This will use static data for now
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
