import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/projects'; 

const projectService = {
  getProjects: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to get projects');
    }
  },

  createProject: async (project) => {
    try {
      const response = await axios.post(BASE_URL, project);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to create project');
    }
  },

  updateProject: async (projectId, project) => {
    try {
      const response = await axios.put(`${BASE_URL}/${projectId}`, project);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to update project');
    }
  },

  deleteProject: async (projectId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${projectId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to delete project');
    }
  },

  addMemberToProject: async (projectId, userId) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-member`, { projectId, userId });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to add member to project');
    }
  }
};

export default projectService;
