<template>
    <div class="project-management container mt-5">
      <h3 class="text-center mb-4">Project Management</h3>
  
      <!-- Add Project Form -->
      <div class="add-project-form card shadow-sm p-4 mb-4">
        <h5 class="mb-3">Add New Project</h5>
        <form @submit.prevent="addProject">
          <div class="row">
            <div class="form-group mb-3 col-md-6">
              <label for="projectName">Project Name</label>
              <input type="text" class="form-control" id="projectName" v-model="newProject.name" placeholder="Enter project name" required />
            </div>
            <div class="form-group mb-3 col-md-6">
              <label for="clientName">Client Name</label>
              <input type="text" class="form-control" id="clientName" v-model="newProject.clientName" placeholder="Enter client name" required />
            </div>
          </div>
          <div class="row">
            <div class="form-group mb-3 col-md-6">
              <label for="deadline">Deadline</label>
              <input type="date" class="form-control" id="deadline" v-model="newProject.deadline" required />
            </div>
            <div class="form-group mb-3 col-md-6">
              <label for="status">Status</label>
              <select class="form-control" id="status" v-model="newProject.status" required>
                <option value="" disabled>Select Status</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div class="form-group mb-3">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" v-model="newProject.description" placeholder="Enter project description" rows="3" required></textarea>
          </div>
          <div class="form-group mb-3">
            <label for="teamAssigned">Team Assigned (comma-separated)</label>
            <input type="text" class="form-control" id="teamAssigned" v-model="newProject.teamAssigned" placeholder="Enter team members" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Add Project</button>
        </form>
      </div>
  
      <!-- Project Table -->
      <div class="table-responsive project-table card shadow-sm">
        <table class="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Client Name</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Team Assigned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id">
              <td>{{ project.name }}</td>
              <td>{{ project.description }}</td>
              <td>{{ project.clientName }}</td>
              <td>{{ formatDate(project.deadline) }}</td>
              <td>
                <span :class="getStatusClass(project.status)" class="badge">
                  {{ project.status }}
                </span>
              </td>
              <td>{{ project.teamAssigned.join(', ') }}</td>
              <td>
                <button class="btn btn-outline-danger btn-sm" @click="deleteProject(project.id)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Mock Data for Projects
  const projects = ref([
  {
    id: 1,
    name: 'HR Management System',
    description: 'An advanced HR solution to streamline recruitment and employee management.',
    clientName: 'ABC Corp',
    deadline: '2024-12-01',
    status: 'Ongoing',
    teamAssigned: ['Asad', 'Nabeel', 'Mujahid'],
  },
  {
    id: 2,
    name: 'E-commerce Platform',
    description: 'A scalable e-commerce platform for online retail businesses.',
    clientName: 'XYZ Ltd.',
    deadline: '2024-11-15',
    status: 'Completed',
    teamAssigned: ['Ali', 'Qasim', 'Salman'],
  },
  {
    id: 3,
    name: 'Learning Management System',
    description: 'A platform for educational institutions to manage online courses.',
    clientName: 'EduPro Solutions',
    deadline: '2025-01-20',
    status: 'Ongoing',
    teamAssigned: ['Sarah', 'Ayesha', 'Khalid'],
  },
  {
    id: 4,
    name: 'Inventory Management System',
    description: 'A solution to track and manage stock for warehouses and retailers.',
    clientName: 'Global Logistics Inc.',
    deadline: '2024-10-30',
    status: 'Ongoing',
    teamAssigned: ['Bilal', 'Zain', 'Ahmed'],
  },
  {
    id: 5,
    name: 'Mobile Banking App',
    description: 'A mobile app that provides banking services on the go.',
    clientName: 'FinTrust Bank',
    deadline: '2025-02-10',
    status: 'Ongoing',
    teamAssigned: ['Sami', 'Farah', 'Ibrahim'],
  },
  {
    id: 6,
    name: 'Social Media Dashboard',
    description: 'A unified dashboard for managing multiple social media accounts.',
    clientName: 'Connectify',
    deadline: '2024-11-05',
    status: 'Completed',
    teamAssigned: ['Yasir', 'Sameer', 'Mona'],
  },
  {
    id: 7,
    name: 'Fitness Tracking App',
    description: 'A mobile application for tracking fitness and health goals.',
    clientName: 'Healthify',
    deadline: '2024-12-18',
    status: 'Ongoing',
    teamAssigned: ['Mariam', 'Osman', 'Raza'],
  },
  {
    id: 8,
    name: 'AI-powered Chatbot',
    description: 'An AI chatbot solution to enhance customer support for businesses.',
    clientName: 'TechSoft',
    deadline: '2024-11-30',
    status: 'Ongoing',
    teamAssigned: ['Junaid', 'Amin', 'Rafiq'],
  },
  {
    id: 9,
    name: 'Real Estate CRM',
    description: 'A CRM solution specifically for real estate agencies to manage clients and properties.',
    clientName: 'Elite Realtors',
    deadline: '2024-10-20',
    status: 'Completed',
    teamAssigned: ['Tariq', 'Laila', 'Hassan'],
  },
  {
    id: 10,
    name: 'Video Streaming Platform',
    description: 'A high-performance platform for streaming videos online.',
    clientName: 'StreamNow',
    deadline: '2025-03-01',
    status: 'Ongoing',
    teamAssigned: ['Omar', 'Shahid', 'Nida'],
  }
]);

  
  // New Project Data
  const newProject = ref({
    name: '',
    description: '',
    clientName: '',
    deadline: '',
    teamAssigned: '',
    status: '',
  });
  
  // Format Deadline Date
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  // Delete Project
  const deleteProject = (id) => {
    projects.value = projects.value.filter((project) => project.id !== id);
  };
  
  // Add Project
  const addProject = () => {
    const team = newProject.value.teamAssigned.split(',').map((member) => member.trim());
    const id = projects.value.length + 1;
    projects.value.push({
      ...newProject.value,
      id,
      teamAssigned: team,
    });
  
    // Reset the form
    newProject.value = {
      name: '',
      description: '',
      clientName: '',
      deadline: '',
      teamAssigned: '',
      status: '',
    };
  };
  
  // Status Class
  const getStatusClass = (status) => {
    return status === 'Ongoing' ? 'status-ongoing' : 'status-completed';
  };
  </script>
  
  <style scoped>
  .project-management {
    max-width: 1000px;
    margin: auto;
  }
  
  .add-project-form {
    max-width: 700px;
    margin: auto;
    background-color: #f8f9fa;
    border-radius: 10px;
  }
  
  .project-table {
    margin-top: 30px;
    border: none;
  }
  
  .card {
    border-radius: 10px;
  }
  
  .table thead {
    background-color: var(--basic-button);
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  .table-hover tbody tr:hover {
    background-color: #e9f5ff;
  }
  
  .badge {
    padding: 0.6em 1.2em;
    font-size: 0.85rem;
    border-radius: 15px;
    font-weight: 600;
  }
  
  .status-ongoing {
    background-color: white;
    color: var(--basic-button);
    border: 2px solid var(--basic-button);
  }
  
  .status-completed {
    background-color: white;
    color: green;
    border: 2px solid green;
  }
  
  .btn-sm {
    padding: 0.25rem 0.5rem;
  }
  
  button i {
    pointer-events: none;
  }
  
  /* Input and Form Styling */
  input,
  textarea,
  select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-top: 5px;
    font-size: 1rem;
    box-sizing: border-box;
    transition: border-color 0.2s ease;
  }
  
  input:focus,
  textarea:focus,
  select:focus {
    outline: none !important;
    border-color: var(--basic-button) !important;
    box-shadow: none !important;
  }
  
  /* Button Styling */
  .btn-primary {
    background-color: var(--basic-button);
    border: none;
    transition: background-color 0.3s ease;
  }
  
  .btn-primary:hover {
    background-color: #373697;
  }
  
  .form-group label {
    font-weight: 500;
    margin-bottom: 5px;
  }
  
  @media (max-width: 768px) {
    .project-management {
      padding: 15px;
    }
  
    .add-project-form {
      padding: 20px;
    }
  }
  </style>
  