<template>
    <div class="container mt-5 d-flex justify-content-center">
      <div class="card p-4 shadow-sm form-card">
        <h4 class="mb-3">Add Employee</h4>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control form-control"
              id="name"
              v-model="newEmployee.name"
              placeholder="Name"
              required
            />
          </div>
  
          <div class="mb-3">
            <label for="department" class="form-label">Department</label>
            <input
              type="text"
              class="form-control form-control"
              id="department"
              v-model="newEmployee.department"
              placeholder="Department"
              required
            />
          </div>
  
          <!-- Designation -->
          <div class="mb-3">
            <label for="designation" class="form-label">Designation</label>
            <input
              type="text"
              class="form-control form-control"
              id="designation"
              v-model="newEmployee.designation"
              placeholder="Designation"
              required
            />
          </div>
  
          <!-- Optional Checkbox for confirmation -->
          <div class="form-check mb-4">
            <input class="form-check-input" type="checkbox" id="confirm" />
            <label class="form-check-label" for="confirm">
              Confirm the information is correct
            </label>
          </div>
  
          <!-- Buttons -->
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary btn">
              Submit
            </button>
            <button type="button" class="btn btn-light btn" @click="cancelForm">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        newEmployee: {
          name: '',
          department: '',
          designation: '',
        },
      };
    },
    methods: {
      ...mapActions('employee', ['addEmployee']),
      submitForm() {
        this.addEmployee(this.newEmployee)
          .then(() => {
            alert('Employee added successfully!');
            this.$router.push('/admin/all-employees');
          })
          .catch((error) => {
            console.error(error);
          });
      },
      cancelForm() {
        this.$router.push('/admin/all-employees');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Style to mimic the uploaded design */
  .form-card {
    border-radius: 15px;
    background-color: #f9f9fc;
    
    width: 100%;
  }
  
  h4 {
    font-weight: bold;
  }
  
  .text-muted {
    font-size: 14px;
  }
  
  .form-control-lg {
    border-radius: 10px;
  }
  
  .btn-primary {
    background-color: #5a67d8;
    border-color: #5a67d8;
    border-radius: 20px;
    padding-left: 30px;
    padding-right: 30px;
  }
  
  .btn-primary:hover {
    background-color: #434f9e;
    border-color: #434f9e;
  }
  
  .btn-light {
    background-color: #f1f1f1;
    border-color: #f1f1f1;
    border-radius: 20px;
    padding-left: 30px;
    padding-right: 30px;
  }
  
  .btn-light:hover {
    background-color: #e0e0e0;
  }
  
  .card {
    border: none;
    padding: 2rem;
  }
  </style>
  