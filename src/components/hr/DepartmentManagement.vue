<template>
    <div class="designation-department-management">
      <!-- Department Management Section -->
      <h2>Departments</h2>
      <button @click="openAddModal" class="btn btn-primary">Add Department</button>

      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dept, index) in departments" :key="dept.id">
            <td>{{ index + 1 }}</td>
            <td>{{ dept.name }}</td>
            <td>
              <button @click="editDepartment(dept)" class="btn btn-warning">Edit</button>
              <button @click="deleteDepartment(dept.id)" class="btn btn-danger">Delete</button>
              <button @click="openAssignModal(dept)" class="btn btn-info">Assign Employees</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Designations Section -->
      <h2>Designations</h2>
      <button @click="openDesignationModal" class="btn btn-primary">Add Designation</button>

      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(designation, index) in designations" :key="designation.id">
            <td>{{ index + 1 }}</td>
            <td>{{ designation.name }}</td>
            <td>{{ getDepartmentName(designation.departmentId) }}</td>
            <td>
              <button @click="editDesignation(designation)" class="btn btn-warning">Edit</button>
              <button @click="deleteDesignation(designation.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Employee Management Section -->
      <h2>Employees</h2>
      <table class="table">
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

      <!-- Add/Edit Designation Modal -->
      <div v-if="showDesignationModal" class="modal">
        <div class="modal-content">
          <h3>{{ isEditingDesignation ? 'Edit Designation' : 'Add Designation' }}</h3>
          <form @submit.prevent="submitDesignationForm">
            <div class="form-group">
              <label for="designation">Designation</label>
              <input v-model="formDesignation.name" type="text" class="form-control" id="designation" required />
            </div>
            <div class="form-group">
              <label for="department">Department</label>
              <select v-model="formDesignation.departmentId" class="form-control" id="department" required>
                <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">{{ isEditingDesignation ? 'Update' : 'Add' }} Designation</button>
            <button @click="closeDesignationModal" class="btn btn-secondary">Cancel</button>
          </form>
        </div>
      </div>

      <!-- Add/Edit Department Modal -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3>{{ isEditing ? 'Edit Department' : 'Add Department' }}</h3>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Department Name</label>
              <input v-model="form.name" type="text" class="form-control" id="name" required />
            </div>
            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Add' }} Department</button>
            <button @click="closeModal" class="btn btn-secondary">Cancel</button>
          </form>
        </div>
      </div>

      <!-- Assign Employees Modal -->
      <div v-if="showAssignModal" class="modal">
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
          <button @click="saveEmployeeAssignment" class="btn btn-primary">Save</button>
          <button @click="closeAssignModal" class="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        departments: [
          { id: 1, name: "Engineering" },
          { id: 2, name: "Human Resources" },
          { id: 3, name: "Sales" },
        ],
        designations: [
          { id: 1, name: "Software Engineer", departmentId: 1 },
          { id: 2, name: "HR Manager", departmentId: 2 },
          { id: 3, name: "Sales Manager", departmentId: 3 },
        ],
        employees: [
          { id: 1, name: "Alice", email: "alice@example.com", departmentId: 1, designationId: 1 },
          { id: 2, name: "Bob", email: "bob@example.com", departmentId: 2, designationId: 2 },
          { id: 3, name: "Charlie", email: "charlie@example.com", departmentId: 3, designationId: 3 },
        ],
        formDesignation: { name: "", departmentId: "" },
        form: { name: "" },
        selectedDepartment: {},
        isEditingDesignation: false,
        isEditing: false,
        showDesignationModal: false,
        showModal: false,
        showAssignModal: false,
      };
    },
    methods: {
      // Methods for designations
      openDesignationModal() {
        this.isEditingDesignation = false;
        this.formDesignation = { name: "", departmentId: "" };
        this.showDesignationModal = true;
      },
      editDesignation(designation) {
        this.isEditingDesignation = true;
        this.formDesignation = { ...designation };
        this.showDesignationModal = true;
      },
      deleteDesignation(id) {
        this.designations = this.designations.filter((designation) => designation.id !== id);
      },
      submitDesignationForm() {
        if (this.isEditingDesignation) {
          const index = this.designations.findIndex((d) => d.id === this.formDesignation.id);
          if (index !== -1) {
            this.designations.splice(index, 1, { ...this.formDesignation });
          }
        } else {
          this.designations.push({ id: Date.now(), ...this.formDesignation });
        }
        this.closeDesignationModal();
      },
      closeDesignationModal() {
        this.showDesignationModal = false;
      },
      // Methods for departments
      openAddModal() {
        this.isEditing = false;
        this.form = { name: "" };
        this.showModal = true;
      },
      editDepartment(dept) {
        this.isEditing = true;
        this.form = { ...dept };
        this.showModal = true;
      },
      deleteDepartment(id) {
        this.departments = this.departments.filter((dept) => dept.id !== id);
      },
      submitForm() {
        if (this.isEditing) {
          const index = this.departments.findIndex((d) => d.id === this.form.id);
          if (index !== -1) {
            this.departments.splice(index, 1, { ...this.form });
          }
        } else {
          this.departments.push({ id: Date.now(), ...this.form });
        }
        this.closeModal();
      },
      closeModal() {
        this.showModal = false;
      },
      // Methods for assigning employees
      openAssignModal(dept) {
        this.selectedDepartment = dept;
        this.showAssignModal = true;
      },
      saveEmployeeAssignment() {
        this.showAssignModal = false;
      },
      closeAssignModal() {
        this.showAssignModal = false;
      },
      // Helper methods
      getDepartmentName(departmentId) {
        const department = this.departments.find((dept) => dept.id === departmentId);
        return department ? department.name : "Unknown";
      },
      getDesignationName(designationId) {
        const designation = this.designations.find((d) => d.id === designationId);
        return designation ? designation.name : "Unknown";
      },
    },
  };
  </script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.table {
  margin-top: 20px;
}

.btn {
  margin-right: 10px;
}
</style>
