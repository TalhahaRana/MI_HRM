

 <template>
  <div class="designation-department-management form-card">
    <!-- Page Title -->
    <h2 >Departments</h2>

    <!-- Breadcrumb Navigation -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb d-flex justify-content-between">
        <li class="breadcrumb-item fw-bolder">
          <a href="#"><strong>Dashboard</strong></a>
        </li>
        <li class="breadcrumb-item active fw-bolder" aria-current="page">
          <strong>Departments</strong>
        </li>
        <button @click="openAddModal" class="btn btn-primary ms-auto">Add Department</button>
      </ol>
    </nav>

    <!-- Display Error Message -->
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- Loader -->
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Departments Table -->
    <table class="table table-striped" v-else>
      <thead>
        <tr>
          <th>#</th>
          <th>Department Name</th>
          <th class="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dept, index) in departments" :key="dept.id">
          <td>{{ index + 1 }}</td>
          <td>{{ dept.name }}</td>
          <td class="text-end px-4">
            <div class="dropdown">
              <i
                class="fa-solid fa-ellipsis-vertical"
                id="actionMenu"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="cursor: pointer;"
              ></i>
              <ul class="dropdown-menu" aria-labelledby="actionMenu">
                <li class="dropdown-item" @click="editDepartment(dept)">
                  <i class="fa-solid fa-pencil"></i>Edit
                </li>
                <li class="dropdown-item" @click="deleteDepartment(dept.id)">
                  <i class="fa-solid fa-trash-can"></i>Delete
                </li>
                <li class="dropdown-item" @click="assignEmployee(dept)">
                  <i class="fa-solid fa-plus"></i>Assign Employee
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for Adding/Editing Department -->
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <h3>{{ isEditing ? 'Edit Department' : 'Add Department' }}</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="departmentName">Department Name</label>
            <input
              v-model="form.name"
              type="text"
              class="form-control"
              id="departmentName"
              required
            />
          </div>
          <div class="d-flex justify-content-end mt-3">
            <button type="submit" class="btn btn-primary me-2" :disabled="loading">
              {{ isEditing ? 'Update' : 'Add' }} Department
            </button>
            <button @click="closeModal" type="button" class="btn btn-secondary" :disabled="loading">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal for Assigning Employees (Optional) -->
    <div v-if="showAssignModal" class="modal" @click.self="closeAssignModal">
      <div class="modal-content">
        <h3>Assign Employees to {{ selectedDepartment.name }}</h3>
        <div v-for="employee in employees" :key="employee.id" class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            :id="'emp-' + employee.id"
            :value="employee.id"
            v-model="selectedDepartment.employees"
          />
          <label :for="'emp-' + employee.id" class="form-check-label">
            {{ employee.name }}
          </label>
        </div>
        <div class="d-flex justify-content-end mt-3">
          <button @click="saveEmployeeAssignment" type="button" class="btn btn-primary me-2">
            Save
          </button>
          <button @click="closeAssignModal" type="button" class="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Designations and Employees Sections (Existing Structure) -->
    <h2 class="mt-5">Designations</h2>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb d-flex justify-content-between">
        <li class="breadcrumb-item fw-bolder">
          <a href="#"><strong>Dashboard</strong></a>
        </li>
        <li class="breadcrumb-item active fw-bolder" aria-current="page">
          <strong>Designations</strong>
        </li>
        <button @click="openDesignationModal" class="btn btn-primary ms-auto">Add Designation</button>
      </ol>
    </nav>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Designation</th>
          <th>Department</th>
          <th class="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(designation, index) in designations" :key="designation.id">
          <td>{{ index + 1 }}</td>
          <td>{{ designation.name }}</td>
          <td>{{ getDepartmentName(designation.departmentId) }}</td>
          <td class="text-end px-4">
            <div class="dropdown">
              <i
                class="fa-solid fa-ellipsis-vertical"
                id="actionMenu"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="cursor: pointer;"
              ></i>
              <ul class="dropdown-menu" aria-labelledby="actionMenu">
                <li class="dropdown-item" @click="editDesignation(designation)">
                  <i class="fa-solid fa-pencil"></i>Edit
                </li>
                <li class="dropdown-item" @click="deleteDesignation(designation.id)">
                  <i class="fa-solid fa-trash-can"></i>Delete
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Designation Modal -->
    <div v-if="showDesignationModal" class="modal" @click.self="closeDesignationModal">
      <div class="modal-content">
        <h3>{{ isEditingDesignation ? 'Edit Designation' : 'Add Designation' }}</h3>
        <form @submit.prevent="submitDesignationForm">
          <div class="form-group">
            <label for="designationName">Designation Name</label>
            <input
              v-model="formDesignation.name"
              type="text"
              class="form-control"
              id="designationName"
              required
            />
          </div>
          <div class="form-group mt-3">
            <label for="designationDepartment">Department</label>
            <select
              v-model="formDesignation.departmentId"
              class="form-control"
              id="designationDepartment"
              required
            >
              <option disabled value="">Select Department</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                {{ dept.name }}
              </option>
            </select>
          </div>
          <div class="d-flex justify-content-end mt-4">
            <button type="submit" class="btn btn-primary me-2" :disabled="loading">
              {{ isEditingDesignation ? 'Update' : 'Add' }} Designation
            </button>
            <button @click="closeDesignationModal" type="button" class="btn btn-secondary" :disabled="loading">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Employees Section -->
    <h2 class=" mt-5">Employees</h2>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb d-flex justify-content-between">
        <li class="breadcrumb-item fw-bolder">
          <a href="#"><strong>Dashboard</strong></a>
        </li>
        <li class="breadcrumb-item active fw-bolder" aria-current="page">
          <strong>Employees</strong>
        </li>
      </ol>
    </nav>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Employee Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Designation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employee, index) in employees" :key="employee.id">
          <td>{{ index + 1 }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ getDepartmentName(employee.departmentId) }}</td>
          <td>{{ getDesignationName(employee.designationId) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "DepartmentManagement",
  setup() {
    const store = useStore();

    // --------------------
    // Computed Properties
    // --------------------
    const departments = computed(() => store.getters["department/allDepartments"]);
    const loading = computed(() => store.getters["department/isLoading"]);
    const error = computed(() => store.getters["department/departmentError"]);

    // --------------------
    // Local State
    // --------------------
    // Departments Modal
    const showModal = ref(false);
    const isEditing = ref(false);
    const editDepartmentId = ref(null);
    const form = ref({ name: "" });

    // Designations Modal
    const showDesignationModal = ref(false);
    const isEditingDesignation = ref(false);
    const editDesignationId = ref(null);
    const formDesignation = ref({ name: "", departmentId: "" });

    // Assign Employees Modal (Optional)
    const showAssignModal = ref(false);
    const selectedDepartment = ref({ name: "", employees: [] });

    // Designations and Employees (Local State)
    const designations = ref([
      { id: 1, name: "Software Engineer", departmentId: 1 },
      { id: 2, name: "HR Manager", departmentId: 2 },
      { id: 3, name: "Sales Manager", departmentId: 3 },
    ]);

    const employees = ref([
      { id: 1, name: "Alice", email: "alice@example.com", departmentId: 1, designationId: 1 },
      { id: 2, name: "Bob", email: "bob@example.com", departmentId: 2, designationId: 2 },
      { id: 3, name: "Charlie", email: "charlie@example.com", departmentId: 3, designationId: 3 },
    ]);

    // --------------------
    // Lifecycle Hooks
    // --------------------
    onMounted(async () => {
      try {
        await store.dispatch("department/fetchDepartments");
      } catch (err) {
        // Error is already handled in the store
      }
    });

    // --------------------
    // Methods
    // --------------------

    // ----- Departments -----
    // Open Add Department Modal
    const openAddModal = () => {
      isEditing.value = false;
      form.value = { name: "" };
      showModal.value = true;
    };

    // Open Edit Department Modal
    const editDepartment = (dept) => {
      isEditing.value = true;
      editDepartmentId.value = dept.id;
      form.value = { name: dept.name };
      showModal.value = true;
    };

    // Submit Add/Edit Department Form
    const submitForm = async () => {
      if (!form.value.name.trim()) {
        alert("Department name is required.");
        return;
      }

      try {
        if (isEditing.value) {
          await store.dispatch("department/updateDepartment", {
            id: editDepartmentId.value,
            updatedData: { name: form.value.name },
          });
        } else {
          await store.dispatch("department/addDepartment", { name: form.value.name });
        }
        closeModal();
      } catch (err) {
        // Error is already handled in the store
      }
    };

    // Delete Department
    const deleteDepartment = async (id) => {
      if (confirm("Are you sure you want to delete this department?")) {
        try {
          await store.dispatch("department/deleteDepartment", id);
        } catch (err) {
          // Error is already handled in the store
        }
      }
    };

    // Close Department Modal
    const closeModal = () => {
      showModal.value = false;
      isEditing.value = false;
      editDepartmentId.value = null;
      form.value = { name: "" };
    };

    // ----- Designations -----
    // Open Add Designation Modal
    const openDesignationModal = () => {
      isEditingDesignation.value = false;
      formDesignation.value = { name: "", departmentId: "" };
      showDesignationModal.value = true;
    };

    // Open Edit Designation Modal
    const editDesignation = (designation) => {
      isEditingDesignation.value = true;
      editDesignationId.value = designation.id;
      formDesignation.value = { name: designation.name, departmentId: designation.departmentId };
      showDesignationModal.value = true;
    };

    // Submit Add/Edit Designation Form
    const submitDesignationForm = () => {
      if (!formDesignation.value.name.trim() || !formDesignation.value.departmentId) {
        alert("Designation name and department are required.");
        return;
      }

      if (isEditingDesignation.value) {
        const index = designations.value.findIndex((d) => d.id === editDesignationId.value);
        if (index !== -1) {
          designations.value.splice(index, 1, { id: editDesignationId.value, ...formDesignation.value });
        }
      } else {
        designations.value.push({ id: Date.now(), ...formDesignation.value });
      }
      closeDesignationModal();
    };

    // Delete Designation
    const deleteDesignation = (id) => {
      if (confirm("Are you sure you want to delete this designation?")) {
        designations.value = designations.value.filter((d) => d.id !== id);
      }
    };

    // Close Designation Modal
    const closeDesignationModal = () => {
      showDesignationModal.value = false;
      isEditingDesignation.value = false;
      editDesignationId.value = null;
      formDesignation.value = { name: "", departmentId: "" };
    };

    // ----- Assign Employees -----
    // Open Assign Employee Modal
    const assignEmployee = (dept) => {
      selectedDepartment.value = { ...dept, employees: [] };
      showAssignModal.value = true;
    };

    // Save Employee Assignments (Implement as needed)
    const saveEmployeeAssignment = () => {
      // Implement your logic to assign employees to the department
      // For example, make an API call to update the department's employees
      // After saving, close the modal
      showAssignModal.value = false;
      alert("Employees assigned successfully!"); // Placeholder action
    };

    // Close Assign Employee Modal
    const closeAssignModal = () => {
      showAssignModal.value = false;
      selectedDepartment.value = { name: "", employees: [] };
    };

    // ----- Helper Methods -----
    const getDepartmentName = (departmentId) => {
      const department = departments.value.find((d) => d.id === departmentId);
      return department ? department.name : "";
    };

    const getDesignationName = (designationId) => {
      const designation = designations.value.find((d) => d.id === designationId);
      return designation ? designation.name : "";
    };

    return {
      // Computed Properties
      departments,
      loading,
      error,

      // Local State
      form,
      showModal,
      isEditing,
      editDepartmentId,

      formDesignation,
      showDesignationModal,
      isEditingDesignation,
      editDesignationId,

      showAssignModal,
      selectedDepartment,

      designations,
      employees,

      // Methods
      openAddModal,
      editDepartment,
      submitForm,
      deleteDepartment,
      closeModal,

      openDesignationModal,
      editDesignation,
      submitDesignationForm,
      deleteDesignation,
      closeDesignationModal,

      assignEmployee,
      saveEmployeeAssignment,
      closeAssignModal,

      getDepartmentName,
      getDesignationName,
    };
  },
};
</script>

<style scoped>
/* Dropdown Menu Styles */
.dropdown-menu {
  right: 0;
  left: auto;
  padding: 0;
  background-color: #f8f9fa; /* Light gray background */
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow for a modern look */
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 500;
  color: #333; /* Darker color for text */
  cursor: pointer;
  transition: background-color 0.3s;
}

.dropdown-item i {
  margin-right: 8px; /* Space between icon and text */
  font-size: 16px; /* Increase icon size slightly */
}

.dropdown-item:hover {
  background-color: var(--basic-button); /* Blue hover effect */
  color: #fff;
}

.dropdown-item:hover i {
  color: white;
}

.fa-pencil,
.fa-trash-can,
.fa-plus {
  color: var(--basic-button); /* Match the icon color with your primary color */
}

/* Optional: Improve icon alignment in the dropdown trigger */
#actionMenu {
  font-size: 20px;
  color: #333;
  cursor: pointer;
}

/* Table Styles */
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table th,
.table td {
  padding: 12px;
  border-bottom: 1px solid #0000003c;
}

.table th {
  font-size: 18px;
}

.table td {
  font-size: 16px;
  font-weight: 400;
  color: black;
}

/* Button Styles */
.btn {
  margin-left: 10px;
  background-color: var(--basic-button);
  border: none;
}

.btn:hover {
  opacity: 0.9;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050; /* Ensure modals appear above other elements */
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
  max-width: 90%;
}

/* Alert Styles */
.alert {
  margin-bottom: 20px;
}

/* Additional Spacing */
.form-card {
  margin-bottom: 20px;
}
</style>
