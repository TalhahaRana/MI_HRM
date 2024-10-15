<template>
  <div class="form-container  form-card">
    <h2>Leave Application</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Start Date Field -->
      <div class="form-group">
        <label for="start-date">Start Date</label>
        <input v-model="form.startDate" type="date" id="start-date" required />
      </div>

      <!-- End Date Field -->
      <div class="form-group">
        <label for="end-date">End Date</label>
        <input v-model="form.endDate" type="date" id="end-date" required />
      </div>

      <!-- Reason For Leave Field -->
      <div class="form-group">
        <label for="message">Reason For Leave</label>
        <textarea
          v-model="form.message"
          id="message"
          placeholder="Enter your reason for leave"
          rows="4"
          required
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const form = reactive({
      startDate: "",
      endDate: "",
      message: "",
    });

    const handleSubmit = async () => {
      try {
        const leaveData = {
          start_date: form.startDate,
          end_date: form.endDate,
          reason: form.message,
        };

        // Dispatch the action using the correct module name, 'employee/LeaveApplication'
        await store.dispatch("employee/LeaveApplication", leaveData);

        alert(`Your leave application from ${form.startDate} to ${form.endDate} has been submitted!`);

        // Reset the form
        form.startDate = "";
        form.endDate = "";
        form.message = "";
      } catch (error) {
        console.error("Error submitting leave application:", error);
        alert("Failed to submit the leave application.");
      }
    };

    return { form, handleSubmit };
  },
};
</script>


<style scoped>
/* Container for the form */
.form-container {
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* Form Heading */
h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

/* Form fields */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  max-width: 99%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

/* Submit button */
button {
  width: 14%;
    padding: 10px;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: #5a67d8;
    border-color: #5a67d8;
    border-radius: 20px;
}

button:hover {
  background-color: #1c3958;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .form-container {
    padding: 15px;
  }

  h2 {
    font-size: 1.3rem;
  }

  .form-group input,
  .form-group textarea {
    font-size: 0.9rem;
  }

  button {
    font-size: 0.9rem;
  }
}
</style>