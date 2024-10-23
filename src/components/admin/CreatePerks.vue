<template>
    <div class="create-perks-container">
        <div class="card">
            <h2 class="title">Create a New Perk</h2>

            <!-- Perk Form -->
            <form @submit.prevent="submitForm">
                <!-- Perk Title -->
                <div class="form-group">
                    <label for="perkTitle">Perk Title</label>
                    <input type="text" id="perkTitle" v-model="perk.title"
                        placeholder="Enter perk title (e.g. Fuel, Health Insurance)" class="input-field" />
                    <span v-if="submitted && !perk.title" class="error-message">
                        Perk title is required.
                    </span>
                </div>

                <!-- Perk Allowance -->
                <div class="form-group">
                    <label for="perkAllowance">Allowance</label>
                    <input type="number" id="perkAllowance" v-model="perk.allowance"
                        placeholder="Enter allowance amount (e.g. 1000)" class="input-field" />
                    <span v-if="submitted && !perk.allowance" class="error-message">
                        Allowance is required.
                    </span>
                </div>

                <!-- Submit Button -->
                <div class="form-group">
                    <button type="submit" class="btn-primary" :disabled="isSubmitting">Create Perk</button>
                </div>
            </form>

            <!-- Success Message -->
            <div v-if="successMessage" class="success-message">
                <h3>{{ successMessage }}</h3>
                <p><strong>Perk Title:</strong> {{ createdPerk.title }}</p>
                <p><strong>Allowance:</strong> ${{ createdPerk.allowance }}</p>
                <p><strong>Created At:</strong> {{ formatDate(createdPerk.created_at) }}</p>
                <p><strong>Updated At:</strong> {{ formatDate(createdPerk.updated_at) }}</p>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="error-message">
                <p>{{ errorMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
    setup() {
        const store = useStore();
        const perk = ref({
            title: "",
            allowance: null,
        });

        const submitted = ref(false);
        const successMessage = ref("");
        const errorMessage = ref("");
        const createdPerk = ref({});
        const isSubmitting = ref(false);

        const submitForm = async () => {
            submitted.value = true;
            successMessage.value = "";
            errorMessage.value = "";

            if (!perk.value.title || !perk.value.allowance) {
                return;
            }

            try {
                isSubmitting.value = true;
                const response = await store.dispatch("admin/createPerk", perk.value);
                createdPerk.value = response.data;
                successMessage.value = "Perk created successfully!";
            } catch (error) {
                errorMessage.value = "Failed to create perk. Please try again.";
            } finally {
                isSubmitting.value = false;
            }
        };

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleString();
        };

        return {
            perk,
            submitted,
            successMessage,
            errorMessage,
            createdPerk,
            submitForm,
            formatDate,
            isSubmitting,
        };
    },
};
</script>

<style scoped>
.create-perks-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f7fa;
    padding: 20px;
}

.card {
    background-color: #fff;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
}

.title {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-bottom: 30px;
    text-align: center;
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-weight: bold;
    font-size: 16px;
    color: #333;
}

.input-field {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-top: 8px;
    font-size: 16px;
    background-color: #f9f9f9;
}

.input-field:focus {
    outline: none;
    border-color: #4b49ac;
    background-color: #fff;
}

textarea.input-field {
    resize: none;
}

.error-message {
    color: #dc3545;
    font-size: 14px;
    margin-top: 5px;
}

.btn-primary {
    background-color: #4b49ac;
    color: white;
    padding: 12px;
    width: 100%;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.btn-primary:hover {
    background-color: #3e3a95;
}

.success-message {
    margin-top: 30px;
    background-color: #e6ffe6;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    color: #28a745;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.success-message h3 {
    margin-bottom: 15px;
}

.success-message p {
    margin-bottom: 10px;
    font-size: 16px;
    color: #333;
}
</style>