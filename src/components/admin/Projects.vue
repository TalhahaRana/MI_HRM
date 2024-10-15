<!-- <template>
  <div class="project-container ">
    <h2>Projects</h2>

    <div class="add-project">
      <h3>Add New Project</h3>
      <form @submit.prevent="handleAddProject">
        <div class="form-group">
          <label for="projectTitle">Project Title</label>
          <input
            type="text"
            id="projectTitle"
            v-model="newProjectTitle"
            required
          />
        </div>

        <div class="form-group">
          <label for="projectDescription">Project Description</label>
          <QuillEditor
    v-model="newProjectDescription"
    :options="editorOptions"
    @input="updateDescription"
    required
    class="quill-editor"
  />
        </div>

        <div class="form-group">
          <label for="projectDeadline">Deadline</label>
          <input
            type="date"
            id="projectDeadline"
            v-model="newProjectDeadline"
            required
          />
        </div>

        <button type="submit">Add Project</button>
      </form>
    </div>

    <table class="project-table">
      <thead>
        <tr>
          <th>Project ID</th>
          <th>Project Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.title }}</td>
          <td>
            <button class="me-2 edit" @click="editProject(project)">Edit</button>
            <button class="ms-2 delete" @click="handleDeleteProject(project.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { QuillEditor } from "@vueup/vue-quill";

export default {
  components: {
    QuillEditor,
  },
  setup() {
  const store = useStore();

  // Refs for form data
  const newProjectTitle = ref("");
  const newProjectDescription = ref("");
  const newProjectDeadline = ref("");

  // Quill Editor options
  const editorOptions = ref({
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "blockquote", "code-block"],
      [{ align: [] }],
    ],
  });

  // Refs to store projects
  const projects = ref([]);

  // Fetch projects on component mount
  onMounted(async () => {
    try {
      await store.dispatch("projects/fetchProjects");
      projects.value = store.getters["projects/allProjects"];
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  });

  const updateDescription = (content) => {
  newProjectDescription.value = content;
  console.log("Updated Description: ", newProjectDescription.value); // Debugging log
};
  const handleAddProject = () => {
  if (!newProjectTitle.value || !newProjectDescription.value) {
    alert('Project Title and Description are required.');
    return;
  }

  const projectData = {
    title: newProjectTitle.value,
    description: newProjectDescription.value,
    deadline: newProjectDeadline.value,
  };

  console.log("Project Data: ", projectData); // Log data to check

  store.dispatch("projects/addProject", projectData)
    .then(() => {
      newProjectTitle.value = "";
      newProjectDescription.value = "";
      newProjectDeadline.value = "";
    })
    .catch((error) => {
      console.error("Failed to add project:", error);
    });
};


  // Delete a project via the store
  const handleDeleteProject = (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      store
        .dispatch("project/deleteProject", id)
        .catch((error) => {
          console.error("Failed to delete project:", error);
        });
    }
  };

  // Placeholder function for editing a project
  const editProject = (project) => {
    console.log("Edit project:", project);
  };


  return {
    newProjectTitle,
    newProjectDescription,
    newProjectDeadline,
    editorOptions,
    projects,
    handleAddProject,
    handleDeleteProject,
    editProject,
  };
},

};
</script> -->
<!--
<template>
  <div class="project-container">
    <h2>Projects</h2>

    <div class="add-project">
      <h3>Add New Project</h3>
      <form @submit.prevent="handleAddProject">
        <div class="form-group">
          <label for="projectTitle">Project Title</label>
          <input
            type="text"
            id="projectTitle"
            v-model="newProjectTitle"
            required
          />
        </div>

        <div class="form-group">
          <label for="projectDescription">Project Description</label>

         <QuillEditor
            v-model="newProjectDescription"
            :options="editorOptions"
            @input="updateDescription"
            required
            class="quill-editor"
          />
          <textarea
            id="projectDescription"
            v-model="newProjectDescription"
            required
            class="simple-textarea"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="projectDeadline">Deadline</label>
          <input
            type="date"
            id="projectDeadline"
            v-model="newProjectDeadline"
            required
          />
        </div>

        <button type="submit">Add Project</button>
      </form>
    </div>

    <table class="project-table">
      <thead>
        <tr>
          <th>Project ID</th>
          <th>Project Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.title }}</td>
          <td>
            <div>{{ project.description }}</div>
            <button class="me-2 edit" @click="editProject(project)">Edit</button>
            <button class="ms-2 delete" @click="handleDeleteProject(project.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
