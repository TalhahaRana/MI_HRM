<template>
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

  // Add a new project via the store
  const handleAddProject = () => {
    const projectData = {
      title : newProjectTitle.value,
      description: newProjectDescription.value,
      deadline: newProjectDeadline.value,
    };

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
</script>

<style scoped>
@import "@vueup/vue-quill/dist/vue-quill.snow.css";

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
  text-align: center; /* Center-align the heading */
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 1.2em; /* Increase font size of labels */
}

input,
select,
.quill-editor {
  padding: 8px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white !important; /* Set background color to white for all text fields */
}

.edit,
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

.project-table .edit {
  padding: 6px 10px;
  background-color: #5a67d8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.project-table .delete {
  padding: 6px 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.project-table .edit:hover {
  background-color: #7583ff;
}

.project-table .delete:hover {
  background-color: #c53030;
}

.quill-editor {
  background-color: white; /* White background for the Quill editor */
}

</style>
