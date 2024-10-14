<template>
    <div class="projects-container  form-card">
      <h2>Projects</h2>
  
      <!-- Add Project Section -->
      <div class="add-project">
        <h3>Add New Project</h3>
        <form @submit.prevent="addProject">
          <div class="form-group">
            <label for="projectName">Project Name</label>
            <input type="text" id="projectName" v-model="newProjectName" required />
          </div>
          <div class="form-group">
            <label for="projectStatus">Department</label>
            <select id="projectStatus" v-model="newProjectStatus" required>
              <option disabled value="">Select status</option>
              <option value="Ongoing">CSS</option>
              <option value="Completed">IT</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="projectStatus">Status</label>
            <select id="projectStatus" v-model="newProjectStatus" required>
              <option disabled value="">Select status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
  
          <button type="submit">Add Project</button>
        </form>
      </div>
  
      <!-- Project List Table -->
      <table class="project-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Status</th>
            <th>Assigned Employees</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in projects" :key="index">
            <td>{{ project.name }}</td>
            <td>
              <select v-model="project.status">
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </td>
            <td>
              <input type="text" v-model="project.assignedEmployees" placeholder="Assign Employees" />
            </td>
            <td>
              <button @click="deleteProject(index)">Delete</button>
              <button @click="deleteProject(index)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newProjectName: "",
        newProjectStatus: "",
        projects: [
          { name: "Project A", status: "Ongoing", assignedEmployees: "John, Jane" },
          { name: "Project B", status: "Completed", assignedEmployees: "Doe, Smith" },
        ]
      };
    },
    methods: {
      addProject() {
        const newProject = {
          name: this.newProjectName,
          status: this.newProjectStatus,
          assignedEmployees: "",
        };
        this.projects.push(newProject);
        this.newProjectName = "";
        this.newProjectStatus = "";
      },
      deleteProject(index) {
        this.projects.splice(index, 1);
      }
    }
  }
  </script>
  
  <style scoped>
  .projects-container {
    padding: 20px;
  }
  
  .add-project {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f7f9fc;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input,
  select {
    padding: 8px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  button {
    padding: 8px 12px;
    background-color: #5a67d8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #434190;
  }
  
  .project-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .project-table th,
  .project-table td {
    padding: 12px;
    border: 1px solid #ddd;
  }
  
  .project-table th {
    background-color: #f3f4f6;
  }
  
  .project-table td select,
  .project-table td input {
    width: 100%;
    padding: 6px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .project-table button {
    padding: 6px 10px;
    background-color: #e53e3e;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .project-table button:hover {
    background-color: #c53030;
  }
  </style>
  