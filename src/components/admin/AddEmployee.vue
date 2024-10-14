<template>
  <div class="mt-5 d-flex justify-content-center">
    <div class="card p-4 shadow-sm form-card">
      <h4 class="mb-3">Add Employee</h4>
      <form @submit.prevent="submitForm">
        <!-- Row for Name and Email -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="newEmployee.name"
              placeholder="Name"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="newEmployee.email"
              placeholder="Email"
              required
            />
          </div>
        </div>

        <!-- Row for Role and Department -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="role" class="form-label">Role</label>
            <select
              class="form-control"
              id="role"
              v-model="newEmployee.role"
              required
            >
              <option disabled value="">Select a Role</option>
              <option v-for="role in roles" :key="role" :value="role">
                {{ role }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="department" class="form-label">Department</label>
            <select
              class="form-control"
              id="department"
              v-model="newEmployee.department"
              required
            >
              <option disabled value="">Select a Department</option>
              <option
                v-for="department in departments"
                :key="department"
                :value="department"
              >
                {{ department }}
              </option>
            </select>
          </div>
        </div>

        <!-- Row for Position and Pay -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="position" class="form-label">Designation</label>
            <select
              class="form-control"
              id="position"
              v-model="newEmployee.position"
              required
            >
              <option disabled value="">Select a Designation</option>
              <option v-for="position in positions" :key="position" :value="position">
                {{ position }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="pay" class="form-label">Pay</label>
            <input
              type="number"
              class="form-control"
              id="pay"
              v-model="pay"
              placeholder="Pay"
              required
            />
          </div>
        </div>

        <!-- Optional Checkbox for confirmation -->
        <div class="form-check mb-4">
          <input class="form-check-input" type="checkbox" id="confirm" />
          <label class="form-check-label" for="confirm">
            Confirm the information is correct
          </label>
        </div>

        <!-- Buttons -->
        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary btn">
            Submit
          </button>
          <button type="button" class="btn btn-light btn" @click="cancelForm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';

export default {
  setup() {
    const newEmployee = ref({
      name: '',
      email: '',
      department: '',
      role: '',
      position: ''
    });

    const employees = ref([]);

    const departments = ref('');
    const roles = ['hr', 'employee'];
    const positions = ['Junior', 'Mid-level', 'Senior', 'Lead'];

    const submitForm = () => {
      employees.value.push({ ...newEmployee.value });

      // Reset the form after submission
      newEmployee.value = {
        name: '',
        email: '',
        department: '',
        role: '',
        position: ''
      };

      alert('Employee added successfully!');
      console.log('All employees:', employees.value);
    };

    const cancelForm = () => {
      alert('Form canceled');
    };

    return {
      newEmployee,
      employees,
      departments,
      roles,
      positions,
      submitForm,
      cancelForm
    };
  }
};
</script>

<style scoped>
/* Style to mimic the uploaded design */
.form-card {
  border-radius: 15px;
  background-color: #f9f9fc;
  width: 100%;
}

h4 {
  font-weight: bold;
}

.form-control-lg {
  border-radius: 10px;
}

.btn-primary {
  background-color: #5a67d8;
  border-color: #5a67d8;
  border-radius: 20px;
  padding-left: 30px;
  padding-right: 30px;
}

.btn-primary:hover {
  background-color: #434f9e;
  border-color: #434f9e;
}

.btn-light {
  background-color: #f1f1f1;
  border-color: #f1f1f1;
  border-radius: 20px;
  padding-left: 30px;
  padding-right: 30px;
}

.btn-light:hover {
  background-color: #e0e0e0;
}

.card {
  border: none;
  padding: 2rem;
}
</style>
