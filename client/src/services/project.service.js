import { dummyProjects } from '@/test-data/projects.data';
import { mockedSchedulerData } from '@/test-data/sched.data';
import axios from 'axios';


const BASE_URL = 'http://localhost:8000/api';

const projectService = {
  getProjects: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/projects`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to get projects');
    }
  },

  createProject: async (project) => {
    try {
      const response = await axios.post(`${BASE_URL}/projects`, project);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to create project');
    }
  },

  updateProject: async (projectId, project) => {
    try {
      const response = await axios.put(`${BASE_URL}/projects/${projectId}`, project);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to update project');
    }
  },

  deleteProject: async (projectId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to delete project');
    }
  },

  addMemberToProject: async (projectId, userId) => {
    try {
      const response = await axios.post(`${BASE_URL}/projects/${projectId}/member`, { userId });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to add member to project');
    }
  },
  //mock service
  getSchedulerData: async () => {
    try {
      return mockedSchedulerData;
    } catch (error) {
      throw new Error('Failed to get mocked projects');
    }
  },

  getAllProjects: async () => {
    try {
      return dummyProjects;
    } catch (error) {
      throw new Error('Failed to get mocked projects');
    }
  }
};

export default projectService;
