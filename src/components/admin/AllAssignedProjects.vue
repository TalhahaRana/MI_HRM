<template>
    <div class="form-card mt-4">
      <h4>Assigned Projects</h4>
      
      <!-- Search Bar, Status Filter Dropdown, and Date Range Filter -->
      <div class="filters mb-3">
        <input v-model="searchTerm" type="text" class="form-control" placeholder="Search by Employee Name" />
        
        <select v-model="selectedStatus" class="form-select mt-2">
          <option value="">All Status</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
        </select>
  
        <!-- Date Range Filters -->
        <input v-model="startDate" type="date" class="form-control mt-2" placeholder="Start Date" />
        <input v-model="endDate" type="date" class="form-control mt-2" placeholder="End Date" />
      </div>
  
      <table v-if="filteredProjects.length" class="table table-bordered">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Project Name</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(projectData, index) in filteredProjects" :key="index">
            <td>{{ projectData.employee.user.name }}</td>
            <td>{{ projectData.project.title }}</td>
            <td>{{ projectData.status }}</td>
            <td>{{ projectData.project.deadline }}</td>
            <td>
              <button @click="openModal(projectData)" class="view-all">View All Details</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-else>
        <p>No projects assigned.</p>
      </div>
  
      <!-- Modal -->
      <div v-if="showModal" class="modal ">
        <div class="modal-content form-card">
          <span class="close" @click="closeModal">&times;</span>
          <h2>Project Details</h2>
          <p><strong>Employee Name:</strong> {{ selectedProject.employee.user.name }}</p>
          <p><strong>Project Name:</strong> {{ selectedProject.project.title }}</p>
          <p><strong>Status:</strong> {{ selectedProject.status }}</p>
          <p><strong>Deadline:</strong> {{ selectedProject.project.deadline }}</p>
          <p><strong>Description:</strong> {{ selectedProject.project.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore(); 
  
  // Reactive state for projects, modal, search term, status filter, and date range
  const projects = ref([]);
  const showModal = ref(false);
  const selectedProject = ref(null);
  const searchTerm = ref('');
  const selectedStatus = ref('');
  const startDate = ref(''); // Start date filter
  const endDate = ref(''); // End date filter
  
  // Fetch projects when component is mounted
  onMounted(async () => {
    try {
      await store.dispatch('projects/AllAssignProject');
      const projectsData = store.getters['projects/allProjects']; // Use getter to fetch projects
      projects.value = projectsData || [];
    } catch (error) {
      console.error('Error fetching assigned projects:', error);
    }
  });
  
  // Filter projects based on search term, status, and deadline (date range)
  const filteredProjects = computed(() => {
    return projects.value.filter(project => {
      const matchesSearchTerm = project.employee.user.name.toLowerCase().includes(searchTerm.value.toLowerCase());
      const matchesStatus = selectedStatus.value ? project.status.trim().toLowerCase() === selectedStatus.value.trim().toLowerCase() : true;
  
      const projectDeadline = new Date(project.project.deadline);
      const matchesStartDate = startDate.value ? new Date(startDate.value) <= projectDeadline : true;
      const matchesEndDate = endDate.value ? projectDeadline <= new Date(endDate.value) : true;
  
      return matchesSearchTerm && matchesStatus && matchesStartDate && matchesEndDate;
    });
  });
  
  // Modal logic
  const openModal = (project) => {
    selectedProject.value = project;
    showModal.value = true;
  };
  
  const closeModal = () => {
    showModal.value = false;
    selectedProject.value = null;
  };
  </script>
  
  <style scoped>
  /* Styles for table and modal */
  .container {
    padding: 20px;
  }
  
  .table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }
  
  .table th,
  .table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  .table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  /* Modal styling */
  /* Modal styling */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 60%;
  position: relative;
}

.close {
  color: red; /* Change close button color to red */
  position: absolute;
  right: 20px; /* Move the button to the right */
  top: 10px; /* Position it at the top */
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: darkred; 
  text-decoration: none;
}

  .view-all{
    padding: 8px 12px;
    background-color: #5a67d8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .filters input,
  .filters select {
    width: 200px;
 
    margin-right: 10px;
    display: inline-block;
  }
  
  </style>
  