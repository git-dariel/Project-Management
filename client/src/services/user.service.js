import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const userService = {
  // validation function
  setAuthToken: (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  },

 
  getUserById: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get user');
    }
  },

  
  registerUser: async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, user);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to register user');
    }
  },

  
  updateUser: async (user) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/${user.id}`, user);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user');
    }
  },

  
  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
  },

  
  getUsers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get users');
    }
  },

  
  loginUser: async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, credentials);
      const { accessToken } = response.data;
      userService.setAuthToken(accessToken); // Set JWT token in headers
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  },

  
  currentUser: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/current`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get current user');
    }
  }
};

export default userService;