// import { QuillEditor } from "@vueup/vue-quill"; // Commented out

export default {
  // components: {
  //   QuillEditor, // Commented out
  // },
  setup() {
    const store = useStore();

    // Refs for form data
    const newProjectTitle = ref("");
    const newProjectDescription = ref(""); // Simple text input now
    const newProjectDeadline = ref("");

    // Quill Editor options (commented out as not needed now)
    // const editorOptions = ref({
    //   toolbar: [
    //     [{ header: [1, 2, false] }],
    //     ["bold", "italic", "underline"],
    //     [{ list: "ordered" }, { list: "bullet" }],
    //     ["link", "blockquote", "code-block"],
    //     [{ align: [] }],
    //   ],
    // });

    const projects = ref([]);

    onMounted(async () => {
      try {
        await store.dispatch("projects/fetchProjects");
        projects.value = store.getters["projects/allProjects"];
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    });

    // Commented out the Quill update function as it's not needed
    // const updateDescription = (content) => {
    //   newProjectDescription.value = content;
    // };

    const handleAddProject = () => {
      if (!newProjectTitle.value || !newProjectDescription.value) {
        alert("Project Title and Description are required.");
        return;
      }

      const projectData = {
        title: newProjectTitle.value,
        description: newProjectDescription.value, // Storing plain text description now
        deadline: newProjectDeadline.value,
      };

      console.log("Project Data: ", projectData);

      store
        .dispatch("projects/addProject", projectData)
        .then(() => {
          newProjectTitle.value = "";
          newProjectDescription.value = "";
          newProjectDeadline.value = "";
        })
        .catch((error) => {
          console.error("Failed to add project:", error);
        });
    };

    const handleDeleteProject = (id) => {
      if (confirm("Are you sure you want to delete this project?")) {
        store
          .dispatch("projects/deleteProject", id)
          .catch((error) => {
            console.error("Failed to delete project:", error);
          });
      }
    };

    const editProject = (project) => {
      console.log("Edit project:", project);
    };

    return {
      newProjectTitle,
      newProjectDescription,
      newProjectDeadline,
      // editorOptions, // Commented out
      projects,
      handleAddProject,
      handleDeleteProject,
      editProject,
    };
  },
};
</script> -->
<!-- <template>
  <div class="project-container">
    <h2>Projects</h2>

    <div class="add-project">
      <h3>Add New Project</h3>
      <form @submit.prevent="handleAddProject">
        <div class="form-group">
          <label for="projectTitle">Project Title</label>
          <input
            type="text"
            id="projectTitle"
            v-model="newProjectTitle"
            required
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="projectDescription">Project Description</label>
          <textarea
            id="projectDescription"
            v-model="newProjectDescription"
            required
            class="form-control"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="projectDeadline">Deadline</label>
          <input
            type="date"
            id="projectDeadline"
            v-model="newProjectDeadline"
            required
            class="form-control"
          />
        </div>

        <button type="submit" class="btn btn-primary">Add Project</button>
      </form>
    </div>

    <table class="table table-striped project-table">
      <thead>
        <tr>
          <th>Project ID</th>
          <th>Project Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.title }}</td>
          <td>
            <div>{{ project.description }}</div>
            <button class="btn btn-sm btn-warning me-2" @click="editProject(project)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="handleDeleteProject(project.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>


    <div
      class="modal fade"
      tabindex="-1"
      :class="{ show: isModalOpen }"
      style="display: block;"
      v-if="isModalOpen"
      role="dialog"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Project</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleUpdateProject">
              <div class="mb-3">
                <label for="editProjectTitle" class="form-label">Project Title</label>
                <input
                  type="text"
                  id="editProjectTitle"
                  v-model="editProjectTitle"
                  required
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label for="editProjectDescription" class="form-label">Project Description</label>
                <textarea
                  id="editProjectDescription"
                  v-model="editProjectDescription"
                  required
                  class="form-control"
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="editProjectDeadline" class="form-label">Deadline</label>
                <input
                  type="date"
                  id="editProjectDeadline"
                  v-model="editProjectDeadline"
                  required
                  class="form-control"
                />
              </div>

              <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary me-2">Update Project</button>
                <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const newProjectTitle = ref("");
    const newProjectDescription = ref("");
    const newProjectDeadline = ref("");

    const isModalOpen = ref(false);
    const editProjectId = ref(null);
    const editProjectTitle = ref("");
    const editProjectDescription = ref("");
    const editProjectDeadline = ref("");

    const projects = ref([]);

    onMounted(async () => {
      try {
        await store.dispatch("projects/fetchProjects");
        projects.value = store.getters["projects/allProjects"];
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    });

    const handleAddProject = () => {
      if (!newProjectTitle.value || !newProjectDescription.value) {
        alert("Project Title and Description are required.");
        return;
      }

      const projectData = {
        title: newProjectTitle.value,
        description: newProjectDescription.value,
        deadline: newProjectDeadline.value,
      };

      store
        .dispatch("projects/addProject", projectData)
        .then(() => {
          newProjectTitle.value = "";
          newProjectDescription.value = "";
          newProjectDeadline.value = "";
        })
        .catch((error) => {
          console.error("Failed to add project:", error);
        });
    };

    const handleDeleteProject = (id) => {
      if (confirm("Are you sure you want to delete this project?")) {
        store.dispatch("projects/deleteProject", id).catch((error) => {
          console.error("Failed to delete project:", error);
        });
      }
    };

    const editProject = (project) => {
      editProjectId.value = project.id;
      editProjectTitle.value = project.title;
      editProjectDescription.value = project.description;
      editProjectDeadline.value = project.deadline;
      isModalOpen.value = true;
    };

    const handleUpdateProject = () => {
      const updatedData = {
        title: editProjectTitle.value,
        description: editProjectDescription.value,
        deadline: editProjectDeadline.value,
      };

      store
        .dispatch("projects/updateProject", {
          id: editProjectId.value,
          updatedData,
        })
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          console.error("Failed to update project:", error);
        });
    };

    const closeModal = () => {
      isModalOpen.value = false;
      editProjectId.value = null;
      editProjectTitle.value = "";
      editProjectDescription.value = "";
      editProjectDeadline.value = "";
    };

    return {
      newProjectTitle,
      newProjectDescription,
      newProjectDeadline,
      projects,
      isModalOpen,
      editProjectTitle,
      editProjectDescription,
      editProjectDeadline,
      handleAddProject,
      handleDeleteProject,
      editProject,
      handleUpdateProject,
      closeModal,
    };
  },
};
</script>

