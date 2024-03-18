import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/users'; // pa adjust nalang nire haha

const userService = {
  getUserById: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${userId}`);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to get user');
    }
  },

  registerUser: async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, user);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to register user');
    }
  },

  updateUser: async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}/update/${user.id}`, user);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to update user');
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${userId}`);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to delete user');
    }
  },

  getUsers: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to get users');
    }
  },

  loginUser: async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to login');
    }
  },

  currentUser: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/current`);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to get current user');
    }
  }
};

export default userService;
