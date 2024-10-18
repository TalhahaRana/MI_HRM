<template>
  <div class="edit-profile">
    <h2>Edit Profile</h2>
    <!-- Profile Update Form -->
    <form @submit.prevent="updateProfile" class="profile-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="name"
          type="text"
          id="name"
          required
          placeholder="Enter your name"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          required
          placeholder="Enter your email"
        />
      </div>

      <button type="submit" class="btn-submit">Update Profile</button>
    </form>

    <!-- Password Setup Form -->
    <h2>Set New Password</h2>
    <form @submit.prevent="setupPassword" class="password-form">
      <div class="form-group">
        <label for="password">New Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Set new password"
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          v-model="confirmPassword"
          type="password"
          id="confirmPassword"
          placeholder="Confirm new password"
        />
      </div>

      <div v-if="passwordMismatch" class="error-message">
        Passwords do not match.
      </div>

      <button type="submit" class="btn-submit" :disabled="passwordMismatch">
        Set Password
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex"; // Import Vuex store

// Reactive variables for profile inputs
const name = ref("");
const email = ref("");

// Reactive variables for password inputs
const password = ref("");
const confirmPassword = ref("");

// Computed property to check password mismatch
const passwordMismatch = computed(
  () => password.value !== confirmPassword.value
);

const store = useStore(); // Use the Vuex store

// Method to handle profile update

const updateProfile = async () => {
  const updatedProfile = {
    name: name.value,
    email: email.value,
  };

  try {
    console.log("Updating profile with:", updatedProfile);
    await store.dispatch("auth/updateUser", { updatedData: updatedProfile });
  } catch (error) {
    console.error("Failed to update profile:", error);
    alert("An error occurred while updating the profile.");
  }
};

// Method to handle password setup
const setupPassword = async () => {
  if (passwordMismatch.value) {
    alert("Passwords do not match!");
    return;
  }

  const passwordData = {
    password: password.value,
    password_confirmation: confirmPassword.value,
  };

  try {
    await store.dispatch("auth/passwordSetup", passwordData);
    alert("Password updated successfully!");
    password.value = "";
    password_confirmation = "";
  } catch (error) {
    console.error("Failed to set password:", error);
    alert("An error occurred while setting the password.");
  }
};

// Fetch current user data when the component is mounted
onMounted(() => {
  const currentUser = store.getters["user/user"];
  if (currentUser) {
    name.value = currentUser.name || "";
    email.value = currentUser.email || "";
  }
});
</script>

<style scoped>
.edit-profile {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.profile-form,
.password-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.btn-submit {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-submit:hover:not(:disabled) {
  background-color: #0056b3;
}

@media (max-width: 600px) {
  .edit-profile {
    padding: 10px;
  }

  h2 {
    font-size: 1.5rem;
  }

  input {
    padding: 8px;
  }

  .btn-submit {
    padding: 8px;
  }
}
</style>
