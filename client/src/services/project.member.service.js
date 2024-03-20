import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const projectMemberService = {
  getProjectMembers: async (projectId) => {
    try {
      const response = await axios.get(`${BASE_URL}/project-members/${projectId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to get project members');
    }
  },

  deactivateMember: async (projectId, userId) => {
    try {
      const response = await axios.put(`${BASE_URL}/project-members/deactivate`, { project_id: projectId, user_id: userId });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to deactivate member');
    }
  },

  activateMember: async (projectId, userId) => {
    try {
      const response = await axios.put(`${BASE_URL}/project-members/activate`, { project_id: projectId, user_id: userId });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to activate member');
    }
  },
};

export default projectMemberService;
