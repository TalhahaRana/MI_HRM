<template>
  <div class="form-card mt-5">
    <h4 class="fw-bold">Assign Project</h4>

    <div class="form-group">
      <label for="project">Project</label>

      <select v-model="selectedProject" id="project">
        <option value="" disabled selected>Select Project</option>

        <option
          v-for="project in projects"
          :key="project.id"
          :value="project.name"
        >
          {{ project.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="department">Departments</label>

      <select v-model="selectedDepartment" id="department">
        <option value="" disabled selected>Select Department</option>

        <option
          v-for="department in departments"
          :key="department.id"
          :value="department.name"
        >
          {{ department.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label>Employees</label>

      <div class="custom-dropdown">
        <div class="dropdown-header" @click="toggleDropdown">
          {{
            selectedEmployees.length > 0
              ? `${selectedEmployees.length} selected`
              : "Select Employees"
          }}

          <span class="dropdown-arrow" :class="{ open: isDropdownOpen }"></span>
        </div>

        <div v-if="isDropdownOpen" class="dropdown-list">
          <input
            type="text"
            placeholder="Search Employees"
            v-model="searchTerm"
            class="search-input"
          />

          <div
            v-for="employee in filteredEmployees"
            :key="employee.id"
            class="employee-checkbox"
          >
            <input
              type="checkbox"
              :value="employee.name"
              v-model="selectedEmployees"
              @change="closeDropdown"
            />

            <label>{{ employee.name }}</label>
          </div>
        </div>
      </div>
    </div>

    <!-- Submit Button -->

    <button class="submit-btn" @click="submitForm">Submit</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import { useStore } from "vuex"; // Import the useStore hook

const store = useStore(); // Access the Vuex store

const projects = [
  { id: 1, name: "Project Frontend" },

  { id: 2, name: "Project Backend" },

  { id: 3, name: "Project SQA" },
];

const employees = [
  { id: 1, name: "Samia" },

  { id: 2, name: "Sana" },

  { id: 3, name: "Faiqa" },

  { id: 4, name: "Ahmad" },

  { id: 5, name: "Rida" },
];

const selectedProject = ref("");

const selectedEmployees = ref([]);

const selectedDepartment = ref("");

const isDropdownOpen = ref(false);

const searchTerm = ref("");

// Use the correct getter to access departments

const departments = computed(() => store.getters["Projects/fetchDepartments"]);

const filteredEmployees = computed(() => {
  return employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const submitForm = () => {
  console.log("Selected Project:", selectedProject.value);

  console.log("Selected Employees:", selectedEmployees.value);

  console.log("Selected Department:", selectedDepartment.value);
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

// Fetch departments when the component is mounted

onMounted(async () => {
  await store.dispatch("Projects/fetchDepartments");
});
</script>

<style scoped>
.form-group {
  margin-bottom: 16px;
}

label {
  margin-bottom: 9px;

  display: block;
}

select {
  width: 100%;

  padding: 8px;

  border: 1px solid #ccc;

  border-radius: 4px;

  font-size: 16px;
}

.custom-dropdown {
  position: relative;
}

.dropdown-header {
  background-color: #fff;

  border: 1px solid #ccc;

  padding: 7px;

  border-radius: 4px;

  cursor: pointer;

  display: flex;

  justify-content: space-between;

  align-items: center;

  font-size: 16px;
}

.dropdown-arrow {
  width: 10px;

  height: 10px;

  transform: rotate(45deg);

  transition: transform 0.3s;
}

.dropdown-arrow.open {
  transform: rotate(225deg);
}

.dropdown-list {
  position: absolute;

  top: 110%;

  left: 0;

  right: 0;

  background-color: white;

  border: 1px solid #ccc;

  border-radius: 4px;

  max-height: 200px;

  overflow-y: auto;

  z-index: 10;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-input {
  width: 100%;

  padding: 10px;

  border: 1px solid #ccc;

  border-radius: 4px;

  margin-bottom: 8px;
}

.employee-checkbox {
  padding: 10px;

  display: flex;

  align-items: center;

  border-bottom: 1px solid #eee;
}

.employee-checkbox:last-child {
  border-bottom: none;
}

input[type="checkbox"] {
  margin-right: 10px;
}

.submit-btn {
  background-color: #5a67d8;

  border-color: #5a67d8;

  border-radius: 20px;

  padding-left: 30px;

  padding-right: 30px;

  color: white;
}

/* Responsive Styles */

@media (max-width: 768px) {
  .assign-project-form {
    padding: 16px;
  }

  h2 {
    font-size: 20px;
  }

  select,
  .dropdown-header {
    font-size: 14px;

    padding: 8px;
  }

  .submit-btn {
    padding: 10px;

    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .assign-project-form {
    padding: 12px;
  }

  h2 {
    font-size: 18px;
  }

  select,
  .dropdown-header {
    font-size: 12px;

    padding: 6px;
  }

  .submit-btn {
    padding: 8px;

    font-size: 12px;
  }
}
</style>
