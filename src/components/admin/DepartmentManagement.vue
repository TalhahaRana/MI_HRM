<template>
  <div class="department-management form-card">
    <!-- Page Title -->
    <h2>Departments</h2>

    <!-- Breadcrumb Navigation -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb d-flex justify-content-between">
        <li class="breadcrumb-item fw-bolder">
          <a href="#"><strong>Dashboard</strong></a>
        </li>
        <li class="breadcrumb-item active fw-bolder" aria-current="page">
          <strong>Departments</strong>
        </li>
        <button @click="openAddModal" class="btn btn-primary ms-auto">
          Add Department
        </button>
      </ol>
    </nav>

    <!-- Display Error Message -->
    <!-- <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div> -->

    <!-- Loader -->
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Departments Table -->
    <table class="table department-table" v-else>
      <thead>
        <tr>
          <th><i class="fas fa-hashtag"></i> ID</th>
          <th><i class="fas fa-building"></i> Department Name</th>
          <!-- <th class="text-end"><i class="fas fa-cogs"></i> Actions</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dept, index) in departments" :key="dept.id">
          <td>{{ index + 1 }}</td>
          <td>{{ dept.name }}</td>
          <!-- <td class="text-end px-4">
            <div class="dropdown">
              <i
                class="fa-solid fa-ellipsis-vertical"
                id="actionMenu"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="cursor: pointer"
              ></i>
              <ul class="dropdown-menu" aria-labelledby="actionMenu">
                <li class="dropdown-item" @click="editDepartment(dept)">
                  <i class="fa-solid fa-pencil"></i>Edit
                </li>
                <li class="dropdown-item" @click="deleteDepartment(dept.id)">
                  <i class="fa-solid fa-trash-can"></i>Delete
                </li>
              </ul>
            </div>
          </td> -->
        </tr>
      </tbody>
    </table>

    <!-- Modal for Adding/Editing Department -->
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <h3>{{ isEditing ? "Edit Department" : "Add Department" }}</h3>
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
            <button
              type="submit"
              class="btn btn-primary me-2"
              :disabled="loading"
            >
              {{ isEditing ? "Update" : "Add" }} Department
            </button>
            <button
              @click="closeModal"
              type="button"
              class="btn btn-secondary"
              :disabled="loading"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; // Import the CSS file

export default {
  name: "DepartmentManagement",
  setup() {
    const store = useStore();

    // --------------------
    // Computed Properties
    // --------------------
    const departments = computed(
      () => store.getters["department/allDepartments"]
    );
    const loading = computed(() => store.getters["department/isLoading"]);
    const error = computed(() => store.getters["department/departmentError"]);

    // --------------------
    // Local State
    // --------------------
    const showModal = ref(false);
    const isEditing = ref(false);
    const editDepartmentId = ref(null);
    const form = ref({ name: "" });

    // --------------------
    // Lifecycle Hooks
    // --------------------
    onMounted(async () => {
      try {
        await store.dispatch("department/fetchDepartmentsLoading");
      } catch (err) {
        // Error is already handled in the store
      }
    });

    // --------------------
    // Methods
    // --------------------

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
        toast.error("Department name is required.", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      try {
        if (isEditing.value) {
          await store.dispatch("department/updateDepartment", {
            id: editDepartmentId.value,
            updatedData: { name: form.value.name },
          });
          toast.success("Department updated successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          await store.dispatch("department/addDepartment", {
            name: form.value.name,
          });
          toast.success("Department added successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        closeModal();
      } catch (err) {
        console.error("Error during form submission:", err); // Debugging line
        toast.error("Failed to submit the form.", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };

    // Delete Department
    const deleteDepartment = async (id) => {
      if (confirm("Are you sure you want to delete this department?")) {
        try {
          await store.dispatch("department/deleteDepartment", id);
          toast.success("Department deleted successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
        } catch (err) {
          console.error("Error during deletion:", err); // Debugging line
          toast.error("Failed to delete the department.", {
            position: toast.POSITION.TOP_CENTER,
          });
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

    return {
      departments,
      loading,
      error,
      form,
      showModal,
      isEditing,
      editDepartmentId,
      openAddModal,
      editDepartment,
      submitForm,
      deleteDepartment,
      closeModal,
    };
  },
};
</script>


<style scoped>
/* Dropdown Menu Styles */
.designation-department-management{
  height: 660px;
}
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

.department-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.department-table th,
.department-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.department-table th {
  background-color: #f4f6f9;
  color: #333;
}

.department-table tr:hover {
    background-color: #f9f9f9;
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