<style scoped>
.project-container {
  padding: 20px;
  background-color: #f5f7ff;
}

.add-project {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f5f8fa;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.add-project h3 {
  text-align: center;
}

.form-group,
.mb-3 {
  margin-bottom: 15px;
}

label.form-label {
  font-size: 1.2em;
}

.form-control {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white !important;
}

.btn {
  padding: 8px 12px;
  border-radius: 5px;
}

.project-table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f3f4f6;
}

.btn-warning {
  background-color: #f6ad55;
  border: none;
}

.btn-warning:hover {
  background-color: #dd6b20;
}

.btn-danger {
  background-color: #e53e3e;
  border: none;
}

.btn-danger:hover {
  background-color: #c53030;
}

.modal-backdrop {
  display: none;
}

.modal.show {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}
</style> -->


<template>
  <div class="project-container">
    <h2>Projects</h2>

    <!-- Display Error Message -->
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div class="add-project">
      <h3>Add New Project</h3>
      <form @submit.prevent="handleAddProject">
        <div class="form-group">
          <label for="projectTitle">Project Title</label>
          <input
            type="text"
            id="projectTitle"
            v-model="newProjectTitle"
            required
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="projectDescription">Project Description</label>
          <textarea
            id="projectDescription"
            v-model="newProjectDescription"
            required
            class="form-control"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="projectDeadline">Deadline</label>
          <input
            type="date"
            id="projectDeadline"
            v-model="newProjectDeadline"
            required
            class="form-control"
          />
        </div>

        <button type="submit" class="btn btn-primary">Add Project</button>
      </form>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Project Table -->
    <table class="table table-striped project-table" v-else>
      <thead>
        <tr>
          <th>Project ID</th>
          <th>Project Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.title }}</td>
          <td>
            <div>{{ project.description }}</div>
            <button class="btn btn-sm btn-warning me-2" @click="editProject(project)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="handleDeleteProject(project.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Bootstrap Modal for Editing Project -->
    <div
      class="modal fade"
      tabindex="-1"
      :class="{ show: isModalOpen }"
      style="display: block;"
      v-if="isModalOpen"
      role="dialog"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Project</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleUpdateProject">
              <div class="mb-3">
                <label for="editProjectTitle" class="form-label">Project Title</label>
                <input
                  type="text"
                  id="editProjectTitle"
                  v-model="editProjectTitle"
                  required
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label for="editProjectDescription" class="form-label">Project Description</label>
                <textarea
                  id="editProjectDescription"
                  v-model="editProjectDescription"
                  required
                  class="form-control"
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="editProjectDeadline" class="form-label">Deadline</label>
                <input
                  type="date"
                  id="editProjectDeadline"
                  v-model="editProjectDeadline"
                  required
                  class="form-control"
                />
              </div>

              <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary me-2">Update Project</button>
                <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    // Form Refs
    const newProjectTitle = ref("");
    const newProjectDescription = ref("");
    const newProjectDeadline = ref("");

    // Modal Refs
    const isModalOpen = ref(false);
    const editProjectId = ref(null);
    const editProjectTitle = ref("");
    const editProjectDescription = ref("");
    const editProjectDeadline = ref("");

    // Computed Properties
    const projects = computed(() => store.getters["projects/allProjects"]);
    const loading = computed(() => store.getters["projects/isLoading"]);
    const error = computed(() => store.getters["projects/projectError"]);

    // Fetch Projects on Mount
    onMounted(async () => {
      try {
        await store.dispatch("projects/fetchProjects");
      } catch (err) {
        // Error is already handled in the store
      }
    });

    // Handle Add Project
    const handleAddProject = async () => {
      if (!newProjectTitle.value || !newProjectDescription.value) {
        alert("Project Title and Description are required.");
        return;
      }

      const projectData = {
        title: newProjectTitle.value,
        description: newProjectDescription.value,
        deadline: newProjectDeadline.value,
      };

      try {
        await store.dispatch("projects/addProject", projectData);
        // Reset Form
        newProjectTitle.value = "";
        newProjectDescription.value = "";
        newProjectDeadline.value = "";
      } catch (error) {
        // Error is already handled in the store
      }
    };

    // Handle Delete Project
    const handleDeleteProject = async (id) => {
      if (confirm("Are you sure you want to delete this project?")) {
        try {
          await store.dispatch("projects/deleteProject", id);
        } catch (error) {
          // Error is already handled in the store
        }
      }
    };

    // Open Edit Modal
    const editProject = (project) => {
      editProjectId.value = project.id;
      editProjectTitle.value = project.title;
      editProjectDescription.value = project.description;
      editProjectDeadline.value = project.deadline;
      isModalOpen.value = true;
    };

    // Handle Update Project
    const handleUpdateProject = async () => {
      const updatedData = {
        title: editProjectTitle.value,
        description: editProjectDescription.value,
        deadline: editProjectDeadline.value,
      };

      try {
        await store.dispatch("projects/updateProject", {
          id: editProjectId.value,
          updatedData,
        });
        closeModal();
      } catch (error) {
        // Error is already handled in the store
      }
    };

    // Close Modal
    const closeModal = () => {
      isModalOpen.value = false;
      editProjectId.value = null;
      editProjectTitle.value = "";
      editProjectDescription.value = "";
      editProjectDeadline.value = "";
    };

    return {
      newProjectTitle,
      newProjectDescription,
      newProjectDeadline,
      projects,
      isModalOpen,
      editProjectTitle,
      editProjectDescription,
      editProjectDeadline,
      handleAddProject,
      handleDeleteProject,
      editProject,
      handleUpdateProject,
      closeModal,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.project-container {
  padding: 20px;
  background-color: #f5f7ff;
}

.add-project {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f5f8fa;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.add-project h3 {
  text-align: center;
}

.form-group,
.mb-3 {
  margin-bottom: 15px;
}

label.form-label {
  font-size: 1.2em;
}

.form-control {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white !important;
}

.btn {
  padding: 8px 12px;
  border-radius: 5px;
}

.project-table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  border: 1px solid #ddd;
}

.table th {
  background-color: #f3f4f6;
}

.btn-warning {
  background-color: #f6ad55;
  border: none;
}

.btn-warning:hover {
  background-color: #dd6b20;
}

.btn-danger {
  background-color: #e53e3e;
  border: none;
}

.btn-danger:hover {
  background-color: #c53030;
}

.modal-backdrop {
  display: none;
}

.modal.show {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}

.alert {
  margin-bottom: 20px;
}
</style>
