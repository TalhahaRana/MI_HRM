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
              v-model="name"
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
              v-model="email"
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
              v-model="role"
              required
            >
              <option disabled value="">Select a Role</option>
              <option v-for="roleOption in roles" :key="roleOption" :value="roleOption">
                {{ roleOption }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="department" class="form-label">Department</label>
            <select
              class="form-control"
              id="department"
              v-model="department"
              required
            >
              <option disabled value="">Select a Department</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.name">
                {{ dept.name }}
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
              v-model="position"
              required
            >
              <option disabled value="">Select a Designation</option>
              <option v-for="positionOption in positions" :key="positionOption" :value="positionOption">
                {{ positionOption }}
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
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex'; // Assuming you are using Vuex for state management

export default {
  setup() {
    const store = useStore();
    const name = ref('');
    const email = ref('');
    const department = ref('');
    const role = ref('');
    const position = ref('');
    const pay = ref('');

    const roles = ['HR', 'Employee'];
    const positions = ['Junior', 'Mid-level', 'Senior', 'Lead'];

    // Fetch departments from the Vuex store
    const departments = ref([]);

    onMounted(async () => {
      try {
        await store.dispatch('department/fetchDepartments');
        departments.value = store.getters['department/allDepartments'];
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    });

    const submitForm = () => {
      const newEmployee = {
        name: name.value,
        email: email.value,
        department: department.value,
        role: role.value,
        position: position.value,
        pay: pay.value,
      };

      console.log('New Employee:', newEmployee);
      alert('Employee added successfully!');

      // Reset form fields
      name.value = '';
      email.value = '';
      department.value = '';
      role.value = '';
      position.value = '';
      pay.value = '';
    };

    const cancelForm = () => {
      alert('Form canceled');
    };

    return {
      name,
      email,
      department,
      role,
      position,
      pay,
      departments,
      roles,
      positions,
      submitForm,
      cancelForm,
    };
  },
};
</script>

<style scoped>
/* Styles for the form */
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
