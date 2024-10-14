<template>
    <div class="content">
      <div class="content__inner">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 m-auto">
              <form class="password-strength form-card p-4" @submit.prevent="handleSubmit">
                <h3 class="form__title text-center mb-4">Enter the Password</h3>
  
                <!-- Password Input -->
                <div class="form-group">
                  <label for="password-input">Password</label>
                  <div class="input-group">
                    <input
                      v-model="password.value"
                      :type="passwordVisible.value ? 'text' : 'password'"
                      class="password-strength__input form-control"
                      id="password-input"
                      aria-describedby="passwordHelp"
                      placeholder="Enter password"
                      @input="validatePassword"
                    />
                    <div class="input-group-append">
                      <button
                        type="button"
                        class="password-strength__visibility btn btn-outline-secondary"
                        @click="togglePasswordVisibility"
                      >
                        <span v-if="!passwordVisible.value">
                          <i class="fas fa-eye-slash"></i>
                        </span>
                        <span v-else>
                          <i class="fas fa-eye"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                  <small v-if="error.value" class="password-strength__error text-danger">
                    {{ errorMessage.value }}
                  </small>
                </div>
  
                <!-- Confirm Password Input -->
                <div class="form-group">
                  <label for="confirm-password-input">Confirm Password</label>
                  <input
                    v-model="confirmPassword.value"
                    :type="passwordVisible.value ? 'text' : 'password'"
                    class="password-strength__input form-control"
                    id="confirm-password-input"
                    placeholder="Confirm password"
                    @input="validateConfirmPassword"
                  />
                  <small v-if="passwordsDoNotMatch.value" class="password-strength__error text-danger">
                    Passwords do not match!
                  </small>
                  <small id="passwordHelp" class="form-text text-muted mt-2">
                    Add 9 characters or more, lowercase letters, uppercase letters, numbers, and symbols to make the
                    password really strong!
                  </small>
                </div>
  
                <!-- Password Strength Bar -->
                <div class="password-strength__bar-block progress mb-4">
                  <div
                    class="password-strength__bar progress-bar"
                    :class="strengthClass.value"
                    role="progressbar"
                    :style="{ width: strengthValue.value + '%' }"
                    :aria-valuenow="strengthValue.value"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {{ strengthLabel.value }}
                  </div>
                </div>
  
                <!-- Submit Button -->
                <button
                  type="submit"
                  class="password-strength__submit btn btn-success d-flex m-auto"
                  :disabled="!canSubmit.value"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "vuex";
  
  export default {
    setup() {
      const store = useStore(); // Vuex store access
      const password = ref("");
      const confirmPassword = ref("");
      const passwordVisible = ref(false);
      const error = ref(false);
      const passwordsDoNotMatch = ref(false);
      const strengthLabel = ref("");
      const strengthValue = ref(0);
      const token = ref("");
      const email = ref("");
  
      onMounted(() => {
        // Extract token and email from the URL query parameters
        const queryParams = new URLSearchParams(window.location.search);
        token.value = queryParams.get("token");
        email.value = queryParams.get("email");
        console.log("Token:", token.value);
        console.log("Email:", email.value);
      });
  
      const canSubmit = computed(() => strengthValue.value >= 50 && !passwordsDoNotMatch.value);
  
      const strengthClass = computed(() => {
        if (strengthValue.value === 25) return "bg-danger";
        if (strengthValue.value === 50) return "bg-warning";
        if (strengthValue.value === 75) return "bg-info";
        if (strengthValue.value === 100) return "bg-success";
        return "bg-danger";
      });
  
      const errorMessage = computed(() => (error.value ? "This symbol is not allowed!" : ""));
  
      const togglePasswordVisibility = () => {
        passwordVisible.value = !passwordVisible.value;
      };
  
      const validatePassword = () => {
        const errorSymbols = /\s/g;
        error.value = errorSymbols.test(password.value);
  
        if (!error.value) {
          const strength = getPasswordStrength(password.value);
          setStrengthBar(strength);
        } else {
          strengthValue.value = 0;
          strengthLabel.value = "";
        }
  
        validateConfirmPassword();
      };
  
      const validateConfirmPassword = () => {
        passwordsDoNotMatch.value =
          password.value !== confirmPassword.value && confirmPassword.value !== "";
      };
  
      const getPasswordStrength = (password) => {
        const moderate =
          /(?=.*[A-Z])(?=.*[a-z]).{5,}|(?=.*[\d])(?=.*[a-z]).{5,}|(?=.*[\d])(?=.*[A-Z])(?=.*[a-z]).{5,}/g;
        const strong =
          /(?=.*[A-Z])(?=.*[a-z])(?=.*[\d]).{7,}|(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=.*[\d]).{7,}/g;
        const extraStrong =
          /(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]).{9,}/g;
  
        if (extraStrong.test(password)) {
          return "extra";
        } else if (strong.test(password)) {
          return "strong";
        } else if (moderate.test(password)) {
          return "moderate";
        } else if (password.length > 0) {
          return "weak";
        }
        return "none";
      };
  
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
  
      const handleSubmit = async () => {
        if (!passwordsDoNotMatch.value) {
          const passwordData = {
            email: email.value,
            token: token.value,
            password: password.value,
            password_confirmation:confirmPassword.value
          };
  
          try {
            await store.dispatch("passwordSetup", passwordData);
            alert("Password set successfully!");
          } catch (error) {
            alert("Failed to set password. Please try again.");
          }
        }
      };
  
      return {
        password,
        confirmPassword,
        passwordVisible,
        error,
        passwordsDoNotMatch,
        strengthLabel,
        strengthValue,
        canSubmit,
        strengthClass,
        errorMessage,
        togglePasswordVisibility,
        validatePassword,
        validateConfirmPassword,
        handleSubmit,
      };
    },
  };
  </script>
  
  <style scoped>
  .password-strength {
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
      0 2px 4px -1px rgba(0, 0, 0, 0.3);
  }
  </style>
  