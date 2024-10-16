<template>
  <div class="container p-4 form-card">
    <h3 class="mb-4">Manage Employees</h3>

    <!-- Filters -->
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
          <option
            v-for="department in departments"
            :key="department.id"
            :value="department.id"
          >
            {{ department.name }}
          </option>
        </select>
      </div>

      <!-- Filter by Role (HR/Employee) -->
      <div class="col-md-4">
        <select class="form-control" v-model="selectedRole">
          <option value="">All Roles</option>
          <option value="HR">HR</option>
          <option value="Employee">Employee</option>
        </select>
      </div>
    </div>

    <!-- Employee Table -->
    <table class="table table-hover">
      <thead class="thead-light">
        <tr>
          <!-- <th>Id</th> -->
          <th>User ID</th>
          <th>Name</th>
          <th>Designation</th>
          <th>Department</th>
          <th>Date of Joining</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in filteredEmployees" :key="employee.id">
          <!-- <td>{{ employee.id }}</td> -->
          <td>{{ employee.user_id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.position || 'N/A' }}</td>
          <td>{{ getDepartmentName(employee.department_id) }}</td>
          <td>{{ employee.date_of_joining || 'N/A' }}</td>
          <td>{{ employee.role === 'HR' ? 'HR' : 'Employee' }}</td>
          <td class="d-flex justify-content-around">
            <button
              class="btn btn-warning btn-sm"
              @click="openEditModal(employee)"
            >
              Edit
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="deleteEmployee(employee.user_id)"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr v-if="filteredEmployees.length === 0">
          <td colspan="8" class="text-center">No employees found</td>
        </tr>
      </tbody>
    </table>

    <!-- Update Modal -->
    <div
      v-if="isModalOpen"
      class="modal"
      tabindex="-1"
      role="dialog"
      :class="{ open: isModalOpen }"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header form-card">
            <h5 class="modal-title">Update Employee</h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateEmployee">
              <div class="form-group">
                <label for="employeeName">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="employeeName"
                  v-model="selectedEmployee.name"
                  required
                  readonly
                />
              </div>
              <div class="form-group">
                <label for="employeePosition">Position</label>
                <input
                  type="text"
                  class="form-control"
                  id="employeePosition"
                  v-model="selectedEmployee.position"
                  required
                />
              </div>
              <div class="form-group">
                <label for="employeeDepartment">Department</label>
                <select
                  class="form-control"
                  id="employeeDepartment"
                  v-model="selectedEmployee.department_id"
                  required
                >
                  <option
                    v-for="department in departments"
                    :key="department.id"
                    :value="department.id"
                  >
                    {{ department.name }}
                  </option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Update</button>
              <button type="button" class="btn btn-secondary" @click="closeModal">
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

// Setup store
const store = useStore();
const searchTerm = ref('');
const selectedDepartment = ref('');
const selectedRole = ref(''); // Filter for HR/Employee
const isModalOpen = ref(false); // Modal state
const selectedEmployee = ref({}); // Employee to edit

// Fetch employees and departments when the component is mounted
onMounted(async () => {
  await store.dispatch('employee/fetchEmployees'); // Fetch employees from employee store
  await store.dispatch('department/fetchDepartmentsbyData'); // Fetch departments from department store
});

// Get employees and departments from Vuex store
const employees = computed(() => store.getters['employee/allEmployees'] || []);
const departments = computed(() => store.getters['department/allDepartments'] || []); // Access department module

// Map employee department_id to department name
const getDepartmentName = (departmentId) => {
  const department = departments.value.find(dep => dep.id === departmentId);
  return department ? department.name : 'N/A';
};

// Filter employees based on search term, department, and role (HR or Employee)
const filteredEmployees = computed(() => {
  return employees.value
    .filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.value.toLowerCase());
      const matchesDepartment = !selectedDepartment.value || employee.department_id == selectedDepartment.value;
      const matchesRole = !selectedRole.value || (employee.role === 'HR' ? 'HR' : 'Employee') === selectedRole.value;
      return matchesSearch && matchesDepartment && matchesRole;
    });
});

// Function to delete an employee
const deleteEmployee = async (user_id) => {
  const confirmed = confirm('Are you sure you want to delete this employee?');
  if (confirmed) {
    await store.dispatch('employee/deleteEmployee', user_id);
    alert('Employee deleted successfully!');
  }
};

// Function to open the edit modal
const openEditModal = (employee) => {
  selectedEmployee.value = { ...employee }; // Populate the modal with selected employee data
  isModalOpen.value = true; // Open modal
};

// Function to close the modal
const closeModal = () => {
  isModalOpen.value = false; // Close modal
};

// Function to update employee details
const updateEmployee = async () => {
  const updatedData = {
    department_id: selectedEmployee.value.department_id,
    position: selectedEmployee.value.position, // Only update position
  };
  await store.dispatch('employee/updateEmployee', { id: selectedEmployee.value.id, updatedData });
  alert('Employee updated successfully!'); // Alert after successful update
  closeModal(); // Close the modal
};
</script>



<style scoped>
.form-card {
  .modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}




.modal .modal-dialog {
  transition: transform 0.3s ease; /* Transition for dialog */
  transform: translateY(-100px);
  top: 30%; /* Move up before entering */
}

  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  vertical-align: middle;
}
</style>