<template>
    <div class="container mt-5  form-card">
      <h3 class="mb-4">Department Management</h3>
  
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="departmentName">Department Name</label>
          <input
            type="text"
            class="form-control"
            id="departmentName"
            v-model="departmentName"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">
          {{ isEditing ? 'Update Department' : 'Add Department' }}
        </button>
        <button v-if="isEditing" type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
      </form>
  
      <!-- Department Table -->
      <table class="table table-bordered table-striped mt-4">
        <thead class="thead-light">
          <tr>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="department in departments" :key="department.id">
            <td>{{ department.name }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editDepartment(department)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteDepartment(department.id)">Delete</button>
            </td>
          </tr>
          <tr v-if="departments.length === 0">
            <td colspan="2" class="text-center">No departments found</td>
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
        departmentName: '',
        isEditing: false,
        currentDepartmentId: null,
      };
    },
    computed: {
      ...mapGetters('employee', ['departments']), // Adjust according to your Vuex store
    },
    methods: {
      ...mapActions('employee', ['addDepartment', 'updateDepartment', 'deleteDepartment']), // Adjust according to your Vuex store
  
      submitForm() {
        if (this.isEditing) {
          this.updateDepartment({ id: this.currentDepartmentId, name: this.departmentName });
        } else {
          this.addDepartment({ name: this.departmentName });
        }
        this.resetForm();
      },
  
      editDepartment(department) {
        this.departmentName = department.name;
        this.isEditing = true;
        this.currentDepartmentId = department.id;
      },
  
      deleteDepartment(departmentId) {
        if (confirm('Are you sure you want to delete this department?')) {
          this.deleteDepartment(departmentId);
        }
      },
  
      cancelEdit() {
        this.resetForm();
      },
  
      resetForm() {
        this.departmentName = '';
        this.isEditing = false;
        this.currentDepartmentId = null;
      },
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
  