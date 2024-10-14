<template>
  <div class="login-container">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col-md-6 img-login d-none d-md-block">
          <img src="../../assets/images/login-img.png" alt="Login Illustration" class="img-fluid" />
        </div>
        <div class="col-12 col-md-6 mt-5">
          <div class="login-card">
            <div class="login-content">
              <div class="left-side">
                <div class="d-flex flex-column align-items-center gap-2">
                  <img :src="logo" alt="Logo" class="logo" />
                  <h3>Hello! Let's get started</h3>
                  <p>Sign in to continue</p>
                </div>
                <form @submit.prevent="handleLogin">
                  <div class="input-group">
                    <input type="email" placeholder="Email Address" required v-model="email" />
                  </div>
                  <div class="input-group">
                    <input type="password" placeholder="Password" required v-model="password" />
                  </div>
                  <button type="submit" class="login-button">Login</button>

                  <div class="login-options">
                    <div class="checkbox-group">
                      <input type="checkbox" id="keep-signed-in" />
                      <label for="keep-signed-in">Keep me signed in</label>
                    </div>
                    <a href="/forgot-pass" class="forgot-password">Forgot Password?</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import logo from "../../assets/images/login.jpeg";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  setup() {
    const logoImage = logo;
    const email = ref("");
    const password = ref("");
    const store = useStore();
    const router = useRouter();
    const handleLogin = async () => {
    const userData = { email: email.value, password: password.value };
  try {
    const response = await store.dispatch('auth/login', userData);
    console.log(response.data);
  
    const { role, permissions,token } = response.data;
    localStorage.setItem("token",token);
    console.log("Local storage:  ...",localStorage.getItem("token"));
    console.log("ROle",role," Permission",permissions);
    await store.dispatch('roles/setRoleAndPermissions', { role, permissions });
    console.log("permissions", response.permissions);
    // Check the user role from Vuex store
    const userRole = store.getters['roles/userRole'];
    if (userRole) {
      router.push('/dashboard');
    } else {
      console.error('User role is undefined or null. Unable to redirect.');
    }
  } catch (error) {
    // Handle any errors during login
    console.error('Login error:', error);
  }
};
    return {
      logo: logoImage,
      email,
      password,
      handleLogin,
    };
  },
};
</script>
<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
}
.login-card {
  max-width: 400px;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: auto;
}
.login-content {
  width: 100%;
  background: rgba(12, 12, 12, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(12.1px);
  border: 1px solid rgba(12, 12, 12, 0.3);
  border-radius: 13px;
}
.left-side {
  padding: 20px;
  color: white;
}
.left-side h3 {
  margin-bottom: 2px;
  font-size: 20px;
  font-weight: 500;
}
.left-side p {
  margin-bottom: 20px;
  color: #ffffff;
}
.input-group {
  margin-bottom: 20px;
}
.input-group input {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.login-button {
  background-color: #38637d;
  color: white;
  border: none;
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group input {
  margin-right: 5px;
}

.forgot-password {
  color: whitesmoke;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.logo {
  width: 130px;
  height: auto;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .login-card {
    /* margin: 20px; Margin on smaller screens */
  }

  .forgot-password {
    font-size: 12px;
  }

  .login-button {
    padding: 12px;
  }
  
.login-card {
  width: 100%;
}
}
</style>
