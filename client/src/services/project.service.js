import axios from "axios";

const BASE_URL = "https://project-management-server-1ffi.onrender.com/api";

const projectService = {
  // Function to set JWT token in request headers
  setAuthToken: (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  },

  getAllProjects: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/projects`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get projects"
      );
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await axios.post(`${BASE_URL}/projects`, projectData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create project"
      );
    }
  },

  updateProject: async (projectId, projectData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/projects/${projectId}`,
        projectData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update project"
      );
    }
  },

  deleteProject: async (projectId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete project"
      );
    }
  },

  addMemberToProject: async (projectId, userId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/projects/:project_id/member`,
        {
          project_id: projectId,
          user_id: userId,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to add member to project"
      );
    }
  },
};

export default projectService;
