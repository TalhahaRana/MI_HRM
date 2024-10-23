<template>
  <div class="apply-perks-container">
    <div class="card">
      <h2 class="title">Apply for Perks</h2>
      <form @submit.prevent="submitForm">
        <!-- Perks Selection Section -->
        <div class="perk-option" v-for="(perk, index) in perks" :key="perk.id">
          <label class="custom-checkbox">
            <input 
              type="checkbox" 
              :value="perk.id" 
              v-model="selectedPerks"
            />
            <span class="checkmark"></span>
            {{ perk.title }} - Allowance: {{ perk.allowance }} USD
          </label>
        </div>

        <!-- Error Message if no perks selected -->
        <div v-if="submitted && !selectedPerks.length" class="error-message">
          <p>Please select at least one perk to apply.</p>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn-primary">Apply</button>
      </form>

      <!-- Feedback after submission -->
      <div v-if="submitted && successMessage" class="confirmation-message">
        <h3>{{ successMessage }}</h3>
        <ul>
          <li v-for="perk in selectedPerksTitles" :key="perk">{{ perk }}</li>
        </ul>
        <p>Total Allowance: {{ totalAllowance }} USD</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const selectedPerks = ref([]);
    const submitted = ref(false);
    const successMessage = ref("");
    const totalAllowance = ref(0);

    const perks = computed(() => store.getters["employee/allPerks"]);

    onMounted(() => {
      store.dispatch("employee/fetchPerks");
    });

    const selectedPerksTitles = computed(() => {
      return perks.value
        .filter((perk) => selectedPerks.value.includes(perk.id))
        .map((perk) => perk.title);
    });

    const submitForm = async () => {
      submitted.value = true;
      if (selectedPerks.value.length > 0) {
        try {
          const response = await store.dispatch("employee/applyForPerks", selectedPerks.value);
          successMessage.value = response.message;
          totalAllowance.value = response.data.total_allowance;
        } catch (error) {
          console.error("Error submitting perks:", error);
          successMessage.value = "An error occurred while applying for perks.";
        }
      }
    };

    return {
      perks,
      selectedPerks,
      submitted,
      successMessage,
      selectedPerksTitles,
      totalAllowance,
      submitForm,
    };
  },
};
</script>

  
  
  <style scoped>
  .apply-perks-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f4f9;
    padding: 20px;
  }
  
  .card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 450px;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .perk-option {
    margin-bottom: 15px;
  }
  
  .custom-checkbox {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    font-size: 16px;
    user-select: none;
  }
  
  .custom-checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #e6e6e6;
    border-radius: 3px;
  }
  
  .custom-checkbox input:checked ~ .checkmark {
    background-color: #4b49ac;
  }
  
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  .custom-checkbox input:checked ~ .checkmark:after {
    display: block;
  }
  
  .custom-checkbox .checkmark:after {
    left: 7px;
    top: 3px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  
  .error-message {
    color: #dc3545;
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
  }
  
  .btn-primary {
    background-color: #4b49ac;
    color: white;
    padding: 12px;
    width: 100%;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
  }
  
  .btn-primary:hover {
    background-color: #3e3a95;
  }
  
  .confirmation-message {
    margin-top: 30px;
    background-color: #e6ffe6;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  
  .confirmation-message h3 {
    color: #28a745;
    margin-bottom: 10px;
  }
  
  .confirmation-message ul {
    padding-left: 0;
    list-style-type: none;
  }
  
  .confirmation-message ul li {
    background-color: #f0f8ff;
    margin-bottom: 5px;
    padding: 8px;
    border-radius: 5px;
    color: #333;
  }
  </style>