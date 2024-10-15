<!-- <template>
  <div>
    <h3>Quill Editor Example</h3>
    <QuillEditor
      ref="quillEditor"
      v-model="description"
      :options="editorOptions"
      class="quill-editor"
      @text-change="onTextChange"
    />
    <button @click="logDescription">Log HTML Description</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "quill/dist/quill.snow.css"; // Import Quill's CSS for proper styling

export default {
  components: {
    QuillEditor,
  },
  setup() {
    const description = ref(""); // This will store the HTML content from QuillEditor

    // Quill Editor options
    const editorOptions = ref({
      theme: "snow", // Optional: specify the theme
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "blockquote", "code-block"],
        [{ align: [] }],
      ],
    });

    // Function to log the HTML content in the console
    const logDescription = () => {
      console.log("HTML Description:", description.value);
    };

    // On text change, capture the HTML content
    const onTextChange = () => {
      const quillEditorInstance = document.querySelector(".quill-editor .ql-editor");
      if (quillEditorInstance) {
        description.value = quillEditorInstance.innerHTML; // Capture the HTML content
      }
    };

    return {
      description,
      editorOptions,
      logDescription,
      onTextChange,
    };
  },
};
</script>

<style>
.quill-editor {
  height: 200px; /* Set a fixed height for the editor */
}
</style> -->

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
            ref="quillEditor"
            v-model="description"
            :options="editorOptions"
            class="quill-editor"
            @text-change="onTextChange"
          />
          <button @click="logDescription" type="button">Log HTML Description</button>
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
            <button
              class="ms-2 delete"
              @click="handleDeleteProject(project.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { QuillEditor } from "@vueup/vue-quill";
import "quill/dist/quill.snow.css"; // Import Quill's CSS for proper styling

export default {
  components: {
    QuillEditor,
  },
  setup() {
    const store = useStore();

    // Refs for form data
    const newProjectTitle = ref("");
    const description = ref(""); // This will store the HTML content from QuillEditor
    const newProjectDeadline = ref("");

    // Quill Editor options
    const editorOptions = ref({
      theme: "snow", // Optional: specify the theme
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "blockquote", "code-block"],
        [{ align: [] }],
      ],
    });

    // Function to log the HTML content in the console
    const logDescription = () => {
      console.log("HTML Description:", description.value);
    };

    // On text change, capture the HTML content
    const onTextChange = () => {
      const quillEditorInstance = document.querySelector(".quill-editor .ql-editor");
      if (quillEditorInstance) {
        description.value = quillEditorInstance.innerHTML; // Capture the HTML content
      }
    };

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

    // Handle the addition of a new project
    const handleAddProject = () => {
      const title = newProjectTitle.value.trim();
      const projectData = {
        title: title,
        description: description.value, // Pass raw HTML to API
        deadline: newProjectDeadline.value,
      };

      // Check if the title and description are filled out
      if (!title || !description.value.trim()) {
        alert("Both Project Title and Description are required.");
        return;
      }

      console.log("Project Data: ", projectData);

      store
        .dispatch("projects/addProject", projectData)
        .then(() => {
          // Clear form inputs after successful addition
          newProjectTitle.value = "";
          description.value = ""; // Clear Quill Editor content
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
          .dispatch("projects/deleteProject", id)
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
      description,
      newProjectDeadline,
      editorOptions,
      projects,
      logDescription,
      onTextChange,
      handleAddProject,
      handleDeleteProject,
      editProject,
    };
  },
};
</script>

<style>
.quill-editor {
  height: 200px; /* Set a fixed height for the editor */
}
</style>


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

<!--
<template>
  <div class="project-container">
    <h2>Projects</h2>


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


    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>


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
                <li class="dropdown-item" @click="editProject(project)">
                  <i class="fa-solid fa-pencil"></i>Edit
                </li>
                <li class="dropdown-item" @click="handleDeleteProject(project.id)">
                  <i class="fa-solid fa-trash-can"></i>Delete
                </li>
              </ul>
            </div>
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


