import ApiServices from "../services/ApiServices";

const state = {
    projects: [],
};

const getters = {
    allProjects: (state) => state.projects,
};

const actions = {
    // Fetch all projects
    async fetchProjects({ commit }) {
        console.log('Fetching projects...'); // Add this line
        try {
            const response = await ApiServices.GetRequest("/projects-all");
            commit("setProjects", response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
            throw error;
        }
    },


    // Add a new project
    async addProject({ commit }, projectData) {
        try {
            const response = await ApiServices.PostRequest("/create-project", projectData);
            commit("newProject", response.data); // Assuming the API returns the created project
        } catch (error) {
            console.error("Error adding project:", error);
            throw error;
        }
    },

    //Update an existing project
    async updateProject({ commit }, { id, updatedData }) {
        try {
            const response = await ApiServices.PutRequest(`/update-project/${id}`, updatedData);
            commit("updateProject", response); // Assuming API returns updated project
        } catch (error) {
            console.error("Error updating project:", error);
            throw error;
        }
    },

    // Delete a project
    async deleteProject({ commit }, id) {
        try {
            await ApiServices.DeleteRequest(`/delete-project/${id}`);
            commit("removeProject", id);
        } catch (error) {
            console.error("Error deleting project:", error);
            throw error;
        }
    },
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
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};