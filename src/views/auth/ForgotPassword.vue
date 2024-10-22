<template>
    <div class="container">
    <div class="password-container form-card">
      <form @submit.prevent="handleSubmit">
        <h3 class="text-center">Set Your Password</h3>
  
        <!-- Password Input -->
        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-group">
            <input
              :type="passwordVisible ? 'text' : 'password'"
              v-model="password"
              class="form-control"
              id="password"
              placeholder="Enter password"
              @input="validatePassword"
            />
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="togglePasswordVisibility"
            >
              <span v-if="passwordVisible"><i class="fas fa-eye"></i></span>
              <span v-else><i class="fas fa-eye-slash"></i></span>
            </button>
          </div>
          <small class="text-danger" v-if="errorMessage">{{ errorMessage }}</small>
        </div>
  
        <!-- Confirm Password Input -->
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            :type="passwordVisible ? 'text' : 'password'"
            v-model="confirmPassword"
            class="form-control"
            id="confirm-password"
            placeholder="Confirm password"
            @input="validateConfirmPassword"
          />
          <small class="text-danger" v-if="passwordsDoNotMatch">Passwords do not match!</small>
        </div>
  
        <!-- Password Strength Bar -->
        <div class="progress mb-3 mt-2">
          <div
            class="progress-bar"
            :class="strengthClass"
            role="progressbar"
            :style="{ width: strengthValue + '%' }"
          >
            {{ strengthLabel }}
          </div>
        </div>
  
        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary" :disabled="!canSubmit">Submit</button>
      </form>
    </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "vuex";
  
  export default {
    setup() {
      const store = useStore();
      const password = ref("");
      const confirmPassword = ref("");
      const passwordVisible = ref(false);
      const errorMessage = ref("");
      const passwordsDoNotMatch = ref(false);
      const strengthLabel = ref("");
      const strengthValue = ref(0);
      const email = ref("");
      const token = ref("");
  
      // Get token and email from query parameters
      onMounted(() => {
        const queryParams = new URLSearchParams(window.location.search);
        token.value = queryParams.get("token");
        email.value = queryParams.get("email");
        console.log("TOken: ",token.value, "email",email.value);
      });
  
      // Toggle password visibility
      const togglePasswordVisibility = () => {
        passwordVisible.value = !passwordVisible.value;
      };
  
      // Validate the password and update the strength bar
      const validatePassword = () => {
        const strength = getPasswordStrength(password.value);
        setStrengthBar(strength);
        passwordsDoNotMatch.value = password.value !== confirmPassword.value;
      };
  
      // Handle form submission
      const handleSubmit = async () => {
        console.log("Submit button clicked");
        validateConfirmPassword(); // Ensure passwords match before submitting
        if (canSubmit.value) {
          const passwordData = {
            email: email.value,
            token: token.value,
            password: password.value,
            password_confirmation: confirmPassword.value,
          };
          console.log("password Data",passwordData);
  
          try {
            await store.dispatch("auth/passwordReset", passwordData);
            alert("Password set successfully!");
          } catch (error) {
            // alert("Failed to set password. Please try again.");
          }
        }
      };
  
      // Validate the confirm password input
      const validateConfirmPassword = () => {
        passwordsDoNotMatch.value = password.value !== confirmPassword.value;
      };
  
      // Get password strength
      const getPasswordStrength = (password) => {
        if (
          password.length >= 9 &&
          /[A-Z]/.test(password) &&
          /\d/.test(password) &&
          /\W/.test(password)
        ) {
          return "extra";
        } else if (password.length >= 7 && /[A-Z]/.test(password) && /\d/.test(password)) {
          return "strong";
        } else if (password.length >= 5 && /[a-z]/.test(password)) {
          return "moderate";
        } else {
          return "weak";
        }
      };
  
      // Set the strength bar based on password strength
      const setStrengthBar = (strength) => {
        switch (strength) {
          case "weak":
            strengthValue.value = 25;
            strengthLabel.value = "Weak";
            break;
          case "moderate":
            strengthValue.value = 50;
            strengthLabel.value = "Moderate";
            break;
          case "strong":
            strengthValue.value = 75;
            strengthLabel.value = "Strong";
            break;
          case "extra":
            strengthValue.value = 100;
            strengthLabel.value = "Extra Strong";
            break;
          default:
            strengthValue.value = 0;
            strengthLabel.value = "";
        }
      };
  
      // Computed property to check if the form can be submitted
      const canSubmit = computed(() => strengthValue.value >= 50 && !passwordsDoNotMatch.value);
  
      return {
        password,
        confirmPassword,
        passwordVisible,
        errorMessage,
        passwordsDoNotMatch,
        strengthLabel,
        strengthValue,
        canSubmit,
        togglePasswordVisibility,
        validatePassword,
        validateConfirmPassword,
        handleSubmit,
      };
    },
  };
  </script>
  
  <style scoped>
  .password-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    margin-top: 15%;
    
  }
  .container{
    height: 100vh;
  }
  
  .input-group {
    display: flex;
    align-items: center;
  }
  
  .progress-bar {
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
   
  }
  
  .bg-danger {
    background-color: red;
  }
  
  .bg-warning {
    background-color: yellow;
  }
  
  .bg-info {
    background-color: lightblue;
  }
  
  .bg-success {
    background-color: green;
  }
  </style>
  