<!-- <template>
  <div class="project-container">
    <h2>Projects</h2>


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
            placeholder="Enter project title"
          />
        </div>

        <div class="form-group">
          <label for="projectDescription">Project Description</label>
          <textarea
            id="projectDescription"
            v-model="newProjectDescription"
            required
            class="form-control"
            placeholder="Enter project description"
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


    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>


    <table class="table table-striped project-table" v-else>
      <thead>
        <tr>
          <th class="project-id-column">Project ID</th>
          <th class="project-name-column">Project Name</th>
          <th class="project-description-column">Project Description</th>
          <th class="actions-column text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.title }}</td>
          <td>{{ project.description }}</td>
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
                <li class="dropdown-item" @click="editProject(project)">
                  <i class="fa-solid fa-pencil"></i>Edit
                </li>
                <li class="dropdown-item" @click="handleDeleteProject(project.id)">
                  <i class="fa-solid fa-trash-can"></i>Delete
                </li>
              </ul>
            </div>
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
      @click.self="closeModal"
      aria-modal="true"
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
                  placeholder="Enter project title"
                />
              </div>

              <div class="mb-3">
                <label for="editProjectDescription" class="form-label">Project Description</label>
                <textarea
                  id="editProjectDescription"
                  v-model="editProjectDescription"
                  required
                  class="form-control"
                  placeholder="Enter project description"
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
                <button type="submit" class="btn btn-primary me-2" :disabled="loading">
                  Update Project
                </button>
                <button type="button" class="btn btn-secondary" @click="closeModal" :disabled="loading">
                  Cancel
                </button>
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
  name: "Projects",
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
      if (!newProjectTitle.value.trim() || !newProjectDescription.value.trim()) {
        alert("Project Title and Description are required.");
        return;
      }

      const projectData = {
        title: newProjectTitle.value.trim(),
        description: newProjectDescription.value.trim(),
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
      if (!editProjectTitle.value.trim() || !editProjectDescription.value.trim()) {
        alert("Project Title and Description are required.");
        return;
      }

      const updatedData = {
        title: editProjectTitle.value.trim(),
        description: editProjectDescription.value.trim(),
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
  display: flex; /* Centering */
  align-items: center; /* Centering */
  justify-content: center; /* Centering */
  height: 100%; /* Ensure it takes full height of its parent cell */
}


/* Project Container Styles */
.project-container {
  padding: 20px;
  background-color: #f5f7ff;
  min-height: 100vh;
}

/* Add Project Section Styles */
.add-project {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f5f8fa;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.add-project h3 {
  text-align: center;
  margin-bottom: 20px;
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

.form-control::placeholder {
  color: #999;
}

.btn {
  padding: 8px 12px;
  border-radius: 5px;
}

.btn-primary {
  background-color: var(--basic-button);
  border: none;
  transition: background-color 0.3s, border 0.3s, color 0.3s;
}

.btn-primary:hover {
  background-color: #ffffff;
  border: 2px solid var(--basic-button);
  color:black;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268;
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

/* Table Styles */
.project-table {
  width: 100%;
  border-collapse: collapse;
}

.project-table th,
.project-table td {
  padding: 12px;
  border: 1px solid #ddd;
  vertical-align: middle;
}

.project-table th {
  background-color: #f3f4f6;
  text-align: left;
}

/* Define Column Widths */
.project-id-column {
  width: 10%;
}

.project-name-column {
  width: 20%;
}

.project-description-column {
  width: 50%;
}

.actions-column {
  width: 10%;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .project-description-column {
    width: 40%;
  }

  .actions-column {
    width: 15%;
  }
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

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
}

/* Alert Styles */
.alert {
  margin-bottom: 20px;
}

/* Additional Spacing */
.form-card {
  margin-bottom: 20px;
}
</style> -->
