<template>
  <div class="main-container">
    <div class="profile-container">
      <!-- Left Section -->
      <div class="left-section">
        <h2>Profile Information</h2>
        <p>Keep your account information up to date for a better experience.</p>
      </div>

      <!-- Right Section -->
      <div class="right-section">
        <!-- Profile Update Form -->
        <form @submit.prevent="updateProfile" class="profile-form">
          <!-- Form Fields -->
          <div class="form-group">
            <label for="name">Name <span class="required">*</span></label>
            <input
              v-model="name"
              type="text"
              id="name"
              required
              class="input-field"
            />
          </div>

          <div class="form-group">
            <label for="email">Email <span class="required">*</span></label>
            <input
              v-model="email"
              type="email"
              id="email"
              required
              class="input-field"
            />
          </div>

          <button type="submit" class="submit-btn" :disabled="isLoadingProfile">
            <span v-if="isLoadingProfile" class="loader"></span>
            {{ isLoadingProfile ? "Updating..." : "Save Changes" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

// Profile photo (replace with a dynamic path if needed)
const profilePhoto = ref("path_to_image");

// Reactive variables for profile inputs
const name = ref("");
const email = ref("");

// Reactive state for loading
const isLoadingProfile = ref(false);

const store = useStore();

const uploadPhoto = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Assuming the photo upload logic is handled elsewhere
    console.log("Photo selected:", file);
  }
};

// Method to handle profile update
const updateProfile = async () => {
  isLoadingProfile.value = true;
  const updatedProfile = {
    name: name.value,
    email: email.value,
  };

  try {
    console.log("Updating profile with:", updatedProfile);
    await store.dispatch("auth/updateUser", { updatedData: updatedProfile });
    alert("Profile updated successfully!");
  } catch (error) {
    console.error("Failed to update profile:", error);
    alert("An error occurred while updating the profile.");
  } finally {
    isLoadingProfile.value = false;
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
/* Improved Styles */
.main-container {
  margin-top: 120px;
}
.profile-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0px auto; /* Center horizontally */
  max-width: 700px;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  justify-content: center; /* Center vertically */
  align-items: center; /* Center horizontally */
  min-height: 0vh; /* Ensure full height to center vertically */
}

@media (min-width: 768px) {
  .profile-container {
    flex-direction: row;
    margin: 40px auto; /* Adjust margin for larger screens */
  }
}

.left-section {
  flex: 1;
  max-width: 300px;
  margin-top: 0px;
}

.right-section {
  flex: 2;
  padding: 30px;
  background-color: #f8f6f6;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.photo-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-direction: column;
  text-align: center;
}

.photo img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.upload-btn {
  cursor: pointer;
  padding: 8px 16px;
  background-color: #6366f1;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.upload-btn:hover {
  background-color: #4f46e5;
}

input[type="file"] {
  display: none;
}

.form-group {
  margin-bottom: 20px;
}

.label,
input {
  display: block;
  width: 100%;
}

.input-field {
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.submit-btn {
  background-color: #6366f1;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  width: 100%;
}

.submit-btn:hover {
  background-color: #4f46e5;
}

.loader {
  border: 3px solid #fff;
  border-top: 3px solid transparent;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.required {
  color: red;
}
</style>