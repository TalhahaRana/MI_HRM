
<template>
  <div class="designation-department-management ">


    <h2 class="form-card">Departments</h2>

<nav aria-label="breadcrumb">
<ol class="breadcrumb d-flex justify-content-between">
  <li class="breadcrumb-item fw-bolder"><a href="#"><strong>Dashboard</strong></a></li>
  <li class="breadcrumb-item active fw-bolder" aria-current="page"><strong>Attendance</strong></li>
  <button @click="openAddModal" class="btn btn-primary ms-auto">Add Department</button>
</ol>
</nav>

<table class="table table-striped">
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
  <i class="fa-solid fa-ellipsis-vertical" id="actionMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="cursor: pointer;"></i>
  <ul class="dropdown-menu" aria-labelledby="actionMenu">
    <li class="dropdown-item"><i class="fa-solid fa-pencil"></i>Edit</li>
    <li class="dropdown-item"><i class="fa-solid fa-trash-can"></i>Delete</li>
    <li class="dropdown-item"><i class="fa-solid fa-plus"></i>Assign Employee</li>
  </ul>
</div>
    </td>
  </tr>
</tbody>
</table>


<nav aria-label="breadcrumb">
<ol class="breadcrumb d-flex justify-content-between">
  <li class="breadcrumb-item fw-bolder"><a href="#"><strong>Dashboard</strong></a></li>
  <li class="breadcrumb-item active fw-bolder" aria-current="page"><strong>Attendance</strong></li>
  <button @click="openDesignationModal" class="btn btn-primary ms-auto">Add Department</button>
</ol>
</nav>
    <h2 class="form-card">Designations</h2>

    <table class="table  table-striped">
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
<i class="fa-solid fa-ellipsis-vertical" id="actionMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="cursor: pointer;"></i>
<ul class="dropdown-menu" aria-labelledby="actionMenu">
<li class="dropdown-item"><i class="fa-solid fa-pencil"></i>Edit</li>
<li class="dropdown-item"><i class="fa-solid fa-trash-can"></i>Delete</li>

</ul>
</div>
</td>

        </tr>
      </tbody>
    </table>


    <h2>Employees</h2>
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
    openAssignModal(department) {
      this.selectedDepartment = department;
      this.selectedDepartment.employees = []; // Reset employee selection
      this.showAssignModal = true;
    },
    closeAssignModal() {
      this.showAssignModal = false;
    },
    saveEmployeeAssignment() {
      // Save employee assignment logic
      this.closeAssignModal();
    },
    getDepartmentName(departmentId) {
      const department = this.departments.find((d) => d.id === departmentId);
      return department ? department.name : '';
    },
    getDesignationName(designationId) {
      const designation = this.designations.find((d) => d.id === designationId);
      return designation ? designation.name : '';
    },
  },
};
</script>

<style scoped>


/* Updated dropdown style */
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
background-color:var(--basic-button); /* Blue hover effect */
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.breadcrumbs {
  font-size: 14px;
  color: gray;
}
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
.table th{
  font-size: 18px;
}

.table td{
  font-size: 16px;
  font-weight: 400;
  color: black;
}

.btn {
  margin-left: 10px;
  background-color: var(--basic-button);
}
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
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>

