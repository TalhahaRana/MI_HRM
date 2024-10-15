// import ApiServices from "../services/ApiServices";

// const state = {
//     projects: [],
// };

// const getters = {
//     allProjects: (state) => state.projects,
// };

// const actions = {
//     // Fetch all projects
//     async fetchProjects({ commit }) {
//         console.log('Fetching projects...'); // Add this line
//         try {
//             const response = await ApiServices.GetRequest("/projects-all");
//             commit("setProjects", response.data);
//         } catch (error) {
//             console.error("Error fetching projects:", error);
//             throw error;
//         }
//     },


//     // Add a new project
//     async addProject({ commit }, projectData) {
//         try {
//             const response = await ApiServices.PostRequest("/create-project", projectData);
//             commit("newProject", response); // Assuming the API returns the created project
//         } catch (error) {
//             console.error("Error adding project:", error);
//             throw error;
//         }
//     },

//     //Update an existing project
//     async updateProject({ commit }, { id, updatedData }) {
//         try {
//             const response = await ApiServices.PutRequest(`/update-project/${id}`, updatedData);
//             commit("updateProject", response); // Assuming API returns updated project
//         } catch (error) {
//             console.error("Error updating project:", error);
//             throw error;
//         }
//     },

//     // Delete a project
//     async deleteProject({ commit }, projectId) {
//         if (!projectId) {
//             console.error("Invalid project ID");
//             return;
//         }

//         try {
//             await ApiServices.DeleteRequest(`/delete-project/${projectId}`);
//             commit("removeProject", projectId);
//             console.log(`Project with ID ${projectId} deleted successfully.`);
//         } catch (error) {
//             console.error("Error deleting project:", error);
//             throw error;
//         }
//     }
// };

// const mutations = {
//     setProjects(state, projects) {
//         state.projects = projects;
//     },
//     newProject(state, project) {
//         state.projects.push(project);
//     },
//     updateProject(state, updatedProject) {
//         const index = state.projects.findIndex((p) => p.id === updatedProject.id);
//         if (index !== -1) {
//             state.projects.splice(index, 1, updatedProject);
//         }
//     },
//     removeProject(state, id) {
//         state.projects = state.projects.filter((project) => project.id !== id);
//     },
// };

// export default {
//     namespaced: true,
//     state,
//     getters,
//     actions,
//     mutations,
// };

import ApiServices from "../services/ApiServices";

const state = {
    projects: [],
    loading: false, // Added loading state
    error: null, // Added error state (optional but recommended)
};

const getters = {
    allProjects: (state) => state.projects,
    isLoading: (state) => state.loading, // Getter for loading state
    projectError: (state) => state.error, // Getter for error state
};

const actions = {
    // Fetch all projects
    async fetchProjects({ commit }) {
        commit("setLoading", true); // Start loading
        commit("clearError"); // Clear previous errors
        console.log('Fetching projects...');
        try {
            const response = await ApiServices.GetRequest("/projects-all");
            commit("setProjects", response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
            commit("setError", "Failed to fetch projects.");
            throw error;
        } finally {
            commit("setLoading", false); // End loading
        }
    },

    // Add a new project
    async addProject({ commit }, projectData) {
        commit("setLoading", true); // Start loading
        commit("clearError"); // Clear previous errors
        try {
            const response = await ApiServices.PostRequest("/create-project", projectData);
            commit("newProject", response.data); // Ensure response.data contains the new project
        } catch (error) {
            console.error("Error adding project:", error);
            commit("setError", "Failed to add project.");
            throw error;
        } finally {
            commit("setLoading", false); // End loading
        }
    },

    // Update an existing project
    async updateProject({ commit }, { id, updatedData }) {
        commit("setLoading", true); // Start loading
        commit("clearError"); // Clear previous errors
        try {
            const response = await ApiServices.PutRequest(`/update-project/${id}`, updatedData);
            commit("updateProject", response.data); // Ensure response.data contains the updated project
        } catch (error) {
            console.error("Error updating project:", error);
            commit("setError", "Failed to update project.");
            throw error;
        } finally {
            commit("setLoading", false); // End loading
        }
    },

    // Delete a project
    async deleteProject({ commit }, projectId) {
        if (!projectId) {
            console.error("Invalid project ID");
            commit("setError", "Invalid project ID.");
            return;
        }

        commit("setLoading", true); // Start loading
        commit("clearError"); // Clear previous errors
        try {
            await ApiServices.DeleteRequest(`/delete-project/${projectId}`);
            commit("removeProject", projectId);
            console.log(`Project with ID ${projectId} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting project:", error);
            commit("setError", "Failed to delete project.");
            throw error;
        } finally {
            commit("setLoading", false); // End loading
        }
    }
};

const mutations = {
    setProjects(state, projects) {
        state.projects = projects;
    },
    newProject(state, project) {
        state.projects.push(project);
    },
    updateProject(state, updatedProject) {
        const index = state.projects.findIndex((p) => p.id === updatedProject.id);
        if (index !== -1) {
            state.projects.splice(index, 1, updatedProject);
        }
    },
    removeProject(state, id) {
        state.projects = state.projects.filter((project) => project.id !== id);
    },
    setLoading(state, isLoading) {
        state.loading = isLoading;
    },
    setError(state, errorMessage) {
        state.error = errorMessage;
    },
    clearError(state) {
        state.error = null;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};