<template>
    <div class="containerr justify-content-center align-items-center d-grid">
        <div class="d-flex justify-content-center">
            <img src="../assets/images/auth.gif" alt="">
        </div>
        <div class="d-flex justify-content-center">
            <div class="card p-4 shadow-lg">
              <!-- Header -->
              <h3 class="text-center mb-3">Two-Factor Authentication</h3>
              <p class="text-muted text-center">
                Enter the 6-digit code sent to your email or phone.
              </p>
        
              <!-- Input for 2FA Code -->
              <form @submit.prevent="verifyCode">
                <div class="mb-3">
                  <label for="authCode" class="form-label">Authentication Code</label>
                  <input
                    type="text"
                    class="form-control"
                    id="authCode"
                    v-model="authCode"
                    maxlength="6"
                    placeholder="Enter 6-digit code"
                    required
                  />
                </div>
        
                <!-- Submit Button -->
                <div class="d-grid mb-3">
                  <button type="submit" class="btn btn-primary">
                    Verify
                  </button>
                </div>          
              </form>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const authCode = ref('');
  
      // Function to verify the 2FA code
      const verifyCode = () => {
        if (authCode.value.length === 6) {
          console.log('2FA code verified:', authCode.value);
          // Add your verification logic here
        } else {
          console.log('Invalid code length');
        }
      };
  
      // Function to resend the 2FA code
      const resendCode = () => {
        console.log('2FA code resent');
        // Add your resend logic here
      };
  
      return {
        authCode,
        verifyCode,
        resendCode,
      };
    },
  };
  </script>
  
  <style scoped>
  .containerr {
    background-color: #f8f9fa;
  }
  img{
    width: 40%;
    /* position: relative */
    margin-bottom: -44px;
  }
  .card {
    background-color: white;
    border-radius: 10px;
  }
  
  .auth-link {
    color: #007bff;
  }
  
  .auth-link:hover {
    text-decoration: underline;
  }
  .shadow-lg{
    /* max-width: 400px;  */
    width: 100%;
    /* position: absolute; */
  }
@media screen and (max-width: 768px) {
  img {
    margin-bottom: -18px;
  }
}
  </style>
  