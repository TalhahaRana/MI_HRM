<template>
    <div class="login-container">
        <div class="login-card">
            <div class="login-content">
                <div class="row container-row align-items-center text-center">
                    <!-- Left Content: Form Section -->
                    <div class="col-md-6 p-5">
                        <div class="left">
                            <img :src="logo" alt="Logo" class="logo" />
                            <p>
                                Enter the email address associated with your account and we'll
                                send you a link to reset your password.
                            </p>
                            <form @submit.prevent="handleLogin">
                                <div class="input-group">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        required
                                        v-model="email"
                                    />
                                </div>
                                <button type="submit" class="login-button">Continue</button>
                                <div class="login-options">
                                    <p>
                                        Back to 
                                        <a href="/" class="forgot-password">Login</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- Right Content: Image Section -->
                    <div class="col-md-6">
                        <img class="logo-img" src="../../assets/images/forgot.gif" alt="Forgot Password Image" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import logo from '../../assets/images/login.jpeg';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const logoImage = logo;
        const email = ref('');

        const handleLogin = async () => {
  if (email.value) {
    try {
      await store.dispatch('auth/sendPasswordResetLink', email.value);
      alert('Password reset link sent to your email.');
    } catch (error) {
      console.error('sending password reset link:', error);
      alert('Password reset link sent to your email.');
    }
  } else {
    alert('Please enter a valid email address.');
  }
};

        return {
            logo: logoImage,
            email,
            handleLogin
        };
    },
};
</script>


<style scoped>
.login-container {
    overflow-x: hidden;
}

.container-row {
    padding: 35px 186px;
}

.login-content {
    width: 100%;
    background: white;
}

.left {
    padding: 35px;
}

.input-group {
    margin-bottom: 20px;
}

.input-group input {
    width: 100%;
    padding: 15px;
    border: 1px solid #ddd;
    font-size: 16px;
    transition: border-color 0.3s ease;
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
}

.logo-img {
    max-width: 100%;
    height: auto;
}

.login-options {
    margin-top: 10px;
}

.forgot-password {
    color: #6e45e2;
    text-decoration: none;
    font-size: 14px;
}

.forgot-password:hover {
    text-decoration: underline;
}

.logo {
    width: 130px;
}

/* Responsiveness */
@media (max-width: 768px) {
    .container-row {
        padding: 20px;
    }

    .col-md-6 {
        flex: 0 0 100%;
        max-width: 100%;
        padding: 10px;
    }

    .logo-img {
        width: 100%;
        max-width: 300px; /* Adjust the image size for smaller screens */
        margin: 0 auto;
    }

    .login-button {
        padding: 12px;
        font-size: 14px;
    }

    .input-group input {
        padding: 12px;
        font-size: 14px;
    }
}

@media (max-width: 576px) {
    .container-row {
        padding: 10px;
    }

    .logo-img {
        max-width: 250px; /* Further reduce the image size on mobile */
    }

    .left {
        padding: 20px;
    }

    .login-options {
        justify-content: center;
    }
}
</style>
