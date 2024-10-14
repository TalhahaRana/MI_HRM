<template>
  <div class="container mt-4  form-card">
    <h2 class="text-center mb-4">Assigned Projects</h2>
    <div class="row">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="col-md-4 mb-4"
      >
        <div class="card project-card">
          <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">Description: {{ project.description }}</p>
            <p class="card-text">Deadline: {{ project.deadline }}</p>
            <p class="card-text">
              Status:
              <span :class="statusClass(project.status)">{{
                project.status
              }}</span>
            </p>
            <button class="btn btn-primary" @click="viewTask(project)">
              View Tasks
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedProject" class="mt-4">
      <h3>Task Details for {{ selectedProject.name }}</h3>
      <table class="table table-bordered table-striped">
        <thead class="table-light">
          <tr>
            <th>Task</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in selectedProject.tasks" :key="index">
            <td>{{ task.name }}</td>
            <td>
              <span :class="statusClass(task.status)">{{ task.status }}</span>
            </td>
          </tr>
          <tr v-if="selectedProject.tasks.length === 0">
            <td colspan="2" class="text-center">
              No tasks available for this project.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const projects = ref([
      {
        id: 1,
        name: "Website Redesign",
        description: "Complete overhaul of the company website.",
        deadline: "2024-10-15",
        status: "In Progress",
        tasks: [
          { name: "Create wireframes", status: "Completed" },
          { name: "Develop homepage", status: "In Progress" },
          { name: "Test responsiveness", status: "Pending" },
        ],
      },
      {
        id: 2,
        name: "Mobile App Development",
        description: "Developing a mobile app for iOS and Android.",
        deadline: "2024-11-01",
        status: "Pending",
        tasks: [
          { name: "Design UI mockups", status: "Pending" },
          { name: "Set up backend architecture", status: "Pending" },
        ],
      },
      {
        id: 3,
        name: "API Integration",
        description: "Integrating third-party APIs for better functionality.",
        deadline: "2024-10-25",
        status: "Completed",
        tasks: [
          { name: "Research API options", status: "Completed" },
          { name: "Implement authentication", status: "Completed" },
        ],
      },
    ]);

    const selectedProject = ref(null);

    const viewTask = (project) => {
      selectedProject.value = project;
    };

    const statusClass = (status) => {
      return {
        "text-success": status === "Completed",
        "text-warning": status === "In Progress",
        "text-danger": status === "Pending",
      };
    };

    return {
      projects,
      selectedProject,
      viewTask,
      statusClass,
    };
  },
};
</script>

<style scoped>
.project-card {
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  background-color: #ffffff; /* Uniform background color */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
}

.card-title {
  font-weight: bold;
}

.card-text {
  margin: 0.5rem 0;
}

.text-success {
  color: #28a745;
}

.text-warning {
  color: #ffc107;
}

.text-danger {
  color: #dc3545;
}

.table {
  margin-top: 20px;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

@media (max-width: 576px) {
  .container {
    padding: 0 15px;
  }

  .project-card {
    margin: 10px 0; /* Adjust margin for vertical spacing on small screens */
  }
}
</style>
