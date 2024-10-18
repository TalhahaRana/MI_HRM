<template>
  <div class="container mt-4 form-card">
    <h2 class="text-center mb-4 text-primary">Assigned Projects</h2>

    <div v-if="!projects || projects.length === 0" class="text-center">
      <p>No assigned projects found.</p>
    </div>

    <div class="row" v-else>
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="col-md-4 mb-4"
      >
        <div class="card project-card animated-card">
          <div class="card-body">
            <h5 class="card-title">{{ project.project.title }}</h5>
            <p class="card-text">
              Description:
              <span
                class="view-description"
                @click="showDescriptionModal(project.project.description)"
                title="Click to view full description"
              >
                View Description
              </span>
            </p>
            <p class="card-text">Deadline: {{ project.project.deadline }}</p>
            <p class="card-text">
              Status:
              <span :class="statusClass(project.status)">{{
                project.status
              }}</span>
            </p>
            <progress-bar :status="project.status" />
            <button class="btn btn-warning" @click="showStatusModal(project)">
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>


    <transition name="fade">
      <div v-if="showDescriptionModalFlag" class="modal-overlay">
        <div class="modal-content">
          <h3 class="text-center">Description</h3>
          <p>{{ currentDescription }}</p>
          <button class="btn btn-secondary" @click="closeDescriptionModal">
            Close
          </button>
        </div>
      </div>
    </transition>


    <transition name="fade">
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h3>Update Status for {{ selectedProject?.project.title }}</h3>
          <div class="status-options">
            <label>
              <input
                type="radio"
                name="status"
                value="pending"
                v-model="newStatus"
              />
              Pending
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="in_progress"
                v-model="newStatus"
              />
              In Progress
            </label>

            <label>
              <input
                type="radio"
                name="status"
                value="completed"
                v-model="newStatus"
              />
              Completed
            </label>
          </div>
          <button
            class="btn text-white"
            @click="updateProjectStatus(newStatus)"
            style="background-color: var(--basic-button);"
          >
            Update
          </button>
          <button class="btn btn-secondary" @click="closeModal">Cancel</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import ProgressBar from './ProgressBar.vue';

export default {
  components: {
    ProgressBar,
  },
  setup() {
    const store = useStore();
    const projects = ref([]);
    const selectedProject = ref(null);
    const showModal = ref(false);
    const newStatus = ref("");
    const showDescriptionModalFlag = ref(false);
    const currentDescription = ref("");

    const fetchProjects = async () => {
      try {
        await store.dispatch("employee/fetchAssignedProjects");
        const fetchedProjects = store.getters["employee/getAssignedProjects"];
        projects.value = Array.isArray(fetchedProjects) ? fetchedProjects : [];
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const showStatusModal = (project) => {
      selectedProject.value = project;
      newStatus.value = project.status; // Set current status as the default
      showModal.value = true;
    };

    const showDescriptionModal = (description) => {
      currentDescription.value = description;
      showDescriptionModalFlag.value = true;
    };

    const closeDescriptionModal = () => {
      showDescriptionModalFlag.value = false;
      currentDescription.value = ""; // Reset description
    };

    const closeModal = () => {
      showModal.value = false;
      selectedProject.value = null; // Reset selected project
    };

    const updateProjectStatus = async (status) => {
      const validStatuses = ["in_progress", "pending", "completed"];
      if (!validStatuses.includes(status)) return;

      const responseMessage = await store.dispatch(
        "employee/updateProjectStatus",
        {
          id: selectedProject.value.project.id,
          status: status,
        }
      );

      if (responseMessage) {
        console.log(responseMessage);
      }
      closeModal();
    };

    const statusClass = (status) => {
      return {
        "text-success": status === "completed",
        "text-warning": status === "in_progress",
        "text-danger": status === "pending",
      };
    };

    onMounted(() => {
      fetchProjects();
    });

    return {
      projects,
      showModal,
      showStatusModal,
      closeModal,
      updateProjectStatus,
      selectedProject,
      statusClass,
      newStatus,
      showDescriptionModalFlag,
      showDescriptionModal,
      currentDescription,
      closeDescriptionModal,
    };
  },
};
</script>


<style scoped>
.project-card {
  height: 300px; /* Set a fixed height for all project cards */
  display: flex;
  flex-direction: column;
  transition: transform 0.2s; /* Animation for hover effect */
}

.project-card:hover {
  transform: scale(1.03); /* Slightly increase size on hover */
}

.card-body {
  flex-grow: 1; /* Makes the body grow to fill the card */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Space out content evenly */
}

.view-description {
  color: black; /* Change color to indicate it's clickable */
  cursor: pointer; /* Pointer cursor on hover */
  text-decoration: underline; /* Underline to emphasize it's a link */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  transition: transform 0.3s ease-in-out;
}

.status-options {
  margin: 15px 0;
}

.status-options label {
  display: block;
  margin: 5px 0;
}

.btn-secondary {
  margin-top: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

@media (max-width: 576px) {
  .modal-content {
    padding: 15px;
  }
}

</style>
