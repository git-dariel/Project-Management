import { dummyProjects } from '@/test-data/projects.data';
import axios from 'axios';


const BASE_URL = 'http://localhost:8000/api/projects'; 

const projectService = {
  getProjects: async () => {
    try {
      // Check if the environment is for testing
      if (process.env.NODE_ENV === 'test') {
        // Return the mocked data directly
        return { projects: dummyProjects };
      } else {
        // Make an API call to fetch projects data from the backend server
        const response = await axios.get(BASE_URL);
        return response.data;
      }
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to get projects');
    }
  },

  // Other project service functions...
};

export default projectService;
