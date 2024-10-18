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
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authCode = ref(''); // Ref for 2FA code
    const store = useStore(); // Vuex store access
    const router = useRouter(); // Vue router access

    // Function to verify the 2FA code
    const verifyCode = async () => {
      if (authCode.value.length === 6) { // Ensure the code is 6 digits
        try {
          // Dispatch the action to verify the 2FA code
          const response = await store.dispatch('auth/verify2FACode', authCode.value);
          
          // Check if the response was successful and contains the required data
          if (response && response.data) {
            console.log('2FA code verified and data received:', response.data);
            
            // Save the user data in Vuex store (auth module)
            store.commit('auth/setUserData', response.data);
            //salman ali 

            console.log("respnseeeeeeeeee......",response.data);
            const { role, permissions,token } = response.data;
            localStorage.setItem("token",token);
            console.log("Local storage:  ...",localStorage.getItem("token"));
            console.log("ROle",role," Permission",permissions);
            localStorage.setItem("permissions",JSON.stringify(permissions));
            localStorage.setItem("roles",role);
            await store.dispatch('roles/setRoleAndPermissions', { role, permissions });
            console.log("permissions", response.permissions);
            // Check the user role from Vuex store
            const userRole = store.getters['roles/userRole'];
            // Redirect to the dashboard
            if (userRole) {
              router.push('/dashboard');
            } else {
              console.error('User role is undefined or null. Unable to redirect.');
            }

          } else {
            alert('Failed to verify 2FA code. Please try again.');
          }
        } catch (error) {
          console.error('Error verifying 2FA code:', error.response?.data || error.message);
          alert('Failed to verify 2FA code. Please try again.');
        }
      } else {
        alert('The code must be 6 digits.');
      }
    };

    return {
      authCode,
      verifyCode,
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
  