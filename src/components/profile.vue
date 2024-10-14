<template>
    <div class="mt-5 d-flex justify-content-center">
      <div class="card p-4 shadow-sm form-card">
        <h4>Edit Profile</h4>
        <form @submit.prevent="submitForm">
          <!-- Row 1: Name and Email -->
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" v-model="name" />
              <small v-if="nameError" class="text-danger">{{ nameError }}</small>
            </div>
            <div class="col-md-6 mb-3">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" v-model="email" />
              <small v-if="emailError" class="text-danger">{{ emailError }}</small>
            </div>
          </div>
  
          <!-- Row 2: Old Password and New Password -->
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="oldPassword">Old Password</label>
              <input type="password" class="form-control" id="oldPassword" v-model="oldPassword" />
              <small v-if="oldPasswordError" class="text-danger">{{ oldPasswordError }}</small>
            </div>
            <div class="col-md-6 mb-3">
              <label for="newPassword">New Password</label>
              <input type="password" class="form-control" id="newPassword" v-model="newPassword" />
              <small v-if="passwordError" class="text-danger">{{ passwordError }}</small>
            </div>
          </div>
  
          <!-- Row 3: Confirm Password -->
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="confirmPassword">Confirm Password</label>
              <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword" />
              <small v-if="confirmPasswordError" class="text-danger">{{ confirmPasswordError }}</small>
            </div>
          </div>
  
          <!-- Buttons -->
          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary btn">Submit</button>
            <button type="button" class="btn btn-light btn" @click="cancelForm">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const name = ref('');
      const email = ref('');
      const oldPassword = ref('');
      const newPassword = ref('');
      const confirmPassword = ref('');
  
      // Error messages
      const nameError = ref('');
      const emailError = ref('');
      const oldPasswordError = ref('');
      const passwordError = ref('');
      const confirmPasswordError = ref('');
  
      // Form submission with validation
      const submitForm = () => {
        let isValid = true;
  
        // Clear previous errors
        nameError.value = '';
        emailError.value = '';
        oldPasswordError.value = '';
        passwordError.value = '';
        confirmPasswordError.value = '';
  
        // Validate name
        if (!name.value) {
          nameError.value = 'Name is required';
          isValid = false;
        }
  
        // Validate email
        if (!email.value) {
          emailError.value = 'Email is required';
          isValid = false;
        }
  
        // Validate old password
        if (!oldPassword.value) {
          oldPasswordError.value = 'Old password is required';
          isValid = false;
        }
  
        // Validate new password
        if (!newPassword.value) {
          passwordError.value = 'New password is required';
          isValid = false;
        }
  
        // Validate confirm password
        if (!confirmPassword.value) {
          confirmPasswordError.value = 'Please confirm your password';
          isValid = false;
        } else if (newPassword.value !== confirmPassword.value) {
          confirmPasswordError.value = 'Passwords do not match';
          isValid = false;
        }
  
        // Submit if valid
        if (isValid) {
          console.log('Form submitted successfully');
        }
      };
  
      const cancelForm = () => {
        // Reset form fields
        name.value = '';
        email.value = '';
        oldPassword.value = '';
        newPassword.value = '';
        confirmPassword.value = '';
  
        // Clear error messages
        nameError.value = '';
        emailError.value = '';
        oldPasswordError.value = '';
        passwordError.value = '';
        confirmPasswordError.value = '';
      };
  
      return {
        name,
        email,
        oldPassword,
        newPassword,
        confirmPassword,
        submitForm,
        cancelForm,
        nameError,
        emailError,
        oldPasswordError,
        passwordError,
        confirmPasswordError,
      };
    },
  };
  </script>
  
  <style scoped>
  .form-card {
    border-radius: 15px;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  
  h4 {
    font-weight: bold;
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
  